import { ER, Cardinality } from "../misc/interfaces"
import { indentation } from "../../shared/constants"
import { anythingFromFirstCharacter } from "../misc/regex"
import { lower } from "../../shared/removeAccents"
import { GenericObject } from "../../shared/interfaces"

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
  
  for (let i = 0; i < labels.length; i++) {
    let j = i

    while (j < labels.length) {
      if (i != j) {
        combinations.push([labels[i], labels[j]])
      }

      j++
    }
  }
  
  return combinations
}

export const removeIndentation = (lines: Array<string>): void => {
  const removalList = []

  for (let i = 0; i < lines.length; i++) {
    const lineWithoutIndentation = lines[i].match(anythingFromFirstCharacter)?.[0]
    
    if (lineWithoutIndentation) {
      lines[i] = lineWithoutIndentation
    } else { // If line is composed solely of whitespace.
      removalList.push(i)
    }
  }

  removalList.reverse()

  for(const index of removalList) {
     lines.splice(index)
  }
}

export const clusterize = (name: string, innerElement: string, fillColor = "#f8ec88"): string => {
  return (
    indentation +
    `subgraph ${"cluster_" + lower(name)} {
    style=filled
    fillcolor="${fillColor}"
    ${innerElement}
    }\n`
  )
}

// WORK IN PROGRESS
export const serialize = (obj: GenericObject): string => {
  if (obj.entries.length == 0) {
    return ""
  }

  let output = "["

  for (const [key, value] of Object.entries(obj)) {
    // TODO: GOTTA TEST THE TYPE OF THE VALUE TO EITHER ENCAPSULATE IN DOUBLE QUOTES OR NOT
    output += `${key}=${value}, `
  }

  output = output.substr(0, output.length - 2) + "]"

  return output
}
