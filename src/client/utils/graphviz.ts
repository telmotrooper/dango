import { lower } from "../../shared/removeAccents"
import { ER } from "../../server/misc/interfaces"

const entityColor       = "#f8ec88"
const attributeColor    = "#79bddc"
const relationshipColor = "#dc9079"

const getEntity = (entityName: string): string =>
  `${lower(entityName)} [label="${entityName}", shape=rectangle, style=filled, fillcolor="${entityColor}"]`

const getAttribute = (entityName: string, attributeName: string, primaryKey?: boolean): string =>
  `${lower(entityName + "_" + attributeName)} [label="${attributeName}", shape=${primaryKey ? "doublecircle" : "circle"}, ` +
  `style=filled, fixedsize=true, height=0.5, width=0.5, fontsize=10, fillcolor="${attributeColor}"]`

const getConnection = (entityName: string, attributeName: string): string =>
  `${lower(entityName)} -- ${lower(entityName + "_" + attributeName)}`

const getConnectionForRelationship = (entityName1: string, entityName2: string): string =>
  `${lower(entityName1)} -- ${lower(entityName2)}`

const getRelationship = (relationshipName: string): string =>
  `${lower(relationshipName)} [shape=diamond, style=filled, fillcolor="${relationshipColor}", fixedsize=true, height=0.5, width=1.5]`

const convertER = (code: ER): string => {
  console.log(code)

  if (Object.entries(code).length === 0) {
    return "graph G {}"
  }

  let diagram = "graph G {\n"

  if (code.ent) {
    for (const ent of code.ent) {
      diagram += getEntity(ent.id) + "\n"
  
      for (const attribute of ent.data) {
        const isPrimaryKey = ent.pk.indexOf(attribute) !== -1
        diagram += getAttribute(ent.id, attribute, isPrimaryKey) + "\n"
        diagram += getConnection(ent.id, attribute) + "\n"
      }
    }
  }

  if (code.rel) {
    for (const rel of code.rel) {
      diagram += getRelationship(rel.id) + "\n"
      diagram += getConnectionForRelationship(rel.ent1.id, rel.id) + "\n"
      diagram += getConnectionForRelationship(rel.id, rel.ent2.id) + "\n"
    }
  }

  diagram += "\n}"

  console.debug(diagram)

  return diagram
}

export { convertER }