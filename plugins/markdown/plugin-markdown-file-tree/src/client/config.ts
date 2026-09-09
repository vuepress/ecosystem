import type { ClientConfig } from 'vuepress/client'
import { defineClientConfig } from 'vuepress/client'

import { FileTreeNode } from './components/FileTreeNode.js'

const clientConfig: ClientConfig = defineClientConfig({
  enhance({ app }) {
    app.component('FileTreeNode', FileTreeNode)
  },
})

export default clientConfig
