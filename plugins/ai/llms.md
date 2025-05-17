---
url: /ecosystem/plugins/ai/llms.md
---
# plugin-llms

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

* llms.txt
* llms-full.txt

::: tip

The plugin only generates the `llms.txt` file, along with other LLM-friendly documentation files, during the production build—that is, when the `vuepress build` command is executed—and outputs them to the `.vuepress/dist` directory.

:::

### `llms.txt`

The `llms.txt` file contains the **title**, **description**, **details (optional)**, and **Table Of Content(TOC)** for the site.

The default format is as follows:

```md title="llms.txt"
# Title

> Description

Details (Optional)

## Table Of Content

- [title](url): description
- [title](url): description
- …
```

* **Site Title**: Values are determined in the following order:

  1. `llmTemplateGetter.title`
  2. `heroText` in homepage frontmatter.
  3. Current locale's [title](https://v2.vuepress.vuejs.org/reference/config.html#locales) in VuePress config file.
  4. [title](https://v2.vuepress.vuejs.org/reference/config.html#title) in VuePress config file.
  5. Page title of homepage (locale `README.md`)

* **Site Description**: Values are determined in the following order:

  1. `llmTemplateGetter.description`
  2. `tagline` in homepage frontmatter.
  3. Current locale's [description](https://v2.vuepress.vuejs.org/reference/config.html#locales) in VuePress config file.
  4. [description](https://v2.vuepress.vuejs.org/reference/config.html#description) in VuePress config file.
  5. The `frontmatter.description` in the homepage (locale `README.md`)

* **Site Details (Optional)**: Values are determined in the following order:

  1. `llmTemplateGetter.details`
  2. The `frontmatter.details` in homepage (`README.md`).

* **Table Of Content(TOC)**: Formatted as `- [title](url): description`, where `description` is taken from `frontmatter.description`. If it does not exist, only `- [title](url)` is displayed.

  By default the plugin only generates first-level TOC, and the default getter function is as follows:

  ```ts
  import { generateTOCLink } from '@vuepress/plugin-llms'

  const defaultTOCGetter = (pages, state) =>
    pages.map((page) => generateTOCLink(page, state)).join('\n')
  ```

  You can customize it to generate a multi-level TOC by setting a customize function with the [`llmsTxtTemplateGetter`](#llmstxttemplategetter) option.

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

The plugin directly merges the content of the Markdown files in the document source directory into `llms-full.txt` so that LLM can read and analyze it.

### Page Contents

The plugin generates accessible Markdown files for each page in the format `${url}.md`. For example, `/guide/quick-start.html` will produce a corresponding `/guide/quick-start.md` file.

## Options

### llmsTxt

* Types: `boolean`

* Default: `true`

* Details: Indicates whether to generate the `llms.txt` file, which contains a list of sections with corresponding links.

### llmsFullTxt

* Types: `boolean`

* Default: `true`

* Details: Determines whether to generate the `llms-full.txt` which contains all the documentation in one file.

### llmsPageTxt

* Types: `boolean`

* Default: `true`

* Details: Determines whether to generate an LLM-friendly version of the documentation for each page on the website.

### stripHTML

* Types: `boolean`

* Default: `true`

* Details: Whether to strip HTML tags from Markdown files

### filter

* Types: `(page: Page) => boolean`

* Default: `() => true`

* Details:

  Page filter, when returns `true`, the page will be included in `llms.txt`, otherwise it will be excluded.

  Pages which is disabled by `frontmatter.llmstxt` or not generated from Markdown files will be excluded anyway.

### domain

* Types: `string`

* Default: `''`

* Details:

  The domain that will be appended to the beginning of URLs in `llms.txt` and in the context of other files

  Domain attachment is not yet agreed upon (since it depends on the AI whether it can resolve the relative paths that are currently there), but if you want you can add it.

  ```md title="llms.txt"
  - [title](/foo/bar.md) <!-- [!code --] -->
  - [title](https://example.com/foo/bar.md) <!-- [!code ++] -->
  ```

### locale

* Types: `string | 'all'`

* Default: `'/'`

* Details:

  The generated locale of the site. If not set, the plugin will use the default locale of the VuePress site. If you set it to `all`, the plugin will generate `llms.txt` for all locales.

  This option is useful when you have multiple locales and want to generate `llms.txt` for a specific locale, which shall have the best documentation quality.

  Also, if you have many self-defined concepts that LLMs cannot understand or translate correctly, you shall consider generating `llms.txt` for each locale to avoid confusion with different representations coming from LLMs' translation and the original documentation.

### llmsTxtTemplate

* Types: `string`

* Default:

  ```ts
  const DEFAULT_LLMSTXT_TEMPLATE = `\
  # {title}

  {description}

  {details}

  ## Table of Contents

  {toc}`
  ```

* Details:

  A custom template for the `llms.txt` file, allowing for a personalized order of elements.

  By default, `{title}`, `{description}`, `{details}`, and `{toc}` are available.

### llmsTxtTemplateGetter

* Types: `TemplateGetterOptions`

  ```ts
  /**
   * Represents the link extension options for generated links.
   */
  export type LinksExtension = '.html' | '.md'

  /**
   * Represents a prepared page, including its title and path.
   */
  export interface LLMPage extends Page {
    /**
     * The content of the Markdown file.
     *
     * @example '# Guide\n\nA guide'
     */
    markdown: string

    /**
     * The excerpt of the page.
     *
     * @example 'Introduction to the guide'
     */
    excerpt: string
  }

  /**
   * Options for generating a Table of Contents (TOC).
   */
  export interface LLMState {
    /**
     * The VuePress app instance.
     */
    app: App

    /**
     * Base URL
     */
    base: string

    /**
     * Optional domain to prefix URLs with.
     */
    domain?: string

    /**
     * The link extension for generated links.
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

* Default: `{}`

* Details:

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

* Types: `string`
* Details:

  On the homepage (`README.md`), it serves as an alternative title for `llms.txt`.

  On other pages, it functions as the page title.

### description {#frontmatter-description}

* Types: `string`
* Details:

  On the homepage (`README.md`), as an alternative description for `llms.txt`.

  On other pages, as the page description.

  It is recommended to add concise and clear descriptions to the page, providing key information for LLMs to understand it.

### heroText {#frontmatter-herotext}

* Types: `string`

* Details:

  Being read from homepage (locale `README.md`) only, as title of `llms.txt`.

### tagline {#frontmatter-tagline}

* Types: `string`

* Details:

  Being read from homepage (locale `README.md`) only, as description of `llms.txt`.

### details {#frontmatter-details}

* Types: `string`
* Details:

  Being read from homepage (locale `README.md`) only, as details of `llms.txt`.

### llmstxt

* Types: `boolean`

* Default: `true`

* Details: Whether `llms.txt` contain the current page.

## Others

It is recommended to configure redirects so that the AI can use addresses with .md and .txt extensions.

For example, in `Netlify`, configure the following in `public/_redirects`:

```txt
/llms.md         /llms.txt 200!
/llms-full.md    /llms-full.txt 200!
```

Options Syntax documentation: <https://docs.netlify.com/routing/redirects>
