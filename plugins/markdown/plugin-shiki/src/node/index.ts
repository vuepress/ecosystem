import { shikiPlugin } from './shikiPlugin.js'

export * from './options.js'
export {
  bundledLanguageNames,
  bundledLanguages,
} from './markdown/applyHighlighter.js'
export * from './shikiPlugin.js'
export * from './types.js'
/** @deprecated Use named export instead */
export default shikiPlugin
