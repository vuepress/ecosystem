import type { App } from 'vuepress/core'
import { getIdPrefix } from '../utils.js'

export const prepareInjectSass = (app: App, id: string): Promise<string> =>
  app.writeTemp(
    `sass-palette/${getIdPrefix(id)}inject.scss`,
    `\
@use "sass:meta";
@use "@sass-palette/helper";
@use "@sass-palette/${getIdPrefix(id)}palette";

$palette-variables: meta.module-variables("${getIdPrefix(id)}palette");
${
  app.env.isDebug
    ? `
@debug "${id} config variables: #{meta.inspect(meta.module-variables("${getIdPrefix(id)}config"))}";
@debug "${id} palette variables: #{meta.inspect($palette-variables)}";
`
    : ''
}

@include helper.inject($palette-variables);
`,
  )
