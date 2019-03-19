const submitCypher = () => {
  const erCode = document.querySelector("[id=json-code]")

  const xhr = new XMLHttpRequest();
  const data = {er: erCode.value}

  xhr.open("POST", "/cyphercode");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(JSON.stringify(data));

  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
      closeModal("parser")
      openCypherModal(xhr.responseText)
    }
  }
}
