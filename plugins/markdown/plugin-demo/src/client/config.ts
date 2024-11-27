import { defineClientConfig } from 'vuepress/client'
import MdDemo from './components/MdDemo.js'
import VPDemo from './components/VPDemo.js'

import './styles/vars.css'

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component('MdDemo', MdDemo)
    app.component('VPDemo', VPDemo)
  },
})
