import { defineClientConfig } from 'vuepress/client'
import RevealJs from './components/RevealJs.js'
import { injectRevealJsConfig } from './helpers/index.js'

import '@temp/revealjs/themes.js'
import 'reveal.js/dist/reveal.css'
import './styles/vars.css'

export default defineClientConfig({
  enhance: ({ app }) => {
    injectRevealJsConfig(app)
    app.component('RevealJs', RevealJs)
  },
})
