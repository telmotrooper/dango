interface GenericObject {
  [property: string]: any;
}

interface RequestStore {
  data: GenericObject | Array<unknown>;
  loading: boolean;
  error: string | null;
}

export { GenericObject, RequestStore }
