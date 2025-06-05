import { isFunction, isPlainObject } from '@vuepress/helper/client'
import { watchImmediate } from '@vueuse/core'
import type {
  App,
  ComputedRef,
  InjectionKey,
  MaybeRef,
  MaybeRefOrGetter,
  Ref,
} from 'vue'
import { computed, inject, isRef, ref, toValue } from 'vue'
import { useFrontmatter } from 'vuepress/client'
import type { WatermarkOptions as WatermarkRawOptions } from 'watermark-js-plus'
import type { WatermarkPluginFrontmatter } from '../../shared/index.js'

export type WatermarkOptions = Partial<WatermarkRawOptions>

const watermarkSymbol: InjectionKey<Ref<WatermarkOptions>> = Symbol(
  __VUEPRESS_DEV__ ? 'watermark' : '',
)

const watermarkOptions = ref<WatermarkOptions>({})

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
 * @param userConfig - Watermark options / 水印选项
 *
 * @example
 * ```ts
 * import { useDarkMode } from '@vuepress/helper/client'
 * import { computed } from 'vue'
 *
 * const isDark = useDarkMode()
 *
 * const watermarkConfig = computed(() => ({
 *   fontColor: isDark.value ? '#fff' : '#000',
 *   onSuccess: () => {
 *     console.log('success')
 *   },
 * }))
 *
 * defineWatermarkConfig(watermarkConfig)
 * ```
 */
export const defineWatermarkConfig = (
  userConfig: MaybeRefOrGetter<WatermarkOptions>,
): void => {
  if (isRef(userConfig)) {
    watchImmediate(userConfig, (value) => {
      watermarkOptions.value = value
    })
  } else if (isFunction(userConfig)) {
    watchImmediate(computed(userConfig), (value) => {
      watermarkOptions.value = value
    })
  } else {
    watermarkOptions.value = userConfig
  }
}

/**
 * Get watermark options from multiple sources
 *
 * 从多个来源获取水印选项
 *
 * @param options - Base watermark options / 基础水印选项
 *
 * @returns Computed watermark options / 计算后的水印选项
 */
export const useWatermarkOptions = (
  options: MaybeRef<WatermarkOptions>,
): ComputedRef<WatermarkOptions> => {
  const globalOptions = inject(watermarkSymbol)!
  const frontmatter = useFrontmatter<WatermarkPluginFrontmatter>()

  return computed(() => {
    const { watermark } = frontmatter.value

    return {
      ...toValue(options),
      ...globalOptions.value,
      ...(isPlainObject(watermark) ? watermark : {}),
    }
  })
}

/**
 * Inject watermark configuration into Vue application
 *
 * 向 Vue 应用注入水印配置
 *
 * @param app - Vue application instance / Vue 应用实例
 */
export const injectWatermarkConfig = (app: App): void => {
  app.provide(watermarkSymbol, watermarkOptions)
}
