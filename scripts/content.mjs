import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {createMarkdownCompiler} from './content/markdown.mjs'
import {routeFor} from './content/routes.mjs'
import {markdownOptions} from './markdown.config.mjs'

export const root = fileURLToPath(new URL('../', import.meta.url))
export {routeFor}
// Compatibility facade: existing build, preview, and test imports remain valid.
export const compile = createMarkdownCompiler({root, ...markdownOptions})

export function generate() {
  let group='Overview'; const pages=[]
  for(const line of fs.readFileSync(path.join(root,'SUMMARY.md'),'utf8').split('\n')) {
    if(line.startsWith('## ')) group=line.slice(3)
    const match=line.match(/^\* \[([^\]]+)\]\(([^)]+)\)/)
    if(match) { const [,title,file]=match; const source=fs.readFileSync(path.join(root,file==='README.md'?'src/welcome.md':file),'utf8'); pages.push({title,file,group,path:routeFor(file),...compile(source,file)}) }
  }
  fs.mkdirSync(path.join(root,'src/generated'),{recursive:true}); fs.writeFileSync(path.join(root,'src/generated/content.json'),JSON.stringify(pages))
  fs.mkdirSync(path.join(root,'public'),{recursive:true}); fs.cpSync(path.join(root,'assets'),path.join(root,'public/assets'),{recursive:true})
  return pages
}
if(process.argv[1]===fileURLToPath(import.meta.url)) console.log(`Compiled ${generate().length} documentation pages.`)
