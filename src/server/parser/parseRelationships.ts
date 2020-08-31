import { Rel, ER, Conn } from "../misc/interfaces"
import { allBetweenCurlyBrackets, secondWordFound, linesIncludingWhitespace,
  nonWhitespaceBetweenParentheses, digitOrNGlobal, allWords } from "../misc/regex"
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
        compositeAttributes: {},
        multivalued: {},
        pk: []
      }

      const cardinalityA: Array<string> = data[0]?.match(nonWhitespaceBetweenParentheses)?.[0].match(digitOrNGlobal) ?? []
      const cardinalityB: Array<string>  = data[1]?.match(nonWhitespaceBetweenParentheses)?.[0].match(digitOrNGlobal) ?? []

      const entityA = data[0].match(allWords) // E.g. ["Interns", "(0,n)"] or ["w", "Interns", "(0,n)"]
      const entityB = data[1].match(allWords)

      const entityAObject: Conn = {
        id: entityA?.[0] ?? "",
        cardinality: `${cardinalityA[0]},${cardinalityA[1]}`,
        weak: false
      }

      if (entityA?.[0] == "w") { // Weak
        entityAObject.id = entityA?.[1]
        entityAObject.weak = true
      }

      rel.entities.push(entityAObject)

      entitiesSet.add(entityAObject.id)

      const entityBObject: Conn = {
        id: entityB?.[0] ?? "", // We still don't allow entities with composite names.
        cardinality: `${cardinalityB[0]},${cardinalityB[1]}`,
        weak: false // TODO: Change this to reflect actual weakness.
      }

      if (entityB?.[0] == "w") { // Weak
        entityBObject.id = entityB?.[1]
        entityBObject.weak = true
      }

      rel.entities.push(entityBObject)

      if (!entitiesSet.has(entityBObject.id)) { // Detect self-relationship
        entitiesSet.add(entityBObject.id)
      } else if (entityAObject.cardinality != entityBObject.cardinality) {
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
