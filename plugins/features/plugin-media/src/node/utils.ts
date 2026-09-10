import { Logger, ensureEndingSlash, isModuleAvailable } from '@vuepress/helper'
import { getDirname, path } from 'vuepress/utils'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

export const PLUGIN_NAME = '@vuepress/plugin-media'

export const AVAILABLE_COMPONENTS: Record<string, string> = {
  artplayer: 'ArtPlayer',
  bilibili: 'BiliBili',
}

export const COMPONENT_PKGS: Record<string, string[]> = {
  artplayer: ['artplayer'],
}

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, '../client'),
)

export const isInstalled = (pkg: string): boolean =>
  isModuleAvailable(pkg, import.meta)

export const logger = new Logger(PLUGIN_NAME)
