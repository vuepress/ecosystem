import { cheerio } from '@vuepress/helper'
import type { App } from 'vuepress/core'

import { extractIconsFromFields } from './extractIconsFromFields.js'
import { logger } from './utils.js'

/**
 * Component prop that is scanned, e.g. `VPCustom.icon`
 *
 * 需要扫描的组件属性，例如 `VPCustom.icon`
 */
export interface ComponentField {
  /** Component name, e.g. `VPCustom` / 组件名，例如 `VPCustom` */
  component: string
  /** Prop path, e.g. `icon` or `files[*]` / 属性路径，例如 `icon` 或 `files[*]` */
  field: string
}

/**
 * Parse a component field, e.g. `VPCustom.icon` or `VPTest.files[*]`
 *
 * 解析组件属性，例如 `VPCustom.icon` 或 `VPTest.files[*]`
 *
 * @param field - Component field / 组件属性
 * @returns Parsed component and prop path, `null` when it is invalid / 解析出的组件
 *   与属性路径，无效时为 `null`
 */
export const parseComponentField = (field: string): ComponentField | null => {
  const index = field.indexOf('.')

  if (index <= 0 || index === field.length - 1) return null

  return {
    component: field.slice(0, index),
    field: field.slice(index + 1),
  }
}

/**
 * Decode the HTML entities of an attribute value
 *
 * 解码属性值中的 HTML 实体
 *
 * The content is parsed with `decodeEntities: false`, so the entities are kept
 * as they are written.
 *
 * 内容以 `decodeEntities: false` 解析，因此实体保持原样。
 *
 * @param value - Attribute value / 属性值
 * @returns Decoded value / 解码后的值
 */
const decodeEntities = (value: string): string =>
  value
    .replaceAll('&#39;', "'")
    .replaceAll('&apos;', "'")
    .replaceAll('&quot;', '"')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&')

/**
 * Parse the value of a bound prop, e.g. `['mdi:home']`
 *
 * 解析动态绑定属性的值，例如 `['mdi:home']`
 *
 * Only the values that can be parsed as JSON are used, so that an inline array
 * or object can be scanned, while a value that refers to a variable cannot.
 *
 * 只有能解析为 JSON 的值才会被使用，因此可以扫描内联的数组或对象，而引用变量的值无法 解析。
 *
 * @param value - Attribute value / 属性值
 * @returns Parsed value, `undefined` when it cannot be parsed / 解析后的值，无法解析时 为
 *   `undefined`
 */
const parseBoundValue = (value: string): unknown => {
  const decoded = decodeEntities(value)

  try {
    return JSON.parse(decoded)
  } catch {
    // a single quoted value is valid in an expression but not in JSON
  }

  try {
    return JSON.parse(decoded.replaceAll("'", '"'))
  } catch {
    // the value refers to a variable, which cannot be resolved
  }

  return undefined
}

/**
 * Element of a parsed HTML content
 *
 * 解析后的 HTML 内容中的元素
 */
interface HtmlElement {
  /** Node type / 节点类型 */
  type: string
  /** Tag name, lowercased / 标签名，已转为小写 */
  tagName: string
  /** Attributes / 属性 */
  attribs: Record<string, string>
  /** Child nodes / 子节点 */
  children?: HtmlElement[]
}

/**
 * Get the elements of a parsed HTML content
 *
 * 获取解析后的 HTML 内容中的元素
 *
 * The nodes are traversed here instead of using a Cheerio selector, as every
 * attribute of an element is read, which the selector API does not expose.
 *
 * 这里遍历节点而非使用 Cheerio 选择器，因为需要读取元素的全部属性，而选择器 API 不提供 该能力。
 *
 * @param content - HTML content / HTML 内容
 * @returns Elements / 元素
 */
const getElements = (content: string): HtmlElement[] => {
  const elements: HtmlElement[] = []

  const walk = (nodes: unknown[]): void => {
    for (const node of nodes) {
      const element = node as Partial<HtmlElement>

      if (element.type !== 'tag' || !element.tagName) continue

      elements.push(element as HtmlElement)

      if (element.children) walk(element.children)
    }
  }

  walk(cheerio.parseHTML(content))

  return elements
}

