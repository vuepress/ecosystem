import { defineClientConfig } from 'vuepress/client'
import type { ClientConfig } from 'vuepress/client'
import { BackToTop } from './components/index.js'

import './styles/vars.css'

export default defineClientConfig({
  rootComponents: [BackToTop],
}) as ClientConfig
