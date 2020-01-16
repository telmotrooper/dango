import React, { createRef, RefObject } from "react"
import { saveToDevice } from "../utils/codebox"

interface Props {
  show: boolean;
  setShow: (boolean) => void;
  content: string;
}

const CypherModal = React.memo((props: Props) => {
  const { content, show, setShow } = props

  const textAreaRef = createRef()

  return (
    <div className={"modal" + (show ? " is-active": "")} id="cypher-modal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title"><b>Converter output</b> <i>(Cypher)</i></p>
          <button className="delete" aria-label="close" onClick={() => setShow(false)}></button>
        </header>
        <section className="modal-card-body">
          <p className="mb-05 ta-j">This is a schema for the Neo4j graph database (written in the Cypher query language) based on your Entity-Relationship Diagram:</p>
          <textarea ref={textAreaRef} readOnly={true} value={content}
            className="textarea has-fixed-size is-small mb-1" rows="18" id="get-cypher-from-er" />
        </section>
        <footer className="modal-card-foot jc-space-between">
          <button className="button"
            onClick={() => saveToDevice(textAreaRef, "cypher.txt")}>Save to device</button>
          
          <div>
            {/* <button className="button is-info"
              onClick={}>Generate visualization</button>
            <button className="button is-success"
              onClick={}>Run in Neo4j instance</button> */}
          </div>

        </footer>
      </div>
    </div>
  )
})

export { CypherModal }
