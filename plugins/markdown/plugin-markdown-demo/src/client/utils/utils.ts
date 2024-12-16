import { isDef, isPlainObject, keys } from '@vuepress/helper/client'

import type { DemoInfo } from './typings.js'

declare const __DEMO_BABEL_LINK__: string

export const BABEL_LINK = __DEMO_BABEL_LINK__

export type ScriptLoadState = Record<string, Promise<void>>

const state: ScriptLoadState = {}

export const h = (
  tag: string,
  attrs?: Record<string, string>,
  children?: HTMLElement[],
): HTMLElement => {
  const node = document.createElement(tag)

  if (isPlainObject(attrs))
    keys(attrs).forEach((key) => {
      if (key.indexOf('data')) {
        node[key] = attrs[key]
      } else {
        const k = key.replace('data', '')

        node.dataset[k] = attrs[key]
      }
    })

  if (children)
    children.forEach((child) => {
      node.appendChild(child)
    })

  return node
}

export const loadScript = (link: string): Promise<void> => {
  if (isDef(state[link])) return state[link]

  const loadEvent = new Promise<void>((resolve) => {
    const script = document.createElement('script')

    script.src = link
    document.querySelector('body')?.appendChild(script)

    script.onload = (): void => {
      resolve()
    }
  })

  state[link] = loadEvent

  return loadEvent
}

export const injectCSS = (shadowRoot: ShadowRoot, code: DemoInfo): void => {
  if (
    code.css &&
    // Style not injected
    Array.from(shadowRoot.childNodes).every(
      (element) => element.nodeName !== 'STYLE',
    )
  ) {
    const style = h('style', { innerHTML: code.css })

    shadowRoot.appendChild(style)
  }
}

export const injectScript = (
  id: string,
  shadowRoot: ShadowRoot,
  code: DemoInfo,
): void => {
  const scriptText = code.getScript()

  if (
    scriptText &&
    // Style not injected
    Array.from(shadowRoot.childNodes).every(
      (element) => element.nodeName !== 'SCRIPT',
    )
  ) {
    const script = document.createElement('script')

    script.appendChild(
      document.createTextNode(
        // Here we are fixing `document` variable back to shadowDOM
        `{const document=window.document.querySelector('#${id} .vp-demo-display').shadowRoot;\n${scriptText}}`,
      ),
    )
    shadowRoot.appendChild(script)
  }
}

export const appDivWrapper = (html: string): string =>
  `<div id="app">\n${html}\n</div>`

export const cjsWrapper = (scriptStr: string): string =>
  `(function(exports){var module={};module.exports=exports;${scriptStr};return module.exports.__esModule?exports.default:module.exports;})({})`
