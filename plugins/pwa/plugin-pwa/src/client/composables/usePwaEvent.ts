import type { Emitter } from 'mitt'
import type { InjectionKey } from 'vue'
import { inject } from 'vue'

declare const __VUEPRESS_DEV__: boolean

export type PwaEvent = Emitter<{
  ready: ServiceWorkerRegistration
  registered: ServiceWorkerRegistration
  cached: ServiceWorkerRegistration
  updatefound: ServiceWorkerRegistration
  updated: ServiceWorkerRegistration
  offline: void
  error: Error
}>

export const pwaEventSymbol: InjectionKey<PwaEvent> = Symbol(
  __VUEPRESS_DEV__ ? 'PwaEvent' : '',
)

/**
 * Use PWA event emitter
 *
 * 使用 PWA 事件发射器
 *
 * @returns PWA event emitter / PWA 事件发射器
 */
export const usePwaEvent = (): PwaEvent => {
  const pwaEvent = inject(pwaEventSymbol)

  if (!pwaEvent) throw new Error('usePwaEvent() is called without provider.')

  return pwaEvent
}
