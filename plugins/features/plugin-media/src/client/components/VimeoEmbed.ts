import { LoadingIcon } from '@vuepress/helper/client'
import type { VNode } from 'vue'
import { computed, defineComponent, h, ref } from 'vue'

import { useSize } from '../composables/index.js'
import { getVimeoEmbedUrl, videoIframeAllow } from '../utils/index.js'

import '../styles/vimeo-embed.scss'

/**
 * Vimeo video
 *
 * Vimeo 视频
 *
 * The video is played by the Vimeo player with its own controls.
 *
 * 视频由 Vimeo 播放器播放，并使用其自带控件。
 *
 * The `src` accepts a video id, `vimeo.com/<id>`, `vimeo.com/video/<id>`, and
 * `player.vimeo.com/video/<id>` URLs. The unlisted hash of the URL is kept, so
 * private videos play as well.
 *
 * `src` 支持视频 ID、`vimeo.com/<id>`、`vimeo.com/video/<id>` 与
 * `player.vimeo.com/video/<id>` 链接。链接中的非公开哈希会被保留，因此私密视频同样可以播放。
 *
 * @example
 *   <VimeoEmbed src="https://vimeo.com/76979871" />
 *   <VimeoEmbed src="76979871" height="360" />
 */
export const VimeoEmbed = defineComponent({
  name: 'VimeoEmbed',

  inheritAttrs: false,

  props: {
    /**
     * Vimeo URL or video id
     *
     * Vimeo 链接或视频 ID
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
     * @default 'A Vimeo video'
     */
    title: {
      type: String,
      default: 'A Vimeo video',
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

    const embedUrl = computed(() => getVimeoEmbedUrl(props.src))

    return (): VNode =>
      h(
        'div',
        {
          ...attrs,
          ref: el,
          class: ['vp-vimeo', attrs.class],
          style: [{ width: width.value, height: height.value }, attrs.style],
        },
        embedUrl.value
          ? [
              h('a', { class: 'sr-only', href: embedUrl.value }, props.title),
              h('iframe', {
                src: embedUrl.value,
                title: props.title,
                class: 'vp-vimeo-iframe',
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
                    { class: 'vp-vimeo-loading' },
                    h(LoadingIcon, { wrapper: false }),
                  ),
            ]
          : [],
      )
  },
})
