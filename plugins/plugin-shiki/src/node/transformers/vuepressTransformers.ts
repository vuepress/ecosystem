import type { ShikiTransformer } from 'shiki'

const CODE_ESCAPE_RE = /\[\\!code/g

export const addClassTransformer: ShikiTransformer = {
  name: 'vuepress:add-class',
  pre(node) {
    this.addClassToHast(node, 'vp-code')
  },
}

export const removeEscapeTransformer: ShikiTransformer = {
  name: 'vuepress:remove-escape',
  postprocess(code) {
    return code.replace(CODE_ESCAPE_RE, '[!code')
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
