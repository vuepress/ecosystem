import { TEST_ROUTES_KEY } from '../../shared/keys.js'

interface TestRoutesState {
  redirects: Record<string, string>
  routes: Record<string, unknown>
}

const globals = globalThis as Record<string, unknown>

const state = (globals[TEST_ROUTES_KEY] ??= {
  redirects: {},
  routes: {
    '/404.html': {
      loader: (): Promise<{ _pageData: null; default: () => null }> =>
        Promise.resolve({ _pageData: null, default: () => null }),
      meta: {},
    },
  },
}) as TestRoutesState

export const { routes } = state
export const { redirects } = state
