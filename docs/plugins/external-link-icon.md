# external-link-icon

<NpmBadge package="@vuepress/plugin-external-link-icon" />

This plugin will add an icon to the external link in your markdown content, i.e. <ExternalLinkIcon />

This plugin has been integrated into the default theme.

## Usage

```bash
npm i -D @vuepress/plugin-external-link-icon@next
```

```ts
import { externalLinkIconPlugin } from '@vuepress/plugin-external-link-icon'

export default {
  plugins: [
    externalLinkIconPlugin({
      // options
    }),
  ],
}
```

## Options

### locales

- Type: `Record<string, { openInNewWindow: string }>`

- Details:

  The a11y text of the external link icon in different locales.

  If this option is not specified, it will fallback to default text.

- Example:

```ts
export default {
  plugins: [
    externalLinkIconPlugin({
      locales: {
        '/': {
          openInNewWindow: 'open in new window',
        },
        '/zh/': {
          openInNewWindow: '在新窗口打开',
        },
      },
    }),
  ],
}
```

- Also see:
  - [Guide > I18n](https://vuejs.press/guide/i18n.html)

## Frontmatter

### externalLinkIcon

- Type: `boolean`

- Details:

  Whether to append an external link icon to external links in current page.

## Styles

You can customize the style of the external link icon via CSS variables:

@[code css](@vuepress/plugin-external-link-icon/src/client/styles/vars.css)

## Components

### ExternalLinkIcon

- Details:

  This plugin will register a `<ExternalLinkIcon />` component globally, and you can use it without any props.

::: tip
This component is mainly used for theme development. You don't need to use it directly in most cases.
:::
