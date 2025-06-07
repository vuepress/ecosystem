/* eslint-disable no-console */
/**
 * Call `unregister()` inside current active worker
 *
 * 在当前激活的 Service Worker 中调用 `unregister()`
 *
 * @returns `true` if unregister success, `false` if unregister failed / `true` 表示注销成功，`false` 表示注销失败
 */
export const unregisterSW = (): Promise<boolean> =>
  navigator.serviceWorker
    .getRegistration()
    .then((registration) => {
      if (registration)
        return registration.unregister().then((found) => {
          if (found) console.log('[PWA] Current service worker unregistered')

          return found
        })

      return false
    })
    .catch((error: unknown) => {
      console.log(
        '[PWA] Unregister current service worker failed with error:',
        error,
      )

      return false
    })
