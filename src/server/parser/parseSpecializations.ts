import { Spe } from "../misc/interfaces"
import { allBetweenCurlyBrackets, allButWhitespace } from "../misc/regex"

const parseSpecializations = (rawSpecializations: string[]): Spe[] => {
  if (rawSpecializations) {
    const specializations: Spe[] = []

    for (const spe of rawSpecializations) {
      const rawData = spe.match(allBetweenCurlyBrackets)

      let data: string[] | null
      let total = false
      let disjoint = false
      const temp = []

      if (rawData !== null) {
        data = rawData[0].match(allButWhitespace)

        if (data) {
          const cardinality = data[1].substr(1, 3)
          if (cardinality[0] === "t") {
            total = true
          }

          if (cardinality[2] === "d") {
            disjoint = true
          }

          for (let i = 2; i < data.length; i++) {
            temp.push(data[i])
          }
        }

      } else {
        data = []
      }

      if (data) {
        specializations.push(
          {
            id: data[0],
            total,
            disjoint,
            entities: temp,
          },
        )
      }
    }

    return specializations
  } else {
    return []
  }
}

export default parseSpecializations
