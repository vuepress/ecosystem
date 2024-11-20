export const getElement = (selector: string): HTMLElement | null =>
  selector === 'html'
    ? document.documentElement
    : selector === 'body'
      ? document.body
      : document.querySelector(selector)
