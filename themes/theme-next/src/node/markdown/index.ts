import { getLocalePaths, getRootLangPath } from '@vuepress/helper'
import type MarkdownIt from 'markdown-it'
import type { App } from 'vuepress'
import type {
  ContainerOptions,
  DefaultThemeLocaleOptions,
} from '../../shared/index.js'
import { LOCALES_OPTIONS } from '../locales/index.js'
import { containerPlugin } from './containerPlugin.js'
import { gitHubAlertsPlugin } from './githubAlertsPlugin.js'

export function extendsMarkdown(
  md: MarkdownIt,
  app: App,
  localeOptions: DefaultThemeLocaleOptions,
): void {
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

  containerPlugin(md, containerLocales)
  gitHubAlertsPlugin(md, containerLocales)
}
