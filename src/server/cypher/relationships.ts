import { normalize } from "../../shared/removeAccents"
import { generateTrigger, extractCardinality } from "./helpers"
import { Cardinality, Rel } from "../misc/interfaces"
import { generateMinCardinalityTrigger, generateMaxCardinalityTrigger, generatePropertyExistenceConstraints } from "./statements"

export const generateRelationship = (relationship: Rel, includeTriggerBack = true): string => {
  let statement = ""

  const { entities, attributes, id } = relationship

  statement += generatePropertyExistenceConstraints(id, attributes, true)


  // Appropriate labels

  /* If both entities are the same then it's a self-relationship and we
    * don't need to generate verifications for both sides of the relationship. */
  if (relationship.entities[0].id !== relationship.entities[1].id) {
    statement += generateTrigger(relationship.id + " " + relationship.entities[0].id,
    `MATCH (n)-[r:${normalize(relationship.id)}]-(:${normalize(relationship.entities[1].id)}) WHERE NOT "${relationship.entities[0].id}" IN LABELS(n) DELETE r`
    )
  }

  if (includeTriggerBack) { // "false" for associative entities which reuse the same relationship label.
    statement += generateTrigger(relationship.id + " " + relationship.entities[1].id,
    `MATCH (n)-[r:${normalize(relationship.id)}]-(:${normalize(relationship.entities[0].id)}) WHERE NOT "${relationship.entities[1].id}" IN LABELS(n) DELETE r`
    )
  
    statement += generateTrigger(relationship.entities[0].id + " " + relationship.id + " " + relationship.entities[1].id,
    `MATCH (n)-[r:${normalize(relationship.id)}]-() WHERE NOT "${relationship.entities[0].id}" IN LABELS(n) AND NOT "${relationship.entities[1].id}" IN LABELS(n) DELETE r`
    )
  }



  // Cardinality
  const c0: Cardinality = extractCardinality(relationship.entities[0].cardinality)
  const c1: Cardinality = extractCardinality(relationship.entities[1].cardinality)

  /* If both entities are the same then it's a self-relationship and we
    * don't need to generate verifications for both sides of the relationship. */
  if (relationship.entities[0].id !== relationship.entities[1].id) {
    if (c0.min != "0") { statement += generateMinCardinalityTrigger(entities[1].id, entities[0].id, relationship.id, c0.min, relationship.hasTimestamp) }
    if (c0.max != "n") { statement += generateMaxCardinalityTrigger(entities[1].id, entities[0].id, relationship.id, c0.max, relationship.hasTimestamp) }
  }

  if (c1.min != "0") { statement += generateMinCardinalityTrigger(entities[0].id, entities[1].id, relationship.id, c1.min, relationship.hasTimestamp) }
  if (c1.max != "n") { statement += generateMaxCardinalityTrigger(entities[0].id, entities[1].id, relationship.id, c1.max, relationship.hasTimestamp) }

  return statement
}
