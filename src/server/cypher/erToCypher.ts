import { ER, Rel } from "../misc/interfaces"
import { getTwoByTwoCombinations, generateMultivaluedAttributeTriggers, generateAllAttributes } from "./helpers"
import { generateStrictModeTriggerForNodes, generateDisjointednessTrigger,
         generateCompletenessTrigger, generateChildrenTrigger,
         generatePropertyExistenceConstraints, generateStrictModeTriggerForRelationships, generateCompositeAttributeTriggers, generateUnionTriggerForParent, generateUnionTriggerForChildren } from "./statements"
import { generateRelationship } from "./relationships"
import { getRelNameForCompAttribute, getEntNameForCompAttribute } from "../../client/utils/helpers"
import { lower } from "../../shared/removeAccents"

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
  for (const relationship of rel) {
    schema += generateRelationship(relationship)
  }
  
  for (const relationship of rel) {
    // schema += generateCompositeAttributeTriggers(relationship) // NOT SUPPORTED
    schema += generateMultivaluedAttributeTriggers(relationship, true)
  }

  // Associative entities
  for (const associativeEntity of aent) {
    const { attributes, entities, id } = associativeEntity
    schema += generatePropertyExistenceConstraints(id, attributes)

    schema += generateCompositeAttributeTriggers(associativeEntity)
    schema += generateMultivaluedAttributeTriggers(associativeEntity)

    // Split associative entity into many relationships to reuse relationship trigger logic.
    for (const entity of entities) {
      const rel: Rel = {
        id: `associated_to_${lower(id)}`,
        entities: [
          {
            id: id,
            cardinality: "0,n",
            weak: false
          },
          {
            id: entity.id,
            cardinality: entity.cardinality,
            weak: false
          }
        ],
        hasTimestamp: false,
        attributes: [],
        compositeAttributes: {},
        multivalued: {},
        pk: []
      }

      schema += generateRelationship(rel)
    }
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
    schema += generateUnionTriggerForChildren(union)
  }

  return schema
}

export { erToCypher }
