import { LoadingIcon } from '@vuepress/helper/client'
import type { VNode } from 'vue'
import { computed, defineComponent, h, ref } from 'vue'

import { useSize } from '../composables/index.js'
import { getDailymotionEmbedUrl, videoIframeAllow } from '../utils/index.js'

import '../styles/dailymotion-embed.scss'

/**
 * Dailymotion video
 *
 * Dailymotion 视频
 *
 * The video is played by the Dailymotion player with its own controls.
 *
 * 视频由 Dailymotion 播放器播放，并使用其自带控件。
 *
 * The `src` accepts a video id, `dailymotion.com/video/<id>`,
 * `dailymotion.com/embed/video/<id>`, and `dai.ly/<id>` URLs. The query
 * parameters of the URL are kept on the embed URL, so player options like
 * `?mute=1` work.
 *
 * `src` 支持视频 ID、`dailymotion.com/video/<id>`、`dailymotion.com/embed/video/<id>`
 * 与 `dai.ly/<id>` 链接。链接的查询参数会保留在嵌入链接上，因此 `?mute=1` 等播放器选项仍然有效。
 *
 * @example
 *   <DailymotionEmbed src="https://www.dailymotion.com/video/x8v5k1u" />
 *   <DailymotionEmbed src="x8v5k1u" />
 */
export const DailymotionEmbed = defineComponent({
  name: 'DailymotionEmbed',

  inheritAttrs: false,

  props: {
    /**
     * Dailymotion URL or video id
     *
     * Dailymotion 链接或视频 ID
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
     * @default 'A Dailymotion video'
     */
    title: {
      type: String,
      default: 'A Dailymotion video',
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

    const embedUrl = computed(() => getDailymotionEmbedUrl(props.src))

    return (): VNode =>
      h(
        'div',
        {
          ...attrs,
          ref: el,
          class: ['vp-dailymotion', attrs.class],
          style: [{ width: width.value, height: height.value }, attrs.style],
        },
        embedUrl.value
          ? [
              h('a', { class: 'sr-only', href: embedUrl.value }, props.title),
              h('iframe', {
                src: embedUrl.value,
                title: props.title,
                class: 'vp-dailymotion-iframe',
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
                    { class: 'vp-dailymotion-loading' },
                    h(LoadingIcon, { wrapper: false }),
                  ),
            ]
          : [],
      )
  },
})
