import { onClickOutside } from '@vueuse/core'
import type { VNode } from 'vue'
import { defineComponent, h, ref, shallowRef } from 'vue'
import { Content, useRouteLocale, useRouter } from 'vuepress/client'

import '../styles/slide-page.css'

const BACK_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" class="back-icon" viewBox="0 0 1024 1024" fill="currentColor"><path d="M1014.749 449.156v125.688H260.626l345.64 345.64-89.239 89.237L19.307 512l497.72-497.721 89.238 89.238-345.64 345.64h754.124z"></path></svg>'
const HOME_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" class="icon home-icon" viewBox="0 0 1024 1024" fill="currentColor"><path d="M780.106 420.978L506.994 147.866 233.882 420.978h.045v455.11H780.06v-455.11h.046zm90.977 90.976V876.09a91.022 91.022 0 01-91.023 91.022H233.927a91.022 91.022 0 01-91.022-91.022V511.954l-67.22 67.175-64.307-64.307 431.309-431.31c35.498-35.498 93.115-35.498 128.614 0l431.309 431.31-64.307 64.307L871.083 512z"></path></svg>'

export const SlidePage = defineComponent({
  name: 'SlidePage',

  setup() {
    const router = useRouter()
    const routeLocale = useRouteLocale()
    const showMenu = ref(false)

    const menu = shallowRef<HTMLElement>()

    const toggle = (): void => {
      showMenu.value = !showMenu.value
    }

    const closeMenu = (): void => {
      showMenu.value = false
    }

    const back = (): void => {
      closeMenu()
      window.history.go(-1)
    }

    const home = (): void => {
      closeMenu()
      void router.push(routeLocale.value)
    }

    onClickOutside(menu, closeMenu)

    return (): VNode =>
      h('div', { class: 'vp-reveal-page' }, [
        h(Content),
        h(
          'div',
          { ref: menu, class: ['vp-reveal-menu', { active: showMenu.value }] },
          [
            h(
              'button',
              {
                type: 'button',
                class: 'menu-button',
                onClick: () => {
                  toggle()
                },
              },
              h('span', { class: 'icon' }),
            ),
            h('button', {
              type: 'button',
              class: 'back-button',
              onClick: () => {
                back()
              },
              innerHTML: BACK_SVG,
            }),
            h('button', {
              type: 'button',
              class: 'home-button',
              onClick: () => {
                home()
              },
              innerHTML: HOME_SVG,
            }),
          ],
        ),
      ])
  },
})
