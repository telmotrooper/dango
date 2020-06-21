import { ER, Cardinality } from "../misc/interfaces"

export const getTriggerTemplate = (triggerName: string, statement: string): string =>
 `CALL apoc.trigger.add('${triggerName}', ` +
  `'CALL apoc.periodic.submit("${triggerName}", \\'` + "\n" +
  `    ` + statement + "\n" +
  `\\')', {phase: 'after'});\n`

// This method will probably also return associative entities in the future.
export const getEntitiesAsList = (er: ER): Array<string> => {
  const { ent: entities } = er

  return entities.map(entity => entity.id)
}

export const prepareCardinality = (cardinalities: string): Cardinality => {
  const values = cardinalities.split(",")

  return {
    min: values[0],
    max: values[1]
  }
}
