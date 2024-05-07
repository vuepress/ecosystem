# google-tag-manager

<NpmBadge package="@vuepress/plugin-google-tag-manager" />

Integrate [Google Tag Manager](https://tagmanager.google.com/) into VuePress.

This plugin will import [Google Tag Manager](https://developers.google.com/tag-platform/tag-manager).

## Usage

```bash
npm i -D @vuepress/plugin-google-tag-manager@next
```

```ts
import { googleTagManagerPlugin } from '@vuepress/plugin-google-tag-manager'

export default {
  plugins: [
    googleTagManagerPlugin({
      // options
    }),
  ],
}
```

## Options

### id

- Type: `string`

- Details:

  The container ID of Google Tag Manager 4, which should start with `'GTM-'`.

  You add your container and find its ID [here](https://tagmanager.google.com/#/home).

- Example:

```ts
export default {
  plugins: [
    googleTagManagerPlugin({
      id: 'GTM-XXXXXXXXXX',
    }),
  ],
}
```
