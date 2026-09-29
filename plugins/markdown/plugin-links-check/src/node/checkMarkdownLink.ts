import { isLinkAbsolute } from '@vuepress/helper'
import type { App, Page } from 'vuepress/core'
import type { MarkdownEnv, MarkdownLink } from 'vuepress/markdown'
import { logger } from 'vuepress/utils'

/**
 * Anchor checking mode
 *
 * 锚点检查方式
 *
 * - `true`: check anchors of all links / 检查所有链接的锚点
 * - `'same-page'`: only check anchors pointing to the current page / 仅检查指向当前页面的锚点
 * - `false`: do not check anchors / 不检查锚点
 */
export type AnchorsCheckMode = boolean | 'same-page'

/**
 * Decode an anchor, leaving it unchanged when it is malformed
 *
 * 解码锚点，格式错误时原样返回
 *
 * @param anchor - Anchor to decode / 要解码的锚点
 * @returns Decoded anchor / 解码后的锚点
 */
const decodeAnchor = (anchor: string): string => {
  try {
    return decodeURI(anchor)
  } catch {
    return anchor
  }
}

/**
 * Resolve the page that a markdown link points to
 *
 * 解析 Markdown 链接指向的页面
 *
 * @param app - VuePress app instance / VuePress 应用实例
 * @param link - Markdown link / Markdown 链接
 * @returns The matched page, or `null` / 匹配到的页面，不存在时为 `null`
 */
const resolveTargetPage = (app: App, link: MarkdownLink): Page | null => {
  const { raw, relative, absolute } = link

  if (isLinkAbsolute(raw)) {
    if (!absolute) return null

    const path = decodeURI(absolute)

    return (
      app.pages.find(
        ({ filePathRelative }) =>
          filePathRelative != null &&
          `${app.siteData.base}${filePathRelative}` === path,
      ) ?? null
    )
  }

  const path = decodeURI(relative)

  return (
    app.pages.find(({ filePathRelative }) => filePathRelative === path) ?? null
  )
}

/**
 * Collect broken anchors of a page
 *
 * 收集页面中的死锚点
 *
 * @param page - The page to check / 要检查的页面
 * @param app - VuePress app instance / VuePress 应用实例
 * @param isIgnoreLink - Function to check if a link should be ignored /
 *   检查链接是否应被忽略的函数
 * @param samePageOnly - Whether to only check anchors pointing to the current
 *   page / 是否仅检查指向当前页面的锚点
 * @returns Broken links / 死链接
 */
const collectBrokenAnchors = (
  page: Page,
  app: App,
  isIgnoreLink: (link: string) => boolean,
  samePageOnly: boolean,
): string[] => {
  const anchorCache = new Map<Page, Set<string> | null>()

  /**
   * Get the anchors of a page, where `null` means the anchors of that page are
   * unknown (e.g. the page is a virtual page, or it is restored from an
   * outdated render cache), in which case its anchors should be skipped to
   * avoid false positives
   *
   * @param target - The page to get anchors from / 要获取锚点的页面
   * @returns Anchors of the page, or `null` / 页面的锚点，未知时为 `null`
   */
  const getAnchors = (target: Page): Set<string> | null => {
    let anchors = anchorCache.get(target)

    if (anchors === undefined) {
      const { markdownAnchors } = target.markdownEnv as MarkdownEnv

      anchors = markdownAnchors
        ? new Set(markdownAnchors.map((anchor) => decodeAnchor(anchor)))
        : null
      anchorCache.set(target, anchors)
    }

    return anchors
  }

  const broken: string[] = []

  const check = (raw: string, path: string | null, target: Page): void => {
    // Keep the same behavior as the link check, where the link without hash is
    // also compared
    if (isIgnoreLink(raw) || (path != null && isIgnoreLink(path))) return

    const anchors = getAnchors(target)

    // The anchors of the target page are unknown, skip it to avoid false
    // positives
    if (!anchors) return

    const hash = raw.slice(raw.indexOf('#') + 1)

    if (!anchors.has(decodeAnchor(hash))) broken.push(raw)
  }

  const env = page.markdownEnv as MarkdownEnv

  // Pure anchor links pointing to the current page, e.g. `#foo`
  for (const link of env.markdownAnchorLinks ?? []) check(link, null, page)

  // Anchor links extracted by the links plugin, e.g. `./foo.md#bar`
  for (const { raw, relative, absolute } of page.links) {
    const index = raw.indexOf('#')

    // The link has no anchor, skip it
    if (index === -1 || index === raw.length - 1) continue

    const target = resolveTargetPage(app, { raw, relative, absolute })

    // The target page does not exist, the link itself is already reported
    if (!target || (samePageOnly && target !== page)) continue

    check(raw, isLinkAbsolute(raw) ? absolute : relative, target)
  }

  return broken
}

/**
 * Check markdown links in a page and report broken links
 *
 * 检查页面中的 Markdown 链接并报告死链接
 *
 * @param page - The page to check / 要检查的页面
 * @param app - VuePress app instance / VuePress 应用实例
 * @param isIgnoreLink - Function to check if a link should be ignored /
 *   检查链接是否应被忽略的函数
 * @param anchors - Anchor checking mode / 锚点检查方式
 * @returns Whether any broken links were found / 是否发现了死链接
 */
export const checkMarkdownLink = (
  page: Page,
  app: App,
  isIgnoreLink: (link: string) => boolean,
  anchors: AnchorsCheckMode = false,
): boolean => {
  const pagePath = page.filePathRelative ?? page.path

  const markdownLinks = page.links.filter(({ raw }) =>
    /\.md(?:[?#]|$)/u.test(raw),
  )

  const brokenLinks = [
    ...markdownLinks
      // Relative markdown links
      .filter(({ raw }) => !isLinkAbsolute(raw))
      .filter(
        ({ relative }) =>
          // Check whether the page exists
          app.pages.every(
            ({ filePathRelative }) => filePathRelative !== decodeURI(relative),
          ) && !isIgnoreLink(relative),
      ),
    ...markdownLinks
      // Absolute markdown links
      .filter(({ raw }) => isLinkAbsolute(raw))
      .filter(
        ({ absolute }) =>
          // Check whether the page exists
          absolute &&
          app.pages.every(
            ({ filePathRelative }) =>
              !filePathRelative ||
              (`${app.siteData.base}${filePathRelative}` !==
                decodeURI(absolute) &&
                !isIgnoreLink(absolute)),
          ),
      ),
  ].map(({ raw }) => raw)

  const brokenAnchors =
    anchors === false
      ? []
      : collectBrokenAnchors(page, app, isIgnoreLink, anchors === 'same-page')

  if (brokenLinks.length > 0)
    logger.warn(`Broken links found in ${pagePath}: ${brokenLinks.join(', ')}`)

  if (brokenAnchors.length > 0) {
    logger.warn(
      `Broken anchors found in ${pagePath}: ${brokenAnchors.join(', ')}`,
    )
  }

  return brokenLinks.length > 0 || brokenAnchors.length > 0
}
