---
url: /ecosystem/plugins/features/media.md
---
# media

This plugin registers components to embed videos, audio, and PDF documents in your pages.

## Usage

```bash
npm i -D @vuepress/plugin-media@next

# install the packages of the players you use, all of them are optional
npm i -D artplayer                    # artplayer
npm i -D @embedpdf/vue-pdf-viewer     # pdf
npm i -D @videojs/html                # videojs, videojsAudio
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

Then use the components directly in your Markdown:

```md
<ArtPlayer src="/assets/video.mp4" />
```

::: tip

The `embeds` players need no packages, so they are the lightest option of the plugin.

Every other component needs its package installed, and the plugin skips registering a component when the package is missing.

:::

## Components

### ArtPlayer

Play videos with [ArtPlayer](https://artplayer.org/).

Requires `artplayer` to be installed. HLS, FLV, and DASH playback need `hls.js`, `mpegts.js`, and `dashjs` to be installed respectively.

* `src`: Video source URL
* `type`: Video type, inferred from the extension of `src` when omitted
* `poster`: Video poster
* `title`: Video title
* `width`: Component width, defaults to `100%`
* `height`: Component height
* `ratio`: Component width / height ratio, defaults to `16 / 9`
* `config`: ArtPlayer config, see `ArtPlayerOptions`
* `customPlayer`: Callback to customize the ArtPlayer instance

ArtPlayer options can also be passed as attributes, e.g. `<ArtPlayer src="/a.mp4" autoplay muted />`. Prefix a boolean option with `no-` to disable it, e.g. `no-setting`.

```md
<ArtPlayer src="/assets/video.mp4" />
```

Options passed to `artplayer` in plugin options are shared by every instance, while `config` only applies to the current one.

### BiliBiliEmbed

Embed BiliBili videos.

* `bvid`, or `aid` with `cid`: BiliBili video ID
* `title`: Video title, defaults to `A BiliBili video`
* `page`: Video page, defaults to `1`
* `time`: Start time in seconds, defaults to `0`
* `autoplay`: Whether to autoplay
* `width`: Component width, defaults to `100%`
* `height`: Component height
* `ratio`: Component width / height ratio, defaults to `16 / 9`

```md
<BiliBiliEmbed bvid="BV1xx411c7mD" />
```

### PDFViewer

Display PDF documents with [EmbedPDF](https://www.embedpdf.com/).

Requires `@embedpdf/vue-pdf-viewer` to be installed.

* `src`: PDF source URL
* `width`: Component width, defaults to `100%`
* `height`: Component height
* `ratio`: Component width / height ratio, defaults to `16 / 9`
* `config`: EmbedPDF config, see `PDFOptions`
* `customViewer`: Callback to customize the viewer

```md
<PDFViewer src="/assets/document.pdf" />
```

### VideoPlayer

Play videos with [Video.js v10](https://videojs.org/).

Requires `@videojs/html` to be installed. HLS sources are played by the [`hls-video`](https://videojs.org/docs/framework/html/reference/hls-video) element, or the [`hlsjs-video`](https://videojs.org/docs/framework/html/reference/hlsjs-video) one when `videojs` is set to `'hlsjs'`. DASH sources need `videojsDash` enabled, which registers the [`dash-video`](https://videojs.org/docs/framework/html/reference/dash-video) element.

* `src`: Video source URL
* `type`: Video type, set it to `hls` or `m3u8` for HLS streams and `dash` or `mpd` for DASH streams, only needed when the source URL has no matching extension
* `poster`: Video poster
* `autoplay`: Whether to autoplay
* `muted`: Whether to mute
* `loop`: Whether to restart the video when it ends
* `playsinline`: Whether to play inline on mobile devices, defaults to `true`
* `crossorigin`: CORS setting of the video, required for cross-origin captions
* `width`: Component width, defaults to `100%`
* `height`: Component height
* `ratio`: Component width / height ratio, defaults to `16 / 9`
* `customPlayer`: Callback to customize the Video.js player

Playback rate, quality, picture-in-picture, casting, captions, audio tracks, and the poster are provided by the default skin.

The default slot is rendered inside the media element, so `<track>` and `<source>` can be added directly.

```md
<VideoPlayer src="/assets/video.mp4">
  <track kind="subtitles" src="/assets/subtitles.vtt" srclang="en" label="English" />
