---
outline: 2
---

# 内置组件

<NpmBadge package="@vuepress/theme-default" />

## Badge <Badge text="badge" />

- Props:

  - type
    - 类型： `'info' |'tip' | 'warning' | 'danger'`
    - 默认值： `'tip'`
  - text
    - 类型： `string`
    - 默认值： `''`

### 示例

**输入：**

```md
- VuePress - <Badge type="info" text="v2" />
- VuePress - <Badge type="tip" text="v2" />
- VuePress - <Badge type="warning" text="v2" />
- VuePress - <Badge type="danger" text="v2" />

#### Title <Badge type="info" text="default" />

#### Title <Badge type="tip" text="^1.9.0" />

#### Title <Badge type="warning" text="beta" />

#### Title <Badge type="danger" text="caution" />
```

**输出：**

- VuePress - <Badge type="info" text="v2" />
- VuePress - <Badge type="tip" text="v2" />
- VuePress - <Badge type="warning" text="v2" />
- VuePress - <Badge type="danger" text="v2" />

#### Title <Badge type="info" text="default" />

#### Title <Badge type="tip" text="^1.9.0" />

#### Title <Badge type="warning" text="beta" />

#### Title <Badge type="danger" text="caution" />

### 自定义子节点

`<Badge>` 接受 `children`, 这将显示在徽标中。

```html
### Title <Badge type="info">custom element</Badge>
```

### Title <Badge type="info">custom element</Badge>

### 自定义不同类型徽标的背景色

可以通过覆盖 css 来自定义不同类型 `<Badge />` 的样式。以下是默认值：

```css
:root {
  --vp-badge-info-border: transparent;
  --vp-badge-info-text: var(--vp-c-text-2);
  --vp-badge-info-bg: var(--vp-c-default-soft);

  --vp-badge-tip-border: transparent;
  --vp-badge-tip-text: var(--vp-c-brand-1);
  --vp-badge-tip-bg: var(--vp-c-brand-soft);

  --vp-badge-warning-border: transparent;
  --vp-badge-warning-text: var(--vp-c-warning-1);
  --vp-badge-warning-bg: var(--vp-c-warning-soft);

  --vp-badge-danger-border: transparent;
  --vp-badge-danger-text: var(--vp-c-danger-1);
  --vp-badge-danger-bg: var(--vp-c-danger-soft);
}
```
