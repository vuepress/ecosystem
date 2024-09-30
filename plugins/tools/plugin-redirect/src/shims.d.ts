declare module '@temp/redirect/map.js' {
  export const redirectMap: Record<string, string>
}

declare module '@vuepress/plugin-redirect/modal' {
  import type { ComponentOptions } from 'vue'

  const component: ComponentOptions
  export default component
}
