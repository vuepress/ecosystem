import CommentProvider from '@vuepress/plugin-comment/service'
import type { VNode } from 'vue'
import { computed, defineComponent, h } from 'vue'
import { useData } from 'vuepress/client'
import type { CommentPluginFrontmatter } from '../../shared/index.js'
import { useCommentOptions } from '../helpers/index.js'

/**
 * Comment service component
 *
 * 评论服务组件
 */
export default defineComponent({
  name: 'CommentService',

  props: {
    /**
     * The identifier of the comment
     *
     * 评论标识符
     */
    identifier: String,

    /**
     * Whether the component is in darkmode
     *
     * 组件是否处于夜间模式
     */
    darkmode: Boolean,
  },

  setup(props) {
    const { frontmatter, page } = useData<CommentPluginFrontmatter>()
    const commentOptions = useCommentOptions()

    const enabled = computed(
      () => frontmatter.value.comment ?? commentOptions.value.comment ?? true,
    )

    return (): VNode | null =>
      h(CommentProvider, {
        'class': 'vp-comment',
        'vp-comment': '',
        'identifier':
          props.identifier ?? frontmatter.value.commentID ?? page.value.path,
        'darkmode': props.darkmode,
        'style': { display: enabled.value ? 'block' : 'none' },
      })
  },
})
