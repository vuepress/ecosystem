import type { App } from 'vuepress/core'

/**
 * Escape a string for being used in a regular expression
 *
 * 转义字符串以用于正则表达式
 *
 * @param value - String to escape / 需要转义的字符串
 * @returns Escaped string / 转义后的字符串
 */
const escapeRegExp = (value: string): string =>
  value.replaceAll(/[$()*+.?[\\\]^{|}-]/gu, String.raw`\$&`)

/**
 * Get the FontAwesome icons used by the site
 *
 * 获取站点使用的 FontAwesome 图标
 *
 * Icons are searched in the rendered content and in the `<template>` block of
 * markdown, both of which hold the `icon` prop of the icon component, either
 * from the icon syntax or from the component being used directly.
 *
 * 图标会在渲染后的内容与 Markdown 的 `<template>` 块中搜索，两者都包含图标组件的 `icon`
 * 属性，它可能来自图标语法，也可能来自直接使用的组件。
 *
 * @default 'VPIcon'
 * @param app - VuePress app / VuePress 应用
 * @param component - Name of the icon component / 图标组件的名称
 * @returns Icons in use / 使用中的图标
 */
export const getUsedFontAwesomeIcons = (
  app: App,
  component = 'VPIcon',
): string[] => {
  const iconRegExp = new RegExp(
    `<${escapeRegExp(component)}\\b[^>]*?\\sicon\\s*=\\s*(?:"([^"]*)"|'([^']*)')`,
    'gsu',
  )
  const icons = new Set<string>()

  for (const page of app.pages) {
    for (const content of [
      page.contentRendered,
      page.sfcBlocks.template?.content ?? '',
    ]) {
      for (const [, doubleQuoted, singleQuoted] of content.matchAll(
        iconRegExp,
      )) {
        const icon = doubleQuoted || singleQuoted

        if (icon) icons.add(icon)
      }
    }
  }

  return [...icons]
}
