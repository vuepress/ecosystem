import { useRouter } from 'vuepress/client'

declare global {
  interface Window {
    _hmt?: [name: string, options: unknown][]
  }
}

/**
 * Initialize Baidu Analytics tracking
 *
 * @param id - Baidu Analytics tracking ID
 *
 * @description Injects Baidu Analytics script and tracks page views automatically.
 * The global `_hmt` array will be available for custom event tracking.
 *
 * @see https://tongji.baidu.com/
 * @see https://tongji.baidu.com/holmes/Analytics/%E6%8A%80%E6%9C%AF%E6%8E%A5%E5%85%A5%E6%8C%87%E5%8D%97/JS%20API/JS%20API%20%E6%A6%82%E8%BF%B0
 */
export const useBaiduAnalytics = (id: string): void => {
  if (__VUEPRESS_SSR__) return

  const router = useRouter()

  // avoid duplicated import
  if (window._hmt) return

  // inject baidu analytics script
  window._hmt = []
  const script = document.createElement('script')
  script.src = `https://hm.baidu.com/hm.js?${id}`
  script.async = true
  document.head.appendChild(script)

  router.afterEach((to) => {
    window._hmt!.push(['_trackPageview', to.fullPath])
  })
}
