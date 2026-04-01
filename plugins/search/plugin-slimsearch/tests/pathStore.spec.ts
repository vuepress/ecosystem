import { describe, expect, it } from 'vitest'

import { PathStore } from '../src/node/pathStore.js'

describe('pathStore', () => {
  it('Should add paths and return sequential indexes', () => {
    const store = new PathStore()

    expect(store.addPath('/a')).toBe(0)
    expect(store.addPath('/b')).toBe(1)
    expect(store.addPath('/c')).toBe(2)
  })

  it('Should return existing index for duplicate paths', () => {
    const store = new PathStore()

    expect(store.addPath('/a')).toBe(0)
    expect(store.addPath('/b')).toBe(1)
    expect(store.addPath('/a')).toBe(0)
  })

  it('Should add multiple paths at once', () => {
    const store = new PathStore()

    expect(store.addPaths(['/a', '/b', '/c'])).toEqual([0, 1, 2])
    expect(store.addPaths(['/a', '/d'])).toEqual([0, 3])
  })

  it('Should delete paths and reuse freed slots', () => {
    const store = new PathStore()

    store.addPath('/a')
    store.addPath('/b')
    store.addPath('/c')

    store.deletePath('/b')
    // New path should reuse freed slot 1
    expect(store.addPath('/d')).toBe(1)
    // Next new path should get slot 3
    expect(store.addPath('/e')).toBe(3)
  })

  it('Should handle deleting non-existent paths', () => {
    const store = new PathStore()

    store.addPath('/a')
    store.deletePath('/nonexistent')
    expect(store.addPath('/b')).toBe(1)
  })

  it('Should serialize to compact object format', () => {
    const store = new PathStore()

    store.addPath('/a')
    store.addPath('/b')
    store.addPath('/c')

    expect(JSON.parse(store.toJSON())).toEqual({
      0: '/a',
      1: '/b',
      2: '/c',
    })
  })

  it('Should exclude deleted paths from serialization', () => {
    const store = new PathStore()

    store.addPath('/a')
    store.addPath('/b')
    store.addPath('/c')
    store.deletePath('/b')

    expect(JSON.parse(store.toJSON())).toEqual({
      0: '/a',
      2: '/c',
    })
  })

  it('Should reflect reused slots in serialization', () => {
    const store = new PathStore()

    store.addPath('/a')
    store.addPath('/b')
    store.addPath('/c')
    store.deletePath('/b')
    store.addPath('/d')

    expect(JSON.parse(store.toJSON())).toEqual({
      0: '/a',
      1: '/d',
      2: '/c',
    })
  })

  it('Should clear all data', () => {
    const store = new PathStore()

    store.addPath('/a')
    store.addPath('/b')
    store.clear()

    expect(store.addPath('/c')).toBe(0)
    expect(JSON.parse(store.toJSON())).toEqual({ 0: '/c' })
  })
})
