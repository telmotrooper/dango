import { ER } from "../misc/interfaces"
import { getTwoByTwoCombinations, generateMultivaluedAttributeTriggers, generateAllAttributes } from "./helpers"
import { generateStrictModeTriggerForNodes, generateDisjointednessTrigger,
         generateCompletenessTrigger, generateChildrenTrigger,
         generatePropertyExistenceConstraints, generateStrictModeTriggerForRelationships, generateCompositeAttributeTriggers, generateUnionTriggerForParent } from "./statements"
import { generateRelationships } from "./relationships"
import { getRelNameForCompAttribute, getEntNameForCompAttribute } from "../../client/utils/helpers"

const erToCypher = (er: string, strictMode = true): string => {
  const erCode: ER = JSON.parse(er)
  const { ent, rel, aent, spe, unions } = erCode
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
    schema += generateAllAttributes(entity)
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

  for (const union of unions) {
    schema += generateAllAttributes(union)
    schema += generateUnionTriggerForParent(union)
  }

  return schema
}

export { erToCypher }
