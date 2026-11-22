const RAW_LINK_SELECTOR = '.vp-raw a[href]'

/**
 * Keep the links inside the `raw` container out of the SPA router
 *
 * 让 `raw` 容器内的链接不经过 SPA 路由
 *
 * VitePress skips the links inside the `raw` container when it resolves the
 * route path, so that a component library demo can own its links. VuePress
 * converts the internal links into `RouterLink` at build time, so the theme
 * takes the click over in the capture phase and restores the native navigation
 * for the links inside the container.
 *
 * VitePress 在解析路由地址时会跳过 `raw` 容器内的链接，以便组件库演示可以自行接管链接。VuePress 会在构建期把站内链接转换为
 * `RouterLink`，因此主题在捕获阶段接管点击，让容器内的链接恢复原生跳转。
 */
export const setupRawContainerLinks = (): void => {
  if (typeof document === 'undefined') return

  document.addEventListener(
    'click',
    (event): void => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.altKey ||
        event.ctrlKey ||
        event.shiftKey
      )
        return

      const { target } = event

      if (!(target instanceof Element)) return

      const anchor = target.closest<HTMLAnchorElement>(RAW_LINK_SELECTOR)

      if (
        !anchor ||
        (anchor.target !== '' && anchor.target !== '_self') ||
        anchor.hasAttribute('download')
      )
        return

      const url = new URL(anchor.href)

      if (url.origin !== window.location.origin) return

      // `preventDefault()` alone is enough: the VuePress router bails out on
      // the default-prevented event, while the listeners of the page inside the
      // container still receive the click
      event.preventDefault()

      // keep the native in-page hash navigation
      if (
        url.hash &&
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        window.location.hash = url.hash
        return
      }

      // the links inside the container never go through the SPA router, so the
      // page is loaded again like a normal link
      window.location.assign(url.href)
    },
    true,
  )
}
