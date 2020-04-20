export interface ER {  // entity-relationship diagram
  ent?: Ent[];
  rel?: Rel[];
  aent?: AEnt[];
  spe?: Spe[];
}

export interface Ent { // entity
  id: string;
  attributes: string[];
  pk: string[];
}

export interface Rel { // relationship
  id: string;
  ent1: Conn;
  ent2: Conn;
  attributes: string[];
  pk: string[];
}

export interface Conn {  // connection
  id: string;
  cardinality: string;
}

export interface AEnt {
  id: string;
  entities: Conn[];
  attributes: string[];
  pk: string[];
}

export interface Spe {
  id: string;
  total: boolean;
  disjoint: boolean;
  entities: string[];
}
