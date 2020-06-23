import { indentation } from "../../shared/constants"
import { generateTrigger } from "./helpers"
import { lower, normalizeLabel } from "../../shared/removeAccents"

export const generateStrictModeTrigger = (entities: Array<string>): string => {
  let statement = "MATCH (n) WHERE" + "\n"
  
  for (const entity of entities) {
    statement += indentation + `NOT "${entity}" IN LABELS(n) AND` + "\n"
  }

  statement = statement.substr(0, statement.length-4)
  statement += "\n" + "DETACH DELETE n"

  return generateTrigger("strict mode", statement)
}

export const generateMaxCardinality1Trigger = (entity1: string, entity2: string, relationship: string): string => {
  // Must not have more than one relationship
  const statement = `MATCH (:${normalizeLabel(entity1)})-[r:${normalizeLabel(relationship)}]->(h:${normalizeLabel(entity2)})
  WITH h, COLLECT(r) AS rs
  WHERE SIZE(rs) > 1
  FOREACH (r IN rs[1..] | DELETE r)`

  return generateTrigger(lower(entity1 + " with more than 1 " + entity2), statement)
}

export const generateMinCardinality1Trigger = (entity1: string, entity2: string, relationship: string): string => {
  // Must have at least one relationship
  const statement = `MATCH (n:${entity1}) WHERE NOT (:${normalizeLabel(entity2)})-[:${normalizeLabel(relationship)}]-(n) DETACH DELETE n`

  return generateTrigger(lower(entity1 + " without " + entity2), statement)
}

export const generateDisjointednessTrigger = (parent: string, entities: Array<string>): string => {
  let labels = ""

  for(const entity of entities) {
    labels += normalizeLabel(entity) + ":"
  }

  labels = labels.substr(0, labels.length-1) // Remove the last ":"

  const statement = `MATCH (n:${labels}) DETACH DELETE n`

  return generateTrigger(lower(parent + " disjointedness"), statement)
}
