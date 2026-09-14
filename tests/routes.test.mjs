import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import {parse as parseToml} from 'smol-toml'
import {parseNavigation,createRouteResolver} from '../scripts/content/navigation.mjs'
import {createMarkdownCompiler} from '../scripts/content/markdown.mjs'
import {root,compile} from '../scripts/content.mjs'
import {resolvePageLinks} from '../src/page-links.js'

const welcome = '[Overview]\n[[Overview.pages]]\ntitle = "Welcome"\nfile = "README.md"\npath = "/docs"\n'
const page = (file = 'guide/modlog.md', endpoint = '/docs/server-logs') => `[[Guide.pages]]\ntitle = "Logs"\nfile = "${file}"\npath = "${endpoint}"\n`
const config = welcome + '[Guide]\n' + page()
const parse = source => parseNavigation(source, {root})

test('TOML order, labels and explicit endpoints drive article and homepage links', () => {
  const pages = parse(config)
  assert.deepEqual(pages.map(p=>[p.title,p.group,p.path]), [['Welcome','Overview','/docs'],['Logs','Guide','/docs/server-logs']])
  const render = createMarkdownCompiler({root, resolveRoute: createRouteResolver(pages)})
  assert.match(render('[Logs](modlog.md#events)', 'guide/getting-started.md').html, /href="\/docs\/server-logs#events"/)
  assert.equal(resolvePageLinks('<a href="guide/modlog.md#events">Logs</a>', pages), '<a href="/docs/server-logs#events">Logs</a>')
  const reordered = parse(welcome + '[Guide]\n' + page('tos.md','/docs/terms') + page())
  assert.deepEqual(reordered.map(p=>p.file), ['README.md','tos.md','guide/modlog.md'])
})

test('configuration errors identify navigation file, group and page', () => {
  for (const field of ['title','file','path']) {
    const source = welcome + '[Guide]\n' + page().replace(new RegExp(`^${field} = .*\\n`, 'm'), '')
    assert.throws(()=>parse(source), new RegExp(`navigation.toml: group \\(Guide\\), page 1.*${field} must`))
  }
  assert.throws(()=>parse('title = "unterminated'), /navigation.toml: invalid TOML/)
  assert.throws(()=>parse(''), /navigation.toml: groups/)
  assert.throws(()=>parse(welcome+'[Guide]'), /pages must/)
  assert.throws(()=>parse('Overview = 2'), /named group table/)
  assert.throws(()=>parse(welcome.replace('title = "Welcome"','title = ""')), /title must/)
})

test('rejects duplicate groups, files and endpoints and invalid Welcome', () => {
  assert.throws(()=>parse(welcome+'[Overview]\n'), /invalid TOML/)
  assert.throws(()=>parse(config+page('guide/modlog.md','/docs/other')), /duplicate content file/)
  assert.throws(()=>parse(config+page('tos.md')), /duplicate endpoint/)
  assert.throws(()=>parse(welcome.replace('/docs','/docs/home')), /Welcome/)
  assert.throws(()=>parse('[Guide]\n'+page()), /Welcome/)
})

test('rejects malformed endpoints and invalid or missing content files', () => {
  for (const endpoint of ['/outside','/docs/../escape','/docs/foo/','/docs/foo?x','/docs/Foo']) {
    assert.throws(()=>parse(welcome+page('guide/modlog.md',endpoint)), /invalid documentation endpoint/)
  }
  for (const file of ['../outside.md','/absolute.md','guide//modlog.md','file.txt']) {
    assert.throws(()=>parse(welcome+page(file)), /invalid content file/)
  }
  assert.throws(()=>parse(welcome+page('missing.md')), /cannot read Markdown file missing.md/)
})

test('rejects symlinks escaping the content root', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(),'navigation-test-'))
  try {
    const content = path.join(temporary,'content'); fs.mkdirSync(content)
    fs.writeFileSync(path.join(content,'README.md'),'Welcome')
    fs.writeFileSync(path.join(temporary,'outside.md'),'Outside')
    fs.symlinkSync(path.join(temporary,'outside.md'),path.join(content,'escape.md'))
    assert.throws(()=>parseNavigation(welcome+page('escape.md'),{root:content}), /escapes root/)
  } finally { fs.rmSync(temporary,{recursive:true,force:true}) }
})

test('existing Markdown files absent from navigation fail instead of inventing a URL', () => {
  assert.throws(()=>compile('[Engine](scripts/content/README.md)','README.md'), /navigation.toml: linked Markdown page is not configured/)
  assert.throws(()=>resolvePageLinks('<a href="unknown.md">Unknown</a>',parse(config)), /Unknown documentation page/)
})

test('named tables expose Policies.pages directly and retain group declaration order', () => {
  const source = welcome + '[Policies]\n' + page('tos.md','/docs/app/tos').replace('Guide.pages','Policies.pages') + '[Guide]\n' + page()
  assert.equal(parseToml(source).Policies.pages[0].file, 'tos.md')
  assert.deepEqual(parse(source).map(page=>page.group), ['Overview','Policies','Guide'])
  assert.throws(()=>parse(welcome+'[123]\n'), /not numeric/)
  assert.throws(()=>parse('[[groups]]\ntitle = "Overview"'), /named group table/)
})
