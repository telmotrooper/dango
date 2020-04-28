import { AEnt, Conn, Rel } from "../misc/interfaces"
import { allBetweenCurlyBrackets, allButWhitespace, secondWordFound } from "../misc/regex"

const parseAssociativeEntities = (
  rawAssociativeEntities: string[], relationships: Rel[]): AEnt[] => {
  const associativeEntities: AEnt[] = []

  if (rawAssociativeEntities) {
    for (const aent of rawAssociativeEntities) {
      const id: string = aent.match(secondWordFound)?.[0] ?? ""

      const rawData = aent.match(allBetweenCurlyBrackets)
      let data: string[] | null

      if (rawData !== null) {
        const aent: AEnt = {
          id,
          entities: [],
          attributes: [],
          pk: [],
          relationships: []
        }

        data = rawData[0]?.match(allButWhitespace)
        // const lines = rawData[0].split("\n").filter(line => line != "")

        if (data) {
          for (let i = 0; i < data.length; i++) {
            if (data[i+1] && data[i+1][0] == "(") { // entity followed by its cardinality
              const ent: Conn = {
                id: data[i],
                cardinality: data[i+1]
              }
              aent.entities.push(ent)
            } else if (data[i][0] == "*") { // primary key
              if (data[i-1]) {
                aent.pk.push(data[i-1])
              }
            } else if (data[i][0] != "(") { // attribute
              aent.attributes.push(data[i])
            }
          }
        }

        // Get relationships that include this associative entity
        const rel: Rel[] = relationships.filter(
          relationship => relationship.entities.filter(
            entity => entity.id == aent.id).length >= 1)
        
        aent.relationships = rel.map(rel => rel.id);
        
        associativeEntities.push(aent)
      }
    }
  }

  return associativeEntities
}

export { parseAssociativeEntities }
