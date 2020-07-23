import { ER, Cardinality } from "../misc/interfaces"
import { indentation } from "../../shared/constants"
import { allButWhitespace, anythingFromFirstCharacter } from "../misc/regex"
import { titlefy } from "../../shared/removeAccents"

export const generateTrigger = (triggerName: string, statement: string): string => {
  triggerName = titlefy(triggerName)
  
  const statementLines = statement.split("\n")

  for (let i = 0; i < statementLines.length; i++) {
    statementLines[i] = indentation + statementLines[i]
  }

  statement = statementLines.join("\n")

  return `CALL apoc.trigger.add('${triggerName}', ` +
  `'CALL apoc.periodic.submit("${triggerName}", \\'` + "\n" +
  statement + "\n" +
  "\\')', {phase: 'after'});\n\n"
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
    
    // What if line has a "  ]"? We should still match the "]" even though it's not a word.
    const alternative = lines[i].match(allButWhitespace)?.[0]
    
    if (lineWithoutIndentation) {
      lines[i] = lineWithoutIndentation
      
    } else if (alternative) {
      lines[i] = alternative

    } else { // If line is composed solely of whitespace.
      removalList.push(i)
    }
  }

  removalList.reverse()

  for (const index of removalList) {
     lines.splice(index)
  }
}

