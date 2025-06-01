---
icon: lightbulb
---

# 指南

相比于 [`@vuepress/plugin-palette`](../palette.md) 插件，本插件允许你:

- 基于用户配置派生相关样式
- 在插件中调用并提供和主题类似的样式自定义
- 跨越多个插件或主题通过 id 选项分组应用

在使用插件前，你需要了解 id 选项，以及三个样式概念: 配置、调色板和派生器。

## ID 选项

首先，你应该了解此插件的设计目标是提供跨越插件和主题的支持 (而并不像官方插件仅面向主题)。

我们提供了 `id` 选项来完成此目标，它将允许你:

- 在插件 (或主题) 间共享同一个样式系统。

  所有别名和模块名称都具有 ID 前缀，这意味着你可以在你的插件 (或主题) 中使用一套样式变量来统一你的样式，而不会受到其他插件 (或主题) 的影响。

  用户可以在同一个文件中配置所有颜色变量、断点和其他样式配置，并自动应用在具有相同 ID 的主题和插件上。

  ::: tip 示例

  `vuepress-theme-hope` 及其它的相关插件都使用相同 ID `hope` 调用插件，因此用户在主题中配置的样式会自动在所有插件中生效。

  :::

- 设置不同的 ID 时，插件们和主题之间互相完全独立。我们建议你使用你的插件名称设置 `id` 变量。

  使用默认设置，用户将在 `.vuepress/styles` 文件夹下设置你的插件样式，其中 Sass 文件以你的 ID 前缀开头。你可以使用 `${id}-config` 和 `${id}-palette` 访问所需的变量。

  ::: tip 示例

  `vuepress-theme-hope` 正在使用 ID `"hope"`，而假设 `vuepress-plugin-abc` 正在使用 `"abc"`。他们可以分别使用 `hope-config` `hope-palette` 和 `abc-config` `abc-palette` 模块名称获取自己的变量。

  :::

- 通过相同 ID 调用插件不会有任何副作用。

  ::: tip 示例

  `vuepress-theme-hope` 及其它的相关插件都使用相同 ID `hope` 调用插件。

  :::

## 配置

配置文件仅用于提供 Sass 变量。它所包含 Sass 变量可以在其他文件中通过 `${id}-config` 使用。

你可以指定一个文件作为用户配置文件。这样你可以稍后在插件 Sass 文件中访问包含每个变量的模块。此外，你还可以提供默认配置文件，你可以在其中使用 `!default` 为变量设置默认值。

::: details 一个例子

假设，你正在 `vuepress-plugin-abc` 中这样调用插件:

```js
useSassPalette(app, {
  id: 'abc',
  defaultConfig: 'vuepress-plugin-abc/styles/config.scss',
})
```

用户配置:

```scss title=".vuepress/styles/abc-palette.scss"
$navbar-height: 3.5rem;
```

默认配置:

```scss title="vuepress-plugin-abc/styles/palette.scss"
$navbar-height: 2rem !default;
$sidebar-width: 18rem !default;
```

你可以在插件 Sass 文件中获取到如下变量:

```scss
// Vue 单文件组件的 <style lang="scss"> 块或脚本中直接导入的 Scss 文件中
@debug abc-config.$navbar-height; // 3.5rem
@debug abc-config.$sidebar-width; // 18rem
```

:::

### 限制

我们利用 `additionalData` 选项让 `${id}-config` 模块在你的样式中可用，但这有一些限制。

`additionalData` 仅适用于 SASS 入口，因此 `${id}-config` 仅适用于:

- Vue 单文件组件的 `<style lang="scss">` 块
- 脚本中直接导入的 scss 文件 (例如: 客户端应用程序增强文件中的 `import "./a-scss-file.scss"`) 。

如果 scss 文件不是直接导入的，而是通过 `@use` 或 `@import` API 导入的，模块将不可用。因此，在这种情况下，你应该通过 `@use "@sass-palette/${id}-config";` 手动导入模块。

## 调色板

