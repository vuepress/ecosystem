import { useEventListener } from '@vueuse/core'
import type { MaybeRef } from 'vue'
import { toValue } from 'vue'
import type { KeyOptions } from '../../shared/index.js'
import { isFocusingTextControl, isKeyMatched } from '../utils/index.js'

export const useKeys = (
  hotKeys: MaybeRef<(KeyOptions | string)[] | undefined>,
  action: () => Promise<void> | void,
): void => {
  const onKeydown = (event: KeyboardEvent): void => {
    const hotKeysValue = toValue(hotKeys)

    if (hotKeysValue?.length) {
      if (
        // key matches
        isKeyMatched(event, hotKeysValue) &&
        // event does not come from the search box itself or
        // user isn't focusing (and thus perhaps typing in) a text control
        !isFocusingTextControl(event.target!)
      ) {
        event.preventDefault()
        void action()
      }
    }
  }

  useEventListener('keydown', onKeydown)
}
