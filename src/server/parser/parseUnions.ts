import { parseAttributesAndConnections, removeIndentation } from "../cypher/helpers"
import { ER, Union } from "../misc/interfaces"
import { allBetweenCurlyBrackets, linesIncludingWhitespace, secondWordFound } from "../misc/regex"

const parseUnions = (
  rawUnions: string[], er: ER): Union[] => {
  const unions: Union[] = []

  for (const rawUnion of rawUnions) {
    const id: string = rawUnion.match(secondWordFound)?.[0] ?? ""

    const data: string[] = rawUnion.match(allBetweenCurlyBrackets)?.[0].match(linesIncludingWhitespace) ?? []
    removeIndentation(data)

    const union: Union = {
      id,
      entities: [],
      attributes: [],
      compositeAttributes: {},
      multivalued: {},
      pk: []
    }

    parseAttributesAndConnections(union, data, 0, undefined, er)


    const entitiesInDiagram: Set<string> = new Set(er.ent.map(entity => entity.id))

    // Iterate in reverse, moving attributes which are actually entities to the correct array.
    for (let i = union.attributes.length - 1; i >= 0; i--) {
      if (entitiesInDiagram.has(union.attributes[i])) {
        union.entities.push(union.attributes[i])
        union.attributes.splice(i,1)
      }
    }

    unions.push(union)
  }

  return unions
}

export { parseUnions }
