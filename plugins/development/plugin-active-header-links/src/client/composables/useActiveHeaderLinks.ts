import { useDebounceFn, useEventListener } from '@vueuse/core'
import { nextTick } from 'vue'
import { useRouter } from 'vuepress/client'

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

/**
 * Temporarily disable the deprecated `scrollBehavior` option
 *
 * @param router - The router instance / 路由实例
 * @returns A function that restores the option
 */
const disableDeprecatedScrollBehavior = (
  router: ReturnType<typeof useRouter>,
): (() => void) => {
  // oxlint-disable-next-line typescript/no-deprecated
  const { scrollBehavior } = router.options

  warnDeprecatedScrollBehavior(scrollBehavior)

  if (scrollBehavior) {
    // oxlint-disable-next-line typescript/no-deprecated
    router.options.scrollBehavior = undefined
  }

  let restored = false

  return () => {
    if (restored) return

    restored = true

    if (scrollBehavior) {
      // oxlint-disable-next-line typescript/no-deprecated
      router.options.scrollBehavior = scrollBehavior
    }
  }
}

/**
 * Track whether the user interacts with the page before an update finishes
 *
 * @returns The interaction state and the cleanup function
 */
const createUserInteractionTracker = (): {
  hasInteracted: () => boolean
  cleanup: () => void
} => {
  let interacted = false

  const markInteracted = (): void => {
    interacted = true
  }

  const interactionEvents = [
    'wheel',
    'touchmove',
    'keydown',
    'click',
    'pointerdown',
  ] as const

  // If the user takes over during the update, keep the viewport with the user
  // instead of restoring the position captured before the update.
  for (const event of interactionEvents) {
    window.addEventListener(event, markInteracted, {
      passive: true,
      once: true,
    })
  }

  return {
    hasInteracted: () => interacted,
    cleanup: (): void => {
      for (const event of interactionEvents)
        window.removeEventListener(event, markInteracted)
    },
  }
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
    const target = { path, query, hash }
    const targetFullPath = router.resolve(target).fullPath
    const { scrollX, scrollY } = window
    const interaction = createUserInteractionTracker()

    // Themes may still set the deprecated `scrollBehavior` option, and Vue Router
    // executes it on navigation to scroll to the hash element. Disable it
    // temporarily, otherwise it would move the page away from the scroll position.
    const restoreScrollBehavior = disableDeprecatedScrollBehavior(router)

    try {
      await router.replace(target)

      // The navigation has already captured the deprecated option, so restore
      // it before waiting for the next tick to narrow the disabled window.
      restoreScrollBehavior()

      // The client restores the scroll position of the route after the
      // navigation, which scrolls the page to the hash element. Wait for the
      // restoration to run, then move the page back to the position the user
      // has scrolled to, otherwise scrolling the page would jump between the
      // headings.
      //
      // The restoration may start a smooth scroll instead of jumping, because
      // of the `scroll-behavior: smooth` CSS property. The scroll position is
      // not changed yet when the navigation is done, so the restoration cannot
      // be detected by comparing positions. The `instant` behavior always moves
      // the page back and aborts the pending smooth scroll at the same time,
      // otherwise the page would keep moving to the hash element and trigger
      // another hash update.
      await nextTick()

      // If the user navigated during the update, the route may have changed.
      // In that case, the page should follow the new route instead of going
      // back to the position captured before the update.
      if (
        !interaction.hasInteracted() &&
        router.currentRoute.value.fullPath === targetFullPath
      )
        window.scrollTo({ behavior: 'instant', left: scrollX, top: scrollY })
    } finally {
      restoreScrollBehavior()
      interaction.cleanup()

      isUpdating = false

      // The scroll position may have changed during the update, so the active
      // header may be different now. Reconcile the hash after the update.
      if (needsUpdate) {
        needsUpdate = false
        setActiveRouteHash()
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
