const openParserModal = (jsonCode) => {
  const element = document.getElementById("json-code")

  const json = JSON.parse(jsonCode)
  element.value = JSON.stringify(json, null, 2)

  const modal = document.getElementById("parser-modal")
  modal.classList.add("is-active");
}

const closeModal = (name) => {
  const modal = document.getElementById(`${name}-modal`)
  modal.classList.remove("is-active");
}

const openCypherModal = (cypherCode) => {
  const element = document.getElementById("cypher-code")

  element.value = cypherCode

  const modal = document.getElementById("cypher-modal")
  modal.classList.add("is-active");
}

const closeCypherModal = () => {
  const modal = document.getElementById("cypher-modal")
  modal.classList.remove("is-active");
}