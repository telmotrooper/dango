import { lowerAndRemoveAccents as LRA } from "../misc/removeAccents"
import { ER } from "./interfaces"

const erToCypher = (er: string) => {
  const erCode: ER = JSON.parse(er)
  const { ent, rel, aent, spe } = erCode
  let schema = ""

  for (const entity of ent) {

    // Node property existence constraints
    for (const data of entity.data) {
      schema += `CREATE CONSTRAINT ON (${LRA(entity.id)}:${entity.id}) ASSERT exists(${LRA(entity.id)}.${data});\n`
    }

    // Unique node constraints
    for (const pk of entity.pk) {
      schema += `CREATE CONSTRAINT ON (${LRA(entity.id)}:${entity.id}) ASSERT (${LRA(entity.id)}.${pk}) IS UNIQUE;\n`
    }
  }

  return schema
}

export default erToCypher
