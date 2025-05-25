import type { DocSearchProps } from '@docsearch/react'
import type { DeepRequired } from '@vuepress/helper/shared'

export type DocSearchLocaleData = DeepRequired<
  Pick<DocSearchProps, 'placeholder' | 'translations'>
>
