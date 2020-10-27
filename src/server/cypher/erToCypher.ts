import { ER, Rel } from "../misc/interfaces"
import { getTwoByTwoCombinations, generateMultivaluedAttributeTriggers, generateAllAttributes, getNameForAEntRelationship } from "./helpers"
import { generateStrictModeTriggerForNodes, generateDisjointednessTrigger,
         generateCompletenessTrigger, generateChildrenTrigger,
         generatePropertyExistenceConstraints, generateStrictModeTriggerForRelationships,
         generateCompositeAttributeTriggers, generateUnionTriggerForParent,
         generateUnionTriggerForChildren, generateAssociativeEntityRelationshipControl } from "./statements"
import { generateRelationship } from "./relationships"
import { getRelNameForCompAttribute, getEntNameForCompAttribute } from "../../client/utils/helpers"

const erToCypher = (er: string, strictMode = true): string => {
  const erCode: ER = JSON.parse(er)
  const { ent, rel, aent, spe, unions } = erCode
  let schema = ""

  const entities = ent.map(entity => entity.id)
  const associativeEntities = aent.map(aent => aent.id)
  const associativeEntitiesRelationships = aent.map(aent => getNameForAEntRelationship(aent.id))


  const compositeAttributes = ent.flatMap(entity => Object.keys(entity.compositeAttributes).map(x => getEntNameForCompAttribute(entity.id, x)))

  const relationships = rel.map(relationship => relationship.id)
  const compositeAttributeRel = compositeAttributes.map(attribute => getRelNameForCompAttribute(attribute))

  if (strictMode) {
    schema += generateStrictModeTriggerForNodes(entities.concat(compositeAttributes).concat(associativeEntities))
    schema += generateStrictModeTriggerForRelationships(relationships.concat(compositeAttributeRel).concat(associativeEntitiesRelationships))
  }

  // Entities
  for (const entity of ent) {
    schema += generateAllAttributes(entity)
  }

  for (const relationship of rel) {
    if (relationship.entities.length == 2) {
      schema += generateRelationship(relationship)
    }
    else if (relationship.entities.length > 2) {
      schema += generatePropertyExistenceConstraints(relationship.id, relationship.attributes)
      schema += generateCompositeAttributeTriggers(relationship) // Not supported for relationships, but supported for nodes.
    }

    schema += generateMultivaluedAttributeTriggers(relationship, true)

  }

  // Associative entities
  for (const associativeEntity of aent) {
    const { attributes, entities, id } = associativeEntity
    schema += generatePropertyExistenceConstraints(id, attributes)

    schema += generateCompositeAttributeTriggers(associativeEntity)
    schema += generateMultivaluedAttributeTriggers(associativeEntity)

    const relationshipName = getNameForAEntRelationship(id)

    // Split associative entity into many relationships to reuse relationship trigger logic.
    for (const entity of entities) {
      const rel: Rel = {
        id: relationshipName,
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

      schema += generateRelationship(rel, false)
    }

    schema += generateAssociativeEntityRelationshipControl(associativeEntity)
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
