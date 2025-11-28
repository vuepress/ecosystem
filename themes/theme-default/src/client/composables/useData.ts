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
  DefaultThemeData,
  DefaultThemeNormalPageFrontmatter,
  DefaultThemePageData,
} from '../../shared/index.js'

export interface Data<
  PageFrontmatter extends Record<string, unknown> =
    DefaultThemeNormalPageFrontmatter,
  PageData extends Record<string, unknown> = DefaultThemePageData,
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
  theme: ThemeDataRef<DefaultThemeData>
  themeLocale: ThemeLocaleDataRef<DefaultThemeData>
}

export const useData = <
  PageFrontmatter extends Record<string, unknown> =
    DefaultThemeNormalPageFrontmatter,
  PageData extends Record<string, unknown> = DefaultThemePageData,
>(): Data<PageFrontmatter, PageData> => ({
  ..._useData<PageFrontmatter, PageData>(),
  theme: useThemeData<DefaultThemeData>(),
  themeLocale: useThemeLocaleData<DefaultThemeData>(),
})
