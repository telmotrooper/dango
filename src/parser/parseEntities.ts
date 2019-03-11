const parseEntities = (rawEntities: string[] | null) => {
  // console.log(rawEntities)

  if (rawEntities) {
    const entities = []

    for (const ent of rawEntities) {
      const id = ent.match(/(?<=\w )\w[^ ]+/gi)
      const rawData = ent.match(/[^{\}]+(?=})/gi)
      let data

      if (rawData !== null) {
        data = rawData[0].match(/(\S)+/gi)
      } else {
        data = []
      }

      // data.forEach((entry) => console.log(entry))

      if (id) {
        entities.push(
          {
            id: id[0],
            data,
          },
        )
      }
    }

    console.log(entities)
    return entities
  }
}

export default parseEntities
