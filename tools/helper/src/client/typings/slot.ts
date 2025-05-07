import type { VNode } from 'vue'

export type SlotContent = VNode | VNode[] | string | null | undefined
export type NonNullableSlotContent = NonNullable<SlotContent>
export type SingleSlotContent = VNode | string | null | undefined
export type Slot<Props = Record<never, never>> = (props: Props) => SlotContent
export type RequiredSlot<Props = Record<never, never>> = (
  props: Props,
) => NonNullableSlotContent
export type SingleSlot<Props = Record<never, never>> = (
  props: Props,
) => SingleSlotContent
