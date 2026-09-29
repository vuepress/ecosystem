import { createWordTokenizer } from '@vuepress/search-helper/shared'
import type { WordTokenizer } from '@vuepress/search-helper/shared'

export { isSegmenterAvailable } from '@vuepress/search-helper/shared'

/**
 * Tokenizer of an index.
 *
 * It is used as the `encode` function of FlexSearch, so that the index and the
 * queries are tokenized exactly the same way.
 *
 * 索引的分词器。
 *
 * 它被用作 FlexSearch 的 `encode` 函数，因此索引与查询会以完全相同的方式分词。
 */
export type SearchTokenizer = WordTokenizer

/**
 * Create the tokenizer of an index.
 *
 * Tokens are lowercased and the diacritics of the letters that fold into an
 * ASCII letter are folded, so that `Café` matches `cafe` and `VuePress` matches
 * `vuepress`. Only the letters that fold into an ASCII letter are folded,
 * because FlexSearch matches one token at a time: folding the others could
 * split a token into several ones and change what searching it means.
 *
 * 创建索引的分词器。
 *
 * 词条会被转换为小写，且只有折叠后为 ASCII 字母的字母会折叠其变音符号，因此 `Café` 能匹配 `cafe`，`VuePress` 能匹配
 * `vuepress`。只有折叠后为 ASCII 字母的字母会被折叠，因为 FlexSearch
 * 每次只匹配一个词条：折叠其他字符可能把一个词条拆成多个，从而改变搜索它的语义。
 *
 * 重复项会被移除，FlexSearch 不需要它们：它匹配的是词条是否存在而非其出现频率，保留它们只会让序列化后的索引变大。
 *
 * @example
 *   import { createTokenizer } from '@vuepress/plugin-flexsearch'
 *
 *   createTokenizer('en-US')('Hello, World!') // ['hello', 'world']
 *
 * @param language - Language of the locale (e.g. `zh-CN`) 语言环境的语言（如 `zh-CN`）
 * @returns Tokenizer of the language 该语言的分词器
 */
export const createTokenizer = (language: string): SearchTokenizer => {
  const tokenize = createWordTokenizer(language)

  return (text: string): string[] => [...new Set(tokenize(text))]
}
