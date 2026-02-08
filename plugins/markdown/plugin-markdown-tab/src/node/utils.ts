// Single quote will break @vue/compiler-sfc
export const stringifyProp = (data: unknown): string =>
  JSON.stringify(data).replaceAll("'", '&#39;')
