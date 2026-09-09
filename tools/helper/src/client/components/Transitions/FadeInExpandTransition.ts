import type { Component, DefineComponent, PropType, VNode } from 'vue'
import { Transition, TransitionGroup, defineComponent, h } from 'vue'

/**
 * Fade-in expand transition component props
 *
 * 淡入展开过渡组件的属性
 */
export interface FadeInExpandTransitionProps {
  /**
   * Whether to group transitions
   *
   * 是否分组过渡
   */
  group?: boolean

  /**
   * Whether to enable transition on initial render
   *
   * 是否在初始渲染时启用过渡
   */
  appear?: boolean

  /**
   * Whether to switch to the transition of `width`
   *
   * 是否切换为 `width` 过渡
   */
  width?: boolean

  /**
   * Transition mode
   *
   * 过渡模式
   */
  mode?: 'default' | 'in-out' | 'out-in'

  /**
   * Callback when leave transition starts
   *
   * 离开过渡开始时的回调
   */
  onLeave?: () => void

  /**
   * Callback when leave transition ends
   *
   * 离开过渡结束时的回调
   */
  onAfterLeave?: () => void

  /**
   * Callback when enter transition ends
   *
   * 进入过渡结束时的回调
   */
  onAfterEnter?: () => void
}

export const FadeInExpandTransition: DefineComponent<FadeInExpandTransitionProps> =
  defineComponent({
  name: 'FadeInExpandTransition',

  props: {
    /* Whether to group transitions */
    group: Boolean,
    appear: Boolean,
    /* Whether to switch to the transition of `width` */
    width: Boolean,
    mode: String as PropType<'default' | 'in-out' | 'out-in'>,
    onLeave: Function,
    onAfterLeave: Function,
    onAfterEnter: Function,
  },

  setup(props, { slots }) {
    const handleBeforeLeave = (el: HTMLElement): void => {
      el.style[props.width ? 'maxWidth' : 'maxHeight'] = `${el.offsetHeight}px`
      void el.offsetWidth
    }

    const handleLeave = (el: HTMLElement): void => {
      el.style[props.width ? 'maxWidth' : 'maxHeight'] = '0'
      void el.offsetWidth
      props.onLeave?.()
    }

    const handleAfterLeave = (el: HTMLElement): void => {
      el.style[props.width ? 'maxWidth' : 'maxHeight'] = ''
      props.onAfterLeave?.()
    }

    const handleEnter = (el: HTMLElement): void => {
      el.style.transition = 'none'
      if (props.width) {
        const memorizedWidth = el.offsetWidth
        el.style.maxWidth = '0'
        void el.offsetWidth
        el.style.transition = ''
        el.style.maxWidth = `${memorizedWidth}px`
      } else {
        const memorizedHeight = el.offsetHeight
        el.style.maxHeight = '0'
        void el.offsetWidth
        el.style.transition = ''
        el.style.maxHeight = `${memorizedHeight}px`
      }
      void el.offsetWidth
    }

    const handleAfterEnter = (el: HTMLElement): void => {
      el.style[props.width ? 'maxWidth' : 'maxHeight'] = ''
      props.onAfterEnter?.()
    }

    return (): VNode =>
      h(
        (props.group ? TransitionGroup : Transition) as Component,
        {
          name: props.width ? 'fade-in-width-expand' : 'fade-in-height-expand',
          appear: props.appear,
          onEnter: handleEnter,
          onAfterEnter: handleAfterEnter,
          onBeforeLeave: handleBeforeLeave,
          onLeave: handleLeave,
          onAfterLeave: handleAfterLeave,
          ...(props.group ? undefined : { mode: props.mode }),
        },
        slots,
      )
  },
})
