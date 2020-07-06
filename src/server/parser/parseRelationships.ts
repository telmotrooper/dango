import { Rel, ER } from "../misc/interfaces"
import { allBetweenCurlyBrackets, secondWordFound, linesIncludingWhitespace,
  nonWhitespaceBetweenParentheses, digitOrN, firstWordFound } from "../misc/regex"
import { removeIndentation } from "../cypher/helpers"

const parseRelationships = (rawRelationships: string[], er: ER): Rel[] => {
  const relationships: Rel[] = []

  for (const rel of rawRelationships) {
    const id: string = rel.match(secondWordFound)?.[0] ?? ""

    const data: string[] = rel.match(allBetweenCurlyBrackets)?.[0].match(linesIncludingWhitespace) ?? []
    removeIndentation(data)

    const entitiesSet = new Set()

    if (id && data) {
      const rel: Rel = {
        id,
        entities: [],
        attributes: [],
        pk: []
      }

      const cardinalityA: Array<string> = data[0]?.match(nonWhitespaceBetweenParentheses)?.[0].match(digitOrN) ?? []
      const cardinalityB: Array<string>  = data[1]?.match(nonWhitespaceBetweenParentheses)?.[0].match(digitOrN) ?? []

      rel.entities.push({
          id: data[0].match(firstWordFound)?.[0] ?? "", // We still don't allow entities with composite names.
          cardinality: `${cardinalityA[0]},${cardinalityA[1]}`,
          weak: false // TODO: Change this to reflect actual weakness.
        }
      )

      entitiesSet.add(data[0])

      rel.entities.push({
          id: data[1].match(firstWordFound)?.[0] ?? "", // We still don't allow entities with composite names.
          cardinality: `${cardinalityB[0]},${cardinalityB[1]}`,
          weak: false // TODO: Change this to reflect actual weakness.
        }
      )

      if (!entitiesSet.has(data[1])) { // Detect self-relationship
        entitiesSet.add(data[1])
      } else {
        er.warning = `Self-relationship detected on "${id}". Since there isn't enough information to infer how the cardinalities should be handled, we recommend writing specializations for entity "${data[2]}".`
      }

      for (let i = 2; i < data.length; i += 1) {
        if (data[i] !== "*") {
          rel.attributes.push(data[i])
        } else {
          rel.pk.push(data[i - 1])
        }
      }

      relationships.push(rel)
    }
  }

  return relationships
}

export { parseRelationships }
