/* eslint-disable no-console */
/**
 * Call `unregister()` inside current active worker
 *
 * 在当前激活的 Service Worker 中调用 `unregister()`
 *
 * @returns `true` if unregister success, `false` if unregister failed / `true` 表示注销成功，`false` 表示注销失败
 */
export const unregisterSW = async (): Promise<boolean> => {
  try {
    const registration = await navigator.serviceWorker.getRegistration()
    if (registration) {
      const found = await registration.unregister()
      if (found) console.log('[PWA] Current service worker unregistered')
      return found
    }
  } catch (err: unknown) {
    console.error(
      '[PWA] Unregister current service worker failed with error:',
      err,
    )
  }
  return false
}
