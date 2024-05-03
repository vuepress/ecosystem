import { wait } from '@vuepress/helper/client'
import { computed, nextTick, toValue, watch } from 'vue'
import { usePageFrontmatter, useRoutePath, withBase } from 'vuepress/client'
// https://github.com/zhensherlock/watermark-js-plus/issues/579
import { Watermark } from 'watermark-js-plus/dist/index.esm.js'
import type {
  WatermarkOptions,
  WatermarkPluginFrontmatter,
} from '../../shared/index.js'
import { userOptions } from '../helper/defineWatermarkConfig.js'

declare const __WATERMARK_OPTIONS__: WatermarkOptions

const {
  global = true,
  delay = 500,
  watermarkOptions: options,
} = __WATERMARK_OPTIONS__

export function setupWatermark(): void {
  const frontmatter = usePageFrontmatter<WatermarkPluginFrontmatter>()
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
    const watermark = frontmatter.value.watermark
    return global ? watermark !== false : watermark
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

    if (options.image && options.image.startsWith('/')) {
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
