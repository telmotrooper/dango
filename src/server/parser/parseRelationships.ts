import { Rel } from "../misc/interfaces"
import { allBetweenCurlyBrackets, allButWhitespace, wordsPreceededByAWord } from "../misc/regex"

const parseRelationships = (rawRelationships: string[] | null): Rel[] => {
  const relationships: Rel[] = []

  if (rawRelationships) {

    for (const rel of rawRelationships) {
      const match: string[] | null = rel.match(wordsPreceededByAWord)
      const id: string = match?.[0] ?? ""


      const rawData = rel.match(allBetweenCurlyBrackets)
      let data: string[] | null

      if (rawData !== null) {
        data = rawData[0].match(allButWhitespace)

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
  }

  return relationships
}

export default parseRelationships
