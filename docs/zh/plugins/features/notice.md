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

## 指南

### 路径匹配

你可以为站点的不同路径设置多个通知。

每个通知配置需要包含一个 `path` 或 `match` 选项，用于匹配路径。`path` 选项为字符串，匹配所有以此开头的路径，`match` 选项为正则表达式，用于测试页面路由路径。

### 显示控制

默认情况下，每当用户进入网站时都会显示通知，如果用户关闭通知，该通知将在当前会话中保持关闭状态。

为了防止在用户关闭通知后下次访问时再次显示通知，你可以在通知配置中设置 `showOnce: true`。

另外，通知记忆是根据通知标题和通知内容来实现的，你可以设置 `key` 选项来使用你想要的键值，这样你就可以编辑通知而不会打扰已经确认过的用户。

### 全屏模式

如果要显示全屏弹出窗口，可以在通知配置中使用 `fullscreen: true`。我们建议你将它与 `confirm: true` 一起使用。

通知将显示在屏幕中央，其他地方将被模糊遮罩覆盖。

### 关闭按钮

默认情况下，通知右侧会有一个关闭按钮，用户可以点击关闭。用户也可以通过点击遮罩来关闭全屏通知。

但是，如果你希望用户确认通知，你可以设置 `confirm: true`，这样用户只能通过点击操作按钮来关闭通知。

## 选项

::: fields
@`config` type=`NoticeOptions[]` required

通知配置。每一项都需要一个 `path` 或 `match` 来决定通知出现在哪些页面，参见[路径匹配](#路径匹配)。

@@`config[*].path` type=string

路径前缀匹配。

@@`config[*].match` type=`RegExp`

匹配通知路径的正则表达式。

@@`config[*].title` type=string required

通知标题，支持文本和 HTMLString。

@@`config[*].content` type=string

通知内容，支持文本、HTMLString 和 Markdown。使用 Markdown 时需将 `contentType` 设为 `markdown`。

@@`config[*].contentType` type=`'html' | 'markdown'` default=`'html'`

通知内容类型。

@@`config[*].contentFile` type=string

通知内容文件的绝对路径，文件格式支持 `.md` 或 `.html`。文件内容会作为 `content` 使用，优先级更高。

@@`config[*].key` type=string

通知键值，用于标识和存储通知的状态。

参考：[显示控制](#显示控制)。

@@`config[*].showOnce` type=boolean

是否只显示一次通知，而非每次访问都显示。

参考：[显示控制](#显示控制)。

@@`config[*].confirm` type=boolean

通知是否需要确认。

参考：[关闭按钮](#关闭按钮)。

@@`config[*].fullscreen` type=boolean

通知是否应该全屏显示。

参考：[全屏模式](#全屏模式)。

@@`config[*].actions` type=`NoticeActionOption[]`

通知操作。

@@@`config[*].actions[*].text` type=string required

动作文本。

@@@`config[*].actions[*].link` type=string

操作链接。路径名会被当作内部路由链接处理，完整 URL 会被当作外部链接在新窗口打开。

@@@`config[*].actions[*].type` type=`'default' | 'primary'` default=`'default'`

操作类型。

:::
