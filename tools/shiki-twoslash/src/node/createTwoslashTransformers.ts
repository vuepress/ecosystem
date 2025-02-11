import type { ShikiTransformer } from 'shiki'
import type { ShikiTwoslashOptions } from './options.js'
import { transformerTwoslashFactory } from './transformerTwoslashFactory.js'
import { vPreTransformer } from './vPreTransformer.js'

export const createTwoslashTransformers = async (
  options: ShikiTwoslashOptions = {},
): Promise<ShikiTransformer[]> => [
  vPreTransformer,
  await transformerTwoslashFactory(options),
]
