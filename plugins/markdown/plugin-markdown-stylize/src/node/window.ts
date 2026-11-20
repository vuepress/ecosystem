import { escapeHtml } from '@mdit/helper'
import type { PluginWithOptions } from '@mdit/helper'
import { container } from '@mdit/plugin-container'
import type { RendererRule, Token } from 'markdown-it'

import type { MarkdownStylizeWindowStyle } from './options.js'

const WINDOW_NAME = 'window'

const ATTR_RE =
  /(?:^|\s+)(?<name>[\w-]+)(?:=(?<quote>['"])(?<quoted>.*?)\k<quote>|=(?<bare>\S+))?(?=\s|$)/u

const LENGTH_RE =
  /^(?<value>\d+(?:\.\d+)?)(?<unit>px|em|rem|%|vh|vw|vmin|vmax)?$/u

const STYLES: MarkdownStylizeWindowStyle[] = ['mac', 'windows']

export interface MarkdownItWindowOptions {
  /**
   * Default window style
   *
   * 默认窗口样式
   *
   * @default 'mac'
   */
  style?: MarkdownStylizeWindowStyle
}

/**
 * Parse attributes from the container info string
 *
 * 从容器信息字符串中解析属性
 *
 * @param info - Container info / 容器信息
 * @returns Parsed attributes / 解析后的属性
 */
const parseAttrs = (info: string): Map<string, string | true> => {
  const attrs = new Map<string, string | true>()

  let rest = info.trim()
  let match = ATTR_RE.exec(rest)

  while (match) {
    const { name, quoted, bare } = match.groups ?? {}

    if (name) attrs.set(name, quoted ?? bare ?? true)

    rest = rest.slice(match.index + match[0].length)
    match = ATTR_RE.exec(rest)
  }

  return attrs
}

/**
 * Resolve a CSS length value, defaulting to `px` when the unit is omitted
 *
 * 解析 CSS 长度值，省略单位时默认为 `px`
 *
 * @param value - Raw length value / 原始长度值
 * @returns Resolved CSS length, or an empty string when invalid / 解析后的 CSS
 *   长度，无效时为空字符串
 */
const resolveLength = (value: string | true | undefined): string => {
  if (typeof value !== 'string') return ''

  const { value: number, unit } = LENGTH_RE.exec(value.trim())?.groups ?? {}

  return number ? `${number}${unit ?? 'px'}` : ''
}

/**
 * Render window controls, ordered as macOS or Windows
 *
 * 渲染窗口控制按钮，按 macOS 或 Windows 顺序排列
 *
 * @param style - Window style / 窗口样式
 * @returns Controls HTML / 控制按钮 HTML
 */
const renderControls = (style: MarkdownStylizeWindowStyle): string => {
  const controls =
    style === 'mac'
      ? ['close', 'minimize', 'maximize']
      : ['minimize', 'maximize', 'close']

  return controls
    .map((control) => `<i class="vp-window-control-${control}"></i>`)
    .join('')
}

/**
 * Create the window container open renderer
 *
 * 创建窗口容器的开始标签渲染器
 *
 * @param options - Window options / 窗口选项
 * @returns Open renderer / 开始标签渲染器
 */
const createOpenRenderer =
  (options: MarkdownItWindowOptions): RendererRule =>
  (tokens: Token[], index: number): string => {
    const token = tokens[index]
    const attrs = parseAttrs(token.info.trim().slice(WINDOW_NAME.length).trim())
    const style =
      STYLES.find((item) => attrs.has(item)) ?? options.style ?? 'mac'

    const title = attrs.get('title')
    const height = resolveLength(attrs.get('height'))
    const padding = attrs.has('no-padding')
      ? '0'
      : resolveLength(attrs.get('padding'))

    const contentStyle = [
      height ? `--vp-window-height:${height}` : '',
      padding ? `--vp-window-padding:${padding}` : '',
    ]
      .filter(Boolean)
      .join(';')

    return `\
<div class="vp-window vp-window-${style}">
<div class="vp-window-header">
<span class="vp-window-controls" aria-hidden="true">${renderControls(style)}</span>${
      typeof title === 'string' && title
        ? `\n<span class="vp-window-title">${escapeHtml(title)}</span>`
        : ''
    }
<span class="vp-window-spacer" aria-hidden="true"></span>
</div>
<div class="vp-window-content"${contentStyle ? ` style="${contentStyle}"` : ''}>
`
  }

const closeRenderer: RendererRule = () => '</div>\n</div>\n'

export const window: PluginWithOptions<MarkdownItWindowOptions> = (
  md,
  options = {},
) => {
  md.use(container, {
    name: WINDOW_NAME,
    openRenderer: createOpenRenderer(options),
    closeRenderer,
  })
}
