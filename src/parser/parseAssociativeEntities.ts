const parseAssociativeEntities = (rawAssociativeEntities: string[] | null) => {
  if (rawAssociativeEntities) {
    const associativeEntities = []

    for (const aent of rawAssociativeEntities) {
      const id = aent.match(/(?<=\w )\w[^ ]+/gi)

      if (id) {
        associativeEntities.push(
          {
            id: id[0],
          },
        )
      }
    }

    return associativeEntities
  }
}

export default parseAssociativeEntities
