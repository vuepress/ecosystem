const POLL_INTERVAL = 16

/**
 * Programmatically open the docsearch modal
 */
export const pollToOpenDocSearch = (): void => {
  if (document.querySelector('.DocSearch-Modal')) return
  const e = new Event('keydown') as {
    -readonly [P in keyof KeyboardEvent]: KeyboardEvent[P]
  }
  e.key = 'k'
  e.metaKey = true
  window.dispatchEvent(e)
  setTimeout(pollToOpenDocSearch, POLL_INTERVAL)
}
