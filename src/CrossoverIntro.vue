<script setup>
import {ref,onMounted,onUnmounted,nextTick} from 'vue'
const intro=ref(null)
const motion=window.matchMedia('(prefers-reduced-motion: reduce)')
let timer,previousOverflow,started=false
function remember(){try{sessionStorage.setItem('lightning-intro-seen','1')}catch{}}
function finish(){
  clearTimeout(timer)
  if(!started)return
  started=false
  const hadFocus=intro.value?.contains(document.activeElement)
  intro.value?.close()
  document.body.style.overflow=previousOverflow
  if(hadFocus)document.querySelector('#main')?.focus({preventScroll:true})
}
function motionChanged(event){if(event.matches)finish()}
onMounted(async()=>{
  let seen=false
  try{seen=sessionStorage.getItem('lightning-intro-seen')==='1'}catch{}
  if(seen || motion.matches || location.hash)return
  await nextTick()
  if(!intro.value)return
  previousOverflow=document.body.style.overflow
  intro.value.showModal()
  started=true
  document.body.style.overflow='hidden'
  remember()
  motion.addEventListener('change',motionChanged)
  timer=setTimeout(finish,5000)
})
onUnmounted(()=>{finish();motion.removeEventListener('change',motionChanged)})
</script>

<template>
  <dialog ref="intro" class="crossover-intro" aria-label="Célveren × Lightning" @cancel.prevent="finish">
    <div class="crossover-stage" aria-hidden="true">
      <div class="crossover-names">
        <span class="crossover-celveren">CÉLVEREN</span>
        <span class="crossover-x"><span class="crossover-line"></span><svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><path fill="currentColor" d="M0 5 5 0 24 19 43 0 48 5 29 24 48 43 43 48 24 29 5 48 0 43 19 24Z"/></svg></span>
        <span class="crossover-lightning">LIGHTNING</span>
      </div>
    </div>
    <button class="crossover-skip" type="button" autofocus @click="finish">Skip intro <span aria-hidden="true">→</span></button>
  </dialog>
</template>

<style>
.crossover-intro{position:fixed;inset:0;width:100%;max-width:none;height:100%;height:100dvh;max-height:none;margin:0;padding:0;border:0;background:#0a1018;color:#edf3fa;overflow:hidden}
.crossover-intro::backdrop{background:transparent}
.crossover-intro[open]{animation:crossover-reveal .65s 4.35s ease-in-out both}
.crossover-stage{display:grid;place-items:center;min-height:100%;padding:32px;background:radial-gradient(ellipse at 25% 50%,#213b534f,transparent 55%),radial-gradient(ellipse at 75% 50%,#75432333,transparent 55%)}
.crossover-names{position:relative;display:flex;align-items:baseline;justify-content:center;gap:clamp(20px,4vw,70px);width:100%}
.crossover-celveren{font-family:'Cormorant Garamond',Georgia,serif;font-weight:300;letter-spacing:.3em;font-size:clamp(24px,4.3vw,76px);line-height:1.3;animation:crossover-left 1.15s cubic-bezier(.16,1,.3,1) both}
.crossover-lightning{font-family:'Manrope',sans-serif;font-weight:700;letter-spacing:.12em;font-size:clamp(24px,4.3vw,76px);line-height:1.3;animation:crossover-right 1.15s cubic-bezier(.16,1,.3,1) both}
/* Trim font leading so alignment follows the capital letters, not font line boxes. */
@supports (text-box-trim:trim-both){
  .crossover-names{align-items:flex-end}
  .crossover-celveren,.crossover-lightning{text-box-trim:trim-both;text-box-edge:cap alphabetic}
}
.crossover-x{position:relative;display:flex;overflow:visible;flex:none;color:#e89a62;font-size:clamp(24px,4.3vw,76px);width:.74em;height:.74em;line-height:0;animation:crossover-meet .7s .55s both}
.crossover-x svg{position:relative;display:block;width:100%;height:100%;flex:none}
.crossover-line{position:absolute;left:50%;top:50%;translate:-50% -50%;width:70vw;height:1px;pointer-events:none;background:linear-gradient(90deg,transparent,#e89a6280,transparent);transform:rotate(-18deg);animation:crossover-line 1.2s .4s both}
.crossover-skip{position:absolute;right:max(24px,env(safe-area-inset-right));bottom:max(24px,env(safe-area-inset-bottom));padding:12px 18px;min-height:44px;border:1px solid #52697d;border-radius:6px;color:#edf3fa;background:#111b27;font:500 14px 'Manrope',sans-serif;display:flex;gap:16px;align-items:center}
.crossover-skip:hover{background:#1c2b3a}.crossover-skip:focus-visible{outline:2px solid #e89a62;outline-offset:5px}
@keyframes crossover-left{from{opacity:0;transform:translateX(-75vw)}to{opacity:1;transform:translateX(0)}}
@keyframes crossover-right{from{opacity:0;transform:translateX(75vw)}to{opacity:1;transform:translateX(0)}}
@keyframes crossover-meet{from{opacity:0;transform:scale(1.8) rotate(-18deg)}to{opacity:1;transform:scale(1) rotate(0)}}
@keyframes crossover-line{from{opacity:0;scale:.2}to{opacity:1;scale:1}}
@keyframes crossover-reveal{to{opacity:0}}
@media(max-width:760px){.crossover-names{flex-direction:column;align-items:center;gap:26px}.crossover-celveren{font-size:clamp(24px,7vw,52px);padding-left:.3em}.crossover-lightning{font-size:clamp(24px,7vw,52px)}.crossover-x{font-size:72px}.crossover-line{width:110vw;transform:rotate(-35deg)}}
@media(prefers-reduced-motion:reduce){.crossover-intro[open],.crossover-intro *{animation:none!important}}
</style>
