import { wait } from '@vuepress/helper/client'
import {
  getCurrentInstance,
  isRef,
  nextTick,
  onMounted,
  toValue,
  watch,
} from 'vue'
import type { MaybeRef, Ref } from 'vue'
import { withBase } from 'vuepress/client'
import { Watermark } from 'watermark-js-plus'
import type { WatermarkOptions } from '../helper/index.js'

export const setupWatermark = (
  options: MaybeRef<WatermarkOptions>,
  enabled: Ref<boolean>,
  delay = 500,
): void => {
  onMounted(() => {
    const appContainer: Element | null =
      getCurrentInstance()?.appContext.app._container
    const watermark = new Watermark()

    const isInsideApp = (target?: string | Element): boolean => {
      const el =
        typeof target === 'string' ? document.querySelector(target) : target

      return Boolean(el && appContainer?.contains(el))
    }

    const updateWaterMark = (
      // shadow clone options object so that we can modify later
      { ...options }: WatermarkOptions,
    ): void => {
      // Blind mode default alpha is 0.005
      if (options.mode === 'blind' && !options.globalAlpha) {
        options.globalAlpha = 0.005
      }

      if (options.image?.startsWith('/')) {
        options.image = withBase(options.image)
      }

      if (toValue(enabled))
        nextTick(() => watermark.changeOptions(options, 'overwrite'))
      else watermark.changeOptions(options, 'overwrite', false)
    }

    if (isRef(options)) watch(options, updateWaterMark, { immediate: true })
    else updateWaterMark(options)

    watch(enabled, () =>
      nextTick(() => {
        if (enabled.value) {
          if (isInsideApp(toValue(options).parent)) {
            wait(delay).then(() => {
              watermark.create()
            })
          } else {
            watermark.create()
          }
        } else {
          watermark.destroy()
        }
      }),
    )
  })
}
