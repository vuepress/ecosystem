import { EXT_RE, HASH_RE, inBrowser } from '@theme/constants'

export const normalize = (path: string): string =>
  decodeURI(path).replace(HASH_RE, '').replace(EXT_RE, '')

export const isActive = (
  currentPath: string,
  matchPath?: string,
  asRegex = false,
): boolean => {
  if (matchPath === undefined) return false

  // eslint-disable-next-line no-param-reassign
  currentPath = normalize(`/${currentPath.replace(/^\//, '')}`)

  if (asRegex) return new RegExp(matchPath).test(currentPath)

  if (normalize(matchPath) !== currentPath) return false

  const hashMatch = matchPath.match(HASH_RE)

  if (hashMatch) return (inBrowser ? window.location.hash : '') === hashMatch[0]

  return true
}
