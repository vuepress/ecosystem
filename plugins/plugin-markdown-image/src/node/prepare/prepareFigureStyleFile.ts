import type { App } from 'vuepress'

export const prepareFigureStyleFile = async (
  app: App,
  contentSelector: string,
): Promise<string> =>
  app.writeTemp(
    'markdown-image/figure.css',
    `\
${contentSelector} figure {
  position: relative;

  display: flex;
  flex-direction: column;

  width: auto;
  margin: 1rem auto;

  text-align: center;
}

${contentSelector} figure > a[href*="://"]::after,
${contentSelector} figure > a[target=_blank]::after {
  display: none !important;
}

${contentSelector} figure img {
  overflow: hidden;
  margin: 0 auto;
  border-radius: 8px;
}

${contentSelector} figure img[tabindex]:focus {
  outline: 2px solid var(--theme-color, #3eaf7c);
}

${contentSelector} figure figcaption {
  display: inline-block;
  margin: 6px auto;
  font-size: 0.8rem;
}
`,
  )
