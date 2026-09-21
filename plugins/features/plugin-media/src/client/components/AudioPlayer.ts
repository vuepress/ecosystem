import type { AudioPlayerElement } from '@videojs/html/audio'
import { LoadingIcon, isString } from '@vuepress/helper/client'
import type { PropType, VNode } from 'vue'
import {
  computed,
  defineComponent,
  h,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
} from 'vue'
import { usePageLang } from 'vuepress/client'

import { getVideoJsLocale, isHlsSource } from '../../shared/index.js'
import { getLink } from '../utils/getLink.js'
import { loadVideoJs } from './loadVideoJs.js'

import '../styles/audio-player.scss'

/**
 * Get the CSS value of a size
 *
 * 获取尺寸的 CSS 值
 *
 * @param value - Size value / 尺寸值
 * @returns CSS value / CSS 值
 */
const getCssValue = (value?: string | number): string | undefined =>
  value === undefined ? undefined : isString(value) ? value : `${value}px`

/**
 * Video.js audio player
 *
 * Video.js 音频播放器
 *
 * Playback rate is provided by the default audio skin of Video.js. The skin
 * sizes itself, so the component only sets the width unless a height is given.
 *
 * 倍速由 Video.js 的默认音频皮肤提供。皮肤自带高度，因此组件仅在提供高度时才会设置它，否则只设置宽度。
 */
export const AudioPlayer = defineComponent({
  name: 'AudioPlayer',

  inheritAttrs: false,

  props: {
    /**
     * Audio Source URL
     *
     * 音频源文件地址
     */
    src: {
      type: String,
      required: true,
    },

    /**
     * Audio Type
     *
     * 音频类型
     *
     * Use `hls` (or `m3u8`) to play a HLS stream on every browser.
     *
     * 使用 `hls`（或 `m3u8`）以便在所有浏览器中播放 HLS 流。
     */
    type: String,

    /**
     * Whether to start playing automatically
     *
     * 是否自动播放
     *
     * @default false
     */
    autoplay: Boolean,

    /**
     * Whether to mute the audio
     *
     * 是否静音
     *
     * @default false
     */
    muted: Boolean,

    /**
     * Whether to restart the audio when it ends
     *
     * 音频结束后是否重新播放
     *
     * @default false
     */
    loop: Boolean,

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
     * @default 'auto'
     */
    height: [String, Number],

    /**
     * Customize the Video.js player
     *
     * 对 Video.js 播放器进行自定义
     *
     * The player element exposes player state and actions via its `store`.
     *
     * 播放器元素通过 `store` 暴露播放状态与操作。
     */
    customPlayer: Function as PropType<(player: AudioPlayerElement) => void>,
  },

  setup(props, { attrs }) {
    const lang = usePageLang()

    const width = computed(() => getCssValue(props.width) ?? '100%')
    const height = computed(() => getCssValue(props.height))

    const el = ref<HTMLDivElement>()

    const loaded = ref(false)

    let destroyed = false

    onMounted(async () => {
      // Video.js registers custom elements on import, which requires a DOM
      await loadVideoJs()

      if (destroyed) return

      loaded.value = true

      await nextTick()

      if (destroyed) return

      const player = el.value?.querySelector<AudioPlayerElement>('audio-player')

      if (player) props.customPlayer?.(player)
    })

    onUnmounted(() => {
      destroyed = true
    })

    return (): (VNode | null)[] => {
      const mediaProps: Record<string, unknown> = { src: getLink(props.src) }

      if (props.autoplay) mediaProps.autoplay = true
      if (props.muted) mediaProps.muted = true
      if (props.loop) mediaProps.loop = true

      return [
        h(
          'div',
          {
            ...attrs,
            ref: el,
            class: ['vp-audio-player', attrs.class],
            style: [{ width: width.value, height: height.value }, attrs.style],
          },
          loaded.value
            ? [
                h('media-i18n', { lang: getVideoJsLocale(lang.value) }, [
                  h('audio-player', [
                    h('audio-skin', [
                      h(
                        isHlsSource(props.src, props.type)
                          ? 'hls-audio'
                          : 'audio',
                        mediaProps,
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
