import { lower } from "../../shared/removeAccents"

const getEntity = (entityName: string): string => `${lower(entityName)} [label="${entityName}", shape=rectangle, style=filled]`

const getAttribute = (attributeName: string, primaryKey?: boolean): string => `${lower(attributeName)} [label="${attributeName}", shape=${primaryKey ? "doublecircle" : "circle"}, fixedsize=true, height=0.5, width=0.5, fontsize=10]`

const convertER = (code: string): string => {



  return code
}

export { convertER }