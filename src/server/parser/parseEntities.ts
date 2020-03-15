import { Ent } from "../misc/interfaces"

const parseEntities = (rawEntities: string[] | null): Ent[] => {
  if (rawEntities) {
    const entities: Ent[] = []

    for (const ent of rawEntities) {
      const id: string = ent.match(/(?<=\w )\w[^ ]+/gi).toString()
      const rawData = ent.match(/[^{\}]+(?=})/gi)
      let dataArray
      let data = []
      const pk = []

      if (rawData !== null) {
        dataArray = rawData[0].match(/(\S)+/gi)

        if (dataArray) {
          data = []

          for (let i = 0; i < dataArray.length; i += 1) {
            if (dataArray[i] !== "pk") {
              data.push(dataArray[i])
            } else {
              pk.push(dataArray[i - 1])
            }
          }

        }

      } else {
        data = []
      }

      if (id) {
        entities.push(
          {
            id: id,
            data,
            pk,
          },
        )
      }
    }

    return entities
  }
}

export default parseEntities
