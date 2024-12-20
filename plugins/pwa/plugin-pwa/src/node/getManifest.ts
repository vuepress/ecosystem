import type { App } from 'vuepress/core'
import { fs } from 'vuepress/utils'
import type { AppManifest } from '../shared/index.js'
import type { PwaPluginOptions } from './options.js'

export const getManifest = async (
  app: App,
  options: PwaPluginOptions,
): Promise<AppManifest> => {
  const { base, title, description, lang, locales } = app.siteData

  const rootLocale = locales['/'] ?? {}

  const userManifestPath = app.dir.source(
    '.vuepress/public/manifest.webmanifest',
  )
  const userManifestJSONPath = app.dir.source('.vuepress/public/manifest.json')

  const manifestFileContent = JSON.parse(
    fs.existsSync(userManifestPath)
      ? await fs.readFile(userManifestPath, 'utf8')
      : fs.existsSync(userManifestJSONPath)
        ? await fs.readFile(userManifestJSONPath, 'utf8')
        : '{}',
  ) as AppManifest

  const manifest: AppManifest = {
    name: title || rootLocale.title || 'Site',
    short_name: title || rootLocale.title || 'Site',
    description:
      description || rootLocale.description || 'A site built with vuepress',
    lang: rootLocale.lang ?? lang,
    start_url: base,
    scope: base,

    display: 'standalone',
    theme_color: options.themeColor || '#46bd87',
    background_color: '#ffffff',
    orientation: 'portrait-primary',
    prefer_related_applications: false,

    ...manifestFileContent,
    ...options.manifest,
  }

  return manifest
}
