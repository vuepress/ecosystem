import type { ShikiTransformer } from 'shiki'
import { transformerTwoslashFactory } from './transformerTwoslashFactory.js'
import type { VuePressTwoslashOptions } from './types.js'

const TWOSLASH_REGEXP = /\btwoslash\b/

const vPreTransformer: ShikiTransformer = {
  name: 'vuepress:v-pre',
  pre(node) {
    node.properties['v-pre'] = ''
  },
}

export type TwoslashTransformer = (meta: string) => ShikiTransformer[]

export const createTwoslashTransformer = async (
  options: VuePressTwoslashOptions = {},
): Promise<TwoslashTransformer> => {
  const transformer = await transformerTwoslashFactory(options)

  return (meta = ''): ShikiTransformer[] => {
    if (TWOSLASH_REGEXP.test(meta)) return [transformer]
    return [vPreTransformer]
  }
}
