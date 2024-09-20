# Markdown

<NpmBadge package="@vuepress/theme-default" />

## Hint Containers

- Example 1 (default title):

**Input**

```md
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
```

**Output**

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

- Example 2 (custom title):

**Input**

````md
::: danger STOP
Danger zone, do not proceed
:::

::: details Click me to view the code

```ts
console.log('Hello, VuePress!')
```

:::
````

**Output**

::: danger STOP
Danger zone, do not proceed
:::

::: details Click me to view the code

```ts
console.log('Hello, VuePress!')
```

:::

## Custom Containers

- Usage:

  ```md
  ::: <type> [title]
  [content]
  :::
  ```

  The `type` is required, and the `title` and `content` are optional.

  Supported `type` :

  - Alias of [CodeGroup](./components.md#codegroup) and [CodeGroupItem](./components.md#codegroupitem):
    - `code-group`
    - `code-group-item`

- Example:

**Input**

````md
:::: code-group
::: code-group-item FOO

```ts
const foo = 'foo'
```

:::

::: code-group-item BAR

```ts
const bar = 'bar'
```

:::
::::
````

**Output**

:::: code-group
::: code-group-item FOO

```ts
const foo = 'foo'
```

:::

::: code-group-item BAR

```ts
const bar = 'bar'
```

:::
::::
