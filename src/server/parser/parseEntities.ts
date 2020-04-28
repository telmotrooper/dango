import { Ent } from "../misc/interfaces"
import { allBetweenCurlyBrackets, allButWhitespace, secondWordFound } from "../misc/regex"

const parseEntities = (rawEntities: string[] | null): Ent[] => {
  if (rawEntities) {
    const entities: Ent[] = []

    for (const ent of rawEntities) {
      const id: string = ent.match(secondWordFound)?.[0] || ""

      const rawData = ent.match(allBetweenCurlyBrackets)
      let dataArray: string[] = []
      let attributes: string[] = []
      const pk: string[] = []

      if (rawData !== null) {
        dataArray = rawData[0].match(allButWhitespace) || []

        if (dataArray) {
          attributes = []

          for (let i = 0; i < dataArray.length; i += 1) {
            if (dataArray[i] !== "*") {
              attributes.push(dataArray[i])
            } else {
              pk.push(dataArray[i - 1])
            }
          }

        }

      } else {
        attributes = []
      }

      if (id) {
        entities.push(
          {
            id,
            attributes,
            pk,
          },
        )
      }
    }

    return entities
  }
  else {
    return []
  }
}

export default parseEntities
