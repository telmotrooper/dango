import { lowerAndRemoveAccents } from "../misc/removeAccents"
import { ER } from "./interfaces"

const erToCypher = (er: string) => {
  const erCode: ER = JSON.parse(er)
  const schema = ""

  return "CREATE CONSTRAINT ON (bibliotecarios:Bibliotecário) ASSERT exists(bibliotecarios.CPF)"
}

export default erToCypher
