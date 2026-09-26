---
icon: list-checks
---

# markdown-field

<NpmBadge package="@vuepress/plugin-markdown-field" />

Add fields to your VuePress site.

## Usage

```bash
npm i -D @vuepress/plugin-markdown-field@next
```

```ts title=".vuepress/config.ts"
import { markdownFieldPlugin } from '@vuepress/plugin-markdown-field'

export default {
  plugins: [
    markdownFieldPlugin({
      // Enable fields
      fields: true,
    }),
  ],
}
```

## Syntax

You can use `::: fields` container to describe field information, including field name, type, whether it's required, default value, etc.

Inside the container, lines starting with `@name@` are field items. Attributes are appended after the closing `@`.

```md
::: fields
@theme@ type=ThemeConfig required default=`{ base: '/' }`

Theme Config

@enabled@ type=boolean optional default=`true`

Whether it's enabled

:::
```

### Attributes

By default, all attributes are allowed and displayed as-is. Common attributes include `type`, `required`, `optional`, `default` and `deprecated`.

- `type` is displayed as inline code in the field header.
- `default` is displayed below the field header with a label. It is rendered as inline code when wrapped in backticks, and as plain text otherwise.
- `required`, `optional` and `deprecated` are displayed as badges, and a deprecated field's name is colored red and struck through.
- Other attributes are displayed as `Name: value` badges.

Attribute values can be unquoted or wrapped in `"`, `'` or backticks:

- An unquoted value ends at the first whitespace, so values containing spaces must be quoted.
- Values wrapped in `"` or `'` support escaping with `\`.
- Values wrapped in backticks are kept literal, with no escaping applied.

Since `default` is rendered as plain text unless it is wrapped in backticks, use backticks for literal values and quotes for descriptions:

```md
::: fields
@size@ type=number default=`320px`

Rendered as inline code.

@timeout@ type=number default="Determined by the theme, set it explicitly to override"

Rendered as plain text.

:::
```

### Field Id

Each field item gets an `id` generated from its name, so that you can link to it directly (e.g. `#theme`). The id is generated with the same slugify function as headings (`markdown.anchor.slugify`, falling back to `markdown.slugify`), and is unique within the page.

### Nesting

Fields can be nested to describe fields of an object type. To create a field item inside another field, increase the starting `@` by one for each level of nesting.

```md
::: fields
@options@ type=object

Options.

@@options.name@ type=string

Option name.

@other@ type=string

Other field.

:::
```

For more syntax details, see [@mdit/plugin-field](https://mdit-plugins.github.io/field.html).

## Demo

::: fields
@theme@ type=ThemeConfig required default=`{ base: '/' }`

Theme Config

@enabled@ type=boolean optional default=`true`

Whether it's enabled

@timeout@ type=number default="Determined by the theme, set it explicitly to override"

Descriptive default, rendered as plain text.

@other@ type=string deprecated

Deprecated field

:::

## Options

### fields

- Type: `boolean`
- Details: Whether to enable fields.

### locales

- Type: `MarkdownFieldPluginLocaleConfig`

```ts
interface MarkdownFieldPluginLocaleData {
  /**
   * Label text for the `default` attribute
   */
  default: string

  /**
   * Badge text for the `required` attribute
   */
  required: string

  /**
   * Badge text for the `optional` attribute
   */
  optional: string

  /**
   * Badge text for the `deprecated` attribute
   */
  deprecated: string
}
```

- Details: Locale config for badge texts.
