import { defineClientConfig } from 'vuepress/client'
import { BackToTop } from './components/index.js'

import './styles/vars.scss'

export default defineClientConfig({
  rootComponents: [BackToTop],
})