/**
 * Get the props of an element
 *
 * 获取元素的属性
 *
 * The static props and the bound props are merged into one object, so that a
 * prop path can be read from it. A bound prop that cannot be parsed as JSON is
 * reported, as its icons cannot be bundled.
 *
 * 静态属性与动态绑定属性会合并为一个对象，以便按属性路径读取。无法解析为 JSON 的绑定 属性会给出警告，因为其图标无法被打包。
 *
 * @param attribs - Attributes of an element / 元素的属性
 * @returns Props and the unresolved bound props / 属性与无法解析的绑定属性
 */
const getElementProps = (
  attribs: Record<string, string>,
): { props: Record<string, unknown>; unresolved: string[] } => {
  const props: Record<string, unknown> = {}
  const unresolved: string[] = []

  for (const [name, value] of Object.entries(attribs)) {
    if (name === 'v-bind') {
      // the whole prop object is spread, so the props cannot be analysed
      unresolved.push(`v-bind="${value}"`)
      continue
    }

    const isBound = name.startsWith(':') || name.startsWith('v-bind:')

    if (!isBound) {
      props[name] = value
      continue
    }

    const propName = name.startsWith(':') ? name.slice(1) : name.slice(7)
    const parsedValue = parseBoundValue(value)

    if (parsedValue === undefined) unresolved.push(`${name}="${value}"`)
    else props[propName] = parsedValue
  }

  return { props, unresolved }
}

/**
 * Get the icons of the component props of a content
 *
 * 获取某个内容中组件属性里的图标
 *
 * @param content - HTML content / HTML 内容
 * @param fields - Component fields / 组件属性
 * @returns Icons in the props and the unresolved bound props / 属性中的图标与无法解析的
 *   绑定属性
 */
const getContentIcons = (
  content: string,
  fields: ComponentField[],
): { icons: string[]; unresolved: string[] } => {
  const elements = getElements(content)
  const icons: string[] = []
  const unresolved: string[] = []

  for (const { component, field } of fields) {
    // the tag names are lowercased when the content is parsed as HTML
    const names = new Set([
      component.toLowerCase(),
      component
        .replaceAll(/\p{Lu}/gu, (char) => `-${char.toLowerCase()}`)
        .replace(/^-/u, ''),
    ])

    for (const element of elements) {
      if (!names.has(element.tagName)) continue

      const { props, unresolved: unresolvedProps } = getElementProps(
        element.attribs,
      )

      icons.push(...extractIconsFromFields(props, [field]))

      for (const prop of unresolvedProps)
        unresolved.push(`<${component} ${prop} />`)
    }
  }

  return { icons, unresolved }
}

/**
 * Get the icons of the component props of the site
 *
 * 获取站点组件属性中的图标
 *
 * The props of a component are read as one object, so the prop path is resolved
 * against it, e.g. `VPCustom.icon` reads the `icon` prop, while
 * `VPTest.files[*]` reads every element of the `files` prop.
 *
 * 组件的属性会作为一个对象读取，属性路径在该对象上解析，例如 `VPCustom.icon` 读取 `icon` 属性，而
 * `VPTest.files[*]` 读取 `files` 属性的每个元素。
 *
 * A prop that is bound with `:prop` or `v-bind` is reported when its value
 * cannot be parsed as JSON, as the icons of the prop cannot be bundled then.
 *
 * 用 `:prop` 或 `v-bind` 绑定的属性在值无法解析为 JSON 时会给出警告，因为此时该属性的 图标无法被打包。
 *
 * @param app - VuePress app / VuePress 应用
 * @param fields - Component fields, e.g. `['VPCustom.icon']` / 组件属性，例如
 *   `['VPCustom.icon']`
 * @returns Icons in the props / 属性中的图标
 */
export const extractIconsFromComponents = (
  app: App,
  fields: ComponentField[],
): string[] => {
  const results = app.pages.flatMap((page) =>
    [page.contentRendered, page.sfcBlocks.template?.content ?? '']
      .filter(Boolean)
      .map((content) => getContentIcons(content, fields)),
  )
  const icons = results.flatMap(({ icons: contentIcons }) => contentIcons)
  const unresolved = new Set(
    results.flatMap(({ unresolved: contentUnresolved }) => contentUnresolved),
  )

  if (unresolved.size > 0) {
    logger.warn(
      `The icons of the following component props cannot be detected, as their value is not a literal, use the \`scan\` option with a custom scanner to add them: ${[
        ...unresolved,
      ].join(', ')}`,
    )
  }

  return icons
}
