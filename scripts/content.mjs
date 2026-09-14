import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {createMarkdownCompiler} from './content/markdown.mjs'
import {loadNavigation,createRouteResolver} from './content/navigation.mjs'
import {markdownOptions} from './markdown.config.mjs'

export const root = fileURLToPath(new URL('../', import.meta.url))
export {loadNavigation}
function navigationEntries() { return loadNavigation(root) }
function compilerFor(entries) {
  return createMarkdownCompiler({root, ...markdownOptions, resolveRoute: createRouteResolver(entries)})
}
export function compile(source, file) { return compilerFor(navigationEntries())(source, file) }

export function generate() {
  const entries = navigationEntries(), render = compilerFor(entries)
  const pages = entries.map(entry => {
    const source = fs.readFileSync(path.join(root,entry.file==='README.md'?'src/welcome.md':entry.file),'utf8')
    return {...entry, ...render(source,entry.file)}
  })
  fs.mkdirSync(path.join(root,'src/generated'),{recursive:true}); fs.writeFileSync(path.join(root,'src/generated/content.json'),JSON.stringify(pages))
  fs.mkdirSync(path.join(root,'public'),{recursive:true}); fs.cpSync(path.join(root,'assets'),path.join(root,'public/assets'),{recursive:true})
  return pages
}
if(process.argv[1]===fileURLToPath(import.meta.url)) console.log(`Compiled ${generate().length} documentation pages.`)
