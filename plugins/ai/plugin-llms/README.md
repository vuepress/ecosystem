# @vuepress/plugin-llms

LLMs (Large Language Models) are great at processing text, but traditional documentation formats can be too heavy and cluttered. `@vuepress/plugin-llms` generates raw Markdown documentation that LLMs can efficiently process

The file structure in .vuepress/dist folder will be as follows:

```txt
📂 .vuepress/dist
├── ...
├── llms-full.txt            // A file where all the website documentation is compiled into one file
├── llms.txt                 // The main file for LLMs with all links to all sections of the documentation for LLMs
├── markdown-examples.html   // A human-friendly version of `markdown-examples` section in HTML format
└── markdown-examples.md     // A LLM-friendly version of `markdown-examples` section in Markdown format
```

## Installation

```bash
# pnpm
npm i -D @vuepress/plugin-llms@next
# yarn
yarn add -D @vuepress/plugin-llms@next
# npm
npm i -D @vuepress/plugin-llms@next
```

## Usage

Add the plugin to your VuePress configuration (.vuepress/config.ts):

```ts
import { defineUserConfig } from 'vuepress'
import { llmsPlugin } from '@vuepress/plugin-llms'

export default defineUserConfig({
  // ...
  plugins: [
    llmsPlugin({
      // options
    }),
  ],
})
```

### Options

See [types.ts](./src/node/types.ts)

### Redirects (optional, but recommended)

It is recommended to configure redirects so that AI can use addresses with both .md and .txt extensions

#### Netlify

`public/_redirects` :

```txt
/llms.md         /llms.txt 200!
/llms-full.md    /llms-full.txt 200!
```

Syntax documentation: <https://docs.netlify.com/routing/redirects>

## Credits

- [llmstxt](https://llmstxt.org/)
- [vitepress-plugin-llms](https://github.com/okineadev/vitepress-plugin-llms)

## License

[MIT LICENSE](https://github.com/vuepress/ecosystem/blob/main/LICENSE)
