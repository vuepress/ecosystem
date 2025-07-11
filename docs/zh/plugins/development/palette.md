---
icon: palette
---

# palette

<NpmBadge package="@vuepress/plugin-palette" />

为你的主题提供调色板功能。

该插件主要用于主题开发，并且已经集成到默认主题中。大部分情况下你不需要直接使用它。

对于主题作者，该插件可以为用户提供自定义样式的能力。

## 使用方法

```bash
npm i -D @vuepress/plugin-palette@next
```

```ts title=".vuepress/config.ts"
import { palettePlugin } from '@vuepress/plugin-palette'

export default {
  plugins: [
    palettePlugin({
      // 配置项
    }),
  ],
}
```

## 调色板和样式

该插件会提供一个 `@vuepress/plugin-palette/palette`（调色板文件）和一个 `@vuepress/plugin-palette/style`（样式文件），用于在你的主题样式中引入。

调色板文件用于定义样式变量，因此它通常会在你主题样式的开头引入。举例来说，用户可以在调色板中定义 [CSS 变量](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)、[SASS 变量](https://sass-lang.com/documentation/variables)、[LESS 变量](http://lesscss.org/features/#variables-feature)或 [Stylus 变量](https://stylus-lang.com/docs/variables.html)，然后你可以在你的主题样式中使用这些变量。

样式文件用于覆盖默认样式或添加额外样式，因此它通常会在你主题样式的末尾引入。

## 使用

在你的主题中使用该插件，假设你使用 SASS 作为 CSS 预处理器：

```ts title=".vuepress/config.ts"
export default {
  // ...
  plugins: [palettePlugin({ preset: 'sass' })],
}
```

### 使用调色板

在你主题需要使用对应变量的地方引入该插件的调色板文件，比如在 `Layout.vue` 中：

```vue
<template>
  <h1 class="palette-title">你好，调色板！</h1>
</template>

<style lang="scss">
/* 从该插件的调色板中引入变量 */
@use '@vuepress/plugin-palette/palette' as *;

/* 设置变量的默认值 */
$color: red !default;

/* 在你的样式中使用变量 */
.palette-title {
  color: $color;
}
</style>
```

然后，用户就可以在 `.vuepress/styles/palette.scss` 中自定义变量：

```scss
$color: green;
```

### 使用样式

在你主题的样式之后引入该插件的样式文件，比如在 `clientConfigFile` 中：

```ts
// 引入你主题本身的样式文件
import 'path/to/your/theme/style'
// 引入该插件的样式文件
import '@vuepress/plugin-palette/style'
```

然后，用户就可以在 `.vuepress/styles/index.scss` 中添加额外样式，并可以覆盖你主题的默认样式：

```scss
h1 {
  font-size: 2.5rem;
}
```

## 配置项

### preset

- 类型： `'css' | 'less' | 'sass' | 'stylus'`

- 默认值： `'css'`

- 详情：

  为其他配置项设置预设值。

  如果你不需要对插件进行高级自定义，建议只设置该配置项并省略其他配置项。

### userPaletteFile

- 类型： `string`

- 默认值：
  - css: `'.vuepress/styles/palette.css'`
  - less: `'.vuepress/styles/palette.less'`
  - sass: `'.vuepress/styles/palette.scss'`
  - stylus: `'.vuepress/styles/palette.styl'`

- 详情：

  用户调色板文件的路径，相对于源文件目录。

  默认值依赖于 [preset](#preset) 配置项。

  此文件用于用户定义样式变量，建议保持默认文件路径作为约定。

### tempPaletteFile

- 类型： `string`

- 默认值：
  - css: `'styles/palette.css'`
  - less: `'styles/palette.less'`
  - sass: `'styles/palette.scss'`
  - stylus: `'styles/palette.styl'`

- 详情：

  生成的调色板临时文件的路径，相对于临时文件目录。

  默认值依赖于 [preset](#preset) 配置项。

  你应该通过 `'@vuepress/plugin-palette/palette'` 别名引入调色板文件，因此大部分情况下你不需要修改该配置项。

### userStyleFile

- 类型： `string`

- 默认值：
  - css: `'.vuepress/styles/index.css'`
  - less: `'.vuepress/styles/index.less'`
  - sass: `'.vuepress/styles/index.scss'`
  - stylus: `'.vuepress/styles/index.styl'`

- 详情：

  用户样式文件的路径，相对于源文件目录。

  默认值依赖于 [preset](#preset) 配置项。

  此文件用于用户覆盖默认样式或添加额外样式，建议保持默认文件路径作为约定。

### tempStyleFile

- 类型： `string`

- 默认值：
  - css: `'styles/index.css'`
  - less: `'styles/index.less'`
  - sass: `'styles/index.scss'`
  - stylus: `'styles/index.styl'`

- 详情：

  生成的样式临时文件的路径，相对于临时文件目录。

  默认值依赖于 [preset](#preset) 配置项。

  你应该通过 `'@vuepress/plugin-palette/style'` 别名引入样式文件，因此大部分情况下你不需要修改该配置项。

### importCode

- 类型： `(filePath: string) => string`

- 默认值：
  - css: `` (filePath) => `@import '${filePath}';\n` ``
  - less: `` (filePath) => `@import '${filePath}';\n` ``
  - sass: `` (filePath) => `@forward 'file:///${filePath}';\n` ``
  - stylus: `` (filePath) => `@require '${filePath}';\n` ``

- 详情：

  生成引入代码的函数。

  默认值依赖于 [preset](#preset) 配置项。

  该配置项用于生成 [tempPaletteFile](#temppalettefile) 和 [tempStyleFile](#tempstylefile)，大部分情况下你不需要修改该配置项。
