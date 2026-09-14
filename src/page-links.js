// Resolve stable source-file references through the endpoints in navigation.toml.
export function pagePath(pages, file) {
  const page = pages.find(page => page.file === file)
  if (!page) throw new Error(`Unknown documentation page: ${file}`)
  return page.path
}
export function resolvePageLinks(html, pages) {
  return html.replace(/href="([^"#]+\.md)(#[^"]*)?"/g, (_, file, hash = '') => `href="${pagePath(pages, file)}${hash}"`)
}
