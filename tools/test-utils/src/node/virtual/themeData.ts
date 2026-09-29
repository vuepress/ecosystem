import { TEST_THEME_DATA_KEY } from '../../shared/keys.js'

const globals = globalThis as Record<string, unknown>

globals[TEST_THEME_DATA_KEY] ??= {}

export const themeData = globals[TEST_THEME_DATA_KEY]
