import Layout from '@revealjs/layout'
import { defineClientConfig } from 'vuepress/client'
import RevealJs from './components/RevealJs.js'
import { injectRevealJsConfig } from './helpers/index.js'

import '@temp/revealjs/themes.js'
import 'reveal.js/dist/reveal.css'
import './styles/vars.css'

declare const REVEAL_LAYOUT: string | null

export default defineClientConfig({
  enhance: ({ app }) => {
    injectRevealJsConfig(app)
    app.component('RevealJs', RevealJs)
  },
  layouts: REVEAL_LAYOUT ? { [REVEAL_LAYOUT]: Layout } : {},
})
