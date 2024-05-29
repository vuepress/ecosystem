import type { App } from 'vuepress/core'
import type { CategoriesMap } from '../../shared/index.js'

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoriesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
  });
`

/**
 * @returns Page paths to be generated
 */
export const prepareCategoriesMap = async (
  app: App,
  categoriesMap: CategoriesMap,
): Promise<void> => {
  await app.writeTemp(
    `blog/category.js`,
    `\
export const categoriesMap = ${JSON.stringify(categoriesMap)};
${app.env.isDev ? HMR_CODE : ''}
`,
  )
}
