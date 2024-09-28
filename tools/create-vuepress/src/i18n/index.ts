import { select } from '@inquirer/prompts'
import { en } from './en.js'
import type { CreateLocaleOptions, Lang } from './typings.js'
import { zh } from './zh.js'

export type * from './typings.js'

const i18n: Record<Lang, CreateLocaleOptions> = {
  en,
  zh,
}

interface LanguageResult {
  lang: Lang
  locale: CreateLocaleOptions
}

export const getLanguage = async (): Promise<LanguageResult> => {
  const language = await select<Lang>({
    message: 'Select a language to display / 选择显示语言',
    choices: [
      { name: 'english (US)', value: 'en' },
      { name: '简体中文', value: 'zh' },
    ],
  })

  return {
    lang: language,
    locale: i18n[language],
  }
}
