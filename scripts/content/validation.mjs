import fs from 'node:fs'
import path from 'node:path'

export function validateDirectives(source, file) {
  if (/{%/.test(source)) throw new Error(`Unsupported GitBook directive in ${file}`)
}

export function validateTarget(root, resolved, file, href, image = false) {
  if (!fs.existsSync(path.join(root, resolved))) {
    throw new Error(image ? `Missing asset: ${href}` : `Broken link: ${file} -> ${href}`)
  }
}
