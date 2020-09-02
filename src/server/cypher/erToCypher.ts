import { lower, normalize } from "../../shared/removeAccents"
import { ER, Rel } from "../misc/interfaces"
import { getTwoByTwoCombinations, generateMultivaluedAttributeTriggers } from "./helpers"
import { generateStrictModeTriggerForNodes, generateDisjointednessTrigger,
         generateCompletenessTrigger, generateChildrenTrigger,
         generatePropertyExistenceConstraints, generateStrictModeTriggerForRelationships } from "./statements"
import { generateRelationships } from "./relationships"
import { getRelNameForCompAttribute, getEntNameForCompAttribute } from "../../client/utils/helpers"

const erToCypher = (er: string, strictMode = true): string => {
  const erCode: ER = JSON.parse(er)
  const { ent, rel, aent, spe } = erCode
  let schema = ""

  const entities = ent.map(entity => entity.id)

  const compositeAttributes = ent.flatMap(entity => Object.keys(entity.compositeAttributes).map(x => getEntNameForCompAttribute(entity.id, x)))

  const relationships = rel.map(relationship => relationship.id)
  const compositeAttributeRel = compositeAttributes.map(attribute => getRelNameForCompAttribute(attribute))

  if (strictMode) {
    schema += generateStrictModeTriggerForNodes(entities.concat(compositeAttributes))
    schema += generateStrictModeTriggerForRelationships(relationships.concat(compositeAttributeRel))
  }

  for (const entity of ent) {
    const { attributes, id, pk } = entity

    schema += generatePropertyExistenceConstraints(id, attributes)

    // Unique node constraints
    for (const item of pk) {
      schema += `CREATE CONSTRAINT ON (${lower(id)[0]}:${normalize(id)}) ASSERT (${lower(id)[0]}.${normalize(item)}) IS UNIQUE;\n`
    }

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
        pk: []
      }]
      schema += generateRelationships(hasAttribute)
    }

    schema += generateMultivaluedAttributeTriggers(entity)
  }

  schema += generateRelationships(rel)

  for (const associativeEntity of aent) {
    const { attributes, id } = associativeEntity
    schema += generatePropertyExistenceConstraints(id, attributes, true)
  }

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
