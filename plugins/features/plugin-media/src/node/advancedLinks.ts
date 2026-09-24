import { escapeHtml } from '@mdit/helper'
import { advancedLinks } from '@mdit/plugin-advanced-links'
import type { AdvancedLinkProps } from '@mdit/plugin-advanced-links'
import type { Markdown } from 'vuepress/markdown'

import { COMPONENT_LINK_NAMES, COMPONENT_LINK_PROPS } from './constants.js'

/** Pattern of a prop name that is passed to the component */
const PROP_NAME_PATTERN = /^[a-zA-Z][\w-]*$/u

const BILI_BILI_ID_PATTERN = /^BV[0-9A-Za-z]+$/u
const BILI_BILI_URL_PATTERN = /bilibili\.com\/video\/(?<id>BV[0-9A-Za-z]+)/iu
const NUMBER_PATTERN = /^\d+(?:\.\d+)?$/u

/**
 * Get the props of a BiliBili video from a link
 *
 * 从链接中获取 B 站视频的属性
 *
 * The link is either a video id or a BiliBili URL, whose `p` and `t` parameters
 * become the `page` and `time` props.
 *
 * 链接可以是视频 ID 或 B 站链接，链接中的 `p` 与 `t` 参数会成为 `page` 与 `time` 属性。
 *
 * @param link - Link of the syntax / 语法中的链接
 * @returns Props of the video / 视频的属性
 */
const getBiliBiliProps = (link: string): Record<string, string> => {
  const id = BILI_BILI_ID_PATTERN.test(link)
    ? link
    : BILI_BILI_URL_PATTERN.exec(link)?.groups?.id

  if (!id) return { bvid: link }

  const props: Record<string, string> = { bvid: id }
  const params = new URLSearchParams(link.split('#')[0].split('?')[1] ?? '')
  const page = params.get('p')
  const time = params.get('t')

  if (page && NUMBER_PATTERN.test(page)) props.page = page
  if (time && NUMBER_PATTERN.test(time)) props.time = time

  return props
}

/**
 * Create the renderer of a component
 *
 * 创建组件的渲染器
 *
 * The link becomes the source of the component, and the props are passed as
 * attributes, so an option taking an object or a function cannot be given.
 *
 * 链接会成为组件的资源地址，属性则作为 HTML 属性传入，因此无法传入对象或函数类型的选项。
 *
 * @param component - Name of the component / 组件名称
 * @returns Renderer of the link syntax / 链接语法的渲染器
 */
const createRenderer =
  (component: string) =>
  (link: string, props: AdvancedLinkProps): string => {
    const linkProp = COMPONENT_LINK_PROPS[component] ?? 'src'
    const attributes: Record<string, string | true> =
      component === 'BiliBiliEmbed'
        ? getBiliBiliProps(link)
        : { [linkProp]: link }

    for (const [key, value] of Object.entries(props)) {
      // The link is the source of the component, so it cannot be overridden
      if (key === linkProp || !PROP_NAME_PATTERN.test(key)) continue

      attributes[key] = value
    }

    return `<${component}${Object.entries(attributes)
      .map(([key, value]) =>
        value === true ? ` ${key}` : ` ${key}="${escapeHtml(value)}"`,
      )
      .join('')} />`
  }

/**
 * Register the link syntax of the enabled components
 *
 * 注册已启用组件的链接语法
 *
 * The syntax is `@[name ...props](link)`, where the link is the source of the
 * component, e.g. `@[youtube title="A video"](https://youtu.be/dQw4w9WgXcQ)`.
 *
 * 语法为 `@[name ...props](link)`，其中链接是组件的资源地址，例如 `@[youtube title="A
 * video"](https://youtu.be/dQw4w9WgXcQ)`。
 *
 * @param md - MarkdownIt instance / MarkdownIt 实例
 * @param components - Names of the enabled components / 启用组件的名称
 */
export const registerAdvancedLinks = (
  md: Markdown,
  components: string[],
): void => {
  for (const component of components) {
    md.use(advancedLinks, {
      name: COMPONENT_LINK_NAMES[component],
      renderer: createRenderer(component),
    })
  }
}
