/**
 * Get darkmode status from DOM
 *
 * 从 DOM 获取暗色模式状态
 *
 * @returns Darkmode status / 暗色模式状态
 */
export const getDarkMode = (): boolean =>
  document.documentElement.getAttribute('data-theme') === 'dark'
