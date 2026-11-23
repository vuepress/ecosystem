import { useDebounceFn, useEventListener } from '@vueuse/core'
import { nextTick } from 'vue'
import type { Router } from 'vuepress/client'
import { useRouter } from 'vuepress/client'

export interface UseActiveHeaderLinksOptions {
  headerLinkSelector: string
  headerAnchorSelector: string
  delay: number
  offset?: number
}

/**
 * Update current hash without moving the viewport
 *
 * @param router - Vue Router instance / Vue Router 实例
 * @param hash - Hash to update / 要更新的 hash
 */
const updateHash = async (router: Router, hash: string): Promise<void> => {
  const { path, query } = router.currentRoute.value
  const { scrollX, scrollY } = window
  // Themes may still set the deprecated `scrollBehavior` option, and Vue Router
  // executes it on navigation to scroll to the hash element. Disable it
  // temporarily, otherwise it would move the page away from the scroll position.
  // oxlint-disable-next-line typescript/no-deprecated
  const { scrollBehavior } = router.options
  // oxlint-disable-next-line typescript/no-deprecated
  router.options.scrollBehavior = undefined

  try {
    await router.replace({ path, query, hash })
  } finally {
    // oxlint-disable-next-line typescript/no-deprecated
    router.options.scrollBehavior = scrollBehavior
  }

  // The client restores the scroll position of the route after the navigation,
  // which scrolls the page to the hash element. Wait for the restoration to run,
  // then move the page back to the position the user has scrolled to, otherwise
  // scrolling the page would jump between the headings.
  //
  // The restoration may start a smooth scroll instead of jumping, because of the
  // `scroll-behavior: smooth` CSS property. The scroll position is not changed
  // yet when the navigation is done, so the restoration cannot be detected by
  // comparing positions. The `instant` behavior always moves the page back and
  // aborts the pending smooth scroll at the same time, otherwise the page would
  // keep moving to the hash element and trigger another hash update.
  await nextTick()
  window.scrollTo({ behavior: 'instant', left: scrollX, top: scrollY })
}

export const useActiveHeaderLinks = ({
  headerLinkSelector,
  headerAnchorSelector,
  delay,
  offset = 5,
}: UseActiveHeaderLinksOptions): void => {
  if (__VUEPRESS_SSR__) return

  const router = useRouter()

  const setActiveRouteHash = (): void => {
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
      void updateHash(router, '')

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
      void updateHash(router, anchorHash)

      return
    }
  }

  useEventListener('scroll', useDebounceFn(setActiveRouteHash, delay))
}
