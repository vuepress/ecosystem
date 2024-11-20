// Single quote will break @vue/compiler-sfc
export const stringifyProp = (data: unknown): string =>
  JSON.stringify(data).replace(/'/g, '&#39')
