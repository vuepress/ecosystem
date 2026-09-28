---
icon: clipboard-copy
---

# copy-code

<NpmBadge package="@vuepress/plugin-copy-code" />

该插件为代码块右上角自动添加复制按钮，方便用户复制代码内容。

该插件已集成到默认主题中。

## 使用 {#usage}

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

## 选项 {#options}

:::: fields
@`selector` type=`string[] | string` default=`'[vp-content] div[class*="language-"] pre'`

代码块的 CSS 选择器，用于确定需添加复制按钮的代码块范围。

@`showInMobile` type=boolean

是否在移动端设备上显示复制按钮。默认情况下，移动端不显示复制按钮以避免干扰内容浏览。

@`duration` type=number default=`2000`

复制成功提示消息的显示时间（毫秒）。设置为 `0` 将禁用提示信息。

@`ignoreSelector` type=`string[] | string`

指定复制代码时需要忽略的元素选择器。匹配的元素在复制时将被排除。

例如：`['.token.comment']` 将在复制时忽略代码块中所有带有类名 `.token.comment` 的元素（在 `prismjs` 高亮情况下，这会自动跳过注释内容）。

@`inline` type=`string[] | boolean | string`

配置行内代码（inline code）的双击复制功能：

- 设置为 `true`：启用默认选择器 `'[vp-content] :not(pre) > code'` 匹配行内代码元素。
- 设置为 `false`：禁用行内代码双击复制功能。
- 设置为自定义选择器：使用指定的选择器匹配行内代码元素。

@`locales` type=`CopyCodePluginLocaleConfig`

插件的多语言配置。

参考：[多语言配置](../supported-locales.md)。

@@`locales.<localePath>.copy` type=string

复制按钮的文字。

@@`locales.<localePath>.copied` type=string

复制成功后的提示文字。

::::

## 客户端配置 {#client-config}

### defineCopyCodeConfig(config)

- 类型：`(config: MaybeRefOrGetter<CopyCodeClientOptions>) => void`

在客户端中定义额外的复制代码选项。此处接受插件的[全部选项](#options)，且此处定义的选项会覆盖 Node 中定义的选项。

通常来说，大部分选项应该在 Node 中定义，但存在一些特殊情况。例如你需要传入 `transform` 之类的回调函数（它无法在 Node 中声明），或者需要根据客户端环境来决定选项。

```ts title=".vuepress/client.ts"
import { defineCopyCodeConfig } from '@vuepress/plugin-copy-code/client'

defineCopyCodeConfig({
  selector: '.custom-code',
  duration: 3000,
})
```

### transform

- 类型：`(preElement: HTMLPreElement) => void`
- 默认值：`undefined`
- 详情：

  一个转换器，用于在复制之前对 `<pre>` 中代码块内容进行修改。

  该选项**仅限客户端**，因为回调函数无法在 Node 配置中声明。

- 示例：

  ```ts title=".vuepress/client.ts"
  import { defineCopyCodeConfig } from '@vuepress/plugin-copy-code/client'

  defineCopyCodeConfig({
    transform: (preElement) => {
      // 删除 `.ignore` 类名的元素
      preElement.querySelectorAll('.ignore').forEach((el) => el.remove())
      // 插入版权信息
      preElement.innerHTML += `\n Copied by VuePress`
    },
  })
  ```

## 样式 {#styles}

你可以通过 CSS 变量来自定义*复制按钮*的样式：

@[code{1-6} css](@vuepress/plugin-copy-code/src/client/styles/vars.scss)
