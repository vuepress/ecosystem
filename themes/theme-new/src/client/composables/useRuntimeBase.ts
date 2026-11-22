import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useSiteData } from 'vuepress/client'

/**
 * Whether the site uses clean URLs
 *
 * VuePress page paths always end with `.html`, so the VitePress `cleanUrls`
 * option is never enabled in this theme.
 *
 * 站点是否使用干净的 URL
 *
 * VuePress 页面路径始终以 `.html` 结尾，因此本主题不会启用 VitePress 的 `cleanUrls` 选项。
 */
export const CLEAN_URLS = false

/**
 * Resolve the runtime base of the site
 *
 * The runtime base is the native site base without the trailing slash, and is
 * an empty string when the site is served from the root.
 *
 * 解析站点的运行时 base
 *
 * 运行时 base 是去除末尾斜杠的原生站点 base；站点部署在根路径时为空字符串。
 *
 * @returns Computed runtime base / 计算得到的运行时 base
 */
export const useRuntimeBase = (): ComputedRef<string> => {
  const site = useSiteData()

  return computed(() => {
    const { base } = site.value
    return base === '/' ? '' : base.replace(/\/$/u, '')
  })
}
