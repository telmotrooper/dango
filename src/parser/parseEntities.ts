const parseEntities = (rawEntities: string[] | null) => {
  if (rawEntities) {
    const entities = []

    for (const ent of rawEntities) {
      const id = ent.match(/(?<=\w )\w[^ ]+/gi)
      let rawData = ent.match(/[^{\}]+(?=})/gi)

      if (rawData === null) {
        rawData = []
      }

      rawData.forEach((entry) => console.log(entry))

      if (id) {
        entities.push(
          {
            id: id[0],
            data: rawData,
          },
        )
      }
    }

    return entities
  }
}

export default parseEntities
