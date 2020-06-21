import { indentation } from "../../shared/constants"
import { generateTrigger } from "./helpers"
import { lower } from "../../shared/removeAccents"

export const generateStrictModeTrigger = (entities: Array<string>): string => {
  let statement = "MATCH (n) WHERE" + "\n"
  
  for (const entity of entities) {
    statement += indentation + `NOT "${entity}" IN LABELS(n) AND` + "\n"
  }

  statement = statement.substr(0, statement.length-4)
  statement += "\n" + "DETACH DELETE n"

  return generateTrigger("strict mode", statement)
}

export const generateMaxCardinality1Trigger = (entity1: string, entity2: string, relationship: string): string => {
  const statement = `MATCH (:${entity1})-[r:${relationship}]->(h:${entity2})
  WITH h, COLLECT(r) AS rs
  WHERE SIZE(rs) > 1
  FOREACH (r IN rs[1..] | DELETE r)`

  return generateTrigger(lower(entity1 + " with more than 1 " + entity2), statement)
}
