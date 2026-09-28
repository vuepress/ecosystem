---
icon: puzzle
---

# 内置组件

<NpmBadge package="@vuepress/theme-default" />

## Badge <Badge text="badge" />

:::: fields
@`type` type=`'tip' | 'warning' | 'danger' | 'important' | 'info' | 'note'` default=`'tip'`

徽章类型。

@`text` type=string default=`''`

徽章文字。

@`vertical` type=`'top' | 'middle' | 'bottom'` default=`undefined`

徽章的垂直对齐方式。

::::

::: preview

- VuePress - <Badge type="tip" text="v2" vertical="top" />
- VuePress - <Badge type="warning" text="v2" vertical="middle" />
- VuePress - <Badge type="danger" text="v2" vertical="bottom" />
- VuePress - <Badge type="important" text="v2" vertical="middle" />
- VuePress - <Badge type="info" text="v2" vertical="middle" />
- VuePress - <Badge type="note" text="v2" vertical="middle" />

:::
