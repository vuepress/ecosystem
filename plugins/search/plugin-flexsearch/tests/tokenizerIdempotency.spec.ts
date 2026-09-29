import { describe, expect, it } from 'vitest'

import { createTokenizer } from '../src/shared/index.js'

/**
 * Corpora that stress the tokenizer: ligatures, stroked letters, combining
 * marks, apostrophes, scripts without word separators, mixed scripts.
 *
 * 用于压测分词器的语料：连字、带笔画的字母、组合标记、撇号、不以空格分词的文字、混排文字。
 */
const corpora = [
  'Hello, World!',
  "It's a test",
  'Le Café déjà vu',
  'Straße für Über',
  'ﬁnal ﬂow ﬀ',
  '中文内容测试',
  '日本語のテストです',
  '한국어 테스트',
  'ภาษาไทย ทดสอบ',
  'محتوى اختبار',
  'Hướng dẫn sử dụng',
  'ÄÖÜ ß Ǆ ǅ ǆ',
  'VuePress 2 — markdown-it',
  'e-mail: user@example.com',
  'snake_case and kebab-case',
  'C++ & C# f(x) = y',
  '   leading and trailing   ',
  '',
  'a',
  '𝟘𝟙𝟚 mathematical alphanumerics',
]

describe('tokenizer idempotency', () => {
  // The plugin searches one token at a time, which makes FlexSearch take its
  // single-term fast path. That is only safe when re-tokenizing a token yields
  // that same token, otherwise a token would be matched in a way the index was
  // not built for.
  //
  // 插件每次只搜索一个词条，这会让 FlexSearch 走上单关键词的快速路径。只有当重新分词一个词条仍然得到该词条时它才是安全的，否则词条会以与构建索引时不同的方式被匹配。
  it.each(['en-US', 'zh-CN', 'ja-JP', 'ko-KR', 'th-TH', 'vi-VN', 'de-DE'])(
    'should keep the tokens of %s stable',
    (lang) => {
      const tokenize = createTokenizer(lang)
      const tokens = corpora.flatMap((text) => tokenize(text))

      for (const token of tokens)
        expect(tokenize(token), `${lang}: ${token}`).toStrictEqual([token])
    },
  )
})
