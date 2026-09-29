import { describe, expect, it } from 'vitest'

import { isKeyMatched } from '../../src/client/utils/isKeyMatched.js'

type Modifiers = Partial<
  Record<'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey', boolean>
>

const createEvent = (key: string, modifiers: Modifiers = {}): KeyboardEvent =>
  ({
    key,
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    shiftKey: false,
    ...modifiers,
  }) as KeyboardEvent

describe(isKeyMatched, () => {
  it('should match a string hotkey', () => {
    expect(isKeyMatched(createEvent('Escape'), ['Escape'])).toBe(true)
    expect(isKeyMatched(createEvent('Escape'), ['Enter'])).toBe(false)
  })

  it('should match a hotkey with modifiers', () => {
    expect(
      isKeyMatched(createEvent('k', { ctrlKey: true }), [
        { key: 'k', ctrl: true },
      ]),
    ).toBe(true)
  })

  it('should match a hotkey with the meta key', () => {
    expect(
      isKeyMatched(createEvent('k', { metaKey: true }), [
        { key: 'k', meta: true },
      ]),
    ).toBe(true)
  })

  it('should not match a meta hotkey when the meta key is not pressed', () => {
    expect(isKeyMatched(createEvent('k'), [{ key: 'k', meta: true }])).toBe(
      false,
    )
  })

  it('should not match a hotkey without modifiers when a modifier is pressed', () => {
    expect(
      isKeyMatched(createEvent('k', { metaKey: true }), [{ key: 'k' }]),
    ).toBe(false)
    expect(
      isKeyMatched(createEvent('k', { ctrlKey: true }), [{ key: 'k' }]),
    ).toBe(false)
  })
})
