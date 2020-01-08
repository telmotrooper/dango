const parseAssociativeEntities = (rawAssociativeEntities: string[] | null) => {
  if (rawAssociativeEntities) {
    const associativeEntities = []

    for (const aent of rawAssociativeEntities) {
      const id = aent.match(/(?<=\w )\w[^ ]+/gi)
      const rawData = aent.match(/[^{\}]+(?=})/gi)
      let data
      const temp = []

      if (rawData !== null) {
        data = rawData[0].match(/(\S)+/gi)

        if (data && data.length > 4) {
          for (let i = 4; i < data.length; i++) {
            temp.push(data[i])
          }
        }
      }

      if (id && data) {
        associativeEntities.push(
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
            data: temp,
          },
        )
      }
    }

    return associativeEntities
  }
}

export default parseAssociativeEntities
