---
outline: 2
---

# Built-in Components

<NpmBadge package="@vuepress/theme-default" />

## Badge <Badge text="badge" />

- Props:

  - type
    - Type: `'info' |'tip' | 'warning' | 'danger'`
    - Default: `'tip'`
  - text
    - Type: `string`
    - Default: `''`

### Example

**Input:**

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

**Output:**

- VuePress - <Badge type="info" text="v2" />
- VuePress - <Badge type="tip" text="v2" />
- VuePress - <Badge type="warning" text="v2" />
- VuePress - <Badge type="danger" text="v2" />

#### Title <Badge type="info" text="default" />

#### Title <Badge type="tip" text="^1.9.0" />

#### Title <Badge type="warning" text="beta" />

#### Title <Badge type="danger" text="caution" />

## Custom Children

`<Badge>` accept `children`, which will be displayed in the badge.

```html
### Title <Badge type="info">custom element</Badge>
```

### Title <Badge type="info">custom element</Badge>

### Customize Type Color

You can customize the style of badges by overriding css variables. The following are the default values:

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
