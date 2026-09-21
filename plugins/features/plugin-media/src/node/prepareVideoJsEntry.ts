import { getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress/core'

import {
  getProviderElement,
  getVideoJsLocale,
  isVideoJsLocale,
} from '../shared/index.js'
import { logger } from './logger.js'
import type { MediaPluginOptions } from './options.js'
import { getHlsVideoElement, isInstalled } from './utils.js'

const getModule = (id: string): string =>
  JSON.stringify(getModulePath(id, import.meta))

const isEnabled = (pkg: string, enabled?: boolean): boolean =>
  Boolean(enabled) && isInstalled(pkg)

/**
 * Get the locales that need a manually registered language pack
 *
 * 获取需要手动注册语言包的语言
 *
 * Video.js skips its lazy language pack as soon as a locale has been
 * registered, so overriding a built-in locale requires registering the pack
 * before the custom translations.
 *
 * 只要有语言被注册，Video.js 就会跳过懒加载的语言包，因此覆盖内置语言时，必须在自定义翻译之前先注册语言包。
 *
 * @param locales - Custom translations / 自定义翻译
 * @returns Locale tags that are bundled with Video.js / Video.js 内置的语言代码
 */
const getUsedLocales = (locales: Record<string, unknown>): string[] =>
  [
    ...new Set(
      Object.keys(locales)
        .filter((tag) => isVideoJsLocale(tag))
        .map((tag) => getVideoJsLocale(tag)),
    ),
  ].sort()

/**
 * Generate the Video.js entry, which registers the elements and the language
 * packs used by the site
 *
 * 生成 Video.js 入口文件，注册页面所需的元素与语言包
 *
 * @param app - VuePress app / VuePress 应用
 * @param options - Plugin options / 插件配置
 * @returns Path of the generated entry / 生成入口文件路径
 */
export const prepareVideoJsEntry = (
  app: App,
  {
    videojs,
    videojsDash,
    videojsAudio,
    videojsProviders = [],
    videojsLocales = {},
  }: MediaPluginOptions,
): Promise<string> => {
  if (!isInstalled('@videojs/html')) return Promise.resolve('')

  // A provider whose package is missing is skipped instead of breaking the build
  const providerElements = videojsProviders
    .map((provider) => getProviderElement(provider))
    .filter((element) => isInstalled(`@videojs/${element}`))

  const hlsElement = videojs ? getHlsVideoElement(videojs) : null

  if (videojs === 'hlsjs' && hlsElement === 'hls-video') {
    logger.warn(
      'Component VideoPlayer falls back to hls-video, because @videojs/hlsjs-video is not installed.',
    )
  }

  if (videojsDash && !isInstalled('@videojs/dash-video')) {
    logger.warn(
      'DASH sources are left to the browser, because @videojs/dash-video is not installed.',
    )
  }

  const videoElements = [
    ...(hlsElement ? [hlsElement] : []),
    ...(isEnabled('@videojs/dash-video', videojsDash) ? ['dash-video'] : []),
    ...providerElements.filter((element) => element !== 'spotify-audio'),
  ]
  const audioElements = [
    ...(videojsAudio ? ['hls-audio'] : []),
    ...providerElements.filter((element) => element === 'spotify-audio'),
  ]

  if (videoElements.length === 0 && audioElements.length === 0)
    return Promise.resolve('')

  const imports: string[] = []

  // The embed players are media elements, so they reuse the video player and skin
  if (videoElements.length > 0) {
    imports.push(
      `import ${getModule('@videojs/html/video/player')};`,
      `import ${getModule('@videojs/html/video/skin')};`,
      ...videoElements.map(
        (element) => `import ${getModule(`@videojs/html/media/${element}`)};`,
      ),
    )
  }

  if (audioElements.length > 0) {
    imports.push(
      `import ${getModule('@videojs/html/audio/player')};`,
      `import ${getModule('@videojs/html/audio/skin')};`,
      ...audioElements.map(
        (element) => `import ${getModule(`@videojs/html/media/${element}`)};`,
      ),
    )
  }

  const locales = getUsedLocales(videojsLocales)
  const localeImports = locales.map(
    (locale) =>
      `import ${getModule(`@videojs/html/i18n/locales/${locale}/register`)};`,
  )
  const localeRegisters = Object.entries(videojsLocales).map(
    ([locale, translations]) =>
      `registerI18n(${JSON.stringify(locale)}, ${JSON.stringify(translations)});`,
  )

  if (localeRegisters.length > 0) {
    imports.unshift(
      `import { registerI18n } from ${getModule('@videojs/html/i18n')};`,
    )
  } else {
    imports.unshift(`import ${getModule('@videojs/html/i18n')};`)
  }

  return app.writeTemp(
    'media/videojs.js',
    `\
${[...imports, ...localeImports].join('\n')}
${localeRegisters.length > 0 ? `\n${localeRegisters.join('\n')}\n` : ''}`,
  )
}
