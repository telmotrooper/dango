import React, { RefObject } from "react"

interface Props {
  show: boolean;
  setShow: (boolean) => void;
}

const ParserModal = React.memo((props: Props) => {
  const { show, setShow } = props

  return (
    <div className={"modal" + (show ? " is-active": "")} id="parser-modal">
    <div className="modal-background"></div>
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title"><b>Parser output</b> <i>(JSON)</i></p>
        <button className="delete" aria-label="close" onClick={() => setShow(false)} />
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
  )
})

export { ParserModal }
