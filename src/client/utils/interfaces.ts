import { RefObject } from "react"

interface GenericObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [property: string]: any;
}

type Shape = "rectangle" | "triangle" | "doublecircle" | "circle" |"diamond";

interface RequestStore {
  data: GenericObject | Array<unknown>;
  loading: boolean;
  error: string | null;
}

type TextArea = RefObject<HTMLTextAreaElement>;

export { TextArea, GenericObject, RequestStore, Shape }
