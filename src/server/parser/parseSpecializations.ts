import { Spe } from "../misc/interfaces"

const parseSpecializations = (rawSpecializations: string[] | null): Spe[] => {
  if (rawSpecializations) {
    const specializations: Spe[] = []

    for (const spe of rawSpecializations) {
      const rawData = spe.match(/[^{\}]+(?=})/gi)

      let data: string[]
      let total = null
      let disjoint = null
      const temp = []

      if (rawData !== null) {
        data = rawData[0].match(/(\S)+/gi)

        if (data) {
          const cardinality = data[1].substr(1, 3)
          if (cardinality[0] === "t") {
            total = true
          } else {
            total = false
          }

          if (cardinality[2] === "d") {
            disjoint = true
          } else {
            disjoint = false
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
  }
}

export default parseSpecializations
