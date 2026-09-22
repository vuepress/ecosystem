import { cheerio } from '@vuepress/helper'
import type { App } from 'vuepress/core'

/**
 * Get the selector of the elements that hold an icon
 *
 * 获取包含图标的元素的选择器
 *
 * The tag names are lowercased when the content is parsed as HTML, and the
 * kebab-case form is resolved by Vue as well.
 *
 * 内容按 HTML 解析时标签名会转为小写，且 Vue 也能解析短横线形式。
 *
 * @param component - Name of the icon component / 图标组件的名称
 * @returns CSS selector / CSS 选择器
 */
const getIconSelector = (component: string): string =>
  [
    component.toLowerCase(),
    component
      .replaceAll(/\p{Lu}/gu, (char) => `-${char.toLowerCase()}`)
      .replace(/^-/u, ''),
  ]
    .map((name) => `${name}[icon]`)
    .join(', ')

/**
 * Get the icons used by the site
 *
 * 获取站点使用的图标
 *
 * Icons are searched in the rendered content and in the `<template>` block of
 * markdown, both of which hold the `icon` prop of the icon component, either
 * from the icon syntax or from the component being used directly.
 *
 * 图标会在渲染后的内容与 Markdown 的 `<template>` 块中搜索，两者都包含图标组件的 `icon`
 * 属性，它可能来自图标语法，也可能来自直接使用的组件。
 *
 * The content is parsed as HTML, so that the icons in the HTML comments are not
 * collected, and the attributes are read as they are, no matter how they are
 * quoted or wrapped.
 *
 * 内容会按 HTML 解析，因此 HTML 注释中的图标不会被采集，属性也按原样读取，与引号形式 或换行无关。
 *
 * @param app - VuePress app / VuePress 应用
 * @param component - Name of the icon component, `'VPIcon'` by default /
 *   图标组件的名称，默认为 `'VPIcon'`
 * @returns Icons in use / 使用中的图标
 */
export const getUsedIcons = (app: App, component = 'VPIcon'): string[] => {
  const selector = getIconSelector(component)
  const icons = new Set<string>()

  for (const page of app.pages) {
    for (const content of [
      page.contentRendered,
      page.sfcBlocks.template?.content ?? '',
    ]) {
      if (!content) continue

      const $icons = cheerio(cheerio.parseHTML(content))
        // oxlint-disable-next-line unicorn/no-array-callback-reference -- cheerio takes a selector, not a callback
        .find(selector)
        .addBack(selector)

      $icons.each((index) => {
        const icon = $icons.eq(index).attr('icon')

        if (icon) icons.add(icon)
      })
    }
  }

  return [...icons]
}
