import type { Tokenizer } from '@orama/orama'

/**
 * Create a tokenizer for the given language.
 *
 * We use `Intl.Segmenter` to split words, which provides good support for CJK
 * languages (Chinese, Japanese, Korean) as well as whitespace-separated
 * languages. Tokens are lowercased so that search is case-insensitive.
 *
 * The same tokenizer must be used both when building the index (node) and when
 * searching in the worker, since Orama tokenizes the search term with it.
 *
 * 为指定语言创建分词器。
 *
 * 我们使用 `Intl.Segmenter` 进行分词，它为中文、日文、韩文等 CJK 语言以及空格分隔的语言
 * 提供了良好的支持。分词结果会被转换为小写，从而实现不区分大小写的搜索。
 *
 * 构建索引（node）与在工作线程中搜索时必须使用相同的分词器，因为 Orama 会用它来分词搜索词。
 *
 * @param language - Language 语言
 * @returns Orama tokenizer Orama 分词器
 */
export const createTokenizer = (language: string): Tokenizer => {
  const segmenter = new Intl.Segmenter(language, { granularity: 'word' })

  return {
    language,
    normalizationCache: new Map(),
    tokenize: (raw: string): string[] =>
      [...segmenter.segment(raw)]
        .map(({ segment }) => segment)
        .filter((word) => word.trim())
        .map((word) => word.toLowerCase()),
  }
}
