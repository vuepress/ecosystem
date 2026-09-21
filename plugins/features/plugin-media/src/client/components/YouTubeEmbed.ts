import { LoadingIcon } from '@vuepress/helper/client'
import type { VNode } from 'vue'
import { computed, defineComponent, h, ref } from 'vue'

import { useSize } from '../composables/index.js'
import { getYouTubeEmbedUrl, videoIframeAllow } from '../utils/index.js'

import '../styles/youtube-embed.scss'

/**
 * YouTube video
 *
 * YouTube 视频
 *
 * The video is played by the YouTube IFrame player with its own controls.
 *
 * 视频由 YouTube IFrame 播放器播放，并使用其自带控件。
 *
 * The `src` accepts a video id, `youtu.be` short links, `watch?v=`, `embed/`,
 * `v/`, `shorts/`, `live/`, playlist URLs, and `youtube-nocookie.com` URLs. A
 * start time in the `t` parameter is supported, and the query parameters of the
 * URL are kept on the embed URL.
 *
 * `src` 支持视频 ID、`youtu.be`
 * 短链、`watch?v=`、`embed/`、`v/`、`shorts/`、`live/`、播放列表链接，以及
 * `youtube-nocookie.com` 链接。支持通过 `t` 参数指定开始时间，链接的查询参数会保留在嵌入链接上。
 *
 * @example
 *   <YouTubeEmbed src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
 *   <YouTubeEmbed src="dQw4w9WgXcQ" title="A video" />
 */
export const YouTubeEmbed = defineComponent({
  name: 'YouTubeEmbed',

  inheritAttrs: false,

  props: {
    /**
     * YouTube URL or video id
     *
     * YouTube 链接或视频 ID
     */
    src: {
      type: String,
      required: true,
    },

    /**
     * Video title
     *
     * 视频标题
     *
     * It is used as the title of the embed.
     *
     * 它会被用作嵌入内容的标题。
     *
     * @default 'A YouTube video'
     */
    title: {
      type: String,
      default: 'A YouTube video',
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
     * When omitted, the height is calculated from the width and the ratio.
     *
     * 未提供时，高度由宽度与长宽比计算。
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

    const embedUrl = computed(() => getYouTubeEmbedUrl(props.src))

    return (): VNode =>
      h(
        'div',
        {
          ...attrs,
          ref: el,
          class: ['vp-youtube', attrs.class],
          style: [{ width: width.value, height: height.value }, attrs.style],
        },
        embedUrl.value
          ? [
              h('a', { class: 'sr-only', href: embedUrl.value }, props.title),
              h('iframe', {
                src: embedUrl.value,
                title: props.title,
                class: 'vp-youtube-iframe',
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
                    { class: 'vp-youtube-loading' },
                    h(LoadingIcon, { wrapper: false }),
                  ),
            ]
          : [],
      )
  },
})
