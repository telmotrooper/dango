import { Ent } from "../misc/interfaces"
import { allBetweenCurlyBrackets, secondWordFound, linesIncludingWhitespace } from "../misc/regex"
import { removeIndentation, parseAttributes } from "../cypher/helpers"

const parseEntities = (rawEntities: string[]): Ent[] => {
  const entities: Ent[] = []

  for (const ent of rawEntities) {
    const data: string[] = ent.match(allBetweenCurlyBrackets)?.[0].match(linesIncludingWhitespace) ?? []
    removeIndentation(data)

    const entity: Ent = {
      id: ent.match(secondWordFound)?.[0] ?? "" ,
      attributes: [],
      compositeAttributes: {},
      multivalued: {},
      pk: []
    }

    parseAttributes(entity, data, 0)

    entities.push(entity)
  }

  return entities
}

export { parseEntities }
