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
  entities: Conn[];
  attributes: string[];
  pk: string[];
}

export interface Conn {  // connection
  id: string;
  cardinality: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AEnt extends Rel { }

export interface Spe {
  id: string;
  total: boolean;
  disjoint: boolean;
  entities: string[];
}
