export interface ER {  // entity-relationship diagram
  ent: Ent[];
  rel: Rel[];
  aent: AEnt[];
  spe: Spe[];
  warning?: string;
}

export interface Ent { // entity
  id: string;
  attributes: string[];
  compositeAttributes: CompositeAttributes;
  pk: string[];
}

export interface CompositeAttributes {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [property: string]: Array<string>;
}


export interface Rel { // relationship
  id: string;
  entities: Conn[];
  attributes: string[];
  pk: string[];
}

export interface Conn {  // connection
  id: string;
  cardinality: string;
  weak: boolean;
}

export interface AEnt extends Rel {
  relationships: string[];
}

export interface Spe {
  id: string;
  total: boolean;
  disjoint: boolean;
  entities: string[];
}

export interface Cardinality {
  min: string,
  max: string
}
