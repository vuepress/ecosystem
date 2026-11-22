import { useMediaQuery } from '@vueuse/core'
import { onMounted, onUpdated, type TemplateRef, watch } from 'vue'
import { useRoute } from 'vuepress/client'

import type { DefaultTheme, ThemeConfig } from '../shared.js'

// cached list of anchor elements from resolveHeaders
const resolvedHeaders: { element: HTMLHeadElement; link: string }[] = []

export function resolveTitle(theme: ThemeConfig): string {
  return (
    (typeof theme.outline === 'object' &&
      !Array.isArray(theme.outline) &&
      theme.outline.label) ||
    'On this page'
  )
}

export function getHeaders(
  range: ThemeConfig['outline'],
): DefaultTheme.OutlineItem[] {
  const headers = [
    ...document.querySelectorAll(
      '.vp-doc h1, .vp-doc h2, .vp-doc h3, .vp-doc h4, .vp-doc h5, .vp-doc h6',
    ),
  ]
    .filter((el) => el.id && el.hasChildNodes())
    .map((el) => {
      const level = Number(el.tagName[1])
      return {
        element: el as HTMLHeadElement,
        title: serializeHeader(el),
        link: '#' + el.id,
        level,
      }
    })

  return resolveHeaders(headers, range)
}

function serializeHeader(h: Element): string {
  // VuePress wraps the heading text inside the anchor link, so the text cannot
  // be collected from the heading's direct child nodes. Clone the heading and
  // drop the elements that should not show up in the outline.
  const clone = h.cloneNode(true) as Element

  clone
    .querySelectorAll('.vp-badge, .footnote-ref, .ignore-header')
    .forEach((el) => el.remove())

  return (clone.textContent ?? '').trim()
}

export function resolveHeaders(
  headers: DefaultTheme.OutlineItem[],
  range?: ThemeConfig['outline'],
): DefaultTheme.OutlineItem[] {
  if (range === false) {
    return []
  }

  const levelsRange =
    (typeof range === 'object' && !Array.isArray(range)
      ? range.level
      : range) || 2

  const [high, low]: [number, number] =
    typeof levelsRange === 'number'
      ? [levelsRange, levelsRange]
      : levelsRange === 'deep'
        ? [2, 6]
        : levelsRange

  return buildTree(headers, high, low)
}

export function useActiveAnchor(
  container: TemplateRef<HTMLElement>,
  marker: TemplateRef<HTMLElement>,
): void {
  const route = useRoute()
  const isAsideVisible = useMediaQuery('(min-width: 80rem)')

  let prevActiveLink: HTMLAnchorElement | null = null

  function activateLink(hash: string | null): void {
    const activeLink =
      hash != null
        ? (container.value?.querySelector<HTMLAnchorElement>(
            `a[href$="${decodeURIComponent(hash)}"]`,
          ) ?? null)
        : null

    if (activeLink === prevActiveLink) return

    prevActiveLink?.classList.remove('active')
    prevActiveLink = activeLink

    if (activeLink) {
      activeLink.classList.add('active')

      if (marker.value) {
        // the links' offsetParent (.root) sits below the outline title while
        // the marker is offset from .content, so re-align their origins
        marker.value.style.top =
          activeLink.offsetTop +
          ((activeLink.offsetParent as HTMLElement)?.offsetTop ?? 0) +
          (activeLink.offsetHeight - marker.value.offsetHeight) / 2 +
          'px'
        marker.value.style.opacity = '1'
      }

      // Do not call `scrollIntoView()` on the link: the outline is sticky and
      // can be taller than the viewport, so scrolling the link into view would
      // scroll the page itself while the plugin is updating the hash on every
      // scroll, which makes the page jump between anchors.
    } else if (marker.value) {
      marker.value.style.top = ''
      marker.value.style.opacity = '0'
    }
  }

  // the active heading is tracked by `@vuepress/plugin-active-header-links`,
  // which keeps `route.hash` pointing at the current section while scrolling
  const syncActiveLink = (hash: string): void => {
    if (!isAsideVisible.value) return

    activateLink(hash || null)
  }

  watch(() => route.hash, syncActiveLink, { flush: 'post' })

  onMounted(() => {
    requestAnimationFrame(() => syncActiveLink(route.hash || ''))
  })

  onUpdated(() => {
    syncActiveLink(route.hash || '')
  })
}

function buildTree(
  data: DefaultTheme.OutlineItem[],
  min: number,
  max: number,
): DefaultTheme.OutlineItem[] {
  resolvedHeaders.length = 0

  const result: DefaultTheme.OutlineItem[] = []
  const stack: (
    | DefaultTheme.OutlineItem
    | { level: number; shouldIgnore: true }
  )[] = []

  data.forEach((item) => {
    const node = { ...item, children: [] }
    let parent = stack[stack.length - 1]

    while (parent && parent.level >= node.level) {
      stack.pop()
      parent = stack[stack.length - 1]
    }

    if (
      node.element.classList.contains('ignore-header') ||
      (parent && 'shouldIgnore' in parent)
    ) {
      stack.push({ level: node.level, shouldIgnore: true })
      return
    }

    if (node.level > max || node.level < min) return
    resolvedHeaders.push({ element: node.element, link: node.link })

    if (parent) parent.children!.push(node)
    else result.push(node)

    stack.push(node)
  })

  return result
}
