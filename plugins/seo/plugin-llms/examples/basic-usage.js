// VuePress 配置示例
import { defineUserConfig } from '@vuepress/cli'
import { defaultTheme } from '@vuepress/theme-default'
import llmstxt from 'vuepress-plugin-llms'

export default defineUserConfig({
  title: '项目文档',
  description: '项目的详细文档',

  theme: defaultTheme({
    navbar: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          children: [
            '/guide/README.md',
            '/guide/getting-started.md',
            '/guide/configuration.md',
          ],
        },
      ],
    },
  }),

  plugins: [
    llmstxt({
      // 基本配置
      title: '项目文档',
      description: '一个优秀的项目文档',
      details: '这个文档包含了项目的所有重要信息。',

      // 忽略不需要的文件
      ignoreFiles: ['private/*', '.vuepress/*'],

      // 生成选项
      generateLLMsTxt: true,
      generateLLMsFullTxt: true,
      stripHTML: true,
    }),
  ],
})
