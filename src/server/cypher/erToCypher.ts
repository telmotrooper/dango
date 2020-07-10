import { lower, normalize } from "../../shared/removeAccents"
import { ER, Cardinality } from "../misc/interfaces"
import { generateTrigger, getEntitiesAsList, extractCardinality, getTwoByTwoCombinations } from "./helpers"
import { generateStrictModeTrigger, generateMaxCardinalityTrigger, generateMinCardinalityTrigger,
  generateDisjointednessTrigger, generateCompletenessTrigger, generateChildrenTrigger } from "./statements"

const erToCypher = (er: string, strictMode = true): string => {
  const erCode: ER = JSON.parse(er)
  const { ent, rel, aent, spe } = erCode
  let schema = ""

  const entities = getEntitiesAsList(erCode)

  if (strictMode) {
    schema += generateStrictModeTrigger(entities) 
  }

  for (const entity of ent) {
    const { attributes, id, pk } = entity

    // Node property existence constraints
    for (const item of attributes) {
      schema += `CREATE CONSTRAINT ON (${lower(id)[0]}:${normalize(id)}) ASSERT exists(${lower(id)[0]}.${normalize(item)});\n`
    }

    // Unique node constraints
    for (const item of pk) {
      schema += `CREATE CONSTRAINT ON (${lower(id)[0]}:${normalize(id)}) ASSERT (${lower(id)[0]}.${normalize(item)}) IS UNIQUE;\n`
    }
  }

  for (const relationship of rel) {
    const { entities, attributes, id } = relationship

    // Node property existence constraints
    for (const item of attributes) {
      schema += `CREATE CONSTRAINT ON ()-[${lower(id)[0]}:${id}]-() ASSERT exists(${lower(id)[0]}.${normalize(item)});\n`
    }

    // Appropriate labels
    schema += generateTrigger(lower(relationship.id + " " + relationship.entities[0].id),
    `MATCH (n)-[r:${normalize(relationship.id)}]-(:${normalize(relationship.entities[1].id)}) WHERE NOT "${relationship.entities[0].id}" IN LABELS(n) DELETE r`
    )

    schema += generateTrigger(lower(relationship.id + " " + relationship.entities[1].id),
    `MATCH (n)-[r:${normalize(relationship.id)}]-(:${normalize(relationship.entities[0].id)}) WHERE NOT "${relationship.entities[1].id}" IN LABELS(n) DELETE r`
  )

    schema += generateTrigger(lower(relationship.id + " " + relationship.entities[0].id + " " + relationship.entities[1].id),
    `MATCH (n)-[r:${normalize(relationship.id)}]-() WHERE NOT "${relationship.entities[0].id}" IN LABELS(n) AND NOT "${relationship.entities[1].id}" IN LABELS(n) DELETE r`
    )

    // Cardinality
    const c0: Cardinality = extractCardinality(relationship.entities[0].cardinality)
    const c1: Cardinality = extractCardinality(relationship.entities[1].cardinality)

    if (c0.min != "0") { schema += generateMinCardinalityTrigger(entities[1].id, entities[0].id, relationship.id, c0.min) }
    if (c1.min != "0") { schema += generateMinCardinalityTrigger(entities[0].id, entities[1].id, relationship.id, c1.min) }

    if(c0.max != "n") { schema += generateMaxCardinalityTrigger(entities[1].id, entities[0].id, relationship.id, c0.max) }
    if(c1.max != "n") { schema += generateMaxCardinalityTrigger(entities[0].id, entities[1].id, relationship.id, c1.max) }
  }

  for (const associativeEntity of aent) {
    const { attributes, id } = associativeEntity

    // Relationship property existence constraint
    for (const attribute of attributes) {
      schema += `CREATE CONSTRAINT ON ()-[${lower(id)[0]}:${normalize(id)}]-() ASSERT exists(${lower(id)[0]}.${attribute});\n`
    }
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
