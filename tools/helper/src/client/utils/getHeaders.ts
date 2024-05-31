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

export const getHeaders = ({
  selector = '#vp-content :where(h1,h2,h3,h4,h5,h6)',
  levels = 2,
  ignore = [],
}: GetHeadersOptions = {}): MenuItem[] => {
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

const serializeHeader = (h: Element, ignore: string[] = []): string => {
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

export const resolveHeaders = (
  headers: MenuItem[],
  levels: HeaderLevels = 2,
): MenuItem[] => {
  if (levels === false) {
    return []
  }

  const [high, low]: [number, number] =
    typeof levels === 'number'
      ? [levels, levels]
      : levels === 'deep'
        ? [2, 6]
        : levels

  headers = headers.filter((h) => h.level >= high && h.level <= low)

  const res: MenuItem[] = []
  // eslint-disable-next-line no-labels
  outer: for (let i = 0; i < headers.length; i++) {
    const cur = headers[i]
    if (i === 0) {
      res.push(cur)
    } else {
      for (let j = i - 1; j >= 0; j--) {
        const prev = headers[j]
        if (prev.level < cur.level) {
          ;(prev.children ??= []).push(cur)
          // eslint-disable-next-line no-labels
          continue outer
        }
      }
      res.push(cur)
    }
  }

  return res
}
