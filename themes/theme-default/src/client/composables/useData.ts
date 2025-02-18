import type {
  ThemeDataRef,
  ThemeLocaleDataRef,
} from '@vuepress/plugin-theme-data/client'
import {
  useThemeData,
  useThemeLocaleData,
} from '@vuepress/plugin-theme-data/client'
import type {
  LayoutsRef,
  PageComponentRef,
  PageDataRef,
  PageFrontmatterRef,
  PageHeadRef,
  PageHeadTitleRef,
  PageLangRef,
  PageLayoutRef,
  RedirectsRef,
  RouteLocaleRef,
  RoutePathRef,
  RoutesRef,
  SiteDataRef,
  SiteLocaleDataRef,
} from 'vuepress/client'
import { useClientData } from 'vuepress/client'
import type {
  DefaultThemeData,
  DefaultThemeNormalPageFrontmatter,
  DefaultThemePageData,
} from '../../shared/index.js'

interface ClientData<
  PageFrontmatter extends Record<
    string,
    unknown
  > = DefaultThemeNormalPageFrontmatter,
  PageData extends Record<string, unknown> = DefaultThemePageData,
> {
  layouts: LayoutsRef
  pageComponent: PageComponentRef
  pageData: PageDataRef<PageData>
  pageFrontmatter: PageFrontmatterRef<PageFrontmatter>
  pageHead: PageHeadRef
  pageHeadTitle: PageHeadTitleRef
  pageLang: PageLangRef
  pageLayout: PageLayoutRef
  redirects: RedirectsRef
  routePath: RoutePathRef
  routeLocale: RouteLocaleRef
  routes: RoutesRef
  siteData: SiteDataRef
  siteLocaleData: SiteLocaleDataRef
}

export interface Data<
  PageFrontmatter extends Record<
    string,
    unknown
  > = DefaultThemeNormalPageFrontmatter,
  PageData extends Record<string, unknown> = DefaultThemePageData,
> extends ClientData<PageFrontmatter, PageData> {
  themeData: ThemeDataRef<DefaultThemeData>
  themeLocaleData: ThemeLocaleDataRef<DefaultThemeData>
}

export const useData = <
  PageFrontmatter extends Record<
    string,
    unknown
  > = DefaultThemeNormalPageFrontmatter,
  PageData extends Record<string, unknown> = DefaultThemePageData,
>(): Data<PageFrontmatter, PageData> => ({
  ...(useClientData() as ClientData<PageFrontmatter, PageData>),
  themeData: useThemeData<DefaultThemeData>(),
  themeLocaleData: useThemeLocaleData<DefaultThemeData>(),
})
