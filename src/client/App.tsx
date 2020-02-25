import React, { createRef, Fragment, useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { HelpModal } from "./modals/HelpModal"
import { ClearModal } from "./modals/ClearModal"
import { Header } from "./Header"
import { saveToDevice, setupAutoComplete } from "./utils/codebox"
import { submitCode, getCypherFromER } from "./utils/requests"
import { ParserModal } from "./modals/ParserModal"
import { GenericObject, TextArea } from "./utils/interfaces"
import { CypherModal } from "./modals/CypherModal"
import { Graphviz } from "graphviz-react"
import { Codebox } from "./Codebox"

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

  const textAreaRef = createRef<HTMLTextAreaElement>()

  // Enable auto complete only when codebox already exists in the DOM 
  useEffect(() => setupAutoComplete(textAreaRef))

  const handleSubmitCode = (ref: TextArea) => async (): Promise<void> => {
    const res = await submitCode(ref.current.value)
    setParserContent(res.data)
    setShowParserModal(true)
  }

  const handleGetCypherFromER = (ref: TextArea) => async (): Promise<void> => {
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
              <button className="button is-fullwidth" onClick={() => setShowClearModal(!showClearModal)}>
                Clear
              </button>
            </div>
            <div className="column">
              <button className="button is-fullwidth" onClick={() => saveToDevice(textAreaRef, "er.txt")}>
                Save to device
              </button> 
            </div>
          </section>

          <p className="mb-05 fs-09 mt-minus-05">
            We've made a simple notation to represent ER diagrams in human-readable code!
            Learn more <a onClick={(): void => setShowHelpModal(!showHelpModal)}>here</a>.
          </p>

          <div className="columns">
            <Codebox
              textAreaRef={textAreaRef}
              handleSubmit={handleSubmitCode(textAreaRef)}
            />
            <section id="vis" className="column vis">
              <Graphviz
                options={{
                  zoom: true,
                  height: "100%",
                  width: "100%"
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
        checkbox={textAreaRef}
        show={showClearModal}
        setShow={(): void => setShowClearModal(!showClearModal)}
      />
    </Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))
