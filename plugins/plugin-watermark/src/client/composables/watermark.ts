import { isFunction, isLinkHttp, wait } from '@vuepress/helper/client'
import { computed, isRef, nextTick, ref, toValue, watch } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import { usePageFrontmatter, useRoutePath, withBase } from 'vuepress/client'
// https://github.com/zhensherlock/watermark-js-plus/issues/579
import { Watermark } from 'watermark-js-plus/dist/index.esm.js'
import type {
  WatermarkOptions,
  WatermarkPluginOptions,
} from '../../shared/index.js'

declare const __VUEPRESS_PLUGIN_WATERMARK_OPTIONS__: Omit<
  WatermarkPluginOptions,
  'pageFilter'
>

const {
  global = true,
  delay = 500,
  watermarkOptions: options,
} = __VUEPRESS_PLUGIN_WATERMARK_OPTIONS__

const userOptions = ref<WatermarkOptions>({})

export function defineWatermarkConfig(
  userConfig: MaybeRefOrGetter<WatermarkOptions>,
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

export function setupWatermark(): void {
  const frontmatter = usePageFrontmatter<{
    watermark?: boolean | Omit<WatermarkPluginOptions, 'pageFilter' | 'global'>
  }>()
  const routePath = useRoutePath()

  let watermark: Watermark | null = null

  const opts = computed(() => {
    if (
      typeof frontmatter.value.watermark === 'boolean' ||
      !frontmatter.value.watermark
    ) {
      return { ...options, ...userOptions.value }
    }
    return { ...options, ...userOptions.value, ...frontmatter.value.watermark }
  })
  const enabled = computed(() => {
    if (global) return frontmatter.value.watermark !== false
    return !!frontmatter.value.watermark
  })

  watch(
    () => [opts.value, enabled.value, routePath.value],
    () =>
      nextTick(() => {
        if (enabled.value) {
          if (opts.value.parent !== 'body' && delay > 0) {
            wait(delay).then(renderWatermark)
          } else {
            renderWatermark()
          }
        } else {
          destroyWatermark()
        }
      }),
    { immediate: true },
  )

  function renderWatermark(): void {
    let options = toValue(opts)
    // Blind mode default alpha is 0.005
    if (options.mode === 'blind') {
      options = { globalAlpha: 0.005, ...options }
    }

    if (
      options.image &&
      !isLinkHttp(options.image) &&
      options.image.startsWith('/')
    ) {
      options.image = withBase(options.image)
    }

    if (!watermark) {
      watermark = new Watermark(options)
      watermark.create()
    } else {
      watermark.changeOptions(options, 'overwrite', true)
    }
  }

  function destroyWatermark(): void {
    watermark?.destroy()
    watermark = null
  }
}
