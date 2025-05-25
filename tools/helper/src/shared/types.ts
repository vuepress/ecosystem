// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
type Primitive = Function | boolean | number | string | null | undefined

type NotNill<T> = T extends null | undefined ? never : T

/**
 * Recursively make all properties of an object required
 *
 * @template T - The type to make required
 * @returns The type with all properties required
 *
 * @example
 * ```ts
 * type A = {
 *   a?: {
 *     b?: string
 *    c?: number
 *   }
 * }
 *
 * type B = DeepRequired<A>
 * // B is now:
 * // type B = {
 * //   a: {
 * //     b: string
 * //     c: number
 * //   }
 * // }
 * ```
 */
export type DeepRequired<T> = T extends Primitive
  ? NotNill<T>
  : {
      [P in keyof T]-?: T[P] extends (infer U)[]
        ? DeepRequired<U>[]
        : T[P] extends readonly (infer V)[]
          ? DeepRequired<V>
          : DeepRequired<T[P]>
    }

/**
 * A literal type that supports custom further strings but preserves autocompletion in IDEs.
 *
 * @see {@link https://github.com/microsoft/TypeScript/issues/29729#issuecomment-471566609 | copied from issue}
 */
export type LiteralUnion<Union extends Base, Base = string> =
  | Union
  | (Base & { IGNORE_ME?: never })
