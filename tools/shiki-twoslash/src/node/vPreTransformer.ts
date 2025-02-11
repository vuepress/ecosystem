import type { ShikiTransformer } from 'shiki'

export const vPreTransformer: ShikiTransformer = {
  name: 'vuepress:v-pre',
  pre(node) {
    node.properties['v-pre'] = ''
  },
}
