/**
 * Translations of Video.js
 *
 * Video.js 的翻译
 *
 * Video.js ships more than 50 locales and lazy-loads the matching pack from the
 * page language. The partial translations you pass merge into the pack of the
 * same locale, so only the keys you provide are overridden.
 *
 * Video.js 内置 50 多种语言，并会根据页面语言懒加载对应的语言包。传入的部分翻译会合并到同语言的语言包中，因此只有你提供的键会被覆盖。
 */
export type { Translations as VideoJsLocaleData } from '@videojs/html/i18n'

/**
 * YouTube player parameters of Video.js
 *
 * Video.js 的 YouTube 播放器参数
 *
 * They are serialized onto the embed URL verbatim, so the names are exactly the
 * ones YouTube uses. Parameters owned by the player (`autoplay`, `controls`,
 * `playsinline`) are deliberately excluded.
 *
 * 它们会被原样序列化到嵌入链接上，因此名称与 YouTube
 * 完全一致。由播放器掌控的参数（`autoplay`、`controls`、`playsinline`）已排除。
 */
export type { YouTubeEngineConfig } from '@videojs/youtube-video'

/**
 * Vimeo embed parameters of Video.js
 *
 * Video.js 的 Vimeo 嵌入参数
 *
 * They are passed to the Vimeo player as-is, so the names are exactly the ones
 * Vimeo uses. Parameters owned by the player (`autoplay`, `controls`, `muted`,
 * `playsinline`) are deliberately excluded.
 *
 * 它们会被原样传给 Vimeo 播放器，因此名称与 Vimeo 完全一致。由播放器掌控的参数（`autoplay`、
 * `controls`、`muted`、`playsinline`）已排除。
 */
export type { VimeoEngineConfig } from '@videojs/vimeo-video'

/**
 * Twitch embed parameters of Video.js
 *
 * Video.js 的 Twitch 嵌入参数
 *
 * They are serialized onto the embed URL verbatim, so the names are exactly the
 * ones Twitch uses. Parameters owned by the player (`autoplay`, `controls`,
 * `muted`) are deliberately excluded, and the hostname of the page is always
 * allowed in addition to `parent`.
 *
 * 它们会被原样序列化到嵌入链接上，因此名称与 Twitch 完全一致。由播放器掌控的参数（`autoplay`、
 * `controls`、`muted`）已排除，且页面所在的主机名除 `parent` 外始终会被允许。
 */
export type { TwitchEngineConfig } from '@videojs/twitch-video'

/**
 * TikTok player parameters of Video.js
 *
 * Video.js 的 TikTok 播放器参数
 *
 * They are serialized onto the embed URL verbatim, so the names are exactly the
 * ones TikTok uses. Parameters owned by the player (`autoplay`, `controls`,
 * `loop`, `muted`) are deliberately excluded.
 *
 * 它们会被原样序列化到嵌入链接上，因此名称与 TikTok 完全一致。由播放器掌控的参数（`autoplay`、
 * `controls`、`loop`、`muted`）已排除。
 */
export type { TikTokEngineConfig } from '@videojs/tiktok-video'

/**
 * Spotify embed options of Video.js
 *
 * Video.js 的 Spotify 嵌入选项
 *
 * They are serialized onto the embed URL verbatim, so the names are exactly the
 * ones Spotify uses. Options owned by the player (`autoplay`, `loop`,
 * `preload`) are deliberately excluded.
 *
 * 它们会被原样序列化到嵌入链接上，因此名称与 Spotify 完全一致。由播放器掌控的选项（`autoplay`、
 * `loop`、`preload`）已排除。
 */
export type { SpotifyEngineConfig } from '@videojs/spotify-audio'

/**
 * Locale tags bundled with Video.js
 *
 * Video.js 内置的语言代码
 *
 * English is built in and does not need to be loaded. The list also contains
 * the `pt` alias, as Video.js ships a pack for it.
 *
 * 英文是内置的，无需加载。列表中还包括 `pt` 别名，因为 Video.js 为其提供了语言包。
 */
export const VIDEO_JS_LOCALE_TAGS = [
  'ar',
  'az',
  'bg',
  'bn',
  'bs',
  'ca',
  'cs',
  'cy',
  'da',
  'de',
  'el',
  'es',
  'et',
  'eu',
  'fa',
  'fi',
  'fr',
  'gd',
  'gl',
  'he',
  'hi',
  'hr',
  'hu',
  'id',
  'it',
  'ja',
  'ko',
  'lt',
  'lv',
  'mr',
  'nb',
  'ne',
  'nl',
  'nn',
  'oc',
  'pl',
  'pt',
  'pt-BR',
  'pt-PT',
  'ro',
  'ru',
  'sk',
  'sl',
  'sr',
  'sv',
  'te',
  'th',
  'tr',
  'uk',
  'vi',
  'zh-CN',
  'zh-TW',
] as const

const VIDEO_JS_LOCALE_MAP = new Map(
  VIDEO_JS_LOCALE_TAGS.map((tag) => [tag.toLowerCase(), tag as string]),
)

/**
 * Whether a locale tag has a language pack in Video.js
 *
 * 语言代码在 Video.js 中是否有语言包
 *
 * @param tag - Locale tag / 语言代码
 * @returns Whether the locale is bundled / 是否为内置语言
 */
