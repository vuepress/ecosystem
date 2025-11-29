---
icon: settings-2
---

# 配置

## 插件选项

### id

- 类型：`string`
- 必填: 是
- 详情：插件实例的唯一标识符。用于隔离样式系统，避免不同插件或主题之间的重复注册与冲突。

### config

- 类型：`string`
- 默认值：`` `.vuepress/styles/${id}-config.scss` ``
- 详情：用户配置文件的路径，相对于源码目录。

::: tip

这是用户设置 Sass 变量的文件。

默认文件名以配置的 `id` 开头。

:::

### defaultConfig

- 类型：`string`
- 默认值：`"@vuepress/plugin-sass-palette/styles/default/config.scss"`
- 详情：默认 Sass 配置文件的绝对路径。

::: tip

作为插件开发者，你应该使用此文件并通过 `!default` 标志为变量提供默认回退值。

:::

### palette

- 类型：`string`
- 默认值：`` `.vuepress/styles/${id}-palette.scss` ``
- 详情：用户调色板文件的路径，相对于源码目录。

::: tip

这是用户控制注入 CSS 变量的文件。此处定义的所有变量都将被转换为 kebab-case（短横线命名）并注入。

默认文件名以配置的 `id` 开头。

:::

### defaultPalette

- 类型：`string`
- 详情：默认调色板文件的绝对路径。

::: tip

作为插件开发者，你应该使用此文件并通过带有 `!default` 标志的 Sass 变量提供默认 CSS 变量。这些变量同样会被转换为 kebab-case 并注入。

:::

### generator

- 类型：`string`
- 详情：

  自定义生成器文件的绝对路径。该文件用于基于调色板配置推导生成新的值。

  例如：你可以利用它基于用户提供的 `$theme-color` 来生成一个 `$theme-color-light` 变量。

### style

- 类型：`string`
- 详情：用户自定义样式文件的路径，相对于源码目录。这通常用于标准的 CSS/Sass 样式覆盖。

## 别名 (Alias)

可用的导入别名如下：

- **config**：`@sass-palette/${id}-config` (基于 `id` 生成)
- **palette**：`@sass-palette/${id}-palette` (基于 `id` 生成)
- **style**：`@sass-palette/${id}-style` (仅在设置了 `style` 选项时可用)
- **helper**：`@sass-palette/helper`
