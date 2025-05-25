import type { Component, PropType } from 'vue'
import { Transition, TransitionGroup, defineComponent, h } from 'vue'

export const FadeInExpandTransition = defineComponent({
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

    return () =>
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
