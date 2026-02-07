import { defineClientConfig } from 'vuepress/client'
import { Notice } from './components/index.js'

import './styles/vars.css'

export default defineClientConfig({
  rootComponents: [Notice],
})
