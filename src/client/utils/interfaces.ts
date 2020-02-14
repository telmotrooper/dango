import { RefObject } from "react"

interface GenericObject {
  [property: string]: any;
}

interface RequestStore {
  data: GenericObject | Array<unknown>;
  loading: boolean;
  error: string | null;
}

type CodeboxRef = RefObject<HTMLTextAreaElement>;

export { CodeboxRef, GenericObject, RequestStore }
