import type { VNode } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NO_PROPS_MARKER = Symbol('NO_PROPS_MARKER')
type NoPropsMarker = typeof NO_PROPS_MARKER

export type SlotContent = VNode | VNode[] | string | null | undefined
export type RequiredSlotContent = NonNullable<SlotContent>
export type SingleSlotContent = VNode | string | null | undefined
export type Slot<Props = NoPropsMarker> = Props extends NoPropsMarker
  ? () => SlotContent
  : (props: Props) => SlotContent
export type RequiredSlot<Props = NoPropsMarker> = Props extends NoPropsMarker
  ? () => RequiredSlotContent
  : (props: Props) => RequiredSlotContent
export type SingleSlot<Props = NoPropsMarker> = Props extends NoPropsMarker
  ? () => SingleSlotContent
  : (props: Props) => SingleSlotContent
