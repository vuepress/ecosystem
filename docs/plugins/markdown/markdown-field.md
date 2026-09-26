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

Inside the container, a line starting with `@` followed by an inline code is a field item. Attributes are appended after the closing backtick.

```md
::: fields
@`theme` type=ThemeConfig required default=`{ base: '/' }`

Theme Config

@`enabled` type=boolean optional default=`true`

Whether it's enabled

:::
```

### Field Name

The name is an inline code, so it follows the inline code syntax and is always closed on the same line. This allows a path that describes a nested type to be written directly, such as an array element or a record value:

```md
::: fields
@`contributors.info[*].username` type=string

The username of each contributor.

@`locales.<localePath>.title` type=string

The title of each locale, where `<localePath>` is a locale path like `/` or `/zh/`.

:::
```

`[*]` marks an array element, and `<key>` marks the value of a `Record`. Both are kept in the rendered name, while they are stripped when generating the [field id](#field-id).

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
@`size` type=number default=`320px`

Rendered as inline code.

@`timeout` type=number default="Determined by the theme, set it explicitly to override"

Rendered as plain text.

:::
```

### Field Id

Each field item gets an `id` generated from its name, so that you can link to it directly (e.g. `#theme`). The id is generated with the same slugify function as headings (`markdown.anchor.slugify`, falling back to `markdown.slugify`), and is unique within the page.

Array and record placeholders are stripped from the id: `contributors.info[*].username` gets `#contributors-info-username`, and `locales.<localePath>.title` gets `#locales-localepath-title`.

### Nesting

Fields can be nested to describe fields of an object type. To create a field item inside another field, increase the starting `@` by one for each level of nesting.

```md
::: fields
@`options` type=object

Options.

@@`options.name` type=string

Option name.

@`other` type=string

Other field.

:::
```

### Escaping

Escape the `@` with `\` to keep a marker-like line as content:

```md
::: fields
@`theme` type=object

\@`not-a-field`
:::
```

For more syntax details, see [@mdit/plugin-field](https://mdit-plugins.github.io/field.html).

## Demo

::: fields
@`theme` type=ThemeConfig required default=`{ base: '/' }`

Theme Config

@`enabled` type=boolean optional default=`true`

Whether it's enabled

@`timeout` type=number default="Determined by the theme, set it explicitly to override"

Descriptive default, rendered as plain text.

@`other` type=string deprecated

Deprecated field

:::

## Options

::: fields
@`fields` type=boolean

Whether to enable the `::: fields` container.

@`locales` type=`MarkdownFieldPluginLocaleConfig`

Locale config for badge texts, keyed by locale path (`/`, `/zh/`, ...).

@@`locales.<localePath>.default` type=string

Label text for the `default` attribute.

@@`locales.<localePath>.required` type=string

Badge text for the `required` attribute.

@@`locales.<localePath>.optional` type=string

Badge text for the `optional` attribute.

@@`locales.<localePath>.deprecated` type=string

Badge text for the `deprecated` attribute.

:::
