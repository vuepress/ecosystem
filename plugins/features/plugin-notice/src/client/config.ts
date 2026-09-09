import type { ClientConfig } from 'vuepress/client'
import { defineClientConfig } from 'vuepress/client'

import { Notice } from './components/index.js'

import './styles/vars.css'

const clientConfig: ClientConfig = defineClientConfig({
  rootComponents: [Notice],
})

export default clientConfig
