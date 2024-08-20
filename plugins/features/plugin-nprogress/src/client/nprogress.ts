/**
 * NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT
 */

import { isDef } from '@vuepress/helper/client'

// Forked and modified from nprogress v0.2.0

const addClass = (element: Element, name: string): void => {
  element.classList.add(name)
}

const removeClass = (element: Element, name: string): void => {
  element.classList.remove(name)
}

const removeElement = (element?: Element | null): void => {
  element?.parentNode?.removeChild(element)
}

const clamp = (n: number, min: number, max: number): number => {
  if (n < min) return min
  if (n > max) return max
  return n
}

const toBarPercent = (n: number): number => (-1 + n) * 100

const queue = (() => {
  const pending: ((next: () => void) => void)[] = []

  const nextStep = (): void => {
    const fn = pending.shift()

    if (fn) {
      fn(nextStep)
    }
  }

  return (fn: (next: () => void) => void): void => {
    pending.push(fn)
    if (pending.length === 1) nextStep()
  }
})()

const camelCase = (content: string): string =>
  content
    .replace(/^-ms-/, 'ms-')
    .replace(/-([\da-z])/gi, (_, letter: string) => letter.toUpperCase())

const addStyle = (() => {
  const cssPrefixes = ['Webkit', 'O', 'Moz', 'ms']
  const cssProps: Record<string, string> = {}

  const getVendorProp = (name: string): string => {
    const { style } = document.body

    if (name in style) return name

    const capName = name.charAt(0).toUpperCase() + name.slice(1)

    let index = cssPrefixes.length

    while (index--) {
      const vendorName = `${cssPrefixes[index]}${capName}`

      if (vendorName in style) return vendorName
    }

    return name
  }

  const getStyleProp = (name: string): string => {
    const finalizedName = camelCase(name)

    // eslint-disable-next-line no-return-assign
    return (cssProps[finalizedName] ??= getVendorProp(finalizedName))
  }

  const applyCss = (
    element: HTMLElement,
    prop: string,
    value: string,
  ): void => {
    element.style[getStyleProp(prop)] = value
  }

  return (
    element: HTMLElement,
    properties: Record<string, string | undefined>,
  ): void => {
    for (const prop in properties) {
      const value = properties[prop]

      if (Object.hasOwn(properties, prop) && isDef(value))
        applyCss(element, prop, value)
    }
  }
})()

interface NProgressSettings {
  minimum: number
  template: string
  easing: string
  speed: number
  trickle: boolean
  trickleRate: number
  trickleSpeed: number
  parent: string
  barSelector: string
}

interface NProgress {
  percent: number | null

  set(number: number): NProgress
  isStarted(): boolean
  start(): NProgress
  done(force?: boolean): NProgress
  increase(amount?: number): NProgress
  trickle(): NProgress

  /* Internal */

  render(fromStart?: boolean): HTMLDivElement
  remove(): void
  isRendered(): boolean
}

const SETTINGS: NProgressSettings = {
  minimum: 0.08,
  easing: 'ease',
  speed: 200,
  trickle: true,
  trickleRate: 0.02,
  trickleSpeed: 800,
  barSelector: '[role="bar"]',
  parent: 'body',
  template: '<div class="bar" role="bar"></div>',
}

export const nprogress: NProgress = {
  percent: null,

  isRendered: () => Boolean(document.getElementById('nprogress')),

  set: (progress) => {
    const { speed, easing } = SETTINGS

    const inProgress = nprogress.isStarted()
    const newPercent = clamp(progress, SETTINGS.minimum, 1)

    nprogress.percent = newPercent === 1 ? null : newPercent

    const nprogressElement = nprogress.render(!inProgress)
    const barElement = nprogressElement.querySelector<HTMLElement>(
      SETTINGS.barSelector,
    )!

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    nprogressElement.offsetWidth /* Repaint */

    queue((next) => {
      // Add transition
      addStyle(barElement, {
        transform: `translate3d(${toBarPercent(newPercent)}%,0,0)`,
        transition: `all ${speed}ms ${easing}`,
      })

      if (newPercent === 1) {
        // Fade out
        addStyle(nprogressElement, {
          transition: 'none',
          opacity: '1',
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        nprogressElement.offsetWidth /* Repaint */

        setTimeout(() => {
          addStyle(nprogressElement, {
            transition: `all ${speed}ms linear`,
            opacity: '0',
          })
          setTimeout(() => {
            nprogress.remove()
            next()
          }, speed)
        }, speed)
      } else {
        setTimeout(() => {
          next()
        }, speed)
      }
    })

    return nprogress
  },

  isStarted: () => typeof nprogress.percent === 'number',

  start: () => {
    if (!nprogress.percent) nprogress.set(0)

    const work = (): void => {
      setTimeout(() => {
        if (!nprogress.percent) return
        nprogress.trickle()
        work()
      }, SETTINGS.trickleSpeed)
    }

    if (SETTINGS.trickle) work()

    return nprogress
  },

  done: (force) => {
    if (!force && !nprogress.percent) return nprogress
    return nprogress.increase(0.3 + 0.5 * Math.random()).set(1)
  },

  increase: (amount) => {
    let { percent } = nprogress

    if (!percent) {
      return nprogress.start()
    }

    percent = clamp(
      percent +
        (typeof amount === 'number'
          ? amount
          : (1 - percent) * clamp(Math.random() * percent, 0.1, 0.95)),
      0,
      0.994,
    )

    return nprogress.set(percent)
  },

  trickle: () => nprogress.increase(Math.random() * SETTINGS.trickleRate),

  render: (fromStart) => {
    if (nprogress.isRendered()) {
      return document.getElementById('nprogress') as HTMLDivElement
    }

    addClass(document.documentElement, 'nprogress-busy')

    const nprogressElement = document.createElement('div')

    nprogressElement.id = 'nprogress'
    nprogressElement.innerHTML = SETTINGS.template

    const barElement = nprogressElement.querySelector<HTMLElement>(
      SETTINGS.barSelector,
    )!
    const parentElement = document.querySelector<HTMLElement>(SETTINGS.parent)

    const percent = fromStart ? '-100' : toBarPercent(nprogress.percent ?? 0)

    addStyle(barElement, {
      transition: 'all 0 linear',
      transform: `translate3d(${percent}%,0,0)`,
    })

    if (parentElement) {
      if (parentElement !== document.body) {
        addClass(parentElement, 'nprogress-custom-parent')
      }

      parentElement.appendChild(nprogressElement)
    }

    return nprogressElement
  },

  remove: () => {
    removeClass(document.documentElement, 'nprogress-busy')
    removeClass(
      document.querySelector(SETTINGS.parent)!,
      'nprogress-custom-parent',
    )
    removeElement(document.getElementById('nprogress'))
  },
}
