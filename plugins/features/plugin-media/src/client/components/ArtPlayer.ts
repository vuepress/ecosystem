import { LoadingIcon, keys } from '@vuepress/helper/client'
import type Artplayer from 'artplayer'
import type { Option as ArtPlayerInitOptions } from 'artplayer'
import type { PropType, VNode } from 'vue'
import { camelize, defineComponent, h, onMounted, onUnmounted, ref } from 'vue'
import { usePageLang } from 'vuepress/client'

import type { ArtPlayerOptions } from '../../shared/index.js'
import { getArtPlayerLang, mergeArtPlayerI18n } from '../../shared/index.js'
import { useSize } from '../composables/index.js'
import { getLink } from '../utils/getLink.js'
import {
  SUPPORTED_VIDEO_TYPES,
  getTypeByUrl,
  registerMseDash,
  registerMseFlv,
  registerMseHls,
} from '../utils/registerMse.js'

import '../styles/art-player.scss'

const BOOLEAN_TRUE_ATTRS = [
  'no-fullscreen',
  'no-hotkey',
  'no-playback-rate',
  'no-setting',
  'no-mutex',
  'no-plays-inline',
] as const

const BOOLEAN_FALSE_ATTRS = [
  'airplay',
  'autoplay',
  'aspect-ratio',
  'auto-mini',
  'auto-size',
  'auto-orientation',
  'auto-playback',
  'fast-forward',
  'flip',
  'fullscreen-web',
  'lock',
  'loop',
  'is-live',
  'muted',
  'mini-progress-bar',
  'pip',
  'screenshot',
  'subtitle-offset',
] as const

type KebabCaseToCamelCase<
  Input extends string,
  Cap extends boolean = false,
> = Input extends `${infer Head}-${infer Tail}`
  ? `${Cap extends true ? Capitalize<Head> : Head}${KebabCaseToCamelCase<
      Tail,
      true
    >}`
  : Cap extends true
    ? Capitalize<Input>
    : Input

type ArtPlayerBooleanOptionKey =
  | (typeof BOOLEAN_FALSE_ATTRS extends readonly (infer T extends string)[]
      ? KebabCaseToCamelCase<T>
      : never)
  | (typeof BOOLEAN_TRUE_ATTRS extends readonly (infer T extends string)[]
      ? T extends `no-${infer Key}`
        ? KebabCaseToCamelCase<Key>
        : never
      : never)

declare const ART_PLAYER_OPTIONS: ArtPlayerOptions

export const ArtPlayer = defineComponent({
  name: 'ArtPlayer',

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
     */
    type: String,

    /**
     * Video poster
     *
     * 视频封面
     */
    poster: String,

    /**
     * Video title
     *
     * 视频标题
     */
    title: String,

    /**
     * Component width
     *
     * 组件宽度
     */
    width: {
      type: [String, Number],
      default: '100%',
    },

    /**
     * Component height
     *
     * 组件高度
     */
    height: [String, Number],

    /**
     * Component width / height ratio
     *
     * 组件长宽比
     */
    ratio: {
      type: [String, Number],
      default: 16 / 9,
    },

    /**
     * ArtPlayer config
     *
     * ArtPlayer 配置
     */
    config: Object as PropType<Omit<ArtPlayerOptions, 'container'>>,

    /**
     * Customize Artplayer
     *
     * 对 Artplayer 进行自定义
     */
    customPlayer: Function as PropType<
      (
        player: Artplayer,
      ) => Artplayer | Promise<Artplayer> | Promise<void> | void
    >,
  },

  setup(props, { attrs }) {
    const lang = usePageLang()
    const { el, width, height, resize } = useSize<HTMLDivElement>(props, 0)

    const loaded = ref(false)
    let artPlayerInstance: Artplayer | null = null
    let destroyed = false

    const getInitOptions = (): ArtPlayerInitOptions => {
      const initOptions: ArtPlayerInitOptions = {
        theme: '#3eaf7c',
        ...ART_PLAYER_OPTIONS,

        container: el.value!,
        url: getLink(props.src),
        type: props.type ?? getTypeByUrl(props.src),
        lang: getArtPlayerLang(lang.value),
        ...props.config,
        // This option must be set false to avoid problems
        useSSR: false,
      }

      // Artplayer validates the type of every option it receives,
      // so options with `undefined` value should not be passed
      if (props.poster) initOptions.poster = props.poster

      const attrsKeys = keys(attrs)

      BOOLEAN_TRUE_ATTRS.forEach((config) => {
        if (attrsKeys.includes(config)) {
          initOptions[
            camelize(config.replace(/^no-/u, '')) as ArtPlayerBooleanOptionKey
          ] = false
        }
      })
      BOOLEAN_FALSE_ATTRS.forEach((config) => {
        if (attrsKeys.includes(config))
          initOptions[camelize(config) as ArtPlayerBooleanOptionKey] = true
      })

      // Auto config mse
      if (initOptions.type) {
        // eslint-disable-next-line no-multi-assign
        const customType = (initOptions.customType ??= {})

        if (SUPPORTED_VIDEO_TYPES.includes(initOptions.type.toLowerCase())) {
          switch (initOptions.type.toLowerCase()) {
            case 'm3u8':
            case 'hls': {
              customType[initOptions.type] ??= (
                video: HTMLVideoElement,
                src: string,
                player: Artplayer,
              ): Promise<void> =>
                registerMseHls(video, src, (destroy) => {
                  player.on('destroy', destroy)
                })
              break
            }

            case 'flv':
            case 'ts': {
              customType[initOptions.type] ??= (
                video: HTMLVideoElement,
                src: string,
                player: Artplayer,
              ): Promise<void> =>
                registerMseFlv(video, src, (destroy) => {
                  player.on('destroy', destroy)
                })
              break
            }

            case 'mpd':
            case 'dash': {
              customType[initOptions.type] ??= (
                video: HTMLVideoElement,
                src: string,
                player: Artplayer,
              ): Promise<void> =>
                registerMseDash(video, src, (destroy) => {
                  player.on('destroy', destroy)
                })
              break
            }

            default:
          }
        } else {
          // eslint-disable-next-line no-console
          console.warn(
            `[components]: ArtPlayer does not support current file type ${initOptions.type}!`,
          )
        }
      }

      return initOptions
    }

    onMounted(async () => {
      const initOptions = getInitOptions()

      // The entry is generated by the plugin, which bundles the core
      // and the locales used by the site
      const { default: Artplayer, i18n } = await import(
        /* webpackChunkName: "artplayer" */ '@temp/media/artplayer.js'
      )

      if (destroyed) return

      // Custom i18n should take precedence over the bundled locales
      initOptions.i18n = mergeArtPlayerI18n(i18n, initOptions.i18n)

      const player = new Artplayer(initOptions)

      artPlayerInstance = (await props.customPlayer?.(player)) ?? player
      loaded.value = true
      resize()
    })

    onUnmounted(() => {
      destroyed = true
      artPlayerInstance?.destroy()
    })

    return (): (VNode | null)[] => [
      h('div', {
        ref: el,
        class: 'vp-artplayer',
        style: {
          width: width.value,
          height: height.value,
        },
      }),
      loaded.value ? null : h(LoadingIcon),
    ]
  },
})
