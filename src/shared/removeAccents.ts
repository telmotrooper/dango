const removeAccents = (text: string): string => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

const lower = (text: string): string => {
  const temp = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  return temp.toLowerCase()
}

const upper = (text: string): string => {
  const temp = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  return temp.toUpperCase()
}

export default removeAccents
export { lower, removeAccents, upper }
