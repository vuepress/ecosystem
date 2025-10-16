---
icon: clipboard-copy
---

# copy-code

<NpmBadge package="@vuepress/plugin-copy-code" />

该插件为代码块右上角自动添加复制按钮，方便用户复制代码内容。

该插件已集成到默认主题中。

## 使用

```bash
npm i -D @vuepress/plugin-copy-code@next
```

```ts title=".vuepress/config.ts"
import { copyCodePlugin } from '@vuepress/plugin-copy-code'

export default {
  plugins: [
    copyCodePlugin({
      // options
    }),
  ],
}
```

## 选项

### selector

- 类型：`string | string[]`
- 默认值：`'[vp-content] div[class*="language-"] pre'`
- 详情：

  代码块的 CSS 选择器，用于确定需添加复制按钮的代码块范围

### showInMobile

- 类型：`boolean`
- 默认值：`false`
- 详情：

  是否在移动端设备上显示复制按钮。默认情况下，移动端不显示复制按钮以避免干扰内容浏览

### duration

- 类型：`number`
- 默认值：`2000`
- 详情：

  复制成功提示消息的显示时间（毫秒）。设置为 `0` 将禁用提示信息

### ignoreSelector

- 类型：`string[] | string`
- 默认值：`""`
- 详情：

  指定复制代码时需要忽略的元素选择器。匹配的元素在复制时将被排除。

  例如：`['.token.comment']` 将在复制时忽略代码块中所有带有类名 `.token.comment` 的元素（在 `prismjs` 高亮情况下，这会自动跳过注释内容）

### inline

- 类型：`string[] | string | boolean`
- 默认值：`false`
- 详情：

  配置行内代码（inline code）的双击复制功能：
  - 设置为 `true`：启用默认选择器 `'[vp-content] :not(pre) > code'` 匹配行内代码元素
  - 设置为 `false`：禁用行内代码双击复制功能
  - 设置为自定义选择器：使用指定的选择器匹配行内代码元素

### transform <Badge type="tip" text="仅限组合式 API" />

- 类型：`(preElement: HTMLPreElement) => void`
- 详情：

  一个转换器，用于在复制之前对 `<pre>` 中代码块内容进行修改。该选项仅在使用 `useCopyCode()` 时有效。

- 示例：

  ```ts title=".vuepress/client.ts"
  import { useCopyCode } from '@vuepress/plugin-copy-code/client'

  export default {
    setup() {
      useCopyCode({
        transform: (preElement) => {
          // 删除 `.ignore` 类名的元素
          preElement.querySelectorAll('.ignore').forEach((el) => el.remove())
          // 插入版权信息
          preElement.innerHTML += `\n Copied by VuePress`
        },
        // ...其它选项
      })
    },
  }
  ```

### locales

- 类型：`CopyCodePluginLocaleConfig`

  ```ts
  interface CopyCodePluginLocaleData {
    /**
     * 复制文字
     */
    copy: string

    /**
     * 已复制文字
     */
    copied: string
  }

  interface CopyCodePluginLocaleConfig {
    [localePath: string]: Partial<CopyCodePluginLocaleData>
  }
  ```

- 详情：

  复制按钮插件的国际化配置。

- 示例：

  ```ts title=".vuepress/config.ts"
  import { copyCodePlugin } from '@vuepress/plugin-copy-code'

  export default {
    locales: {
      '/': {
        // 这是一个支持的语言
        lang: 'zh-CN',
      },
      '/xx/': {
        // 这是一个没有收到插件支持的语言
        lang: 'mm-NN',
      },
    },

    plugins: [
      copyCodePlugin({
        locales: {
          '/': {
            // 覆盖复制按钮标签文字
            copy: '复制此段代码',
          },

          '/xx/': {
            // 在这里完整设置 `mm-NN` 的多语言配置
          },
        },
      }),
    ],
  }
  ```

::: details 内置支持语言

- **简体中文** (zh-CN)
- **繁体中文** (zh-TW)
- **英文(美国)** (en-US)
- **德语** (de-DE)
- **德语(澳大利亚)** (de-AT)
- **俄语** (ru-RU)
- **乌克兰语** (uk-UA)
- **越南语** (vi-VN)
- **葡萄牙语** (pt)
- **波兰语** (pl-PL)
- **法语** (fr-FR)
- **西班牙语** (es-ES)
- **斯洛伐克** (sk-SK)
- **日语** (ja-JP)
- **土耳其语** (tr-TR)
- **韩语** (ko-KR)
- **芬兰语** (fi-FI)
- **印尼语** (id-ID)
- **荷兰语** (nl-NL)

:::

## 样式

你可以通过 CSS 变量来自定义*复制按钮*的样式：

@[code{1-6} css](@vuepress/plugin-copy-code/src/client/styles/vars.css)
