---
icon: bell
---

# notice

<NpmBadge package="@vuepress/plugin-notice" />

你可以通过此插件添加通知弹窗。

## 使用

```bash
npm i -D @vuepress/plugin-notice@next
```

```ts title=".vuepress/config.ts"
import { noticePlugin } from '@vuepress/plugin-notice'

export default {
  plugins: [
    noticePlugin({
      // 选项
    }),
  ],
}
```

你可以为站点的不同路径设置多个通知。

每个通知配置需要包含一个 `path` 或 `match` 选项，用于匹配路径。`path` 选项为字符串，匹配所有以此开头的路径，`match` 选项为正则表达式，用于测试页面路由路径。

一个通知配置包括:

- `title`: 通知标题，支持文本和 HTMLString
- `content`: 通知内容，支持文本、HTMLString 和 Markdown
  - 使用 `Markdown` 作为内容时，应设置 `contentType` 为 `markdown`
  - 还可以使用 `contentFile` 指定文件绝对路径，文件格式为 `.md` 或 `.html`，从文件中读取通知内容。

- `actions`: 通知操作

  应该是包含以下内容的对象数组:
  - `text`: 动作文本
  - `link` (可选): 操作链接。

    路径名会被当作内部路由链接处理，完整 URL 会被当作外部链接在新窗口打开。

  - `type` (可选): `"default"` 或 `"primary"`

    默认值为 `"default"`。

这是一个例子:

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

此外，我们还为你提供了一些高级选项来控制通知显示。

::: tip 显示控制

默认情况下，每当用户进入网站时都会显示通知，如果用户关闭通知，该通知将在当前会话中保持关闭状态。

为了防止在用户关闭通知后下次访问时再次显示通知，你可以在通知配置中设置 `showOnce: true`。

另外，通知记忆是根据通知标题和通知内容来实现的，你可以设置 `key` 选项来使用你想要的键值，这样你就可以编辑通知而不会打扰已经确认过的用户。

:::

::: tip 全屏

如果要显示全屏弹出窗口，可以在通知配置中使用 `fullscreen: true`。我们建议你将它与 `confirm: true` 一起使用。

通知将显示在屏幕中央，其他地方将被模糊遮罩覆盖。

:::

::: tip 关闭按钮

默认情况下，通知右侧会有一个关闭按钮，用户可以点击关闭。用户也可以通过点击遮罩来关闭全屏通知。

但是，如果你希望用户确认通知，你可以设置 `confirm: true`，这样用户只能通过点击操作按钮来关闭通知。

:::

## 选项

### config

- 类型：`NoticeOptions[]`

  ```ts
  interface NoticeItemOptions {
    /**
     * 通知标题
     */
    title: string

    /**
     * 通知内容
     */
    content?: string

    /**
     * 通知内容类型
     * @default 'html'
     */
    contentType?: 'html' | 'markdown'

    /**
     * 通知内容文件绝对路径, 文件格式支持 `.md` 或 `.html`
     * 优先使用文件内容作为 `content`
     * @example '/path/to/notice.md'
     */
    contentFile?: string

    /**
     * 通知键值
     *
     * @description 用于标识和存储通知的状态
     */
    key?: string

    /**
     * 是否只显示一次通知
     *
     * @default false
     */
    showOnce?: boolean

    /**
     * 通知是否需要确认
     *
     * @default false
     */
    confirm?: boolean

    /**
     * 通知是否应该全屏显示
     *
     * @default false
     */
    fullscreen?: boolean

    /**
     * 通知操作
     */
    actions?: NoticeActionOption[]
  }

  interface NoticePathOptions extends NoticeItemOptions {
    /**
     * 路径前缀匹配
     */
    path: string
  }

  interface NoticeMatchOptions extends NoticeItemOptions {
    /**
     * 匹配通知路径的正则表达式
     */
    match: RegExp
  }

  type NoticeOptions = NoticeMatchOptions | NoticePathOptions
  ```

- 详情：

  通知配置
