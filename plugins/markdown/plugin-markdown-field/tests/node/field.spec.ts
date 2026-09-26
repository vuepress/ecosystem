import MarkdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'

import { field } from '../../src/node/field.js'

const createMarkdownIt = (): MarkdownIt => new MarkdownIt().use(field)

describe(field, () => {
  it('should wrap fields with vp-field container', () => {
    const markdownIt = createMarkdownIt()

    expect(
      markdownIt.render(`::: fields
@\`theme\` type="ThemeConfig" required
Theme Config
:::
`),
    ).toBe(`<div class="vp-fields">
<div class="vp-field">
<div class="vp-field-header">
<span class="vp-field-name" id="theme">theme</span>
<span class="vp-field-badges">
  <span class="vp-field-required">Required</span>
</span>
<code class="vp-field-type">ThemeConfig</code>
</div>
<div class="vp-field-description">
<p>Theme Config</p>
</div>
</div>
</div>
`)
  })

  it('should render optional and default attributes', () => {
    const markdownIt = createMarkdownIt()

    expect(
      markdownIt.render(`::: fields
@\`enabled\` type="boolean" optional default=\`true\`
Whether it's enabled
:::
`),
    ).toBe(`<div class="vp-fields">
<div class="vp-field">
<div class="vp-field-header">
<span class="vp-field-name" id="enabled">enabled</span>
<span class="vp-field-badges">
  <span class="vp-field-optional">Optional</span>
</span>
<code class="vp-field-type">boolean</code>
</div>
<div class="vp-field-default">
<span class="vp-field-default-label">Default</span>
<code>true</code>
</div>
<div class="vp-field-description">
<p>Whether it's enabled</p>
</div>
</div>
</div>
`)
  })

  it('should render a backtick default value as inline code', () => {
    const result = createMarkdownIt().render(`::: fields
@\`theme\` default=\`'nord'\`
:::
`)

    expect(result).toContain(
      '<span class="vp-field-default-label">Default</span>\n<code>&#39;nord&#39;</code>',
    )
  })

  it('should render a plain default value as text', () => {
    const result = createMarkdownIt().render(`::: fields
@\`timeout\` type=number default="Determined by the theme"
:::
`)

    expect(result).toContain(
      '<span class="vp-field-default-label">Default</span>\nDetermined by the theme',
    )
    expect(result).not.toContain('<code>Determined by the theme</code>')
  })

  it('should mark deprecated fields', () => {
    const markdownIt = createMarkdownIt()

    const result = markdownIt.render(`::: fields
@\`other\` type="string" deprecated
Deprecated field
:::
`)

    expect(result).toContain('class="vp-field deprecated"')
    expect(result).toContain('class="vp-field-deprecated"')
    expect(result).toContain('>Deprecated<')
  })

  it('should support nested fields', () => {
    const markdownIt = createMarkdownIt()

    const result = markdownIt.render(`::: fields
@\`parent\` type="object"
Parent description.
@@\`parent.name\` type="string"
Name description.
:::
`)

    expect(result).toContain('<dl>')
    expect(result).toContain('Parent description.')
    expect(result).toContain('Name description.')
  })

  it('should escape field name and values', () => {
    const markdownIt = createMarkdownIt()
    const result = markdownIt.render(`::: fields
@\`a<b\` type="st&r"
:::
`)

    expect(result).toContain('>a&lt;b</span>')
    expect(result).toContain('st&amp;r')
  })

  it('should use locale config for badges', () => {
    const markdownIt = new MarkdownIt().use(field, {
      locales: {
        '/': {
          default: 'Default',
          required: 'Required',
          optional: 'Optional',
          deprecated: 'Deprecated',
        },
        '/zh/': {
          default: '默认值',
          required: '必填',
          optional: '可选',
          deprecated: '已弃用',
        },
      },
    })

    const zhResult = markdownIt.render(
      `::: fields
@\`theme\` type="ThemeConfig" required default="{}"
Theme Config

@\`enabled\` type="boolean" optional
Enabled
:::
`,
      { filePathRelative: 'zh/foo.md' },
    )

    expect(zhResult).toContain('>必填<')
    expect(zhResult).toContain('>可选<')
    expect(zhResult).toContain('>默认值<')

    const enResult = markdownIt.render(
      `::: fields
@\`theme\` type="ThemeConfig" required
Theme Config
:::
`,
      { filePathRelative: 'foo.md' },
    )

    expect(enResult).toContain('>Required<')
  })

  it('should add slugified ids to field items', () => {
    const markdownIt = createMarkdownIt()

    const result = markdownIt.render(`::: fields
@\`markdown.chartjs\` type="boolean"
Chart.js support

@\`markdown.DANGEROUS_ALLOW_SCRIPT_EXECUTION\` type="boolean"
Allow script execution
:::
`)

    expect(result).toContain(
      '<span class="vp-field-name" id="markdown-chartjs">',
    )
    expect(result).toContain(
      '<span class="vp-field-name" id="markdown-dangerous-allow-script-execution">',
    )
  })

  it('should strip array and record placeholders from field ids', () => {
    const markdownIt = createMarkdownIt()

    const result = markdownIt.render(`::: fields
@\`contributors.info[*].username\` type=string
Username

@\`config[*].actions[*].text\` type=string
Text

@\`locales.<localePath>.title\` type=string
Title
:::
`)

    expect(result).toContain(
      '<span class="vp-field-name" id="contributors-info-username">contributors.info[*].username</span>',
    )
    expect(result).toContain(
      '<span class="vp-field-name" id="config-actions-text">config[*].actions[*].text</span>',
    )
    expect(result).toContain(
      '<span class="vp-field-name" id="locales-localepath-title">locales.&lt;localePath&gt;.title</span>',
    )
  })

  it('should make duplicate field ids unique', () => {
    const markdownIt = createMarkdownIt()

    const result = markdownIt.render(`::: fields
@\`theme\` type="object"
Theme config

@@\`theme\` type="string"
Nested theme
:::
`)

    expect(result).toContain('id="theme"')
    expect(result).toContain('id="theme-1"')
  })

  it('should not conflict with ids already used in the page', () => {
    const markdownIt = createMarkdownIt()

    // `#theme` is used by the fields container, so the field item should not reuse it
    const result = markdownIt.render(`::: fields #theme
@\`theme\` type="object"
Theme config
:::
`)

    expect(result).toContain('<span class="vp-field-name" id="theme-1">')
  })

  it('should use custom slugify', () => {
    const markdownIt = new MarkdownIt().use(field, {
      slugify: (str) => `field-${str}`,
    })

    const result = markdownIt.render(`::: fields
@\`theme\` type="object"
Theme config
:::
`)

    expect(result).toContain('<span class="vp-field-name" id="field-theme">')
  })

  it('should keep a field that is not closed as plain content', () => {
    const markdownIt = createMarkdownIt()

    const result = markdownIt.render(`::: fields
@theme type="object"
:::
`)

    expect(result).not.toContain('<span class="vp-field-name"')
  })

  it('should keep an escaped marker as content', () => {
    const markdownIt = createMarkdownIt()

    const result = markdownIt.render(`::: fields
@\`theme\` type=object

\\@\`not-a-field\`
:::
`)

    expect(result).toContain('<p>@<code>not-a-field</code></p>')
    expect(result).not.toContain('id="not-a-field"')
  })
})
