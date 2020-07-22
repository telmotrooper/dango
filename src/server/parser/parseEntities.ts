import { Ent, CompositeAttributes } from "../misc/interfaces"
import { allBetweenCurlyBrackets, secondWordFound, linesIncludingWhitespace, allButWhitespace } from "../misc/regex"
import { removeIndentation } from "../cypher/helpers"

const parseEntities = (rawEntities: string[]): Ent[] => {
  const entities: Ent[] = []

  for (const ent of rawEntities) {
    const id: string = ent.match(secondWordFound)?.[0] ?? ""   

    const data: string[] = ent.match(allBetweenCurlyBrackets)?.[0].match(linesIncludingWhitespace) ?? []
    removeIndentation(data)

    const attributes: string[] = []
    const compositeAttributes: CompositeAttributes = {}
    const pk: string[] = []

    let isCompositeAttribute = ""

    for (let i = 0; i < data.length; i += 1) {
      if (data[i] == "]") {
        isCompositeAttribute = ""

      } else if (data[i].includes("[")) {
        const compositeAttributeName = data[i].match(allButWhitespace)?.[0] ?? ""
        compositeAttributes[compositeAttributeName] = []
        isCompositeAttribute = compositeAttributeName

      } else if (data[i].includes(" *")) {
        const attributeName = data[i].substr(0, data[i].length-2)
        attributes.push(attributeName)
        pk.push(attributeName)
      
      } else {
        if (isCompositeAttribute != "") {
          compositeAttributes[isCompositeAttribute].push(data[i])

        } else {
          attributes.push(data[i])
        }
      }
    }

    entities.push({ id, attributes, compositeAttributes,  pk })
  }

  return entities
}

export { parseEntities }
