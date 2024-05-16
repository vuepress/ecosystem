# 语言配置

这些选项用于配置与语言相关的文本。

如果你的站点是以英语以外的其他语言提供服务的，你应该为每个语言设置这些选项来提供翻译。

## selectLanguageText

- 类型： `string`
- 默认值： `'Change language'`
- 详情：

  用于自定义导航栏中语言切换按钮的 `aria-label` 。

  此选项仅在您主题配置的[locales](./config.md#locales)中生效。

## selectLanguageName

- 类型： `string`

- 详情：

  Locale 的语言名称。

  该配置项 **仅能在主题配置的 [locales](./config.md#locales) 的内部生效** 。它将被用作 locale 的语言名称，展示在 _选择语言菜单_ 内。

- 示例：

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

- 类型： `string`

- 默认值： `'此页内容'`

- 详情：

  显示在 outline 上的标题。

## sidebarMenuLabel

- 类型： `string`

- 默认值： `'Menu'`

- 详情：

  用于自定义侧边栏菜单标签，该标签仅在移动端视图中显示。

## darkModeSwitchLabel

- 类型： `string`

- 默认值： `'Appearance'`

- 详情：

  用于自定义深色模式开关标签，该标签仅在移动端视图中显示。

## lightModeSwitchTitle

- 类型： `string`

- 默认值： `'Switch to light theme'`

- 详情：

  用于自定义悬停时显示的浅色模式开关标题。

## darkModeSwitchTitle

- 类型： `string`

- 默认值： `'Switch to dark theme'`

- 详情：

  用于自定义悬停时显示的深色模式开关标题。

## editLinkText

- 类型： `string`

- 默认值： `'Edit this page'`

- 详情：

  _编辑此页_ 链接的文字。

## lastUpdatedText

- 类型： `string`

- 默认值： `'Last Updated'`

- 详情：

  _最近更新时间戳_ 标签的文字。

## contributorsText

- 类型： `string`

- 默认值： `'Contributors'`

- 详情：

  _贡献者列表_ 标签的文字。

## returnToTopLabel

- 类型： `string`

- 默认值： `Return to top`

- 详情：

  用于自定义返回顶部按钮的标签，该标签仅在移动端视图中显示。

## notFound

- 类型： `NotFoundOptions`

- 详情：

  用于自定义 404 页面 的内容.

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
   * 自定义 页面未找到 消息。
   */
  title?: string

  /**
   * 自定义 页面的未找到 描述。
   */
  quote?: string

  /**
   * 自定义 返回首页 按钮的 aria-label
   */
  linkLabel?: string

  /**
   * 自定义返回首页按钮的文字
   */
  linkText?: string

  /**
   * @default '404'
   */
  code?: string
}
```

## container

- 类型： `ContainerOptions`

- 详情：

  用于自定义 提示容器 的标题。

```ts
export default {
  theme: defaultTheme({
    container: {
      infoLabel: 'INFO',
      noteLabel: 'NOTE',
      tipLabel: 'TIP',
      warningLabel: 'WARNING',
      dangerLabel: 'DANGER',
      detailsLabel: 'DETAILS',
      importantLabel: 'IMPORTANT',
      cautionLabel: 'CAUTION',
    },
  }),
}
```

```ts
interface ContainerOptions {
  infoLabel?: string
  noteLabel?: string
  tipLabel?: string
  warningLabel?: string
  dangerLabel?: string
  detailsLabel?: string
  importantLabel?: string
  cautionLabel?: string
}
```
