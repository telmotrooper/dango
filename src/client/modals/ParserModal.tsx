import React, { createRef } from "react"
import { saveToDevice } from "../utils/codebox"
import { Input, TextArea } from "../utils/interfaces"

interface Props {
  show: boolean;
  setShow: (arg0: boolean) => void;
  content: string;
  onSubmit: (textArea: TextArea, checkbox: Input) => () => Promise<void>;
}

const ParserModal = React.memo((props: Props) => {
  const { content, show, setShow, onSubmit } = props

  const textAreaRef = createRef<HTMLTextAreaElement>()
  const checkboxRef = createRef<HTMLInputElement>()

  return (
    <div className={"modal" + (show ? " is-active": "")} id="parser-modal">
    <div className="modal-background"></div>
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title"><b>Parser output</b> <i>(JSON)</i></p>
        <button className="delete" aria-label="close" onClick={(): void => setShow(false)} />
      </header>
      <section className="modal-card-body">
        <p className="mb-05 ta-j">This is your Entity-Relationship Diagram represented as a JSON object:</p>
        <textarea ref={textAreaRef} readOnly={true} value={content}
          className="textarea has-fixed-size is-small mb-1" rows={18} id="json-code"></textarea>
        <label className="checkbox">
          <input type="checkbox" ref={checkboxRef} defaultChecked={true} />
          <b>Strict mode: </b>
          <span>Prevents nodes and relationships with labels or types not specified in the ER diagram from being created.</span>
        </label>
      </section>
      <footer className="modal-card-foot jc-space-between">
        <button className="button"
          onClick={(): void => saveToDevice(textAreaRef, "er_json.txt")}>Save to device</button>
        <button className="button is-success"
          onClick={onSubmit(textAreaRef, checkboxRef)}>Convert to Cypher</button>
      </footer>
    </div>
  </div>
  )
})

export { ParserModal }
