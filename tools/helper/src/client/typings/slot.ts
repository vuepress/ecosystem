import type { VNode } from 'vue'

export type SlotContent = VNode | VNode[] | string | null | undefined
export type NonNullableSlotContent = NonNullable<SlotContent>
export type SingleSlotContent = VNode | string | null | undefined
