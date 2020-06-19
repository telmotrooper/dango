import { ER, Cardinality } from "../misc/interfaces"
import { indentation } from "../../shared/constants"

export const getTriggerTemplate = (triggerName: string, statement: string): string =>
 `CALL apoc.trigger.add('${triggerName}', ` +
  `'CALL apoc.periodic.submit("${triggerName}", \\'` + "\n" +
  `    ` + statement + "\n" +
  `\\')', {phase: 'after'});\n`

// This method will probably also return associative entities in the future.
export const getEntitiesList = (er: ER): Array<string> => {
  const { ent: entities } = er

  return entities.map(entity => entity.id)
}

export const getStrictModeStatement = (entities: Array<string>): string => {
  let filter = "MATCH (n) WHERE" + "\n"
  
  for (const entity of entities) {
    filter += indentation + `NOT "${entity}" IN LABELS(n) AND` + "\n"
  }

  filter = filter.substr(0, filter.length-4)
  filter += "\n" + "DETACH DELETE n"

  return filter
}

export const prepareCardinality = (cardinalities: string): Cardinality => {
  const values = cardinalities.split(",")

  return {
    min: values[0],
    max: values[1]
  }
}
