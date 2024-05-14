import type { App } from 'vuepress'

export const prepareFigureStyleFile = async (app: App): Promise<string> =>
  app.writeTemp(
    'markdown-image/figure.css',
    `\
figure {
  text-align: center;
}

figcaption {
  font-size: 0.8rem;
}

/* hide external-link-icon */
figure > a[href*="://"]::after,
figure > a[target=_blank]::after {
  display: none !important;
}
`,
  )
