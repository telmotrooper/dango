export interface ER {  // entity-relationship diagram
  ent: Ent[];
  rel: Rel[];
  aent: AEnt[];
  spe: Spe[];
  unions: Union[];
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
  hasTimestamp: boolean;
}

export interface Conn {  // connection
  id: string;
  cardinality: string;
  weak: boolean;
  relName: string | null;
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

export interface Union extends Ent {
  entities: string[];
}

export interface OrderedSchema {
  strictMode: string,
  constraints: string,
  weakEntities: string
}
