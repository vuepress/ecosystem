import { markdownContainerPlugin } from '@vuepress/plugin-markdown-container'
import type {
  MarkdownContainerPluginOptions,
  MarkdownItContainerRenderFunction,
} from '@vuepress/plugin-markdown-container'
import type { MarkdownIt } from 'markdown-it'
import type { App, PluginObject } from 'vuepress/core'

/**
 * Create the renderer of a container that only wraps its content in a `<div>`
 * carrying the given opening tag
 *
 * 创建只把内容包进带指定开始标签的 `<div>` 的容器渲染函数
 *
 * @param openTag - Opening tag of the wrapper / 包裹元素的开始标签
 * @returns The renderer of the container / 容器渲染函数
 */
const createWrapperRenderer =
  (openTag: string): MarkdownItContainerRenderFunction =>
  (tokens, index): string =>
    tokens[index].nesting === -1 ? '</div>\n' : `${openTag}\n`

/**
 * Register the VitePress markdown extensions that are not covered by
 * `@vuepress/plugin-markdown-hint` and only need a plain wrapper element
 *
 * 注册 `@vuepress/plugin-markdown-hint` 未覆盖、且只需要普通包裹元素的 VitePress Markdown 扩展
 *
 * The standard hint containers (`tip`, `warning`, `details`, ...) are rendered
 * and styled by `@vuepress/plugin-markdown-hint`, the theme only overrides its
 * CSS variables.
 *
 * 标准提示容器（`tip`、`warning`、`details` 等）由 `@vuepress/plugin-markdown-hint`
 * 渲染并自带样式，主题只覆盖它的 CSS 变量。
 *
 * @param md - MarkdownIt instance / MarkdownIt 实例
 * @param app - VuePress app, passed to the plugin hook / VuePress 应用，传给插件钩子
 */
export const registerExtraContainers = (md: MarkdownIt, app?: App): void => {
  const containers: MarkdownContainerPluginOptions[] = [
    // `<div v-pre>` disables Vue interpolation of the content
    {
      type: 'v-pre',
      render: createWrapperRenderer('<div v-pre>'),
    },
    // `<div class="vp-raw">` renders the content without the theme typography
    {
      type: 'raw',
      render: createWrapperRenderer('<div class="vp-raw">'),
    },
  ]

  for (const options of containers) {
    const plugin = markdownContainerPlugin(options) as PluginObject

    void plugin.extendsMarkdown?.(md, app!)
  }
}
