// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
type Primitive = Function | boolean | number | string | null | undefined

type NotNill<T> = T extends null | undefined ? never : T

export type DeepRequired<T> = T extends Primitive
  ? NotNill<T>
  : {
      [P in keyof T]-?: T[P] extends (infer U)[]
        ? DeepRequired<U>[]
        : T[P] extends readonly (infer V)[]
          ? DeepRequired<V>
          : DeepRequired<T[P]>
    }
