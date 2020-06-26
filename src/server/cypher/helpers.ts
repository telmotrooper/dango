import { ER, Cardinality } from "../misc/interfaces"
import { indentation } from "../../shared/constants"

export const generateTrigger = (triggerName: string, statement: string): string => {
  const statementLines = statement.split("\n")

  for (let i = 0; i < statementLines.length; i++) {
    statementLines[i] = indentation + statementLines[i]
  }

  statement = statementLines.join("\n")

  return `CALL apoc.trigger.add('${triggerName}', ` +
  `'CALL apoc.periodic.submit("${triggerName}", \\'` + "\n" +
  statement + "\n" +
  `\\')', {phase: 'after'});\n`
}

// Note: This method might also return associative entities in the future.
export const getEntitiesAsList = (er: ER): Array<string> => {
  const { ent: entities } = er

  return entities.map(entity => entity.id)
}

export const extractCardinality = (text: string): Cardinality => {
  const values = text.split(",")

  return {
    min: values[0],
    max: values[1]
  }
}

export const getTwoByTwoCombinations = (labels: Array<string>): Array<Array<string>> => {
  const combinations: Array<Array<string>> = []
  
  let j = 0

  for (let i = 0; i < labels.length; i++) {
    while (j < labels.length) {
      if (i != j) {
        combinations.push([labels[i], labels[j]])
      }

      j++
    }
    j = 0
  }

  console.log(combinations)
  
  return combinations
}