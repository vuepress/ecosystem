import type { VideoPlayerElement } from '@videojs/html/video'
import { LoadingIcon } from '@vuepress/helper/client'
import type { PropType, VNode } from 'vue'
import { defineComponent, h, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { usePageLang } from 'vuepress/client'

import {
  getVideoJsLocale,
  isDashSource,
  isHlsSource,
} from '../../shared/index.js'
import { useSize } from '../composables/index.js'
import { getLink } from '../utils/getLink.js'
import { loadVideoJs } from './loadVideoJs.js'

import '../styles/video-player.scss'

/**
 * Whether an element has been registered
 *
 * 元素是否已注册
 *
 * The plugin only registers the elements it is asked for, so asking the
 * registry keeps the element in sync with the option that enabled it.
 *
 * 插件只会注册被启用的元素，因此查询注册表就能让元素与启用它的选项保持一致。
 *
 * @param name - Name of the element / 元素名称
 * @returns Whether the element is registered / 元素是否已注册
 */
const isElementRegistered = (name: string): boolean =>
  typeof customElements !== 'undefined' && Boolean(customElements.get(name))

/**
 * Get the media element that plays a source
 *
 * 获取播放某个源的媒体元素
 *
 * The DASH element is optional and the HLS element comes in two variants, so a
 * source whose element is not registered falls back to the native `video`, and
 * the browser reports its usual media error.
 *
 * DASH 元素是可选的，HLS 元素又有两个版本，因此元素未注册的源会回退到原生 `video`， 由浏览器报出其常规的媒体错误。
 *
 * @param src - Media source URL / 媒体源地址
 * @param [type] - Media type hint / 媒体类型提示
 * @returns Name of the element / 元素名称
 */
const getMediaElement = (src: string, type?: string): string => {
  if (isDashSource(src, type) && isElementRegistered('dash-video'))
    return 'dash-video'

  if (!isHlsSource(src, type)) return 'video'

  return isElementRegistered('hlsjs-video') ? 'hlsjs-video' : 'hls-video'
}

/**
 * Video.js video player
 *
 * Video.js 视频播放器
 *
 * Playback rate, quality, picture-in-picture, casting, captions, audio tracks
 * and the poster are provided by the default video skin of Video.js.
 *
 * 倍速、画质、画中画、投屏、字幕、音轨与封面由 Video.js 的默认视频皮肤提供。
 *
 * The default slot is rendered inside the media element, so `<track>` and
 * `<source>` elements can be added directly.
 *
 * 默认插槽会渲染在媒体元素内部，因此可以直接添加 `<track>` 与 `<source>` 元素。
 */
export const VideoPlayer = defineComponent({
  name: 'VideoPlayer',

  inheritAttrs: false,

  props: {
    /**
     * Video Source URL
     *
     * 视频源文件地址
     */
    src: {
      type: String,
      required: true,
    },

    /**
     * Video Type
     *
     * 视频类型
     *
     * Use `hls` (or `m3u8`) to play a HLS stream on every browser, or `dash`
     * (or `mpd`) to play a DASH stream. It is only needed when the source URL
     * does not end with the matching extension.
     *
     * 使用 `hls`（或 `m3u8`）以便在所有浏览器中播放 HLS 流，使用 `dash`（或 `mpd`）播放 DASH
     * 流。仅当源链接不以对应扩展名结尾时才需要它。
     */
    type: String,

    /**
     * Video poster
     *
     * 视频封面
     */
    poster: String,

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
     * CORS setting of the video, which is required for cross-origin captions
     *
     * 视频的 CORS 设置，跨域字幕需要该配置
     */
    crossorigin: String,

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

  setup(props, { attrs, slots }) {
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
        src: getLink(props.src),
        playsinline: props.playsinline,
      }
      const playerProps: Record<string, unknown> = {}

      if (props.autoplay) mediaProps.autoplay = true
      if (props.muted) mediaProps.muted = true
      if (props.loop) mediaProps.loop = true
      if (props.crossorigin) mediaProps.crossorigin = props.crossorigin
      if (props.poster) playerProps.poster = getLink(props.poster)

      return [
        h(
          'div',
          {
            ...attrs,
            ref: el,
            class: ['vp-video-player', attrs.class],
            style: [{ width: width.value, height: height.value }, attrs.style],
          },
          loaded.value
            ? [
                h('media-i18n', { lang: getVideoJsLocale(lang.value) }, [
                  h('video-player', playerProps, [
                    h('video-skin', [
                      h(
                        getMediaElement(props.src, props.type),
                        mediaProps,
                        slots.default?.(),
                      ),
                    ]),
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
