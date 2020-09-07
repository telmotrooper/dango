import { lower, normalize } from "../../shared/removeAccents"
import { ER } from "../misc/interfaces"
import { getTwoByTwoCombinations, generateMultivaluedAttributeTriggers } from "./helpers"
import { generateStrictModeTriggerForNodes, generateDisjointednessTrigger,
         generateCompletenessTrigger, generateChildrenTrigger,
         generatePropertyExistenceConstraints, generateStrictModeTriggerForRelationships, generateCompositeAttributeTriggers } from "./statements"
import { generateRelationships } from "./relationships"
import { getRelNameForCompAttribute, getEntNameForCompAttribute } from "../../client/utils/helpers"

const erToCypher = (er: string, strictMode = true): string => {
  const erCode: ER = JSON.parse(er)
  const { ent, rel, aent, spe } = erCode
  let schema = ""

  const entities = ent.map(entity => entity.id)
  const associativeEntities = aent.map(aent => aent.id)

  const compositeAttributes = ent.flatMap(entity => Object.keys(entity.compositeAttributes).map(x => getEntNameForCompAttribute(entity.id, x)))

  const relationships = rel.map(relationship => relationship.id)
  const compositeAttributeRel = compositeAttributes.map(attribute => getRelNameForCompAttribute(attribute))

  if (strictMode) {
    schema += generateStrictModeTriggerForNodes(entities.concat(compositeAttributes).concat(associativeEntities))
    schema += generateStrictModeTriggerForRelationships(relationships.concat(compositeAttributeRel))
  }


  // Entities
  for (const entity of ent) {
    const { attributes, id, pk } = entity

    schema += generatePropertyExistenceConstraints(id, attributes)

    // Unique node constraints
    for (const item of pk) {
      schema += `CREATE CONSTRAINT ON (${lower(id)[0]}:${normalize(id)}) ASSERT (${lower(id)[0]}.${normalize(item)}) IS UNIQUE;\n`
    }

    schema += generateCompositeAttributeTriggers(entity)
    schema += generateMultivaluedAttributeTriggers(entity)
  }

  // Relationships
  schema += generateRelationships(rel)

  for (const relationship of rel) {
    // schema += generateCompositeAttributeTriggers(relationship) // NOT SUPPORTED
    schema += generateMultivaluedAttributeTriggers(relationship, true)
  }

  // Associative entities
  for (const associativeEntity of aent) {
    const { attributes, id } = associativeEntity
    schema += generatePropertyExistenceConstraints(id, attributes, true)

    schema += generateCompositeAttributeTriggers(associativeEntity)
    schema += generateMultivaluedAttributeTriggers(associativeEntity)
  }

  // Specializations
  for (const specialization of spe) {
    schema += generateChildrenTrigger(specialization.id, specialization.entities)

    if (specialization.disjoint) {
      schema += generateDisjointednessTrigger(specialization.id, specialization.entities)

      getTwoByTwoCombinations(specialization.entities)
    }

    if (specialization.total) {
      schema += generateCompletenessTrigger(specialization.id, specialization.entities)
    }
  }

  return schema
}

export { erToCypher }
