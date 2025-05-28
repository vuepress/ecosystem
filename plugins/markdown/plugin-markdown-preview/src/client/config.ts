import { defineClientConfig } from 'vuepress/client'
import VPPreview from './components/VPPreview.js'

import './styles/vars.css'

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component('VPPreview', VPPreview)
  },
})
