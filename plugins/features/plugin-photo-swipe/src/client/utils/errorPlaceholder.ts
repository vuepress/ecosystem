import type { SlideData } from 'photoswipe'

/**
 * Escape a text into HTML entities
 *
 * PhotoSwipe renders the error message with `innerText`, so the message must
 * never be treated as markup.
 *
 * 将文本转义为 HTML 实体
 *
 * PhotoSwipe 使用 `innerText` 渲染错误提示，因此提示文字不应被当作标签解析。
 *
 * @param text - Raw text / 原始文本
 * @returns Escaped text / 转义后的文本
 */
const escapeHtml = (text: string): string =>
  text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

/**
 * Create the slide data of the placeholder shown when an image fails to load
 *
 * The placeholder reuses the error markup and the `errorMsg` option of
 * PhotoSwipe, so it looks like the built-in error state.
 *
 * 创建图片加载失败时展示的占位幻灯片数据
 *
 * 占位内容复用 PhotoSwipe 的错误结构与 `errorMsg` 选项，与内置错误状态保持一致。
 *
 * @param errorMsg - Error message, usually `photoSwipe.options.errorMsg` /
 *   错误提示文字，通常取自 `photoSwipe.options.errorMsg`
 * @returns Slide data of the error placeholder / 错误占位的幻灯片数据
 */
export const createErrorPlaceholder = (errorMsg = ''): SlideData => ({
  type: 'html',
  html: `<div class="photo-swipe-error"><div class="pswp__error-msg">${escapeHtml(errorMsg)}</div></div>`,
})
