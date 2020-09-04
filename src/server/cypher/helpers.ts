import { Cardinality, Ent, MultivaluedAttributes, Conn, ER } from "../misc/interfaces"
import { indentation } from "../../shared/constants"
import { allButWhitespace, anythingFromFirstCharacter, digitOrN, allWords } from "../misc/regex"
import { titlefy } from "../../shared/removeAccents"
import { generateMultivaluedAttributeTrigger } from "./statements"

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

export const extractCardinality = (text: string): Cardinality => {
  // Example inputs: "<1,n>", "0,n", "(1,1)".
  
  const values = text.split(",")

  return {
    min: values[0].match(digitOrN)?.[0] ?? "",
    max: values[1].match(digitOrN)?.[0] ?? ""
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


export const generateMultivaluedAttributeTriggers = (entity: Ent, isRelationship = false): string => {
  let schema = ""

  for (const [key, value] of Object.entries(entity.multivalued)) {
    schema += generateMultivaluedAttributeTrigger(entity.id, key, value.min, value.max, isRelationship)
  }

  return schema
}

export const getMultivaluedAttribute = (multivalued: MultivaluedAttributes, data: string): void => {
  const matches = data.match(allButWhitespace)
  const attributeName = matches?.[0] ?? ""
  const cardinalityText = matches?.[1] ?? ""        
  multivalued[attributeName] = extractCardinality(cardinalityText)
}

export const parseAttributesAndConnections = (entity: Ent, data: string[], start: number, connections?: Conn[], er?: ER): void => {
  // Control variables
  let insideCompositeAttribute = ""
  const entitiesSet = new Set()

  for (let i = start; i < data.length; i += 1) {
    if (connections != null && data[i].includes("(") && data[i].includes(")")) {
      const matches = data[i].match(allWords)
      
      if (matches && matches.length >= 2) {
        const { min, max } = matches[0] == "w" ? extractCardinality(matches[2]) : extractCardinality(matches[1])

        const conn: Conn = {
          id: matches[0] == "w" ? matches[1] : matches[0],
          cardinality: `${min},${max}`,
          weak: matches[0] == "w"
        }
        connections.push(conn)

        if (er != null) {
          if (!entitiesSet.has(conn.id)) { 
            entitiesSet.add(conn.id)

          } else { // Self-relationship found
            const previousEntry: Conn | undefined = connections.find(c => c.id == conn.id)

            if (previousEntry?.cardinality != `${min},${max}` ) { // Are the cardinalities different?
              er.warning = `Self-relationship detected on "${entity.id}". Since there isn't enough information to infer how the cardinalities should be handled, we recommend writing specializations for entity "${data[2]}".`
            }
          }
  
          entitiesSet.add(conn.id)
        }

      }

    } else if (data[i] == "]") { // Composite attribute has ended.
      insideCompositeAttribute = ""

    } else if (data[i].includes("<")) { // Multivalued attribute.
      getMultivaluedAttribute(entity.multivalued, data[i]) // This assigns to "multivalued"

    } else if (data[i].includes("[")) { // Beginning of composite attribute.
      const compositeAttributeName = data[i].match(allButWhitespace)?.[0] ?? ""
      entity.compositeAttributes[compositeAttributeName] = []
      insideCompositeAttribute = compositeAttributeName

    } else if (data[i].includes(" *")) { // Unique attribute.
      const attributeName = data[i].substr(0, data[i].length-2)
      entity.attributes.push(attributeName)
      entity.pk.push(attributeName)
    
    } else {
      if (insideCompositeAttribute != "") {
        entity.compositeAttributes[insideCompositeAttribute].push(data[i])

      } else {
        entity.attributes.push(data[i])
      }
    }
  }
}
