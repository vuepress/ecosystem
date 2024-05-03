import { isFunction } from '@vuepress/helper/client'
import { isRef, ref, watch } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { WatermarkRawOptions } from '../../shared/options.js'

export const userOptions = ref<WatermarkRawOptions>({})

/**
 * Define additional watermark configurations in the client-side.
 *
 * In most cases, the majority of options should be defined in Node,
 * but there are some special situations. For example,
 * it may be necessary to control different watermark opacities, font colors,
 * etc., in dark/light mode, or to pass in callbacks such as `onSuccess`, `extraDrawFunc`, and so on.
 *
 * 在客户端中定义额外的水印配置。
 *
 * 通常来说，大部分选项应该在 Node 中定义，但存在一些特殊情况。
 * 比如需要在 深色/浅色 模式下控制不同的 水印 透明度、字体颜色等，
 * 或者需要传入如 `onSuccess`、`extraDrawFunc` 等回调函数。
 *
 * @example
 * ```ts
 * import { computed } from 'vue'
 *
 * const isDark = useDarkMode()
 * defineWatermarkConfig(computed(() => {
 *  return {
 *    fontColor: isDark.value ? '#fff' : '#000',
 *    onSuccess: () => { console.log('success') },
 *  }
 * }))
 * ```
 *
 * @param userConfig Watermark options
 *
 */
export function defineWatermarkConfig(
  userConfig: MaybeRefOrGetter<WatermarkRawOptions>,
): void {
  if (isRef(userConfig)) {
    watch(
      userConfig,
      (value) => {
        userOptions.value = value
      },
      { immediate: true },
    )
  } else if (isFunction(userConfig)) {
    watch(userConfig, (value) => {
      userOptions.value = value
    })
  } else {
    userOptions.value = userConfig
  }
}
