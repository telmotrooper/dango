import { AEnt, Conn, Rel } from "../misc/interfaces"
import { allBetweenCurlyBrackets, allButWhitespace, secondWordFound } from "../misc/regex"

const parseAssociativeEntities = (
  rawAssociativeEntities: string[], relationships: Rel[]): AEnt[] => {
  const associativeEntities: AEnt[] = []

  for (const aent of rawAssociativeEntities) {
    const id: string = aent.match(secondWordFound)?.[0] ?? ""

    const data: string[] = aent.match(allBetweenCurlyBrackets)?.[0].match(allButWhitespace) ?? []

    const associativeEntity: AEnt = {
      id,
      entities: [],
      attributes: [],
      compositeAttributes: {},
      multivalued: {},
      pk: [],
      relationships: []
    }

    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i+1] && data[i+1][0] == "(") { // entity followed by its cardinality
          const ent: Conn = {
            id: data[i],
            cardinality: data[i+1].substr(1, 3),
            weak: false // TODO: Change this to reflect actual weakness.
          }
          associativeEntity.entities.push(ent)
        } else if (data[i][0] == "*") { // primary key
          if (data[i-1]) {
            associativeEntity.pk.push(data[i-1])
          }
        } else if (data[i][0] != "(") { // attribute
          associativeEntity.attributes.push(data[i])
        }
      }
    }

    // Get relationships that include this associative entity
    const rel: Rel[] = relationships.filter(
      relationship => relationship.entities.filter(
        entity => entity.id == associativeEntity.id).length >= 1)
    
    associativeEntity.relationships = rel.map(rel => rel.id)
    
    associativeEntities.push(associativeEntity)
  }

  return associativeEntities
}

export { parseAssociativeEntities }
