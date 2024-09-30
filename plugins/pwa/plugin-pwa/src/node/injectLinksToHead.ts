import type { HeadConfig } from 'vuepress/core'
import type { PwaPluginOptions } from './options.js'

export const injectLinksToHead = (
  {
    favicon,
    manifest,
    themeColor = '#46bd87',
    apple,
    msTile,
  }: PwaPluginOptions,
  base = '/',
  head: HeadConfig[] = [],
): HeadConfig[] => {
  const metaKeys: string[] = []
  const linkKeys: string[] = []

  // Generate Hash for Head
  head.forEach((item) => {
    if (item[0] === 'meta') metaKeys.push(item[1].name as string)
    else if (item[0] === 'link') linkKeys.push(item[1].rel as string)
  })

  let fallBackIcon = ''
  const setLink = (
    rel: string,
    href: string,
    more: Record<string, string> = {},
  ): void => {
    if (!linkKeys.includes(rel)) head.push(['link', { rel, href, ...more }])
  }

  const setMeta = (
    name: string,
    content: string,
    more: Record<string, string> = {},
  ): void => {
    if (!metaKeys.includes(name))
      head.push(['meta', { name, content, ...more }])
  }

  if (favicon) setLink('icon', favicon)

  if (manifest?.icons) {
    const { icons } = manifest

    if (icons.length > 0) {
      fallBackIcon = icons[0].src

      manifest.icons.forEach((icon) => {
        if (icon.type)
          setLink('icon', icon.src, { type: icon.type, sizes: icon.sizes })
        else setLink('icon', icon.src, { sizes: icon.sizes })
      })
    }
  }

  setLink('manifest', `${base}manifest.webmanifest`, {
    crossorigin: 'use-credentials',
  })
  setMeta('theme-color', themeColor || '#46bd87')

  if (typeof apple === 'object' && (apple.icon || fallBackIcon)) {
    setLink('apple-touch-icon', apple.icon || fallBackIcon)
    setMeta('apple-mobile-web-app-capable', 'yes')
    setMeta(
      'apple-mobile-web-app-status-bar-style',
      apple.statusBarColor || 'black',
    )
    if (apple.maskIcon)
      setLink('mask-icon', apple.maskIcon, {
        color: themeColor || '#46bd87',
      })
  } else if (apple !== false && fallBackIcon) {
    setLink('apple-touch-icon', fallBackIcon)
    setMeta('apple-mobile-web-app-capable', 'yes')
    setMeta('apple-mobile-web-app-status-bar-style', 'black')
  }

  if (typeof msTile === 'object' && (msTile.image || fallBackIcon)) {
    setMeta('msapplication-TileImage', msTile.image || fallBackIcon)
    setMeta('msapplication-TileColor', msTile.color || themeColor || '#46bd87')
  } else if (msTile !== false && fallBackIcon) {
    setMeta('msapplication-TileImage', fallBackIcon)
    setMeta('msapplication-TileColor', themeColor || '#46bd87')
  }

  return head
}
