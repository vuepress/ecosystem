import type { DemoOptions } from '../../shared/index.js'
import { getDemoOptions } from './getDemoOptions.js'
import type { CodeInfo, DemoInfo } from './typings.js'
import { BABEL_LINK, appDivWrapper, cjsWrapper, loadScript } from './utils.js'

declare const __DEMO_REACT_LINK__: string
declare const __DEMO_REACT_DOM_LINK__: string

const REACT_LINK = __DEMO_REACT_LINK__
const REACT_DOM_LINK = __DEMO_REACT_DOM_LINK__

const getReactTemplate = (code: string): string =>
  `${code
    .replace('export default ', 'const $reactApp = ')
    .replace(
      /App\.__style__(\s*)=(\s*)`([\s\S]*)?`/,
      '',
    )};\nReactDOM.createRoot(document.getElementById("app")).render(React.createElement($reactApp))`

export const getReactInfo = (
  code: CodeInfo,
  config: Partial<DemoOptions>,
): DemoInfo => {
  const demoOptions = getDemoOptions(config)
  const js = code.js[0] ?? ''

  return {
    ...demoOptions,
    html: appDivWrapper(''),
    js: getReactTemplate(js),
    css:
      code.css[0] ??
      code.js[0]
        ?.replace(/App\.__style__(?:\s*)=(?:\s*)`([\s\S]*)?`/, '$1')
        .trim() ??
      '',
    isLegal: code.isLegal,
    jsLib: [REACT_LINK, REACT_DOM_LINK, ...demoOptions.jsLib],
    jsx: true,
    getScript: (): string => {
      const scriptStr = window.Babel
        ? (window.Babel.transform(js, {
            presets: ['es2015', 'react'],
          })?.code ?? '')
        : js

      return `window.ReactDOM.createRoot(document.firstElementChild).render(window.React.createElement(${cjsWrapper(
        scriptStr,
      )}))`
    },
  }
}

export const loadReactScripts = (transpile: boolean): Promise<void[]> => {
  const promises = [loadScript(REACT_LINK), loadScript(REACT_DOM_LINK)]

  if (transpile) promises.push(loadScript(BABEL_LINK))

  return Promise.all(promises)
}
