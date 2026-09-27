---
icon: fa-regular:copyright
---

# copyright

<NpmBadge package="@vuepress/plugin-copyright" />

此插件可以在访问者从你的站点复制内容时，自动追加版权信息，也可以禁止站点的复制或者选择。

## 使用

```bash
npm i -D @vuepress/plugin-copyright@next
```

```ts title=".vuepress/config.ts"
import { copyrightPlugin } from '@vuepress/plugin-copyright'

export default {
  plugins: [
    copyrightPlugin({
      // options
    }),
  ],
}
```

## 指南

### 启用版权信息

此插件**默认全局禁用**。你可以:

- 在特定页面的 frontmatter 中设置 `copy: true` 手动开启。
- 在插件选项中设置 `global: true` 让其全局生效，并在页面的 frontmatter 中设置 `copy: false` 禁用它。

处于不打扰用户的考虑，默认配置下仅当复制长度超过 100 时才会追加版权信息。如果你希望改变这个触发值，你可以插件选项中设置 `triggerLength`，或在页面 frontmatter 单独设置 `copy.triggerLength`。

你可以通过插件的 `author` 和 `license` 选项设置全局作者和协议信息。

如果文档的不同部分拥有不同的作者和协议，你可以通过 `authorGetter` 和 `licenseGetter` 传入一个使用当前页面对象作为参数的函数 `(page: Page) => string` 并通过它返回相应信息。

插件会默认通过模板从作者、协议和页面链接生成版权信息，并在复制时追加。如果你认为这不够灵活，你可以设置 `copyrightGetter` 返回一个完全由你自定义的版权信息，或返回 null 以使用默认模板。

### 禁用复制和选择

如果你希望禁止用户复制较长内容，你可以在插件选项中设置 `maxLength` 控制这个临界值，或在页面 frontmatter 中设置 `copy.maxLength`。

- 如果你不希望用户复制你的整个站点或特定页面文字，你可以在插件选项中设置 `disableCopy` 或在页面 frontmatter 中设置 `copy.disableCopy` 来禁用复制。后者具有更高优先级。
- 如果你不希望用户选择你的整个站点或特定页面文字，你可以在插件选项中设置 `disableSelection` 或在页面 frontmatter 中设置 `copy.disableSelection` 来禁用文字选择。后者具有更高优先级。

## 选项

:::: fields
@`author` type=string

默认作者信息。

@`license` type=string

默认协议信息。

@`authorGetter` type=`(page: Page) => string | null`

作者信息获取器。它以当前页面对象作为参数，返回作者信息。

@`licenseGetter` type=`(page: Page) => string | null`

协议信息获取器。它以当前页面对象作为参数，返回协议信息。

@`copyrightGetter` type=`(page: Page) => string | null`

版权信息获取器。它以当前页面对象作为参数，返回完全由你自定义的版权信息，或返回 `null` 以使用默认模板。

@`canonical` type=string

首选域名与部署目录，它将作为追加的版权信息中的参考链接。

::: tip 例子

如果你在 `https://myblog.com` 和 `https://blog.com/username/` 下部署相同的内容，你可能希望选择一个站点作为首选链接。

- 如果你倾向于使用第一个，你应该将 `canonical` 设置为 `https://myblog.com`
- 如果你倾向于使用第二个，你应该将 `canonical` 设置为 `https://blog.com/username/`

这样，在另一个站点触发的版权信息也会指向你的首选站点。

:::

@`global` type=boolean

是否全局启用插件。

参考：[启用版权信息](#启用版权信息)。

@`disableCopy` type=boolean

是否禁用复制。

参考：[禁用复制和选择](#禁用复制和选择)。

@`disableSelection` type=boolean

是否禁用选择。

参考：[禁用复制和选择](#禁用复制和选择)。

@`triggerLength` type=number default=`100`

触发附加版权的最小内容长度。

@`maxLength` type=number default=`0`

允许复制的最大内容长度，`0` 意味着无限制。

@`locales` type=`CopyrightPluginLocaleConfig`

插件的多语言配置。

::: details 内置支持语言

- **简体中文** (zh-CN)
- **繁体中文** (zh-TW)
- **英文(美国)** (en-US)
- **德语** (de-DE)
- **俄语** (ru-RU)
- **乌克兰语** (uk-UA)
- **越南语** (vi-VN)
- **葡萄牙语** (pt)
- **波兰语** (pl-PL)
- **法语** (fr-FR)
- **西班牙语** (es-ES)
- **斯洛伐克语** (sk-SK)
- **日语** (ja-JP)
- **土耳其语** (tr-TR)
- **韩语** (ko-KR)
- **芬兰语** (fi-FI)
- **匈牙利语** (hu-HU)
- **印尼语** (id-ID)
- **荷兰语** (nl-NL)

:::

@@`locales.<localePath>.author` type=string

作者文字，其中的 `:author` 将会被作者替换。

@@`locales.<localePath>.license` type=string

协议文字，其中的 `:license` 会被当前协议替换。

@@`locales.<localePath>.link` type=string

链接文字，其中的 `:link` 会替换为当前页面链接。

```ts title=".vuepress/config.ts"
import { copyrightPlugin } from '@vuepress/plugin-copyright'

export default {
  locales: {
    '/': {
      // this is a supported language
      lang: 'en-US',
    },
    '/xx/': {
      // the plugin does not support this language
      lang: 'mm-NN',
    },
  },

  plugins: [
    copyrightPlugin({
      locales: {
        '/': {
          // Override link text
          link: 'Original posted at :link',
        },

        '/xx/': {
          // Complete locale config for `mm-NN` language here
        },
      },
    }),
  ],
}
```

::::

## Frontmatter

### copy.triggerLength

- 类型：`number`
- 默认值：`100`
- 详情：触发附加版权的最小内容长度

### copy.maxLength

- 类型：`number`
- 默认值：`0`
- 详情：允许复制的最大内容长度，`0` 意味着无限制

### copy.disableCopy

- 类型：`boolean`
- 默认值：`false`
- 详情：禁用复制

### copy.disableSelection

- 类型：`boolean`
- 默认值：`false`
- 详情：禁用选择
