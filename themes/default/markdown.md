---
url: /ecosystem/themes/default/markdown.md
---
# Markdown

## Hint Containers

* Example 1 (default title):

:::: preview

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: info
This is an information.
:::

::: important
This is an important message
:::

::: note
This is a note
:::

::: details
This is a details block
:::

::::

* Example 2 (custom title):

:::: preview

::: danger STOP
Danger zone, do not proceed
:::

::: details Click me to view the code

```ts
console.log('Hello, VuePress!')
```

:::

::::

## Code Tabs

:::: preview

::: code-tabs

@tab JavaScript

```js
const name = 'VuePress'
console.log(`Hello, ${name}!`)
```

@tab TypeScript

```ts
const name: string = 'VuePress'

console.log(`Hello, ${name}!`)
```

:::

::::

## Tabs

:::: preview

::: tabs

@tab Tab1

This is the content of Tab1.

```js
console.log('Hello, VuePress!')
```

@tab Tab2

This is the content of Tab2.

* List item 1
* List item 2
* List item 3

:::

::::
