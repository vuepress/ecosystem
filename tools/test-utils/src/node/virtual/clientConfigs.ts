import { TEST_CLIENT_CONFIGS_KEY } from '../../shared/keys.js'

const globals = globalThis as Record<string, unknown>

globals[TEST_CLIENT_CONFIGS_KEY] ??= []

export const clientConfigs = globals[TEST_CLIENT_CONFIGS_KEY]
