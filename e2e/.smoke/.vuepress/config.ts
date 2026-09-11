import process from 'node:process'

import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { mediaPlugin } from '@vuepress/plugin-media'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler:
    process.env.SMOKE_BUNDLER === 'webpack' ? webpackBundler() : viteBundler(),
  locales: {
    '/': { lang: 'zh-CN' },
    '/fr/': { lang: 'fr-FR' },
  },
  theme: defaultTheme(),
  plugins: [
    mediaPlugin({
      embeds: [
        'youtube',
        'vimeo',
        'twitch',
        'dailymotion',
        'tiktok',
        'spotify',
      ],
      videojsProviders: ['youtube', 'vimeo', 'twitch', 'tiktok', 'spotify'],
    }),
  ],
})
