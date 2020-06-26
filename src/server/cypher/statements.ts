import { indentation } from "../../shared/constants"
import { generateTrigger, getTwoByTwoCombinations } from "./helpers"
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

export const generateMaxCardinalityTrigger = (entity1: string, entity2: string, relationship: string, maxCardinality = "1"): string => {
  // Must not have more than X relationships, where X is the cardinality number.
  const statement = `MATCH (n:${normalizeLabel(entity1)})-[r:${normalizeLabel(relationship)}]-(:${normalizeLabel(entity2)})
  WITH n, COLLECT(r) AS rs
  WHERE SIZE(rs) > ${maxCardinality}
  FOREACH (r IN rs[${maxCardinality}..] | DELETE r)`

  return generateTrigger(lower(entity1 + ` with more than ${maxCardinality} ` + entity2), statement)
}

export const generateMinCardinalityTrigger = (entity1: string, entity2: string, relationship: string, minCardinality = "1"): string => {
  let statement = ""

  if (minCardinality == "1") {  // Must have at least one relationship
    statement = `MATCH (n:${entity1}) WHERE NOT (:${normalizeLabel(entity2)})-[:${normalizeLabel(relationship)}]-(n) DETACH DELETE n`
  } else {
    statement = `MATCH (n:${entity1})-[r:${normalizeLabel(relationship)}]-(:${normalizeLabel(entity2)})
    WITH n, COLLECT(r) AS rs
    WHERE SIZE(rs) < ${minCardinality}
    DETACH DELETE n`
  }

  return generateTrigger(lower(entity1 + ` with less than ${minCardinality} ` + entity2), statement)
}

export const generateDisjointednessTrigger = (parent: string, entities: Array<string>): string => {
  let statement = "MATCH (n) WHERE" + "\n"

  const combinations = getTwoByTwoCombinations(entities)

  for (const combination of combinations) {
    statement += indentation + `("${combination[0]}" IN LABELS(n) AND "${combination[1]}" IN LABELS(n)) OR` + "\n"
  }

  statement = statement.substr(0, statement.length-4)
  statement += "\n" + "DETACH DELETE n"

  return generateTrigger(lower(parent + " disjointedness"), statement)
}

export const generateCompletenessTrigger = (parent: string, entities: Array<string>): string => {
  return generateStrictModeTrigger(entities, parent)
}

export const generateChildrenTrigger = (parent: string, entities: Array<string>): string => {
  let statement = `MATCH (n) WHERE` + "\n" + indentation + "("
  
  for (const entity of entities) {
    statement += indentation + `"${entity}" IN LABELS(n) OR` + "\n"
  }

  statement = statement.substr(0, statement.length-4)

  statement += ") AND" + "\n"
  statement += `NOT "${parent}" IN LABELS(n)`
  statement += "\n" + "DETACH DELETE n"

  return generateTrigger(`${lower(parent)} children`, statement)
}
