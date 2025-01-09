import type { DemoOptions } from '../../shared/index.js'
import { getDemoOptions } from './getDemoOptions.js'
import type { CodeInfo, DemoInfo } from './typings.js'
import { BABEL_LINK, appDivWrapper, cjsWrapper, loadScript } from './utils.js'

declare const __DEMO_VUE_LINK__: string

const VUE_LINK = __DEMO_VUE_LINK__
const VUE_TEMPLATE_REG = /<template>([\s\S]+)<\/template>/u
const VUE_SCRIPT_REG = /<script(\s*lang=(['"])(.*?)\2)?>([\s\S]+)<\/script>/u
const VUE_STYLE_REG =
  /<style(\s*lang=(['"])(.*?)\2)?\s*(?:scoped)?>([\s\S]+)<\/style>/u

const getVueTemplate = (js: string): string =>
  js
    .replace(
      /export\s+default\s*\{(\n*[\s\S]*)\n*\}\s*;?$/u,
      "Vue.createApp({$1}).mount('#app')",
    )
    .replace(
      /export\s+default\s*define(Async)?Component\s*\(\s*\{(\n*[\s\S]*)\n*\}\s*\)\s*;?$/u,
      "Vue.createApp({$1}).mount('#app')",
    )
    .trim()

export const getVueInfo = (
  code: CodeInfo,
  config: Partial<DemoOptions>,
): DemoInfo => {
  const demoOptions = getDemoOptions(config)

  const vueTemplate = code.html[0] ?? ''
  const htmlBlock = VUE_TEMPLATE_REG.exec(vueTemplate)
  const jsBlock = VUE_SCRIPT_REG.exec(vueTemplate)
  const cssBlock = VUE_STYLE_REG.exec(vueTemplate)
  const html = htmlBlock?.[1].replace(/^\n|\n$/g, '') ?? ''
  const [js = '', jsLang = ''] = jsBlock
    ? [jsBlock[4].replace(/^\n|\n$/g, ''), jsBlock[3]]
    : []
  const [css = '', cssLang = ''] = cssBlock
    ? [cssBlock[4].replace(/^\n|\n$/g, ''), cssBlock[3]]
    : []

  const isLegal = jsLang === '' && (cssLang === '' || cssLang === 'css')

  return {
    ...demoOptions,
    html: appDivWrapper(html),
    js: getVueTemplate(js),
    css,
    isLegal,
    jsLib: [VUE_LINK, ...demoOptions.jsLib],
    getScript: (): string => {
      const scriptStr =
        config.transpile && window.Babel
          ? (window.Babel.transform(js, { presets: ['es2015'] })?.code ?? '')
          : js.replace(/export\s+default/u, 'return')

      return `const app=window.document.createElement('div');document.firstElementChild.appendChild(app);const appOptions=${cjsWrapper(
        scriptStr,
      )};appOptions.template=\`${html.replace(
        '`',
        '\\`"',
      )}\`;window.Vue.createApp(appOptions).mount(app);`
    },
  }
}

export const loadVue = (transpile: boolean): Promise<void[]> => {
  const promises = [loadScript(VUE_LINK)]

  if (transpile) promises.push(loadScript(BABEL_LINK))

  return Promise.all(promises)
}
