/**
 * Regex matching every non-ASCII character.
 *
 * Only non-ASCII characters can carry diacritics, so ASCII text can skip the
 * folding entirely.
 *
 * 匹配所有非 ASCII 字符。
 *
 * 只有非 ASCII 字符可能带有变音符号，因此 ASCII 文本可直接跳过折叠。
 */
const NON_ASCII_REGEXP = /\P{ASCII}/gu

/** Regex matching a single combining mark. 匹配单个组合标记。 */
const COMBINING_MARK_REGEXP = /^\p{M}$/u

/**
 * Letters that do not decompose into a base letter followed by combining marks,
 * but are commonly typed without their stroke or ligature.
 *
 * 无法分解为“基础字母 + 组合标记”，但常会被省略其笔画或连写的字母。
 */
const STROKED_CHARS: Record<string, string> = Object.fromEntries([
  ['Æ', 'A'],
  ['æ', 'a'],
  ['Ð', 'D'],
  ['ð', 'd'],
  ['Đ', 'D'],
  ['đ', 'd'],
  ['Ħ', 'H'],
  ['ħ', 'h'],
  ['Ł', 'L'],
  ['ł', 'l'],
  ['Œ', 'O'],
  ['œ', 'o'],
  ['Ø', 'O'],
  ['ø', 'o'],
  ['Ŧ', 'T'],
  ['ŧ', 't'],
])

/**
 * Cache of already folded characters.
 *
 * Folding relies on Unicode decomposition, and the same characters (e.g. `é`)
 * are folded over and over again while indexing a site.
 *
 * 已折叠字符的缓存。
 *
 * 折叠依赖 Unicode 分解，索引站点时相同的字符（如 `é`）会被反复折叠。
 */
const foldedChars = new Map<string, string>()

/**
 * Fold a single character, e.g. `é` -> `e`.
 *
 * A character is only folded when it is a precomposed character, i.e. when it
 * decomposes into a single character followed by combining marks, or when it is
 * a letter that is commonly written without its stroke. Characters decomposing
 * into several characters (e.g. `ﬁ`) are kept as is, so that folding never
 * changes the length of a text.
 *
 * 只有预组合字符（即分解为单个字符加若干组合标记的字符），以及书写时常省略笔画的字母会被折叠，分解为多个字符的字符（如
 * `ﬁ`）保持不变，因此折叠永远不会改变文本长度。
 *
 * @param char - Character to fold 需要折叠的字符
 * @returns Folded character 折叠后的字符
 */
const foldChar = (char: string): string => {
  const cached = foldedChars.get(char)

  if (cached !== undefined) return cached

  const [base, ...marks] = char.normalize('NFD')
  const folded =
    marks.length > 0 && marks.every((mark) => COMBINING_MARK_REGEXP.test(mark))
      ? base
      : (STROKED_CHARS[char] ?? char)

  foldedChars.set(char, folded)

  return folded
}

/**
 * Fold the diacritics of a text, so that `Café` and `cafe` are indexed and
 * searched identically.
 *
 * The length of the text is preserved, which allows the offsets computed on a
 * folded text to be reused on the original text (necessary to highlight search
 * results).
 *
 * 折叠文本中的变音符号，使 `Café` 与 `cafe` 在索引与搜索时完全一致。
 *
 * 文本长度会被保留，因此折叠后文本的偏移量可直接用于原文本（用于高亮搜索结果）。
 *
 * @param text - Text to fold 需要折叠的文本
 * @returns Folded text 折叠后的文本
 */
export const foldDiacritics = (text: string): string =>
  text.replaceAll(NON_ASCII_REGEXP, foldChar)
