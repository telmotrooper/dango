const codebox = document.querySelector("[name=codebox]")

codebox.addEventListener("keydown", (e) => {
  let { keyCode } = e;
  let { value, selectionStart, selectionEnd } = codebox;

  // console.log(`Key code: ${keyCode}`)

  if (keyCode === 9) {  // TAB
    e.preventDefault();

    codebox.value = value.slice(0, selectionStart) + "  " + value.slice(selectionEnd);

    codebox.setSelectionRange(selectionStart+2, selectionStart+2)
  }

  if (keyCode === 219) {  // "{"
    codebox.value = value.slice(0, selectionStart) + "}" + value.slice(selectionEnd);
    codebox.setSelectionRange(selectionStart, selectionStart)
  }

  if (keyCode === 13 && selectionStart !== value.length) {  // ENTER
    /* Using "value" instead of "codebox.value", because value
        is a copy of the codebox value at the beginning of the
        event, which allows us compare it to "selectionStart"
        to know when the cursor is at the end of the codebox. */

    if(value[selectionStart-1] === "{" && value[selectionStart] === "}") {
      e.preventDefault();

      codebox.value = value.slice(0, selectionStart) + "\n  \n" + value.slice(selectionEnd);
      codebox.setSelectionRange(selectionStart+3, selectionStart+3)

    } else if(value[selectionStart-1] === "{" || value[selectionStart+1] === "}") {  // new line + two spaces indentation
      e.preventDefault();

      codebox.value = value.slice(0, selectionStart) + "\n  " + value.slice(selectionEnd);
      codebox.setSelectionRange(selectionStart+3, selectionStart+3)
    }
    
  }

  if (keyCode === 57) {   // "("
    codebox.value = value.slice(0, selectionStart) + ",)" + value.slice(selectionEnd);
    codebox.setSelectionRange(selectionStart, selectionStart)
  }

  if (keyCode === 188 && value.slice(selectionStart, selectionStart+1) === ",") {   // ","
    e.preventDefault();
    codebox.setSelectionRange(selectionStart+1, selectionStart+1);
  }

});

const submitCode = () => {
  const xhr = new XMLHttpRequest();

  const data = {codebox: codebox.value}

  xhr.open("POST", "/ercode");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(JSON.stringify(data));

  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
      openParserModal(xhr.responseText)
    }
  }
}

const clearCode = () => {
  codebox.value = ""
}

const saveCode = () => {
  const file = new Blob([codebox.value], {type: "text/plain"});
  const url = URL.createObjectURL(file);

  const a = document.createElement("a");
  a.style = "display: none";
  document.body.appendChild(a);

  a.href = url;
  a.download = "er.txt";
  a.click();
}

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
