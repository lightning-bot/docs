import fs from 'node:fs'
import path from 'node:path'
import {personalizeCommands} from '../src/command-prefix.js'
import {root,generate} from './content.mjs'
const pages=generate()
const shell=fs.readFileSync(path.join(root,'dist/index.html'),'utf8')
const escape=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')
for(const page of pages){
  const nav=pages.map(p=>`<a href="${p.path}">${escape(p.title)}</a>`).join(' · ')
  const html=shell.replace('<title>Lightning documentation</title>',`<title>${escape(page.title)} · Lightning</title>`).replace('<!--prerender-->',`<header class="topbar"><a class="brand" href="/">LIGHTNING / Documentation</a></header><main class="docs-reading"><nav aria-label="Documentation">${nav}</nav><article class="prose">${personalizeCommands(page.html,null)}</article></main>`)
  const dir=path.join(root,'dist',page.path);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html)
  // Preserve direct links to the former Markdown source URLs.
  const legacy=path.join(root,'dist',page.file);fs.mkdirSync(path.dirname(legacy),{recursive:true});fs.writeFileSync(legacy,fs.readFileSync(path.join(root,page.file)))
}
fs.writeFileSync(path.join(root,'dist/404.html'),shell.replace('<!--prerender-->','<main><h1>Page not found</h1><a href="/">Return to documentation</a></main>'))
const marketing=fs.readFileSync(path.join(root,'src/marketing.html'),'utf8')
fs.writeFileSync(path.join(root,'dist/index.html'),shell.replace('<title>Lightning documentation</title>','<title>Lightning · Discord moderation, without the friction</title>').replace('<!--prerender-->',`<header class="topbar"><a class="brand" href="/">LIGHTNING</a><a href="/docs">Documentation →</a></header>${marketing}`))
console.log(`Generated ${pages.length} static routes and a 404 page.`)
