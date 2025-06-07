/**
 * Call `skipWaiting()` inside current waiting worker
 *
 * 在当前等待中的 Service Worker 中调用 `skipWaiting()`
 *
 * @param registration - The registration of the service worker you want activate / 想要激活的 Service Worker 的注册
 */
export const skipWaiting = (registration: ServiceWorkerRegistration): void => {
  // Get the waiting worker
  const worker = registration.waiting

  // If there is no waiting worker, return directly
  if (!worker) return

  // Post SKIP_WAITING message to the waiting worker
  const channel = new MessageChannel()

  worker.postMessage({ type: 'SKIP_WAITING' }, [channel.port2])
}
