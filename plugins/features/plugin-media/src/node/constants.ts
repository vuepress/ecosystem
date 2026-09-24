import { ensureEndingSlash } from '@vuepress/helper'
import { getDirname, path } from 'vuepress/utils'

import type { EmbedName, VideoJsProvider } from '../shared/index.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

/**
 * Components that a top level option registers directly
 *
 * 由顶层选项直接注册的组件
 */
export const AVAILABLE_COMPONENTS: Record<string, string> = {
  artplayer: 'ArtPlayer',
  pdf: 'PDFViewer',
  videojs: 'VideoPlayer',
  videojsAudio: 'AudioPlayer',
}

/**
 * Components of the platform embed players, which `embeds` registers
 *
 * 平台嵌入播放器的组件，由 `embeds` 注册
 */
export const EMBED_COMPONENTS: Record<EmbedName, string> = {
  bilibili: 'BiliBiliEmbed',
  youtube: 'YouTubeEmbed',
  vimeo: 'VimeoEmbed',
  twitch: 'TwitchEmbed',
  dailymotion: 'DailymotionEmbed',
  tiktok: 'TikTokEmbed',
  spotify: 'SpotifyEmbed',
}

/**
 * Components of the Video.js embed providers, which `videojsProviders`
 * registers
 *
 * Video.js 嵌入提供方的组件，由 `videojsProviders` 注册
 */
export const VIDEOJS_PROVIDER_COMPONENTS: Record<VideoJsProvider, string> = {
  youtube: 'YouTubePlayer',
  vimeo: 'VimeoPlayer',
  twitch: 'TwitchPlayer',
  tiktok: 'TikTokPlayer',
  spotify: 'SpotifyPlayer',
}

/**
 * Packages every component needs, which are all optional peers
 *
 * 每个组件所需的包，它们都是可选的 peer 依赖
 */
export const COMPONENT_PKGS: Record<string, string[]> = {
  ArtPlayer: ['artplayer'],
  PDFViewer: ['@embedpdf/vue-pdf-viewer'],
  VideoPlayer: ['@videojs/html'],
  AudioPlayer: ['@videojs/html'],
  YouTubePlayer: ['@videojs/html', '@videojs/youtube-video'],
  VimeoPlayer: ['@videojs/html', '@videojs/vimeo-video'],
  TwitchPlayer: ['@videojs/html', '@videojs/twitch-video'],
  TikTokPlayer: ['@videojs/html', '@videojs/tiktok-video'],
  SpotifyPlayer: ['@videojs/html', '@videojs/spotify-audio'],
}

/** Folder of the client files */
export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, '../client'),
)

/**
 * Name of every component in the link syntax
 *
 * 每个组件在链接语法中的名称
 *
 * Only the enabled components are registered, so the link syntax is available
 * for exactly the components the plugin registers.
 *
 * 只有启用的组件会被注册，因此链接语法与插件注册的组件完全一致。
 */
export const COMPONENT_LINK_NAMES: Record<string, string> = {
  ArtPlayer: 'artplayer',
  PDFViewer: 'pdf',
  VideoPlayer: 'video',
  AudioPlayer: 'audio',
  BiliBiliEmbed: 'bilibili',
  YouTubeEmbed: 'youtube',
  VimeoEmbed: 'vimeo',
  TwitchEmbed: 'twitch',
  DailymotionEmbed: 'dailymotion',
  TikTokEmbed: 'tiktok',
  SpotifyEmbed: 'spotify',
  YouTubePlayer: 'youtube-player',
  VimeoPlayer: 'vimeo-player',
  TwitchPlayer: 'twitch-player',
  TikTokPlayer: 'tiktok-player',
  SpotifyPlayer: 'spotify-player',
}

/**
 * Prop that receives the link of the link syntax
 *
 * 链接语法中的链接所传入的属性
 *
 * The link is the source of the component, so it is passed to `src` unless the
 * component takes it through another prop.
 *
 * 链接即组件的资源地址，因此除组件通过其他属性接收外，它都会传入 `src`。
 */
export const COMPONENT_LINK_PROPS: Record<string, string> = {
  BiliBiliEmbed: 'bvid',
}
