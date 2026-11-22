import { themeClassic } from '@vuepress/theme-classic'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'en-US',

  title: 'VuePress',
  description: 'My first VuePress Site',

  theme: themeClassic({
    logo: 'https://vuejs.press/images/hero.png',

    navbar: ['/', '/get-started'],
  }),
})
