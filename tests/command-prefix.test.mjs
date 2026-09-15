import {test} from 'node:test'
import assert from 'node:assert/strict'
import {replaceCommandPrefixes,personalizeCommands} from '../src/command-prefix.js'
import {compile} from '../scripts/content.mjs'

test('replaces only explicit markers and preserves literal commands and arguments',()=>{
  const text='{{ selected_prefix }}ban @Member example.com\n{{ selected_prefix }}automod rules add message-spam 5/10s warn\n/automod\n.ban\n@Lightning config prefix'
  assert.equal(replaceCommandPrefixes(text,'!'),text.replaceAll('{{ selected_prefix }}','!'))
  assert.equal(replaceCommandPrefixes('{{ selected_prefix }}help','$&<'),'$&<help')
})
test('escapes injected HTML and does not evaluate template syntax',()=>{
  const html='<code>{{ selected_prefix }}ban</code>'
  assert.equal(personalizeCommands(html,'<img src=x onerror="alert(1)">&'),'<code>&lt;img src=x onerror=&quot;alert(1)&quot;&gt;&amp;ban</code>')
  assert.equal(personalizeCommands(html,'{{ alert(1) }}'),'<code>{{ alert(1) }}ban</code>')
  assert.equal(personalizeCommands('<a href="/{{ selected_prefix }}">Link</a><p>{{ selected_prefix }}</p>','!'),'<a href="/{{ selected_prefix }}">Link</a><p>{{ selected_prefix }}</p>')
})
test('compiled inline, fenced and table examples use selected or static default prefix',()=>{
  const {html}=compile('`{{ selected_prefix }}help`\n\n```\n{{ selected_prefix }}ban @Member\n```\n\n<table><tr><td><code>{{ selected_prefix }}config</code></td></tr></table>','reference/moderation.md')
  for(const prefix of ['/', '!!', null, undefined]){
    const rendered=personalizeCommands(html,prefix)
    assert.ok(!rendered.includes('{{ selected_prefix }}'))
    for(const command of ['help','ban','config'])assert.ok(rendered.includes((prefix??'@Lightning ')+command))
  }
})
