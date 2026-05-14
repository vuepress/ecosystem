import MarkdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'

import { tabs } from '../../src/node/tabs.js'

const markdownIt = new MarkdownIt({ linkify: true }).use(tabs)

describe(tabs, () => {
  it('should render single block', () => {
    expect(
      markdownIt.render(`
::: tabs

@tab js

\`\`\`js
const a = 1;
\`\`\`

:::
    `),
    ).toMatchSnapshot('loose')

    expect(
      markdownIt.render(`
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
      markdownIt.render(`
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
      markdownIt.render(`
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
      markdownIt.render(`
::: tabs#event

@tab js

\`\`\`js
const a = 1;
\`\`\`

:::
    `),
    ).toMatchSnapshot('id')

    expect(
      markdownIt.render(`
::: tabs#event-id
@tab js
\`\`\`js
const a = 1;
\`\`\`
:::
    `),
    ).toMatchSnapshot('complex id')

    expect(
      markdownIt.render(`
::: tabs#id with space
@tab js
\`\`\`js
const a = 1;
\`\`\`
:::
    `),
    ).toMatchSnapshot('id with space')

    expect(
      markdownIt.render(`
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
      markdownIt.render(`
::: tabs

@tab:active js

\`\`\`js
const a = 1;
\`\`\`

:::
    `),
    ).toMatchSnapshot('active loose')

    expect(
      markdownIt.render(`
::: tabs
@tab:active js
\`\`\`js
const a = 1;
\`\`\`
:::
    `),
    ).toMatchSnapshot('active tight')

    expect(
      markdownIt.render(`
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
      markdownIt.render(`
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
      markdownIt.render(`
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
      markdownIt.render(`
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
