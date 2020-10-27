import { Rel, ER } from "../misc/interfaces"
import { allBetweenCurlyBrackets, secondWordFound, linesIncludingWhitespace } from "../misc/regex"
import { removeIndentation, parseAttributesAndConnections } from "../cypher/helpers"

const parseRelationships = (rawRelationships: string[], er: ER): Rel[] => {
  const relationships: Rel[] = []

  for (const rel of rawRelationships) {
    const id: string = rel.match(secondWordFound)?.[0] ?? ""

    const data: string[] = rel.match(allBetweenCurlyBrackets)?.[0].match(linesIncludingWhitespace) ?? []
    removeIndentation(data)

    if (id && data) {
      const rel: Rel = {
        id,
        entities: [],
        attributes: [],
        compositeAttributes: {},
        multivalued: {},
        pk: [],
        hasTimestamp: false
      }

      parseAttributesAndConnections(rel, data, 0, rel.entities, er)

      if (rel.attributes.includes("timestamp")) {
        rel.hasTimestamp = true
      }

      if (Object.entries(rel.compositeAttributes).length > 0 && rel.entities.length == 2) {
        er.warning = `Relationship "${rel.id}" contains a composite attributes and this is currently not supported.`
      }

      relationships.push(rel)
    }
  }

  return relationships
}

export { parseRelationships }
