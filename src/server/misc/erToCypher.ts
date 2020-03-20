import { lower, upper } from "../../shared/removeAccents"
import { ER } from "./interfaces"

const erToCypher = (er: string): string => {
  const erCode: ER = JSON.parse(er)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ent, rel, aent, spe } = erCode
  let schema = ""

  if (ent) {
    for (const entity of ent) {
      const { data, id, pk } = entity
  
      // Node property existence constraints
      for (const item of data) {
        schema += `CREATE CONSTRAINT ON (${lower(id)[0]}:${id}) ASSERT exists(${lower(id)[0]}.${item});\n`
      }
  
      // Unique node constraints
      for (const item of pk) {
        schema += `CREATE CONSTRAINT ON (${lower(id)[0]}:${id}) ASSERT (${lower(id)[0]}.${item}) IS UNIQUE;\n`
      }
  
    }
  }


  if (aent) {
    for (const associativeEntity of aent) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data, ent1, ent2, id } = associativeEntity
  
      // Relationship property existence constraint
      for (const item of data) {
        // schema += `CREATE CONSTRAINT ON (${lower(ent1.id)[0]}:${ent1.id})` +
        // `-[${lower(id)[0]}:${upper(id)}]-(${lower(ent2.id)[0]}:${ent2.id})` +
        // ` ASSERT exists(${lower(id)[0]}.${item})\n`
        schema += `CREATE CONSTRAINT ON ()-[${lower(id)[0]}:${upper(id)}]-() ASSERT exists(${lower(id)[0]}.${item})\n`
      }
    }
  }

  return schema
}

export default erToCypher
