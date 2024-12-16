const CJK_REGEXP =
  /[\u4e00-\u9fff\u3400-\u4dbf\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/

export const defaultQuerySplitter = (query: string): string[] =>
  query
    .split(/\s+/)
    .map((word) => {
      if (word.length > 3) {
        const chars = word.split('')

        if (chars.every((char) => CJK_REGEXP.test(char))) return chars
      }

      return word
    })
    .flat()
