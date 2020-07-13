import React from "react"
import logo from "../assets/dango.png"

interface Props {
  show: boolean;
  setShow: (arg0: boolean) => void;
}

const HelpModal = React.memo((props: Props) => {
  const { show, setShow } = props

  return (
    <div className={"modal" + (show ? " is-active": "")} id="help-modal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title"><b>Help</b></p>
          <button className="delete" aria-label="close" onClick={(): void => setShow(!show)} />
        </header>
        <section className="modal-card-body">
          <div className="mb-05 ta-j">
            <img src={logo} />
            <p>
              <b>Dango</b> is a graph database modeling tool which allows you to write a schema for a Neo4j database by writing an Entity-Relationship diagram.
            </p>
            <br/>
            <p>
              The schema generated is composed of Neo4j constraints and APOC triggers, which force the nodes and relationships in the database to behave as modeled.
            </p>
          </div>
        </section>
        <footer className="modal-card-foot jc-flex-end">
          <button className="button" onClick={(): void => setShow(!show)}>
            OK
          </button>
        </footer>
      </div>
    </div>
  )
})

export { HelpModal }
