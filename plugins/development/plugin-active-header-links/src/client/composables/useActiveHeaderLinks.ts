import { useDebounceFn, useEventListener } from '@vueuse/core'
import { useRouter, withoutScrollRestoration } from 'vuepress/client'

export interface UseActiveHeaderLinksOptions {
  headerLinkSelector: string
  headerAnchorSelector: string
  delay: number
  offset?: number
}

let warnedDeprecatedScrollBehavior = false

/**
 * Warn once when the router still uses the deprecated `scrollBehavior` option
 *
 * @param scrollBehavior - The deprecated `scrollBehavior` option / 已废弃的
 *   `scrollBehavior` 选项
 */
const warnDeprecatedScrollBehavior = (scrollBehavior: unknown): void => {
  if (!__VUEPRESS_DEV__ || warnedDeprecatedScrollBehavior || !scrollBehavior)
    return

  warnedDeprecatedScrollBehavior = true
  // oxlint-disable-next-line no-console
  console.warn(
    '[plugin-active-header-links] The `scrollBehavior` router option is deprecated by Vue Router and may conflict with active header links. ' +
      'Remove it and migrate to `ScrollRestoration`. See https://router.vuejs.org/guide/advanced/scroll-behavior.html',
  )
}

export const useActiveHeaderLinks = ({
  headerLinkSelector,
  headerAnchorSelector,
  delay,
  offset = 5,
}: UseActiveHeaderLinksOptions): void => {
  if (__VUEPRESS_SSR__) return

  const router = useRouter()

  // oxlint-disable-next-line typescript/no-deprecated
  warnDeprecatedScrollBehavior(router.options.scrollBehavior)

  let isUpdating = false
  let needsUpdate = false
  // assigned after `updateHash`, which references it
  // oxlint-disable-next-line prefer-const
  let setActiveRouteHash: () => void

  const updateHash = async (hash: string): Promise<void> => {
    if (isUpdating) {
      needsUpdate = true

      return
    }

    isUpdating = true

    const { path, query } = router.currentRoute.value

    try {
      // Skip the client scroll restoration, which would otherwise scroll the
      // page to the hash element and move the viewport while the user is
      // scrolling. The viewport is not touched by this navigation at all.
      await router.replace(withoutScrollRestoration({ path, query, hash }))
    } finally {
      isUpdating = false

      // The scroll position may have changed during the update, so the active
      // header may be different now. Reconcile the hash after the update, unless
      // the user navigated to another page in the meantime.
      if (needsUpdate) {
        needsUpdate = false

        if (router.currentRoute.value.path === path) setActiveRouteHash()
      }
    }
  }

  setActiveRouteHash = (): void => {
    if (isUpdating) {
      needsUpdate = true

      return
    }

    // get current scrollTop
    const scrollTop = Math.max(
      window.scrollY,
      document.documentElement.scrollTop,
      document.body.scrollTop,
    )
    // check if we are at page top
    const isAtPageTop = Math.abs(scrollTop) < offset

    // replace current route hash with empty string when scrolling back to the top
    if (isAtPageTop) {
      void updateHash('')

      return
    }

    // get current scrollBottom
    const scrollBottom = window.innerHeight + scrollTop
    // get the total scroll length of current page
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
    )
    // check if we have reached page bottom
    // notice the `scrollBottom` might not be exactly equal to `scrollHeight`, so we add offset here
    const isAtPageBottom = Math.abs(scrollHeight - scrollBottom) < offset

    // get all header links
    const headerLinks = [
      ...document.querySelectorAll<HTMLAnchorElement>(headerLinkSelector),
    ]
    // get all header anchors
    const headerAnchors = [
      ...document.querySelectorAll<HTMLAnchorElement>(headerAnchorSelector),
    ]
    // filter anchors that do not have corresponding links
    const existedHeaderAnchors = headerAnchors.filter((anchor) =>
      headerLinks.some((link) => link.hash === anchor.hash),
    )

    for (let i = 0; i < existedHeaderAnchors.length; i++) {
      const anchor = existedHeaderAnchors[i]
      const nextAnchor = existedHeaderAnchors[i + 1] as
        | HTMLAnchorElement
        | undefined

      // notice the `scrollTop` might not be exactly equal to `offsetTop` after clicking the anchor
      // so we add offset

      // if has scrolled past this anchor
      const hasPassedCurrentAnchor =
        scrollTop >= (anchor.parentElement?.offsetTop ?? 0) - offset

      // if has not scrolled past next anchor
      const hasNotPassedNextAnchor =
        !nextAnchor ||
        scrollTop < (nextAnchor.parentElement?.offsetTop ?? 0) - offset

      // if this anchor is the active anchor
      const isActive = hasPassedCurrentAnchor && hasNotPassedNextAnchor

      // continue to find the active anchor
      if (!isActive) continue

      const routeHash = decodeURIComponent(router.currentRoute.value.hash)
      const anchorHash = decodeURIComponent(anchor.hash)

      // if the active anchor hash is current route hash, do nothing
      if (routeHash === anchorHash) return

      // check if anchor is at the bottom of the page to keep hash consistent
      if (isAtPageBottom) {
        for (let j = i + 1; j < existedHeaderAnchors.length; j++) {
          // if current route hash is below the active hash, do nothing
          if (routeHash === decodeURIComponent(existedHeaderAnchors[j].hash))
            return
        }
      }

      // replace current route hash with the active anchor hash
      void updateHash(anchorHash)

      return
    }
  }

  useEventListener('scroll', useDebounceFn(setActiveRouteHash, delay))
}
