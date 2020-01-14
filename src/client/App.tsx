import React, { createRef, Fragment, useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { HelpModal } from "./modals/HelpModal"
import { ClearModal } from "./modals/ClearModal"
import { Header } from "./Header"
import { saveToDevice, setupAutoComplete } from "./utils/codebox"
import { submitCode } from "./utils/requests"
import { ParserModal } from "./modals/ParserModal"
import { GenericObject } from "./utils/interfaces"

const App = () => {
  const [ showClearModal , setShowClearModal  ] = useState(false)
  const [ showHelpModal  , setShowHelpModal   ] = useState(false)
  const [ showParserModal, setShowParserModal ] = useState(false)
  const [ parserContent,   _setParserContent ] = useState({})

  const setContext = (json: GenericObject) => {
    const text = JSON.stringify(json, null, 2)
    _setParserContent(text)
  }

  const checkboxRef = createRef()

  // Enable auto complete only when "checkbox" already exists in the DOM 
  useEffect(() => setupAutoComplete(checkboxRef))

  return (
    <Fragment>
      <section className="section">
        <div className="container is-fluid">
          <Header />
      
          <section id="top-menu" className="columns">
            <div className="column">
              <button className="button is-fullwidth" onClick={() => setShowClearModal(!showClearModal)}>Clear</button>
            </div>
            <div className="column">
              <button className="button is-fullwidth" onClick={() => saveToDevice(checkboxRef)}>Save to device</button> 
            </div>
          </section>

          <p className="mb-05 fs-09 mt-minus-05">
            We've made a simple notation to represent ER diagrams in human-readable code! Learn more <a onClick={() => setShowHelpModal(!showHelpModal)}>here</a>.
          </p>

          <div className="columns">
            <section id="form" className="column is-two-fifths">
              <textarea className="textarea has-fixed-size is-small mb-1" rows="18" name="codebox" ref={checkboxRef} />
              <button className="button is-primary is-fullwidth" onClick={() => submitCode(checkboxRef, setShowParserModal, setContext)}>Send</button>
            </section>
            <section id="vis" className="column">
              <p>Placeholder for visualization</p>
            </section>
          </div>

      
        </div>
      </section>

      <HelpModal
        show={showHelpModal}
        setShow={() => setShowHelpModal(!showHelpModal)}
      />

      <ParserModal
        content={parserContent}
        show={showParserModal}
        setShow={() => setShowParserModal(!showParserModal)}
      />

      <div className="modal" id="cypher-modal">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title"><b>Converter output</b> <i>(Cypher)</i></p>
            {/* <button className="delete" aria-label="close" onClick={closeModal('cypher')}></button> */}
          </header>
          <section className="modal-card-body">
            <p className="mb-05 ta-j">This is a schema for the Neo4j graph database (written in the Cypher query language) based on your Entity-Relationship Diagram:</p>
            <textarea readOnly className="textarea has-fixed-size is-small mb-1" rows="18" id="get-cypher-from-er"></textarea>
          </section>
          <footer className="modal-card-foot jc-space-between">
            {/* <button className="button"
              onClick={saveCypherCode()}>Save to device</button> */}
            
            <div>
              {/* <button className="button is-info"
                onClick={}>Generate visualization</button>
              <button className="button is-success"
                onClick={}>Run in Neo4j instance</button> */}
            </div>

          </footer>
        </div>
      </div>

      <ClearModal
        checkbox={checkboxRef}
        show={showClearModal}
        setShow={() => setShowClearModal(!showClearModal)}
      />
    </Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))
