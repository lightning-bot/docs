import path from 'node:path'

export function routeFor(file) { return file === 'README.md' ? '/docs' : '/' + file.replace(/\.md$/, '') }

export function resolveContentPath(file, target) {
  return path.posix.normalize(path.posix.join(path.posix.dirname(file), target.replace(/^\//, '')))
}
