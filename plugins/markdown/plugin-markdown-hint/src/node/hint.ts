import type { PluginWithOptions } from '@mdit/helper'
import { container } from '@mdit/plugin-container'
import type { ExactLocaleConfig } from '@vuepress/helper'
import { ensureLeadingSlash } from '@vuepress/helper'
import type { Token } from 'markdown-it'
import type { MarkdownEnv } from 'vuepress/markdown'
import { resolveLocalePath } from 'vuepress/shared'

import { cleanMarkdownEnv } from './cleanMarkdownEnv.js'
import type { MarkdownHintPluginLocaleData } from './options.js'

export type MarkdownItHintOptions =
  ExactLocaleConfig<MarkdownHintPluginLocaleData>

export type MarkdownHintContainerName = keyof MarkdownHintPluginLocaleData

const CONTAINERS: MarkdownHintContainerName[] = [
  'info',
  'note',
  'tip',
  'warning',
  'caution',
  'important',
]

const NO_TITLE_MARKER = '{no-title}'
const NO_TITLE_ATTRIBUTE = 'no-title'

/**
 * Resolve the default title text of a container from the locale config
 *
 * 从语言配置中解析容器的默认标题文本
 *
 * @param options - Locale config / 语言配置
 * @param env - Markdown env / Markdown 环境变量
 * @param name - Container name / 容器名称
 * @returns The default title text / 默认标题文本
 */
const resolveLocaleText = (
  options: MarkdownItHintOptions,
  env: MarkdownEnv,
  name: MarkdownHintContainerName,
): string | undefined => {
  const relativePath = ensureLeadingSlash(env.filePathRelative ?? '')
  const localePath = resolveLocalePath(options, relativePath)

  return options[localePath]?.[name]
}

/**
 * Check whether a container token requests no title
 *
 * The marker is either kept at the end of the info string, or parsed as a
 * `no-title` token attribute by `@mdit/plugin-attrs`, which is registered by
 * plugins such as `@vuepress/plugin-markdown-stylize`.
 *
 * 检查容器 token 是否要求不显示标题
 *
 * 标记可以写在信息字符串末尾，也可以由 `@mdit/plugin-attrs` 解析为 `no-title` 属性， 该插件的注册方例如
 * `@vuepress/plugin-markdown-stylize`。
 *
 * @param token - Container token / 容器 token
 * @returns Whether the title should be omitted / 是否省略标题
 */
const hasNoTitle = (token: Token): boolean =>
  (token.attrs?.some(
    ([attrName, attrValue]) =>
      attrName === NO_TITLE_ATTRIBUTE &&
      (attrValue === '' || attrValue === 'true'),
  ) ??
    false) ||
  token.info.trim().endsWith(NO_TITLE_MARKER)

/**
 * Resolve the info string of a container
 *
 * The `{no-title}` marker is removed from the info string, and reported
 * separately so the renderer can omit the title.
 *
 * 解析容器的信息字符串
 *
 * 信息字符串中的 `{no-title}` 标记会被移除，并单独返回，以便渲染器省略标题。
 *
 * @param token - Container token / 容器 token
 * @param name - Container name / 容器名称
 * @returns The resolved info and whether the title should be omitted /
 *   解析后的信息以及是否省略标题
 */
const resolveInfo = (
  token: Token,
  name: string,
): { info: string; noTitle: boolean } => {
  let info = token.info.trim().slice(name.length).trim()
  const noTitle = hasNoTitle(token)

  if (noTitle && info.endsWith(NO_TITLE_MARKER))
    info = info.slice(0, -NO_TITLE_MARKER.length).trim()

  return { info, noTitle }
}

/**
 * Hint container markdown-it plugin
 *
 * 提示容器 markdown-it 插件
 *
 * @param md - MarkdownIt instance / MarkdownIt 实例
 * @param options - Plugin options / 插件选项
 */
export const hint: PluginWithOptions<MarkdownItHintOptions> = (
  md,
  options = {},
) => {
  CONTAINERS.forEach((name) => {
    md.use(container, {
      name,
      openRenderer: (tokens, index, _options, env: MarkdownEnv = {}) => {
        const token = tokens[index]

        const { info, noTitle } = resolveInfo(token, name)

        if (noTitle) return `<div class="hint-container ${name} no-title">\n`

        const title = info
          ? md.renderInline(info, cleanMarkdownEnv(env))
          : resolveLocaleText(options, env, name) || name

        return `<div class="hint-container ${name}">\n<p class="hint-container-title">${title}</p>\n`
      },
      closeRenderer: () => '</div>\n',
    })
  })

  // Compatible with @vuepress/theme-default
  md.use(container, {
    name: 'danger',
    openRenderer: (tokens, index, _options, env: MarkdownEnv = {}) => {
      const token = tokens[index]

      const { info, noTitle } = resolveInfo(token, 'danger')

      if (noTitle) return '<div class="hint-container caution no-title">\n'

      const title = info
        ? md.renderInline(info, cleanMarkdownEnv(env))
        : resolveLocaleText(options, env, 'caution') || 'caution'

      return `<div class="hint-container caution">\n<p class="hint-container-title">${title}</p>\n`
    },
    closeRenderer: () => '</div>\n',
  })

  md.use(container, {
    name: 'details',
    openRenderer: (tokens, index, _options, env: MarkdownEnv = {}) => {
      const token = tokens[index]

      // `details` always needs a summary, so `{no-title}` is ignored here
      const { info } = resolveInfo(token, 'details')

      const title = info
        ? md.renderInline(info, cleanMarkdownEnv(env))
        : resolveLocaleText(options, env, 'details') || 'Details'

      return `<details class="hint-container details"><summary>${title}</summary>\n`
    },
    closeRenderer: () => '</details>\n',
  })
}
