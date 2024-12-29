import type { DocSearchProps } from '@docsearch/react'

type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P]
}

export type DocSearchLocaleData = DeepRequired<
  Pick<DocSearchProps, 'placeholder' | 'translations'>
>
