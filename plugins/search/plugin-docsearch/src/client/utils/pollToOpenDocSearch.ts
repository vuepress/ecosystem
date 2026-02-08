const POLL_INTERVAL = 16

/**
 * Programmatically open the docsearch modal
 */
export const pollToOpenDocSearch = (): void => {
  if (document.querySelector('.DocSearch-Modal')) return
  const event = new Event('keydown') as {
    -readonly [Key in keyof KeyboardEvent]: KeyboardEvent[Key]
  }
  event.key = 'k'
  event.metaKey = true
  window.dispatchEvent(event)
  setTimeout(pollToOpenDocSearch, POLL_INTERVAL)
}
