import type { App } from 'vuepress'

export const prepareFigureStyleFile = async (
  app: App,
  contentSelector: string,
): Promise<string> =>
  app.writeTemp(
    'markdown-image/figure.css',
    `\
${contentSelector} figure {
  text-align: center;
}

figcaption {
  font-size: 0.8rem;
}

/* hide external-link-icon */
${contentSelector} figure > a[href*="://"]::after,
${contentSelector} figure > a[target=_blank]::after {
  display: none !important;
}
`,
  )
