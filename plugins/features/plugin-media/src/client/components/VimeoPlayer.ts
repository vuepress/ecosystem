import type { VideoPlayerElement } from '@videojs/html/video'
import { LoadingIcon } from '@vuepress/helper/client'
import type { PropType, VNode } from 'vue'
import { defineComponent, h, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { usePageLang } from 'vuepress/client'

import type { VimeoEngineConfig } from '../../shared/index.js'
import { getVideoJsLocale } from '../../shared/index.js'
import { useSize } from '../composables/index.js'
import { loadVideoJs } from './loadVideoJs.js'

import '../styles/vimeo-player.scss'

/**
 * Vimeo player
 *
 * Vimeo 播放器
 *
 * Videos are played by the Vimeo player and controlled by the Video.js skin, so
 * the player UI stays the same as the other Video.js components.
 *
 * 视频由 Vimeo 播放器播放，并由 Video.js 皮肤控制，因此播放器界面与其他 Video.js 组件保持一致。
 *
 * The `src` accepts a video id, `vimeo.com/<id>`, `vimeo.com/video/<id>`, and
 * `player.vimeo.com/video/<id>` URLs. The unlisted hash of the URL is kept, so
 * private videos play as well.
 *
 * `src` 支持视频 ID、`vimeo.com/<id>`、`vimeo.com/video/<id>` 与
 * `player.vimeo.com/video/<id>` 链接。链接中的非公开哈希会被保留，因此私密视频同样可以播放。
 *
 * @example
 *   <VimeoPlayer src="https://vimeo.com/76979871" />
 *   <VimeoPlayer src="76979871" :config="{ dnt: true }" />
 */
export const VimeoPlayer = defineComponent({
  name: 'VimeoPlayer',

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
     * Vimeo embed parameters
     *
     * Vimeo 嵌入参数
     *
     * They are passed to the Vimeo player as-is, so the names are exactly the
     * ones Vimeo uses.
     *
     * 它们会被原样传给 Vimeo 播放器，因此名称与 Vimeo 完全一致。
     */
    config: Object as PropType<VimeoEngineConfig>,

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

      // Vimeo embed parameters are only read from the structured source
      if (props.config) {
        mediaProps.source = {
          src: props.src,
          engine: { vimeo: props.config },
        }
      }

      return [
        h(
          'div',
          {
            ...attrs,
            ref: el,
            class: ['vp-vimeo-player', attrs.class],
            style: [{ width: width.value, height: height.value }, attrs.style],
          },
          loaded.value
            ? [
                h('media-i18n', { lang: getVideoJsLocale(lang.value) }, [
                  h('video-player', [
                    h('video-skin', [h('vimeo-video', mediaProps)]),
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
