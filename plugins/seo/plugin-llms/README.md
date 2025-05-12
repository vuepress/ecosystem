# @vuepress/plugin-llms

> VuePress plugin for generating documentation friendly to Large Language Models (LLMs)

## 简介 | Introduction

📜 VuePress 插件，用于生成对大语言模型(LLMs)友好的文档。  
📜 VuePress plugin for generating documentation friendly to Large Language Models (LLMs)

该插件基于 [llms.txt 规范](https://llmstxt.org/)，生成两种格式的文档：

1. `llms.txt`: 简洁版本，包含站点的基本内容
2. `llms-full.txt`: 完整版本，包含站点的所有内容

这些文件可以被大型语言模型(如 GPT)更有效地处理，用于知识库查询等场景。

## 安装 | Install

```bash
# npm
npm i @vuepress/plugin-llms

# yarn
yarn add @vuepress/plugin-llms

# pnpm
pnpm add @vuepress/plugin-llms
```

## 使用 | Usage

```ts
// .vuepress/config.ts
import { defineUserConfig } from 'vuepress'
import { llmsPlugin } from '@vuepress/plugin-llms'

export default defineUserConfig({
  plugins: [
    llmsPlugin({
      // 默认配置
      generateLLMsTxt: true,
      generateLLMsFullTxt: true,
      stripHTML: true,
      ignoreFiles: [],
      workDir: '',
    }),
  ],
})
```

## 配置 | Configuration

### generateLLMsTxt

- 类型: `boolean`
- 默认值: `true`

是否生成 `llms.txt` 文件。

### generateLLMsFullTxt

- 类型: `boolean`
- 默认值: `true`

是否生成 `llms-full.txt` 文件。

### stripHTML

- 类型: `boolean`
- 默认值: `true`

是否从 Markdown 中去除 HTML 标签。

### ignoreFiles

- 类型: `string[]`
- 默认值: `[]`

要忽略的文件的 glob 模式数组。

### workDir

- 类型: `string`
- 默认值: `''`

工作目录，相对于源目录。默认为源目录。

### title

- 类型: `string`
- 默认值: 从 VuePress 配置中获取

站点标题，用于 llms.txt 模板。

### description

- 类型: `string`
- 默认值: 从 VuePress 配置中获取

站点描述，用于 llms.txt 模板。

### details

- 类型: `string`
- 默认值: `undefined`

站点详情，用于 llms.txt 模板。

### toc

- 类型: `boolean`
- 默认值: `true`

是否在 llms.txt 中包含目录。

### customLLMsTxtTemplate

- 类型: `string`
- 默认值: 内置模板

自定义 llms.txt 模板。

### customLLMsFullTxtTemplate

- 类型: `string`
- 默认值: 内置模板

自定义 llms-full.txt 模板。

### customTemplateVariables

- 类型: `Record<string, string | boolean | undefined>`
- 默认值: `{}`

自定义模板变量。

### domain

- 类型: `string`
- 默认值: `undefined`

站点域名，用于生成绝对链接。

## 示例 | Example

```ts
import { defineUserConfig } from 'vuepress'
import { llmsPlugin } from '@vuepress/plugin-llms'

export default defineUserConfig({
  plugins: [
    llmsPlugin({
      generateLLMsTxt: true,
      generateLLMsFullTxt: true,
      stripHTML: true,
      ignoreFiles: ['**/private/**'],
      workDir: 'docs',
      title: '我的文档',
      description: '这是一个示例文档',
      details: '这个文档是关于...',
      toc: true,
      domain: 'https://example.com',
    }),
  ],
})
```

## 输出位置 | Output Location

生成的文件将位于 VuePress 输出目录（通常是 `.vuepress/dist`）：

- `llms.txt`: `.vuepress/dist/llms.txt`
- `llms-full.txt`: `.vuepress/dist/llms-full.txt`

## 协议 | License

[MIT](https://github.com/vuepress/ecosystem/blob/main/plugins/llms/plugin-llms/LICENSE)
