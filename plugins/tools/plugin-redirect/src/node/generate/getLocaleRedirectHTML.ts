import { removeEndingSlash } from '@vuepress/helper'
import type { RedirectBehaviorConfig } from '../../shared/index.js'

export const getLocaleRedirectHTML = (
  {
    config,
    defaultBehavior,
    defaultLocale,
    localeFallback,
  }: RedirectBehaviorConfig,
  availableLocales: string[],
  base: string,
): string => `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="robots" content="noindex">
  <title>Redirecting...</title>
  <script>
    const { hash, origin, pathname } = window.location;
    const routePath = pathname.substring(${base.length});
    const { languages } = window.navigator;
    const anchor = hash.substring(1);

    const config = ${JSON.stringify(config)};
    const availableLocales = ${JSON.stringify(availableLocales)};
    const defaultLocale = ${
      availableLocales.includes(defaultLocale)
        ? JSON.stringify(defaultLocale)
        : 'availableLocales.pop()'
    };
    const defaultBehavior = ${JSON.stringify(defaultBehavior)}

    let matchedLocalePath = null;

    // get matched locale
    findLanguage:
      for (const lang of languages)
        for (const [localePath, langs] of Object.entries(config))
          if (langs.includes(lang)) {
${
  localeFallback
    ? `\
            if (!availableLocales.includes(localePath))
              continue;
`
    : ``
}\
            matchedLocalePath = localePath;
            break findLanguage;
          }

    // default link
    const defaultLink = defaultLocale? \`\${origin}${removeEndingSlash(
      base,
    )}\${defaultLocale}\${routePath}\${anchor? \`#\${anchor}\`: ""}\`: null;

    // a locale matches
    if (matchedLocalePath) {
      const localeLink = \`\${origin}${removeEndingSlash(
        base,
      )}\${matchedLocalePath}\${routePath}\${anchor? \`#\${anchor}\`: ""}\`;

      if (availableLocales.includes(matchedLocalePath)) {
        location.href = localeLink;
      }
      // the page does not exist
      else {
        // locale homepage
        if (defaultBehavior === "homepage") {
          location.href = \`\${origin}${removeEndingSlash(
            base,
          )}\${matchedLocalePath}\`;
        }
        // default locale page
        else if (defaultBehavior === "defaultLocale" && defaultLink) {
          location.href = defaultLink;
        }
        // as is to get a 404 page of that locale
        else {
          location.href = localeLink;
        }
      }
    }
    // we have a default page
    else if (defaultLink) {
      location.href = defaultLink;
    }
    else {
      location.href = \`\${origin}${removeEndingSlash(base)}/404.html\`;
    }
  </script>
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>
`
