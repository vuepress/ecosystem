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

Large Language Models (LLMs) increasingly rely on web-based documentation to answer user queries and write code. However, standard websites present significant challenges: context windows are limited, and raw HTML—cluttered with navigation, scripts, and styling—is token-expensive and difficult to parse.

**llms.txt** bridges this gap. It creates a standardized entry point for AI agents, providing a concise summary of your project and direct links to clean, expert-level documentation. This is particularly critical for development tools, ensuring LLMs have accurate, low-noise access to your APIs and guides.

### Plugin Overview

This plugin automatically converts your VuePress documentation into a structured dataset optimized for machine reading.

During the build process, it generates the following assets in your output directory:

```txt
📂 .vuepress/dist
├── ...
├── llms.txt                # The entry point / map of your documentation
├── llms-full.txt           # A single file containing your entire documentation
├── markdown-examples.html  # Your standard web page
└── markdown-examples.md    # The clean Markdown version of that page
```

::: tip
These files are generated **only during the production build** (i.e., when running `vuepress build`). They will appear in the `.vuepress/dist` directory alongside your HTML files.
:::

## Output Files

### 1. `llms.txt`

The `llms.txt` file acts as the primary index for AI agents. It contains the **Title**, **Description**, **Details (Optional)**, and a **Table of Contents (TOC)** for your site.

You can view the generated file for this documentation site here: llms.txt.

**Default Format:**

```md title="llms.txt"
# Title

> Description

Details (Optional)

## Table of Contents

- [Title](url): Description
- [Title](url): Description
- ...
```

**Content Resolution Logic:**

The plugin determines the content for these fields based on the following priority order (highest priority first):

