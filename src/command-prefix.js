const defaultPrefix='@Lightning '
const prefixMarker='{{ selected_prefix }}'

export function replaceCommandPrefixes(text,prefix=defaultPrefix){
  // A function replacement preserves literal dollar signs and never evaluates templates.
  return text.replaceAll(prefixMarker,()=>prefix??defaultPrefix)
}

export function personalizeCommands(html,prefix=defaultPrefix){
  // Input HTML is compiler-sanitized. Escape user text before inserting it, and
  // replace markers only in code content, never in links or HTML attributes.
  const escaped=String(prefix??defaultPrefix).replace(/[&<>"']/g,char=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[char])
  return html.replace(/(<code\b[^>]*>)([\s\S]*?)(<\/code>)/g,
    (_,open,content,close)=>open+replaceCommandPrefixes(content,escaped)+close)
}
