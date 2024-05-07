import { wait } from '@vuepress/helper/client'
import { computed, nextTick, onMounted, toValue, watch } from 'vue'
import type { MaybeRef, Ref } from 'vue'
import { useRoutePath, useSiteLocaleData, withBase } from 'vuepress/client'
import { Watermark } from 'watermark-js-plus'
import type { WatermarkOptions } from '../helper/index.js'

export const setupWatermark = (
  options: MaybeRef<WatermarkOptions>,
  enabled: Ref<boolean>,
  delay = 500,
): void => {
  const routePath = useRoutePath()
  const siteData = useSiteLocaleData()

  const watermarkOptions = computed(() => {
    return {
      globalAlpha: 0.165,
      fontColor: '#76747f',
      content: siteData.value.title,
      ...toValue(options),
    }
  })

  onMounted(() => {
    const watermark = new Watermark()

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

      if (toValue(enabled)) {
        watermark?.changeOptions(options, 'overwrite', true)
      }
    }

    watch(
      [enabled, routePath],
      () =>
        nextTick(() => {
          if (enabled.value) {
            wait(delay).then(() => updateWaterMark(toValue(watermarkOptions)))
          } else {
            watermark?.destroy()
          }
        }),
      { immediate: true },
    )

    watch(watermarkOptions, updateWaterMark)
  })
}
