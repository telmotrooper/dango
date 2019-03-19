import { lowerAndRemoveAccents as LRA } from "../misc/removeAccents"
import { ER } from "./interfaces"

const erToCypher = (er: string) => {
  const erCode: ER = JSON.parse(er)
  let schema = ""

  for (const ent of erCode.ent) {
    for (const data of ent.data) {
      schema += `CREATE CONSTRAINT ON (${LRA(ent.id)}:${ent.id}) ASSERT exists(${LRA(ent.id)}.${data});\n`
    }
  }

  return schema
}

export default erToCypher
