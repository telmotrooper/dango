import { lower, upper } from "../misc/removeAccents"
import { ER } from "./interfaces"

const erToCypher = (er: string) => {
  const erCode: ER = JSON.parse(er)
  const { ent, rel, aent, spe } = erCode
  let schema = ""

  for (const entity of ent) {
    const { data, id, pk } = entity

    // Node property existence constraints
    for (const item of data) {
      schema += `CREATE CONSTRAINT ON (${lower(id)}:${id}) ASSERT exists(${lower(id)}.${item});\n`
    }

    // Unique node constraints
    for (const item of pk) {
      schema += `CREATE CONSTRAINT ON (${lower(id)}:${id}) ASSERT (${lower(id)}.${item}) IS UNIQUE;\n`
    }

  }

  for (const associativeEntity of aent) {
    const { data, ent1, ent2, id } = associativeEntity

    for (const item of data) {
      schema += `CREATE CONSTRAINT ON (${lower(ent1.id)}:${ent1.id})` +
      `-[${lower(id)}:${upper(id)}]-(${lower(ent2.id)}:${ent2.id})` +
      ` ASSERT exists(${lower(id)}.${item})`
    }
  }

  return schema
}

export default erToCypher
