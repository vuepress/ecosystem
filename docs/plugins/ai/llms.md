---
icon: tabler:file-ai
---

# plugin-llms

<NpmBadge package="@vuepress/plugin-llms" />

Add [llms.txt](https://llmstxt.org/) to your site to provide LLM-friendly content.

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

## Why llms.txt?

Large language models increasingly rely on website information, but face a critical limitation: context windows are too small to handle most websites in their entirety. Converting complex HTML pages with navigation, ads, and JavaScript into LLM-friendly plain text is both difficult and imprecise.

While websites serve both human readers and LLMs, the latter benefit from more concise, expert-level information gathered in a single, accessible location. This is particularly important for use cases like development environments, where LLMs need quick access to programming documentation and APIs.

Add a `/llms.txt` Markdown file to the website to provide LLM-friendly content. This file includes brief background information, guidelines, and links to detailed Markdown files.

### Plugin Features

The plugin retrieves all Markdown files from your document source directory and converts them into LLM-friendly plain text files.

```txt
📂 .vuepress/dist
├── ...
├── llms.txt
├── llms-full.txt
├── markdown-examples.html
└── markdown-examples.md
```

Click the link below to view the `llms.txt` file of this documentation site:

- <a :href="$withBase('/llms.txt')" target="_blank">llms.txt</a>
- <a :href="$withBase('/llms-full.txt')" target="_blank">llms-full.txt</a>

::: tip

The plugin only generates the `llms.txt` file, along with other LLM-friendly documentation files, during the production build—that is, when the `vuepress build` command is executed—and outputs them to the `.vuepress/dist` directory.

:::

### `llms.txt`

The `llms.txt` file contains the **title**, **description**, **details (optional)**, and **Table of Contents (TOC)** for the site.

The default format is as follows:

```md title="llms.txt"
# Title

> Description

Details (Optional)

## Table of Contents

- [title](url): description
- [title](url): description
- …
```

- **Site Title**: Values are determined in the following order:
  1. `llmsTxtTemplateGetter.title`
  1. `heroText` in homepage frontmatter
  1. Current locale's [title](https://v2.vuepress.vuejs.org/reference/config.html#locales) in VuePress config file
  1. [title](https://v2.vuepress.vuejs.org/reference/config.html#title) in VuePress config file
  1. Page title of locale homepage (locale `README.md`)

- **Site Description**: Values are determined in the following order:
  1. `llmsTxtTemplateGetter.description`
  1. `tagline` in locale homepage frontmatter
  1. Current locale's [description](https://v2.vuepress.vuejs.org/reference/config.html#locales) in VuePress config file
  1. [description](https://v2.vuepress.vuejs.org/reference/config.html#description) in VuePress config file
  1. `frontmatter.description` in locale homepage (locale `README.md`)

- **Site Details (Optional)**: Values are determined in the following order:
  1. `llmsTxtTemplateGetter.details`
  2. `frontmatter.details` in locale homepage (`README.md`)

- **Table of Contents (TOC)**: Formatted as `- [title](url): description`, where `description` is taken from `frontmatter.description`. If it does not exist, only `- [title](url)` is displayed.

  By default, the plugin only generates first-level TOC, and the default getter function is as follows:

  ```ts
  import { generateTOCLink } from '@vuepress/plugin-llms'

  const defaultTOCGetter = (pages, state) =>
    pages.map((page) => generateTOCLink(page, state)).join('\n')
  ```

  You can customize it to generate a multi-level TOC by setting a custom function with the [`llmsTxtTemplateGetter`](#llmstxttemplategetter) option.

### `llms-full.txt`

`llms-full.txt` contains **links**, **descriptions**, and **Markdown-formatted content** for each page.

Its format is as follows:

```txt title="llms-full.txt"
---
url: url
description: optional description
---

page's Markdown-formatted content

---

---
url: url
description: optional description
---

page's Markdown-formatted content

…
```

The plugin directly merges the content of the Markdown files in the document source directory into `llms-full.txt` so that LLMs can read and analyze it.

### Page Contents

The plugin generates accessible Markdown files for each page in the format `${url}.md`. For example, `/guide/quick-start.html` will produce a corresponding `/guide/quick-start.md` file.

## Options

### llmsTxt

- Type: `boolean`

- Default: `true`

- Details: Whether to generate the `llms.txt` file, which contains a list of sections with corresponding links.

### llmsFullTxt

- Type: `boolean`

- Default: `true`

- Details: Whether to generate the `llms-full.txt` file which contains all the documentation in one file.

### llmsPageTxt

- Type: `boolean`

- Default: `true`

- Details: Whether to generate an LLM-friendly version of the documentation for each page on the website.

### stripHTML

- Type: `boolean`

- Default: `true`

- Details: Whether to strip HTML tags from Markdown files.

### filter

- Type: `(page: Page) => boolean`

- Default: `() => true`

- Details:

  Page filter function. When it returns `true`, the page will be included in `llms.txt`, otherwise it will be excluded.

  Pages that are disabled by `frontmatter.llmstxt` or not generated from Markdown files will be excluded anyway.

### domain

- Type: `string`

- Default: `''`

- Details:

  The domain that will be prepended to URLs in `llms.txt` and other files.

  Domain attachment is not yet standardized (since it depends on whether the AI can resolve the relative paths that are currently there), but you can add it if needed.

  ```md title="llms.txt"
  - [title](/foo/bar.md) <!-- [!code --] -->
  - [title](https://example.com/foo/bar.md) <!-- [!code ++] -->
  ```

### locale

- Types: `string | 'all'`

- Default: `'/'`

- Details:

  The locale of the site to generate. If not set, the plugin will use the default locale of the VuePress site. If you set it to `'all'`, the plugin will generate `llms.txt` for all locales.

  This option is useful when you have multiple locales and want to generate `llms.txt` for a specific locale, which should have the best documentation quality.

  Also, if you have many self-defined concepts that LLMs cannot understand or translate correctly, you should consider generating `llms.txt` for each locale to avoid confusion with different representations coming from LLM translation and the original documentation.

### llmsTxtTemplate

- Types: `string`

- Default:

  ```ts
  const DEFAULT_LLMSTXT_TEMPLATE = `\
  # {title}
  
  {description}
  
  {details}
  
  ## Table of Contents
  
  {toc}`
  ```

- Details:

  A custom template for the `llms.txt` file, allowing for a personalized order of elements.

  By default, `{title}`, `{description}`, `{details}`, and `{toc}` are available.

### llmsTxtTemplateGetter

- Type: `TemplateGetterOptions`

  ```ts
  /**
   * Link extension options for generated links
   */
  export type LinkExtension = '.html' | '.md'

  /**
   * Page with additional LLM-friendly content
   */
  export interface LLMPage extends Page {
    /**
     * The page's Markdown content
     *
     * @example '# Guide\n\nA guide'
     */
    markdown: string

    /**
     * The page's excerpt
     *
     * @example 'Introduction to the guide'
     */
    excerpt: string
  }

  /**
   * State object for LLM text generation
   */
  export interface LLMState {
    /**
     * VuePress app instance
     */
    app: App

    /**
     * Site base URL
     */
    base: string

    /**
     * Optional domain to prepend to URLs
     */
    domain?: string

    /**
     * Link extension for generated links
     */
    linkExtension?: LinkExtension

    /**
     * The path of the current locale.
     */
    currentLocale: string

    /**
     * Current site locale data
     */
    siteLocale: SiteLocaleData

    /**
     * Whether to generate llms.txt files for all locales.
     */
    allLocales: boolean
  }

  export type TemplateGetter = (pages: LLMPage[], state: LLMState) => string

  export interface TemplateGetterOptions {
    /** Any custom variable */
    [key: string]: TemplateGetter | string | undefined
  }
  ```

- Default: `{}`

- Details:

  Custom variables for the [`llmsTxtTemplate`](#llmstxttemplate).

  With this option you can add and override template variables.

  For example, setting a customized title for `llms.txt`:

  ```ts
  llmsPlugin({
    llmsTxtTemplateGetter: {
      title: 'My title',
    },
  })
  ```

  Or adding a custom variable `foo` to the template:

  ```ts
  llmsPlugin({
    llmsTxtTemplate: '# {title}\n\n{foo}',
    llmsTxtTemplateGetter: {
      foo: 'My foo',
    },
  })
  ```

  You can also add getter functions to the template:

  ```ts
  llmsPlugin({
    llmsTxtTemplate: '# {title}\n\n## Pages\n\n{titles}',
    llmsTxtTemplateGetter: {
      titles: (pages, state) =>
        pages.map((page) => `- ${page.title}`).join('\n'),
    },
  })
  ```

## Frontmatter

The following `frontmatter` will be used in the plugin.

### title {#frontmatter-title}

- Types: `string`
- Details:

  On the homepage (`README.md`), it serves as an alternative title for `llms.txt`.

  On other pages, it functions as the page title.

### description {#frontmatter-description}

- Types: `string`
- Details:

  On the homepage (`README.md`), as an alternative description for `llms.txt`.

  On other pages, as the page description.

  It is recommended to add concise and clear descriptions to the page, providing key information for LLMs to understand it.

### heroText {#frontmatter-herotext}

- Types: `string`

- Details:

  Being read from homepage (locale `README.md`) only, as title of `llms.txt`.

### tagline {#frontmatter-tagline}

- Types: `string`

- Details:

  Being read from homepage (locale `README.md`) only, as description of `llms.txt`.

### details {#frontmatter-details}

- Types: `string`
- Details:

  Being read from homepage (locale `README.md`) only, as details of `llms.txt`.

### llmstxt

- Types: `boolean`

- Default: `true`

- Details: Whether the current page should be included in `llms.txt`.

## Others

It is recommended to configure redirects so that AI can use addresses with `.md` and `.txt` extensions.

For example, in `Netlify`, configure the following in `public/_redirects`:

```txt
/llms.md         /llms.txt 200!
/llms-full.md    /llms-full.txt 200!
```

Options syntax documentation: <https://docs.netlify.com/routing/redirects>
