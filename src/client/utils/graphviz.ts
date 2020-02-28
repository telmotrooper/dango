import { lower } from "../../shared/removeAccents"
import { ER } from "../../server/misc/interfaces"

const getEntity = (entityName: string): string =>
  `${lower(entityName)} [label="${entityName}", shape=rectangle, style=filled]`

const getAttribute = (attributeName: string, primaryKey?: boolean): string =>
  `${lower(attributeName)} [label="${attributeName}", shape=${primaryKey ? "doublecircle" : "circle"}, fixedsize=true, height=0.5, width=0.5, fontsize=10]`

const getConnection = (entityName: string, attributeName: string): string =>
  `${lower(entityName)} -- ${lower(attributeName)}`

const convertER = (code: ER): string => {
  if (Object.entries(code).length === 0) {
    return "graph G {}"
  }

  let diagram = "graph G {\n"

  for (const ent of code.ent) {
    diagram += getEntity(ent.id) + "\n"

    for (const attribute of ent.data) {
      diagram += getAttribute(attribute) + "\n"
      diagram += getConnection(ent.id, attribute) + "\n"
    }
  }

  diagram += "\n}"

  console.debug(diagram)

  return diagram
}

export { convertER }