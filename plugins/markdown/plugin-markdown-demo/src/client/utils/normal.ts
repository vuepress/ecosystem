import type { DemoOptions } from '../../shared/index.js'
import { getDemoOptions } from './getDemoOptions.js'
import type { CodeInfo, DemoInfo } from './typings.js'
import { BABEL_LINK, loadScript } from './utils.js'

export const getNormalInfo = (
  code: CodeInfo,
  config: Partial<DemoOptions>,
): DemoInfo => {
  const codeConfig = getDemoOptions(config)
  const js = code.js[0] ?? ''

  return {
    ...codeConfig,
    html: code.html[0] ?? '',
    js,
    css: code.css[0] ?? '',
    isLegal: code.isLegal,
    getScript: (): string =>
      codeConfig.transpile && window.Babel
        ? (window.Babel.transform(js, { presets: ['es2015'] })?.code ?? '')
        : js,
  }
}

export const loadNormalScripts = (transpile: boolean): Promise<void> =>
  transpile ? loadScript(BABEL_LINK) : Promise.resolve()
