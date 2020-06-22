const removeAccents = (text: string): string => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

const lower = (text: string): string => {
  let temp = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

  temp = temp.replace("-", "_") // Character "-" can't be used in Graphviz labels.

  return temp.toLowerCase()
}

const upper = (text: string): string => {
  const temp = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  return temp.toUpperCase()
}

export { lower, removeAccents, upper }
