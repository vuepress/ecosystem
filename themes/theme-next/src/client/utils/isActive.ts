import { EXT_RE, HASH_RE, inBrowser } from './constants.js'

export function normalize(path: string): string {
  return decodeURI(path).replace(HASH_RE, '').replace(EXT_RE, '')
}

export function isActive(
  currentPath: string,
  matchPath?: string,
  asRegex = false,
): boolean {
  if (matchPath === undefined) return false

  currentPath = normalize(`/${currentPath.replace(/^\//, '')}`)

  if (asRegex) return new RegExp(matchPath).test(currentPath)

  if (normalize(matchPath) !== currentPath) return false

  const hashMatch = matchPath.match(HASH_RE)

  if (hashMatch) return (inBrowser ? location.hash : '') === hashMatch[0]

  return true
}
