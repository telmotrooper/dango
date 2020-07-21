import { GenericObject } from "../../shared/interfaces";

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
  compositeAttributes: GenericObject;
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
