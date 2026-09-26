---
icon: bell
---

# notice

<NpmBadge package="@vuepress/plugin-notice" />

Add notice popups to your site with this plugin.

## Usage

```bash
npm i -D @vuepress/plugin-notice@next
```

```ts title=".vuepress/config.ts"
import { noticePlugin } from '@vuepress/plugin-notice'

export default {
  plugins: [
    noticePlugin({
      // options
    }),
  ],
}
```

Here is an example:

```ts title=".vuepress/config.ts"
import { noticePlugin } from '@vuepress/plugin-notice'
import { path } from 'vuepress/utils'

export default {
  plugins: [
    noticePlugin({
      config: [
        {
          path: '/',
          title: 'Notice Title',
          content: 'Notice Content',
          actions: [
            {
              text: 'Primary Action',
              link: 'https://theme-hope.vuejs.press/',
              type: 'primary',
            },
            { text: 'Default Action' },
          ],
        },
        {
          path: '/zh/',
          title: 'Notice Title',
          contentType: 'markdown',
          content: '**Notice Content** [link](https://example.com)',
          actions: [
            {
              text: 'Primary Action',
              link: 'https://theme-hope.vuejs.press/',
              type: 'primary',
            },
            { text: 'Default Action' },
          ],
        },
        {
          path: '/example/',
          title: 'Notice Title',
          contentFile: path.resolve(__dirname, 'notice.md'),
          actions: [
            {
              text: 'Primary Action',
              link: 'https://theme-hope.vuejs.press/',
              type: 'primary',
            },
            { text: 'Default Action' },
          ],
        },
      ],
    }),
  ],
}
```

## Guide

### Path Matching

You can set multiple notices for different paths on your site.

Each notice configuration requires either a `path` or `match` option to determine which pages it should appear on. The `path` option is a string that matches all paths starting with it, while the `match` option is a regular expression to test against the page route path.

### Display Control

By default, notices are shown whenever users enter the site, and remain closed for the session if users close them.

To prevent notices from appearing again after users close them (even in future visits), set `showOnce: true` in the notice options.

Notice state is remembered based on the notice title and content. You can set a custom `key` option to use your own identifier, allowing you to edit notice content without bothering users who have already acknowledged them.

### Fullscreen Mode

To display a fullscreen popup, use `fullscreen: true` in the notice options. We recommend combining this with `confirm: true`.

The notice will be displayed in the center of the screen, with other areas covered by a blur mask.

### Close Button

By default, there is a close button on the right side of the notice, allowing users to dismiss it. Users can also close fullscreen notices by clicking the mask.

However, if you want users to acknowledge the notice, set `confirm: true` so users can only close the notice by clicking action buttons.

## Options

::: fields
@`config` type=`NoticeOptions[]` required

Notice configuration. Each item needs a `path` or a `match` to decide which pages the notice appears on, see [Path Matching](#path-matching).

@@`config[*].path` type=string

Path prefix to match.

@@`config[*].match` type=`RegExp`

A regexp matching the notice path.

@@`config[*].title` type=string required

Notice title, which supports both text and HTML strings.

@@`config[*].content` type=string

Notice content, which supports text, HTML strings, and Markdown. Set `contentType` to `markdown` when using Markdown.

@@`config[*].contentType` type=`'html' | 'markdown'` default=`'html'`

Notice content type.

@@`config[*].contentFile` type=string

Absolute path of the notice content file, whose format should be `.md` or `.html`. The file content is used as `content` with a higher priority.

@@`config[*].key` type=string

Notice key, used to identify and store the notice status.

See also: [Display Control](#display-control).

@@`config[*].showOnce` type=boolean

Whether to show the notice only once instead of on every visit.

See also: [Display Control](#display-control).

@@`config[*].confirm` type=boolean

Whether the notice shall be confirmed.

See also: [Close Button](#close-button).

@@`config[*].fullscreen` type=boolean

Whether the notice should appear fullscreen.

See also: [Fullscreen Mode](#fullscreen-mode).

@@`config[*].actions` type=`NoticeActionOption[]`

Notice actions.

@@@`config[*].actions[*].text` type=string required

Action text.

@@@`config[*].actions[*].link` type=string

Action link. Pathnames are treated as internal route links and handled by the router, while full URLs are treated as external links and opened in a new window.

@@@`config[*].actions[*].type` type=`'default' | 'primary'` default=`'default'`

Action type.

:::
