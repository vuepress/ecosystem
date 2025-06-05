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

You can set multiple notices for different paths on your site.

Each notice configuration requires either a `path` or `match` option to determine which pages it should appear on. The `path` option is a string that matches all paths starting with it, while the `match` option is a regular expression to test against the page route path.

A notice configuration includes:

- `title`: Notice title, supports both text and HTML strings
- `content`: Notice content, supports text, HTML strings, and Markdown

  - When using Markdown as content, set `contentType` to `markdown`.

  - You can also use `contentFile` to specify the absolute path of a file (`.md` or `.html` format) to read the notice content from.

- `actions`: Notice actions

  An array of objects containing:

  - `text`: Action text
  - `link`: Action link (optional).

    Pathnames are treated as internal route links and handled by the router, while full URLs are treated as external links and opened in a new window.

  - `type`: `"default"` or `"primary"` (optional)

    Default value is `"default"`.

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

We also provide advanced options to control notice display behavior.

::: tip Display Control

By default, notices are shown whenever users enter the site, and remain closed for the session if users close them.

To prevent notices from appearing again after users close them (even in future visits), set `showOnce: true` in the notice options.

Notice state is remembered based on the notice title and content. You can set a custom `key` option to use your own identifier, allowing you to edit notice content without bothering users who have already acknowledged them.

:::

::: tip Fullscreen Mode

To display a fullscreen popup, use `fullscreen: true` in the notice options. We recommend combining this with `confirm: true`.

The notice will be displayed in the center of the screen, with other areas covered by a blur mask.

:::

::: tip Close Button

By default, there is a close button on the right side of the notice, allowing users to dismiss it. Users can also close fullscreen notices by clicking the mask.

However, if you want users to acknowledge the notice, set `confirm: true` so users can only close the notice by clicking action buttons.

:::

## Options

### config

- Type: `NoticeOptions[]`

  ```ts
  interface NoticeItemOptions {
    /**
     * Notice title
     */
    title: string

    /**
     * Notice content
     */
    content?: string

    /**
     * Notice content type
     * @default 'html'
     */
    contentType?: 'html' | 'markdown'

    /**
     * Notice content file absolute path, file format should be `.md` or `.html`.
     * Prioritize using the file content as `content`.
     * @example '/path/to/notice.md'
     */
    contentFile?: string

    /**
     * Notice key
     *
     * @description Used to identify and store the notice status
     */
    key?: string

    /**
     * Whether show notice only once or show it in every visit
     *
     * @default false
     */
    showOnce?: boolean

    /**
     * Whether the notice shall be confirmed
     *
     * @default false
     */
    confirm?: boolean

    /**
     * Whether the notice should appear fullscreen
     *
     * @default false
     */
    fullscreen?: boolean

    /**
     * Notice actions
     */
    actions?: NoticeActionOption[]
  }

  interface NoticePathOptions extends NoticeItemOptions {
    /**
     * Path prefix to match
     */
    path: string
  }

  interface NoticeMatchOptions extends NoticeItemOptions {
    /**
     * A regexp matching notice path
     */
    match: RegExp
  }

  type NoticeOptions = NoticeMatchOptions | NoticePathOptions
  ```

- Details:

  Notice configuration.
