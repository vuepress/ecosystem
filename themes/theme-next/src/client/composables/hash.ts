import { ref } from 'vue'
import { inBrowser } from '../utils/index.js'

export const hash = ref(inBrowser ? location.hash : '')

if (inBrowser) {
  window.addEventListener('hashchange', () => {
    hash.value = location.hash
  })
}
