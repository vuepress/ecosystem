# Waline 选项

## 选项

### serverURL

- 类型：`string`
- 必填：是
- 详情：Waline 的服务端地址。

### emoji

- 类型：`(WalineEmojiInfo | WalineEmojiPresets)[] | false`

  ```ts
  type WalineEmojiPresets = `http://${string}` | `https://${string}`

  interface WalineEmojiInfo {
    /**
     * 选项卡上的 Emoji 名称
     */
    name: string
    /**
     * 所在文件夹链接
     */
    folder?: string
    /**
     * Emoji 通用路径前缀
     */
    prefix?: string
    /**
     * Emoji 图片的类型，会作为文件扩展名使用
     */
    type?: string
    /**
     * 选项卡显示的 Emoji 图标
     */
    icon: string
    /**
     * Emoji 图片列表
     */
    items: string[]
  }
  ```

- 默认值：`['//unpkg.com/@waline/emojis@1.1.0/weibo']`
- 参考：
  - [自定义表情](https://waline.js.org/guide/features/emoji.html)
- 详情：评论系统的表情设置。

### dark

- 类型：`string | boolean`
- 默认值：`false`
- 参考：
  - [自定义样式](https://waline.js.org/guide/features/style.html)
- 详情：暗黑模式支持。设置为 `true` 开启，`'auto'` 跟随设备偏好，或 CSS 选择器条件激活。

### commentSorting

- 类型：`WalineCommentSorting`
- 默认值：`'latest'`
- 详情：评论列表排序方式。可选值: `'latest'`、`'oldest'` 或 `'hottest'`。

### meta

- 类型：`string[]`
- 默认值：`['nick', 'mail', 'link']`
- 详情：评论者相关属性。可选值: `'nick'`、`'mail'`、`'link'`。

### requiredMeta

- 类型：`string[]`
- 默认值：`[]`
- 详情：

  评论必填字段。可选值：
  - `[]` - 无必填字段
  - `['nick']` - 昵称必填
  - `['nick', 'mail']` - 昵称和邮箱必填

### login

- 类型：`string`
- 默认值：`'enable'`
- 详情：

  登录模式。可选值：
  - `'enable'` - 启用登录（默认）
  - `'disable'` - 禁用登录，用户填写信息
  - `'force'` - 强制登录

### wordLimit

- 类型：`number | [number, number]`
- 默认值：`0`
- 详情：评论字数限制。单个数字设置最大字数，`0` 为无限制。

### pageSize

- 类型：`number`
- 默认值：`10`
- 详情：每页评论数量。

### imageUploader <Badge text="仅限客户端配置" type="warning"/>

- 类型：`WalineImageUploader | false`

  ```ts
  type WalineImageUploader = (image: File) => Promise<string>
  ```

- 参考：
  - [Cookbook → 自定义图片上传](https://waline.js.org/cookbook/customize/upload-image.html)
- 详情：自定义图片上传方法。默认内嵌 Base64，设置 `false` 禁用。

### highlighter <Badge text="仅限客户端配置" type="warning"/>

- 类型：`WalineHighlighter | false`

  ```ts
  type WalineHighlighter = (code: string, lang: string) => string
  ```

- 参考：
  - [Cookbook → 自定义代码高亮](https://waline.js.org/cookbook/customize/highlighter.html)
- 详情：代码高亮功能。默认使用 `hanabi`，设置 `false` 禁用。

### texRenderer <Badge text="仅限客户端配置" type="warning"/>

- 类型：`WalineTexRenderer | false`

  ```ts
  type WalineTexRenderer = (blockMode: boolean, tex: string) => string
  ```

- 参考：
  - [Cookbook → 自定义 TeX 渲染器](https://waline.js.org/cookbook/customize/tex-renderer.html)
  - [MathJax](https://www.mathjax.org/)
  - [KaTeX](https://katex.org/)
- 详情：

  自定义 TeX 渲染。默认显示预览模式不支持 TeX 的消息。函数提供两个参数：第一个参数指示是否应该在块级渲染，第二个参数是 TeX 内容的字符串。返回 HTML 字符串作为渲染结果。

  你可以导入 TeX 渲染器来提供预览功能。我们推荐你使用 KaTeX 或 MathJax，或设置 `false` 禁用 TeX 解析。

### search <Badge text="仅限客户端配置" type="warning"/>

- 类型：`WalineSearchOptions | false`

  ```ts
  interface WalineSearchImageData extends Record<string, unknown> {
    /**
     * 图片链接
     */
    src: string

    /**
     * 图片标题
     *
     * @description 用于图片的 alt 属性
     */
    title?: string

    /**
     * 图片缩略图
     *
     * @description 为了更好的加载性能，我们会优先在列表中使用此缩略图
     *
     * @default src
     */
    preview?: string
  }

  type WalineSearchResult = WalineSearchImageData[]

  interface WalineSearchOptions {
    /**
     * 搜索操作
     */
    search: (word: string) => Promise<WalineSearchResult>

    /**
     * 打开列表时展示的默认结果
     *
     * @default () => search('')
     */
    default?: () => Promise<WalineSearchResult>

    /**
     * 获取更多的操作
     *
     * @description 会在列表滚动到底部时触发，如果你的搜索服务支持分页功能，你应该设置此项实现无限滚动
     *
     * @default (word) => search(word)
     */
    more?: (word: string, currentCount: number) => Promise<WalineSearchResult>
  }
  ```

- 详情：图片搜索功能。设置 `false` 禁用内置搜索。

### recaptchaV3Key

- 类型：`string`
- 详情：reCAPTCHA V3 站点密钥。服务端还需设置 `RECAPTCHA_V3_SECRET` 环境变量。

### reaction

- 类型：`boolean | string[]`
- 默认值：`false`
- 详情：文章表情反应。设置 `true` 使用默认表情，或提供自定义表情 URL 数组（最多8个）。

### metaIcon <Badge text="仅限插件选项" type="warning" />

- 类型：`boolean`
- 默认值：`true`
- 详情：是否导入 Meta 图标。

### locales <Badge text="仅限插件选项" type="warning" />

- 类型：`WalineLocales`

  ```ts
  interface WalineLocales {
    [localePath: string]: Partial<WalineLocale>
  }
  ```

- 参考：
  - [Waline 多语言配置](https://waline.js.org/cookbook/customize/locale.html)
- 详情：Waline 多语言配置。

## 配置

### 插件选项

在插件中配置可序列化选项：

```ts title=".vuepress/config.ts"
import { commentPlugin } from '@vuepress/plugin-comment'

export default {
  plugins: [
    commentPlugin({
      provider: 'Waline',
      serverURL: 'https://waline.example.com',
      // 其他选项...
    }),
  ],
}
```

### 客户端配置

使用 `defineWalineConfig` 配置选项：

```ts title=".vuepress/client.ts"
import { defineWalineConfig } from '@vuepress/plugin-comment/client'
import { defineClientConfig } from 'vuepress/client'

defineWalineConfig({
  // Waline 配置选项
})
```
