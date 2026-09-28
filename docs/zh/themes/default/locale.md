---
icon: languages
---

# 语言配置 {#locale-config}

这些选项用于配置与语言相关的文本。

如果你的站点是以英语以外的其他语言提供服务的，你应该为每个语言设置这些选项来提供翻译。

## Options

:::: fields
@`repoLabel` type=string

项目仓库的标签。

它将被用作 _仓库链接_ 的文字。_仓库链接_ 将会显示为导航栏的最后一个元素。

如果你不明确指定该配置项，它将会根据 [repo](./config.md#repo) 配置项自动推断。

@`selectLanguageText` type=string

_选择语言菜单_ 的文字。

如果你在站点配置中设置了多个 [locales](./config.md#locales) ，那么 _选择语言菜单_ 就会显示在导航栏中仓库按钮的旁边。

@`selectLanguageAriaLabel` type=string

_选择语言菜单_ 的 `aria-label` 属性。

它主要是为了站点的可访问性 (a11y) 。

@`selectLanguageName` type=string default=`'English'`

Locale 的语言名称。

该配置项 **仅能在主题配置的 [locales](./config.md#locales) 的内部生效** 。它将被用作 locale 的语言名称，展示在 _选择语言菜单_ 内。

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

导航栏中主导航 `aria-label` 属性的值。

@`pageNavbarLabel` type=`string | null`

下一页/上一页导航 `aria-label` 属性的值。

@`editLinkText` type=string default=`'Edit this page'`

_编辑此页_ 链接的文字。

@`lastUpdatedText` type=string default=`'最近更新'`

_最近更新时间戳_ 标签的文字。

@`contributorsText` type=string default=`'Contributors'`

_贡献者列表_ 标签的文字。

@`tip` type=string default=`'提示'`

提示 [提示容器](./markdown.md#hint-containers) 的默认标题。

@`warning` type=string default=`'注意'`

注意 [提示容器](./markdown.md#hint-containers) 的默认标题。

@`danger` type=string default=`'警告'`

警告 [提示容器](./markdown.md#hint-containers) 的默认标题。

@`important` type=string default=`'重要'`

重要 [提示容器](./markdown.md#hint-containers) 的默认标题。

@`note` type=string default=`'注'`

注 [提示容器](./markdown.md#hint-containers) 的默认标题。

@`notFound` type=`string[]` default=`['There's nothing here.', 'How did we get here?', 'That's a Four-Oh-Four.', 'Looks like we've got some broken links.']`

404 页面的提示信息。

当用户进入 404 页面时，会从数组中随机选取一条信息进行展示。

@`backToHome` type=string default=`'Take me home'`

404 页面中 _返回首页_ 链接的文字。

@`toggleColorMode` type=string default=`'toggle color mode'`

切换颜色模式按钮的标题文字。

它主要是为了站点的可访问性 (a11y) 。

参考：[colorModeSwitch](./config.md#colormodeswitch)

@`toggleSidebar` type=string default=`'toggle sidebar'`

切换侧边栏按钮的标题文字。

它主要是为了站点的可访问性 (a11y) 。

@`prev` type=`string | false` default=`'Prev'`

上一页按钮的文字。设置为 `false` 时，将隐藏上一页按钮。

@`next` type=`string | false` default=`'Next'`

下一页按钮的文字。设置为 `false` 时，将隐藏下一页按钮。

::::
