import { noopModule } from '@vuepress/helper'
import { CLIENT_FOLDER, logger } from './utils.js'

const COMMENT_PROVIDERS = ['Artalk', 'Giscus', 'Waline', 'Twikoo']

export const getProviderComponent = (provider = 'None'): string => {
  if (COMMENT_PROVIDERS.includes(provider))
    return `${CLIENT_FOLDER}components/${provider}Comment.js`

  if (provider !== 'None') logger.error(`Invalid provider: ${provider}`)

  return noopModule
}

export const getProviderPackage = (provider?: string): string | null => {
  switch (provider) {
    case 'Artalk':
      return 'artalk'
    case 'Twikoo':
      return 'twikoo'
    case 'Waline':
      return '@waline/client'

    default:
      return null
  }
}
