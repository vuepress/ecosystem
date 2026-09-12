import { LoadingIcon } from '@vuepress/helper/client'
import type { VNode } from 'vue'
import { computed, defineComponent, h, ref } from 'vue'

import { useSize } from '../composables/index.js'
import { getTikTokEmbedUrl, videoIframeAllow } from '../utils/index.js'

import '../styles/tiktok-embed.scss'

/**
 * TikTok video
 *
 * TikTok 视频
 *
 * The video is played by the TikTok player with its own controls.
 *
 * 视频由 TikTok 播放器播放，并使用其自带控件。
 *
 * The player fills the whole component, so the ratio should match the video.
 *
 * 播放器会铺满整个组件，因此长宽比应与视频一致。
 *
 * The `src` accepts a numeric id and the `tiktok.com/@user/video/<id>`,
 * `tiktok.com/player/v1/<id>`, and `tiktok.com/embed/v2/<id>` URLs the app
 * hands out. The query parameters of the URL are kept on the embed URL, so
 * player options like `?autoplay=1` work.
 *
 * `src` 支持数字 ID，以及应用提供的
 * `tiktok.com/@user/video/<id>`、`tiktok.com/player/v1/<id>` 与
 * `tiktok.com/embed/v2/<id>` 链接。链接的查询参数会保留在嵌入链接上，因此 `?autoplay=1` 等播放器选项仍然有效。
 *
 * @example
 *   <TikTokEmbed src="https://www.tiktok.com/@scout2015/video/6718335390845095173" />
 *   <TikTokEmbed src="6718335390845095173" />
 */
export const TikTokEmbed = defineComponent({
  name: 'TikTokEmbed',

  inheritAttrs: false,

  props: {
    /**
     * TikTok URL or video id
     *
     * TikTok 链接或视频 ID
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
     * @default 'A TikTok video'
     */
    title: {
      type: String,
      default: 'A TikTok video',
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
     * TikTok videos are vertical, so the default is `9 / 16`.
     *
     * TikTok 视频为竖屏，因此默认为 `9 / 16`。
     *
     * @default 9 / 16
     */
    ratio: {
      type: [String, Number],
      default: 9 / 16,
    },
  },

  setup(props, { attrs }) {
    const { el, width, height, resize } = useSize<HTMLDivElement>(props)

    const loaded = ref(false)

    const embedUrl = computed(() => getTikTokEmbedUrl(props.src))

    return (): VNode =>
      h(
        'div',
        {
          ...attrs,
          ref: el,
          class: ['vp-tiktok', attrs.class],
          style: [{ width: width.value, height: height.value }, attrs.style],
        },
        embedUrl.value
          ? [
              h('a', { class: 'sr-only', href: embedUrl.value }, props.title),
              h('iframe', {
                src: embedUrl.value,
                title: props.title,
                class: 'vp-tiktok-iframe',
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
                    { class: 'vp-tiktok-loading' },
                    h(LoadingIcon, { wrapper: false }),
                  ),
            ]
          : [],
      )
  },
})
