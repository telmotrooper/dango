import { Ent } from "../misc/interfaces"
import { allBetweenCurlyBrackets, allButWhitespace, secondWordFound } from "../misc/regex"

const parseEntities = (rawEntities: string[]): Ent[] => {
  const entities: Ent[] = []

  for (const ent of rawEntities) {
    let x = ent.match(secondWordFound)
    
    const id: string = ent.match(secondWordFound)?.[0] ?? ""

    const data: string[] = ent.match(allBetweenCurlyBrackets)?.[0].match(allButWhitespace) ?? []
    const attributes: string[] = []
    const pk: string[] = []

    for (let i = 0; i < data.length; i += 1) {
      if (data[i] !== "*") {
        attributes.push(data[i])
      } else {
        pk.push(data[i - 1])
      }
    }

    entities.push({ id, attributes, pk })
  }

  return entities
}

export { parseEntities }
