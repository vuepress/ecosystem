import { expect, test } from '@playwright/test'

interface NoticeSample {
  animated: boolean
  centerX: number
  centerY: number
}

interface SampleWindow extends Window {
  __noticeSamples?: NoticeSample[]
}

test.describe('notice', () => {
  test('have no notice component', async ({ page }) => {
    await page.goto('')

    await expect(page.locator('.vp-notice-wrapper')).toHaveCount(0)
  })

  test('have notice component', async ({ page }) => {
    await page.goto('notice/')

    await expect(page.locator('.vp-notice-wrapper')).toHaveCount(1)

    const primaryButton = page.locator('.vp-notice-footer-action.primary')

    await expect(primaryButton).toHaveCount(1)

    await primaryButton.click()

    await expect(page.locator('.vp-notice-wrapper')).toHaveCount(0)
  })

  test('have fullscreen notice component', async ({ page }) => {
    await page.goto('notice/fullscreen.html')

    await expect(page.locator('.vp-notice-wrapper')).toHaveCount(1)

    const defaultButton = page.locator('.vp-notice-footer-action:not(.primary)')

    await expect(defaultButton).toHaveCount(1)

    await defaultButton.click()

    await expect(page.locator('.vp-notice-wrapper')).toHaveCount(0)
  })

  test('load notice content from markdown file', async ({ page }) => {
    await page.goto('notice/file.html')

    await expect(page.locator('.vp-notice-wrapper')).toHaveCount(1)

    await expect(page.locator('.vp-notice-content strong')).toHaveText(
      'Notice Content',
    )

    await expect(page.locator('.vp-notice-content a')).toHaveAttribute(
      'href',
      'https://example.com',
    )
  })

  test('pop out the fullscreen notice in place', async ({ page }) => {
    // Record the center of the notice on every frame, so that the position
    // during the open animation can be compared with the settled one.
    await page.addInitScript(() => {
      const samples: NoticeSample[] = []

      ;(window as SampleWindow).__noticeSamples = samples

      const record = (): void => {
        const wrapper = document.querySelector('.vp-notice-wrapper')

        if (wrapper) {
          const { x, y, width, height } = wrapper.getBoundingClientRect()

          samples.push({
            animated: wrapper.classList.contains(
              'fade-in-scale-up-enter-active',
            ),
            centerX: x + width / 2,
            centerY: y + height / 2,
          })
        }
      }

      // The document does not exist yet when an init script runs, so the
      // observer is installed on the first frame on which it is available.
      const observe = (): void => {
        try {
          new MutationObserver(record).observe(document.documentElement, {
            attributeFilter: ['class'],
            attributes: true,
            subtree: true,
          })
        } catch {
          requestAnimationFrame(observe)
        }
      }

      // Sample on every class change as well, as a slow machine may finish
      // the animation without rendering a single frame for it.
      requestAnimationFrame(observe)

      const loop = (): void => {
        record()
        requestAnimationFrame(loop)
      }

      requestAnimationFrame(loop)
    })

    await page.goto('notice/fullscreen.html')

    const wrapper = page.locator('.vp-notice-wrapper')

    await expect(wrapper).toHaveCount(1)
    await expect(wrapper).not.toHaveClass(/fade-in-scale-up-enter-active/u)

    const samples = await page.evaluate(
      () => (window as SampleWindow).__noticeSamples ?? [],
    )
    const animatedSamples = samples.filter(({ animated }) => animated)

    // the open animation must be recorded at least once
    expect(animatedSamples.length).toBeGreaterThan(0)

    // the notice shall keep its center while it pops out
    const { centerX, centerY } = samples.at(-1)!

    for (const sample of animatedSamples) {
      expect(Math.abs(sample.centerX - centerX)).toBeLessThanOrEqual(2)
      expect(Math.abs(sample.centerY - centerY)).toBeLessThanOrEqual(2)
    }
  })

  test('pop in the notice before it is removed', async ({ page }) => {
    await page.goto('notice/')

    const wrapper = page.locator('.vp-notice-wrapper')

    await expect(wrapper).toHaveCount(1)

    // The notice shall still be rendered right after it is closed, so that
    // users can see it pop in. Every class the notice gets is recorded, as the
    // animation may be over within a frame on a slow machine.
    const classNames = await page.evaluate(
      () =>
        new Promise<string[]>((resolve) => {
          const element = document.querySelector('.vp-notice-wrapper')!
          const classes = new Set<string>()
          let frames = 0

          const record = (): void => {
            classes.add(element.className)
          }

          const observer = new MutationObserver(record)

          observer.observe(element, {
            attributeFilter: ['class'],
            attributes: true,
          })

          element
            .querySelector('.close-icon')!
            .dispatchEvent(new MouseEvent('click', { bubbles: true }))

          const loop = (): void => {
            record()
            frames += 1

            if (!document.contains(element) || frames > 60) {
              observer.disconnect()
              resolve([...classes])
            } else {
              requestAnimationFrame(loop)
            }
          }

          requestAnimationFrame(loop)
        }),
    )

    expect(
      classNames.some((name) => name.includes('fade-in-scale-up-leave-active')),
    ).toBe(true)

    await expect(wrapper).toHaveCount(0)
  })
})
