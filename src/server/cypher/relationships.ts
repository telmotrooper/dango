import { normalize } from "../../shared/removeAccents"
import { generateTrigger, extractCardinality } from "./helpers"
import { Cardinality, Rel } from "../misc/interfaces"
import { generateMinCardinalityTrigger, generateMaxCardinalityTrigger, generatePropertyExistenceConstraints } from "./statements"

export const generateRelationship = (relationship: Rel, includeTriggerBack = true): string => {
  let statement = ""

  const { entities, attributes, id } = relationship

  statement += generatePropertyExistenceConstraints(id, attributes, true)

  const isSelfRelationship = relationship.entities[0].id === relationship.entities[1].id

  const relationshipZeroId = relationship.entities[0].relName != null ?
    relationship.entities[0].relName :
    relationship.id

  const relationshipOneId = relationship.entities[1].relName != null ?
    relationship.entities[1].relName :
    relationship.id

  /* If both entities are the same then it's a self-relationship and we
    * don't need to generate verifications for both sides of the relationship. */
  if (!isSelfRelationship) {
    statement += generateTrigger(relationship.id + " " + relationship.entities[1].id + " " + relationship.entities[0].id,
    `MATCH (n)-[r:${normalize(relationship.id)}]-(:${normalize(relationship.entities[1].id)}) WHERE NOT "${relationship.entities[0].id}" IN LABELS(n) DELETE r`
    )

    if (includeTriggerBack) { // "false" for associative entities which reuse the same relationship label. Their trigger back logic is handled by "generateAssociativeEntityRelationshipControl".
      statement += generateTrigger(relationship.id + " " + relationship.entities[1].id,
      `MATCH (n)-[r:${normalize(relationship.id)}]-(:${normalize(relationship.entities[0].id)}) WHERE NOT "${relationship.entities[1].id}" IN LABELS(n) DELETE r`
      )
    
      statement += generateTrigger(relationship.entities[0].id + " " + relationship.id + " " + relationship.entities[1].id,
      `MATCH (n)-[r:${normalize(relationship.id)}]-() WHERE NOT "${relationship.entities[0].id}" IN LABELS(n) AND NOT "${relationship.entities[1].id}" IN LABELS(n) DELETE r`
      )
    }
  } else { // For self-relationships we consider the direction of the relationship.
    statement += generateTrigger(relationship.entities[0].id + " " + relationshipZeroId + " " + relationship.entities[1].id,
    `MATCH (n)-[r:${normalize(relationshipZeroId)}]-() WHERE NOT "${relationship.entities[0].id}" IN LABELS(n) DELETE r`
    )

    statement += generateTrigger(relationship.entities[0].id + " " + relationshipOneId + " " + relationship.entities[1].id,
    `MATCH (n)-[r:${normalize(relationshipOneId)}]-() WHERE NOT "${relationship.entities[0].id}" IN LABELS(n) DELETE r`
    )
  }

  // Cardinality
  const c0: Cardinality = extractCardinality(relationship.entities[0].cardinality)
  const c1: Cardinality = extractCardinality(relationship.entities[1].cardinality)

  // if (isSelfRelationship) {
  //   const temp = relationshipZeroId
  //   relationshipZeroId = relationshipOneId
  //   relationshipOneId = temp
  // }

  if (c0.min != "0") { statement += generateMinCardinalityTrigger(entities[1].id, entities[0].id, relationshipZeroId, c0.min, relationship.hasTimestamp, isSelfRelationship) }
  if (c0.max != "n") { statement += generateMaxCardinalityTrigger(entities[1].id, entities[0].id, relationshipZeroId, c0.max, relationship.hasTimestamp, isSelfRelationship) }

  if (c1.min != "0") { statement += generateMinCardinalityTrigger(entities[0].id, entities[1].id, relationshipOneId, c1.min, relationship.hasTimestamp, isSelfRelationship) }
  if (c1.max != "n") { statement += generateMaxCardinalityTrigger(entities[0].id, entities[1].id, relationshipOneId, c1.max, relationship.hasTimestamp, isSelfRelationship) }

  return statement
}