</VideoPlayer>
```

### AudioPlayer

Play audio with [Video.js v10](https://videojs.org/).

Requires `@videojs/html` to be installed. HLS streams are played by the [`hls-audio`](https://videojs.org/docs/framework/html/reference/hls-audio) element.

* `src`: Audio source URL
* `type`: Audio type, set it to `hls` or `m3u8` to play HLS streams in every browser
* `autoplay`: Whether to autoplay
* `muted`: Whether to mute
* `loop`: Whether to restart the audio when it ends
* `width`: Component width, defaults to `100%`
* `height`: Component height
* `customPlayer`: Callback to customize the Video.js player

```md
<AudioPlayer src="/assets/audio.mp3" />
```

### YouTubeEmbed

Embed YouTube videos with the YouTube IFrame player.

* `src`: YouTube URL or video id
* `title`: Video title, defaults to `A YouTube video`
* `width`: Component width, defaults to `100%`
* `height`: Component height
* `ratio`: Component width / height ratio, defaults to `16 / 9`

`src` accepts a video id, `youtu.be` short links, `watch?v=`, `embed/`, `v/`, `shorts/`, `live/`, playlist URLs, and `youtube-nocookie.com` URLs. A start time in the `t` parameter is supported, and the query parameters of the URL are kept on the embed URL.

```md
<YouTubeEmbed src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
```

The video is played with YouTube's own controls. Use `YouTubePlayer` to control it with the Video.js skin.

### YouTubePlayer

Play YouTube videos with [Video.js v10](https://videojs.org/).

Requires `@videojs/html` and `@videojs/youtube-video` to be installed, which provides the [`youtube-video`](https://videojs.org/docs/framework/html/reference/youtube-video) element.

* `src`: YouTube URL or video id
* `autoplay`: Whether to autoplay
* `muted`: Whether to mute
* `loop`: Whether to restart the video when it ends
* `playsinline`: Whether to play inline on mobile devices, defaults to `true`
* `config`: YouTube player parameters, see `YouTubeEngineConfig`
* `width`: Component width, defaults to `100%`
* `height`: Component height
* `ratio`: Component width / height ratio, defaults to `16 / 9`
* `customPlayer`: Callback to customize the Video.js player

`src` accepts a YouTube URL or a video id, including `youtu.be` short links, `watch?v=`, `embed/`, `shorts/`, `live/`, playlist URLs, and `youtube-nocookie.com` URLs. A start time in the `t` parameter is supported.

Videos are played by the YouTube IFrame player and controlled by the Video.js skin, so the player UI stays the same as `VideoPlayer`. Playback rate, picture-in-picture, captions, and fullscreen are available, while quality is managed by YouTube.

```md
<YouTubePlayer src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
```

The `config` sets the [YouTube player parameters](https://developers.google.com/youtube/player_parameters), which override the adapter defaults of `rel: 0` and `iv_load_policy: 3`. Parameters owned by the player (`autoplay`, `controls`, `playsinline`) are excluded.

```md
<YouTubePlayer src="dQw4w9WgXcQ" :config="{ cc_lang_pref: 'zh-Hans', start: 30 }" />
```

::: tip

YouTube renders its own thumbnail, so the `poster` prop is not provided.

:::

### VimeoEmbed

Embed Vimeo videos with the Vimeo player.

* `src`: Vimeo URL or video id
* `title`: Video title, defaults to `A Vimeo video`
* `width`: Component width, defaults to `100%`
* `height`: Component height
* `ratio`: Component width / height ratio, defaults to `16 / 9`

`src` accepts a video id, `vimeo.com/<id>`, `vimeo.com/video/<id>`, and `player.vimeo.com/video/<id>` URLs. The unlisted hash of the URL is kept, so private videos play as well. The query parameters of the URL are kept on the embed URL, so options like `?dnt=1` work.

```md
<VimeoEmbed src="https://vimeo.com/76979871" />
```

### VimeoPlayer

Play Vimeo videos with [Video.js v10](https://videojs.org/).

Requires `@videojs/html` and `@videojs/vimeo-video` to be installed, which provides the [`vimeo-video`](https://videojs.org/docs/framework/html/reference/vimeo-video) element.

* `src`: Vimeo URL or video id
* `autoplay`: Whether to autoplay
* `muted`: Whether to mute
* `loop`: Whether to restart the video when it ends
* `playsinline`: Whether to play inline on mobile devices, defaults to `true`
* `config`: Vimeo embed parameters, see `VimeoEngineConfig`
* `width`: Component width, defaults to `100%`
* `height`: Component height
* `ratio`: Component width / height ratio, defaults to `16 / 9`
* `customPlayer`: Callback to customize the Video.js player

Videos are played by the Vimeo player and controlled by the Video.js skin, so the player UI stays the same as `VideoPlayer`.

```md
<VimeoPlayer src="https://vimeo.com/76979871" />
```

The `config` sets the [Vimeo embed parameters](https://developer.vimeo.com/player/embedding), which are passed to the player as-is.

```md
<VimeoPlayer src="76979871" :config="{ dnt: true }" />
```

### TwitchEmbed

Embed Twitch live channels and videos with the Twitch player.

* `src`: Twitch URL or channel name
* `parent`: Hostname of the page framing the embed, defaults to the hostname the page is served from
* `title`: Stream title, defaults to `A Twitch video`
* `width`: Component width, defaults to `100%`
* `height`: Component height
* `ratio`: Component width / height ratio, defaults to `16 / 9`

`src` accepts a channel name, `twitch.tv/<channel>`, and `twitch.tv/videos/<id>` URLs. The query parameters of the URL are kept on the embed URL.

Twitch refuses to play unless the embed knows the hostname of the page framing it, so the hostname is read from the browser and passed to the embed, and it is only known once the page runs in a browser. Pass `parent` to override it.

Twitch autoplays unless the URL says otherwise, which browsers block, so `autoplay=false` is added when the URL gives no preference. Pass `?autoplay=true` to ask for autoplay.

```md
<TwitchEmbed src="https://www.twitch.tv/monstercat" />
```

### TwitchPlayer

Play Twitch live channels and videos with [Video.js v10](https://videojs.org/).

Requires `@videojs/html` and `@videojs/twitch-video` to be installed, which provides the [`twitch-video`](https://videojs.org/docs/framework/html/reference/twitch-video) element.

* `src`: Twitch URL or channel name
* `autoplay`: Whether to autoplay
* `muted`: Whether to mute
* `loop`: Whether to restart the stream when it ends
* `playsinline`: Whether to play inline on mobile devices, defaults to `true`
* `config`: Twitch embed parameters, see `TwitchEngineConfig`
* `width`: Component width, defaults to `100%`
* `height`: Component height
* `ratio`: Component width / height ratio, defaults to `16 / 9`
* `customPlayer`: Callback to customize the Video.js player

Streams are played by the Twitch player and controlled by the Video.js skin, so the player UI stays the same as `VideoPlayer`. The hostname of the page is always allowed in addition to `parent`.

```md
<TwitchPlayer src="https://www.twitch.tv/monstercat" />
```

### DailymotionEmbed

Embed Dailymotion videos with the Dailymotion player.

* `src`: Dailymotion URL or video id
* `title`: Video title, defaults to `A Dailymotion video`
* `width`: Component width, defaults to `100%`
* `height`: Component height
* `ratio`: Component width / height ratio, defaults to `16 / 9`

`src` accepts a video id, `dailymotion.com/video/<id>`, `dailymotion.com/embed/video/<id>`, and `dai.ly/<id>` URLs. The query parameters of the URL are kept on the embed URL, so player options like `?mute=1` work.

```md
<DailymotionEmbed src="https://www.dailymotion.com/video/x8v5k1u" />
```

### TikTokEmbed

Embed TikTok videos with the TikTok player.

* `src`: TikTok URL or video id
* `title`: Video title, defaults to `A TikTok video`
* `width`: Component width, defaults to `100%`
* `height`: Component height
* `ratio`: Component width / height ratio, defaults to `9 / 16`

`src` accepts a numeric id and the `tiktok.com/@user/video/<id>`, `tiktok.com/player/v1/<id>`, and `tiktok.com/embed/v2/<id>` URLs the app hands out. The query parameters of the URL are kept on the embed URL, so player options like `?autoplay=1` work.

The player fills the component, so the ratio should match the video. The default matches the vertical videos of TikTok.

```md
<TikTokEmbed src="https://www.tiktok.com/@scout2015/video/6718335390845095173" />
```

### TikTokPlayer

Play TikTok videos with [Video.js v10](https://videojs.org/).

Requires `@videojs/html` and `@videojs/tiktok-video` to be installed, which provides the [`tiktok-video`](https://videojs.org/docs/framework/html/reference/tiktok-video) element.

* `src`: TikTok URL or video id
* `autoplay`: Whether to autoplay
* `muted`: Whether to mute
* `loop`: Whether to restart the video when it ends
* `playsinline`: Whether to play inline on mobile devices, defaults to `true`
* `config`: TikTok player parameters, see `TikTokEngineConfig`
* `width`: Component width, defaults to `100%`
* `height`: Component height
* `ratio`: Component width / height ratio, defaults to `16 / 9`
* `customPlayer`: Callback to customize the Video.js player

Videos are played by the TikTok player and controlled by the Video.js skin, so the player UI stays the same as `VideoPlayer`.

```md
<TikTokPlayer src="https://www.tiktok.com/@scout2015/video/6718335390845095173" />
```

### SpotifyEmbed

Embed Spotify tracks, episodes, albums, playlists, shows, and artists with the Spotify player.

* `src`: Spotify URL, URI, or entity id
* `title`: Player title, defaults to `A Spotify player`
* `width`: Component width, defaults to `100%`
* `height`: Component height
* `ratio`: Component width / height ratio, defaults to `16 / 9`

`src` accepts `open.spotify.com` URLs and `spotify:<type>:<id>` URIs. The query parameters of the URL are kept on the embed URL, so options like `?theme=0` work.

The embed has a fixed height, so a `height` of `152` (single items) or `352` (collections) is recommended over the default ratio.

```md
<SpotifyEmbed src="https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC" height="152" />
```

### SpotifyPlayer

Play Spotify tracks, episodes, albums, playlists, shows, and artists with [Video.js v10](https://videojs.org/).

Requires `@videojs/html` and `@videojs/spotify-audio` to be installed, which provides the [`spotify-audio`](https://videojs.org/docs/framework/html/reference/spotify-audio) element.

* `src`: Spotify URL, URI, or entity id
* `autoplay`: Whether to autoplay
* `loop`: Whether to restart the audio when it ends
* `playsinline`: Whether to play inline on mobile devices, defaults to `true`
* `config`: Spotify embed options, see `SpotifyEngineConfig`
* `width`: Component width, defaults to `100%`
* `height`: Component height
* `customPlayer`: Callback to customize the Video.js player

Audio is played by the Spotify player and controlled by the Video.js skin, so the player UI stays the same as `AudioPlayer`.

The Spotify embed takes no volume or mute command, so the component has no `muted` prop, and the audio skin sizes itself, so it has no `ratio` prop either.

```md
<SpotifyPlayer src="https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC" />
```

## Options

### artplayer

* Type: `boolean | ArtPlayerOptions`
* Details: Whether to enable the `ArtPlayer` component. Pass an object to set the default config shared by every instance.

### pdf

* Type: `boolean | PDFOptions`
* Details: Whether to enable the `PDFViewer` component. Pass an object to set the default config shared by every instance.

### pdfLocales

* Type: `PDFLocaleData[]`
* Details: Locales to register in the EmbedPDF viewer. They **replace** the locales built into EmbedPDF, so every locale the site needs must be provided. See [Internationalization](https://www.embedpdf.com/docs/vue/viewer/plugins/plugin-i18n).

  EmbedPDF bundles `en`, `nl`, `de`, `fr`, `es`, `zh-CN`, `zh-TW`, `ja`, `sv`, and `pt-BR`. The page locale is resolved by the plugin, and a locale with another code must also be enabled via `i18n.defaultLocale` of the viewer config.

### embeds

* Type: `EmbedName[]`
* Details: Platforms whose own embed player is provided. These players need no packages, so they are the lightest option of the plugin and suit pages that embed a video only once in a while.

  Available platforms: `bilibili`, `youtube`, `vimeo`, `twitch`, `dailymotion`, `tiktok`, and `spotify`.

### videojs

* Type: `boolean | 'hlsjs'`
* Details: HLS element of the `VideoPlayer` component. It requires `@videojs/html` to be installed. `true` uses [`hls-video`](https://videojs.org/docs/framework/html/reference/hls-video), the lightweight element that covers most HLS playback, while `'hlsjs'` uses [`hlsjs-video`](https://videojs.org/docs/framework/html/reference/hlsjs-video), the more compatible one powered by hls.js, which also requires `@videojs/hlsjs-video`.

### videojsDash

* Type: `boolean`
* Details: Whether to register [`dash-video`](https://videojs.org/docs/framework/html/reference/dash-video), the DASH element `VideoPlayer` plays DASH sources with. It requires `@videojs/html` and `@videojs/dash-video` to be installed, otherwise DASH sources are left to the browser.

### videojsAudio

* Type: `boolean`
* Details: Whether to enable the `AudioPlayer` component. It requires `@videojs/html` to be installed.

### videojsProviders

* Type: `VideoJsProvider[]`
* Details: Platforms played by Video.js instead of their own player. Unlike `embeds`, the video is controlled by the Video.js skin, so the player UI stays the same as `VideoPlayer`.

  Available providers: `youtube`, `vimeo`, `twitch`, `tiktok`, and `spotify`. Each one requires `@videojs/html` and its own package to be installed.

### videojsLocales

* Type: `Record<string, VideoJsLocaleData>`
* Details: Custom translations of Video.js. The partial translations merge into the language pack of the page locale, so only the keys you provide are overridden.
