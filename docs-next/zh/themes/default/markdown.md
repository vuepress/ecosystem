# Markdown

<NpmBadge package="@vuepress/theme-default" />

## Tables

**Input:**

```md
| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |
```

**Output:**

| Tables        |      Are      |   Cool |
| ------------- | :-----------: | -----: |
| col 3 is      | right-aligned | \$1600 |
| col 2 is      |   centered    |   \$12 |
| zebra stripes |   are neat    |    \$1 |

## Emoji :tada:

**Input:**

```txt
:tada: :100:
```

**Output:**

:tada: :100:

A [list of all emojis](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.mjs) is available.

## Custom Containers

- Usage:

  ```md
  ::: <type> [title]
  [content]
  :::
  ```

  The `type` is required, and the `title` and `content` are optional.

  Supported `type` :

  - `info`
  - `tip`
  - `warning`
  - `danger` ( alias `caution` )
  - `details`
  - `important`

- Example 1 (default title):

**Input:**

```md
::: info
This is a info
:::

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: important
This is an important
:::

::: details
This is a details block
:::
```

**Output:**

::: info
This is a info
:::

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: important
This is an important
:::

::: details
This is a details block
:::

- Example 2 (custom title):

**Input:**

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

**Output:**

::: danger STOP
Danger zone, do not proceed
:::

::: details Click me to view the code

```ts
console.log('Hello, VuePress!')
```

:::

## GitHub-flavored Alerts

VitePress also supports [GitHub-flavored alerts](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts) to render as callouts. They will be rendered the same as the [custom containers](#custom-containers).

```md
> [!NOTE]
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]
> Crucial information necessary for users to succeed.

> [!WARNING]
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.
```

> [!NOTE]
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]
> Crucial information necessary for users to succeed.

> [!WARNING]
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.

## Line Highlighting in Code Blocks

**Input:**

````
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

**Output:**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

In addition to a single line, you can also specify multiple single lines, ranges, or both:

- Line ranges: for example `{5-8}`, `{3-10}`, `{10-17}`
- Multiple single lines: for example `{4,7,9}`
- Line ranges and single lines: for example `{4,7-13,16,23-27,40}`

**Input:**

````
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

**Output:**

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

Alternatively, it's possible to highlight directly in the line by using the `// [!code highlight]` comment.

**Input:**

````
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

**Output:**

```js
export default {
  data() {
    return {
      msg: 'Highlighted!', // [!code highlight]
    }
  },
}
```

## Focus in Code Blocks

Adding the `// [!code focus]` comment on a line will focus it and blur the other parts of the code.

Additionally, you can define a number of lines to focus using `// [!code focus:<lines>]`.

**Input:**

````
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

**Output:**

```js
export default {
  data() {
    return {
      msg: 'Focused!', // [!code focus]
    }
  },
}
```

## Colored Diffs in Code Blocks

Adding the `// [!code --]` or `// [!code ++]` comments on a line will create a diff of that line, while keeping the colors of the codeblock.

**Input:**

````
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

**Output:**

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

## Errors and Warnings in Code Blocks

Adding the `// [!code warning]` or `// [!code error]` comments on a line will color it accordingly.

**Input:**

````
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

**Output:**

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

## Code Groups

You can group multiple code blocks like this:

**Input:**

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

**Output:**

::: code-group

```ts [FOO]
const foo = 'foo'
```

```ts [BAR]
const bar = 'bar'
```

:::

You can also add the `active` option to display the code block by default.

**Input:**

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

**Output:**

::: code-group

```ts [FOO]
const foo = 'foo'
```

```ts [BAR] active
const bar = 'bar'
```

:::
