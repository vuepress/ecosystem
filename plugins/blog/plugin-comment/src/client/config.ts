import type { ClientConfig } from 'vuepress/client'
import { defineClientConfig } from 'vuepress/client'

import CommentService from './components/CommentService.js'
import { injectCommentConfig } from './helpers/index.js'

import './styles/base.scss'

const clientConfig: ClientConfig = defineClientConfig({
  enhance: ({ app }) => {
    injectCommentConfig(app)
    app.component('CommentService', CommentService)
  },
})

export default clientConfig
