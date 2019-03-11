const parseEntities = (rawEntities: string[] | null) => {
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

      if (id) {
        entities.push(
          {
            id: id[0],
            data,
          },
        )
      }
    }

    return entities
  }
}

export default parseEntities
