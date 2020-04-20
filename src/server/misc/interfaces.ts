export interface ER {  // entity-relationship diagram
  ent?: Ent[];
  rel?: Rel[];
  aent?: AEnt[];
  spe?: Spe[];
}

export interface Ent { // entity
  id: string;
  data: string[];
  pk: string[];
}

export interface Rel { // relationship
  id: string;
  ent1: Conn;
  ent2: Conn;
}

export interface Conn {  // connection
  id: string;
  cardinality: string;
}

export interface AEnt {
  id: string;
  entities: Conn[];
  data: string[];
}

export interface Spe {
  id: string;
  total: boolean;
  disjoint: boolean;
  entities: string[];
}
