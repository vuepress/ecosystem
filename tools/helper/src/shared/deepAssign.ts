import { entries, isArray, isPlainObject } from './helper.js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IAnyObject = Record<string, any>

/**
 * Deep merge objects to the first one
 *
 * 深度合并对象到第一个对象
 *
 * @param originObject - The target object to merge into / 要合并到的目标对象
 * @param overrideObjects - Objects to merge from / 要合并的对象
 *
 * @returns Merged object / 合并后的对象
 *
 * @example
 * ```ts
 * const obj1 = { a: 1, b: { c: 2 } }
 * const obj2 = { b: { d: 3 }, e: 4 }
 * deepAssign(obj1, obj2) // { a: 1, b: { c: 2, d: 3 }, e: 4 }
 * ```
 */
export const deepAssign = <
  OriginType extends IAnyObject,
  MergeType extends IAnyObject = OriginType,
  FinalType extends Partial<OriginType> & Partial<MergeType> = OriginType &
    MergeType,
>(
  originObject: OriginType,
  ...overrideObjects: (MergeType | null | undefined)[]
): FinalType => {
  if (overrideObjects.length === 0) return originObject as unknown as FinalType

  /** Object being merged */
  const assignObject = overrideObjects.shift()

  if (assignObject) {
    entries(assignObject).forEach(([property, value]) => {
      if (property === '__proto__' || property === 'constructor') return
      if (isPlainObject(originObject[property]) && isPlainObject(value)) {
        deepAssign(originObject[property], value)
      } else if (isArray(value)) {
        ;(originObject as IAnyObject)[property] = [...value]
      } else if (isPlainObject(value)) {
        ;(originObject as IAnyObject)[property] = {
          ...value,
        }
      } else {
        ;(originObject as IAnyObject)[property] = assignObject[
          property
        ] as unknown
      }
    })
  }

  return deepAssign(originObject, ...overrideObjects)
}