export const isVideoJsLocale = (tag: string): boolean =>
  VIDEO_JS_LOCALE_MAP.has(tag.trim().toLowerCase())

/**
 * Resolve the Video.js locale from a page language
 *
 * 根据页面语言获取 Video.js 语言
 *
 * Languages without a built-in pack fall back to `en`.
 *
 * 没有内置语言包的语言会回退到 `en`。
 *
 * @example
 *   getVideoJsLocale('zh-CN') // 'zh-CN'
 *   getVideoJsLocale('zh-Hant') // 'zh-TW'
 *   getVideoJsLocale('fr-FR') // 'fr'
 *   getVideoJsLocale('ko-KR') // 'ko'
 *   getVideoJsLocale('xx') // 'en'
 *
 * @param lang - Page language / 页面语言
 * @returns Video.js locale code / Video.js 语言代码
 */
export const getVideoJsLocale = (lang: string): string => {
  const langCode = lang.trim().toLowerCase()

  if (!langCode || langCode === 'en' || langCode.startsWith('en-')) return 'en'

  const locale = VIDEO_JS_LOCALE_MAP.get(langCode)

  if (locale) return locale

  const [langName] = langCode.split('-')

  // Video.js only bundles Simplified and Traditional Chinese
  if (langName === 'zh')
    return /hant|tw|hk|mo/u.test(langCode) ? 'zh-TW' : 'zh-CN'

  return VIDEO_JS_LOCALE_MAP.get(langName) ?? 'en'
}

/**
 * Embed providers of Video.js
 *
 * Video.js 的嵌入提供方
 *
 * They play through Video.js with its skin, so each one needs its own package
 * installed on top of `@videojs/html`.
 *
 * 它们通过 Video.js 及其皮肤播放，因此每一个都需要在 `@videojs/html` 之外安装对应的包。
 */
export const VIDEO_JS_PROVIDERS = [
  'youtube',
  'vimeo',
  'twitch',
  'tiktok',
  'spotify',
] as const

/**
 * Embed provider of Video.js
 *
 * Video.js 的嵌入提供方
 */
export type VideoJsProvider = (typeof VIDEO_JS_PROVIDERS)[number]

/**
 * Whether a value is a Video.js provider
 *
 * 值是否为 Video.js 的提供方
 *
 * @param value - Value to check / 待检查的值
 * @returns Whether the value is a provider / 是否为提供方
 */
export const isVideoJsProvider = (value: string): value is VideoJsProvider =>
  (VIDEO_JS_PROVIDERS as readonly string[]).includes(value)

/**
 * Get the media element of a Video.js provider
 *
 * 获取 Video.js 提供方的媒体元素
 *
 * Spotify provides audio, all the other providers provide video.
 *
 * Spotify 提供音频，其余提供方提供视频。
 *
 * @param provider - Video.js provider / Video.js 提供方
 * @returns Name of the element / 元素名称
 */
export const getProviderElement = (provider: VideoJsProvider): string =>
  provider === 'spotify' ? 'spotify-audio' : `${provider}-video`

/**
 * Get the type of a media source
 *
 * 获取媒体源的类型
 *
 * The type hint wins over the file extension, which makes the type work with
 * sources that carry no extension, such as a HLS playlist served from a
 * signature URL.
 *
 * 类型提示优先于文件扩展名，因此对于没有扩展名的源（例如由签名链接提供的 HLS 播放列表）仍然有效。
 *
 * @param src - Media source URL / 媒体源地址
 * @param [type] - Media type hint / 媒体类型提示
 * @returns Lowercased media type / 小写的媒体类型
 */
const getSourceType = (src: string, type?: string): string =>
  (type?.trim() || src.split(/[?#]/u)[0].split('.').pop() || '').toLowerCase()

/**
 * Whether a source should be played by the HLS media element
 *
 * 判断播放源是否需要由 HLS 媒体元素播放
 *
 * @example
 *   isHlsSource('/demo.m3u8') // true
 *   isHlsSource('https://example.com/watch?id=1', 'hls') // true
 *   isHlsSource('/demo.mp4') // false
 *
 * @param src - Media source URL / 媒体源地址
 * @param [type] - Media type hint, which takes precedence / 媒体类型提示，优先级更高
 * @returns Whether the source is a HLS stream / 是否为 HLS 流
 */
export const isHlsSource = (src: string, type?: string): boolean => {
  const value = getSourceType(src, type)

  return value === 'hls' || value === 'm3u8'
}

/**
 * Whether a source should be played by the DASH media element
 *
 * 判断播放源是否需要由 DASH 媒体元素播放
 *
 * @example
 *   isDashSource('/demo.mpd') // true
 *   isDashSource('https://example.com/manifest', 'dash') // true
 *   isDashSource('/demo.m3u8') // false
 *
 * @param src - Media source URL / 媒体源地址
 * @param [type] - Media type hint, which takes precedence / 媒体类型提示，优先级更高
 * @returns Whether the source is a DASH stream / 是否为 DASH 流
 */
export const isDashSource = (src: string, type?: string): boolean => {
  const value = getSourceType(src, type)

  return value === 'dash' || value === 'mpd'
}
