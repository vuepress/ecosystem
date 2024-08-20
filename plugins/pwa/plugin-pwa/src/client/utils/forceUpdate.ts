/**
 * Force update page content
 *
 * 强制更新页面内容
 */
export const forceUpdate = (): void => {
  void navigator.serviceWorker.getRegistration().then((registration) => {
    // Check whether a valid service worker is active
    if (registration?.active)
      registration.addEventListener('updatefound', () => {
        // force refresh
        // @ts-expect-error: A non-standard API
        window.location.reload(true)
      })
  })
}
