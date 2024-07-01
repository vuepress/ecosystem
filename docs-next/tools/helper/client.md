# Client Related

## Composables APIs

### hasGlobalComponent

Check whether a component is registered globally.

::: tip

1. Local import of the component does not affect the result.
1. When calling outside `setup` scope, you need to pass the `app` instance as the second parameter.

:::

```ts
export const hasGlobalComponent: (name: string, app?: App) => boolean
```

::: details Example

```ts
// if you globally register `<my-component>`
hasGlobalComponent('MyComponent') // true
hasGlobalComponent('my-component') // true

hasGlobalComponent('MyComponent2') // false
```

:::

### useLocaleConfig

Get current locale config from locales settings.

```ts
export const useLocaleConfig: <T extends LocaleData>(
  localesConfig: RequiredLocaleConfig<T>,
) => ComputedRef<T>
```

::: details Example

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
