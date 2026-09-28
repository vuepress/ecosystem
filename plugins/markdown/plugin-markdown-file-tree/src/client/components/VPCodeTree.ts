import type { SlotsType, VNode } from 'vue'
import {
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  provide,
  ref,
  watch,
} from 'vue'

import { activeFileKey } from '../utils.js'
import { VPFileTree } from './VPFileTree.js'

import '../styles/vars.scss'
import '../styles/codeTree.scss'

/**
 * Fallback text colors for a light and a dark sampled background
 *
 * 浅色与深色采样背景的回退文字颜色
 */
const LIGHT_TEXT = 'rgb(60 60 67)'
const DARK_TEXT = 'rgb(235 235 245)'

/**
 * The sampled colors of the panel
 *
 * 面板上被采样的颜色
 */
const SAMPLED_COLORS = [
  '--vp-code-tree-c-bg',
  '--vp-code-tree-c-text',
  '--vp-code-tree-c-text-mute',
  '--vp-code-tree-c-border',
  '--vp-code-tree-c-hover-bg',
] as const

/**
 * Parse a color into sRGB channels in `[0, 255]`
 *
 * Parses the serializations a resolved color can have, the cylindrical color
 * spaces are left to `getColorLightness`.
 *
 * 将颜色解析为 `[0, 255]` 范围内的 sRGB 通道
 *
 * 解析后的颜色可能有序列化形式，圆柱色彩空间交给 `getColorLightness` 处理。
 *
 * @param color - A color, e.g. `rgb(1 2 3)` / 颜色，如 `rgb(1 2 3)`
 * @returns The channels, or `null` when the color can not be parsed / 通道
 *   值，无法解析时返回 `null`
 */
const parseColorChannels = (color: string): [number, number, number] | null => {
  // rgb(r g b) / rgba(r g b / a)
  const rgb =
    /rgba?\(\s*(?<red>[\d.]+)[\s,]+(?<green>[\d.]+)[\s,]+(?<blue>[\d.]+)/u.exec(
      color,
    )

  if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])]

  // color(srgb r g b), components in [0, 1]
  const srgb =
    /color\(\s*srgb\s+(?<red>[\d.]+)[\s,]+(?<green>[\d.]+)[\s,]+(?<blue>[\d.]+)/u.exec(
      color,
    )

  if (srgb)
    return [Number(srgb[1]) * 255, Number(srgb[2]) * 255, Number(srgb[3]) * 255]

  // #rgb / #rrggbb
  const hex = /^(?<digits>[\da-f]{3}|[\da-f]{6})$/iu.exec(color)

  if (hex) {
    const [, digits] = hex
    const value =
      digits.length === 3
        ? `${digits[0]}${digits[0]}${digits[1]}${digits[1]}${digits[2]}${digits[2]}`
        : digits

    return [
      Number.parseInt(value.slice(0, 2), 16),
      Number.parseInt(value.slice(2, 4), 16),
      Number.parseInt(value.slice(4, 6), 16),
    ]
  }

  return null
}

/**
 * Parse the alpha channel of a color
 *
 * 将颜色的 alpha 通道解析出来
 *
 * @param color - A color / 颜色
 * @returns The alpha in `[0, 1]`, `1` when there is none / `[0, 1]` 范围内的
 *   alpha，无 alpha 时为 `1`
 */
const parseColorAlpha = (color: string): number => {
  // rgba(r, g, b, a)
  const legacy =
    /rgba\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*,\s*(?<alpha>[\d.]+)\s*\)/u.exec(
      color,
    )

  if (legacy) return Number(legacy[1])

  // rgb(r g b / a)
  const modern = /\/\s*(?<alpha>[\d.]+)\s*\)/u.exec(color)

  if (modern) return Number(modern[1])

  return 1
}

/**
 * Convert an sRGB channel to the linear light intensity
 *
 * 将 sRGB 通道转换为线性光强度
 *
 * @param channel - A channel in `[0, 255]` / `[0, 255]` 范围内的通道
 * @returns The linear intensity / 线性强度
 */
const toLinear = (channel: number): number => {
  const value = channel / 255

  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
}

