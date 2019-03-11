const parseRelationships = (rawRelationships: string[] | null) => {
  if (rawRelationships) {
    const relationships = []

    for (const rel of rawRelationships) {
      const id = rel.match(/(?<=\w )\w[^ ]+/gi)

      if (id) {
        relationships.push(
          {
            id: id[0],
          },
        )
      }
    }

    return relationships
  }
}

export default parseRelationships
