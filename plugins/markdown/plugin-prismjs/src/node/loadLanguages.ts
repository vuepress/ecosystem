import Prism from 'prismjs'
import rawLoadLanguages from 'prismjs/components/index.js'

// prevent warning messages
rawLoadLanguages.silent = true

export const loadLanguages = (languages: string[]): void => {
  const langsToLoad = languages.filter((item) => !(item in Prism.languages))

  if (langsToLoad.length) {
    rawLoadLanguages(langsToLoad)
  }
}
