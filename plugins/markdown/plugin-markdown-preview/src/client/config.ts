import { h } from 'vue'
import { defineClientConfig } from 'vuepress/client'
import type { MarkdownPreviewPluginLocaleConfig } from '../shared/index.js'
import type { VPPreviewProps } from './components/index.js'
import { VPPreview } from './components/index.js'

import './styles/vars.css'

declare const __PREVIEW_LOCALES__: MarkdownPreviewPluginLocaleConfig

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component('VPPreview', (props: VPPreviewProps, { slots }) =>
      h(VPPreview, { locales: __PREVIEW_LOCALES__, ...props }, slots),
    )
  },
})
