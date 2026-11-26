const EN_PREPOSITION = new Set([
  'and',
  'or',
  'in',
  'on',
  'with',
  'by',
  'for',
  'at',
  'about',
  'under',
  'of',
  'to',
  'the',
  'into',
])

/**
 * Get a title from a file or directory name
 *
 * 从文件或目录名中获取标题
 *
 * @param filename - Name of the file or directory / 文件或目录名
 * @returns The title / 标题
 */
export const getTitleFromFilename = (filename: string): string => {
  const words = filename
    .replaceAll(/[-_]/gu, ' ')
    .replaceAll(
      /(?<prefix>^|[^A-Z])(?<upper>[A-Z])/gu,
      (_all, prefix: string, upper: string) =>
        `${prefix} ${upper.toLowerCase()}`,
    )
    .replaceAll(/ +/gu, ' ')
    .trim()
    .split(' ')

  return words
    .map((word, index) =>
      EN_PREPOSITION.has(word) && index !== 0
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(' ')
}
