# icon

<NpmBadge package="@vuepress/plugin-icon" />

Provides icon component.

## Usage

```bash
npm i -D @vuepress/plugin-icon@next
```

```ts
import { iconPlugin } from '@vuepress/plugin-icon'

export default {
  plugins: [
    iconPlugin({
      // options
    }),
  ],
}
```

We support multiple types of icons:

- `fontawesome`
- `iconify`
- `iconfont`

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
    content: string

    /**
     * Notice key
     *
     * @description Used to identify and store the icon status
     */
    key?: string

    /**
     * Whether show icon only once or show it in every visit
     *
     * @default false
     */
    showOnce?: boolean

    /**
     * Whether the icon shall be confirmed
     *
     * @default false
     */
    confirm?: boolean

    /**
     * Whether the icon should appear fullscreen
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
     * A regexp matching icon path
     */
    match: RegExp
  }

  type NoticeOptions = NoticeMatchOptions | NoticePathOptions
  ```

- Details:

  Notice configuration.
