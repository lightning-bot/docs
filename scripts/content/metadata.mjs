import sanitizeHtml from 'sanitize-html'

/** Sanitize after every extension, then derive search data from the actual output. */
export function finalizeHtml(rendered, headings) {
  const html=sanitizeHtml(rendered,{allowedTags: [...sanitizeHtml.defaults.allowedTags,'img','details','summary'],allowedAttributes:{...sanitizeHtml.defaults.allowedAttributes,'*':['id','class'],img:['src','alt','title','width','height']}})
  const text=sanitizeHtml(html,{allowedTags:[],allowedAttributes:{}}).replace(/\s+/g,' ').trim()
  const sections = [...html.matchAll(/<h([2-6]) id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g)].map((match, i, matches) => ({
    id: match[2], title: sanitizeHtml(match[3], {allowedTags:[],allowedAttributes:{}}),
    text: sanitizeHtml(html.slice(match.index + match[0].length, matches[i+1]?.index ?? html.length).replace(/<[^>]+>/g,' '), {allowedTags:[],allowedAttributes:{}}).replace(/\s+/g,' ').trim()
  }))
  return {html,headings,text,sections}
}