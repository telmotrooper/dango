import { Rel } from "../misc/interfaces"

const parseRelationships = (rawRelationships: string[] | null): Rel[] => {
  if (rawRelationships) {
    const relationships: Rel[] = []

    for (const rel of rawRelationships) {
      const id = rel.match(/(?<=\w )\w[^ ]+/gi)
      const rawData = rel.match(/[^{\}]+(?=})/gi)

      let data

      if (rawData !== null) {
        data = rawData[0].match(/(\S)+/gi)
      }

      if (id && data) {
        relationships.push(
          {
            id: id[0],
            ent1: {
              id: data[0],
              cardinality: data[1].substr(1, 3),
            },
            ent2: {
              id: data[2],
              cardinality: data[3].substr(1, 3),
            },
          },
        )
      }
    }

    return relationships
  }
}

export default parseRelationships
