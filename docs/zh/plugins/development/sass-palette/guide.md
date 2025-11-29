---
icon: lightbulb
---

# 指南

相较于 [`@vuepress/plugin-palette`](../palette.md)，本插件提供了更高级的样式处理能力：

- **衍生样式**：基于用户配置自动计算并生成相关样式。
- **插件级自定义**：允许插件提供类似于主题的样式自定义功能。
- **样式隔离与共享**：通过 `id` 选项在多个插件或主题之间分组管理样式系统。

在使用本插件之前，你需要了解 **ID 选项**，以及三个核心概念：**配置 (Config)**、**调色板 (Palette)** 和 **生成器 (Generator)**。

## ID 选项

本插件旨在跨插件和主题工作（不同于仅限主题使用的官方 Palette 插件）。

我们提供了 `id` 选项来实现这一点。使用相同的 ID 调用 `useSassPalette` 可以共享样式系统，且不会产生副作用。所有生成的别名和模块名称都会带有该 ID 前缀。

这使得你可以：

- **在插件（或主题）之间共享样式系统**：

  所有别名和模块名都带有 ID 前缀，这意味着你可以在插件（或主题）中使用一套统一的样式变量。

  用户可以在同一个文件中配置所有颜色变量、断点和其他样式配置，这些配置会自动应用到所有使用该 ID 的主题和插件中。

  ::: tip 示例
  `vuepress-theme-hope` 和其他相关插件使用相同的 ID `hope` 来调用插件，因此用户在主题中配置的样式会自动在所有相关插件中生效。
  :::

- **实现样式隔离**：

  使用不同的 ID，插件和主题之间互不影响。我们建议将 `id` 设置为你的插件名称。

  在默认设置下，用户将在 `.vuepress/styles` 目录中设置你的插件样式，文件名以你的 ID 前缀开头。你可以通过 `${id}-config` 和 `${id}-palette` 访问所需的变量。

  ::: tip 示例
  `vuepress-theme-hope` 使用 ID `"hope"`，假设有一个 `vuepress-plugin-abc` 使用 ID `"abc"`。它们可以通过 `hope-config`/`hope-palette` 和 `abc-config`/`abc-palette` 模块分别获取各自的变量，互不干扰。
  :::

- **无副作用调用**：使用相同的 ID 多次调用插件是安全的。

## 配置

配置文件仅用于 **Sass 变量**。它包含的 Sass 变量可以通过 `${id}-config` 模块在其他文件中使用。

你可以指定一个文件（通常在 `.vuepress/styles/` 目录中）作为用户配置文件，以便后续在 Sass 文件中获取包含所有变量的模块。此外，你还可以提供一个默认配置文件，并在其中使用 `!default` 为变量设置回退值。

::: details 示例

假设你在 `vuepress-plugin-abc` 中使用以下选项调用插件：

```js
useSassPalette(app, {
  id: 'abc',
  defaultConfig: 'vuepress-plugin-abc/styles/config.scss',
})
```

**用户配置文件：**

```scss title=".vuepress/styles/abc-palette.scss"
$navbar-height: 3.5rem;
```

**默认配置文件：**

```scss title="vuepress-plugin-abc/styles/palette.scss"
$navbar-height: 2rem !default;
$sidebar-width: 18rem !default;
```

**在插件 Sass 文件中使用：**

```scss
// 在 Vue SFC 的 <style lang="scss"> 块或脚本直接导入的 scss 文件中
@debug abc-config.$navbar-height; // 3.5rem
@debug abc-config.$sidebar-width; // 18rem
```

:::

### 限制

我们使用 `additionalData` 选项使 `${id}-config` 模块在你的样式中可用，但这有一些限制。

`additionalData` 仅在 Scss 入口处生效，因此 `${id}-config` 仅在以下情况可用：

- Vue SFC 文件中的 `<style lang="scss">` 块。
- 被脚本文件直接导入的 Scss 文件（例如：客户端应用增强文件中的 `import "./a-scss-file.scss"`）。

如果 Scss 文件不是直接导入的，而是通过 `@use` 或 `@import` API 导入的，则该模块将不可用。在这种情况下，你需要通过 `@use "@sass-palette/${id}-config";` 手动导入该模块。

## 调色板

调色板文件用于 **CSS 变量** 注入。其中的每个变量都将被转换为 kebab-case（短横线命名）并注入到根选择器中。

