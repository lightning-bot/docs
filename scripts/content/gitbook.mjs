/** Legacy GitBook syntax lives here, independently of the Markdown compiler. */
export const gitbookExtension = {
  name: 'gitbook',
  preprocess(source, { md }) {
  return source.replace(/{% hint style="(\w+)" %}/g, (_,kind)=>`<aside class="callout ${kind}">\n\n`).replace(/{% endhint %}/g,'\n\n</aside>')
    .replace(/{% tabs %}|{% endtabs %}/g,'').replace(/{% tab title="([^"]+)" %}/g,(_,title)=>`<details class="format-example"><summary>${md.utils.escapeHtml(title)}</summary>\n\n`).replace(/{% endtab %}/g,'\n\n</details>')
    .replace(/{% embed url="([^"]+)" %}/g,(_,url)=>`[Watch the setup walkthrough](${url})`)
  },
}
