export const PLUGIN_NAME = '@vuepress/plugin-llms'

export const DEFAULT_LLMS_TITLE = 'LLMs Documentation'
export const DEFAULT_LLMS_DETAILS =
  'This file contains links to all documentation sections.'

/** Default template for the `llms.txt` file. */
export const DEFAULT_LLMSTXT_TEMPLATE = `\
# {title}

{description}

{alternateLinks}{details}

## Table of Contents

{toc}\
`
