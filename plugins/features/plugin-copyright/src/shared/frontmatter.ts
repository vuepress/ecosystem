import type { PageFrontmatter } from 'vuepress/shared'

export interface CopyrightPluginFrontmatter extends PageFrontmatter {
  copy?:
    | boolean
    | {
        /**
         * Min length triggering copyright append
         *
         * 触发附加版权的最小长度
         *
         * @default 100
         */
        triggerLength?: number

        /**
         * Max length that allows to copy
         *
         * @description 0 means unlimited
         *
         * 允许复制的最大长度
         *
         * @description 0 表示无限制
         *
         * @default 0
         */
        maxLength?: number

        /**
         * Disable copy
         *
         * 禁用复制
         *
         * @default false
         */
        disableCopy?: boolean

        /**
         * Disable selection
         *
         * 禁用选择
         *
         * @default false
         */
        disableSelection?: boolean
      }
}
