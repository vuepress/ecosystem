# Markdown

<NpmBadge package="@vuepress/theme-default" />

## Custom Containers

- Usage:

  ```md
  ::: <type> [title]
  [content]
  :::
  ```

  The `type` is required, and the `title` and `content` are optional.

  Supported `type` :

  - `tip`
  - `warning`
  - `danger`
  - `details`
  - Alias of [CodeGroup](./components.md#codegroup) and [CodeGroupItem](./components.md#codegroupitem):
    - `code-group`
    - `code-group-item`

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

- Example 3 (code group alias):

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
