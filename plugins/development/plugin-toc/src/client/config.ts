import type { GetHeadersOptions } from '@vuepress/helper/client'
import { h } from 'vue'
import { defineClientConfig } from 'vuepress/client'
import type { TocRenderOptions } from '../shared/index.js'
import type { TocProps } from './components/Toc.js'
import { Toc } from './components/Toc.js'

declare const __TOC_COMPONENT_NAME__: string
declare const __TOC_HEADERS_OPTIONS__: GetHeadersOptions
declare const __TOC_RENDER_OPTIONS__: TocRenderOptions

export default defineClientConfig({
  enhance({ app }) {
    // wrap the toc component with default options
    app.component(__TOC_COMPONENT_NAME__, (props: TocProps) =>
      h(Toc, {
        headers: props.headers,
        headersOptions: {
          ...__TOC_HEADERS_OPTIONS__,
          ...props.headersOptions,
        },
        renderOptions: {
          ...__TOC_RENDER_OPTIONS__,
          ...props.renderOptions,
        },
      }),
    )
  },
})
