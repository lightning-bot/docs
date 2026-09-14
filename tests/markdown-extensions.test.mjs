import test from 'node:test'
import assert from 'node:assert/strict'
import {createMarkdownCompiler} from '../scripts/content/markdown.mjs'
import {root,compile} from '../scripts/content.mjs'

test('extensions compose in order and contribute searchable sections',()=>{
  const render=createMarkdownCompiler({root,extensions:[
    {name:'custom-directive',preprocess:s=>s.replace('{% note %}','## Extension heading')},
    {name:'token-content',transformTokens(tokens){const inline=tokens.find(t=>t.type==='inline');inline.content='Custom heading';inline.children[0].content='Custom heading';return tokens}},
    {name:'html-content',transformHtml:html=>html+'<p>Searchable extension content</p>'},
  ]})
  const result=render('{% note %}','README.md')
  assert.equal(result.headings[0].id,'custom-heading')
  assert.match(result.sections[0].text,/Searchable extension content/)
  assert.match(result.text,/Custom heading/)
})
test('Markdown-it plugins configure isolated compiler instances',()=>{
  const render=createMarkdownCompiler({root,extensions:[{name:'breaks',configure(md){md.use(instance=>instance.set({breaks:true}))}}]})
  assert.match(render('first\nsecond','README.md').html,/<br\s*\/?>/)
  assert.doesNotMatch(compile('first\nsecond','README.md').html,/<br\s*\/?>/)
})
test('HTML from extensions is sanitized after the final transformation',()=>{
  const render=createMarkdownCompiler({root,extensions:[{name:'html',transformHtml:html=>html+'<script>alert(1)</script><a href="javascript:alert(1)">Unsafe</a><img src="x" onerror="alert(1)">'}]})
  assert.doesNotMatch(render('Hello','README.md').html,/<script|javascript:|onerror/)
})
test('document state does not leak across compilation calls',()=>{
  const render=createMarkdownCompiler({root,extensions:[{name:'env',preprocess(source,{env}){assert.equal(env.visited,undefined);env.visited=true;return source}}]})
  assert.deepEqual(render('## Same','README.md'),render('## Same','README.md'))
})
test('extension validation and hook errors give actionable diagnostics',()=>{
  assert.throws(()=>createMarkdownCompiler({root,extensions:[{name:'x'},{name:'x'}]}),/unique names/)
  assert.throws(()=>createMarkdownCompiler({root,extensions:[{name:'x',preprocess:true}]}),/must be a function/)
  const render=createMarkdownCompiler({root,extensions:[{name:'async',preprocess:async s=>s}]})
  assert.throws(()=>render('hello','guide/modlog.md'),/async.preprocess.*guide\/modlog.md/)
})
test('GitBook compatibility can be explicitly disabled',()=>{
  const render=createMarkdownCompiler({root,gitbook:false})
  assert.throws(()=>render('{% hint style="info" %}','README.md'),/Unsupported/)
})
