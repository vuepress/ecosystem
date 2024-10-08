import { h } from 'vue'
import { defineClientConfig } from 'vuepress/client'
import type { TocPropsOptions } from '../shared/index.js'
import type { TocProps } from './components/Toc.js'
import { Toc } from './components/Toc.js'

declare const __TOC_COMPONENT_NAME__: string
declare const __TOC_DEFAULT_PROPS_OPTIONS__: TocPropsOptions

const defaultPropsOptions = __TOC_DEFAULT_PROPS_OPTIONS__

export default defineClientConfig({
  enhance({ app }) {
    // wrap the toc component with default options
    app.component(__TOC_COMPONENT_NAME__, (props: TocProps) =>
      h(Toc, {
        headers: props.headers,
        options: {
          ...defaultPropsOptions,
          ...props.options,
        },
      }),
    )
  },
})
