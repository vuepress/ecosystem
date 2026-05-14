import { describe, expect, it, vi } from 'vitest'

import {
  KNOWN_IMAGE_EXTENSIONS,
  KNOWN_MEDIA_EXTENSIONS,
} from '../src/node/constants.js'
import {
  createFindPattern,
  normalizeRules,
} from '../src/node/normalizeRules.js'

describe('plugin-replace-assets > normalizeRules', () => {
  it('should work with empty options', () => {
    expect(normalizeRules('')).toStrictEqual([])
    expect(normalizeRules([])).toStrictEqual([])
    expect(normalizeRules({})).toStrictEqual([])
    expect(normalizeRules({ rules: [] })).toStrictEqual([])
  })

  it('should work with string', () => {
    const rules = normalizeRules('https://example.com/assets/')

    expect(rules).toStrictEqual([
      {
        find: createFindPattern('images', KNOWN_IMAGE_EXTENSIONS),
        replacement: 'https://example.com/assets/',
      },
      {
        find: createFindPattern('medias', KNOWN_MEDIA_EXTENSIONS),
        replacement: 'https://example.com/assets/',
      },
    ])
  })

  it('should work with function', () => {
    const replacement = vi.fn<(url: string) => string>(
      (url) => `https://example.com/assets/${url}`,
    )
    const rules = normalizeRules(replacement)

    expect(rules).toStrictEqual([
      {
        find: createFindPattern('images', KNOWN_IMAGE_EXTENSIONS),
        replacement,
      },
      {
        find: createFindPattern('medias', KNOWN_MEDIA_EXTENSIONS),
        replacement,
      },
    ])
  })

  it('should work with single rule', () => {
    const rules = normalizeRules({
      find: '^/images/.*\\.(jpe?g|png|gif|svg)$',
      replacement: 'https://example.com/images/',
    })

    expect(rules).toStrictEqual([
      {
        find: '^/images/.*\\.(jpe?g|png|gif|svg)$',
        replacement: 'https://example.com/images/',
      },
    ])
  })

  it('should work with multiple rules', () => {
    const rules = normalizeRules([
      {
        find: '^/images/.*\\.(jpe?g|png|gif|svg)$',
        replacement: 'https://example.com/images/',
      },
      {
        find: '^/medias/.*\\.(mp4|ogg|ogv|webm)$',
        replacement: 'https://example.com/medias/',
      },
    ])

    expect(rules).toStrictEqual([
      {
        find: '^/images/.*\\.(jpe?g|png|gif|svg)$',
        replacement: 'https://example.com/images/',
      },
      {
        find: '^/medias/.*\\.(mp4|ogg|ogv|webm)$',
        replacement: 'https://example.com/medias/',
      },
    ])
  })

  it('should work with presets', () => {
    const media = vi.fn<(url: string) => string>(
      (url) => `https://example.com/medias/${url}`,
    )
    const rules = normalizeRules({
      image: 'https://example.com/images/',
      media,
    })

    expect(rules).toStrictEqual([
      {
        find: createFindPattern('images', KNOWN_IMAGE_EXTENSIONS),
        replacement: 'https://example.com/images/',
      },
      {
        find: createFindPattern('medias', KNOWN_MEDIA_EXTENSIONS),
        replacement: media,
      },
    ])
  })

  it('should work with custom single rule', () => {
    const rules = normalizeRules({
      rules: {
        find: '^/images/.*\\.(jpe?g|png|gif|svg)$',
        replacement: 'https://example.com/images/',
      },
    })

    expect(rules).toStrictEqual([
      {
        find: '^/images/.*\\.(jpe?g|png|gif|svg)$',
        replacement: 'https://example.com/images/',
      },
    ])
  })

  it('should work with custom multiple rules', () => {
    const rules = normalizeRules({
      rules: [
        {
          find: '^/images/.*\\.(jpe?g|png|gif|svg)$',
          replacement: 'https://example.com/images/',
        },
        {
          find: '^/medias/.*\\.(mp4|ogg|ogv|webm)$',
          replacement: 'https://example.com/medias/',
        },
      ],
    })

    expect(rules).toStrictEqual([
      {
        find: '^/images/.*\\.(jpe?g|png|gif|svg)$',
        replacement: 'https://example.com/images/',
      },
      {
        find: '^/medias/.*\\.(mp4|ogg|ogv|webm)$',
        replacement: 'https://example.com/medias/',
      },
    ])
  })
})
