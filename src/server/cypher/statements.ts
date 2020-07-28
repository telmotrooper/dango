import { indentation } from "../../shared/constants"
import { generateTrigger, getTwoByTwoCombinations } from "./helpers"
import { lower, normalize } from "../../shared/removeAccents"

export const generateNodePropertyExistenceConstraints = (entity: string, attributes: Array<string>): string => {
  let statement = ""

  for (const attribute of attributes) {
    statement += `CREATE CONSTRAINT ON (${lower(entity)[0]}:${normalize(entity)}) ASSERT exists(${lower(entity)[0]}.${normalize(attribute)});\n`
  }

  return statement
}

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
  const statement = `MATCH (n:${normalize(entity1)})-[r:${normalize(relationship)}]-(:${normalize(entity2)})
  WITH n, COLLECT(r) AS rs
  WHERE SIZE(rs) > ${maxCardinality}
  FOREACH (r IN rs[${maxCardinality}..] | DELETE r)`

  return generateTrigger(`${entity1} ${relationship} more than ${maxCardinality} ${entity2}`, statement)
}

export const generateMinCardinalityTrigger = (entity1: string, entity2: string, relationship: string, minCardinality = "1"): string => {
  let statement = ""

  if (minCardinality == "1") {  // Must have at least one relationship
    statement = `MATCH (n:${entity1}) WHERE NOT (:${normalize(entity2)})-[:${normalize(relationship)}]-(n) DETACH DELETE n`
  } else {
    statement = `MATCH (n:${entity1})-[r:${normalize(relationship)}]-(:${normalize(entity2)})
    WITH n, COLLECT(r) AS rs
    WHERE SIZE(rs) < ${minCardinality}
    DETACH DELETE n`
  }

  return generateTrigger(`${entity1} ${relationship} less than ${minCardinality} ${entity2}`, statement)
}

export const generateDisjointednessTrigger = (parent: string, entities: Array<string>): string => {
  let statement = "MATCH (n) WHERE" + "\n"

  const combinations = getTwoByTwoCombinations(entities)

  for (const combination of combinations) {
    statement += indentation + `("${combination[0]}" IN LABELS(n) AND "${combination[1]}" IN LABELS(n)) OR` + "\n"
  }

  statement = statement.substr(0, statement.length-4)
  statement += "\n" + "DETACH DELETE n"

  return generateTrigger(`${parent} disjointedness`, statement)
}

export const generateCompletenessTrigger = (parent: string, entities: Array<string>): string => {
  return generateStrictModeTrigger(entities, parent)
}

export const generateChildrenTrigger = (parent: string, entities: Array<string>): string => {
  let statement = "MATCH (n) WHERE" + "\n" + indentation + "("
  
  for (let i = 0; i < entities.length; i++) {
    if (i != 0) {
      statement += indentation
    }
    statement += `"${entities[i]}" IN LABELS(n) OR` + "\n"

  }

  statement = statement.substr(0, statement.length-4)

  statement += ") AND" + "\n"
  statement += indentation + `NOT "${parent}" IN LABELS(n)`
  statement += "\n" + "DETACH DELETE n"

  return generateTrigger(`${parent} children`, statement)
}
