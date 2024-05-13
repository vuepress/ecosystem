# Locale Config

These options configure locale-related texts.

If your site is served in a different language besides English, you should set these options per locale to provide translations.

## selectLanguageText

- Type: `string`
- Default: `'Change language'`
- Details:

  Can be used to customize the aria-label of the language toggle button in navbar.

  This option will **only take effect inside** the [locales](./config.md#locales) of your theme config.

## selectLanguageName

- Type: `string`

- Details:

  Specify the name of the language of a locale.

  This option will **only take effect inside** the [locales](./config.md#locales) of your theme config. It will be used as the language name of the locale, which will be displayed in the _select language menu_.

- Example:

```ts
export default {
  locales: {
    '/': {
      lang: 'en-US',
    },
    '/zh/': {
      lang: 'zh-CN',
    },
  },
  theme: defaultTheme({
    locales: {
      '/': {
        selectLanguageName: 'English',
      },
      '/zh/': {
        selectLanguageName: '简体中文',
      },
    },
  }),
}
```

## outlineTitle

- Type: `string`

- Default: `'On this page'`

- Details:

  The title to be displayed on the outline.

## sidebarMenuLabel

- Type: `string`

- Default: `'Menu'`

- Details:

  Can be used to customize the sidebar menu label. This label is only displayed in the mobile view.

## darkModeSwitchLabel

- Type: `string`

- Default: `'Appearance'`

- Details:

  Can be used to customize the dark mode switch label. This label is only displayed in the mobile view.

## lightModeSwitchTitle

- Type: `string`

- Default: `'Switch to light theme'`

- Details:

  Can be used to customize the light mode switch title that appears on hovering.

## darkModeSwitchTitle

- Type: `string`

- Default: `'Switch to dark theme'`

- Details:

  Can be used to customize the dark mode switch title that appears on hovering.

## editLinkText

- Type: `string`

- Default: `'Edit this page'`

- Details:

  Specify the text of the _edit this page_ link.

## lastUpdatedText

- Type: `string`

- Default: `'Last Updated'`

- Details:

  Specify the text of the _last updated timestamp_ label.

## contributorsText

- Type: `string`

- Default: `'Contributors'`

- Details:

  Specify the text of the _contributors list_ label.

## returnToTopLabel

- Type: `string`

- Default: `Return to top`

- Details:

  Can be used to customize the label of the return to top button. This label is only displayed in the mobile view.

## notFound

- Type: `NotFoundOptions`

- Details:

  Customize text of 404 page.

```ts
export default {
  theme: defaultTheme({
    notFound: {
      title: 'PAGE NOT FOUND',
      quote:
        "But if you don't change your direction, and if you keep looking, you may end up where you are heading.",
      linkLabel: 'go to home',
      linkText: 'Take me home',
      code: '404',
    },
  }),
}
```

```ts
interface NotFoundOptions {
  /**
   * Set custom not found message.
   */
  title?: string

  /**
   * Set custom not found description.
   */
  quote?: string

  /**
   * Set aria label for home link.
   */
  linkLabel?: string

  /**
   * Set custom home link text.
   */
  linkText?: string

  /**
   * @default '404'
   */
  code?: string
}
```
