import { AEnt, Conn } from "../misc/interfaces"

const parseAssociativeEntities = (rawAssociativeEntities: string[] | null): AEnt[] => {
  const associativeEntities: AEnt[] = []

  if (rawAssociativeEntities) {
    for (const aent of rawAssociativeEntities) {
      const match: string[] | null = aent.match(/(?<=\w )\w[^ ]+/gi)
      let id = ""

      if (match && match[0]) {
        id = match[0]
      }

      const rawData = aent.match(/[^{}]+(?=})/gi)
      let data: string[] | null

      if (rawData !== null) {
        const aent: AEnt = {
          id,
          entities: [],
          attributes: [],
          pk: []
        }

        data = rawData[0].match(/(\S)+/gi)
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
        
        associativeEntities.push(aent)
      }
    }
  }

  return associativeEntities
}

export default parseAssociativeEntities
