import { AEnt, Rel, ER } from "../misc/interfaces"
import { allBetweenCurlyBrackets, secondWordFound, linesIncludingWhitespace } from "../misc/regex"
import { parseAttributesAndConnections, removeIndentation } from "../cypher/helpers"

const parseAssociativeEntities = (
  rawAssociativeEntities: string[], er: ER): AEnt[] => {
  const associativeEntities: AEnt[] = []

  for (const aent of rawAssociativeEntities) {
    const id: string = aent.match(secondWordFound)?.[0] ?? ""

    const data: string[] = aent.match(allBetweenCurlyBrackets)?.[0].match(linesIncludingWhitespace) ?? []
    removeIndentation(data)

    const associativeEntity: AEnt = {
      id,
      entities: [],
      attributes: [],
      compositeAttributes: {},
      multivalued: {},
      pk: [],
      relationships: []
    }

    parseAttributesAndConnections(associativeEntity, data, 0, associativeEntity.entities, er)

    // Get relationships that include this associative entity
    const rel: Rel[] = er.rel.filter(
      relationship => relationship.entities.filter(
        entity => entity.id == associativeEntity.id).length >= 1)
    
    associativeEntity.relationships = rel.map(rel => rel.id)
    
    associativeEntities.push(associativeEntity)
  }

  return associativeEntities
}

export { parseAssociativeEntities }
