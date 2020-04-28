import { Ent } from "../misc/interfaces"
import { allBetweenCurlyBrackets, allButWhitespace, secondWordFound } from "../misc/regex"

const parseEntities = (rawEntities: string[]): Ent[] => {
  const entities: Ent[] = []

  if (rawEntities) {
    for (const ent of rawEntities) {
      const id: string = ent.match(secondWordFound)?.[0] ?? ""

      const rawData: string[] = ent.match(allBetweenCurlyBrackets) ?? []
      let dataArray: string[] = []
      const attributes: string[] = []
      const pk: string[] = []

      if (rawData !== null) {
        dataArray = rawData[0]?.match(allButWhitespace) || []

        if (dataArray) {
          for (let i = 0; i < dataArray.length; i += 1) {
            if (dataArray[i] !== "*") {
              attributes.push(dataArray[i])
            } else {
              pk.push(dataArray[i - 1])
            }
          }
        }
      }

      if (id) {
        entities.push({ id, attributes, pk })
      }
    }
  }

  return entities
}

export default parseEntities