你可以指定一个文件（通常在 `.vuepress/styles/` 目录中）作为用户调色板文件，默认文件名为 `${id}-palette.scss`。同样，你可以提供一个包含 `!default` 回退值的默认调色板文件。

::: details 示例

假设你在 `vuepress-plugin-abc` 中使用以下选项调用插件：

```js
useSassPalette(app, {
  id: 'abc',
  defaultPalette: 'vuepress-plugin-abc/styles/palette.scss',
})
```

**用户设置：**

```scss title=".vuepress/styles/abc-palette.scss"
$color-a: red;
```

**默认调色板：**

```scss title="vuepress-plugin-abc/styles/palette.scss"
$color-a: blue !default;
$color-b: green !default;
```

**生成的 CSS 变量：**

```scss
:root {
  --color-a: red;
  --color-b: green;
}
```

:::

与配置文件类似，调色板文件提供名为 `${id}-palette` 的模块（也包含生成器的值），并且同样受限于 `additionalData` 选项。如果你想在其他 Sass 文件中使用它，需要手动导入该模块。

### 颜色设置

由于默认主题提供暗黑模式，你可能希望在亮色模式和暗色模式下使用不同的颜色。

为此，你应该将颜色变量设置为包含 `light` 和 `dark` 键的 Map。插件随后会自动为你生成不同模式下的 CSS 颜色变量。

::: details 示例

```scss
// 用户调色板
$text-color: (
  light: #222,
  dark: #999,
);

// 默认调色板
$text-color: (
  light: #2c3e50,
  dark: #9e9e9e,
) !default;
$bg-color: (
  light: #fff,
  dark: #1e1e1e,
) !default;
```

**结果：**

```scss
:root {
  --text-color: #222;
  --bg-color: #fff;
}

[data-theme='dark'] {
  --text-color: #999;
  --bg-color: #1e1e1e;
}
```

:::

### 允许的变量类型

调色板中仅允许使用 **颜色**（或包含 light/dark 的颜色 Map）、**长度**和**字符串**。任何其他类型都将被丢弃。

:::: tip 为什么只允许颜色和长度？

通常情况下，你只希望对颜色和长度进行计算。为了安全起见，我们丢弃了对其他类型的支持，因为你可以将任何其他需要的值转换为字符串。

::: details 示例

如果你想要一个值为 `width 0.3s ease` 的 `--move-transition` 变量，你应该使用字符串：

```scss
// ❌ 这会被 Sass 视为一个列表 (List)，包含长度、时间和函数
// 将触发警告并被插件丢弃
$moveTransition: width 0.3s ease;

// ✅ 这会得到你想要的结果
// :root {
//   --move-transition: width 0.3s ease
// }
$moveTransition: 'width 0.3s ease';
```

:::

::::

## 助手函数

我们将 `@vuepress/plugin-sass-palette` 使用的内部函数作为助手模块暴露出来。

你可以使用 `@sass-palette/helper` 别名来调用这些函数，以实现类似的样式处理功能。

## 生成器

生成器文件专为开发者设计，用于基于调色板文件中的变量 **生成衍生值**。

你可以直接访问调色板文件中的变量，并据此生成新的值。

生成器文件中的变量也会像调色板一样被注入为 CSS 变量，并且它们也可以通过调色板模块被访问。

::: details 示例

你可能希望基于 `$theme-color` 生成一个 `$theme-color-light`。你可以这样编写生成器：

```scss
@use 'sass:color';
@use '@sass-palette/helper';

$theme-color-light: (
  light: color.scale(helper.get-color($theme-color), $lightness: 10%),
  dark: color.scale(helper.get-dark-color($theme-color), $lightness: 10%),
) !default;
```

你还可以导入配置模块，基于其中的变量生成值：

```scss
// ID 为 "abc" 的生成器
@use 'sass:color';
@use '@sass-palette/abc-config';
@use '@sass-palette/helper';

$code-c-bg: abc-config.$highlighter == 'shiki'? #fff: #f8f8f8;
```

:::

## 用户样式

如果你是主题开发者，你可能希望为用户提供一种自定义主题或站点样式的方法。

在这种情况下，你应该在使用此插件时将 `style` 选项设置为用户样式文件。

随后，你需要手动导入 `@sass-palette/${id}-style`，并确保将其放置在 **你的主题样式之后**。

::: tip
`@sass-palette/${id}-style` 是用户样式文件的别名，你可以在 JS/TS/SASS 中导入它。
:::
