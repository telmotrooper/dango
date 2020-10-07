import { removeIndentation } from "../cypher/helpers"
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

    // parseAttributesAndConnections(associativeEntity, data, 0, associativeEntity.entities, er)

    // // Get relationships that include this associative entity
    // const rel: Rel[] = er.rel.filter(
    //   relationship => relationship.entities.filter(
    //     entity => entity.id == associativeEntity.id).length >= 1)
    
    // associativeEntity.relationships = rel.map(rel => rel.id)
    
    unions.push(union)
  }

  return unions
}

export { parseUnions }
