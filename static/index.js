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


    e.preventDefault();

    if(value[selectionStart-1] === "{" && value[selectionStart] === "}") {
      codebox.value = value.slice(0, selectionStart) + "\n  \n" + value.slice(selectionEnd);
      codebox.setSelectionRange(selectionStart+3, selectionStart+3)
    } else {
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

  xhr.open("POST", "/code");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(JSON.stringify(data));

  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
    }
  }
}
