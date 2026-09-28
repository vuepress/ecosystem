---
icon: puzzle
---

# Built-in Components

<NpmBadge package="@vuepress/theme-default" />

## Badge <Badge text="badge" />

:::: fields
@`type` type=`'tip' | 'warning' | 'danger' | 'important' | 'info' | 'note'` default=`'tip'`

The type of the badge.

@`text` type=string default=`''`

The text of the badge.

@`vertical` type=`'top' | 'middle' | 'bottom'` default=`undefined`

The vertical align of the badge.

::::

::: preview

- VuePress - <Badge type="tip" text="v2" vertical="top" />
- VuePress - <Badge type="warning" text="v2" vertical="middle" />
- VuePress - <Badge type="danger" text="v2" vertical="bottom" />
- VuePress - <Badge type="important" text="v2" vertical="middle" />
- VuePress - <Badge type="info" text="v2" vertical="middle" />
- VuePress - <Badge type="note" text="v2" vertical="middle" />

:::
