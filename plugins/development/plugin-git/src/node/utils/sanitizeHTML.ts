import rehypeParse from 'rehype-parse'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import type { Processor } from 'unified'
import { unified } from 'unified'

let rehypeInstance: Processor | null = null

/**
 * Sanitize HTML
 *
 * 清理 HTML
 *
 * @see https://github.com/rehypejs/rehype-sanitize
 *
 * @param html - HTML string / HTML 字符串
 * @returns Sanitized HTML string / 清理后的 HTML 字符串
 */
export const sanitizeHTML = (html: string): string => {
  rehypeInstance ??= unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeSanitize, {
      tagNames: ['a', 'em', 'strong', 'code'],
      attributes: {
        a: [['href', /^https?:\/\//], 'target', 'rel'],
      },
      strip: ['script', 'style'],
    })
    .use(rehypeStringify)
    .freeze() as unknown as Processor

  return String(rehypeInstance.processSync(html))
}
