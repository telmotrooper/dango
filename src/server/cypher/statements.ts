import { indentation } from "../../shared/constants"
import { generateTrigger, getNameForAEntRelationship, getNameForNAryRelationship, getTwoByTwoCombinations, hasNoAttributes } from "./helpers"
import { lower, normalize } from "../../shared/removeAccents"
import { getRelNameForCompAttribute, getEntNameForCompAttribute } from "../../client/utils/helpers"
import { generateRelationship } from "./relationships"
import { AEnt, Ent, Rel, Union } from "../misc/interfaces"

export const generatePropertyExistenceConstraints = (id: string, attributes: Array<string>, isRelationship = false): string => {
  let statement = ""

  if (isRelationship) {
    // Relationship property existence constraint
    for (const attribute of attributes) {
      statement += `CREATE CONSTRAINT ON ()-[${lower(id)[0]}:${normalize(id)}]-() ASSERT exists(${lower(id)[0]}.${attribute});\n`
    }

  } else {
    for (const attribute of attributes) {
      statement += `CREATE CONSTRAINT ON (${lower(id)[0]}:${normalize(id)}) ASSERT exists(${lower(id)[0]}.${normalize(attribute)});\n`
    }
  }

  return statement
}

export const generateStrictModeTriggerForNodes = (entities: Array<string>, label = "", title = ""): string => {
  if (label != "") {
    label = ":" + label // If there is a label, prepend it with ":"
  }
  let statement = `MATCH (n${label}) WHERE` + "\n"
  
  for (const entity of entities) {
    statement += indentation + `NOT "${entity}" IN LABELS(n) AND` + "\n"
  }

  statement = statement.substr(0, statement.length-4)
  statement += "\n" + "DETACH DELETE n"

  const triggerTitle = title == "" ? "strict mode (nodes)" : title

  return generateTrigger(triggerTitle, statement)
}

export const generateStrictModeTriggerForRelationships = (relationships: Array<string>): string => {  
  if (relationships.length === 0) {
    return ""
  }
  
  let statement = "MATCH ()-[r]-() WHERE" + "\n"

  for (const relationship of relationships) {
    statement += indentation + `TYPE(r) <> "${relationship}" AND` + "\n"
  }

  statement = statement.substr(0, statement.length-4)
  statement += "\n" + "DETACH DELETE r"

  return generateTrigger("strict mode (relationships)", statement)
}

export const getTimestampFilter = (hasTimestamp: boolean): string =>
  hasTimestamp ? "\n  WITH n, r\n  ORDER BY r.timestamp ASC" : ""

export const generateMaxCardinalityTrigger = (entity1: string, entity2: string, relationship: string, maxCardinality = "1", hasTimestamp = false): string => {
  // Must not have more than X relationships, where X is the cardinality number.

  const statement = `MATCH (n:${normalize(entity1)})-[r:${normalize(relationship)}]-(:${normalize(entity2)}) ${getTimestampFilter(hasTimestamp)}
  WITH n, COLLECT(r) AS rs
  WHERE SIZE(rs) > ${maxCardinality}
  FOREACH (r IN rs[${maxCardinality}..] | DELETE r)`

  return generateTrigger(`${entity1} ${relationship} more than ${maxCardinality} ${entity2}`, statement)
}

export const generateMinCardinalityTrigger = (entity1: string, entity2: string, relationship: string, minCardinality = "1", hasTimestamp = false): string => {
  let statement = ""

  if (minCardinality == "1") {  // Must have at least one relationship
    statement = `MATCH (n:${entity1}) WHERE NOT (:${normalize(entity2)})-[:${normalize(relationship)}]-(n) DETACH DELETE n`
  } else {
    statement = `MATCH (n:${entity1})-[r:${normalize(relationship)}]-(:${normalize(entity2)}) ${getTimestampFilter(hasTimestamp)}
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
  return generateStrictModeTriggerForNodes(entities, parent, lower(parent) + " completeness")
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

export const generateMultivaluedAttributeTrigger = (entity: string, attribute: string, min: string, max: string, isRelationship = false): string => {
  if (min == "0" && max == "n") {
    return ""
  }

  const variable = isRelationship ? "r" : "n"
  let statement = isRelationship ? `MATCH ()-[${variable}:${entity}]-() WHERE` : `MATCH (${variable}:${entity}) WHERE`

  statement += "\n"

  if (Number(min) > 0) {
    statement += indentation + `size(${variable}.${attribute}) < ${min}`

    if (max != "n") {
      statement += " OR" + "\n"
    }
  }

  if (max != "n") {
    statement += indentation + `size(${variable}.${attribute}) > ${max}`
  }

  statement += "\n" + `DETACH DELETE ${variable}`

  return generateTrigger(`${entity} ${attribute} multivalued`, statement)
}

export const generateCompositeAttributeTriggers = (entity: Ent): string => {
  let schema = ""

  // Create existence constraint for each composite attribute's attributes.
  for (const [key, value] of Object.entries(entity.compositeAttributes)) {
    const compositeAttribute = getEntNameForCompAttribute(entity.id, key)
    const itsAttributes = value
    schema += generatePropertyExistenceConstraints(compositeAttribute, itsAttributes)

    const hasAttribute: Array<Rel> = [{
      id: getRelNameForCompAttribute(compositeAttribute),
      entities: [
        {
          id: entity.id,
          cardinality: "1,1",
          weak: false
        },
        {
          id: compositeAttribute,
          cardinality: "1,1",
          weak: false
        }
      ],
      compositeAttributes: {},
      multivalued: {},
      attributes: [],
      pk: [],
      hasTimestamp: false
    }]

    for (const relationship of hasAttribute) {
      schema += generateRelationship(relationship)
    }
  }

  return schema
}

export const generateUnionTriggerForParent = (union: Union): string => {
  return generateStrictModeTriggerForNodes(union.entities, union.id, `Union ${union.id} for parent`)
}

export const generateUnionTriggerForChildren = (union: Union): string => {
  const { id, entities } = union

  let statement = "MATCH (n) WHERE" + "\n" + indentation + `NOT n:${id} AND` + "\n" + indentation + "("

  for (const entity of entities) {
    statement += `n:${entity} OR `
  }

  statement = statement.substr(0, statement.length-4)
  statement += ")" + "\n"
  
  statement += hasNoAttributes(union) ? "SET n:Vehicle": "DETACH DELETE n"

  return generateTrigger(`Union ${union.id} for children`, statement)
}

export const generateAssociativeEntityRelationshipControl = (aent: AEnt | Rel, isNAryRelationship = false): string => {
  const { entities, id } = aent

  const relName = isNAryRelationship ? getNameForNAryRelationship(id) : getNameForAEntRelationship(id)

  let statement = `MATCH (n)-[:${relName}]-(:${lower(id)}) WHERE ` + "\n"

  const entitiesAssociated = entities.map(entity => entity.id)

  for (const entity of entitiesAssociated) {
    statement += indentation + `NOT n:\`${entity}\` AND` + "\n"
  }

  statement = statement.substr(0, statement.length-4)
  statement += "\n" + "DETACH DELETE n"

  return generateTrigger(`${id} associations`, statement)
}
