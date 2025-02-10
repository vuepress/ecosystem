import type { ShikiTransformer } from 'shiki'
import { transformerTwoslashFactory } from './transformerTwoslashFactory.js'
import type { ShikiTwoslashOptions } from './types.js'

const vPreTransformer: ShikiTransformer = {
  name: 'vuepress:v-pre',
  pre(node) {
    node.properties['v-pre'] = ''
  },
}

export type TwoslashTransformer = ShikiTransformer[]

export const createTwoslashTransformer = async (
  options: ShikiTwoslashOptions = {},
): Promise<TwoslashTransformer> => {
  const transformer = await transformerTwoslashFactory(options)

  return [vPreTransformer, transformer]
}
