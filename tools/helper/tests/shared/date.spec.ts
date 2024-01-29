import { describe, expect, it } from 'vitest'
import { dateSorter, parseDate } from '../../src/shared/date.js'

const getCurrentDate = (date: Date): Date =>
  new Date(date.getTime() + new Date().getTimezoneOffset() * 60 * 1000)

describe('getDate()', () => {
  it('Should return null', () => {
    expect(parseDate(undefined)).toEqual(null)
  })

  describe('Should parse day', () => {
    it('date string', () => {
      expect(parseDate('2020-04-04T00:00:00.000Z')).toEqual({
        type: 'date',
        value: new Date('2020-04-04T00:00:00.000Z'),
      })

      expect(parseDate('2020-04-04T12:00:00.000Z')).toEqual({
        type: 'full',
        value: new Date('2020-04-04T12:00:00.000Z'),
      })
    })

    it('date', () => {
      expect(parseDate('1918-01-01')).toEqual({
        value: getCurrentDate(new Date('1918-01-01')),
        type: 'date',
      })
    })

    it('simple date like string', () => {
      expect(parseDate('2018-1-1')).toEqual({
        value: getCurrentDate(new Date('2018-01-01')),
        type: 'date',
      })
    })

    it('date like string with splash', () => {
      expect(parseDate('1918/01/01')).toEqual({
        value: getCurrentDate(new Date('1918-01-01')),
        type: 'date',
      })

      expect(parseDate('2018/1/1')).toEqual({
        value: getCurrentDate(new Date('2018-01-01')),
        type: 'date',
      })
    })

    it('date string with spaces', () => {
      expect(parseDate(' 1918-01-01')).toEqual({
        value: getCurrentDate(new Date('1918-01-01')),
        type: 'date',
      })
    })

    it('date like string with spaces', () => {
      expect(parseDate(' 2018-1-1 ')).toEqual({
        value: getCurrentDate(new Date('2018-01-01')),
        type: 'date',
      })
    })

    it('date like string with splash and spaces', () => {
      expect(parseDate('  2018/1/1  ')).toEqual({
        value: getCurrentDate(new Date('2018-01-01')),
        type: 'date',
      })
    })

    it('date like string with spaces and short year', () => {
      expect(parseDate('18-01-01')).toEqual({
        value: getCurrentDate(new Date('2018-01-01')),
        type: 'date',
      })
    })

    it('date like string with splash and spaces and short year', () => {
      expect(parseDate('18/01/01 ')).toEqual({
        value: getCurrentDate(new Date('2018-01-01')),
        type: 'date',
      })
    })
  })

  it('Should parse whole date', () => {
    expect(parseDate('2018/12/1 12:30')).toEqual({
      value: new Date('2018-12-01 12:30'),
      type: 'full',
    })

    expect(parseDate('18/12/01 12:30')).toEqual({
      value: new Date('2018-12-01 12:30'),
      type: 'full',
    })

    expect(parseDate('  2018/12/01 12:30:00  ')).toEqual({
      value: new Date('2018-12-01 12:30'),
      type: 'full',
    })

    expect(parseDate('  2018-12-01 12:30:00  ')).toEqual({
      value: new Date('2018-12-01 12:30'),
      type: 'full',
    })

    expect(parseDate('  2018-12-1 12:30:00  ')).toEqual({
      value: new Date('2018-12-01 12:30'),
      type: 'full',
    })
  })
})

describe('dateSorter()', () => {
  it('should return 0 if both dates are the same', () => {
    const date = new Date('2022-01-01')

    expect(dateSorter(date, date)).toBe(0)

    expect(
      dateSorter(
        new Date('2020-04-04T00:00:00.000Z'),
        new Date('2020-04-04T00:00:00.000Z'),
      ),
    ).toBe(0)
  })

  it('should return a positive number if dateA is older than dateB', () => {
    const dateA = new Date('2022-01-01')
    const dateB = new Date('2022-01-02')

    expect(dateSorter(dateA, dateB)).toBeGreaterThan(0)

    expect(
      dateSorter(
        new Date('2020-04-04T00:00:00.000Z'),
        new Date('2020-05-05T00:00:00.000Z'),
      ),
    ).toBeGreaterThan(0)
  })

  it('should return a negative number if dateA is newer than dateB', () => {
    const dateA = new Date('2022-01-02')
    const dateB = new Date('2022-01-01')

    expect(dateSorter(dateA, dateB)).toBeLessThan(0)
    expect(
      dateSorter(
        new Date('2020-05-05T00:00:00.000Z'),
        new Date('2020-04-04T00:00:00.000Z'),
      ),
    ).toBeLessThan(0)
  })

  it('should return 1 if dateA is undefined', () => {
    const dateB = new Date('2022-01-01')

    expect(dateSorter(undefined, dateB)).toBe(1)
  })

  it('should return -1 if dateB is undefined', () => {
    const dateA = new Date('2022-01-01')

    expect(dateSorter(dateA, undefined)).toBe(-1)
  })

  it('should return 0 if both dates are undefined', () => {
    expect(dateSorter(undefined, undefined)).toBe(0)
  })

  it('should be a correct date sorter', () => {
    const dates = [
      '2021-01-01',
      '2022-04-05 08:00:00',
      undefined,
      '04:38:45',
      '2022-03-08',
    ]

    expect(dates.sort(dateSorter)).toEqual([
      '2022-04-05 08:00:00',
      '2022-03-08',
      '2021-01-01',
      '04:38:45',
      undefined,
    ])
  })
})
