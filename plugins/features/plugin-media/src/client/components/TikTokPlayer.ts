import type { VideoPlayerElement } from '@videojs/html/video'
import { LoadingIcon } from '@vuepress/helper/client'
import type { PropType, VNode } from 'vue'
import { defineComponent, h, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { usePageLang } from 'vuepress/client'

import type { TikTokEngineConfig } from '../../shared/index.js'
import { getVideoJsLocale } from '../../shared/index.js'
import { useSize } from '../composables/index.js'
import { loadVideoJs } from './loadVideoJs.js'

import '../styles/tiktok-player.scss'

/**
 * TikTok player
 *
 * TikTok 播放器
 *
 * Videos are played by the TikTok player and controlled by the Video.js skin,
 * so the player UI stays the same as the other Video.js components.
 *
 * 视频由 TikTok 播放器播放，并由 Video.js 皮肤控制，因此播放器界面与其他 Video.js 组件保持一致。
 *
 * The `src` accepts a numeric id and the `tiktok.com/@user/video/<id>`,
 * `tiktok.com/player/v1/<id>`, and `tiktok.com/embed/v2/<id>` URLs the app
 * hands out.
 *
 * `src` 支持数字 ID，以及应用提供的
 * `tiktok.com/@user/video/<id>`、`tiktok.com/player/v1/<id>` 与
 * `tiktok.com/embed/v2/<id>` 链接。
 *
 * @example
 *   <TikTokPlayer src="https://www.tiktok.com/@scout2015/video/6718335390845095173" />
 *   <TikTokPlayer src="6718335390845095173" :config="{ rel: 0 }" />
 */
export const TikTokPlayer = defineComponent({
  name: 'TikTokPlayer',

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
     * Whether to start playing automatically
     *
     * 是否自动播放
     *
     * @default false
     */
    autoplay: Boolean,

    /**
     * Whether to mute the video
     *
     * 是否静音
     *
     * @default false
     */
    muted: Boolean,

    /**
     * Whether to restart the video when it ends
     *
     * 视频结束后是否重新播放
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
     * TikTok player parameters
     *
     * TikTok 播放器参数
     *
     * They are passed to the TikTok player as-is, so the names are exactly the
     * ones TikTok uses.
     *
     * 它们会被原样传给 TikTok 播放器，因此名称与 TikTok 完全一致。
     */
    config: Object as PropType<TikTokEngineConfig>,

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

      // TikTok player parameters are only read from the structured source
      if (props.config) {
        mediaProps.source = {
          src: props.src,
          engine: { tiktok: props.config },
        }
      }

      return [
        h(
          'div',
          {
            ...attrs,
            ref: el,
            class: ['vp-tiktok-player', attrs.class],
            style: [{ width: width.value, height: height.value }, attrs.style],
          },
          loaded.value
            ? [
                h('media-i18n', { lang: getVideoJsLocale(lang.value) }, [
                  h('video-player', [
                    h('video-skin', [h('tiktok-video', mediaProps)]),
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
