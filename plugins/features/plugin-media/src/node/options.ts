import type {
  ArtPlayerOptions,
  EmbedName,
  PDFLocaleData,
  PDFOptions,
  VideoJsLocaleData,
  VideoJsProvider,
} from '../shared/index.js'

/** Options for @vuepress/plugin-media */
export interface MediaPluginOptions {
  /**
   * Whether to enable the ArtPlayer video player
   *
   * 是否启用 ArtPlayer 视频播放器
   *
   * Requires `artplayer` to be installed. Pass an object to set the default
   * config shared by every ArtPlayer instance on the site.
   *
   * 需要安装 `artplayer`。传入对象可设置站点中所有 ArtPlayer 实例的默认配置。
   *
   * @default false
   */
  artplayer?: boolean | ArtPlayerOptions

  /**
   * Whether to enable the EmbedPDF viewer
   *
   * 是否启用 EmbedPDF 查看器
   *
   * Requires `@embedpdf/vue-pdf-viewer` to be installed. Pass an object to set
   * the default config shared by every PDFViewer instance on the site.
   *
   * 需要安装 `@embedpdf/vue-pdf-viewer`。传入对象可设置站点中所有 PDFViewer 实例的默认配置。
   *
   * @default false
   */
  pdf?: boolean | PDFOptions

  /**
   * Locales to register in the EmbedPDF viewer
   *
   * EmbedPDF 查看器中注册的语言
   *
   * They **replace** the locales built into EmbedPDF, so every locale the site
   * needs must be provided.
   *
   * 传入的语言会**替换**内置语言，需提供站点所需的全部语言。
   *
   * @default [ ]
   */
  pdfLocales?: PDFLocaleData[]

  /**
   * Platforms whose own embed player is provided
   *
   * 提供自带嵌入播放器的平台
   *
   * These players need no extra packages, so they are the lightest option and
   * suit pages that embed a video only once in a while.
   *
   * 这些播放器不需要额外安装包，因此最为轻量，适合仅偶尔嵌入视频的页面。
   *
   * @default [ ]
   */
  embeds?: EmbedName[]

  /**
   * HLS element of the Video.js video player
   *
   * Video.js 视频播放器的 HLS 元素
   *
   * It enables the `VideoPlayer` component and requires `@videojs/html` to be
   * installed. `true` uses the lightweight `hls-video` element, while `'hlsjs'`
   * uses the more compatible `hlsjs-video` element, which also requires
   * `@videojs/hlsjs-video`.
   *
   * 它会启用 `VideoPlayer` 组件，并需要安装 `@videojs/html`。`true` 使用精简的 `hls-video`
   * 元素，`'hlsjs'` 使用兼容性更好的 `hlsjs-video` 元素， 后者还需要安装 `@videojs/hlsjs-video`。
   *
   * @default false
   */
  videojs?: boolean | 'hlsjs'

  /**
   * Whether to register the DASH element of Video.js
   *
   * 是否注册 Video.js 的 DASH 元素
   *
   * Requires `@videojs/html` and `@videojs/dash-video` to be installed. It only
   * registers the element, which `VideoPlayer` plays DASH sources with.
   *
   * 需要安装 `@videojs/html` 与 `@videojs/dash-video`。它只注册元素， `VideoPlayer` 会用它播放
   * DASH 源。
   *
   * @default false
   */
  videojsDash?: boolean

  /**
   * Whether to enable the Video.js audio player
   *
   * 是否启用 Video.js 音频播放器
   *
   * Requires `@videojs/html` to be installed.
   *
   * 需要安装 `@videojs/html`。
   *
   * @default false
   */
  videojsAudio?: boolean

  /**
   * Platforms played by Video.js instead of their own player
   *
   * 由 Video.js 而非平台自带播放器播放的平台
   *
   * Every provider requires `@videojs/html` and its own package to be
   * installed. Unlike `embeds`, the video is controlled by the Video.js skin,
   * so the player UI stays the same as `VideoPlayer`.
   *
   * 每个提供方都需要安装 `@videojs/html` 与对应的包。与 `embeds` 不同，视频由 Video.js 皮肤控制，因此播放器界面与
   * `VideoPlayer` 一致。
   *
   * @default [ ]
   */
  videojsProviders?: VideoJsProvider[]

  /**
   * Custom translations of Video.js
   *
   * Video.js 的自定义翻译
   *
   * The partial translations merge into the language pack of the page locale,
   * so only the keys you provide are overridden.
   *
   * 部分翻译会合并到页面语言对应的语言包中，因此只有你提供的键会被覆盖。
   */
  videojsLocales?: Record<string, VideoJsLocaleData>
}
