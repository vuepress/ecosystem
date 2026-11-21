import { markdownContainerPlugin } from '@vuepress/plugin-markdown-container'
import type {
  MarkdownContainerPluginOptions,
  MarkdownItContainerRenderFunction,
} from '@vuepress/plugin-markdown-container'
import type { Env, MarkdownIt } from 'markdown-it'
import type { App, PluginObject } from 'vuepress/core'

/**
 * Container types rendered with the default renderer of
 * `@vuepress/plugin-markdown-container`
 *
 * 使用 `@vuepress/plugin-markdown-container` 默认渲染函数渲染的容器类型
 */
const defaultContainers = [
  'tip',
  'info',
  'warning',
  'danger',
  'note',
  'important',
  'caution',
] as const

/**
 * Default title of the `details` container, the only container that needs a
 * native `<details>` element
 *
 * `details` 容器的默认标题，它是唯一需要原生 `<details>` 元素的容器
 */
const detailsDefaultTitle = 'Details'

/**
 * Create the renderer of the `details` container, which produces a native
 * `<details>` element with the class names of the plugin default renderer
 *
 * 创建 `details` 容器的渲染函数，它输出带插件默认类名的原生 `<details>` 元素
 *
 * @param md - Markdown-it instance / Markdown-it 实例
 * @returns The renderer of the `details` container / `details` 容器的渲染函数
 */
const createDetailsRenderer =
  (md: MarkdownIt): MarkdownItContainerRenderFunction =>
  (tokens, index, _options, env): string => {
    const token = tokens[index]

    if (token.nesting === -1) return '</details>\n'

    const info = token.info.trim().slice('details'.length).trim()
    // NOTE: `md.renderInline()` calls the wrapped `renderer.render()`, which
    // would re-run the render-time plugins (headers, title) with inline tokens
    // and overwrite the page headers/title. Render the inline tokens directly.
    const title = md.renderer.renderInline(
      md.parseInline((info || detailsDefaultTitle).trim(), env as Env)[0]
        .children ?? [],
      md.options,
      env,
    )

    return `<details class="custom-container details"><summary class="custom-container-title">${title}</summary>\n`
  }

/**
 * Register the markdown containers of the theme, which are powered by
 * `@vuepress/plugin-markdown-container`
 *
 * The standard containers use the plugin default renderer (no `render` option),
 * the `details`, `v-pre` and `raw` containers keep a minimal custom renderer
 * because the plugin default renderer cannot produce their markup
 *
 * 注册主题的 Markdown 容器，由 `@vuepress/plugin-markdown-container` 提供
 *
 * 标准容器使用插件默认渲染函数（不传 `render`），`details`、`v-pre`、`raw`
 * 容器因为插件默认渲染无法输出对应结构而保留极简的自定义渲染函数
 *
 * @param md - Markdown-it instance / Markdown-it 实例
 * @param app - VuePress app, passed to the plugin hook / VuePress 应用，传给插件钩子
 */
export const registerContainers = (md: MarkdownIt, app?: App): void => {
  const register = (options: MarkdownContainerPluginOptions): void => {
    const plugin = markdownContainerPlugin(options) as PluginObject

    void plugin.extendsMarkdown?.(md, app!)
  }

  // standard containers are rendered by the plugin default renderer
  for (const type of defaultContainers) register({ type })

  // `@mdit/plugin-container` always renders a `<div>`, while VitePress renders
  // `details` as a native `<details>` element
  register({ type: 'details', render: createDetailsRenderer(md) })

  register({
    type: 'v-pre',
    render: (tokens, index) =>
      tokens[index].nesting === -1 ? '</div>\n' : '<div v-pre>\n',
  })
  register({
    type: 'raw',
    render: (tokens, index) =>
      tokens[index].nesting === -1 ? '</div>\n' : '<div class="vp-raw">\n',
  })
}
