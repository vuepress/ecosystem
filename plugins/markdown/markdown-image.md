---
url: /ecosystem/plugins/markdown/markdown-image.md
---
# markdown-image

Add additional features to your markdown images.

## Usage

```bash
npm i -D @vuepress/plugin-markdown-image@next
```

```ts
import { markdownImagePlugin } from '@vuepress/plugin-markdown-image'

export default {
  plugins: [
    markdownImagePlugin({
      // Enable figure
      figure: true,
      // Enable image lazyload
      lazyload: true,
      // Enable image mark
      mark: true,
      // Enable image size
      size: true,
    }),
  ],
}
```

## Guide

### Image Lazyload

The plugin will enable image lazyload using native HTML5 features, so only it's only working on browsers which [support loading=lazy attribute](https://caniuse.com/loading-lazy-attr).

### Image Mark

When you set `mark: true` in plugin options, you can mark pictures by `#light` and `#dark` suffix to let them be displayed under certain color mode.

&#x20;(Try to toggle theme mode)

![GitHub Light](/images/icon/github-light.svg#dark)
![GitHub Dark](/images/icon/github-dark.svg#light)

```md
![GitHub Light](/images/icon/github-light.svg#dark)
![GitHub Dark](/images/icon/github-dark.svg#light)
```

#### Advanced

You can pass an object to `mark` to config ID marks, available options are:

```ts
interface ImageMarkOptions {
  /** lightmode only IDs */
  light?: string[]
  /** darkmode only IDs */
  dark?: string[]
}
```

### Image Size

When you set `size: true` in plugin options, you can append `=widthxheight` to image alt text with spaces as separator.

Both `width` and `height` should be numbers as pixels and are optional.

```md
![Alt =200x300](/example.png)
![Alt =200x](/example.jpg 'Title')
![Alt =x300](/example.bmp)
```

Renders as ↓

```html
<img src="/example.png" alt="Alt" width="200" height="300" />
<img src="/example.jpg" alt="Alt" title="Title" width="200" />
<img src="/example.bmp" alt="Alt" height="300" />
```

#### Obsidian Syntax

When you set `obsidianSize: true` in plugin options, you can append `widthxheight` after image alt text and use `|` to separate.

Both `width` and `height` should be numbers as pixels and are required. Setting one of them with `0` to scale by ratio with the other.

```md
![Alt|200x200](/example.png)
![Alt|200x0](/example.jpg)
![Alt|0x300](/example.bmp)
```

Renders as ↓

```html
<img src="/example.png" alt="Alt" width="200" height="300" />
<img src="/example.jpg" alt="Alt" width="200" />
<img src="/example.bmp" alt="Alt" height="300" />
```

#### Legacy Syntax (Deprecated)

::: warning This may cause rendering issues on platforms like GitHub.
:::

When you set `legacySize: true` in plugin options, you can append `=widthxheight` at the end of image link section with spaces as separator.

Both `width` and `height` should be numbers as pixels and are optional.

```md
![Alt](/example.png =200x300)
![Alt](/example.jpg "Title" =200x)
![Alt](/example.bmp =x300)
```

Renders as ↓

```html
<img src="/example.png" width="200" height="300" />
<img src="/example.jpg" title="TTitle" width="200" />
<img src="/example.bmp" height="300" />
```

::: tip Choosing between 3 Grammars

* The legacy grammar breaks image rendering in environments that don't support it (e.g.: GitHub)
* Both the new grammar and the Obsidian grammar are compatible with the Markdown standard, but new grammar is more natural.

:::

### Figure Display

Sometimes, you may want to add a description with image and place it between contents, in this case you should set `figure: true` in plugin options.

If the image is standalone in a line, wrapped or not wrapped by link, it will be displayed as `<figure>` and title (or alt) will be displayed as `<figcaption>`.

![VuePress Logo](/favicon.ico)

[![VuePress Logo](/favicon.ico)](https://vuejs.press/)

![VuePress Logo](/favicon.ico "VuePress Logo")

[![VuePress Logo](/favicon.ico "VuePress Logo")](https://vuejs.press/)

!\[VuePress Logo]\(https://vuejs.press/images/hero.png "VuePress Logo" =300x300)

```md
![VuePress Logo](/favicon.ico)

[![VuePress Logo](/favicon.ico)](https://vuejs.press/)

![VuePress Logo](/favicon.ico 'VuePress Logo')

[![VuePress Logo](/favicon.ico 'VuePress Logo')](https://vuejs.press/)

![VuePress Logo](https://vuejs.press/images/hero.png "VuePress Logo" =300x300)
```

## Options

### figure

* Type: `boolean`
* Details: Whether enable figure support.

### lazyload

* Type: `boolean`
* Details: Whether to lazy load every image in page in native way.

### mark

* Type: `ImageMarkOptions | boolean`

  ```ts
  interface ImageMarkOptions {
    /** lightmode only IDs */
    light?: string[]
    /** darkmode only IDs */
    dark?: string[]
  }
  ```

* Details: Whether enable image mark support.

### size

* Type: `boolean`
* Details: Whether enable image size support.

### obsidianSize

* Type: `boolean`
* Details: Whether enable obsidian image size support.

### legacySize

* Type: `boolean`
* Details: Whether enable legacy image size support.
