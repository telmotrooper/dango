import { Ent, CompositeAttributes, MultivaluedAttributes } from "../misc/interfaces"
import { allBetweenCurlyBrackets, secondWordFound, linesIncludingWhitespace, allButWhitespace } from "../misc/regex"
import { removeIndentation, extractCardinality } from "../cypher/helpers"

const parseEntities = (rawEntities: string[]): Ent[] => {
  const entities: Ent[] = []

  for (const ent of rawEntities) {
    const id: string = ent.match(secondWordFound)?.[0] ?? ""   

    const data: string[] = ent.match(allBetweenCurlyBrackets)?.[0].match(linesIncludingWhitespace) ?? []
    removeIndentation(data)

    const attributes: string[] = []
    const compositeAttributes: CompositeAttributes = {}
    const multivalued: MultivaluedAttributes = {}
    const pk: string[] = []

    let insideCompositeAttribute = ""

    for (let i = 0; i < data.length; i += 1) {
      if (data[i] == "]") { // Composite attribute has ended.
        insideCompositeAttribute = ""

      } else if (data[i].includes("<")) { // Multivalued attribute.
        const matches = data[i].match(allButWhitespace)
        const attributeName = matches?.[0] ?? ""
        const cardinalityText = matches?.[1] ?? ""        
        multivalued[attributeName] = extractCardinality(cardinalityText)

      } else if (data[i].includes("[")) { // Beginning of composite attribute.
        const compositeAttributeName = data[i].match(allButWhitespace)?.[0] ?? ""
        compositeAttributes[compositeAttributeName] = []
        insideCompositeAttribute = compositeAttributeName

      } else if (data[i].includes(" *")) { // Unique attribute.
        const attributeName = data[i].substr(0, data[i].length-2)
        attributes.push(attributeName)
        pk.push(attributeName)
      
      } else {
        if (insideCompositeAttribute != "") {
          compositeAttributes[insideCompositeAttribute].push(data[i])

        } else {
          attributes.push(data[i])
        }
      }
    }

    entities.push({ id, attributes, compositeAttributes, multivalued, pk })
  }

  return entities
}

export { parseEntities }
