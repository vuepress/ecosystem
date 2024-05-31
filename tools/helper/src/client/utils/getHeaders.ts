export interface Header {
  /**
   * The level of the header
   *
   * `1` to `6` for `<h1>` to `<h6>`
   */
  level: number
  /**
   * The title of the header
   */
  title: string
  /**
   * The slug of the header
   *
   * Typically the `id` attr of the header anchor
   */
  slug: string
  /**
   * Link of the header
   *
   * Typically using `#${slug}` as the anchor hash
   */
  link: string
  /**
   * The children of the header
   */
  children: Header[]
}

export type HeaderLevels = false | number | [number, number] | 'deep'

// cached list of anchor elements from resolveHeaders
const resolvedHeaders: { element: HTMLHeadElement; link: string }[] = []

export type MenuItem = Omit<Header, 'slug' | 'children'> & {
  element: HTMLHeadElement
  children?: MenuItem[]
}

export interface GetHeadersOptions {
  /**
   * The selector of the headers
   *
   * @default '#vp-content :where(h1,h2,h3,h4,h5,h6)'
   */
  selector?: string
  /**
   * Ignore specific elements within the header.
   *
   * @default []
   */
  ignore?: string[]
  /**
   * The levels of the headers
   *
   * - `false`: No headers.
   * - `number`: only headings of that level will be displayed.
   * - `[number, number]: the first number is the minimum level and the second number is the maximum level.
   * - `deep`: same as `[2, 6]`, which means all headings from `<h2>` to `<h6>` will be displayed.
   *
   * @default 2
   */
  levels?: HeaderLevels
}

export function getHeaders({
  selector = '#vp-content :where(h1,h2,h3,h4,h5,h6)',
  levels = 2,
  ignore = [],
}: GetHeadersOptions = {}): MenuItem[] {
  const headers = Array.from(document.querySelectorAll(selector))
    .filter((el) => el.id && el.hasChildNodes())
    .map((el) => {
      const level = Number(el.tagName[1])
      return {
        element: el as HTMLHeadElement,
        title: serializeHeader(el, ignore),
        link: '#' + el.id,
        slug: el.id,
        level,
      }
    })
  return resolveHeaders(headers, levels)
}

function serializeHeader(h: Element, ignore: string[] = []): string {
  let text = ''
  if (ignore.length) {
    const clone = h.cloneNode(true) as Element
    clone.querySelectorAll(ignore.join(',')).forEach((el) => el.remove())
    text = clone.textContent || ''
  } else {
    text = h.textContent || ''
  }
  return text.trim()
}

export function resolveHeaders(
  headers: MenuItem[],
  levels?: HeaderLevels,
): MenuItem[] {
  if (levels === false) {
    return []
  }

  const levelsRange = levels || 2

  const [high, low]: [number, number] =
    typeof levelsRange === 'number'
      ? [levelsRange, levelsRange]
      : levelsRange === 'deep'
        ? [2, 6]
        : levelsRange

  headers = headers.filter((h) => h.level >= high && h.level <= low)
  // clear previous caches
  resolvedHeaders.length = 0
  // update global header list for active link rendering
  for (const { element, link } of headers) {
    resolvedHeaders.push({ element, link })
  }

  const ret: MenuItem[] = []
  // eslint-disable-next-line no-labels
  outer: for (let i = 0; i < headers.length; i++) {
    const cur = headers[i]
    if (i === 0) {
      ret.push(cur)
    } else {
      for (let j = i - 1; j >= 0; j--) {
        const prev = headers[j]
        if (prev.level < cur.level) {
          ;(prev.children || (prev.children = [])).push(cur)
          // eslint-disable-next-line no-labels
          continue outer
        }
      }
      ret.push(cur)
    }
  }

  return ret
}
