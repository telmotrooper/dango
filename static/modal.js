const openParserModal = (jsonCode) => {
  const element = document.getElementById("json-code")

  const json = JSON.parse(jsonCode)
  element.value = JSON.stringify(json, null, 2)

  const modal = document.getElementById("parser-modal")
  modal.classList.add("is-active");
}

const closeParserModal = () => {
  const modal = document.getElementById("parser-modal")
  modal.classList.remove("is-active");
}
