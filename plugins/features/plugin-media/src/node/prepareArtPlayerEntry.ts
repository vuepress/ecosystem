import { getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress/core'

import { ART_PLAYER_I18N_LANGS, getArtPlayerLang } from '../shared/index.js'

const isManualLocale = (lang: string): boolean =>
  (ART_PLAYER_I18N_LANGS as readonly string[]).includes(lang)

/**
 * Get all Artplayer languages used by the site
 *
 * 获取站点使用的全部 Artplayer 语言
 *
 * @param app - VuePress app / VuePress 应用
 * @returns Artplayer languages that need to be imported manually / 需要手动导入的
 *   Artplayer 语言
 */
const getUsedLangs = (app: App): string[] => {
  const localesLangs = Object.values(app.options.locales)
    .map(({ lang }) => lang)
    .filter((lang) => typeof lang === 'string')
  // Languages of all pages are gathered, in case some pages override the site language
  const siteLangs = [
    app.options.lang,
    ...localesLangs,
    ...app.pages.map(({ lang }) => lang),
  ]

  return [...new Set(siteLangs.map((lang) => getArtPlayerLang(lang)))]
    .filter((lang) => isManualLocale(lang))
    .sort()
}

/**
 * Generate the Artplayer entry, which bundles the core and the locales used by
 * the site
 *
 * 生成 Artplayer 入口文件，将核心包与站点用到的语言包打包在一起
 *
 * @param app - VuePress app / VuePress 应用
 * @param enabled - Whether Artplayer is enabled / 是否启用 Artplayer
 * @returns Path of the generated entry / 生成入口文件路径
 */
export const prepareArtPlayerEntry = (
  app: App,
  enabled: boolean,
): Promise<string> => {
  const langs = enabled ? getUsedLangs(app) : []

  const localeImports = langs
    .map(
      (lang, index) =>
        `import locale${index} from ${JSON.stringify(
          getModulePath(`artplayer/i18n/${lang}`, import.meta),
        )};`,
    )
    .join('\n')
  const localeExports = langs
    .map((lang, index) => `  ${JSON.stringify(lang)}: locale${index},`)
    .join('\n')

  return app.writeTemp(
    'media/artplayer.js',
    `\
import Artplayer from ${JSON.stringify(getModulePath('artplayer', import.meta))};
${localeImports}

export default Artplayer;

export const i18n = {
${localeExports}
};
`,
  )
}
