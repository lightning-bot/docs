const prefixMarker='{{ selected_prefix }}'

export function replaceCommandPrefixes(text,prefix='.'){
  // A function replacement preserves literal dollar signs and never evaluates templates.
  return text.replaceAll(prefixMarker,()=>prefix??'.')
}

export function personalizeCommands(html,prefix='.'){
  // Input HTML is compiler-sanitized. Escape user text before inserting it, and
  // replace markers only in code content, never in links or HTML attributes.
  const escaped=String(prefix??'.').replace(/[&<>"']/g,char=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[char])
  return html.replace(/(<code\b[^>]*>)([\s\S]*?)(<\/code>)/g,
    (_,open,content,close)=>open+replaceCommandPrefixes(content,escaped)+close)
}
