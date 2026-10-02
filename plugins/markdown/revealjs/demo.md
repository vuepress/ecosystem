---
url: /ecosystem/plugins/markdown/revealjs/demo.md
---
@slidestart

## Slide Demo

A simple slide demo and useful hints.

> By Mr.Hope. Please scroll mouse wheel down to the next slide

***

## Marking Slides

[👇](#/1/1)

\--

## Marking Slides

Use `---` to mark horizontal slides

Use `--` to separate vertical slides in a horizontal slide.

Use `<!-- .slide: ... -->` to add attributes to slide

Use `<!-- .element: ... -->` to add attributes to the previous HTML element

***

## Markdown

You can use all kinds of markup in slides.

\--

## Markdown

You can use all kinds of markup in slides.

### This is an H3

Headings will transform to UPPERCASE by default.

Here is paragraph with some **bold**, *italic*, ~~strike-through~~ text and a [link](https://mister-hope.com), and it can auto break itself, so you don't need to worry the length.

\--

## Markdown

You can use all kinds of markup in slides.

List is `inline-block` by default.

* Item
* Item
* Item

1. Item 1
2. Item 2
3. Item 3

\--

## Markdown

You can use all kinds of markup in slides.

Code block will get auto highlight if you enable `highlight` plugin.

```js
const a = 1
```

\--

## Markdown

You can use all kinds of markup in slides.

You can also write math equation using tex syntax if you enable `math` plugin.

$$
J(\theta\_0,\theta\_1) = \sum\_{i=0}
$$

\--

## Markdown

You can use all kinds of markup in slides.

⚠**Note**: Table, hr and other nonstandard Markdown syntax is not supported.

***

## Layout

\--

## Layout

👆 The `r-fit-text` class makes text as large as possible without overflowing the slide.

\--

## Layout

![Logo](https://theme-hope-assets.vuejs.press/logo.svg)

👆 The `r-stretch` class helper lets you resize an element, like an image or video, to cover the remaining vertical space in a slide.

\--

## Layout

### Background

Custom background by adding `data-background` attribute to slide.

***

## Fragment

\--

## Fragment

Fragments are used to highlight or incrementally reveal individual elements on a slide.

Add `fragment` and animation class to element.

\--

## Fragment

### Animation class

* `fade-in`

- `fade-out`

* `fade-up`

- `fade-down`

* `fade-left`

- `fade-right`

* `fade-in-then-out`

- `fade-in-then-semi-out`

\--

## Fragment

### Animation class

* `grow`

- `shrink`

* `strike`

- `highlight-red`

* `highlight-green`

- `highlight-blue`

* `highlight-current-red`

- `highlight-current-green`

* `highlight-current-blue`

\--

## Fragment

### Multiple fragments

Multiple fragments can be applied to the same element sequentially by wrapping it

\--

## Fragment

### Order

Order can be changed using the `data-fragment-index` attribute.

Multiple elements can appear at the same index.

* Appears last

- Appears second

* Appears first

- Appears second

***

## Transition

\--

## Transition

Transition can be changed by setting the `transition` config option globally or `data-transition` attribute on slide.

Possible values:

* none
* fade
* slide

- convex
- concave
- zoom

\--

## Transition

### Auto animate

`data-auto-animate` can be added on nearby slides to make an animation on unchanged elements.

***

## Functions

\--

## Functions

### Code

By enabling `highlight` plugin, you can highlight code blocks.

You can use `[a-b|c-d]` syntax to highlight lines by steps.

```js [1-2|3|4]
const a = 1
const b = 2
const c = (x) => 1 + 2 + x
c(3)
```

\--

## Functions

### Overview

Press `Esc` or `O` to enter overview mode when the slide is active

\--

## Functions

### Full Screen

Press `F` or `F11` to enter full-screen when the slide is active

\--

## Functions

### Zoom

Hold down the `alt` key (`ctrl` in Linux) and click on any element to zoom towards it.

Click again to zoom back out.

***

## The End

@slideend
