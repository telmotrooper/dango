import { Ent } from "../misc/interfaces"
import { allBetweenCurlyBrackets, secondWordFound, linesIncludingWhitespace } from "../misc/regex"
import { removeIndentation } from "../cypher/helpers"

const parseEntities = (rawEntities: string[]): Ent[] => {
  const entities: Ent[] = []

  for (const ent of rawEntities) {
    const id: string = ent.match(secondWordFound)?.[0] ?? ""    
    const data: string[] = ent.match(allBetweenCurlyBrackets)?.[0].match(linesIncludingWhitespace) ?? []

    removeIndentation(data)

    const attributes: string[] = []
    const pk: string[] = []

    for (let i = 0; i < data.length; i += 1) {
      if (data[i].includes(" *")) {
        const attributeName = data[i].substr(0, data[i].length-2)
        attributes.push(attributeName)
        pk.push(attributeName)
      } else {
        attributes.push(data[i])
      }
    }

    entities.push({ id, attributes, pk })
  }

  return entities
}

export { parseEntities }
