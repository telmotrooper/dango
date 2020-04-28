import { Spe } from "../misc/interfaces"
import { allBetweenCurlyBrackets, allButWhitespace } from "../misc/regex"

const parseSpecializations = (rawSpecializations: string[]): Spe[] => {
  const specializations: Spe[] = []

  for (const spe of rawSpecializations) {
    const data: string[] = spe.match(allBetweenCurlyBrackets)?.[0].match(allButWhitespace) ?? []

    let total = false
    let disjoint = false
    const temp = []

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
}

export { parseSpecializations }
