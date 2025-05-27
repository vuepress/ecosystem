import { defineClientConfig } from 'vuepress/client'
import VPDemo from './components/VPDemo.js'

import './styles/vars.css'

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component('VPDemo', VPDemo)
  },
})
