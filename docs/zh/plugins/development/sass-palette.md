---
icon: palette
---

# sass-palette

<NpmBadge package="@vuepress/plugin-sass-palette" />

基于 [`@vuepress/plugin-palette`](./palette.md)，为插件与主题开发者提供更高级的样式处理能力：

- **衍生样式**：基于用户配置生成相关样式。
- **插件级自定义**：允许插件提供类似于主题的样式自定义功能。
- **样式隔离与共享**：通过 `id` 选项在插件与主题之间分组管理样式系统。

::: tip 依赖

你应该在你的项目中手动安装这些依赖：

- 使用 Vite 打包工具时：`sass-embedded`
- 使用 Webpack 打包工具时：`sass-embedded` 和 `sass-loader`

:::

## 使用 {#usage}

```bash
npm i -D @vuepress/plugin-sass-palette@next
```

你必须在插件初始化期间调用 `useSassPalettePlugin` 函数：

```js title="你的插件或主题入口"
import { useSassPalettePlugin } from '@vuepress/plugin-sass-palette'

export const yourPlugin = (options) => (app) => {
  useSassPalettePlugin(app, {
    id: 'your-plugin',
  })

  return {
    // 你的插件 API
  }
}
```

## 指南 {#guide}

在使用本插件之前，你需要了解 [id](#id) 选项，以及三个核心概念：[配置](#config)、[调色板](#palette) 与 [生成器](#generator)。

### Id

不同于仅限主题使用的 Palette 插件，本插件同时适用于插件与主题，`id` 选项是实现这一点的基础：`useSassPalettePlugin` 会创建一个以该 id 隔离的样式系统，所有生成的别名与模块名都会带有该 id 前缀。

这使得你可以：

- **共享样式系统**

  使用相同的 id，多个插件（或主题及其插件）可以共享样式变量，用户可以在同一个文件中配置颜色变量、断点和其他设置，这些配置会自动应用到所有使用该 id 的插件与主题。

  例如 `vuepress-theme-hope` 及其相关插件都使用 id `hope`，因此用户在主题中配置的样式会自动在这些插件中生效。

- **实现样式隔离**

  使用不同的 id，插件之间互不影响，我们建议将 `id` 设置为你的插件名称。

  在默认设置下，用户以 id 前缀命名的 Sass 文件配置你的插件样式，你通过 `${id}-config` 和 `${id}-palette` 模块访问这些变量。

  例如使用 id `hope` 的 `vuepress-theme-hope` 与使用 id `abc` 的插件完全独立，它们分别通过 `hope-config`/`hope-palette` 与 `abc-config`/`abc-palette` 获取各自的变量。

- **无副作用调用**

  使用相同的 id 多次调用插件是安全的。

### 配置 {#config}

配置文件仅用于 **Sass 变量**，可以通过 `${id}-config` 模块使用。

你通过 [defaultConfig](#defaultconfig) 选项提供默认配置文件，其中的变量应当使用 `!default` 标记，以便用户配置覆盖它们。

```scss title="默认配置"
$navbar-height: 2rem !default;
$sidebar-width: 18rem !default;
```

```scss title="用户配置 (.vuepress/styles/abc-config.scss)"
$navbar-height: 3.5rem;
```

```scss title="使用"
// 在 <style lang="scss"> 块或直接导入的 Sass 文件中
@debug abc-config.$navbar-height; // 3.5rem
@debug abc-config.$sidebar-width; // 18rem
```

::: warning 导入限制

`${id}-config` 模块通过打包工具的 `additionalData` 选项注入，因此仅在以下情况可用：

- Vue SFC 文件中的 `<style lang="scss">` 块；
- 被脚本文件直接导入的 Sass 文件，例如 `import './styles.scss'`。

当 Sass 文件通过 `@use` 或 `@import` 被另一个 Sass 文件导入时，该模块不会自动可用，你需要通过 `@use "@sass-palette/${id}-config";` 手动导入。

:::

### 调色板 {#palette}

调色板文件包含 **CSS 变量**，其中的每个变量都会被转换为 kebab-case 并注入根样式表。

你通过 [defaultPalette](#defaultpalette) 选项提供默认值，同样需要使用 `!default` 标记。

```scss title="默认调色板"
$color-a: blue !default;
$color-b: green !default;
```

```scss title="用户调色板 (.vuepress/styles/abc-palette.scss)"
$color-a: red;
```

```scss title="生成的 CSS"
:root {
  --color-a: red;
  --color-b: green;
}
```

为了支持亮色与暗色模式，颜色变量可以是包含 `light` 和 `dark` 键的 Map，此时会生成两种模式下的 CSS 变量。

```scss
$text-color: (
  light: #222,
  dark: #999,
);
```

```scss
:root {
  --text-color: #222;
}

[data-theme='dark'] {
  --text-color: #999;
}
```

调色板中仅允许 **颜色**（或包含 light/dark 的颜色 Map）、**长度** 与 **字符串**，其他类型会被丢弃以保证生成的 CSS 变量合法。复杂值应当使用字符串。

```scss
// ❌ 会被 Sass 视为列表，触发警告并被插件丢弃
$moveTransition: width 0.3s ease;

// ✅ :root { --move-transition: width 0.3s ease; }
$moveTransition: 'width 0.3s ease';
```

调色板模块名为 `${id}-palette`，其中也包含生成器的值，并且与配置模块具有相同的导入限制。

### 生成器 {#generator}

生成器文件用于基于调色板与配置中的变量 **生成衍生值**。其中的变量会像调色板一样被注入为 CSS 变量，也可以通过调色板模块访问。

例如你可能希望基于 `$theme-color` 生成一个浅色版本：

```scss
@use 'sass:color';
@use '@sass-palette/helper';

$theme-color-light: (
  light: color.scale(helper.get-color($theme-color), $lightness: 10%),
  dark: color.scale(helper.get-dark-color($theme-color), $lightness: 10%),
) !default;
```

你也可以使用配置中的变量：

```scss
@use 'sass:color';
@use '@sass-palette/abc-config';
@use '@sass-palette/helper';

$code-c-bg: abc-config.$highlighter == 'shiki' ? #fff : #f8f8f8;
```

### 助手函数 {#helper}

插件内部的 Sass 函数通过 `@sass-palette/helper` 模块暴露。

## 选项 {#options}

::: fields
@`id` type=string required

插件实例的唯一标识符，用于隔离样式系统。

参考：[Id](#id)。

@`config` type=string default=`.vuepress/styles/${id}-config.scss`

用户配置文件的路径，相对于源码目录。

参考：[配置](#config)。

@`defaultConfig` type=string default="@vuepress/plugin-sass-palette/styles/default/config.scss"

默认配置文件的绝对路径。

参考：[配置](#config)。

@`palette` type=string default=`.vuepress/styles/${id}-palette.scss`

用户调色板文件的路径，相对于源码目录。

参考：[调色板](#palette)。

@`defaultPalette` type=string

默认调色板文件的绝对路径。

参考：[调色板](#palette)。

@`generator` type=string

生成器文件的绝对路径。

参考：[生成器](#generator)。

:::

## 别名 {#alias}

可用的导入别名如下：

- **config**：`@sass-palette/${id}-config`
- **palette**：`@sass-palette/${id}-palette`
- **helper**：`@sass-palette/helper`
