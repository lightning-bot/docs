import {resolveContentPath} from './routes.mjs'
import {validateTarget} from './validation.mjs'

export function processTokens(tokens, {root, file, resolveRoute}) {
  const headings = []; const ids = new Map()
  for(let i=0;i<tokens.length;i++) {
    const t=tokens[i]
    if(t.type==='heading_open') {
      const title=tokens[i+1].content; const base=title.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu,'').trim().replace(/\s+/g,'-') || 'section'
      const count=ids.get(base)||0; ids.set(base,count+1); const id=count?`${base}-${count}`:base
      t.attrSet('id',id); if(t.tag!=='h1') headings.push({id,title,level:Number(t.tag[1])})
    }
    for(const c of t.children||[]) {
      const attr=c.type==='link_open'?'href':c.type==='image'?'src':null
      if(!attr) continue
      const href=c.attrGet(attr)
      if(!href || /^(?:[a-z]+:|#|\/\/)/i.test(href)) continue
      const [target,hash]=href.split('#'); const resolved=resolveContentPath(file,target)
      if(target.endsWith('.md')) {
        validateTarget(root,resolved,file,href)
        if (!resolveRoute) throw new Error(`No navigation resolver for Markdown link: ${href}`)
        c.attrSet(attr,resolveRoute(resolved)+(hash?'#'+hash:''))
      } else if(c.type==='image') { validateTarget(root,resolved,file,href,true); c.attrSet(attr,'/'+resolved) }
    }
  }
  return headings
}
