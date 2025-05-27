import { keys } from '@vuepress/helper/client'
import { PRE_PROCESSOR_CONFIG } from './preprocessorConfig.js'
import type { CodeInfo } from './typings.js'

const LANGUAGES = ['html', 'js', 'css'] as const

export const getCodeInfo = (code: Record<string, string>): CodeInfo => {
  const codeInfo: CodeInfo = {
    html: [],
    js: [],
    css: [],
    isLegal: false,
  }

  LANGUAGES.forEach((type) => {
    const match = keys(code).filter((language) =>
      PRE_PROCESSOR_CONFIG[type].types.includes(language),
    )

    if (match.length) {
      const language = match[0]

      codeInfo[type] = [
        code[language].replace(/^\n|\n$/g, ''),
        PRE_PROCESSOR_CONFIG[type].map[language] ?? language,
      ]
    }
  })

  codeInfo.isLegal =
    (!codeInfo.html.length || codeInfo.html[1] === 'none') &&
    (!codeInfo.js.length || codeInfo.js[1] === 'none') &&
    (!codeInfo.css.length || codeInfo.css[1] === 'none')

  return codeInfo
}
