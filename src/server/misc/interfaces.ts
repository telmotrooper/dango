export interface ER {  // entity-relationship diagram
  ent: Ent[];
  rel: Rel[];
  aent: AEnt[];
  spe: Spe[];
  warning?: string;
}

export interface Ent extends AllAttributes { // entity
  id: string;
}

export interface CompositeAttributes {
  [property: string]: Array<string>;
}

export interface MultivaluedAttributes {
  [property: string]: Cardinality;
}

export interface AllAttributes {
  attributes: string[];
  compositeAttributes: CompositeAttributes;
  multivalued: MultivaluedAttributes;
  pk: string[];
}

export interface Rel extends AllAttributes { // relationship
  id: string;
  entities: Conn[];
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
