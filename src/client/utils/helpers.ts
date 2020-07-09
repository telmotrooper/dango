import { GenericObject } from "../../shared/interfaces"
import { indentation } from "../../shared/constants"
import { lower } from "../../shared/removeAccents"

export const clusterize = (name: string, innerElement: string, fillColor = "#f8ec88"): string => {
  return (
    indentation +
    `subgraph ${"cluster_" + lower(name)} {
    style=filled
    fillcolor="${fillColor}"
    ${innerElement}
    }\n`
  )
}


// WORK IN PROGRESS
export const serialize = (obj: GenericObject): string => {
  if (Object.entries(obj).length == 0) {
    return ""
  }

  let output = "["

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value == "string") {
      output += `${key}="${value}", `
      
    } else {
      output += `${key}=${value}, `
    }
  }

  output = output.substr(0, output.length - 2) + "]"

  return output
}
