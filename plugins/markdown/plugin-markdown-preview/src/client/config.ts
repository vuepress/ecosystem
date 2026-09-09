import { h } from 'vue'
import type { ClientConfig } from 'vuepress/client'
import { defineClientConfig } from 'vuepress/client'

import type { MarkdownPreviewPluginLocaleConfig } from '../shared/index.js'
import type { VPPreviewProps } from './components/index.js'
import { VPPreview } from './components/index.js'

import './styles/vars.css'

declare const __PREVIEW_LOCALES__: MarkdownPreviewPluginLocaleConfig

const clientConfig: ClientConfig = defineClientConfig({
  enhance: ({ app }) => {
    app.component('VPPreview', (props: VPPreviewProps, { slots }) =>
      h(VPPreview, { locales: __PREVIEW_LOCALES__, ...props }, slots),
    )
  },
})

export default clientConfig
