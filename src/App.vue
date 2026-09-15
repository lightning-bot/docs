<script setup>
import {computed,ref,watch,nextTick,onMounted,onUnmounted} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import pages from './generated/content.json'
import marketingSource from './marketing.html?raw'
import CrossoverIntro from './CrossoverIntro.vue'
import {personalizeCommands} from './command-prefix.js'
import {previewClick,previewOver,previewOut} from './preview-card.js'
import {pagePath,resolvePageLinks} from './page-links.js'
const marketing=resolvePageLinks(marketingSource,pages)
const route=useRoute(),router=useRouter()
const isMarketing=computed(()=>route.path==='/')
const textSizes=[{value:'standard',label:'Standard',scale:1},{value:'large',label:'Large',scale:1.125},{value:'largest',label:'Largest',scale:1.25}]
const prefixMode=ref('original'),customPrefix=ref('.')
try{const saved=JSON.parse(localStorage.getItem('lightning-docs-prefix'));if(saved&&['original','slash','custom'].includes(saved.mode)){prefixMode.value=saved.mode;if(typeof saved.prefix==='string'&&saved.prefix.trim())customPrefix.value=saved.prefix}}catch{}
const commandPrefix=computed(()=>prefixMode.value==='original'?null:prefixMode.value==='slash'?'/':customPrefix.value.trim()||'.')
watch([prefixMode,customPrefix],()=>{try{localStorage.setItem('lightning-docs-prefix',JSON.stringify({mode:prefixMode.value,prefix:customPrefix.value}))}catch{}})
const articleHtml=computed(()=>personalizeCommands(page.value?.html||'',commandPrefix.value))
const textSize=ref('standard')
try{const saved=localStorage.getItem('lightning-docs-text-size');if(textSizes.some(size=>size.value===saved))textSize.value=saved}catch{}
const readingStyle=computed(()=>({'--reading-scale':textSizes.find(size=>size.value===textSize.value)?.scale || 1}))
function saveTextSize(){try{localStorage.setItem('lightning-docs-text-size',textSize.value)}catch{}}
const theme=ref(document.documentElement.dataset.theme || 'dark')
function applyTheme(value){
  theme.value=value
  document.documentElement.dataset.theme=value
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',value==='light'?'#f4f7f5':'#0a1018')
}
function toggleTheme(){
  applyTheme(theme.value==='dark'?'light':'dark')
  try{localStorage.setItem('lightning-theme',theme.value)}catch{/* Theme still works when storage is unavailable. */}
}
const systemTheme=window.matchMedia('(prefers-color-scheme: light)')
function syncSystemTheme(){
  try{if(['light','dark'].includes(localStorage.getItem('lightning-theme')))return}catch{}
  applyTheme(systemTheme.matches?'light':'dark')
}
function syncStoredTheme(event){if(event.key==='lightning-theme'||event.key===null){if(['light','dark'].includes(event.newValue))applyTheme(event.newValue);else syncSystemTheme()}}
onMounted(()=>{systemTheme.addEventListener('change',syncSystemTheme);window.addEventListener('storage',syncStoredTheme)})
onUnmounted(()=>{systemTheme.removeEventListener('change',syncSystemTheme);window.removeEventListener('storage',syncStoredTheme)})
const page=computed(()=>pages.find(p=>p.path===route.path.replace(/\/$/,'') || p.path===route.path))
const groups=[...new Set(pages.map(p=>p.group))]
const index=computed(()=>pages.indexOf(page.value))
const menu=ref(false), status=ref('')
function keys(e){if(e.key==='Escape')menu.value=false}
async function articleClick(e){const copy=e.target.closest('button[data-copy]');if(copy){try{await navigator.clipboard.writeText(copy.parentElement.querySelector('code').textContent);status.value='Command copied';copy.textContent='Copied';setTimeout(()=>copy.textContent='Copy',1600)}catch{status.value='Unable to copy. Select the command to copy it manually.'}return}const a=e.target.closest('a');if(a && a.origin===location.origin && !e.metaKey&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&e.button===0){e.preventDefault();router.push(a.pathname+a.hash)}}
watch([()=>route.fullPath,articleHtml],async()=>{menu.value=false;document.title=isMarketing.value?'Lightning · Discord moderation, without the friction':page.value?`${page.value.title} · Lightning`:'Page not found · Lightning';await nextTick();document.querySelectorAll('.prose pre').forEach(pre=>{if(pre.querySelector('button'))return;const b=document.createElement('button');b.textContent='Copy';b.dataset.copy='';b.setAttribute('aria-label','Copy code');pre.append(b)})},{immediate:true})
onMounted(()=>window.addEventListener('keydown',keys));onUnmounted(()=>window.removeEventListener('keydown',keys))
const cards=[{path:pagePath(pages,'guide/getting-started.md'),label:'01',title:'Getting started',text:'Invite Lightning and get your server ready for moderation.'},{path:pagePath(pages,'guide/automod-configuration.md'),label:'02',title:'Configure AutoMod',text:'Set up practical protection against spam and abuse.'},{path:pagePath(pages,'guide/modlog.md'),label:'03',title:'Keep a clear record',text:'Choose the events and log formats your staff needs.'},{path:pagePath(pages,'reference/command-list.md'),label:'04',title:'Command reference',text:'Find commands, aliases, and usage in one place.'}]
</script>
<template>
  <CrossoverIntro v-if="isMarketing" />
  <a class="skip" href="#main">Skip to content</a>
  <header class="topbar flex items-center gap-4">
    <RouterLink to="/" class="brand flex items-center gap-3"><span class="bolt" aria-hidden="true">ϟ</span><span>LIGHTNING</span><span v-if="!isMarketing" class="docs-label">Docs</span></RouterLink>
    <div class="header-actions"><a v-if="isMarketing" class="marketing-docs-link" href="/docs">Docs →</a>
    <nav class="header-links flex items-center gap-6" aria-label="External links"><a class="invite" href="https://discord.com/oauth2/authorize?client_id=532220480577470464">Add to Discord</a></nav>
    <label v-if="!isMarketing" class="text-size-control" title="Documentation text size">
      <span aria-hidden="true">Aa</span><span class="sr-only">Documentation text size</span>
      <select v-model="textSize" @change="saveTextSize">
        <option v-for="size in textSizes" :key="size.value" :value="size.value">{{size.label}}</option>
      </select>
    </label>
    <button class="theme-toggle" :aria-label="theme==='dark'?'Switch to light mode':'Switch to dark mode'" :title="theme==='dark'?'Dark mode — switch to light':'Light mode — switch to dark'" @click="toggleTheme">
      <svg v-if="theme==='light'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z"/></svg>
    </button>
    <button v-if="!isMarketing" class="menu-button" :aria-expanded="menu" aria-controls="sidebar" @click="menu=!menu">{{menu?'Close':'Menu'}}</button>
    </div>
  </header>
  <div v-if="isMarketing" v-html="marketing" @click="previewClick" @pointerover="previewOver" @pointerout="previewOut"></div>
  <div v-else class="layout docs-reading" :style="readingStyle">
    <aside id="sidebar" class="sidebar" :class="{open:menu}"><nav aria-label="Documentation"><section v-for="group in groups" :key="group"><h2>{{group}}</h2><RouterLink v-for="p in pages.filter(p=>p.group===group)" :key="p.path" :to="p.path" :class="{active:page?.path===p.path}" :aria-current="page?.path===p.path?'page':undefined"><span>{{p.title}}</span></RouterLink></section></nav><div class="sidebar-footer"><a href="https://celveren.dev">A project by Célveren</a></div></aside>
    <main id="main" tabindex="-1">
      <template v-if="page">
        <div class="breadcrumb flex items-center gap-3"><span>Documentation</span><span>/</span><span>{{page.group==='Overview'?'Welcome':page.group}}</span></div>
        <template v-if="page.path==='/docs'">
          <div class="welcome"><p class="eyebrow">THE LIGHTNING HANDBOOK</p><h1>Good communities.<br><em>Great moderation.</em></h1><p>Everything you need to set up Lightning and keep your Discord community safe. A little guidance goes a long way.</p><RouterLink class="primary-link" :to="pagePath(pages,'guide/getting-started.md')">Set up your server <span>→</span></RouterLink></div>
          <div class="section-label flex justify-between"><h2 id="find-your-starting-point">Find your starting point</h2><span>THE ESSENTIALS</span></div>
          <div class="cards grid sm:grid-cols-2 gap-4"><RouterLink v-for="card in cards" :key="card.path" :to="card.path" class="doc-card"><div class="flex justify-between"><span class="card-number">{{card.label}}</span><span class="card-arrow">↗</span></div><h3>{{card.title}}</h3><p>{{card.text}}</p></RouterLink></div>
          
        </template>
        <div class="prefix-control" aria-label="Command example preferences">
          <div class="prefix-fields"><label for="command-style">Command examples</label>
            <select id="command-style" v-model="prefixMode" aria-describedby="prefix-help"><option value="original">Default mention (@Lightning)</option><option value="slash">Slash commands (/)</option><option value="custom">Custom prefix</option></select>
            <label v-if="prefixMode==='custom'" for="custom-prefix">Your prefix</label>
            <input v-if="prefixMode==='custom'" id="custom-prefix" v-model="customPrefix" type="text" maxlength="32" placeholder="." autocomplete="off" spellcheck="false" aria-describedby="prefix-help" />
          </div>
          <p id="prefix-help">Personalizes examples only. <span v-if="prefixMode==='original'">Select Lightning from Discord’s mention suggestions, then add a space before the command. Pasted text alone may not create a mention.</span> Slash command availability and options may differ. <span v-if="prefixMode==='custom'&&!customPrefix.trim()">Enter a prefix; examples currently use a dot (.).</span></p>
        </div>
        <article v-if="page.path!=='/docs'" class="prose" v-html="articleHtml" @click="articleClick"></article>
        <div v-if="page.path!=='/docs'" class="article-meta flex justify-between gap-4"><span>Made for community moderators.</span><a :href="`https://github.com/lightning-bot/docs/edit/master/${page.file}`">Edit this page</a></div>
        <nav class="pagination grid sm:grid-cols-2 gap-4" aria-label="Adjacent pages"><RouterLink v-if="index>0" :to="pages[index-1].path"><small>← Previous</small>{{pages[index-1].title}}</RouterLink><span v-else></span><RouterLink v-if="index<pages.length-1" :to="pages[index+1].path"><small>Next →</small>{{pages[index+1].title}}</RouterLink></nav>
      </template>
      <div v-else class="not-found"><p class="eyebrow">404 / PAGE NOT FOUND</p><h1>A little off course.</h1><p>This page doesn’t exist. Find your way back to the documentation.</p><RouterLink class="primary-link" to="/docs">Back to the handbook →</RouterLink></div>
      <footer class="page-footer flex justify-between gap-4"><span>LIGHTNING <span class="muted">/ Documentation</span></span><a href="https://celveren.dev">CÉLVEREN</a></footer>
    </main>
    <aside v-if="page" class="page-outline"><h2>On this page</h2><a v-for="h in page.headings" :key="h.id" :href="'#'+h.id" :class="{nested:h.level>2}">{{h.title}}</a><div class="help-box"><span>Need a hand?</span><p>You don’t have to figure it out alone.</p><a href="https://short.lightsage.dev/discord">Join the community</a></div></aside>
  </div>
  <span role="status" class="sr-only">{{status}}</span>
</template>
