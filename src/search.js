const normalize = value => value.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim()

export function createSearch(pages) {
  const entries = pages.flatMap(page => [
    {...page, heading: '', href: page.path},
    ...(page.sections || []).map(section => ({...page, text: section.text, heading: section.title, href: `${page.path}#${section.id}`}))
  ]).map(entry => ({...entry, titleTerms: normalize(entry.title), headingTerms: normalize(entry.heading), bodyTerms: normalize(entry.text)}))
  return query => {
    const phrase = normalize(query)
    if (!phrase) return pages.map(page => ({...page, href:page.path, excerpt:page.text.slice(0,180) + (page.text.length > 180 ? '…' : '')}))
    const terms = [...new Set(phrase.split(' '))]
    return entries.map(entry => {
      const fields = [entry.titleTerms, entry.headingTerms, entry.bodyTerms]
      if (!terms.every(term => fields.some(field => field.includes(term)))) return null
      const score = terms.reduce((score, term) => score + (entry.titleTerms.includes(term) ? 12 : 0) + (entry.headingTerms.includes(term) ? 18 : 0) + (entry.bodyTerms.includes(term) ? 1 : 0), 0)
        + (entry.titleTerms === phrase ? 40 : 0) + (entry.headingTerms === phrase ? 60 : 0) + (entry.bodyTerms.includes(phrase) ? 5 : 0) + (entry.heading ? 2 : 0)
      // Find context in the original text so the excerpt preserves punctuation.
      const lower = entry.text.toLowerCase()
      const positions = terms.map(term => lower.indexOf(term)).filter(position => position >= 0)
      let start = positions.length ? Math.max(0, Math.min(...positions) - 55) : 0
      if (start) { const boundary = entry.text.indexOf(' ', start); if (boundary >= 0) start = boundary + 1 }
      const excerpt = (start ? '…' : '') + entry.text.slice(start, start + 180) + (start + 180 < entry.text.length ? '…' : '')
      return {...entry, score, excerpt}
    }).filter(Boolean).sort((a,b) => b.score-a.score).slice(0,20)
  }
}
