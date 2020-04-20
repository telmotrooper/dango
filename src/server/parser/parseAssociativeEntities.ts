import { AEnt, Conn } from "../misc/interfaces"

const parseAssociativeEntities = (rawAssociativeEntities: string[] | null): AEnt[] => {
  if (rawAssociativeEntities) {
    const associativeEntities: AEnt[] = []

    for (const aent of rawAssociativeEntities) {
      const match: string[] | null = aent.match(/(?<=\w )\w[^ ]+/gi)
      let id: string

      if (match && match[0]) {
        id = match[0]
      } else {
        id = ""
      }

      const rawData = aent.match(/[^{}]+(?=})/gi)
      let data: string[] | null

      if (rawData !== null) {
        let aent: AEnt = {
          id,
          entities: [],
          data: []
        }

        data = rawData[0].match(/(\S)+/gi)
        // const lines = rawData[0].split("\n").filter(line => line != "")

        if (data) {
          for (let i = 0; i < data.length; i++) {
            if (data[i+1] && data[i+1][0] == "(") {  // entity followed by its cardinality
              const ent: Conn = {
                id: data[i],
                cardinality: data[i+1]
              }
              aent.entities.push(ent)
            } else if (data[i][0] != "(" && data[i][0] != "*") {
              aent.data.push(data[i])
            }
          }
        }
        
        associativeEntities.push(aent)
      }
    }

  return associativeEntities
  } else {
    return []
  }
}

export default parseAssociativeEntities
