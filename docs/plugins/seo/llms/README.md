---
icon: robot
---

# llms

<NpmBadge package="@vuepress/plugin-llms" />

This plugin generates documentation files that are friendly to Large Language Models (LLMs), following the [llms.txt specification](https://llmstxt.org/).

## Usage

```bash
npm i -D @vuepress/plugin-llms@next
```

```ts title=".vuepress/config.ts"
import { llmsPlugin } from '@vuepress/plugin-llms'

export default {
  plugins: [
    llmsPlugin({
      // options
    }),
  ],
}
```

## Generated Files

The plugin generates two files in your VuePress output directory:

- `llms.txt`: A concise version with TOC and basic site information
- `llms-full.txt`: A comprehensive version containing all site content

## Options

### generateLLMsTxt

- Type: `boolean`
- Default: `true`

Whether to generate `llms.txt` file.

### generateLLMsFullTxt

- Type: `boolean`
- Default: `true`

Whether to generate `llms-full.txt` file.

### stripHTML

- Type: `boolean`
- Default: `true`

Whether to strip HTML tags from Markdown content.

### ignoreFiles

- Type: `string[]`
- Default: `[]`

An array of glob patterns for files to ignore.

### workDir

- Type: `string`
- Default: `''`

Working directory, relative to VuePress source directory. Default is the source directory.

### title

- Type: `string`
- Default: From VuePress configuration

Site title, used in the llms.txt template.

### description

- Type: `string`
- Default: From VuePress configuration

Site description, used in the llms.txt template.

### details

- Type: `string`
- Default: `undefined`

Additional site details, used in the llms.txt template.

### toc

- Type: `boolean`
- Default: `true`

Whether to include a table of contents in the llms.txt file.

### customLLMsTxtTemplate

- Type: `string`
- Default: Built-in template

Custom template for the llms.txt file.

### customLLMsFullTxtTemplate

- Type: `string`
- Default: Built-in template

Custom template for the llms-full.txt file.

### customTemplateVariables

- Type: `Record<string, string | boolean | undefined>`
- Default: `{}`

Custom template variables.

### domain

- Type: `string`
- Default: `undefined`

Site domain, used for generating absolute links.

## Example

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
      title: 'My Documentation',
      description: 'This is a sample documentation',
      details: 'This documentation is about...',
      toc: true,
      domain: 'https://example.com',
    }),
  ],
})
```
