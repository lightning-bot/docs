import path from 'node:path'

export function resolveContentPath(file, target) {
  return path.posix.normalize(path.posix.join(path.posix.dirname(file), target.replace(/^\//, '')))
}
