import rehypeParse from 'rehype-parse'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import type { Processor } from 'unified'
import { unified } from 'unified'

let rehypeInstance: Processor | null = null

/**
 * Sanitize HTML
 * @see https://github.com/rehypejs/rehype-sanitize
 */
export const sanitizeHTML = (html: string): string => {
  rehypeInstance ??= unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeSanitize, {
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        a: [...(defaultSchema.attributes?.a ?? []), 'target', 'rel'],
      },
    })
    .use(rehypeStringify)
    .freeze() as unknown as Processor

  return String(rehypeInstance.processSync(html))
}
