import { Rel } from "../misc/interfaces"

const parseRelationships = (rawRelationships: string[] | null): Rel[] => {
  const relationships: Rel[] = []

  if (rawRelationships) {

    for (const rel of rawRelationships) {
      const match: string[] | null = rel.match(/(?<=\w )\w[^ ]+/gi)
      let id = ""

      if(match && match[0]) {
        id = match[0]
      }

      const rawData = rel.match(/[^{}]+(?=})/gi)
      let data: string[] | null

      if (rawData !== null) {
        data = rawData[0].match(/(\S)+/gi)

        if (id && data) {
          const rel: Rel = {
            id,
            ent1: {
              id: data[0],
              cardinality: data[1].substr(1, 3),
            },
            ent2: {
              id: data[2],
              cardinality: data[3].substr(1, 3),
            },
            data: [],
            pk: []
          }

          for (let i = 4; i < data.length; i += 1) {
            if (data[i] !== "*") {
              rel.data.push(data[i])
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
