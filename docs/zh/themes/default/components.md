---
icon: puzzle
---

# 内置组件

<NpmBadge package="@vuepress/theme-default" />

## Badge <Badge text="badge" />

- Props:

  - type
    - 类型： `'tip' | 'warning' | 'danger' | 'important' | 'info' | 'note'`
    - 默认值： `'tip'`
  - text
    - 类型： `string`
    - 默认值： `''`
  - vertical
    - 类型： `'top' | 'middle' | 'bottom' | undefined`
    - 默认值： `undefined`

- 示例：

**输入**

```md
- VuePress - <Badge type="tip" text="v2" vertical="top" />
- VuePress - <Badge type="warning" text="v2" vertical="middle" />
- VuePress - <Badge type="danger" text="v2" vertical="bottom" />
- VuePress - <Badge type="important" text="v2" vertical="middle" />
- VuePress - <Badge type="info" text="v2" vertical="middle" />
- VuePress - <Badge type="note" text="v2" vertical="middle" />
```

**输出**

- VuePress - <Badge type="tip" text="v2" vertical="top" />
- VuePress - <Badge type="warning" text="v2" vertical="middle" />
- VuePress - <Badge type="danger" text="v2" vertical="bottom" />
- VuePress - <Badge type="important" text="v2" vertical="middle" />
- VuePress - <Badge type="info" text="v2" vertical="middle" />
- VuePress - <Badge type="note" text="v2" vertical="middle" />
