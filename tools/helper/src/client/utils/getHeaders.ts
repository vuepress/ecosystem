import type { PageHeader } from 'vuepress/shared'
import type { GetHeadersOptions, HeaderLevels } from '../../shared/index.js'

const DEFAULT_HEADER_SELECTOR = Array.from(
  { length: 6 },
  (_, i) => `[vp-content] h${i + 1}`,
).join(',')

export type HeaderItem = Omit<PageHeader, 'children'> & {
  element: HTMLHeadingElement
  children: HeaderItem[]
}

export const resolveHeaders = (
  headers: HeaderItem[],
  levels: HeaderLevels = 2,
): HeaderItem[] => {
  if (levels === false) return []

  const [high, low]: [number, number] =
    typeof levels === 'number'
      ? [levels, levels]
      : levels === 'deep'
        ? [2, 6]
        : levels
  const allowedHeaders = headers.filter(
    (header) => header.level >= high && header.level <= low,
  )

  const result: HeaderItem[] = []

  // oxlint-disable-next-line no-labels
  outer: for (let i = 0; i < allowedHeaders.length; i++) {
    const current = allowedHeaders[i]

    if (i === 0) {
      result.push(current)
    } else {
      for (let j = i - 1; j >= 0; j--) {
        const prev = allowedHeaders[j]
        if (prev.level < current.level) {
          prev.children.push(current)
          // oxlint-disable-next-line no-labels
          continue outer
        }
      }
      result.push(current)
    }
  }

  return result
}

const serializeHeader = (
  headerEl: Element,
  ignoreSelectors: string[] = [],
): string => {
  let text: string

  if (ignoreSelectors.length > 0) {
    const clone = headerEl.cloneNode(true) as Element

    clone.querySelectorAll(ignoreSelectors.join(',')).forEach((el) => {
      el.remove()
    })

    text = clone.textContent || ''
  } else {
    text = headerEl.textContent || ''
  }

  return text.trim()
}

export const getHeadersFromDom = (
  selector = DEFAULT_HEADER_SELECTOR,
  ignore: string[] = [],
): HeaderItem[] =>
  [...document.querySelectorAll(selector)]
    .filter((el) => el.id && el.hasChildNodes())
    .map((el) => ({
      element: el as HTMLHeadingElement,
      title: serializeHeader(el, ignore),
      link: `#${el.id}`,
      slug: el.id,
      level: Number(el.tagName[1]),
      children: [],
    }))

/**
 * Get headers of current page.
 *
 * 获取当前页面的标题
 *
 * @param {GetHeadersOptions} options - Options for getting headers / 获取标题的选项
 *
 * @returns Array of header items / 标题项数组
 */
export const getHeaders = ({
  selector = DEFAULT_HEADER_SELECTOR,
  levels = 2,
  ignore = [],
}: GetHeadersOptions = {}): HeaderItem[] =>
  resolveHeaders(getHeadersFromDom(selector, ignore), levels)
