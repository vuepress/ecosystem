import { isPlainObject } from '@vuepress/helper/client'
import { computed } from 'vue'
import { defineClientConfig, usePageFrontmatter } from 'vuepress/client'
import type { WatermarkPluginFrontmatter } from '../shared/options.js'
import { setupWatermark } from './composables/index.js'
import type { WatermarkOptions } from './helper/index.js'
import { injectWatermarkConfig, useWatermarkOptions } from './helper/index.js'

declare const __WM_GLOBAL__: boolean
declare const __WM_OPTIONS__: WatermarkOptions

export default defineClientConfig({
  enhance({ app }) {
    injectWatermarkConfig(app)
  },

  setup() {
    const frontmatter = usePageFrontmatter<WatermarkPluginFrontmatter>()
    const watermarkOptions = useWatermarkOptions(
      computed(() => {
        const { watermark } = frontmatter.value
        return isPlainObject(watermark) ? {} : __WM_OPTIONS__
      }),
    )

    const enabled = computed(() => {
      const { watermark } = frontmatter.value

      return Boolean(watermark ?? __WM_GLOBAL__)
    })

    setupWatermark(watermarkOptions, enabled)
  },
})
