import { LoadingIcon } from '@vuepress/helper/client'
import type { VNode } from 'vue'
import { computed, defineComponent, h, ref } from 'vue'

import { useSize } from '../composables/index.js'
import { getSpotifyEmbedUrl, videoIframeAllow } from '../utils/index.js'

import '../styles/spotify-embed.scss'

/**
 * Spotify track, episode, album, playlist, show, or artist
 *
 * Spotify 单曲、单集、专辑、播放列表、节目或艺人
 *
 * The audio is played by the Spotify player with its own controls.
 *
 * 音频由 Spotify 播放器播放，并使用其自带控件。
 *
 * The `src` accepts `open.spotify.com` URLs and `spotify:<type>:<id>` URIs. The
 * query parameters of the URL are kept on the embed URL, so options like
 * `?theme=0` work.
 *
 * `src` 支持 `open.spotify.com` 链接与 `spotify:<type>:<id>` URI。链接的查询参数会保留在嵌入链接上，
 * 因此 `?theme=0` 等选项仍然有效。
 *
 * The embed has a fixed height, so a `height` of `152` (single items) or `352`
 * (collections) is recommended over the default ratio.
 *
 * 嵌入内容的高度是固定的，因此推荐使用 `height` 而非默认长宽比，单集项目为 `152`，合集为 `352`。
 *
 * @example
 *   <SpotifyEmbed src="https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC" height="152" />
 */
export const SpotifyEmbed = defineComponent({
  name: 'SpotifyEmbed',

  inheritAttrs: false,

  props: {
    /**
     * Spotify URL, URI, or entity id
     *
     * Spotify 链接、URI 或实体 ID
     */
    src: {
      type: String,
      required: true,
    },

    /**
     * Player title
     *
     * 播放器标题
     *
     * It is used as the title of the embed.
     *
     * 它会被用作嵌入内容的标题。
     *
     * @default 'A Spotify player'
     */
    title: {
      type: String,
      default: 'A Spotify player',
    },

    /**
     * Component width
     *
     * 组件宽度
     *
     * @default '100%'
     */
    width: {
      type: [String, Number],
      default: '100%',
    },

    /**
     * Component height
     *
     * 组件高度
     *
     * When omitted, the height is calculated from the width and the ratio,
     * which is taller than the embed.
     *
     * 未提供时，高度由宽度与长宽比计算，其结果高于嵌入内容的高度。
     */
    height: [String, Number],

    /**
     * Component width / height ratio
     *
     * 组件长宽比
     *
     * @default 16 / 9
     */
    ratio: {
      type: [String, Number],
      default: 16 / 9,
    },
  },

  setup(props, { attrs }) {
    const { el, width, height, resize } = useSize<HTMLDivElement>(props)

    const loaded = ref(false)

    const embedUrl = computed(() => getSpotifyEmbedUrl(props.src))

    return (): VNode =>
      h(
        'div',
        {
          ...attrs,
          ref: el,
          class: ['vp-spotify', attrs.class],
          style: [{ width: width.value, height: height.value }, attrs.style],
        },
        embedUrl.value
          ? [
              h('a', { class: 'sr-only', href: embedUrl.value }, props.title),
              h('iframe', {
                src: embedUrl.value,
                title: props.title,
                class: 'vp-spotify-iframe',
                allow: videoIframeAllow,
                allowfullscreen: true,
                loading: 'lazy',
                referrerpolicy: 'no-referrer-when-downgrade',
                onLoad: () => {
                  loaded.value = true
                  resize()
                },
              }),
              loaded.value
                ? null
                : h(
                    'div',
                    { class: 'vp-spotify-loading' },
                    h(LoadingIcon, { wrapper: false }),
                  ),
            ]
          : [],
      )
  },
})
