---
icon: tabler:file-ai
---

# plugin-llms

<NpmBadge package="@vuepress/plugin-llms" />

Add [llms.txt](https://llmstxt.org/) to your site to provide LLM-friendly content.

Large language models increasingly rely on website information, but face a critical limitation: context windows are too small to handle most websites in their entirety. Converting complex HTML pages with navigation, ads, and JavaScript into LLM-friendly plain text is both difficult and imprecise.

While websites serve both human readers and LLMs, the latter benefit from more concise, expert-level information gathered in a single, accessible location. This is particularly important for use cases like development environments, where LLMs need quick access to programming documentation and APIs.

Add a `/llms.txt` Markdown file to the website to provide LLM-friendly content. This file includes brief background information, guidelines, and links to detailed markdown files.

## Introduction

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

### Generate `llms.txt`

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

- **Site Title**: Values are determined in the following order:

  1. [Options > title](#title)
  2. VuePress configuration [locales > title](https://v2.vuepress.vuejs.org/reference/config.html#locales)
  3. VuePress configuration [title](https://v2.vuepress.vuejs.org/reference/config.html#title)
  4. The first **h1** heading (single `#` heading) in the homepage (`README.md`)
  5. The `frontmatter.title` in the homepage (`README.md`)

- **Site Description**: Values are determined in the following order:

  1. [Options > description](#description)
  2. VuePress configuration [locales > description](https://v2.vuepress.vuejs.org/reference/config.html#locales)
  3. VuePress configuration [description](https://v2.vuepress.vuejs.org/reference/config.html#description)
  4. The `frontmatter.description` in the homepage (`README.md`)

- **Site Details (Optional)**: Values are determined in the following order:

  1. [Options > details](#details)
  2. The `frontmatter.details` in homepage (`README.md`).

- **Table Of Content(TOC)**: Formatted as `- [title](url): description`, where `description` is taken from `frontmatter.description`. If it does not exist, only `- [title](url)` is displayed.

### Generate `llms-full.txt`

`llms-full.txt` contains **links**, **descriptions**, and **markdown-formatted content** for each page.

Its format is as follows:

```txt title="llms-full.txt"
---
url: url
description: optional description
---

page's markdown-formatted content

---

---
url: url
description: optional description
---

page's markdown-formatted content

…
```

The plugin directly merges the content of the markdown files in the document source directory into `llms-full.txt` so that LLM can read and analyze it.

### Generate Markdown Files for Each Page

The plugin generates accessible Markdown files for each page in the format `${url}.md`. For example, `/guide/quick-start.html` will produce a corresponding `/guide/quick-start.md` file.

## Usage

```bash
npm i -D @vuepress/plugin-llms@next
```

```ts title=".vuepress/config.ts"
import { llmstxtPlugin } from '@vuepress/plugin-llms'

export default {
  plugins: [
    llmstxtPlugin({
      // options
    }),
  ],
}
```

## Options

### generateLLMsTxt

- Types: `boolean`

- Default: `true`

- Details: Indicates whether to generate the `llms.txt` file, which contains a list of sections with corresponding links.

### generateLLMsFullTxt

- Types: `boolean`

- Default: `true`

- Details: Determines whether to generate the `llms-full.txt` which contains all the documentation in one file.

### generateLLMFriendlyDocsForEachPage

- Types: `boolean`

- Default: `true`

- Details: Determines whether to generate an LLM-friendly version of the documentation for each page on the website.

### stripHTML

- Types: `boolean`

- Default: `true`

- Details: Whether to strip HTML tags from Markdown files

### workDir

- Types: `string`

- Default: `''` (relative to the vuepress source directory)

- Details:

  The directory from which files will be processed.
  This is useful for configuring the plugin to generate documentation for LLMs in a specific language.

  ```typescript
  llmstxtPlugin({
    // Generate documentation for LLMs from English documentation only
    workDir: 'en',
  })
  ```

### filter

- Types: `(page: Page) => boolean`

- Default: `() => true`

- Details:

  Page filter, when returns `true`, the page will be included in `llms.txt`, otherwise it will be excluded.

### domain

- Types: `string`

- Default: `''`

- Details:

  The domain that will be appended to the beginning of URLs in `llms.txt` and in the context of other files

  Domain attachment is not yet agreed upon (since it depends on the AI whether it can resolve the relative paths that are currently there), but if you want you can add it.

  ```md title="llms.txt"
  - [title](/foo/bar.md) <!-- [!code --] -->
  - [title](https://example.com/foo/bar.md) <!-- [!code ++] -->
  ```

### title

- Types: `string`

- Default: `''`

- Details: The title in `llms.txt`.

### description

- Types: `string`

- Default: `''`

- Details: The description in `llms.txt`.

### details

- Types: `string`

- Default: `''`

- Details: The details in `llms.txt`.

### toc

- Types: `string`

- Default: `''`

- Details:

  The TOC in `llms.txt`, when not set, is also customized via [options > customGenerateTOC](#customgeneratetoc); otherwise, it is automatically generated by the plugin internally.

### customLLMsTxtTemplate

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

  Available template elements include:

  - `{title}`: [options > title](#title), or the title extracted from the frontmatter or the first h1 heading in the main document (`index.md`).
  - `{description}`: [options > description](#description), or the description extracted from the frontmatter section or the main document (`README.md`).
  - `{details}`: [options > details](#details), or the details extracted from the frontmatter section or the main document (`README.md`).
  - `{toc}`: [options > toc](#toc), or [options > customGenerateToc](#customgeneratetoc), or the **Table of Contents** automatically generated within the plugin.
  - [Options > customTemplateVariables](#customtemplatevariables) added custom template variables.

### customTemplateVariables

- Types: `Record<string, string>`

- Default: `{}`

- Details:

  Custom variables for the [options > customLLMsTxtTemplate](#customllmstxttemplate).
  With this option you can edit or add variables to the template.
  You can change the title in `llms.txt` without having to change the template:

  ```typescript
  llmstxtPlugin({
    customTemplateVariables: {
      title: 'Very custom title',
    },
  })
  ```

  You can also combine this with a custom template:

  ```typescript
  llmstxtPlugin({
    customLLMsTxtTemplate: '# {title}\n\n{foo}',
    customTemplateVariables: {
      foo: 'Very custom title',
    },
  })
  ```

### customGenerateTOC

- Types: `(pages: PreparedPage[], options: GenerateTOCOptions) => string`

- Default: `undefined`

- Details:

  Custom generates a Table of Contents (TOC) for the provided prepared pages.

  By default, the plugin only generates a first-level TOC. You can customize it to generate a multi-level TOC using `customGenerateTOC`.

  You can refer to the [customGenerateTOC](https://github.com/vuepress/ecosystem/blob/main/docs/.vuepress/configs/llmstxtTOC.ts) of this documentation site to write a custom function for generating the table of contents.

  The plugin provides the `generateTOCLink(page: PreparedPage, options: GenerateTOCOptions)` function for generating TOC entry links.

  ```ts
  import { generateTOCLink, llmstxtPlugin } from '@vuepress/plugin-llms'

  llmstxtPlugin({
    customGenerateTOC: (pages, options) => {
      return pages.map((page) => generateTOCLink(page, options)).join('')
    },
  })
  ```

## Frontmatter

The following `frontmatter` will be used in the plugin.

### title {#frontmatter-title}

- Types: `string`

- Default: `''`

- Details:

  On the homepage (`README.md`), it serves as an alternative title for `llms.txt`.

  On other pages, it functions as the page title.

### description {#frontmatter-description}

- Types: `string`

- Default: `''`

- Details:

  On the homepage (`README.md`), as an alternative description for `llms.txt`.

  On other pages, as the page description. It is recommended to add concise and clear descriptions to the page, providing key information for the LLM to read the page.

### details {#frontmatter-details}

- Types: `string`

- Default: `''`

- Details:

  Only on the homepage (`README.md`), as an alternative for the details of `llms.txt`.

### llmstxt

- Types: `boolean`

- Default: `true`

- Details: Whether `llms.txt` contain the current page.

## Others

It is recommended to configure redirects so that the AI can use addresses with .md and .txt extensions.

For example, in `Netlify`, configure the following in `public/_redirects`:

```txt
/llms.md         /llms.txt 200!
/llms-full.md    /llms-full.txt 200!
```

Options Syntax documentation: <https://docs.netlify.com/routing/redirects>
