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
  multivalued: MultivaluedAttributes;
  pk: string[];
}

export interface CompositeAttributes {
  [property: string]: Array<string>;
}

export interface MultivaluedAttributes {
  [property: string]: Cardinality;
}

export interface Rel extends Ent { // relationship
  entities: Conn[];
  hasTimestamps: boolean;
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
