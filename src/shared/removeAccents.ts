export const removeAccents = (text: string): string => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

export const lower = (text: string): string => {
  let temp = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

  temp = temp.replace("-", "_") // Character "-" can't be used in Graphviz labels.
  temp = temp.replace(" ", "_") // Required to properly display attributes with whitespace in their names.

  return temp.toLowerCase()
}

export const upper = (text: string): string => {
  const temp = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  return temp.toUpperCase()
}

export const normalize = (label: string): string => {
  if (label.lastIndexOf("-") !== -1 || label.lastIndexOf(" ") !== -1) {
    return "`" + label + "`"
  }
  return label
}

export const titlefy = (text: string): string => {
  if (text.length > 0) {
    return text.substr(0,1).toUpperCase() +  text.substr(1, text.length).toLowerCase()
  }

  return ""
}
