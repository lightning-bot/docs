
## Extending Markdown

`scripts/content.mjs` remains the build entry point and exports the existing `compile`, `generate`, and `routeFor` API. Compiler internals now live under `scripts/content/`:

- `markdown.mjs`: compiler factory and ordered extension pipeline.
- `gitbook.mjs`: legacy hints, tabs, and embed conversion.
- `tokens.mjs`: heading IDs and document/asset links.
- `routes.mjs`: route naming and relative content paths.
- `validation.mjs`: unsupported directives and missing targets.
- `metadata.mjs`: final HTML sanitization and search metadata.

Register trusted, synchronous extensions in `scripts/markdown.config.mjs`. Each needs a unique `name` and may implement any of these hooks:

```js
export const markdownOptions = {
  gitbook: true,
  extensions: [{
    name: 'project-notice',
    preprocess(source) {
      return source.replaceAll('{% project_notice %}', '> See the support server for help.')
    },
  }],
}
```

Hooks run in array order:

1. `configure(md)` runs once at compiler creation. Use `md.use(plugin, options)` for Markdown-it plugins.
2. `preprocess(source, context)` returns a Markdown string before parsing. Built-in GitBook conversion runs first; unsupported directives are checked after all preprocessors.
3. `transformTokens(tokens, context)` returns the token array. Standard heading and link processing runs afterward.
4. `transformHtml(html, context)` returns HTML before the final sanitizer.

Context contains `{ md, root, file, env }`. Use `env` for per-document state; it is fresh for each compilation. Hook transforms must return their value, even when modifying it in place. Async transforms are unsupported and fail with a file-specific error.

The sanitizer remains mandatory. If a feature needs new HTML elements or attributes, explicitly review and update the allowlist in `metadata.mjs`. HTML transforms should not change heading IDs or link targets: use token transforms so headings, validation, and search remain aligned. Plugins execute as trusted build code, not sandboxed user content.

Restart `npm run dev` after changing compiler modules or registration. Compose Watch already rebuilds on these changes. Run `npm test` and `npm run build` before publishing a new extension.
