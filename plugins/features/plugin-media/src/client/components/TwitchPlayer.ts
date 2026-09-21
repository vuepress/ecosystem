import type { VideoPlayerElement } from '@videojs/html/video'
import { LoadingIcon } from '@vuepress/helper/client'
import type { PropType, VNode } from 'vue'
import { defineComponent, h, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { usePageLang } from 'vuepress/client'

import type { TwitchEngineConfig } from '../../shared/index.js'
import { getVideoJsLocale } from '../../shared/index.js'
import { useSize } from '../composables/index.js'
import { loadVideoJs } from './loadVideoJs.js'

import '../styles/twitch-player.scss'

/**
 * Twitch player
 *
 * Twitch 播放器
 *
 * Streams are played by the Twitch player and controlled by the Video.js skin,
 * so the player UI stays the same as the other Video.js components.
 *
 * 直播由 Twitch 播放器播放，并由 Video.js 皮肤控制，因此播放器界面与其他 Video.js 组件保持一致。
 *
 * The `src` accepts a channel name, `twitch.tv/<channel>`, and
 * `twitch.tv/videos/<id>` URLs. Twitch refuses to play unless the embed knows
 * the hostname of the page framing it, which the player adds on its own.
 *
 * `src` 支持频道名、`twitch.tv/<channel>` 与 `twitch.tv/videos/<id>` 链接。Twitch 只有在嵌入链接
 * 包含框架页面的主机名时才会播放，播放器会自动添加该主机名。
 *
 * @example
 *   <TwitchPlayer src="https://www.twitch.tv/monstercat" />
 *   <TwitchPlayer src="monstercat" :config="{ parent: 'example.com' }" />
 */
export const TwitchPlayer = defineComponent({
  name: 'TwitchPlayer',

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
     * Whether to start playing automatically
     *
     * 是否自动播放
     *
     * @default false
     */
    autoplay: Boolean,

    /**
     * Whether to mute the stream
     *
     * 是否静音
     *
     * @default false
     */
    muted: Boolean,

    /**
     * Whether to restart the stream when it ends
     *
     * 直播结束后是否重新播放
     *
     * @default false
     */
    loop: Boolean,

    /**
     * Whether to play inline on mobile devices
     *
     * 是否在移动端内联播放
     *
     * @default true
     */
    playsinline: {
      type: Boolean,
      default: true,
    },

    /**
     * Twitch embed parameters
     *
     * Twitch 嵌入参数
     *
     * They are passed to the Twitch player as-is, so the names are exactly the
     * ones Twitch uses. The hostname of the page is always allowed in addition
     * to `parent`.
     *
     * 它们会被原样传给 Twitch 播放器，因此名称与 Twitch 完全一致。除 `parent` 外，页面所在的主机名始终会被允许。
     */
    config: Object as PropType<TwitchEngineConfig>,

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

    /**
     * Customize the Video.js player
     *
     * 对 Video.js 播放器进行自定义
     *
     * The player element exposes player state and actions via its `store`.
     *
     * 播放器元素通过 `store` 暴露播放状态与操作。
     */
    customPlayer: Function as PropType<(player: VideoPlayerElement) => void>,
  },

  setup(props, { attrs }) {
    const lang = usePageLang()
    const { el, width, height, resize } = useSize<HTMLDivElement>(props, 0)

    const loaded = ref(false)

    let destroyed = false

    onMounted(async () => {
      // Video.js registers custom elements on import, which requires a DOM
      await loadVideoJs()

      if (destroyed) return

      loaded.value = true
      resize()

      await nextTick()

      if (destroyed) return

      const player = el.value?.querySelector<VideoPlayerElement>('video-player')

      if (player) props.customPlayer?.(player)
    })

    onUnmounted(() => {
      destroyed = true
    })

    return (): (VNode | null)[] => {
      const mediaProps: Record<string, unknown> = {
        src: props.src,
        playsinline: props.playsinline,
      }

      if (props.autoplay) mediaProps.autoplay = true
      if (props.muted) mediaProps.muted = true
      if (props.loop) mediaProps.loop = true

      // Twitch embed parameters are only read from the structured source
      if (props.config) {
        mediaProps.source = {
          src: props.src,
          engine: { twitch: props.config },
        }
      }

      return [
        h(
          'div',
          {
            ...attrs,
            ref: el,
            class: ['vp-twitch-player', attrs.class],
            style: [{ width: width.value, height: height.value }, attrs.style],
          },
          loaded.value
            ? [
                h('media-i18n', { lang: getVideoJsLocale(lang.value) }, [
                  h('video-player', [
                    h('video-skin', [h('twitch-video', mediaProps)]),
                  ]),
                ]),
              ]
            : [],
        ),
        loaded.value ? null : h(LoadingIcon),
      ]
    }
  },
})
