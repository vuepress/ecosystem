# Markdown

<NpmBadge package="@vuepress/theme-default" />

## 表格

**输入：**

```md
| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |
```

**输出：**

| Tables        |      Are      |   Cool |
| ------------- | :-----------: | -----: |
| col 3 is      | right-aligned | \$1600 |
| col 2 is      |   centered    |   \$12 |
| zebra stripes |   are neat    |    \$1 |

## Emoji :tada:

**输入：**

```txt
:tada: :100:
```

**输出：**

:tada: :100:

这里可以找到 [所有支持的 emoji 列表](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.mjs) 。

## 自定义容器

- 使用：

  ```md
  ::: <type> [title]
  [content]
  :::
  ```

  `type` 是必需的， `title` 和 `content` 是可选的。

  支持的 `type` 有：

  - `info`
  - `tip`
  - `warning`
  - `danger` （别名 `caution` ）
  - `details`
  - `important`

- 示例 1 （默认标题）：

**输入：**

```md
::: info
这是一个 信息
:::

::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: important
这是一个重要内容
:::

::: details
这是一个details 标签
:::
```

**输出：**

::: info
这是一个 信息
:::

::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: important
这是一个重要内容
:::

::: details
这是一个details 标签
:::

- 示例 2 （自定义标题）：

**输入**

````md
::: danger STOP
危险区域，禁止通行
:::

::: details 点击查看代码

```ts
console.log('你好，VuePress！')
```

:::
````

**输出**

::: danger STOP
危险区域，禁止通行
:::

::: details 点击查看代码

```ts
console.log('你好，VuePress！')
```

:::

## GitHub 风格的警报

VuePress 默认主题同样支持以标注的方式渲染 [GitHub-flavored alerts](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts) 。

它们和 [自定义容器](#自定义容器) 的渲染方式相同。

```md
> [!NOTE]
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。
```

> [!NOTE]
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。

## 在代码块中实现行高亮

**输入：**

````txt
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**输出：**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

除了单行之外，还可以指定多个单行、多行，或两者均指定：

- 多行：例如 `{5-8}` 、`{3-10}` 、`{10-17}`
- 多个单行：例如 `{4,7,9}`
- 多行与单行：例如 `{4,7-13,16,23-27,40}`

**输入：**

````txt
```js{1,4,6-8}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum'
    }
  }
}
```
````

**输出：**

```js{1,4,6-8}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```

也可以使用 `// [!code highlight]` 注释实现行高亮。

**输入：**

````txt
```js
export default {
  data () {
    return {
      msg: 'Highlighted!' // [!!code highlight]
    }
  }
}
```
````

**输出：**

```js
export default {
  data() {
    return {
      msg: 'Highlighted!', // [!code highlight]
    }
  },
}
```

## 代码块中聚焦

在某一行上添加 `// [!code focus]` 注释将聚焦它并模糊代码的其他部分。

此外，可以使用 `// [!code focus:<lines>]` 定义要聚焦的行数。

**输入：**

````txt
```js
export default {
  data () {
    return {
      msg: 'Focused!' // [!!code focus]
    }
  }
}
```
````

**输出：**

```js
export default {
  data() {
    return {
      msg: 'Focused!', // [!code focus]
    }
  },
}
```

## 代码块中的颜色差异

在某一行添加 `// [!code --]` 或 `// [!code ++]` 注释将会为该行创建 diff，同时保留代码块的颜色。

**输入：**

````txt
```js
export default {
  data () {
    return {
      msg: 'Removed' // [!!code --]
      msg: 'Added' // [!!code ++]
    }
  }
}
```
````

**输出：**

```js
export default {
  data () {
    return {
      msg: 'Removed' // [!code --]
      msg: 'Added' // [!code ++]
    }
  }
}
```

## 高亮“错误”和“警告”

在某一行添加 `// [!code warning]` 或 `// [!code error]` 注释将会为该行相应的着色。

**输入：**

````txt
```js
export default {
  data () {
    return {
      msg: 'Error', // [!!code error]
      msg: 'Warning' // [!!code warning]
    }
  }

```
````

**输出：**

```js
export default {
  data() {
    return {
      msg: 'Error', // [!code error]
      msg: 'Warning', // [!code warning]
    }
  },
}
```

## 代码组

可以像这样将多个代码块分组：

**输入：**

````md
::: code-group

```ts [FOO]
const foo = 'foo'
```

```ts [BAR]
const bar = 'bar'
```

:::
````

**输出：**

::: code-group

```ts [FOO]
const foo = 'foo'
```

```ts [BAR]
const bar = 'bar'
```

:::

还可以添加`active`选项以默认显示代码块。

**输入：**

````md
::: code-group

```ts [FOO]
const foo = 'foo'
```

```ts [BAR] active
const bar = 'bar'
```

:::
````

**输出：**

::: code-group

```ts [FOO]
const foo = 'foo'
```

```ts [BAR] active
const bar = 'bar'
```

:::
