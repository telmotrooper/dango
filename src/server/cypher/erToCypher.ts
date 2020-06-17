import { lower, upper } from "../../shared/removeAccents"
import { ER } from "../misc/interfaces"
import { getTriggerTemplate, getEntitiesList, getStrictModeStatement } from "./helpers"

const erToCypher = (er: string, strictMode = true): string => {
  const erCode: ER = JSON.parse(er)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ent, rel, aent, spe } = erCode
  let schema = ""

  if (strictMode) {
    const entities = getEntitiesList(erCode)
    const statement = getStrictModeStatement(entities) 
    schema += getTriggerTemplate("strict mode", statement)
  }

  for (const entity of ent) {
    const { attributes, id, pk } = entity

    // Node property existence constraints
    for (const item of attributes) {
      schema += `CREATE CONSTRAINT ON (${lower(id)[0]}:${id}) ASSERT exists(${lower(id)[0]}.${item});\n`
    }

    // Unique node constraints
    for (const item of pk) {
      schema += `CREATE CONSTRAINT ON (${lower(id)[0]}:${id}) ASSERT (${lower(id)[0]}.${item}) IS UNIQUE;\n`
    }
  }

  for (const relationship of rel) {
    schema += getTriggerTemplate(lower(relationship.id + " " + relationship.entities[0].id),
    `MATCH (n)-[r:${relationship.id}]-(:${relationship.entities[1].id}) WHERE NOT "${relationship.entities[0].id}" IN LABELS(n) DELETE r`
    )

    schema += getTriggerTemplate(lower(relationship.id + " " + relationship.entities[1].id),
    `MATCH (n)-[r:${relationship.id}]-(:${relationship.entities[0].id}) WHERE NOT "${relationship.entities[1].id}" IN LABELS(n) DELETE r`
  )

    schema += getTriggerTemplate(lower(relationship.id + " " + relationship.entities[0].id + " " + relationship.entities[1].id),
    `MATCH (n)-[r:${relationship.id}]-() WHERE NOT "${relationship.entities[0].id}" IN LABELS(n) AND NOT "${relationship.entities[1].id}" IN LABELS(n) DELETE r`
    )
  }

  for (const associativeEntity of aent) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { attributes, id } = associativeEntity

    // Relationship property existence constraint
    for (const attribute of attributes) {
      // schema += `CREATE CONSTRAINT ON (${lower(ent1.id)[0]}:${ent1.id})` +
      // `-[${lower(id)[0]}:${upper(id)}]-(${lower(ent2.id)[0]}:${ent2.id})` +
      // ` ASSERT exists(${lower(id)[0]}.${item})\n`
      schema += `CREATE CONSTRAINT ON ()-[${lower(id)[0]}:${upper(id)}]-() ASSERT exists(${lower(id)[0]}.${attribute});\n`
    }
  }

  return schema
}

export default erToCypher
