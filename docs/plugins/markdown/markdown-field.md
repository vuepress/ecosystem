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
@theme@ type="ThemeConfig" required default="{ base: '/' }"

Theme Config

@enabled@ type="boolean" optional default="true"

Whether it's enabled

:::
```

By default, all attributes are allowed and displayed as-is. Common attributes include `type`, `required`, `optional`, `default` and `deprecated`.

- `type` is displayed as a code block in the field header.
- `default` is displayed as a labeled code block below the field header.
- `required`, `optional` and `deprecated` are displayed as badges, and a deprecated field's name is colored red and struck through.
- Other attributes are displayed as `Name: value` badges.

### Nesting

Fields can be nested to describe fields of an object type. To create a field item inside another field, increase the starting `@` by one for each level of nesting.

```md
::: fields
@options@ type="object"

Options.

@@options.name@ type="string"

Option name.

@other@ type="string"

Other field.

:::
```

For more syntax details, see [@mdit/plugin-field](https://mdit-plugins.github.io/field.html).

## Demo

::: fields
@theme@ type="ThemeConfig" required default="{ base: '/' }"

Theme Config

@enabled@ type="boolean" optional default="true"

Whether it's enabled

@other@ type="string" deprecated

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
