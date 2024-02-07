# baidu-analytics

<NpmBadge package="@vuepress/plugin-baidu-analytics" />

Integrate [Baidu Analytics](https://tongji.baidu.com/) into VuePress.

## Usage

```bash
npm i -D @vuepress/plugin-baidu-analytics@next
```

```ts
import { baiduAnalyticsPlugin } from '@vuepress/plugin-baidu-analytics'

export default {
  plugins: [
    baiduAnalyticsPlugin({
      // options
    }),
  ],
}
```

### Reporting Events

After using this plugin, the global `hmt` array is available on the `window` object, and you can use it for [custom events reporting](https://tongji.baidu.com/holmes/Analytics/%E6%8A%80%E6%9C%AF%E6%8E%A5%E5%85%A5%E6%8C%87%E5%8D%97/JS%20API/JS%20API%20%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C).

## Options

### id

- Type: `string`

- Details: The ID of Baidu Analytics, which is the query of `hm.js` URL.
