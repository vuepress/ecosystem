/**
 * Get DOM element by selector
 *
 * 通过选择器获取 DOM 元素
 *
 * @example
 *   import { getElement } from '@vuepress/plugin-rtl/client'
 *
 *   const htmlElement = getElement('html')
 *   const bodyElement = getElement('body')
 *   const customElement = getElement('.my-class')
 *
 * @param selector - CSS selector
 * @returns The DOM element or null if not found
 */
export const getElement = (selector: string): HTMLElement | null =>
  selector === 'html'
    ? document.documentElement
    : selector === 'body'
      ? document.body
      : document.querySelector(selector)
