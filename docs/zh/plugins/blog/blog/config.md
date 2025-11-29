---
title: 配置
icon: settings-2
---

## 插件选项

### getInfo

- 类型：`(page: Page) => Record<string, unknown>`
- 参考:
  - [指南 → 收集信息](./guide.md#收集信息)
- 详情:

  用于从页面中提取文章信息的函数。

  提取的信息会被注入到路由元数据 (route meta) 中，使其可以通过客户端组合式 API 访问。

### filter

- 类型：`(page: Page) => boolean`
- 默认值：`(page) => Boolean(page.filePathRelative) && !page.frontmatter.home`
- 参考:
  - [指南 → 文章收集](./guide.md#文章收集)
- 详情:

  用于确定哪些页面被视为博客文章的函数。

  默认情况下，它包含所有从 Markdown 文件生成的页面，但排除主页。

### category

- 类型：`BlogCategoryOptions[]`
- 参考:
  - [指南 → 自定义类别和类型](./guide.md#自定义类别和类型)
- 详情：博客分类配置，详见 [博客分类配置](#博客分类配置)。

### type

- 类型：`BlogTypeOptions[]`
- 参考：
  - [指南 → 自定义类别和类型](./guide.md#自定义类别和类型)
- 详情：博客类型配置，详见 [博客类型配置](#博客类型配置)。

### slugify

- 类型：`(name: string) => string`
- 默认值：`(name) => name.replace(/ _/g, '-').replace(/[:?*|\\/<>]/g, "").toLowerCase()`
- 详情: 将字符串转换为 URL 友好的 slug 的函数，用于路由注册。

### excerpt

- 类型：`boolean`
- 默认值：`true`
- 参考: [指南 → 生成摘要](./guide.md#generating-excerpt)
- 详情: 启用或禁用页面摘要生成。

### excerptSeparator

- 类型：`string`
- 默认值：`<!-- more -->`
- 参考:
  - [指南 → 生成摘要](./guide.md#generating-excerpt)
- 详情: 内容中用于手动定义摘要的分隔符。

### excerptLength

- 类型：`number`
- 默认值：`300`
- 参考:
  - [指南 → 生成摘要](./guide.md#generating-excerpt)
- 详情:

  自动生成摘要的目标长度。

  ::: tip

  生成器会在达到或超过此长度的最近位置截断文本。

  设置为 `0` 可禁用自动摘要生成。

  :::

### excerptFilter

- 类型：`(page: Page) => boolean`
- 默认值: 与 `filter` 选项相同
- 参考:
  - [指南 → 生成摘要](./guide.md#generating-excerpt)
- 详情:

  用于过滤摘要生成的页面的函数。

  ::: tip

  使用此选项可将某些页面排除在自动摘要生成之外。例如，如果 `excerpt` 或 `description` 已经在 Frontmatter 中定义，你可能更愿意直接使用这些值。

  :::

### isCustomElement

- 类型：`(tagName: string) => boolean`
- 默认值：`() => false`
- 参考:
  - [指南 → 生成摘要](./guide.md#generating-excerpt)
- 详情:

  用于识别自定义元素的函数。

  这用于区分自定义元素和未知标签，后者在摘要生成过程中会被剥离。

### metaScope

- 类型：`string`
- 默认值：`"_blog"`
- 详情:

  提取的信息注入到路由元数据下的键名。

  ::: tip

  将此设置为空字符串会直接将信息注入到路由元数据的根对象中，而不是嵌套在一个字段下。

  :::

### hotReload

- 类型：`boolean`
- 默认值: 如果使用了 `--debug` 标志则启用
- 详情:

  在开发服务器中启用热重载支持。

  ::: tip 致主题开发者

  由于在包含大量分类和类型的站点上可能会有性能影响，此选项默认禁用。在编辑 Markdown 时，它也可能会减慢热更新速度。

  建议仅在用户积极添加或组织分类/标签时启用此功能。对于日常使用，建议保持禁用。

  此外，你也可以通过检测用户项目中的页面数量来决定是否通过编程方式启用它。

  :::

## 博客分类配置

博客分类配置配置接受一个数组，其中每个项目定义一个特定的分类规则。

```ts
interface BlogCategoryOptions {
  /**
   * 唯一的分类名称
   */
  key: string

  /**
   * 从页面获取分类的函数
   */
  getter: (page: Page) => string[]

  /**
   * 自定义页面排序函数
   */
  sorter?: (pageA: Page, pageB: Page) => number

  /**
   * 注册页面的路径模式
   *
   * @description `:key` 将被替换为原始 key 的 "slugify" 结果
   *
   * @default `/:key/`
   */
  path?: string | false

  /**
   * 页面布局名称
   *
   * @default 'Layout'
   */
  layout?: string

  /**
   * Frontmatter 配置
   */
  frontmatter?: (localePath: string) => Record<string, string>

  /**
   * Item 页面的路径模式或自定义函数
   *
   * @description 当填入字符串时，`:key` 和 `:name` 将被替换为原始 key 和 name 的 "slugify" 结果
   *
   * @default `/:key/:name/`
   */
  itemPath?: string | false | ((name: string) => string)

  /**
   * Item 页面布局名称
   *
   * @default 'Layout'
   */
  itemLayout?: string

  /**
   * Items 的 Frontmatter 配置
   */
  itemFrontmatter?: (name: string, localePath: string) => Record<string, string>
}
```

## 博客类型配置

博客类型配置接受一个数组，其中每个项目定义一个特定的类型规则。

```ts
interface BlogTypeOptions {
  /**
   * 唯一的类型名称
   */
  key: string

  /**
   * 一个过滤函数，用于确定页面是否属于该类型
   */
  filter: (page: Page) => boolean

  /**
   * 自定义页面排序函数
   */
  sorter?: (pageA: Page, pageB: Page) => number

  /**
   * 注册页面的路径模式
   *
   * @default '/:key/'
   */
  path?: string

  /**
   * 布局名称
   *
   * @default 'Layout'
   */
  layout?: string

  /**
   * Frontmatter 配置
   */
  frontmatter?: (localePath: string) => Record<string, string>
}
```

## 组合式 API (Composition API)

可以通过 `@vuepress/plugin-blog/client` 导入以下 API。

- 博客分类

  ```ts
  const useBlogCategory: <
    T extends Record<string, unknown> = Record<string, unknown>,
  >(
    key?: string,
  ) => ComputedRef<BlogCategoryData<T>>
  ```

  `key` 参数代表唯一的分类 key。如果未提供 key，插件会尝试从当前路由推断 key。

- 博客类型

  ```ts
  const useBlogType: <
    T extends Record<string, unknown> = Record<string, unknown>,
  >(
    key?: string,
  ) => ComputedRef<BlogTypeData<T>>
  ```

  `key` 参数代表唯一的类型 key。如果未提供 key，插件会尝试从当前路由推断 key。

返回值为：

```ts
interface Article<T extends Record<string, unknown> = Record<string, unknown>> {
  /** 文章路径 */
  path: string
  /** 文章信息 */
  info: T
}

interface BlogCategoryData<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  /** 分类路径 */
  path: string

  /**
   * 仅当当前路由匹配特定的子项路径时可用
   */
  currentItems?: Article<T>[]

  /** 分类映射 */
  map: {
    /** 当前分类下唯一的 key */
    [key: string]: {
      /** 对应键值的分类路径 */
      path: string
      /** 对应键值的项目 */
      items: Article<T>[]
    }
  }
}

interface BlogTypeData<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  /** 类别路径 */
  path: string

  /** 当前类别下的项目 */
  items: Article<T>[]
}
```
