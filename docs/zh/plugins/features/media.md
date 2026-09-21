---
icon: video
---

# media

<NpmBadge package="@vuepress/plugin-media" />

此插件注册了一系列组件，让你可以在页面中嵌入视频、音频与 PDF 文档。

国内平台（腾讯、优酷、爱奇艺、芒果、搜狐）因试看限制与权限问题不提供嵌入，其中仅 B 站可用。

## 使用

```bash
npm i -D @vuepress/plugin-media@next

# 安装你所用播放器的包，它们都是可选的
npm i -D artplayer                    # artplayer
npm i -D @embedpdf/vue-pdf-viewer     # pdf
npm i -D @videojs/html                # videojs、videojsAudio
npm i -D @videojs/hlsjs-video         # videojs: 'hlsjs'
npm i -D @videojs/dash-video          # videojsDash
npm i -D @videojs/youtube-video       # videojsProviders: ['youtube']
npm i -D @videojs/vimeo-video         # videojsProviders: ['vimeo']
npm i -D @videojs/twitch-video        # videojsProviders: ['twitch']
npm i -D @videojs/tiktok-video        # videojsProviders: ['tiktok']
npm i -D @videojs/spotify-audio       # videojsProviders: ['spotify']
```

```ts title=".vuepress/config.ts"
import { mediaPlugin } from '@vuepress/plugin-media'

export default {
  plugins: [
    mediaPlugin({
      artplayer: true,
      pdf: true,
      embeds: [
        'bilibili',
        'youtube',
        'vimeo',
        'twitch',
        'dailymotion',
        'tiktok',
        'spotify',
      ],
      videojs: true,
      videojsDash: true,
      videojsAudio: true,
      videojsProviders: ['youtube', 'vimeo', 'twitch', 'tiktok', 'spotify'],
    }),
  ],
}
```

之后即可在 Markdown 中直接使用这些组件：

```md
<ArtPlayer src="/assets/video.mp4" />
```

::: tip

`embeds` 中的播放器不需要安装任何包，因此它们是最轻量的选择。

其他组件都需要安装对应的包，包缺失时插件会跳过该组件的注册。

:::

## 组件

### ArtPlayer

