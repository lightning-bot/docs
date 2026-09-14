const other=side=>side==='automod'?'modlog':'automod'
function show(card,side){
  card.dataset.side=side
  card.querySelector('[data-flip]').setAttribute('aria-label',`Showing ${side==='automod'?'AutoMod setup':'a moderation log entry'}. Flip to ${side==='automod'?'Mod logs':'AutoMod'}.`)
  card.querySelectorAll('[data-face]').forEach(face=>face.setAttribute('aria-hidden',String(face.dataset.face!==side)))
  card.querySelectorAll('[data-preview-side]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.previewSide===side)))
}
export function previewClick(event){
  const button=event.target.closest('[data-flip], [data-preview-side]')
  if(!button)return
  const card=button.closest('[data-preview]')
  const side=button.dataset.previewSide || other(card.dataset.side)
  card.dataset.selected=side
  show(card,side)
}
export function previewOver(event){
  const button=event.target.closest('[data-flip]')
  if(!button || button.contains(event.relatedTarget) || event.pointerType!=='mouse' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches)return
  const card=button.closest('[data-preview]')
  show(card,other(card.dataset.selected))
}
export function previewOut(event){
  const button=event.target.closest('[data-flip]')
  if(!button || button.contains(event.relatedTarget) || event.pointerType!=='mouse')return
  const card=button.closest('[data-preview]')
  show(card,card.dataset.selected)
}
