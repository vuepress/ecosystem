---
icon: octicon:markdown-16
---

# Markdown

<NpmBadge package="@vuepress/theme-default" />

## 提示容器

- 示例 1 （默认标题）：

**输入**

```md
::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: info
这是一个信息
:::

::: important
这是一个重要信息
:::

::: note
这是一个备注
:::

::: details
这是一个 details 标签
:::
```

**输出**

::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: info
这是一个信息
:::

::: important
这是一个重要信息
:::

::: note
这是一个备注
:::

::: details
这是一个 details 标签
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

## 代码选项卡

**输入**

````md
::: code-tabs

@tab JavaScript

```js
const name = 'VuePress'
console.log(`你好，${name}！`)
```

@tab TypeScript

```ts
const name: string = 'VuePress'

console.log(`你好，${name}！`)
```

:::
````

**输出**

::: code-tabs

@tab JavaScript

```js
const name = 'VuePress'
console.log(`你好，${name}！`)
```

@tab TypeScript

```ts
const name: string = 'VuePress'

console.log(`你好，${name}！`)
```

:::

## 选项卡

**输入**

````md
::: tabs

@tab 选项卡 1

这是选项卡 1 的内容。

```js
console.log('你好，VuePress!')
```

@tab 选项卡 2

这是选项卡 2 的内容。

- 列表项 1
- 列表项 2
- 列表项 3

:::
````

**输出**

::: tabs

@tab 选项卡 1

这是选项卡 1 的内容。

```js
console.log('你好，VuePress!')
```

@tab 选项卡 2

这是选项卡 2 的内容。

- 列表项 1
- 列表项 2
- 列表项 3

:::
