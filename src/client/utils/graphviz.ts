import { lower } from "../../shared/removeAccents"
import { ER, Ent, AEnt, Rel, Spe, Conn, CompositeAttributes, Union } from "../../server/misc/interfaces"
import { Shape, Proportions } from "./interfaces"
import { indentation } from "../../shared/constants"
import { clusterize, serialize } from "./helpers"


const entityColor          = "#f8ec88" // yellow
const attributeColor       = "#79bddc" // blue
const relationshipColor    = "#dc9079"
const unionColor           = "#82ea76" // green
const specialColor         = "#53c150"
const fontName             = "mono"
const relationshipFontSize = "12"
const cardinalityFontSize  = "12"

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

const getProportions = (shape: Shape, label: string): Proportions => {
  const height = 0.5
  let width = 1

  switch (shape) {
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

  return { width, height }
}

const getEntity = (entityName: string, isWeak = false): string => {
  const shape: Shape = "rectangle"

  const { width, height } = getProportions(shape, entityName)

  const properties = serialize({
    label: entityName,
    shape,
    style: "filled",
    fillcolor: entityColor,
    fontname: fontName,
    width,
    height
  })

  let element = indentation + lower(entityName) + " " + properties

  if (isWeak) {
    element = clusterize(entityName, element)
  }

  return element
}

const getUnion = (union: Union): string => {
  const parent = lower(union.id)

  const name = `${lower(union.id)}_union`

  const properties = serialize({
    label: "U",
    shape: "circle",
    style: "filled",
    fillcolor: unionColor,
    fontname: fontName
  })

  let text = indentation + lower(name) + properties + "\n" + `${parent} -- ${lower(name)} [label="∩"]`

  for (const entity of union.entities) {
    text += "\n" + `${lower(name)} -- ${lower(entity)}`
  }

  return text
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

  const properties = serialize({
    label: "",
    xlabel: `(${completeness},${disjointness})`,
    shape: "triangle",
    style: "filled",
    fillcolor: "#f8ec88",
    fontname: fontName
  })

  let text = indentation + lower(name) + properties + "\n" + `${parent} -- ${lower(name)}`

  for (const entity of specialization.entities) {
    text += "\n" + `${lower(name)} -- ${lower(entity)}`
  }

  return text
}

const getAttribute = (entityName: string, attributeName: string, primaryKey = false, isCompositeAttribute = false, isMultivalued = false): string => {
  const label = isMultivalued ? attributeName : getLabel(attributeName) // Multivalued attributes have labels like "Person (1,n)".

  const properties = serialize({
    label: "",
    shape: primaryKey ? "doublecircle" : "circle",
    style: "filled",
    fixedsize: true,
    width: 0.25,
    height: 0.25,
    fontsize: 10,
    fillcolor: isCompositeAttribute ? "#00526d" : label == "timestamp" ? specialColor : attributeColor,
    fontname: fontName,
    xlabel: label
  })

  return indentation + lower(entityName + "_" + attributeName) + properties
}

const getConnection = (entityName: string, attributeName: string, isAEnt = false, isWeak = false): string => {
  if (isAEnt || isWeak) {
    return indentation + `${lower(entityName + "_" + attributeName)} -- ${lower(entityName)}` + serialize({lhead: "cluster_" + lower(entityName)}) + "\n"
  } else {
    return indentation + `${lower(entityName)} -- ${lower(entityName + "_" + attributeName)}` + "\n"
  }
}
  

const getConnectionForRelationship = (entityName1: string, entityName2: string, label?: string, isAEnt = false, isWeak = false, relName: string | null = null): string => {
  const connectionLabel = relName ?
    relName + "\n" + `(${label})` :
    `(${label})`

  const properties = serialize({
    label: label && connectionLabel,
    fontname: fontName,
    fontsize: cardinalityFontSize,
    lhead: (isAEnt || isWeak) && "cluster_" + lower(entityName2),
    penwidth: isWeak && 3
  })

  return indentation + `${lower(entityName1)} -- ${lower(entityName2)}` + properties
}

const getRelationship = (relationshipName: string): string => {
  const shape: Shape = "diamond"

  const { width, height } = getProportions(shape, relationshipName)

  const properties = serialize({
    shape,
    style: "filled",
    fillcolor: relationshipColor,
    fixedsize: true,
    fontname: fontName,
    fontsize: relationshipFontSize,
    width,
    height
  })

  return indentation + lower(relationshipName) + " " + properties
}
const getAEnt = (entityName: string): string => {
  return clusterize(entityName, getRelationship(entityName))
}

const drawEntities = (entities: Ent[], er: ER) => {
  let diagram = ""

  if (entities) {
    for (const ent of entities) {
      let isWeak = false

      const connections: Array<Conn> = []

      er.rel.forEach(rel => rel.entities.find(conn => {
        if (conn.id == ent.id) {
          connections.push(conn)
        }
      }))

      
      connections.forEach(conn => {
        if (conn.weak) {
          isWeak = true
        }
      })

      diagram += getEntity(ent.id, isWeak) + "\n"
      diagram += generateAttributes(ent, false, true)

      if (Object.entries(ent.compositeAttributes).length > 0) {
        diagram += generateCompositeAttributes(ent.id, ent.compositeAttributes)
      }
    }
  }

  return diagram
}

const generateAttributes = (ent: Ent | AEnt | Rel, isAEnt = false, isWeak = false): string => {
  let text = ""
  for (const attribute of ent.attributes) {
    const isPrimaryKey = ent.pk.indexOf(attribute) !== -1
    text += getAttribute(ent.id, attribute, isPrimaryKey) + "\n"
    text += getConnection(ent.id, attribute, isAEnt, isWeak)
  }

  for (const [key, value] of Object.entries(ent.multivalued)) {
    const attributeName = `${key} (${value.min},${value.max})`
    text += getAttribute(ent.id, attributeName, false, false, true) + "\n"
    text += getConnection(ent.id, attributeName)
  }

  return text
}

const generateCompositeAttributes = (entityName: string, compAttributes: CompositeAttributes): string => {
  let text = ""

  for (const [key, value] of Object.entries(compAttributes)) {
    text += getAttribute(entityName, key, false, true)
    text += getConnection(entityName, key, false, false)

    for (const attribute of value) {
      const attributeId = lower(entityName + "_" + key)
      text += getAttribute(attributeId, attribute, false)
      text += getConnection(attributeId, attribute, false, false)
    }
  }
  
  return text
}

const erToGraphviz = (code: ER): string => {
  if (Object.entries(code).length === 0) {
    return "graph G {}"
  }

  const associativeEntites: Array<string> = []

  if (code.aent) { // Fill an array with the ids for all associative entities in the ER diagram
    for (const aent of code.aent) {
      associativeEntites.push(aent.id)
    }
  }

  let diagram = "graph G {\n" + indentation + "compound = true\n\n"

  diagram += drawEntities(code.ent, code)

  if (code.rel) {
    for (const rel of code.rel) {

      diagram += getRelationship(rel.id) + "\n"

      for (const [index, entity] of rel.entities.entries()) {
        const isAEnt = associativeEntites.includes(entity.id)

        // This "index != 1" thing is just a workaround so we get the desired order when drawing the relationship.
        diagram += getConnectionForRelationship(
          index != 1 ? entity.id : rel.id,
          index != 1 ? rel.id : entity.id,
          entity.cardinality,
          isAEnt,
          entity.weak,
          entity.relName ?? null) + "\n"
      }

      diagram += generateAttributes(rel)

      if (Object.entries(rel.compositeAttributes).length > 0) {
        diagram += generateCompositeAttributes(rel.id, rel.compositeAttributes)
      }
    }
  }

  if (code.aent) {
    for (const aent of code.aent) {
      diagram += getAEnt(aent.id)
      diagram += generateAttributes(aent, true)
      
      for (const entity of aent.entities) {
        diagram += getConnectionForRelationship(entity.id, aent.id, entity.cardinality, true) + "\n"
      }

      if (Object.entries(aent.compositeAttributes).length > 0) {
        diagram += generateCompositeAttributes(aent.id, aent.compositeAttributes)
      }
    }
  }

  if (code.spe) {
    for (const spe of code.spe) {
      diagram += getSpecialization(spe)
    }
  }

  if (code.unions) {
    diagram += drawEntities(code.unions, code)

    for (const union of code.unions) {
      diagram += getUnion(union)
    }
  }

  diagram += "\n}"

  // console.log(diagram)

  return diagram
}

export { erToGraphviz }
