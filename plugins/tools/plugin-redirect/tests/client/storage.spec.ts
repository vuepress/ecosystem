import { describe, expect, it } from 'vitest'
// @vitest-environment happy-dom
import { nextTick } from 'vue'

import {
  statusLocalStorage,
  statusSessionStorage,
} from '../../src/client/utils/storage.js'

const REDIRECT_STORAGE_KEY = 'VUEPRESS_REDIRECT_STATUS'

const resetStorage = async (): Promise<void> => {
  localStorage.clear()
  sessionStorage.clear()
  statusLocalStorage.value = {}
  statusSessionStorage.value = {}
  // flush the queued persistence of the reset before the test writes again
  await nextTick()
  localStorage.clear()
  sessionStorage.clear()
}

describe('redirect persistence', () => {
  it('persists the status under the namespaced key in localStorage', async () => {
    await resetStorage()

    statusLocalStorage.value = { '/zh/': true }
    await nextTick()

    expect(localStorage.getItem(REDIRECT_STORAGE_KEY)).toBe('{"/zh/":true}')
    expect(sessionStorage.getItem(REDIRECT_STORAGE_KEY)).toBeNull()
  })

  it('persists the session status in sessionStorage only', async () => {
    await resetStorage()

    statusSessionStorage.value = { '/zh/': true }
    await nextTick()

    expect(sessionStorage.getItem(REDIRECT_STORAGE_KEY)).toBe('{"/zh/":true}')
    expect(localStorage.getItem(REDIRECT_STORAGE_KEY)).toBeNull()
  })

  it('keeps the local and session status independent', async () => {
    await resetStorage()

    statusLocalStorage.value = { '/zh/': true }
    statusSessionStorage.value = { '/en/': true }
    await nextTick()

    expect(statusLocalStorage.value).toStrictEqual({ '/zh/': true })
    expect(statusSessionStorage.value).toStrictEqual({ '/en/': true })
  })
})
