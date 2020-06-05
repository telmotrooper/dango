import { lower } from "../../shared/removeAccents"
import { ER, Ent, AEnt, Rel, Spe } from "../../server/misc/interfaces"
import { Shape } from "./interfaces"

const entityColor          = "#f8ec88"
const attributeColor       = "#79bddc"
const relationshipColor    = "#dc9079"
const fontName             = "mono"
const relationshipFontSize = "12"
const cardinalityFontSize  = "12"
const identation           = "  "

/**
 * Split attribute name into multiple lines to fit shape.
 * @param attributeName 
 */
const getLabel = (attributeName: string): string => {
  if (attributeName == attributeName.toUpperCase()) { // Attribute name is an acronym.
    return attributeName
  }

  let label = ""

  for (let i = 0; i < attributeName.length; i++) { // Add a new line everytime an uppercase character is found.
    if (attributeName[i] == attributeName[i].toUpperCase() && i != 0) {
      label += "\\n"
    }

    label += attributeName[i]
  }

  return label
}

const correctWidth = (width: number, label: string): number => {
  /* Increase width by 0.125 for each letter past 8, this way we can
   * prevent labels from getting bigger than their respective shape. */
  if (label.length > 8) {
    const multiplier = (label.length - 8) / 2
    width += multiplier * 0.25
  }

  return width
}

const getProportions = (shape: Shape, label: string): string => {
  const height = 0.5
  let width = 1

  switch(shape) {
    case "rectangle":
      width = 1
      break
    
    case "diamond":
      width =  1.5
      break

    default:
      break
  }

  width = correctWidth(width, label)

  return `height=${height}, width=${width}`
}

const getEntity = (entityName: string): string => {
  const shape: Shape = "rectangle"

  return (
    identation +
    `${lower(entityName)} [label="${entityName}", shape=${shape}, style=filled, fillcolor="${entityColor}", fontname="${fontName}", ${getProportions(shape, entityName)}]`
  )
}

const getSpecialization = (specialization: Spe): string => {
  const parent = lower(specialization.id)

  const { id, disjoint, total } = specialization
  // id: string, total: boolean, disjoint: boolean
  let name = lower(id) + "_"

  const completeness = total
    ? "t" // total
    : "p" // partial

  const disjointness = disjoint
    ? "d" // disjoint
    : "o" // overlap

  name += completeness + disjointness

  let text = (
    identation +
    `${lower(name)} [label="", xlabel="(${completeness},${disjointness})", shape=triangle, style=filled, fillcolor="#f8ec88", fontname="mono"]` +
    "\n" + `${parent} -- ${lower(name)}`
  )

  for (const entity of specialization.entities) {
    text += "\n" + `${lower(name)} -- ${lower(entity)}`
  }

  return text
}

const getAttribute = (entityName: string, attributeName: string, primaryKey?: boolean): string => {
  const label = getLabel(attributeName)

  return identation + `${lower(entityName + "_" + attributeName)} [label="", shape=${primaryKey ? "doublecircle" : "circle"}, ` +
  `style=filled, fixedsize=true, height=0.25, width=0.25, fontsize=10, fillcolor="${attributeColor}", fontname="${fontName}", xlabel="${label}"]`
}

const getConnection = (entityName: string, attributeName: string): string =>
  identation + `${lower(entityName)} -- ${lower(entityName + "_" + attributeName)}`

const getConnectionForRelationship = (entityName1: string, entityName2: string, label?: string, headLabel?: string, tailLabel?: string): string => {
  let properties = ""

  if (label) {
    properties = ` [label="(${label})", fontname="${fontName}", fontsize="${cardinalityFontSize}"]`
  } else if (headLabel && tailLabel) {
    properties = ` [headlabel="(${headLabel})", taillabel="(${tailLabel})", fontname="${fontName}", fontsize="${cardinalityFontSize}"]`
  } else if (headLabel) {
    properties = ` [headlabel="(${headLabel})", fontname="${fontName}", fontsize="${cardinalityFontSize}"]`
  } else if (tailLabel) {
    properties = ` [taillabel="(${tailLabel})", fontname="${fontName}", fontsize="${cardinalityFontSize}"]`
  }

  return identation + `${lower(entityName1)} -- ${lower(entityName2)}` + properties
}

const getRelationship = (relationshipName: string): string => {
  const shape: Shape = "diamond"

  return (
    identation +
    `${lower(relationshipName)} [shape=${shape}, style=filled, fillcolor="${relationshipColor}", fixedsize=true, fontname="${fontName}", fontsize=${relationshipFontSize}, ${getProportions(shape, relationshipName)}]`
  )
}
const getAEnt = (entityName: string): string => {
  const shape: Shape = "diamond"

  return (
    identation +
    `subgraph ${"cluster_" + lower(entityName)} {
    style=filled
    fillcolor="#f8ec88"
    ${getRelationship(entityName)}
    }\n`
  )
}

const generateAttributes = (ent: Ent | AEnt | Rel): string => {
  let text = ""
  for (const attribute of ent.attributes) {
    const isPrimaryKey = ent.pk.indexOf(attribute) !== -1
    text += getAttribute(ent.id, attribute, isPrimaryKey) + "\n"
    text += getConnection(ent.id, attribute) + "\n"
  }

  return text
}

const convertER = (code: ER): string => {
  if (Object.entries(code).length === 0) {
    return "graph G {}"
  }

  let diagram = "graph G {\n\n"

  if (code.ent) {
    for (const ent of code.ent) {
      diagram += getEntity(ent.id) + "\n"
      diagram += generateAttributes(ent)
    }
  }

  if (code.rel) {
    for (const rel of code.rel) {
      diagram += getRelationship(rel.id) + "\n"
      diagram += getConnectionForRelationship(rel.entities[0].id, rel.id, rel.entities[0].cardinality) + "\n"
      diagram += getConnectionForRelationship(rel.id, rel.entities[1].id, rel.entities[1].cardinality) + "\n"
      diagram += generateAttributes(rel)
    }
  }

  if (code.aent) {
    for (const aent of code.aent) {
      diagram += getAEnt(aent.id)
      diagram += generateAttributes(aent)
      
      for (const entity of aent.entities) {
        diagram += getConnectionForRelationship(entity.id, aent.id, entity.cardinality) + "\n"
      }
    }
  }

  if (code.spe) {
    for (const spe of code.spe) {
      diagram += getSpecialization(spe)
    }
  }

  diagram += "\n}"

  console.debug(diagram)

  return diagram
}

export { convertER }