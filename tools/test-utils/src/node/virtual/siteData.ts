import { TEST_SITE_DATA_KEY } from '../../shared/keys.js'

const globals = globalThis as Record<string, unknown>

globals[TEST_SITE_DATA_KEY] ??= {
  base: '/',
  description: '',
  head: [],
  lang: 'en-US',
  locales: {},
  themeConfig: {},
  title: '',
}

export const siteData = globals[TEST_SITE_DATA_KEY]
