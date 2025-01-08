import type { App } from 'vuepress/core'
import { isPlainObject } from 'vuepress/shared'
import type { PwaPluginOptions } from './options.js'

export const injectLinksToHead = (
  app: App,
  { favicon, manifest, themeColor = '#46bd87', apple }: PwaPluginOptions,
): void => {
  const { base, head } = app.siteData
  const metaKeys: string[] = []
  const linkKeys: string[] = []

  // Generate Hash for Head
  head.forEach((item) => {
    if (item[0] === 'meta') metaKeys.push(item[1].name as string)
    else if (item[0] === 'link') linkKeys.push(item[1].rel as string)
  })

  const appTitle = manifest?.name ?? app.siteData.title
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

  if (appTitle) setMeta('application-name', appTitle)

  setMeta('mobile-web-app-capable', 'yes')
  setMeta('theme-color', themeColor || '#46bd87')

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  if (isPlainObject(apple) && apple.statusBarColor)
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    setMeta('apple-mobile-web-app-status-bar-style', apple.statusBarColor)

  if (favicon) setLink('icon', favicon)

  setLink('manifest', `${base}manifest.webmanifest`, {
    crossorigin: 'use-credentials',
  })

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

  if (isPlainObject(apple) && (apple.icon || fallBackIcon)) {
    setLink('apple-touch-icon', apple.icon || fallBackIcon)
    if (apple.maskIcon)
      setLink('mask-icon', apple.maskIcon, {
        color: themeColor || '#46bd87',
      })
  } else if (apple !== false && fallBackIcon) {
    setLink('apple-touch-icon', fallBackIcon)
  }
}