使用 [ArtPlayer](https://artplayer.org/) 播放视频。

需要安装 `artplayer`。播放 HLS、FLV 与 DASH 还需分别安装 `hls.js`、`mpegts.js` 与 `dashjs`。

- `src`：视频源文件地址
- `type`：视频类型，省略时从 `src` 的扩展名推断
- `poster`：视频封面
- `title`：视频标题
- `width`：组件宽度，默认为 `100%`
- `height`：组件高度
- `ratio`：组件长宽比，默认为 `16 / 9`
- `config`：ArtPlayer 配置，参见 `ArtPlayerOptions`
- `customPlayer`：对 ArtPlayer 实例进行自定义的回调

ArtPlayer 的选项也可以作为属性传入，例如 `<ArtPlayer src="/a.mp4" autoplay muted />`。布尔选项前加 `no-` 可将其关闭，例如 `no-setting`。

```md
<ArtPlayer src="/assets/video.mp4" />
```

插件选项 `artplayer` 中传入的配置由所有实例共享，而 `config` 只作用于当前实例。

### BiliBiliEmbed

嵌入 B 站视频。

- `bvid`，或 `aid` 与 `cid`：B 站视频 ID
- `title`：视频标题，默认为 `A BiliBili video`
- `page`：视频分页，默认为 `1`
- `time`：基于秒数的开始时间，默认为 `0`
- `autoplay`：是否自动播放
- `width`：组件宽度，默认为 `100%`
- `height`：组件高度
- `ratio`：组件长宽比，默认为 `16 / 9`

```md
<BiliBiliEmbed bvid="BV1xx411c7mD" />
```

### PDFViewer

使用 [EmbedPDF](https://www.embedpdf.com/) 显示 PDF 文档。

需要安装 `@embedpdf/vue-pdf-viewer`。

- `src`：PDF 源文件地址
- `width`：组件宽度，默认为 `100%`
- `height`：组件高度
- `ratio`：组件长宽比，默认为 `16 / 9`
- `config`：EmbedPDF 配置，参见 `PDFOptions`
- `customViewer`：对查看器进行自定义的回调

```md
<PDFViewer src="/assets/document.pdf" />
```

### VideoPlayer

使用 [Video.js v10](https://videojs.org/) 播放视频。

需要安装 `@videojs/html`。HLS 源由 [`hls-video`](https://videojs.org/docs/framework/html/reference/hls-video) 播放，`videojs` 设为 `'hlsjs'` 时改由 [`hlsjs-video`](https://videojs.org/docs/framework/html/reference/hlsjs-video) 播放。DASH 源需要启用 `videojsDash` 以注册 [`dash-video`](https://videojs.org/docs/framework/html/reference/dash-video)。

- `src`：视频源文件地址
- `type`：视频类型，HLS 流设为 `hls` 或 `m3u8`，DASH 流设为 `dash` 或 `mpd`，仅当源链接没有对应扩展名时才需要
- `poster`：视频封面
- `autoplay`：是否自动播放
- `muted`：是否静音
- `loop`：视频结束后是否重新播放
- `playsinline`：是否在移动端内联播放，默认为 `true`
- `crossorigin`：视频的 CORS 设置，跨域字幕需要该配置
- `width`：组件宽度，默认为 `100%`
- `height`：组件高度
- `ratio`：组件长宽比，默认为 `16 / 9`
- `customPlayer`：对 Video.js 播放器进行自定义的回调

倍速、画质、画中画、投屏、字幕、音轨与封面由默认皮肤提供。

默认插槽会渲染在媒体元素内部，因此可以直接添加 `<track>` 与 `<source>`。

```md
<VideoPlayer src="/assets/video.mp4">
  <track kind="subtitles" src="/assets/subtitles.vtt" srclang="en" label="English" />
</VideoPlayer>
```

### AudioPlayer

使用 [Video.js v10](https://videojs.org/) 播放音频。

需要安装 `@videojs/html`。HLS 流由 [`hls-audio`](https://videojs.org/docs/framework/html/reference/hls-audio) 播放。

- `src`：音频源文件地址
- `type`：音频类型，设为 `hls` 或 `m3u8` 可在所有浏览器中播放 HLS 流
- `autoplay`：是否自动播放
- `muted`：是否静音
- `loop`：音频结束后是否重新播放
- `width`：组件宽度，默认为 `100%`
- `height`：组件高度
- `customPlayer`：对 Video.js 播放器进行自定义的回调

```md
<AudioPlayer src="/assets/audio.mp3" />
```

### YouTubeEmbed

使用 YouTube IFrame 播放器嵌入 YouTube 视频。

- `src`：YouTube 链接或视频 ID
- `title`：视频标题，默认为 `A YouTube video`
- `width`：组件宽度，默认为 `100%`
- `height`：组件高度
- `ratio`：组件长宽比，默认为 `16 / 9`

`src` 支持视频 ID、`youtu.be` 短链、`watch?v=`、`embed/`、`v/`、`shorts/`、`live/`、播放列表链接，以及 `youtube-nocookie.com` 链接。支持通过 `t` 参数指定开始时间，链接的查询参数会保留在嵌入链接上。

```md
<YouTubeEmbed src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
```

视频使用 YouTube 自带控件播放。如需使用 Video.js 皮肤控制，请使用 `YouTubePlayer`。

### YouTubePlayer

使用 [Video.js v10](https://videojs.org/) 播放 YouTube 视频。

需要安装 `@videojs/html` 与 `@videojs/youtube-video`，后者提供 [`youtube-video`](https://videojs.org/docs/framework/html/reference/youtube-video) 元素。

- `src`：YouTube 链接或视频 ID
- `autoplay`：是否自动播放
- `muted`：是否静音
- `loop`：视频结束后是否重新播放
- `playsinline`：是否在移动端内联播放，默认为 `true`
- `config`：YouTube 播放器参数，参见 `YouTubeEngineConfig`
- `width`：组件宽度，默认为 `100%`
- `height`：组件高度
- `ratio`：组件长宽比，默认为 `16 / 9`
- `customPlayer`：对 Video.js 播放器进行自定义的回调

`src` 支持 YouTube 链接或视频 ID，包括 `youtu.be` 短链、`watch?v=`、`embed/`、`shorts/`、`live/`、播放列表链接，以及 `youtube-nocookie.com` 链接。支持通过 `t` 参数指定开始时间。

视频由 YouTube IFrame 播放器播放，并由 Video.js 皮肤控制，因此播放器界面与 `VideoPlayer` 完全一致。倍速、画中画、字幕与全屏均可用，而画质由 YouTube 管理。

```md
<YouTubePlayer src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
```

`config` 用于设置 [YouTube 播放器参数](https://developers.google.com/youtube/player_parameters)，它们会覆盖适配器默认的 `rel: 0` 与 `iv_load_policy: 3`。由播放器掌控的参数（`autoplay`、`controls`、`playsinline`）已排除。

```md
<YouTubePlayer src="dQw4w9WgXcQ" :config="{ cc_lang_pref: 'zh-Hans', start: 30 }" />
```

::: tip

YouTube 会渲染自己的封面，因此不提供 `poster` 属性。

:::

### VimeoEmbed

使用 Vimeo 播放器嵌入 Vimeo 视频。

- `src`：Vimeo 链接或视频 ID
- `title`：视频标题，默认为 `A Vimeo video`
- `width`：组件宽度，默认为 `100%`
- `height`：组件高度
- `ratio`：组件长宽比，默认为 `16 / 9`

`src` 支持视频 ID、`vimeo.com/<id>`、`vimeo.com/video/<id>` 与 `player.vimeo.com/video/<id>` 链接。链接中的非公开哈希会被保留，因此私密视频同样可以播放。链接的查询参数会保留在嵌入链接上，因此 `?dnt=1` 等选项仍然有效。

```md
<VimeoEmbed src="https://vimeo.com/76979871" />
```

### VimeoPlayer

使用 [Video.js v10](https://videojs.org/) 播放 Vimeo 视频。

需要安装 `@videojs/html` 与 `@videojs/vimeo-video`，后者提供 [`vimeo-video`](https://videojs.org/docs/framework/html/reference/vimeo-video) 元素。

- `src`：Vimeo 链接或视频 ID
- `autoplay`：是否自动播放
- `muted`：是否静音
- `loop`：视频结束后是否重新播放
- `playsinline`：是否在移动端内联播放，默认为 `true`
- `config`：Vimeo 嵌入参数，参见 `VimeoEngineConfig`
- `width`：组件宽度，默认为 `100%`
- `height`：组件高度
- `ratio`：组件长宽比，默认为 `16 / 9`
- `customPlayer`：对 Video.js 播放器进行自定义的回调

视频由 Vimeo 播放器播放，并由 Video.js 皮肤控制，因此播放器界面与 `VideoPlayer` 完全一致。

```md
<VimeoPlayer src="https://vimeo.com/76979871" />
```

`config` 用于设置 [Vimeo 嵌入参数](https://developer.vimeo.com/player/embedding)，它们会被原样传给播放器。

```md
<VimeoPlayer src="76979871" :config="{ dnt: true }" />
```

### TwitchEmbed

使用 Twitch 播放器嵌入 Twitch 直播频道与视频。

- `src`：Twitch 链接或频道名
- `parent`：框架嵌入页面的主机名，默认为页面所在的主机名
- `title`：直播标题，默认为 `A Twitch video`
- `width`：组件宽度，默认为 `100%`
- `height`：组件高度
- `ratio`：组件长宽比，默认为 `16 / 9`

`src` 支持频道名、`twitch.tv/<channel>` 与 `twitch.tv/videos/<id>` 链接。链接的查询参数会保留在嵌入链接上。

Twitch 只有在嵌入链接包含框架页面的主机名时才会播放，因此组件会从浏览器读取主机名并传给嵌入链接，而该主机名只有在浏览器中运行时才可知。传入 `parent` 可覆盖该值。

Twitch 在链接未表态时会自动播放，而浏览器会阻止这种自动播放，因此链接中未表态时组件会补上 `autoplay=false`。如需自动播放，传入 `?autoplay=true`。

```md
<TwitchEmbed src="https://www.twitch.tv/monstercat" />
```

### TwitchPlayer

使用 [Video.js v10](https://videojs.org/) 播放 Twitch 直播频道与视频。

需要安装 `@videojs/html` 与 `@videojs/twitch-video`，后者提供 [`twitch-video`](https://videojs.org/docs/framework/html/reference/twitch-video) 元素。

- `src`：Twitch 链接或频道名
- `autoplay`：是否自动播放
- `muted`：是否静音
- `loop`：直播结束后是否重新播放
- `playsinline`：是否在移动端内联播放，默认为 `true`
- `config`：Twitch 嵌入参数，参见 `TwitchEngineConfig`
- `width`：组件宽度，默认为 `100%`
- `height`：组件高度
- `ratio`：组件长宽比，默认为 `16 / 9`
- `customPlayer`：对 Video.js 播放器进行自定义的回调

直播由 Twitch 播放器播放，并由 Video.js 皮肤控制，因此播放器界面与 `VideoPlayer` 完全一致。除 `parent` 外，页面所在的主机名始终会被允许。

```md
<TwitchPlayer src="https://www.twitch.tv/monstercat" />
```

### DailymotionEmbed

使用 Dailymotion 播放器嵌入 Dailymotion 视频。

- `src`：Dailymotion 链接或视频 ID
- `title`：视频标题，默认为 `A Dailymotion video`
- `width`：组件宽度，默认为 `100%`
- `height`：组件高度
- `ratio`：组件长宽比，默认为 `16 / 9`

`src` 支持视频 ID、`dailymotion.com/video/<id>`、`dailymotion.com/embed/video/<id>` 与 `dai.ly/<id>` 链接。链接的查询参数会保留在嵌入链接上，因此 `?mute=1` 等播放器选项仍然有效。

```md
<DailymotionEmbed src="https://www.dailymotion.com/video/x8v5k1u" />
```

### TikTokEmbed

使用 TikTok 播放器嵌入 TikTok 视频。

- `src`：TikTok 链接或视频 ID
- `title`：视频标题，默认为 `A TikTok video`
- `width`：组件宽度，默认为 `100%`
- `height`：组件高度
- `ratio`：组件长宽比，默认为 `9 / 16`

`src` 支持数字 ID，以及应用提供的 `tiktok.com/@user/video/<id>`、`tiktok.com/player/v1/<id>` 与 `tiktok.com/embed/v2/<id>` 链接。链接的查询参数会保留在嵌入链接上，因此 `?autoplay=1` 等播放器选项仍然有效。

播放器会铺满整个组件，因此长宽比应与视频一致。默认值与 TikTok 的竖屏视频一致。

```md
<TikTokEmbed src="https://www.tiktok.com/@scout2015/video/6718335390845095173" />
```

### TikTokPlayer

使用 [Video.js v10](https://videojs.org/) 播放 TikTok 视频。

需要安装 `@videojs/html` 与 `@videojs/tiktok-video`，后者提供 [`tiktok-video`](https://videojs.org/docs/framework/html/reference/tiktok-video) 元素。

- `src`：TikTok 链接或视频 ID
- `autoplay`：是否自动播放
- `muted`：是否静音
- `loop`：视频结束后是否重新播放
- `playsinline`：是否在移动端内联播放，默认为 `true`
- `config`：TikTok 播放器参数，参见 `TikTokEngineConfig`
- `width`：组件宽度，默认为 `100%`
- `height`：组件高度
- `ratio`：组件长宽比，默认为 `16 / 9`
- `customPlayer`：对 Video.js 播放器进行自定义的回调

视频由 TikTok 播放器播放，并由 Video.js 皮肤控制，因此播放器界面与 `VideoPlayer` 完全一致。

```md
<TikTokPlayer src="https://www.tiktok.com/@scout2015/video/6718335390845095173" />
```

### SpotifyEmbed

使用 Spotify 播放器嵌入 Spotify 单曲、单集、专辑、播放列表、节目与艺人。

- `src`：Spotify 链接、URI 或实体 ID
- `title`：播放器标题，默认为 `A Spotify player`
- `width`：组件宽度，默认为 `100%`
- `height`：组件高度
- `ratio`：组件长宽比，默认为 `16 / 9`

`src` 支持 `open.spotify.com` 链接与 `spotify:<type>:<id>` URI。链接的查询参数会保留在嵌入链接上，因此 `?theme=0` 等选项仍然有效。

嵌入内容的高度是固定的，因此推荐使用 `height` 而非默认长宽比，单集项目为 `152`，合集为 `352`。

```md
<SpotifyEmbed src="https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC" height="152" />
```

### SpotifyPlayer

使用 [Video.js v10](https://videojs.org/) 播放 Spotify 单曲、单集、专辑、播放列表、节目与艺人。

需要安装 `@videojs/html` 与 `@videojs/spotify-audio`，后者提供 [`spotify-audio`](https://videojs.org/docs/framework/html/reference/spotify-audio) 元素。

- `src`：Spotify 链接、URI 或实体 ID
- `autoplay`：是否自动播放
- `loop`：音频结束后是否重新播放
- `playsinline`：是否在移动端内联播放，默认为 `true`
- `config`：Spotify 嵌入选项，参见 `SpotifyEngineConfig`
- `width`：组件宽度，默认为 `100%`
- `height`：组件高度
- `customPlayer`：对 Video.js 播放器进行自定义的回调

音频由 Spotify 播放器播放，并由 Video.js 皮肤控制，因此播放器界面与 `AudioPlayer` 完全一致。

Spotify 嵌入不接受音量或静音指令，因此组件没有 `muted` 属性；音频皮肤自带高度，因此也没有 `ratio` 属性。

```md
<SpotifyPlayer src="https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC" />
```

## 选项

### artplayer

- 类型：`boolean | ArtPlayerOptions`
- 详情：是否启用 `ArtPlayer` 组件。传入对象可设置所有实例共享的默认配置。

### pdf

- 类型：`boolean | PDFOptions`
- 详情：是否启用 `PDFViewer` 组件。传入对象可设置所有实例共享的默认配置。

### pdfLocales

- 类型：`PDFLocaleData[]`
- 详情：在 EmbedPDF 查看器中注册的语言。传入的语言会**替换** EmbedPDF 内置语言，因此需提供站点所需的全部语言。参见 [国际化](https://www.embedpdf.com/docs/vue/viewer/plugins/plugin-i18n)。

  EmbedPDF 内置 `en`、`nl`、`de`、`fr`、`es`、`zh-CN`、`zh-TW`、`ja`、`sv` 与 `pt-BR`。页面语言由插件解析，其他代码的语言还需另经查看器配置的 `i18n.defaultLocale` 启用。

### embeds

- 类型：`EmbedName[]`
- 详情：提供自带嵌入播放器的平台。这些播放器不需要安装任何包，因此是本插件最轻量的选择，适合仅偶尔嵌入视频的页面。

  可用的平台：`bilibili`、`youtube`、`vimeo`、`twitch`、`dailymotion`、`tiktok` 与 `spotify`。

### videojs

- 类型：`boolean | 'hlsjs'`
- 详情：`VideoPlayer` 组件的 HLS 元素，需要安装 `@videojs/html`。`true` 使用 [`hls-video`](https://videojs.org/docs/framework/html/reference/hls-video)，即覆盖大部分 HLS 播放的精简元素；`'hlsjs'` 使用由 hls.js 驱动、兼容性更好的 [`hlsjs-video`](https://videojs.org/docs/framework/html/reference/hlsjs-video)，后者还需要安装 `@videojs/hlsjs-video`。

### videojsDash

- 类型：`boolean`
- 详情：是否注册 [`dash-video`](https://videojs.org/docs/framework/html/reference/dash-video)，即 `VideoPlayer` 播放 DASH 源所用的元素。需要安装 `@videojs/html` 与 `@videojs/dash-video`，否则 DASH 源会交由浏览器自身播放。

### videojsAudio

- 类型：`boolean`
- 详情：是否启用 `AudioPlayer` 组件，需要安装 `@videojs/html`。

### videojsProviders

- 类型：`VideoJsProvider[]`
- 详情：由 Video.js 而非平台自带播放器播放的平台。与 `embeds` 不同，视频由 Video.js 皮肤控制，因此播放器界面与 `VideoPlayer` 一致。

  可用的提供方：`youtube`、`vimeo`、`twitch`、`tiktok` 与 `spotify`。每一个都需要安装 `@videojs/html` 与对应的包。

### videojsLocales

- 类型：`Record<string, VideoJsLocaleData>`
- 详情：Video.js 的自定义翻译。部分翻译会合并到页面语言对应的语言包中，因此只有你提供的键会被覆盖。
