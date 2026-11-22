import type {
  ThemeDataRef,
  ThemeLocaleDataRef,
} from '@vuepress/plugin-theme-data/client'
import {
  useThemeData,
  useThemeLocaleData,
} from '@vuepress/plugin-theme-data/client'
import type { ClientData } from 'vuepress/client'
import { useData as _useData } from 'vuepress/client'

import type {
  ClassicThemeData,
  ClassicThemeNormalPageFrontmatter,
  ClassicThemePageData,
} from '../../shared/index.js'

export interface Data<
  PageFrontmatter extends Record<string, unknown> =
    ClassicThemeNormalPageFrontmatter,
  PageData extends Record<string, unknown> = ClassicThemePageData,
> extends Pick<
  ClientData<PageFrontmatter, PageData>,
  | 'frontmatter'
  | 'head'
  | 'headTitle'
  | 'lang'
  | 'layouts'
  | 'page'
  | 'pageComponent'
  | 'pageLayout'
  | 'redirects'
  | 'routeLocale'
  | 'routePath'
  | 'routes'
  | 'site'
  | 'siteLocale'
> {
  theme: ThemeDataRef<ClassicThemeData>
  themeLocale: ThemeLocaleDataRef<ClassicThemeData>
}

export const useData = <
  PageFrontmatter extends Record<string, unknown> =
    ClassicThemeNormalPageFrontmatter,
  PageData extends Record<string, unknown> = ClassicThemePageData,
>(): Data<PageFrontmatter, PageData> => ({
  ..._useData<PageFrontmatter, PageData>(),
  theme: useThemeData<ClassicThemeData>(),
  themeLocale: useThemeLocaleData<ClassicThemeData>(),
})
