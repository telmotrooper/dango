import { indentation } from "../../shared/constants"
import { generateTrigger } from "./helpers"

export const generateStrictModeTrigger = (entities: Array<string>): string => {
  let statement = "MATCH (n) WHERE" + "\n"
  
  for (const entity of entities) {
    statement += indentation + `NOT "${entity}" IN LABELS(n) AND` + "\n"
  }

  statement = statement.substr(0, statement.length-4)
  statement += "\n" + "DETACH DELETE n"

  return generateTrigger("strict mode", statement)
}
