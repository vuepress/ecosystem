# markdown-demo

<NpmBadge package="@vuepress/plugin-markdown-demo" />

Adding code snippets and preview them.

<!-- more -->

::: info

The plugin allows you to insert code snippets and render the source code and the rendered result in the browser for you. If users like to try it, they can click CodePen or JSFiddle button to open the demo in CodePen or JSFiddle and edit them online.

This means that any snippets are standalone, and do not have access to any components or data in your project. Neither can we read your local file system in users' browser, nor can Codepen and JSFiddle access Vue components in your project.

:::

## Usage

```bash
npm i -D @vuepress/plugin-markdown-demo@next
```

```ts
import { markdownDemoPlugin } from '@vuepress/plugin-markdown-demo'

export default {
  plugins: [
    markdownDemoPlugin({
      // options
    }),
  ],
}
```

## Syntax

You should use the following syntax:

````md
::: [type]-demo Optional title text

```html
<!-- ↑ only support available ones as fence info -->
<!-- your code here -->
<!-- Multiple code blocks are allowed here, but each language must appear only once. -->
```

```json
// json block is for config
{
  // your config here (optional)
}
```

:::
````

::: tip

The json block is optional, for config please see [config](../../../config.md#demo).

:::

The plugin support 3 types:

- html
- vue
- react

### Available Languages

You can use different language in your demo block.

When language which can not run on browsers are given, demo display will be disabled because the browser can not natively run them. The plugin will only show the code and provide you a button to open it in CodePen.

Available HTML languages:

- `"html"` (default)
- `"slim"`
- `"haml"`
- `"markdown"`

> You can also use `md` in code block.

Available JS languages:

- `"javascript"` (default)
- `"coffeescript"`
- `"babel"`
- `"livescript"`
- `"typescript"`

> You can also use `js`, `ts`, `coffee` and `ls` in code block.

Available CSS languages:

- `"css"` (default)
- `"less"`
- `"scss"`
- `"sass"`
- `"stylus"`

> You can also use `styl` in code block.

### Vue Demo

A Vue demo should only contain a vue component to be rendered, only vue(or html) and json code blocks are allowed:

````md
::: vue-demo Optional title text

```vue
<!-- ↑ You can also use `html` -->
<template>
  <!-- vue template -->
</template>
<script>
// must export a vue component through `export default`
// <script setup> is NOT supported as it requires `@vue/compiler-sfc`
export default {
  // vue component
}
</script>
<style>
/* css code */
</style>
```

```json
// Config (Optional)
```

:::
````

### React Demo

A React demo should only contain a react component to be rendered, only js, css and json code blocks are allowed:

````md
::: react-demo Optional title text

```js
// your script, must export a react component through `export default`
```

```css
/* Your css content */
```

```json
// Config (Optional)
```

:::
````

### Limitation

We use "ShadowDOM" to make style isolation, and we already replace `document` with `shadowRoot`.

- ShadowRoot has almost the same APIs as document, but they are not the same.
- To access the page document, please visit `window.document`.

The plugin will default treat the code as is, if you want advanced features like ESNext grammar or JSX, you should set transpile to `true` in the plugin options.

## Demo

:::: md-demo Normal demo

::: html-demo HTML Demo

```html
<h1>VuePress Theme Hope</h1>
<p>is <span id="very">very</span> powerful!</p>
```

```js
document.querySelector('#very').addEventListener('click', () => {
  alert('Very powerful')
})
```

```css
span {
  color: red;
}
```

:::

::::

:::: md-demo A Vue Composition Demo

::: vue-demo Vue demo 1

```vue
<script>
const { ref } = Vue

export default {
  setup() {
    const message = ref('powerful')

    const handler = () => {
      message.value = `very ${message.value}`
    }

    return {
      message,
      handler,
    }
  },
}
</script>
<template>
  <div class="box">
    <code>vuepress-theme-hope</code> is
    <span @click="handler">{{ message }}</span
    >!
  </div>
</template>
<style>
.box span {
  color: red;
}
</style>
```

:::

::::

:::: md-demo A Vue Option Demo

::: vue-demo Vue demo 2

```vue
<script>
export default {
  data: () => ({ message: 'powerful' }),
  methods: {
    handler() {
      this.message = `very ${this.message}`
    },
  },
}
</script>
<template>
  <div class="box">
    <code>vuepress-theme-hope</code> is
    <span @click="handler">{{ message }}</span
    >!
  </div>
</template>
<style>
.box span {
  color: red;
}
</style>
```

:::

::::

:::: md-demo A function-based React Demo

::: react-demo React demo 1

```js
const { useState } = React

export default () => {
  const [message, setMessage] = useState(' powerful')

  const handler = () => {
    setMessage(` very${message}`)
  }

  return (
    <div className="box">
      <code>vuepress-theme-hope</code> is
      <span id="powerful" onClick={handler}>
        {message}
      </span>
      !
    </div>
  )
}
```

```css
.box #powerful {
  color: blue;
}
```

:::

::::

:::: md-demo A class-based React Demo

::: react-demo React demo 2

```js
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: ' powerful' }
  }

  handler() {
    this.setState((state) => ({
      message: ` very${state.message}`,
    }))
  }

  render() {
    return (
      <div className="box">
        <code>vuepress-theme-hope</code> is
        <span id="powerful" onClick={this.handler.bind(this)}>
          {this.state.message}!
        </span>
      </div>
    )
  }
}
```

```css
.box #powerful {
  color: blue;
}
```

:::

::::

:::: md-demo A demo using language not supported by browsers

::: html-demo HTML demo

```md
# Title

is very powerful!
```

```ts
const message: string = 'VuePress Theme Hope'

document.querySelector('h1').innerHTML = message
```

```scss
h1 {
  font-style: italic;

  + p {
    color: red;
  }
}
```

:::

::::

## Options

### html

- Type: `boolean`

- Default: `true`

- Details:

  Whether enable html demo

### vue

- Type: `boolean`

- Default: `true`

- Details:

  Whether enable vue demo

### react

- Type: `boolean`

- Default: `true`

- Details:

  Whether enable react demo
