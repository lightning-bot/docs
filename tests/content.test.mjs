import test from 'node:test'
import assert from 'node:assert/strict'
import {compile,generate,loadNavigation,root} from '../scripts/content.mjs'
test('all navigation entries compile without unresolved GitBook directives',()=>{const pages=generate();assert.equal(pages.length,10);assert.equal(new Set(pages.map(p=>p.path)).size,10);for(const p of pages){assert.ok(p.html);assert.doesNotMatch(p.html,/{%/);assert.equal(new Set(p.headings.map(h=>h.id)).size,p.headings.length)}})
test('relative page links and asset links resolve from nested documents',()=>{const p=compile('[AutoMod](automod-configuration.md#advanced-rules)\n\n![Example](../assets/embed.png)','guide/modlog.md');assert.match(p.html,/href="\/docs\/automod-configuration#advanced-rules"/);assert.match(p.html,/src="\/assets\/embed.png"/)})
test('GitBook callouts, format examples and video links survive conversion',()=>{const p=compile('{% hint style="warning" %}\nCareful\n{% endhint %}\n{% tabs %}\n{% tab title="Embed" %}\nExample\n{% endtab %}\n{% endtabs %}\n{% embed url="https://www.youtube.com/watch?v=abc" %}','README.md');assert.match(p.html,/aside class="callout warning"/);assert.match(p.html,/<details/);assert.match(p.html,/<summary>Embed/);assert.match(p.html,/https:\/\/www.youtube.com/)})
test('raw HTML tables are preserved but executable HTML is removed',()=>{const p=compile('<script>alert(1)</script>\n<table><tr><td>Command</td></tr></table>\n<img src="x" onerror="alert(1)">','README.md');assert.match(p.html,/<table>/);assert.doesNotMatch(p.html,/<script|onerror/)})
test('heading IDs are stable and unique',()=>{const p=compile('# Title\n## Repeat\n## Repeat','README.md');assert.deepEqual(p.headings.map(h=>h.id),['repeat','repeat-1'])})
test('missing links and unsupported directives fail the build',()=>{assert.throws(()=>compile('[Missing](missing.md)','README.md'),/Broken link/);assert.throws(()=>compile('{% unknown %}','README.md'),/Unsupported/)})

test('published endpoints match the navigation configuration',()=>{
  const pages=generate(), entries=loadNavigation(root)
  assert.deepEqual(pages.map(({title,file,group,path})=>({title,file,group,path})),entries)
  assert.equal(pages.find(p=>p.file==='README.md').path,'/docs')
  assert.equal(pages.find(p=>p.file==='tos.md').path,'/docs/app/tos')
  assert.equal(pages.find(p=>p.file==='privacy-policy.md').path,'/docs/app/privacy-policy')
})
