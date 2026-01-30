import { defineClientConfig } from 'vuepress/client'
import { FileTreeNode } from './components/FileTreeNode.js'

export default defineClientConfig({
  enhance({ app }) {
    app.component('FileTreeNode', FileTreeNode)
  },
})
