const removeAccents = (text: string) => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

const lowerAndRemoveAccents = (text: string) => {
  const temp = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  return temp.toLowerCase()
}

export default removeAccents
export { lowerAndRemoveAccents, removeAccents }