/**
 * Measure the lightness of a color in `[0, 1]`
 *
 * The relative luminance of the sRGB colors is computed in the gamma space, so
 * that dark colors like `#282c34` are not mistaken for light ones, and the
 * perceptual lightness of the cylindrical color spaces is used directly.
 *
 * 测量颜色在 `[0, 1]` 范围内的明度
 *
 * SRGB 颜色的相对亮度按伽马空间计算，因此 `#282c34` 这类深色不会被误判为浅色； 圆柱色彩空间直接使用其感知明度。
 *
 * @param color - A color / 颜色
 * @returns The lightness, or `null` when the color can not be parsed / 明度，
 *   无法解析时返回 `null`
 */
const getColorLightness = (color: string): number | null => {
  const cylindrical =
    /(?<space>oklab|oklch|lab|lch)\(\s*(?<lightness>[\d.]+)\s*(?<unit>%?)/u.exec(
      color,
    )

  if (cylindrical) {
    const value = Number(cylindrical[2])

    // `ok*` lightness is in [0, 1] unless it is a percentage
    return cylindrical[1].startsWith('ok')
      ? cylindrical[3] === '%'
        ? value / 100
        : value
      : value / 100
  }

  const channels = parseColorChannels(color)

  if (!channels) return null

  const [red, green, blue] = channels

  return (
    0.2126 * toLinear(red) + 0.7152 * toLinear(green) + 0.0722 * toLinear(blue)
  )
}

/**
 * Panel that displays the code blocks of several files with a file tree
 *
 * 配合文件树展示多个文件的代码块的面板
 */
export const VPCodeTree = defineComponent({
  name: 'VPCodeTree',

  props: {
    /**
     * Title of the code tree, displayed above the file tree
     *
     * 代码树的标题，显示在文件树上方
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * Height of the code tree
     *
     * 代码树的高度
     */
    height: {
      type: String,
      default: '',
    },
    /**
     * File opened by default
     *
     * 默认打开的文件
     */
    entry: {
      type: String,
      default: '',
    },
  },

  slots: Object as SlotsType<{
    'default': () => VNode[]
    'file-tree'?: () => VNode[]
  }>,

  setup(props, { slots }) {
    const activeFile = ref(props.entry)
    const root = ref<HTMLDivElement | null>(null)
    const codePanel = ref<HTMLDivElement | null>(null)
    // The file tree is collapsible and collapsed by default on small screens
    const showFileTree = ref(false)

    provide(activeFileKey, activeFile)

    /**
     * Keep the colors of the panel in sync with the code blocks.
     *
     * A code block may get its background from an inline style, as the shiki
     * highlighter does, which the CSS variables of the panel can not see, so
     * the resolved colors are read from a code block and applied to the panel,
     * which the file tree and the title bars follow. The text colors are paired
     * with the sampled background, as the code base text color
     * (`--code-c-text`) does not necessarily match it.
     *
     * 保持面板颜色与代码块同步。
     *
     * 代码块可能像 shiki 高亮器那样从行内样式获取背景，面板的 CSS 变量无从读取，因此从
     * 代码块读取解析后的颜色并应用到面板，文件树与标题栏都会跟随。文字颜色与采样到的背景
     * 配对，因为代码基础文字色（`--code-c-text`）不一定与之相配。
     */
    const syncCodeColors = (): void => {
      const panel = root.value
      const container = codePanel.value

      if (!panel || !container) return

      const removeSampledColors = (): void => {
        for (const name of SAMPLED_COLORS) panel.style.removeProperty(name)
      }

      const block =
        container.querySelector<HTMLElement>(
          '.code-block-with-title.active > [data-highlighter], .code-block-with-title.active > div[class*="language-"]',
        ) ??
        container.querySelector<HTMLElement>(
          '[data-highlighter], div[class*="language-"]',
        )

      if (!block) {
        removeSampledColors()
        return
      }

      const { backgroundColor } = getComputedStyle(block)
      const lightness = getColorLightness(backgroundColor)

      if (parseColorAlpha(backgroundColor) === 0 || lightness == null) {
        // The background is transparent or can not be parsed, fall back to
        // the colors declared in CSS
        removeSampledColors()
        return
      }

      // 0.24 is where the two fallback texts swap the better contrast
      const light = lightness > 0.24
      // The text of the current theme is reused when it already has the
      // opposite lightness of the background, so that custom colors apply
      const themeText = getComputedStyle(document.documentElement)
        .getPropertyValue('--vp-c-text')
        .trim()
      const themeTextLightness =
        themeText === '' ? null : getColorLightness(themeText)
      const text =
        themeTextLightness != null && themeTextLightness > 0.5 !== light
          ? themeText
          : light
            ? LIGHT_TEXT
            : DARK_TEXT

      panel.style.setProperty('--vp-code-tree-c-bg', backgroundColor)
      panel.style.setProperty('--vp-code-tree-c-text', text)
      panel.style.setProperty(
        '--vp-code-tree-c-text-mute',
        light ? 'rgb(0 0 0 / 60%)' : 'rgb(255 255 255 / 60%)',
      )
      panel.style.setProperty(
        '--vp-code-tree-c-border',
        light ? 'rgb(0 0 0 / 15%)' : 'rgb(255 255 255 / 20%)',
      )
      panel.style.setProperty(
        '--vp-code-tree-c-hover-bg',
        light ? 'rgb(0 0 0 / 10%)' : 'rgb(255 255 255 / 12%)',
      )
    }

    // The sampled color is stale after a theme switch: sample again right
    // away, for the sites that do not transition colors, and again when the
    // color transition of the code blocks ends
    const onColorTransition = (event: TransitionEvent): void => {
      if (
        event.propertyName === 'background-color' ||
        event.type === 'transitioncancel'
      )
        syncCodeColors()
    }

    let themeObserver: MutationObserver | null = null

    /**
     * Code blocks are rendered from the markdown content, which is not managed
     * by Vue, so we have to toggle the active state manually.
     *
     * 代码块由 Markdown 内容渲染而来，不受 Vue 管理，因此需要手动切换激活状态。
     */
    const syncActiveFile = (): void => {
      const panel = codePanel.value

      if (!panel) return

      const blocks = [
        ...panel.querySelectorAll<HTMLElement>('.code-block-with-title'),
      ]

      if (blocks.length === 0) return

      const titles = blocks.map(
        (block) =>
          block.querySelector<HTMLElement>('.code-block-title-bar')?.dataset
            .title ?? '',
      )
      // Fallback to the first code block when the entry file is not found
      const index = Math.max(titles.indexOf(activeFile.value), 0)

      if (titles[index] !== activeFile.value) {
        activeFile.value = titles[index]
        return
      }

      blocks.forEach((block, blockIndex) => {
        block.classList.toggle('active', blockIndex === index)
      })
    }

    watch(activeFile, () => {
      syncActiveFile()
      // Collapse the file tree, so that the opened file gets the full width
      showFileTree.value = false
    })

    onMounted(() => {
      syncActiveFile()
      syncCodeColors()

      const panel = root.value

      if (!panel) return

      themeObserver = new MutationObserver(syncCodeColors)
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme', 'class'],
      })
      panel.addEventListener('transitionend', onColorTransition)
      panel.addEventListener('transitioncancel', onColorTransition)
    })

    onUnmounted(() => {
      themeObserver?.disconnect()
      themeObserver = null
      root.value?.removeEventListener('transitionend', onColorTransition)
      root.value?.removeEventListener('transitioncancel', onColorTransition)
    })

    return (): VNode => {
      const fileTree = slots['file-tree']

      return h(
        'div',
        {
          ref: root,
          class: {
            'vp-code-tree': true,
            'no-file-tree': !fileTree,
            'file-tree-expanded': showFileTree.value,
          },
          style: props.height
            ? { '--vp-code-tree-height': props.height }
            : undefined,
        },
        [
          fileTree
            ? h(
                'button',
                {
                  'type': 'button',
                  'class': 'vp-code-tree-toggle',
                  'aria-label': 'Toggle file tree',
                  'aria-expanded': showFileTree.value,
                  'onClick': () => {
                    showFileTree.value = !showFileTree.value
                  },
                },
                [
                  h('span', {
                    class: [
                      'vp-code-tree-toggle-icon',
                      showFileTree.value ? 'collapse' : 'expand',
                    ],
                  }),
                ],
              )
            : null,
          fileTree
            ? h(VPFileTree, { title: props.title }, { default: fileTree })
            : null,
          fileTree
            ? h('div', {
                class: 'vp-code-tree-mask',
                onClick: () => {
                  showFileTree.value = false
                },
              })
            : null,
          h(
            'div',
            { ref: codePanel, class: 'vp-code-tree-code' },
            slots.default?.(),
          ),
        ],
      )
    }
  },
})
