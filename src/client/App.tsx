import React, { createRef, Fragment, useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { HelpModal } from "./modals/HelpModal"
import { ClearModal } from "./modals/ClearModal"
import { Header } from "./Header"
import { saveToDevice, setupAutoComplete } from "./utils/codebox"
import { submitCode } from "./utils/requests"
import { ParserModal } from "./modals/ParserModal"
import { GenericObject } from "./utils/interfaces"
import { CypherModal } from "./modals/CypherModal"

const App = () => {
  const [ showClearModal , setShowClearModal  ] = useState(false)
  const [ showHelpModal  , setShowHelpModal   ] = useState(false)
  const [ showParserModal, setShowParserModal ] = useState(false)
  const [ showCypherModal, setShowCypherModal ] = useState(false)
  const [ parserContent,   _setParserContent ] = useState({})
  const [ cypherContent,   setCypherContent ] = useState({})

  const setParserContent = (json: GenericObject) => {
    const text = JSON.stringify(json, null, 2)
    _setParserContent(text)
  }

  const checkboxRef = createRef()

  // Enable auto complete only when "checkbox" already exists in the DOM 
  useEffect(() => setupAutoComplete(checkboxRef))

  const handleSubmitCode = (code: string) => async (): Promise<void> => {
    const res = await submitCode(code)
    setParserContent(res.data)
    setShowParserModal(true)
  }

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
              <button className="button is-fullwidth" onClick={() => saveToDevice(checkboxRef, "er.txt")}>Save to device</button> 
            </div>
          </section>

          <p className="mb-05 fs-09 mt-minus-05">
            We've made a simple notation to represent ER diagrams in human-readable code! Learn more <a onClick={() => setShowHelpModal(!showHelpModal)}>here</a>.
          </p>

          <div className="columns">
            <section id="form" className="column is-two-fifths">
              <textarea className="textarea has-fixed-size is-small mb-1" rows="18" name="codebox" ref={checkboxRef} />
              <button className="button is-primary is-fullwidth" onClick={handleSubmitCode(checkboxRef && checkboxRef.current && checkboxRef.current.value)}>Send</button>
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

      <CypherModal
        content={cypherContent}
        show={showCypherModal}
        setShow={() => setCypherContent(!showCypherModal)}
      />

      <ClearModal
        checkbox={checkboxRef}
        show={showClearModal}
        setShow={() => setShowClearModal(!showClearModal)}
      />
    </Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))

export { store }
