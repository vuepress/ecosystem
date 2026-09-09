import type { ClientConfig } from 'vuepress/client'
import { defineClientConfig } from 'vuepress/client'

import { BackToTop } from './components/index.js'

import './styles/vars.scss'

const clientConfig: ClientConfig = defineClientConfig({
  rootComponents: [BackToTop],
})

export default clientConfig
