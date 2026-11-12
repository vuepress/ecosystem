import markdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'

import { tabs } from '../../src/node/tabs.js'

const md = markdownIt({ linkify: true }).use(tabs)

describe(tabs, () => {
  it('should render single block', () => {
    expect(
      md.render(`
::: tabs

@tab js

\`\`\`js
const a = 1;
\`\`\`

:::
    `),
    ).toMatchSnapshot('loose')

    expect(
      md.render(`
::: tabs
@tab js
\`\`\`js
const a = 1;
\`\`\`
:::
    `),
    ).toMatchSnapshot('tight')
  })

  it('should render multiple block', () => {
    expect(
      md.render(`
::: tabs

@tab js

\`\`\`js
const a = 1;
\`\`\`

@tab ts

\`\`\`ts
const a = 1;
\`\`\`

:::
`),
    ).toMatchSnapshot('loose')

    expect(
      md.render(`
::: tabs
@tab js
\`\`\`js
const a = 1;
\`\`\`
@tab ts
\`\`\`ts
const a = 1;
\`\`\`
:::
`),
    ).toMatchSnapshot('tight')
  })

  it('should support tabs id', () => {
    expect(
      md.render(`
::: tabs#event

@tab js

\`\`\`js
const a = 1;
\`\`\`

:::
    `),
    ).toMatchSnapshot('id')

    expect(
      md.render(`
::: tabs#event-id
@tab js
\`\`\`js
const a = 1;
\`\`\`
:::
    `),
    ).toMatchSnapshot('complex id')

    expect(
      md.render(`
::: tabs#id with space
@tab js
\`\`\`js
const a = 1;
\`\`\`
:::
    `),
    ).toMatchSnapshot('id with space')

    expect(
      md.render(`
::: tabs # id starts and having space in the end
@tab js
\`\`\`js
const a = 1;
\`\`\`
:::
    `),
    ).toMatchSnapshot('id starts and having space in the end')
  })

  it('should support active', () => {
    expect(
      md.render(`
::: tabs

@tab:active js

\`\`\`js
const a = 1;
\`\`\`

:::
    `),
    ).toMatchSnapshot('active loose')

    expect(
      md.render(`
::: tabs
@tab:active js
\`\`\`js
const a = 1;
\`\`\`
:::
    `),
    ).toMatchSnapshot('active tight')

    expect(
      md.render(`
::: tabs

@tab js

\`\`\`js
const a = 1;
\`\`\`

@tab:active ts

\`\`\`ts
const a = 1;
\`\`\`

:::
    `),
    ).toMatchSnapshot('active multiple')

    expect(
      md.render(`
::: tabs
@tab js
\`\`\`js
const a = 1;
\`\`\`
@tab:active ts
\`\`\`ts
const a = 1;
\`\`\`
:::
    `),
    ).toMatchSnapshot('active tight')
  })

  it('should ignore other items', () => {
    expect(
      md.render(`
::: tabs

\`\`\`coffee
const a = 1;
\`\`\`

@tab:active js

\`\`\`js
const a = 1;
\`\`\`

\`\`\`ts
const a = 1;
\`\`\`

:::
    `),
    ).toMatchSnapshot('loose')

    expect(
      md.render(`
::: tabs
\`\`\`coffee
const a = 1;
\`\`\`
@tab:active js
\`\`\`js
const a = 1;
\`\`\`
\`\`\`ts
const a = 1;
\`\`\`
:::
    `),
    ).toMatchSnapshot('tight')
  })
})
