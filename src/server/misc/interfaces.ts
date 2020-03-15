
interface ER {  // entity-relationship diagram
  ent?: Ent[];
  rel?: Rel[];
  aent?: AEnt[];
  spe?: Spe[];
}

interface Ent { // entity
  id: string;
  data: string[];
  pk: string[];
}

interface Rel { // relationship
  id: string;
  ent1: Conn;
  ent2: Conn;
}

interface Conn {  // connection
  id: string;
  cardinality: string;
}

interface AEnt {
  id: string;
  // ent: Conn[];
  ent1: Conn;
  ent2: Conn;
  data: string[];
}

interface Spe {
  id: string;
  total: boolean;
  disjoint: boolean;
  entities: string[];
}

export { AEnt, Ent, ER, Rel, Spe }
