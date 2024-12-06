import { getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress'
import type {
  MarkdownKatexPluginOptions,
  MarkdownMathPluginOptions,
} from '../options.js'
import { CLIENT_FOLDER } from '../utils.js'

export const prepareClientConfigFile = async (
  app: App,
  mathRenderer: 'katex' | 'mathjax',
  options: MarkdownMathPluginOptions,
): Promise<string> => {
  let content = ''

  if (mathRenderer === 'katex') {
    content += `\
import "${getModulePath('katex/dist/katex.min.css', import.meta)}";
import "${CLIENT_FOLDER}styles/katex.css";
${
  (options as MarkdownKatexPluginOptions).copy
    ? `\
import { useKatexCopy } from "${CLIENT_FOLDER}composables/useKatexCopy.js";

export default {
  setup: () => {
    useKatexCopy();
  }
};
`
    : ''
}`
  } else {
    content += `\
import './mathjax.css';
`
  }

  return app.writeTemp(`markdown-math/config.js`, content)
}
