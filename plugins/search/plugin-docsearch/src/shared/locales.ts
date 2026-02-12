import type { DocSearchProps } from '@docsearch/js'
import type { DeepRequired } from '@vuepress/helper/shared'

export type DocSearchLocaleData = DeepRequired<
  Pick<DocSearchProps, 'placeholder' | 'translations'>
>
