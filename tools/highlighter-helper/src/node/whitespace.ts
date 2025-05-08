export const WHITESPACE_REGEXP = /:whitespace(?:=(all|boundary|trailing)?)?\b/
export const NO_WHITESPACE_REGEXP = /:no-whitespace\b/

export type WhitespacePosition = 'all' | 'boundary' | 'trailing'

const AVAILABLE_WHITESPACE_POSITIONS = ['all', 'boundary', 'trailing']

export const resolveWhitespacePosition = (
  info: string,
  defaultPosition: WhitespacePosition | true,
): WhitespacePosition | false => {
  if (NO_WHITESPACE_REGEXP.test(info)) {
    return false
  }

  const position = AVAILABLE_WHITESPACE_POSITIONS.includes(
    defaultPosition as WhitespacePosition,
  )
    ? (defaultPosition as WhitespacePosition)
    : false

  const match = info.match(WHITESPACE_REGEXP)

  if (match) {
    if (AVAILABLE_WHITESPACE_POSITIONS.includes(match[1])) {
      return match[1] as WhitespacePosition
    }

    return position || 'all'
  }

  return position
}
