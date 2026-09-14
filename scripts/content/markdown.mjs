import MarkdownIt from 'markdown-it'
import { gitbookExtension } from './gitbook.mjs'
import { validateDirectives } from './validation.mjs'
import { processTokens } from './tokens.mjs'
import { finalizeHtml } from './metadata.mjs'

/**
 * Create an isolated synchronous compiler.
 * Extensions run in registration order and may provide:
 * configure(md), preprocess(source, context), transformTokens(tokens, context),
 * transformHtml(html, context). Transform hooks return their replacement value.
 * Context includes { md, root, file, env }; env is fresh for every document.
 * HTML always passes through the shared sanitizer after the final hook.
 */
export function createMarkdownCompiler({ root, extensions = [], gitbook = true, resolveRoute } = {}) {
  if (!root) throw new TypeError('Markdown compiler requires a content root')
  const plugins = [...(gitbook ? [gitbookExtension] : []), ...extensions]
  const names = new Set()
  for (const plugin of plugins) {
    if (!plugin.name || names.has(plugin.name)) throw new TypeError('Extensions need unique names')
    names.add(plugin.name)
    for (const hook of ['configure', 'preprocess', 'transformTokens', 'transformHtml']) {
      if (plugin[hook] !== undefined && typeof plugin[hook] !== 'function') {
        throw new TypeError(`${plugin.name}.${hook} must be a function`)
      }
    }
  }
  const md = new MarkdownIt({ html: true, linkify: true })
  for (const plugin of plugins) plugin.configure?.(md)

  function transform(hook, input, context, valid) {
    for (const plugin of plugins) {
      if (!plugin[hook]) continue
      input = plugin[hook](input, context)
      if (!valid(input)) throw new TypeError(`${plugin.name}.${hook} returned an invalid value in ${context.file}`)
    }
    return input
  }

  return function compile(source, file) {
    const context = { md, root, file, resolveRoute, env: {} }
    try {
      source = transform('preprocess', source, context, value => typeof value === 'string')
      validateDirectives(source, file)
      const tokens = transform('transformTokens', md.parse(source, context.env), context, Array.isArray)
      // Run after plugins so inserted links and headings receive standard handling.
      const headings = processTokens(tokens, context)
      const rendered = transform('transformHtml', md.renderer.render(tokens, md.options, context.env), context, value => typeof value === 'string')
      return finalizeHtml(rendered, headings)
    } catch (error) {
      throw new Error(`Markdown compilation failed for ${file}: ${error.message}`, { cause: error })
    }
  }
}
