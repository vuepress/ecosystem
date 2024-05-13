# 客户端相关

## 可组合 API

### hasGlobalComponent

检查组件是否已全局注册。

::: tip

1. 组件的局部导入不影响结果。
1. 当在 `setup` 之外调用时，你需要将 `app` 实例作为第二个参数传递。

:::

```ts
export const hasGlobalComponent: (name: string, app?: App) => boolean
```

::: details 示例

```ts
// 如果你全局注册了 `<my-component>`
hasGlobalComponent('MyComponent') // true
hasGlobalComponent('my-component') // true

hasGlobalComponent('MyComponent2') // false
```

:::

### useLocaleConfig

从语言环境设置中获取当前语言环境配置。

```ts
export const useLocaleConfig: <T extends LocaleData>(
  localesConfig: RequiredLocaleConfig<T>,
) => ComputedRef<T>
```

::: details 示例

```ts
const localesCOnfig = {
  '/': 'Title',
  '/zh/': '标题',
}

const locale = useLocaleConfig(localesConfig)

// under `/page`
locale.value // 'Title'

// under `/zh/page`
locale.value // '标题'
```

:::
