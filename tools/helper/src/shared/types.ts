// oxlint-disable-next-line typescript/ban-types, typescript/no-unsafe-function-type
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
      [Key in keyof T]-?: T[Key] extends (infer ItemType)[]
        ? DeepRequired<ItemType>[]
        : T[Key] extends readonly (infer ReadOnlyItemType)[]
          ? DeepRequired<ReadOnlyItemType>
          : DeepRequired<T[Key]>
    }

/**
 * A literal type that supports custom further strings but preserves autocompletion in IDEs.
 *
 * @see {@link https://github.com/microsoft/TypeScript/issues/29729#issuecomment-471566609 | copied from issue}
 */
export type LiteralUnion<Union extends Base, Base = string> =
  | Union
  | (Base & { IGNORE_ME?: never })

/**
 * Convert a union type to an intersection type using [distributive conditional types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types).
 *
 */
export type UnionToIntersection<Union> =
  // `extends unknown` is always going to be the case and is used to convert the
  // `Union` into a [distributive conditional type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types).
  (
    Union extends unknown
      ? // The union type is used as the only argument to a function since the union
        // of function arguments is an intersection.
        (distributedUnion: Union) => void
      : // This won't happen.
        never
  ) extends (mergedIntersection: infer Intersection) => void // arguments of unions of functions as an intersection of the union. // Infer the `Intersection` type since TypeScript represents the positional
    ? // The `& Union` is to ensure result of `UnionToIntersection<A | B>` is always assignable to `A | B`
      Intersection & Union
    : never
