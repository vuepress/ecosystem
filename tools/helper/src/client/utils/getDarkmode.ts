export const getDarkmode = (): boolean =>
  document.documentElement.getAttribute('data-theme') === 'dark'
