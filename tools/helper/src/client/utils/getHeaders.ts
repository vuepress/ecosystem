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

export type HeaderLevels = number | 'deep' | false | [number, number]

export type MenuItem = Omit<Header, 'children' | 'slug'> & {
  element: HTMLHeadElement
  children?: MenuItem[]
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
  const allowedHeaders = headers.filter(
    (h) => h.level >= high && h.level <= low,
  )

  const res: MenuItem[] = []

  // eslint-disable-next-line no-restricted-syntax
  outer: for (let i = 0; i < allowedHeaders.length; i++) {
    const cur = allowedHeaders[i]
    if (i === 0) {
      res.push(cur)
    } else {
      for (let j = i - 1; j >= 0; j--) {
        const prev = allowedHeaders[j]
        if (prev.level < cur.level) {
          ;(prev.children ??= []).push(cur)
          continue outer
        }
      }
      res.push(cur)
    }
  }

  return res
}

const serializeHeader = (h: Element, ignore: string[] = []): string => {
  let text: string

  if (ignore.length) {
    const clone = h.cloneNode(true) as Element

    clone.querySelectorAll(ignore.join(',')).forEach((el) => {
      el.remove()
    })

    text = clone.textContent || ''
  } else {
    text = h.textContent || ''
  }

  return text.trim()
}

export interface GetHeadersOptions {
  /**
   * The selector of the headers.
   *
   * It will be passed as an argument to `document.querySelectorAll(selector)`,
   * so you should pass a `CSS Selector` string.
   *
   * @default '[vp-content] h1, [vp-content] h2, [vp-content] h3, [vp-content] h4, [vp-content] h5, [vp-content] h6'
   */
  selector?: string
  /**
   * Ignore specific elements within the header.
   *
   * The Array of `CSS Selector`
   *
   * @default []
   */
  ignore?: string[]
  /**
   * The levels of the headers.
   *
   * `1` to `6` for `<h1>` to `<h6>`
   *
   * - `false`: No headers.
   * - `number`: only headings of that level will be displayed.
   * - `[number, number]: headings level tuple, where the first number should be less than the second number, for example, `[2, 4]` which means all headings from `<h2>` to `<h4>` will be displayed.
   * - `deep`: same as `[2, 6]`, which means all headings from `<h2>` to `<h6>` will be displayed.
   *
   * @default 2
   */
  levels?: HeaderLevels
}

/**
 * Get headers of current page.
 */
export const getHeaders = ({
  selector = [...new Array<undefined>(6)]
    .map((_, i) => `[vp-content] h${i + 1}`)
    .join(','),
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
        link: `#${el.id}`,
        slug: el.id,
        level,
      }
    })
  return resolveHeaders(headers, levels)
}
