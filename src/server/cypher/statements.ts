import { indentation } from "../../shared/constants"
import { generateTrigger } from "./helpers"
import { lower, normalizeLabel } from "../../shared/removeAccents"

export const generateStrictModeTrigger = (entities: Array<string>, label = ""): string => {
  if (label != "") {
    label = ":" + label // If there is a label, prepend it with ":"
  }
  let statement = `MATCH (n${label}) WHERE` + "\n"
  
  for (const entity of entities) {
    statement += indentation + `NOT "${entity}" IN LABELS(n) AND` + "\n"
  }

  statement = statement.substr(0, statement.length-4)
  statement += "\n" + "DETACH DELETE n"

  const triggerLabel = label == "" ? "strict mode" : lower(label.substr(1, label.length)) + " completeness"

  return generateTrigger(triggerLabel, statement)
}

export const generateMaxCardinalityTrigger = (entity1: string, entity2: string, relationship: string, cardinality = "1"): string => {
  // Must not have more than one relationship
  const statement = `MATCH (:${normalizeLabel(entity1)})-[r:${normalizeLabel(relationship)}]->(h:${normalizeLabel(entity2)})
  WITH h, COLLECT(r) AS rs
  WHERE SIZE(rs) > ${cardinality}
  FOREACH (r IN rs[${cardinality}..] | DELETE r)`

  return generateTrigger(lower(entity1 + ` with more than ${cardinality} ` + entity2), statement)
}

export const generateMinCardinalityTrigger = (entity1: string, entity2: string, relationship: string): string => {
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

export const generateCompletenessTrigger = (parent: string, entities: Array<string>): string => {
  return generateStrictModeTrigger(entities, parent)
}
