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

import type { SpotifyEngineConfig } from '../../shared/index.js'
import { getVideoJsLocale } from '../../shared/index.js'
import { loadVideoJs } from './loadVideoJs.js'

import '../styles/spotify-player.scss'

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
 * Spotify player
 *
 * Spotify 播放器
 *
 * Audio is played by the Spotify player and controlled by the Video.js skin, so
 * the player UI stays the same as the other Video.js components.
 *
 * 音频由 Spotify 播放器播放，并由 Video.js 皮肤控制，因此播放器界面与其他 Video.js 组件保持一致。
 *
 * The `src` accepts `open.spotify.com` URLs and `spotify:<type>:<id>` URIs.
 *
 * `src` 支持 `open.spotify.com` 链接与 `spotify:<type>:<id>` URI。
 *
 * The Spotify embed takes no volume or mute command, so the component has no
 * `muted` prop, and the audio skin sizes itself, so it has no `ratio` prop
 * either. The skin only sets the height when a height is given.
 *
 * Spotify 嵌入不接受音量或静音指令，因此组件没有 `muted` 属性；音频皮肤自带高度，因此也没有 `ratio`
 * 属性。只有在提供高度时，皮肤才会设置高度。
 *
 * @example
 *   <SpotifyPlayer src="https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC" />
 *   <SpotifyPlayer src="spotify:episode:512ojhOuo1ktJprKbVcKyQ" :config="{ theme: 0 }" />
 */
export const SpotifyPlayer = defineComponent({
  name: 'SpotifyPlayer',

  inheritAttrs: false,

  props: {
    /**
     * Spotify URL, URI, or entity id
     *
     * Spotify 链接、URI 或实体 ID
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
     * Whether to restart the audio when it ends
     *
     * 音频结束后是否重新播放
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
     * Spotify embed options
     *
     * Spotify 嵌入选项
     *
     * They are passed to the Spotify player as-is, so the names are exactly the
     * ones Spotify uses. Options owned by the player (`autoplay`, `loop`,
     * `preload`) are excluded.
     *
     * 它们会被原样传给 Spotify 播放器，因此名称与 Spotify 完全一致。由播放器掌控的选项
     * （`autoplay`、`loop`、`preload`）已排除。
     */
    config: Object as PropType<SpotifyEngineConfig>,

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
     * The audio skin has its own height, so the component only sets it when it
     * is given.
     *
     * 音频皮肤自带高度，因此组件仅在提供高度时才会设置它。
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
      const mediaProps: Record<string, unknown> = {
        src: props.src,
        playsinline: props.playsinline,
      }

      if (props.autoplay) mediaProps.autoplay = true
      if (props.loop) mediaProps.loop = true

      // Spotify embed options are only read from the structured source
      if (props.config) {
        mediaProps.source = {
          src: props.src,
          engine: { spotify: props.config },
        }
      }

      return [
        h(
          'div',
          {
            ...attrs,
            ref: el,
            class: ['vp-spotify-player', attrs.class],
            style: [{ width: width.value, height: height.value }, attrs.style],
          },
          loaded.value
            ? [
                h('media-i18n', { lang: getVideoJsLocale(lang.value) }, [
                  h('audio-player', [
                    h('audio-skin', [h('spotify-audio', mediaProps)]),
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
