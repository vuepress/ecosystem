# 语言配置

这些选项用于配置与语言相关的文本。

如果你的站点是以 **内置语言支持** 以外的其他语言提供服务的，你应该为每个语言设置这些选项来提供翻译。

::: details 内置语言支持

- 简体中文 (zh-CN)
- 繁体中文 (zh-TW)
- 英文(美国) (en-US)
- 德语 (de-DE)
- 德语(澳大利亚) (de-AT)
- 俄语 (ru-RU)
- 乌克兰语 (uk-UA)
- 越南语 (vi-VN)
- 葡萄牙语(巴西) (pt-BR)
- 波兰语 (pl-PL)
- 法语 (fr-FR)
- 西班牙语 (es-ES)
- 斯洛伐克 (sk-SK)
- 日语 (ja-JP)
- 土耳其语 (tr-TR)
- 韩语 (ko-KR)
- 芬兰语 (fi-FI)
- 印尼语 (id-ID)
- 荷兰语 (nl-NL)

:::

## selectLanguageText

- 类型： `string`
- 默认值： `'选择语言'`
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
      title: '页面未找到',
      quote: '如果你不改变方向，继续寻找，最终可能会到达你正在前往的地方。',
      linkLabel: '回到首页',
      linkText: '回到首页',
      code: '404',
    },
  }),
}
```

```ts
interface NotFoundOptions {
  /**
   * 自定义 页面未找到 的标题
   * @default '页面未找到'
   */
  title?: string

  /**
   * 自定义 页面的未找到 的描述。
   * @default '如果你不改变方向，继续寻找，最终可能会到达你正在前往的地方。'
   */
  quote?: string

  /**
   * 设置首页链接的 aria 标签。
   * @default '回到首页'
   */
  linkLabel?: string

  /**
   * 设置首页链接文本。
   * @default '回到首页'
   */
  linkText?: string

  /**
   * @default '404'
   */
  code?: string
}
```

## docFooter

- 类型： `DocFooter`

- 详情：

  可用于自定义出现在上一页和下一页链接上方的文本。
  如果不是用英语编写文档，则非常有帮助。还可以用于全局禁用上一页/下一页链接。

```ts
export default {
  theme: defaultTheme({
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
  }),
}
```

```ts
export interface DocFooter {
  prev?: string | false
  next?: string | false
}
```
