---
url: /ecosystem/plugins/features/share.md
---
# share

Add share buttons to your site, so visitors can share pages to social platforms, by email, or as a QR code.

## Usage

```bash
npm i -D @vuepress/plugin-share@next
```

```ts title=".vuepress/config.ts"
import { sharePlugin } from '@vuepress/plugin-share'

export default {
  plugins: [
    sharePlugin({
      // options
    }),
  ],
}
```

The plugin registers a global `Share` component. Add it to any page:

```md
<Share />
```

## Guide

### Share Services

By default, the plugin renders buttons for X (formerly Twitter), Facebook, Reddit, Telegram, WhatsApp, and email.

You can choose the buttons to display on a page with the `services` prop. It accepts a comma separated string or an array of service names:

```md
<Share services="qq,weibo" />

<Share :services="['qq', 'weibo']" />
```

The following built-in services are available:

| Name        | Platform  | Name        | Platform  |
| ----------- | --------- | ----------- | --------- |
| `buffer`    | Buffer    | `douban`    | Douban    |
| `email`     | Email     | `evernote`  | Evernote  |
| `facebook`  | Facebook  | `flipboard` | Flipboard |
| `line`      | LINE      | `linkedin`  | LinkedIn  |
| `messenger` | Messenger | `pinterest` | Pinterest |
| `qq`        | QQ        | `qrcode`    | QR code   |
| `qzone`     | Qzone     | `reddit`    | Reddit    |
| `skype`     | Skype     | `sms`       | SMS       |
| `snapchat`  | Snapchat  | `telegram`  | Telegram  |
| `tumblr`    | Tumblr    | `vk`        | VK        |
| `weibo`     | Weibo     | `whatsapp`  | WhatsApp  |
| `wordpress` | WordPress | `x`         | X         |

Every built-in service is available to the component. The `services` option only decides which buttons are displayed by default, so `<Share services="qq" />` works without listing `qq` in the plugin options.

### Custom Services

You can add a custom service in the `services` option:

```ts title=".vuepress/config.ts"
import { sharePlugin } from '@vuepress/plugin-share'

export default {
  plugins: [
    sharePlugin({
      services: [
        'x',
        {
          name: 'mastodon',
          link: 'https://mastodon.social/share?text=[title]&url=[url]',
          shape: '<svg>...</svg>',
          color: '#6364ff',
        },
      ],
    }),
  ],
}
```

A custom service requires `name`, `link`, and `shape`. It also supports `label`, `color`, `icon`, and `action`:

* `label` overrides the accessible label and tooltip of the button, which default to `name`.
* `shape` is the plain icon. It can be an SVG string, an image URL, or a font icon class.
* `color` is the background color used by the colorful icon.
* `icon` overrides the icon used when `colorful` is enabled.
* `action` is the behavior of the button. See [Actions](#actions).

Custom services are only known to the client when they are provided in the plugin options. To display them by name, pass their names in the `services` prop:

```md
<Share services="x,mastodon" />
```

### Share Data

The link of each service can contain variables wrapped in brackets. They are replaced with the data of the current page:

| Variable      | Description                 |
| ------------- | --------------------------- |
| `title`       | Page title                  |
| `description` | Page description            |
| `url`         | Page URL                    |
| `excerpt`     | Page excerpt                |
| `summary`     | Page summary                |
| `tags`        | Page tags, joined by commas |
| `cover`       | Page cover                  |
| `image`       | First image on the page     |

`description`, `excerpt`, `summary`, `cover`, and `tags` fall back to the matching page frontmatter field, and `description` also falls back to the page meta tags:

```yaml
---
description: A page about VuePress
tag:
  - vuepress
  - plugin
cover: /images/cover.png
---
```

You can override the title, description, excerpt, summary, cover, and tags per page with props that receive the current page. `url` and `image` are always derived from the page:

```md
<Share
  :title-getter="(page) => page.title.toUpperCase()"
  :tag-getter="() => 'vuepress'"
/>
```

### Actions

A service opens its link in a popup window by default. The built-in QR code service uses `qrcode`, and the email service opens a new tab. For custom services, set `action` to one of:

* `popup`: Opens the link in a centered popup window.
* `open`: Opens the link in a new tab.
* `navigate`: Opens the link in the current tab.
* `qrcode`: Shows a QR code of the link.

A custom `qrcode` service receives its link verbatim, so it is not percent-encoded.

### Appearance

Buttons are muted and colored on hover. Use `colorful` to render the brand color:

```md
<Share colorful />
```

Use `inline` to remove the vertical margin, which is useful when the buttons are placed in a paragraph or a layout slot:

```md
<Share inline />
```

## Options

::: fields
@`services` type=`ShareService[]`

Services to display by default. Built-in services are selected by name, and a custom service is provided as an object.

Defaults to `x`, `facebook`, `reddit`, `telegram`, `whatsapp`, and `email`.

See also: [Share Services](#share-services) and [Custom Services](#custom-services).

@`xUserName` type=string

X username used by the `via` parameter of the built-in `x` service.
:::

## Component Props

::: fields
@`services` type=`string | (string | ShareServiceOptions)[]`

Services to display. It can be a comma separated string or an array of names and custom service objects.

Defaults to the `services` plugin option.

@`titleGetter` type=`(page: PageData) => string`

Getter for the share title.

Defaults to the page title.

@`descriptionGetter` type=`(page: PageData) => string | null | undefined`

Getter for the share description.

Defaults to the `description` frontmatter and meta tags.

@`excerptGetter` type=`(page: PageData) => string | null | undefined`

Getter for the share excerpt.

Defaults to the page excerpt and `excerpt` frontmatter.

@`summaryGetter` type=`(page: PageData) => string | null | undefined`

Getter for the share summary.

Defaults to the page summary and `summary` frontmatter.

@`coverGetter` type=`(page: PageData) => string | null | undefined`

Getter for the share cover.

Defaults to the page cover, `cover` frontmatter, and `og:image` meta tag.

@`tagGetter` type=`(page: PageData) => string | string[] | null | undefined`

Getter for the share tags.

Defaults to the `tag` and `tags` frontmatter.

@`inline` type=boolean

Whether to display the buttons inline.

@`colorful` type=boolean

Whether to use colorful icons.
:::
