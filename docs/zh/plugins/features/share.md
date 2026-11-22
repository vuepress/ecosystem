---
icon: fa-solid:share-nodes
---

# share

<NpmBadge package="@vuepress/plugin-share" />

为站点添加分享按钮，让访客可以将页面分享到社交平台、通过邮件发送，或以二维码形式分享。

## 使用

```bash
npm i -D @vuepress/plugin-share@next
```

```ts title=".vuepress/config.ts"
import { sharePlugin } from '@vuepress/plugin-share'

export default {
  plugins: [
    sharePlugin({
      // 配置项
    }),
  ],
}
```

插件会注册全局的 `Share` 组件，在任意页面中添加：

```md
<Share />
```

## 指南

### 分享服务

默认情况下，插件会显示 X（原 Twitter）、Facebook、Reddit、Telegram、WhatsApp 和邮件的分享按钮。

你可以通过 `services` 属性选择页面上显示的按钮。它接受逗号分隔的字符串或服务名称数组：

```md
<Share services="qq,weibo" />

<Share :services="['qq', 'weibo']" />
```

支持以下内置服务：

| 名称        | 平台      | 名称        | 平台      |
| ----------- | --------- | ----------- | --------- |
| `buffer`    | Buffer    | `douban`    | 豆瓣      |
| `email`     | 邮件      | `evernote`  | Evernote  |
| `facebook`  | Facebook  | `flipboard` | Flipboard |
| `line`      | LINE      | `linkedin`  | LinkedIn  |
| `messenger` | Messenger | `pinterest` | Pinterest |
| `qq`        | QQ        | `qrcode`    | 二维码    |
| `qzone`     | QQ 空间   | `reddit`    | Reddit    |
| `skype`     | Skype     | `sms`       | 短信      |
| `snapchat`  | Snapchat  | `telegram`  | Telegram  |
| `tumblr`    | Tumblr    | `vk`        | VK        |
| `weibo`     | 微博      | `whatsapp`  | WhatsApp  |
| `wordpress` | WordPress | `x`         | X         |

所有内置服务都可被组件使用。`services` 选项只决定默认显示哪些按钮，因此无需在插件选项中列出 `qq` 也可以使用 `<Share services="qq" />`。

### 自定义服务

你可以在 `services` 选项中添加自定义服务：

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

自定义服务需要提供 `name`、`link` 和 `shape`，还支持 `label`、`color`、`icon` 与 `action`：

- `label` 覆盖按钮的无障碍标签和提示，默认使用 `name`。
- `shape` 是纯色图标，可以是 SVG 字符串、图片链接或字体图标类名。
- `color` 是彩色图标的背景色。
- `icon` 会覆盖启用 `colorful` 时使用的图标。
- `action` 是按钮的行为，参见[行为](#行为)。

只有插件选项中提供的自定义服务才会被客户端知晓。要按名称显示它们，请在 `services` 属性中传入名称：

```md
<Share services="x,mastodon" />
```

### 分享数据

每个服务的链接可以包含使用方括号包裹的变量，它们会被替换为当前页面的数据：

| 变量          | 说明                   |
| ------------- | ---------------------- |
| `title`       | 页面标题               |
| `description` | 页面描述               |
| `url`         | 页面链接               |
| `excerpt`     | 页面摘要               |
| `summary`     | 页面综述               |
| `tags`        | 页面标签，使用逗号连接 |
| `cover`       | 页面封面               |
| `image`       | 页面中的第一张图片     |

`description`、`excerpt`、`summary`、`cover` 和 `tags` 会回退到页面 frontmatter 中的同名字段，`description` 还会回退到页面的 meta 标签：

```yaml
---
description: 一篇关于 VuePress 的文章
tag:
  - vuepress
  - plugin
cover: /images/cover.png
---
```

你可以通过接收当前页面的属性覆盖标题、描述、摘要、综述、封面和标签，`url` 与 `image` 始终由页面推导：

```md
<Share
  :title-getter="(page) => page.title.toUpperCase()"
  :tag-getter="() => 'vuepress'"
/>
```

### 行为

服务默认在弹窗中打开链接。内置的二维码服务使用 `qrcode`，邮件服务会在新标签页打开。自定义服务可以将 `action` 设置为：

- `popup`：在居中的弹窗中打开链接。
- `open`：在新标签页中打开链接。
- `navigate`：在当前标签页中打开链接。
- `qrcode`：显示链接的二维码。

自定义的 `qrcode` 服务会原样使用链接，不会进行百分号编码。

### 外观

按钮默认呈浅色，悬停时显示主题色。使用 `colorful` 可以显示品牌色：

```md
<Share colorful />
```

使用 `inline` 可以移除垂直外边距，适合将按钮放在段落或布局插槽中：

```md
<Share inline />
```

## 选项

::: fields
@`services` type=`ShareService[]`

默认显示的分享服务。内置服务通过名称选择，自定义服务通过对象提供。

默认为 `x`、`facebook`、`reddit`、`telegram`、`whatsapp` 和 `email`。

参考：[分享服务](#分享服务)与[自定义服务](#自定义服务)。

@`xUserName` type=string

X 用户名，用于内置 `x` 服务的 `via` 参数。
:::

## 组件属性

::: fields
@`services` type=`string | (string | ShareServiceOptions)[]`

要显示的分享服务。可以是逗号分隔的字符串，也可以是名称和自定义服务对象组成的数组。

默认使用插件的 `services` 选项。

@`titleGetter` type=`(page: PageData) => string`

分享标题的获取函数。

默认为页面标题。

@`descriptionGetter` type=`(page: PageData) => string | null | undefined`

分享描述的获取函数。

默认为 `description` frontmatter 和 meta 标签。

@`excerptGetter` type=`(page: PageData) => string | null | undefined`

分享摘要的获取函数。

默认为页面摘要与 `excerpt` frontmatter。

@`summaryGetter` type=`(page: PageData) => string | null | undefined`

分享综述的获取函数。

默认为页面综述与 `summary` frontmatter。

@`coverGetter` type=`(page: PageData) => string | null | undefined`

分享封面的获取函数。

默认为页面封面、`cover` frontmatter 与 `og:image` meta 标签。

@`tagGetter` type=`(page: PageData) => string | string[] | null | undefined`

分享标签的获取函数。

默认为 `tag` 与 `tags` frontmatter。

@`inline` type=boolean

是否行内显示按钮。

@`colorful` type=boolean

是否使用彩色图标。
:::
