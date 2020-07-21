import { Ent } from "../misc/interfaces"
import { allBetweenCurlyBrackets, secondWordFound, linesIncludingWhitespace, allBetweenCurlyBracketsIncludingThem } from "../misc/regex"
import { removeIndentation } from "../cypher/helpers"
import { GenericObject } from "../../shared/interfaces"

const parseEntities = (rawEntities: string[]): Ent[] => {
  const entities: Ent[] = []

  for (const ent of rawEntities) {
    const id: string = ent.match(secondWordFound)?.[0] ?? ""   

    // TODO: Finish working on composite attributes.
    let x: string = ent.match(allBetweenCurlyBracketsIncludingThem)?.[0] ?? ""
    x = x.substr(1, x.length-1)
    console.log(x)

    const data: string[] = ent.match(allBetweenCurlyBrackets)?.[0].match(linesIncludingWhitespace) ?? []
    removeIndentation(data)

    const attributes: string[] = []
    // eslint-disable-next-line prefer-const
    let compositeAttributes: GenericObject = {}
    const pk: string[] = []

    for (let i = 0; i < data.length; i += 1) {
      if (data[i].includes(" *")) {
        const attributeName = data[i].substr(0, data[i].length-2)
        attributes.push(attributeName)
        pk.push(attributeName)
      } else {
        attributes.push(data[i])
      }
    }

    entities.push({ id, attributes, compositeAttributes,  pk })
  }

  return entities
}

export { parseEntities }