* **Site Title:**
  1. `llmsTxtTemplateGetter.title`
  2. `heroText` in the homepage frontmatter
  3. The current locale's [title](https://v2.vuepress.vuejs.org/reference/config.html#locales) in the VuePress config
  4. The main [title](https://v2.vuepress.vuejs.org/reference/config.html#title) in the VuePress config
  5. The page title of the locale homepage (`README.md`)

* **Site Description:**
  1. `llmsTxtTemplateGetter.description`
  2. `tagline` in the locale homepage frontmatter
  3. The current locale's [description](https://v2.vuepress.vuejs.org/reference/config.html#locales) in the VuePress config
  4. The main [description](https://v2.vuepress.vuejs.org/reference/config.html#description) in the VuePress config
  5. `frontmatter.description` in the locale homepage (`README.md`)

* **Site Details (Optional):**
  1. `llmsTxtTemplateGetter.details`
  2. `frontmatter.details` in the locale homepage (`README.md`)

* **Table of Contents (TOC):**
  Formatted as `- [title](url): description`. The `description` is pulled from the page's `frontmatter.description`.

  By default, a flat, first-level TOC is generated. You can customize this behavior (e.g., to support multi-level nesting) by defining a custom getter in the [`llmsTxtTemplateGetter`](#llmstxttemplategetter) option.

### 2. `llms-full.txt`

The `llms-full.txt` file is a concatenated version of your documentation. It merges the content of all Markdown files into a single text stream, allowing LLMs to ingest your entire knowledge base in one request.

You can view the full file for this site here: llms-full.txt.

**Format:**

```txt title="llms-full.txt"
---
url: /path/to/page
description: A brief summary of the page
---

# Page Title

Full Markdown content of the page...

---

---
url: /path/to/next-page
description: ...
---

...
```

### 3. Individual Page Content

In addition to the summary files, the plugin generates a clean Markdown file for every HTML page in your site.

For example, if your site has a page at `/guide/quick-start.html`, the plugin generates a corresponding `/guide/quick-start.md` file. This allows LLMs to fetch specific pages with zero HTML noise.

## Options

### llmsTxt

* Type: `boolean`

* Default: `true`

* Details: Specifies whether to generate the `llms.txt` file (the index file containing links to section summaries).

### llmsFullTxt

* Type: `boolean`

* Default: `true`

* Details: Specifies whether to generate the `llms-full.txt` file (a consolidated text file containing the entire documentation).

### llmsPageTxt

* Type: `boolean`

* Default: `true`

* Details: Specifies whether to generate individual LLM-friendly Markdown files for each page of the website.

### stripHTML

* Type: `boolean`

* Default: `true`

* Details: Determines whether HTML tags should be stripped from the generated Markdown files to ensure cleaner input for LLMs.

### filter

* Type: `(page: Page) => boolean`

* Default: `() => true`

* Details:

  A function to filter which pages are included. If the function returns `true`, the page is included in `llms.txt`.

  Note that pages explicitly disabled via `frontmatter.llmstxt` or pages not generated from Markdown sources will always be excluded, regardless of this setting.

### domain

* Type: `string`

* Default: `''`

* Details:

  An optional domain to prepend to all URLs in `llms.txt` and other generated files.

  While standard relative paths are often sufficient, some AI agents may handle absolute URLs better. Use this option if you need to enforce fully qualified URLs (e.g., `https://example.com/foo/bar.md`).

  ```md title="llms.txt"
  - [title](/foo/bar.md) <!-- [!code --] -->
  - [title](https://example.com/foo/bar.md) <!-- [!code ++] -->
  ```

### locale

* Types: `string | 'all'`

* Default: `'/'`

* Details:

  Controls which locale to generate content for.

  * If unset, it defaults to the site's root locale.
  * If set to a specific locale key (e.g., `'/zh/'`), it generates files only for that language.
  * If set to `'all'`, the plugin generates `llms.txt` resources for every configured locale.

  ：：： tip Why use `'all'`?

  If your documentation contains specialized terminology or concepts that LLMs struggle to translate accurately, generating dedicated `llms.txt` files for each language ensures that international users (and their AI assistants) receive the most precise information available.

  :::

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

  Defines the structure of the `llms.txt` file. You can rearrange the default placeholders—`{title}`, `{description}`, `{details}`, and `{toc}`—or introduce new ones using `llmsTxtTemplateGetter`.

### llmsTxtTemplateGetter

* Type: `TemplateGetterOptions`

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

* Default: `{}`

* Details:

  Provides custom variables or getter functions for the [`llmsTxtTemplate`](#llmstxttemplate).

  You can use this to inject static strings or dynamically generated content.

  **Example: Overriding the title**

  ```ts
  llmsPlugin({
    llmsTxtTemplateGetter: {
      title: 'My Custom Docs Title',
    },
  })
  ```

  **Example: Adding a custom variable**

  ```ts
  llmsPlugin({
    llmsTxtTemplate: '# {title}\n\n{customNote}',
    llmsTxtTemplateGetter: {
      customNote: 'Note: This content is optimized for AI agents.',
    },
  })
  ```

  **Example: Generating a custom list of pages**

  ```ts
  llmsPlugin({
    llmsTxtTemplate: '# {title}\n\n## Page List\n\n{pageList}',
    llmsTxtTemplateGetter: {
      pageList: (pages, state) =>
        pages.map((page) => `- ${page.title}`).join('\n'),
    },
  })
  ```

### transformMarkdown

* Type: `(markdown: string, page: LLMPage) => string`

* Default: `undefined`

* Details:

  A function used to modify the Markdown content of a page. It accepts a Markdown string and a page object as parameters and returns the modified Markdown string.

  You can use it to apply custom Markdown formatting operations.

  ```ts
  llmsPlugin({
    transformMarkdown: (markdown, page) => {
      // Add custom Markdown formatting operations
      return markdown
    },
  })
  ```

## Frontmatter

The plugin respects the following `frontmatter` properties in your Markdown files.

### title {#frontmatter-title}

* Types: `string`
* Details:
  * On the **homepage** (`README.md`), this overrides the site title in `llms.txt`.
  * On **regular pages**, this serves as the page title in the Table of Contents.

### description {#frontmatter-description}

* Types: `string`
* Details:

  * On the **homepage** (`README.md`), this overrides the site description in `llms.txt`.
  * On **regular pages**, this provides the page summary in the Table of Contents.

  *Recommendation: Write clear, concise descriptions for every page to help LLMs understand the context and relevance of the link.*

### heroText {#frontmatter-herotext}

* Types: `string`
* Details:
  * Used exclusively on the homepage (locale `README.md`). It serves as the primary title source for `llms.txt`.

### tagline {#frontmatter-tagline}

* Types: `string`
* Details:
  * Used exclusively on the homepage (locale `README.md`). It serves as the primary description source for `llms.txt`.

### details {#frontmatter-details}

* Types: `string`
* Details:
  * Used exclusively on the homepage (locale `README.md`). It provides the content for the `{details}` section in `llms.txt`.

### llmstxt

* Types: `boolean`
* Default: `true`
* Details:
  * Controls whether the current page is included in the generated LLM files. Set to `false` to hide a specific page from AI agents.

## Markup Extensions

### `<llm-only>`

You can add content in a file that is visible to LLMs but not to humans, which helps set special instructions, such as "Refer to basic-queries for demos," "Do not execute...", "Always use... in cases of...", etc.

To do this, wrap the content with the `<llm-only>` tag.

```md
<llm-only>

## Section for LLMs

This content appears only in the generated LLM file and will not include the `<llm-only>` tag itself.

</llm-only>
```

You can also use the `<llm-only>` tag inline, but note that only one `<llm-only>` tag can be included per line; otherwise, it will cause a parsing error.

```md
Check the plugin API guide for documentation on creating plugins.

<llm-only>For LLMs only</llm-only>
```

### `<llm-exclude>`

You can add content in a file that is visible to humans but not to LLMs, which is the opposite of `<llm-only>`:

```md
<llm-exclude>

## Section for humans

This content will not appear in the files generated for LLMs.

</llm-exclude>
```

You can also use the `<llm-exclude>` tag inline, but note that only one `<llm-only>` tag can be included per line; otherwise, it will cause a parsing error.

```md
Check the plugin API guide for documentation on creating plugins.

<llm-exclude>For humans only</llm-exclude>
```

## Others

It is recommended to configure server redirects so that AI agents can reliably access files via `.md` or `.txt` extensions, even if they guess the URL structure.

For example, on **Netlify**, add the following to `public/_redirects`:

```txt
/llms.md         /llms.txt 200!
/llms-full.md    /llms-full.txt 200!
```

For more details on redirect syntax, refer to the [Netlify documentation](https://docs.netlify.com/routing/redirects).
