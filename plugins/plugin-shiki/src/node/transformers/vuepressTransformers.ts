import type { ShikiTransformer } from 'shiki'

const ESCAPE_RE = /\[\\!code/g

export const addClassTransformer: ShikiTransformer = {
  name: 'vuepress:add-class',
  pre(node) {
    this.addClassToHast(node, 'vp-code')
  },
}

export const cleanUpTransformer: ShikiTransformer = {
  name: 'vuepress:clean-up',
  pre(node) {
    delete node.properties.tabindex
    delete node.properties.style
  },
}

export const removeEscapeTransformer: ShikiTransformer = {
  name: 'vuepress:remove-escape',
  postprocess(code) {
    return code.replace(ESCAPE_RE, '[!code')
  },
}

export const emptyLineTransformer: ShikiTransformer = {
  name: 'vuepress:empty-line',
  code(hast) {
    hast.children.forEach((span) => {
      if (
        span.type === 'element' &&
        span.tagName === 'span' &&
        Array.isArray(span.properties.class) &&
        span.properties.class.includes('line') &&
        span.children.length === 0
      ) {
        span.children.push({
          type: 'element',
          tagName: 'wbr',
          properties: {},
          children: [],
        })
      }
    })
  },
}
