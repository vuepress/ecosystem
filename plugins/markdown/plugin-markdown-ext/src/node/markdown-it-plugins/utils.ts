/**
 * Stringify prop data for Vue components
 *
 * 为 Vue 组件字符化属性数据
 *
 * @description Single quote will break `@vue/compiler-sfc`
 *
 * 单引号会破坏 `@vue/compiler-sfc`
 *
 * @param data - Data to stringify / 要字符化的数据
 * @returns Stringified data / 字符化后的数据
 */
// Single quote will break @vue/compiler-sfc
export const stringifyProp = (data: unknown): string =>
  JSON.stringify(data).replaceAll("'", '&#39')
