import type { ShikiTransformer } from 'shiki'
import { transformerTwoslashFactory } from './transformerTwoslashFactory.js'
import type { ShikiTwoslashOptions } from './options.js'
import { vPreTransformer } from './vPreTransformer.js'

export const createTwoslashTransformers = async (
  options: ShikiTwoslashOptions = {},
): Promise<ShikiTransformer[]> => [
  vPreTransformer,
  await transformerTwoslashFactory(options),
]
