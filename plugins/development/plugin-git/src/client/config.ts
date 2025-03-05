import { defineClientConfig } from 'vuepress/client'
import { Changelog, Contributors } from './components/index.js'

export default defineClientConfig({
  enhance({ app }) {
    app.component('GitChangelog', Changelog)
    app.component('GitContributors', Contributors)
  },
})
