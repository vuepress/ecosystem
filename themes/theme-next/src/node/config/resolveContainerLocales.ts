import { getLocalePaths, getRootLangPath } from '@vuepress/helper'
import type { App } from 'vuepress'
import type {
  ContainerOptions,
  DefaultThemeLocaleOptions,
} from '../../shared/index.js'
import { LOCALES_OPTIONS } from '../locales/index.js'

export function resolveContainerLocales(
  app: App,
  localeOptions: DefaultThemeLocaleOptions,
): Record<string, ContainerOptions> {
  const root = getRootLangPath(app)
  const containerLocales: Record<string, ContainerOptions> = {
    '/': localeOptions.container || LOCALES_OPTIONS[root].container || {},
  }
  getLocalePaths(app).forEach((localePath) => {
    containerLocales[localePath] = {
      ...LOCALES_OPTIONS[localePath === '/' ? root : localePath].container,
      ...(localeOptions.locales?.[localePath]?.container ||
        localeOptions.locales?.['/']?.container),
    }
  })

  return containerLocales
}
