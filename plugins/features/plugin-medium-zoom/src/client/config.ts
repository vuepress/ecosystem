import type { ZoomOptions } from 'medium-zoom'
import mediumZoom from 'medium-zoom'
import type { ClientConfig } from 'vuepress/client'
import { defineClientConfig, onContentUpdated } from 'vuepress/client'

import { mediumZoomSymbol, useMediumZoom } from './composables/index.js'

import './styles/vars.css'
import './styles/medium-zoom.scss'

declare const __MZ_SELECTOR__: string
declare const __MZ_ZOOM_OPTIONS__: ZoomOptions

const selector = __MZ_SELECTOR__
const zoomOptions = __MZ_ZOOM_OPTIONS__

const clientConfig: ClientConfig = defineClientConfig({
  enhance({ app }) {
    if (__VUEPRESS_SSR__ || !selector) return

    // create zoom instance and provide it
    const zoom = mediumZoom(zoomOptions)
    zoom.refresh = (sel = selector): void => {
      zoom.detach()
      zoom.attach(sel)
    }
    app.provide(mediumZoomSymbol, zoom)
  },

  setup() {
    const zoom = useMediumZoom()

    onContentUpdated((reason) => {
      if (reason !== 'beforeUnmount') zoom!.refresh()
    })
  },
})

export default clientConfig
