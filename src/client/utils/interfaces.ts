import { RefObject } from "react"

import { GenericObject } from "../../shared/interfaces"

export type Shape = "rectangle" | "triangle" | "doublecircle" | "circle" |"diamond"

export interface RequestStore {
  data: GenericObject | Array<unknown>
  loading: boolean
  error: string | null
}

export type TextArea = RefObject<HTMLTextAreaElement>
export type Input = RefObject<HTMLInputElement>

export interface Proportions {
  width: number
  height: number
}
