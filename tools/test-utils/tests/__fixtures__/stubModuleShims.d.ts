declare module '@internal/test-utils-fixture' {
  export const fixtureValue: string
}

declare module '@temp/test-utils-fixture/index.js' {
  const fixtureDefault: string

  export default fixtureDefault
  export const fixtureNamed: () => string
}
