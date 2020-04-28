import { Rel } from "../misc/interfaces"
import { allBetweenCurlyBrackets, allButWhitespace, secondWordFound } from "../misc/regex"

const parseRelationships = (rawRelationships: string[]): Rel[] => {
  const relationships: Rel[] = []

  if (rawRelationships) {
    for (const rel of rawRelationships) {
      const id: string = rel.match(secondWordFound)?.[0] ?? ""

      const data: string[] = rel.match(allBetweenCurlyBrackets)?.[0].match(allButWhitespace) ?? []
      
      if (id && data) {
        const rel: Rel = {
          id,
          entities: [],
          attributes: [],
          pk: []
        }

        rel.entities.push({
            id: data[0],
            cardinality: data[1].substr(1, 3),
          }
        )

        rel.entities.push({
            id: data[2],
            cardinality: data[3].substr(1, 3),
          }
        )

        for (let i = 4; i < data.length; i += 1) {
          if (data[i] !== "*") {
            rel.attributes.push(data[i])
          } else {
            rel.pk.push(data[i - 1])
          }
        }

        relationships.push(rel)
      }
    }
  }

  return relationships
}

export { parseRelationships }
