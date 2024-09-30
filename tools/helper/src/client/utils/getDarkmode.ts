/**
 * Get darkmode status from DOM
 *
 * @returns darkmode status
 */
export const getDarkmode = (): boolean =>
  document.documentElement.getAttribute('data-theme') === 'dark'
