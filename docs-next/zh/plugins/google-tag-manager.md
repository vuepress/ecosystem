# google-tag-manager

<NpmBadge package="@vuepress/plugin-google-tag-manager" />

将 [Google 跟踪代码管理器](https://tagmanager.google.com/) 集成到 VuePress 中。

该插件会引入 [Google 跟踪代码管理器](https://developers.google.com/tag-platform/tag-manager?hl=zh-cn)。

## 使用方法

```bash
npm i -D @vuepress/plugin-google-tag-manager@next
```

```ts
import { googleTagManagerPlugin } from '@vuepress/plugin-google-tag-manager'

export default {
  plugins: [
    googleTagManagerPlugin({
      // 配置项
    }),
  ],
}
```

## 选项

### id

- 类型： `string`

- 详情：

  Google 跟踪代码管理器 的容器 ID ，应以 `'GTM-'` 开头。

  你可以在 [这里](https://tagmanager.google.com/#/home) 添加容器并找到容器 ID。

- 示例：

```ts
export default {
  plugins: [
    googleTagManagerPlugin({
      id: 'G-XXXXXXXXXX',
    }),
  ],
}
```
