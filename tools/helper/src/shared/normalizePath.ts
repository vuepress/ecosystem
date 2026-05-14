const HASH_REGEXP = /#.*$/u

export const normalizePath = (path: string, removeHash = false): string =>
  (removeHash ? path.replace(HASH_REGEXP, '') : path)
    .replace(/\/(?:README\.md)?$/iu, '/index.html')
    .replace(/(?:\.(?:md|html))?$/iu, '.html')
