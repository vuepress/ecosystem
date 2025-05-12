---
icon: robot
---

# llms

<NpmBadge package="@vuepress/plugin-llms" />

该插件生成适合大语言模型（LLMs）的文档文件，遵循 [llms.txt 规范](https://llmstxt.org/)。

## 使用方法

```bash
npm i -D @vuepress/plugin-llms@next
```

```ts title=".vuepress/config.ts"
import { llmsPlugin } from '@vuepress/plugin-llms'

export default {
  plugins: [
    llmsPlugin({
      // 选项
    }),
  ],
}
```

## 生成的文件

该插件在 VuePress 输出目录中生成两个文件：

- `llms.txt`：包含目录和基本站点信息的简洁版本
- `llms-full.txt`：包含所有站点内容的完整版本

## 选项

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

是否从 Markdown 内容中移除 HTML 标签。

### ignoreFiles

- 类型: `string[]`
- 默认值: `[]`

要忽略的文件的 glob 模式数组。

### workDir

- 类型: `string`
- 默认值: `''`

工作目录，相对于 VuePress 源目录。默认为源目录。

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

附加站点详情，用于 llms.txt 模板。

### toc

- 类型: `boolean`
- 默认值: `true`

是否在 llms.txt 文件中包含目录。

### customLLMsTxtTemplate

- 类型: `string`
- 默认值: 内置模板

llms.txt 文件的自定义模板。

### customLLMsFullTxtTemplate

- 类型: `string`
- 默认值: 内置模板

llms-full.txt 文件的自定义模板。

### customTemplateVariables

- 类型: `Record<string, string | boolean | undefined>`
- 默认值: `{}`

自定义模板变量。

### domain

- 类型: `string`
- 默认值: `undefined`

站点域名，用于生成绝对链接。

## 示例

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
      details: '此文档是关于...',
      toc: true,
      domain: 'https://example.com',
    }),
  ],
})
```
