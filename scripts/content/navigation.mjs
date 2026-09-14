import fs from 'node:fs'
import path from 'node:path'
import {parse} from 'smol-toml'

export function parseNavigation(source, {root, filename = 'navigation.toml'} = {}) {
  const fail = (context, message) => { throw new Error(`${filename}: ${context}: ${message}`) }
  let config
  try { config = parse(source) } catch (error) { fail('invalid TOML', error.message) }
  if (!Object.keys(config).length) fail('groups', 'expected named group tables')
  const entries = [], files = new Set(), routes = new Set()
  const contentRoot = fs.realpathSync(root)
  const required = (value, context, field) => {
    if (typeof value !== 'string' || !value.trim()) fail(context, `${field} must be a nonempty string`)
    return value
  }
  for (const [title, group] of Object.entries(config)) {
    const context = `group (${title})`
    if (!title.trim() || /^\d+$/.test(title)) fail(context, 'group names must be nonempty and not numeric')
    if (!group || typeof group !== 'object' || Array.isArray(group)) fail(context, 'expected a named group table')
    if (!Array.isArray(group.pages) || !group.pages.length) fail(context, 'pages must be a nonempty array')
    for (const [pageIndex, page] of group.pages.entries()) {
      const location = `${context}, page ${pageIndex + 1}`
      const pageTitle = required(page.title, location, 'title')
      const pageContext = `${location} (${pageTitle})`
      const file = required(page.file, pageContext, 'file')
      const endpoint = required(page.path, pageContext, 'path')
      if (!/^[\w/-]+\.md$/.test(file) || file.startsWith('/') || file.split('/').some(segment => !segment || segment === '..')) fail(pageContext, `invalid content file: ${file}`)
      let realFile
      try {
        realFile = fs.realpathSync(path.join(contentRoot, file))
        if (!fs.statSync(realFile).isFile()) fail(pageContext, `not a Markdown file: ${file}`)
      } catch (error) { fail(pageContext, `cannot read Markdown file ${file}: ${error.message}`) }
      if (!realFile.startsWith(contentRoot + path.sep)) fail(pageContext, `content file escapes root: ${file}`)
      if (!/^\/docs(?:\/[a-z0-9_-]+)*$/.test(endpoint)) fail(pageContext, `invalid documentation endpoint: ${endpoint}`)
      if ((file === 'README.md') !== (endpoint === '/docs')) fail(pageContext, 'Welcome (README.md) must use /docs exclusively')
      if (files.has(file)) fail(pageContext, `duplicate content file: ${file}`)
      if (routes.has(endpoint)) fail(pageContext, `duplicate endpoint: ${endpoint}`)
      files.add(file); routes.add(endpoint)
      entries.push({title: pageTitle, file, group: title, path: endpoint})
    }
  }
  if (!files.has('README.md')) fail('Welcome', 'README.md at /docs is required')
  return entries
}

export function loadNavigation(root) {
  const filename = path.join(root, 'navigation.toml')
  return parseNavigation(fs.readFileSync(filename, 'utf8'), {root, filename})
}

export function createRouteResolver(entries) {
  const routes = new Map(entries.map(page => [page.file, page.path]))
  return file => {
    if (!routes.has(file)) throw new Error(`navigation.toml: linked Markdown page is not configured: ${file}`)
    return routes.get(file)
  }
}
