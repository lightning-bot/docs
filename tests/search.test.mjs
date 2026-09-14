import test from 'node:test'
import assert from 'node:assert/strict'
import {createSearch} from '../src/search.js'
import {compile,generate} from '../scripts/content.mjs'

test('exact section matches rank first and link to the compiled heading', () => {
  const content=compile('# Commands\n## Mute\nSilence a member.\n## Unmute\nRestore access.', 'README.md')
  const search=createSearch([{title:'Commands',path:'/commands',group:'Reference',...content}])
  assert.equal(search('mute')[0].href,'/commands#mute')
  assert.equal(search('unmute')[0].href,'/commands#unmute')
  assert.equal(search('mute impossible').length,0)
})

test('punctuation and accents normalize; excerpts include matches deep in a page', () => {
  const text='Introductory text. '.repeat(40)+'Use café-mute to silence a member.'
  const search=createSearch([{title:'Commands',path:'/commands',text}])
  assert.equal(search('/cafe-mute').length,1)
  assert.match(search('silence')[0].excerpt,/silence/)
  assert.equal(search('   ').length,1)
  assert.equal(search('definitelymissing').length,0)
})

test('published search targets exist and normal documentation queries resolve', () => {
  const pages=generate(), search=createSearch(pages)
  for(const query of ['mute','reports','AutoMod']) assert.ok(search(query).length,query)
  for(const result of search('command')) {
    const [path,hash]=result.href.split('#')
    const page=pages.find(page=>page.path===path)
    assert.ok(page)
    if(hash) assert.ok(page.headings.some(heading=>heading.id===hash))
  }
})
