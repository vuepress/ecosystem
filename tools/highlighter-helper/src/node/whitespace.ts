export const WHITESPACE_REGEXP = /:whitespace(?:=(all|boundary|trailing)?)?\b/
export const NO_WHITESPACE_REGEXP = /:no-whitespace\b/

export type WhitespacePosition = 'all' | 'boundary' | 'trailing'

export const resolveWhitespacePosition = (
  info: string,
  defaultPosition?: WhitespacePosition | boolean,
): WhitespacePosition | false => {
  if (NO_WHITESPACE_REGEXP.test(info)) {
    return false
  }

  const position = defaultPosition === true ? undefined : defaultPosition

  const match = info.match(WHITESPACE_REGEXP)

  if (match) {
    return (match[1] as WhitespacePosition | undefined) || position || 'all'
  }

  return position ?? false
}
