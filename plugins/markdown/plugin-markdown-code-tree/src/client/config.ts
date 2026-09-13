import { defineClientConfig } from 'vuepress/client'

import { CodeTree } from './components/CodeTree.js'
import { CodeTreeFileNode } from './components/CodeTreeFileNode.js'

export default defineClientConfig({
  enhance({ app }) {
    app.component('CodeTree', CodeTree)
    app.component('CodeTreeFileNode', CodeTreeFileNode)
  },
})
