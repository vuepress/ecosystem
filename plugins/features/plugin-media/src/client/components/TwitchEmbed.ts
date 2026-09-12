import { LoadingIcon } from '@vuepress/helper/client'
import type { PropType, VNode } from 'vue'
import { computed, defineComponent, h, onMounted, ref } from 'vue'

import { useSize } from '../composables/index.js'
import { getTwitchEmbedUrl, videoIframeAllow } from '../utils/index.js'

import '../styles/twitch-embed.scss'

/**
 * Twitch live channel or video
 *
 * Twitch 直播频道或视频
 *
 * The stream is played by the Twitch player with its own controls.
 *
 * 直播由 Twitch 播放器播放，并使用其自带控件。
 *
 * The `src` accepts a channel name, `twitch.tv/<channel>`, and
 * `twitch.tv/videos/<id>` URLs. Twitch refuses to play unless the embed knows
 * the hostname of the page framing it, so the hostname is read from the browser
 * and passed to the embed, and it is only known once the page runs in a
 * browser.
 *
 * `src` 支持频道名、`twitch.tv/<channel>` 与 `twitch.tv/videos/<id>` 链接。Twitch 只有在嵌入链接
 * 包含框架页面的主机名时才会播放，因此组件会从浏览器读取主机名并传给嵌入链接，而该主机名只有在浏览器中运行时才可知。
 *
 * @example
 *   <TwitchEmbed src="https://www.twitch.tv/monstercat" />
 *   <TwitchEmbed src="monstercat" parent="example.com" />
 */
export const TwitchEmbed = defineComponent({
  name: 'TwitchEmbed',

  inheritAttrs: false,

  props: {
    /**
     * Twitch URL or channel name
     *
     * Twitch 链接或频道名
     */
    src: {
      type: String,
      required: true,
    },

    /**
     * Hostname of the page framing the embed
     *
     * 框架嵌入页面的主机名
     *
     * It defaults to the hostname the page is served from, which is read from
     * the browser.
     *
     * 默认为浏览器中当前页面的主机名。
     */
    parent: [String, Array] as PropType<string | string[]>,

    /**
     * Stream title
     *
     * 直播标题
     *
     * It is used as the title of the embed.
     *
     * 它会被用作嵌入内容的标题。
     *
     * @default 'A Twitch video'
     */
    title: {
      type: String,
      default: 'A Twitch video',
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

    const hostname = ref<string>()

    const embedUrl = computed(() =>
      props.parent || hostname.value
        ? getTwitchEmbedUrl(props.src, props.parent ?? hostname.value)
        : null,
    )

    onMounted(() => {
      hostname.value = window.location.hostname
    })

    return (): VNode =>
      h(
        'div',
        {
          ...attrs,
          ref: el,
          class: ['vp-twitch', attrs.class],
          style: [{ width: width.value, height: height.value }, attrs.style],
        },
        embedUrl.value
          ? [
              h('a', { class: 'sr-only', href: embedUrl.value }, props.title),
              h('iframe', {
                src: embedUrl.value,
                title: props.title,
                class: 'vp-twitch-iframe',
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
                    { class: 'vp-twitch-loading' },
                    h(LoadingIcon, { wrapper: false }),
                  ),
            ]
          : [],
      )
  },
})
