---
url: /ecosystem/themes/default/locale.md
---
# Locale Config

These options configure locale-related texts.

If your site is served in a different language besides English, you should set these options per locale to provide translations.

## Options

:::: fields
@`repoLabel` type=string

Specify the repository label of your project.

This will be used as the text of the *repository link*, which will be displayed as the last item of the navbar.

If you don't set this option explicitly, it will be automatically inferred from the [repo](./config.md#repo) option.

@`selectLanguageText` type=string

Specify the text of the *select language menu*.

The *select language menu* will appear next to the repository button in the navbar when you set multiple [locales](./config.md#locales) in your site config.

@`selectLanguageAriaLabel` type=string

Specify the `aria-label` attribute of the *select language menu*.

This is mainly for a11y purpose.

@`selectLanguageName` type=string default=`'English'`

Specify the name of the language of a locale.

This option will **only take effect inside** the [locales](./config.md#locales) of your theme config. It will be used as the language name of the locale, which will be displayed in the *select language menu*.

```ts title=".vuepress/config.ts"
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

@`navbarLabel` type=`string | null`

Specify the `aria-label` value for main navigation in navbar.

@`pageNavbarLabel` type=`string | null`

Specify the `aria-label` value for next/previous page navigation.

@`editLinkText` type=string default=`'Edit this page'`

Specify the text of the *edit this page* link.

@`lastUpdatedText` type=string default=`'Last Updated'`

Specify the text of the *last updated timestamp* label.

@`contributorsText` type=string default=`'Contributors'`

Specify the text of the *contributors list* label.

@`tip` type=string default=`'Tips'`

Specify the default title of the tip [hint container](./markdown.md#hint-containers).

@`warning` type=string default=`'Warning'`

Specify the default title of the warning [hint container](./markdown.md#hint-containers).

@`danger` type=string default=`'Caution'`

Specify the default title of the danger [hint container](./markdown.md#hint-containers).

@`important` type=string default=`'Important'`

Specify the default title of the important [hint container](./markdown.md#hint-containers).

@`note` type=string default=`'Note'`

Specify the default title of the note [hint container](./markdown.md#hint-containers).

@`notFound` type=`string[]` default=`['There's nothing here.', 'How did we get here?', 'That's a Four-Oh-Four.', 'Looks like we've got some broken links.']`

Specify the messages of the 404 page.

The message will be randomly picked from the array when users enter the 404 page.

@`backToHome` type=string default=`'Take me home'`

Specify the text of the *back to home* link in the 404 page.

@`toggleColorMode` type=string default=`'toggle color mode'`

Title text for the color mode toggle button.

This is mainly for a11y purpose.

See also: [colorModeSwitch](./config.md#colormodeswitch)

@`toggleSidebar` type=string default=`'toggle sidebar'`

Title text for sidebar toggle button.

This is mainly for a11y purpose.

@`prev` type=`string | false` default=`'Prev'`

Text for the previous page navigation button.

Set to `false` to disable the previous page navigation button.

@`next` type=`string | false` default=`'Next'`

Text for the next page navigation button.

Set to `false` to disable the next page navigation button.

::::
