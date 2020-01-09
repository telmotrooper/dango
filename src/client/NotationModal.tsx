import * as React from "react"

const NotationModal = React.memo(() => {
  const [showModal, setShowModal] = React.useState(false)

  return (
    <div className={"modal" + (showModal ? " is-active": "")} id="help-modal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title"><b>Notation</b></p>
          <button className="delete" aria-label="close" onClick={() => setShowModal(!showModal)}></button>
        </header>
        <section className="modal-card-body">
          <p className="mb-05 ta-j"><b>TODO:</b> Explain notation here.</p>
        </section>
        <footer className="modal-card-foot jc-flex-end">
          <button className="button"
            onClick={() => setShowModal(!showModal)}>OK</button>
        </footer>
      </div>
    </div>
  )
})

export { NotationModal }
