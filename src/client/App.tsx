import React, { createRef, Fragment, RefObject, useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { HelpModal } from "./modals/HelpModal"
import { ClearModal } from "./modals/ClearModal"
import { Header } from "./Header"
import { saveToDevice, setupAutoComplete } from "./utils/codebox"
import { submitCode, getCypherFromER } from "./utils/requests"
import { ParserModal } from "./modals/ParserModal"
import { GenericObject, CodeboxRef } from "./utils/interfaces"
import { CypherModal } from "./modals/CypherModal"
import { Graphviz } from "graphviz-react"

const App = (): JSX.Element => {
  const [ showClearModal , setShowClearModal  ] = useState(false)
  const [ showHelpModal  , setShowHelpModal   ] = useState(false)
  const [ showParserModal, setShowParserModal ] = useState(false)
  const [ showCypherModal, setShowCypherModal ] = useState(false)
  const [ parserContent,   _setParserContent ] = useState("")
  const [ cypherContent,   setCypherContent ] = useState("")

  const setParserContent = (json: GenericObject): void => {
    const text = JSON.stringify(json, null, 2)
    _setParserContent(text)
  }

  const checkboxRef = createRef<HTMLTextAreaElement>()

  // Enable auto complete only when "checkbox" already exists in the DOM 
  useEffect(() => setupAutoComplete(checkboxRef))

  const handleSubmitCode = (ref: CodeboxRef) => async (): Promise<void> => {
    const res = await submitCode(ref.current.value)
    setParserContent(res.data)
    setShowParserModal(true)
  }

  const handleGetCypherFromER = (ref: CodeboxRef) => async (): Promise<void> => {
    const res = await getCypherFromER(ref.current.value)
    setCypherContent(res.data)
    setShowCypherModal(true)
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
              <textarea className="textarea has-fixed-size is-small mb-1" rows={25} name="codebox" ref={checkboxRef} />
              <button className="button is-primary is-fullwidth" onClick={handleSubmitCode(checkboxRef)}>Send</button>
            </section>
            <section id="vis" className="column">
              <Graphviz
                options={{
                  zoom: true
                }}
                dot={
                  `graph G {
                    bibliotecarios [label="Bibliotecários", shape=rectangle, style=filled]
                
                    cpf [label="CPF", shape=doublecircle, fixedsize=true, height=0.5, width=0.5, fontsize=10]
                    nome [label="Nome", shape=circle, fixedsize=true, size=0.5, fontsize=10]
                    salario[label="Salário", shape=circle, fixedsize=true, size=0.5, fontsize=10]
                
                    estagiarios [label="Estagiários", shape=rectangle, style=filled]
                
                    bibliotecarios -- cpf
                    bibliotecarios -- nome
                    bibliotecarios -- salario   
                    bibliotecarios -- estagiarios
                    
                    a
                    b
                    c
                    d
                    e
                    f
                    g
                    h
                    j
                }`}
              />
            </section>
          </div>

      
        </div>
      </section>

      <HelpModal
        show={showHelpModal}
        setShow={(): void => setShowHelpModal(!showHelpModal)}
      />

      <ParserModal
        content={parserContent}
        show={showParserModal}
        setShow={(): void => setShowParserModal(!showParserModal)}
        onSubmit={handleGetCypherFromER}
      />

      <CypherModal
        content={cypherContent}
        show={showCypherModal}
        setShow={(): void => setShowCypherModal(!showCypherModal)}
      />

      <ClearModal
        checkbox={checkboxRef}
        show={showClearModal}
        setShow={(): void => setShowClearModal(!showClearModal)}
      />
    </Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))
