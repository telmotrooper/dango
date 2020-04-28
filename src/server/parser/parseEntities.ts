import { Ent } from "../misc/interfaces"
import { everythingBetweenCurlyBraces, everythingButWhitespace, wordsPreceededByAWord } from "../misc/regex"

const parseEntities = (rawEntities: string[] | null): Ent[] => {
  if (rawEntities) {
    const entities: Ent[] = []

    for (const ent of rawEntities) {
      const match: string[] | null = ent.match(wordsPreceededByAWord) // should not be "gi", only first match is used
      const id: string = match?.[0] ?? ""

      const rawData = ent.match(everythingBetweenCurlyBraces)
      let dataArray
      let attributes = []
      const pk = []

      if (rawData !== null) {
        dataArray = rawData[0].match(everythingButWhitespace)

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
