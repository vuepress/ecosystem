/* eslint-disable no-console */
import { useLocale } from '@vuepress/helper/client'
import { useEventListener } from '@vueuse/core'
import type { PropType, VNode } from 'vue'
import { defineComponent, h, onMounted, shallowRef } from 'vue'
import { withBase } from 'vuepress/client'
import type { AppManifest } from '../../shared/index.js'
import type { PwaPluginLocaleConfig } from '../types.js'
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from './icons.js'

interface InstallPromptEvent extends Event {
  readonly platforms: string
  prompt: () => void
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export const PwaInstallModal = defineComponent({
  name: 'PwaInstallModal',

  props: {
    /** locale data */
    locales: {
      type: Object as PropType<PwaPluginLocaleConfig>,
      required: true,
    },

    /**
     * Whether use hint message instead of showing a button
     *
     * 是否使用提示
     */
    useHint: Boolean,
  },

  emits: ['canInstall', 'hint', 'close'],

  setup(props, { emit }) {
    const locale = useLocale(props.locales)

    const manifest = shallowRef<AppManifest>({})
    const deferredPrompt = shallowRef<InstallPromptEvent>()

    const getManifest = async (): Promise<void> => {
      const manifestContent = localStorage.getItem('manifest')

      if (manifestContent)
        manifest.value = JSON.parse(manifestContent) as AppManifest
      else
        try {
          const response = await fetch(withBase('manifest.webmanifest'))
          const data = (await response.json()) as AppManifest

          manifest.value = data
          localStorage.setItem('manifest', JSON.stringify(data))
        } catch {
          console.error(
            '[PWA]: Error getting manifest, check that you have a valid web manifest or network connection',
          )
        }
    }

    const scrollToLeft = (): void => {
      const screenshotsDiv = document.querySelector('.screenshot')

      if (screenshotsDiv)
        screenshotsDiv.scrollBy({
          left: -screenshotsDiv.clientWidth,
          top: 0,
          behavior: 'smooth',
        })
    }

    const scrollToRight = (): void => {
      const screenshotsDiv = document.querySelector('.screenshot')

      if (screenshotsDiv)
        screenshotsDiv.scrollBy({
          left: screenshotsDiv.clientWidth,
          top: 0,
          behavior: 'smooth',
        })
    }

    const install = async (): Promise<void> => {
      if (deferredPrompt.value) {
        deferredPrompt.value.prompt()

        document.dispatchEvent(new CustomEvent('show'))

        const choiceResult = await deferredPrompt.value.userChoice

        if (choiceResult.outcome === 'accepted') {
          console.info('PWA has been installed')

          emit('close', false)
          emit('canInstall', false)
        } else {
          console.info('You choose to not install PWA')

          emit('close', false)
          emit('canInstall', false)
        }
      }
    }

    const hint = (): void => {
      console.info('You accepted the install hint')
      emit('hint')
    }

    onMounted(() => {
      // eslint-disable-next-line no-prototype-builtins
      if (window.hasOwnProperty('BeforeInstallPromptEvent')) {
        useEventListener(window, 'beforeinstallprompt', (event) => {
          deferredPrompt.value = event as InstallPromptEvent

          emit('canInstall', true)
          event.preventDefault()
        })

        useEventListener(
          'keyup',
          (event): void => {
            if (event.key === 'Escape') emit('close', false)
          },
          { passive: true },
        )

        void getManifest()
      }
    })

    return (): VNode =>
      h('div', { id: 'install-modal-wrapper' }, [
        h('div', {
          class: 'background',
          onClick: () => {
            emit('close', false)
          },
        }),

        h('div', { class: 'install-modal' }, [
          h('div', { class: 'header' }, [
            // close button
            h(
              'button',
              {
                'type': 'button',
                'class': 'close-button',
                'aria-label': locale.value.close,
                'onClick': () => {
                  emit('close', false)
                },
              },
              h(CloseIcon),
            ),

            h('div', { class: 'logo' }, [
              manifest.value.icons
                ? h('img', {
                    src: manifest.value.icons[0]?.src,
                    alt: 'App Logo',
                  })
                : null,
              h('div', { class: 'title' }, [
                h('h1', manifest.value.short_name || manifest.value.name),
                h('p', { class: 'desc' }, locale.value.explain),
              ]),
            ]),
          ]),

          h('div', { class: 'content' }, [
            h('div', { class: 'highlight' }, [
              manifest.value.features
                ? h('div', { class: 'feature-wrapper' }, [
                    h('h3', locale.value.feature),
                    h(
                      'ul',
                      manifest.value.features.map((feature) =>
                        h('li', feature),
                      ),
                    ),
                  ])
                : null,

              manifest.value.screenshots
                ? h('div', { class: 'screenshot-wrapper' }, [
                    h(
                      'button',
                      {
                        'type': 'button',
                        'aria-label': locale.value.prevImage,
                        'onClick': scrollToLeft,
                      },
                      h(ArrowLeftIcon),
                    ),
                    h('section', { class: 'screenshot' }, [
                      manifest.value.screenshots.map((screenshot) =>
                        h(
                          'div',
                          h('img', {
                            src: screenshot.src,
                            alt: 'App Screenshot',
                          }),
                        ),
                      ),
                    ]),
                    h(
                      'button',
                      {
                        'type': 'button',
                        'aria-label': locale.value.nextImage,
                        'onClick': scrollToRight,
                      },
                      h(ArrowRightIcon),
                    ),
                  ])
                : null,
            ]),

            h('div', { class: 'description' }, [
              h('h3', locale.value.desc),
              h('p', manifest.value.description),
            ]),
          ]),

          props.useHint
            ? h('div', { class: 'ios-text', onClick: hint }, [
                h('p', locale.value.iOSInstall),
                h('button', { type: 'button', class: 'success' }, 'Got it!'),
              ])
            : h('div', { class: 'button-wrapper' }, [
                h(
                  'button',
                  { type: 'button', class: 'install-button', onClick: install },
                  [locale.value.install, h('span', manifest.value.short_name)],
                ),
                h(
                  'button',
                  {
                    type: 'button',
                    class: 'cancel-button',
                    onClick: () => {
                      emit('close', false)
                    },
                  },
                  locale.value.cancel,
                ),
              ]),
        ]),
      ])
  },
})