调色板文件用于 CSS 变量注入，其中每个变量将被注入到 root 中，变量名称转换为 kebab-name 格式。

你可以指定一个文件作为用户调色板文件，默认文件名是 `${id}-palette.scss`。 此外，你还可以提供一个默认的调色板文件，你可以在其中使用 `!default` 为变量设置默认值。

::: details 一个例子

假设，你正在 `vuepress-plugin-abc` 中这样调用插件:

```js
useSassPalette(app, {
  id: 'abc',
  defaultPalette: 'vuepress-plugin-abc/styles/palette.scss',
})
```

用户调色板:

```scss title=".vuepress/styles/abc-palette.scss"
$color-a: red;
```

默认调色板:

```scss title="vuepress-plugin-abc/styles/palette.scss"
$color-a: blue !default;
$color-b: green !default;
```

那么 root 选择器将会拥有下列 CSS 变量:

```scss
:root {
  --color-a: red;
  --color-b: green;
}
```

:::

和配置文件一样，调色板文件提供了一个 `${$id}-palette` 模块 (也包含生成器的值)，它也受 `additionalData` 选项的限制，因此如果你想在其他 Sass 文件中使用它，你应该手动导入模块。

### 颜色设置

由于默认主题支持深色模式，因此你可能希望在浅色模式和深色模式下使用不同的颜色。

为此，你应该使用包含 `light` 和 `dark` 键的映射设置颜色变量。 稍后，此插件将为你生成不同的颜色。

::: details 一个例子

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

然后你会得到:

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

调色板中只允许使用颜色 (或深浅模式颜色对象)、长度和字符串。任何其他类型都将被删除。

:::: tip 为什么除了字符串只允许颜色和长度

在常见情况下，你可能只想计算颜色和长度。所以放弃其他类型支持是相当安全的，因为你想要的任何其他值都可以转换为字符串。

::: details 示例

如果你想要一个 `--move-transition` 和 `width 0.3s ease`，你可以使用字符串:

```scss
// 这将被 sass 视为一个类型为 (length, time, function) 的列表
// 并会触发警告并被插件删除
$moveTransition: width 0.3s ease;

// 这会得到你想要的
// :root {
//   --move-transition: width 0.3s ease
// }
$moveTransition: 'width 0.3s ease';
```

:::

::::

## 辅助模块

我们公开了 `@vuepress/plugin-sass-palette` 使用的内部函数，作为辅助模块。

你可以通过 `@sass-palette/helper` 别名使用此辅助模块，并调用其函数来自己实现类似的功能。

## 生成器

生成器文件面向开发人员使用配置或调色板文件变量生成衍生值。

你可以在此文件中直接获取调色板的变量值，并生成基于它们的新值。

生成器变量也将像调色板一样作为 CSS 变量注入，它们也在调色板模块中可用。

::: details 示例

你可能想要一个基于 `$theme-color` 的 `$theme-color-light`。所以你可以这样写一个生成器:

```scss
@use 'sass:color';
@use '@sass-palette/helper';

$theme-color-light: (
  light: color.scale(helper.get-color($theme-color), $lightness: 10%),
  dark: color.scale(helper.get-dark-color($theme-color), $lightness: 10%),
) !default;
```

你也可以通过导入配置文件来基于配置文件提供的变量生成值:

```scss
// id 为 "abc" 的生成器
@use 'sass:color';
@use '@sass-palette/abc-config';
@use '@sass-palette/helper';

$code-c-bg: abc-config.$highlighter == 'shiki'? #fff: #f8f8f8;
```

:::

## 用户样式

如果你是主题开发人员，你可能希望为你的用户提供一种自定义主题或网站的方法。

在这种情况下，你应该在使用此插件时将 `style` 选项设置为用户样式文件。

稍后，你应该通过在你的主题样式之后导入 `@sass-palette/${id}-style` 来手动包含用户样式文件。

::: tip

`@sass-palette/${id}-style` 是用户样式文件的别名，你可以在 JS/TS/SASS 中导入它。

:::
