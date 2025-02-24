import type {
  ThemeDataRef,
  ThemeLocaleDataRef,
} from '@vuepress/plugin-theme-data/client'
import {
  useThemeData,
  useThemeLocaleData,
} from '@vuepress/plugin-theme-data/client'
import type {
  ClientData,
  PageDataRef,
  PageFrontmatterRef,
  PageLangRef,
  SiteDataRef,
  SiteLocaleDataRef,
} from 'vuepress/client'
import { useClientData } from 'vuepress/client'
import type {
  DefaultThemeData,
  DefaultThemeNormalPageFrontmatter,
  DefaultThemePageData,
} from '../../shared/index.js'

export interface Data<
  PageFrontmatter extends Record<
    string,
    unknown
  > = DefaultThemeNormalPageFrontmatter,
  PageData extends Record<string, unknown> = DefaultThemePageData,
> extends Pick<
    ClientData,
    | 'layouts'
    | 'pageComponent'
    | 'pageHead'
    | 'pageHeadTitle'
    | 'pageLayout'
    | 'redirects'
    | 'routeLocale'
    | 'routePath'
    | 'routes'
  > {
  page: PageDataRef<PageData>
  frontmatter: PageFrontmatterRef<PageFrontmatter>
  lang: PageLangRef
  site: SiteDataRef
  siteLocale: SiteLocaleDataRef
  theme: ThemeDataRef<DefaultThemeData>
  themeLocale: ThemeLocaleDataRef<DefaultThemeData>
}

export const useData = <
  PageFrontmatter extends Record<
    string,
    unknown
  > = DefaultThemeNormalPageFrontmatter,
  PageData extends Record<string, unknown> = DefaultThemePageData,
>(): Data<PageFrontmatter, PageData> => {
  const {
    pageData,
    pageFrontmatter,
    pageLang,
    siteData,
    siteLocaleData,
    ...rest
  } = useClientData<PageFrontmatter, PageData>()

  return {
    ...rest,
    page: pageData,
    frontmatter: pageFrontmatter,
    lang: pageLang,
    site: siteData,
    siteLocale: siteLocaleData,
    theme: useThemeData<DefaultThemeData>(),
    themeLocale: useThemeLocaleData<DefaultThemeData>(),
  }
}
