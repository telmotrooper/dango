import { RefObject } from "react"

export interface GenericObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [property: string]: any;
}

export type Shape = "rectangle" | "triangle" | "doublecircle" | "circle" |"diamond";

export interface RequestStore {
  data: GenericObject | Array<unknown>
  loading: boolean
  error: string | null
}

export type TextArea = RefObject<HTMLTextAreaElement>
export type Input = RefObject<HTMLInputElement>
