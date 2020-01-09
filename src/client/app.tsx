import React, { useState } from "react"
import ReactDOM from "react-dom"
import { HelpModal } from "./HelpModal"

const App = () => {
  const [ showHelpModal, setShowHelpModal ] = useState(false)

  return (
    <React.Fragment>
      <section className="section">
        <div className="container is-fluid">
          <header className="mb-1">
            <h1 className="title">Dango</h1>
            <h2 className="subtitle">ER diagrams to graph databases</h2>
          </header>
      
          <section id="top-menu" className="columns">
            <div className="column">
              {/* <button className="button is-fullwidth" onClick={openSimpleModal('clear')()}>Clear</button> */}
            </div>
            <div className="column">
              {/* <button className="button is-fullwidth" onClick={saveERCode()}>Save to device</button>  */}
            </div>
          </section>

          <p className="mb-05 fs-09 mt-minus-05">
            We've made a simple notation to represent ER diagrams in human-readable code! Learn more <a onClick={() => setShowHelpModal(!showHelpModal)}>here</a>.
          </p>

          <div className="columns">
            <section id="form" className="column is-two-fifths">
              <textarea className="textarea has-fixed-size is-small mb-1" rows="18" name="codebox"></textarea>
              {/* <button className="button is-primary is-fullwidth" onClick={submitCode()}>Send</button> */}
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

      <div className="modal" id="parser-modal">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title"><b>Parser output</b> <i>(JSON)</i></p>
            {/* <button className="delete" aria-label="close" onClick={closeModal('parser')}></button> */}
          </header>
          <section className="modal-card-body">
            <p className="mb-05 ta-j">This is your Entity-Relationship Diagram represented as a JSON object:</p>
            <textarea readOnly className="textarea has-fixed-size is-small mb-1" rows="18" id="json-code"></textarea>
          </section>
          <footer className="modal-card-foot jc-space-between">
            {/* <button className="button"
              onClick={saveJSONCode()}>Save to device</button> */}
            {/* <button className="button is-success"
              onClick={getCypherFromER()}>Convert to Cypher</button> */}
          </footer>
        </div>
      </div>

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

      <div className="modal" id="clear-modal">
        <div className="modal-background"></div>
        <div className="modal-card">
          <section className="modal-card-body">
            <p>Are you sure you wanna clear your code?</p>
            <p><b>WARNING: This action is irreversible.</b></p>
          </section>
          <footer className="modal-card-foot jc-space-between">
            {/* <button className="button is-danger"
              onClick={clearERCode()}>Yes</button> */}
            {/* <button className="button"
              onClick={closeModal('clear')}>No</button> */}
          </footer>
        </div>
      </div>
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))
