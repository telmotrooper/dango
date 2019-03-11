const parseSpecializations = (rawSpecializations: string[] | null) => {
  if (rawSpecializations) {
    const specializations = []

    for (const spe of rawSpecializations) {
      let id = spe.match(/[^{\}]+(?=\()/gi)
      if (id) {id = id[0].match(/\w[^ ]+/gi) }

      if (id) {
        specializations.push(
          {
            id: id[0],
          },
        )
      }
    }

    return specializations
  }
}

export default parseSpecializations
