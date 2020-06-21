import { indentation } from "../../shared/constants"

export const getStrictModeStatement = (entities: Array<string>): string => {
  let filter = "MATCH (n) WHERE" + "\n"
  
  for (const entity of entities) {
    filter += indentation + `NOT "${entity}" IN LABELS(n) AND` + "\n"
  }

  filter = filter.substr(0, filter.length-4)
  filter += "\n" + "DETACH DELETE n"

  return filter
}