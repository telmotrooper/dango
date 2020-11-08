import { Conn, ER, OrderedSchema, Rel } from "../misc/interfaces"
import { generateMultivaluedAttributeTriggers,
         generateAllAttributes, getNameForAEntRelationship, getNameForNAryRelationship } from "./helpers"
import { generateStrictModeTriggerForNodes, generateDisjointnessTrigger,
         generateCompletenessTrigger, generateChildrenTrigger,
         generatePropertyExistenceConstraints, generateStrictModeTriggerForRelationships,
         generateCompositeAttributeTriggers, generateUnionTriggerForParent,
         generateUnionTriggerForChildren, generateAssociativeEntityRelationshipControl, generateWeakEntityTrigger } from "./statements"
import { generateRelationship } from "./relationships"
import { getRelNameForCompAttribute, getEntNameForCompAttribute } from "../../client/utils/helpers"
import { lower } from "../../shared/removeAccents"

const erToCypher = (er: string, strictMode = true): string => {
  const erCode: ER = JSON.parse(er)
  const { ent, rel, aent, spe, unions } = erCode

  const orderedSchema: OrderedSchema = {
    strictMode: "",
    constraints: "",
    multivalued: "",
    specializations: "",
    unions: "",
    weakEntities: "",
    relationshipsFormat: "",
    relationshipCardinalities: ""
  }

  const entities = ent.map(entity => entity.id)
  const associativeEntities = aent.map(aent => aent.id)
  const associativeEntitiesRelationships = aent.map(aent => getNameForAEntRelationship(aent.id))

  const nAryRelationships = rel.filter(relationship => relationship.entities.length > 2)
  const nAryRelationshipNodes: Set<string> = new Set(nAryRelationships.map(relationship => lower(relationship.id)))
  const nAryRelationshipConnections = nAryRelationships.map(relationship => getNameForNAryRelationship(relationship.id))

  const compositeAttributes = ent
    .flatMap(entity => Object.keys(entity.compositeAttributes)
      .map(x => getEntNameForCompAttribute(entity.id, x))
    )

  const relationships = rel
    .filter(relationship => !nAryRelationshipNodes.has(lower(relationship.id))) // n-ary relationships become nodes, not connections.
    .filter(relationship => relationship.entities.find(entity => entity.relName != null) == null) // ignore auto-relationships.
    .map(relationship => relationship.id)
  
  const selfRelationships = new Set(rel
    .flatMap(relationship => relationship.entities
      .filter(entity => entity.relName != null)
        .flatMap(entity => entity.relName)))

  const compositeAttributeRel = compositeAttributes.map(attribute => getRelNameForCompAttribute(attribute))

  if (strictMode) {
    orderedSchema.strictMode += generateStrictModeTriggerForNodes(entities
      .concat(compositeAttributes)
      .concat(associativeEntities)
      .concat(Array.from(nAryRelationshipNodes)))
      
    orderedSchema.strictMode += generateStrictModeTriggerForRelationships(relationships
      .concat(compositeAttributeRel)
      .concat(associativeEntitiesRelationships)
      .concat(nAryRelationshipConnections)
      .concat(Array.from(selfRelationships as Set<string>)))
  }

  // Entities
  for (const entity of ent) {
    generateAllAttributes(entity, orderedSchema)
  }

  for (const relationship of rel) {
    if (relationship.entities.length == 2) { // Simple relationship, mapped to a Neo4j relationship.
      generateRelationship(relationship, orderedSchema) // This includes "generatePropertyExistenceConstraints".

      // Check whether a weak entity exists.
      const weakEntity: Conn | null = relationship.entities.find(conn => conn.weak == true) ?? null
      
      if (weakEntity !== null) {
        orderedSchema.weakEntities += generateWeakEntityTrigger(weakEntity, relationship)
      }
    }
    else if (relationship.entities.length > 2) { // Complex relationship, mapped to its own Neo4j node.
      orderedSchema.constraints += generatePropertyExistenceConstraints(relationship.id, relationship.attributes)
      generateCompositeAttributeTriggers(relationship, orderedSchema) // Not supported for relationships, but supported for nodes.

      // Split associative entity into many relationships to reuse relationship trigger logic.
      for (const entity of relationship.entities) { // TODO: The logic is pretty much the same for associative entities, this deserves a refactoring.
        const rel: Rel = {
          id: getNameForNAryRelationship(relationship.id),
          entities: [
            {
              id: relationship.id,
              cardinality: "0,n",
              weak: false,
              relName: null,
            },
            {
              id: entity.id,
              cardinality: entity.cardinality,
              weak: false,
              relName: null
            }
          ],
          hasTimestamp: false,
          attributes: [],
          compositeAttributes: {},
          multivalued: {},
          pk: []
        }

        generateRelationship(rel, orderedSchema, false)
      }

      orderedSchema.relationshipsFormat += generateAssociativeEntityRelationshipControl(relationship, true)
    }

    orderedSchema.multivalued += generateMultivaluedAttributeTriggers(relationship, true)

  }

  // Associative entities
  for (const associativeEntity of aent) {
    const { attributes, entities, id } = associativeEntity
    orderedSchema.constraints += generatePropertyExistenceConstraints(id, attributes)

    generateCompositeAttributeTriggers(associativeEntity, orderedSchema)
    orderedSchema.multivalued += generateMultivaluedAttributeTriggers(associativeEntity)

    const relationshipName = getNameForAEntRelationship(id)

    // Split associative entity into many relationships to reuse relationship trigger logic.
    for (const entity of entities) {
      const rel: Rel = {
        id: relationshipName,
        entities: [
          {
            id: id,
            cardinality: "0,n",
            weak: false,
            relName: null
          },
          {
            id: entity.id,
            cardinality: entity.cardinality,
            weak: false,
            relName: null
          }
        ],
        hasTimestamp: false,
        attributes: [],
        compositeAttributes: {},
        multivalued: {},
        pk: []
      }

      generateRelationship(rel, orderedSchema, false)
    }

    orderedSchema.relationshipsFormat += generateAssociativeEntityRelationshipControl(associativeEntity)
  }

  // Specializations
  for (const specialization of spe) {
    orderedSchema.specializations += generateChildrenTrigger(specialization.id, specialization.entities)

    if (specialization.disjoint) {
      orderedSchema.specializations += generateDisjointnessTrigger(specialization.id, specialization.entities)
    }

    if (specialization.total) {
      orderedSchema.specializations += generateCompletenessTrigger(specialization.id, specialization.entities)
    }
  }

  for (const union of unions) {
    generateAllAttributes(union, orderedSchema)
    orderedSchema.unions += generateUnionTriggerForParent(union)
    orderedSchema.unions += generateUnionTriggerForChildren(union)
  }

  if (orderedSchema.strictMode != "")
    orderedSchema.strictMode = "/* Strict mode */\n\n" + orderedSchema.strictMode

  if (orderedSchema.constraints != "")
    orderedSchema.constraints = "/* Constraints */\n\n" + orderedSchema.constraints + "\n"

  if (orderedSchema.multivalued != "")
    orderedSchema.multivalued = "/* Multivalued attributes */\n\n" + orderedSchema.multivalued

  if (orderedSchema.specializations != "")
    orderedSchema.specializations = "/* Specializations */\n\n" + orderedSchema.specializations

  if (orderedSchema.unions != "")
    orderedSchema.unions = "/* Unions */\n\n" + orderedSchema.unions

  if (orderedSchema.weakEntities != "")
    orderedSchema.weakEntities = "/* Weak entities */\n\n" + orderedSchema.weakEntities

  if (orderedSchema.relationshipsFormat != "")
    orderedSchema.relationshipsFormat = "/* Relationships (format) */\n\n" + orderedSchema.relationshipsFormat
  
  if (orderedSchema.relationshipCardinalities != "")
    orderedSchema.relationshipCardinalities = "/* Relationships (cardinalities) */\n\n" + orderedSchema.relationshipCardinalities

  return orderedSchema.strictMode +
         orderedSchema.constraints +
         orderedSchema.multivalued +
         orderedSchema.specializations +
         orderedSchema.unions +
         orderedSchema.weakEntities +
         orderedSchema.relationshipsFormat +
         orderedSchema.relationshipCardinalities 
}

export { erToCypher }
