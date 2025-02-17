/**
 * Get darkmode status from DOM
 *
 * @returns darkmode status
 */
export const getDarkMode = (): boolean =>
  document.documentElement.getAttribute('data-theme') === 'dark'
