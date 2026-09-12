import type { VideoPlayerElement } from '@videojs/html/video'
import { LoadingIcon } from '@vuepress/helper/client'
import type { PropType, VNode } from 'vue'
import { defineComponent, h, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { usePageLang } from 'vuepress/client'

import type { YouTubeEngineConfig } from '../../shared/index.js'
import { getVideoJsLocale } from '../../shared/index.js'
import { useSize } from '../composables/index.js'
import { loadVideoJs } from './loadVideoJs.js'

import '../styles/youtube-player.scss'

/**
 * YouTube player
 *
 * YouTube 播放器
 *
 * Videos are played by the YouTube IFrame player and controlled by the Video.js
 * skin, so the player UI stays the same as the other Video.js components.
 *
 * 视频由 YouTube IFrame 播放器播放，并由 Video.js 皮肤控制，因此播放器界面与其他 Video.js 组件保持一致。
 *
 * The `src` accepts a YouTube URL or a video id, including `youtu.be` short
 * links, `watch?v=`, `embed/`, `shorts/`, `live/`, playlist URLs, and
 * `youtube-nocookie.com` URLs. A start time in the `t` parameter is supported.
 *
 * `src` 支持 YouTube 链接或视频 ID，包括 `youtu.be`
 * 短链、`watch?v=`、`embed/`、`shorts/`、`live/`、播放列表链接，以及 `youtube-nocookie.com`
 * 链接。支持通过 `t` 参数指定开始时间。
 *
 * @example
 *   <YouTubePlayer src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
 *   <YouTubePlayer src="dQw4w9WgXcQ" :config="{ cc_lang_pref: 'zh-Hans' }" />
 */
export const YouTubePlayer = defineComponent({
  name: 'YouTubePlayer',

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
     * YouTube player parameters
     *
     * YouTube 播放器参数
     *
     * They override the defaults of the adapter, which are `rel: 0` and
     * `iv_load_policy: 3`.
     *
     * 它们会覆盖适配器的默认值，即 `rel: 0` 与 `iv_load_policy: 3`。
     */
    config: Object as PropType<YouTubeEngineConfig>,

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

      // YouTube player parameters are only read from the structured source
      if (props.config) {
        mediaProps.source = {
          src: props.src,
          engine: { youtube: props.config },
        }
      }

      return [
        h(
          'div',
          {
            ...attrs,
            ref: el,
            class: ['vp-youtube-player', attrs.class],
            style: [{ width: width.value, height: height.value }, attrs.style],
          },
          loaded.value
            ? [
                h('media-i18n', { lang: getVideoJsLocale(lang.value) }, [
                  h('video-player', [
                    h('video-skin', [h('youtube-video', mediaProps)]),
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
