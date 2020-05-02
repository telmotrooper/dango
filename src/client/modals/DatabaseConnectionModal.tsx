import React from "react"

interface Props {
  show: boolean;
  setShow: (arg0: boolean) => void;
}

export const DatabaseConnectionModal = React.memo((props: Props) => {
  const { show, setShow } = props

  return (
    <div className={"modal" + (show ? " is-active": "")} id="help-modal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title"><b>Notation</b></p>
          <button className="delete" aria-label="close" onClick={(): void => setShow(!show)} />
        </header>
        <section className="modal-card-body">
          <p className="mb-05 ta-j">
            <b>TODO:</b> Explain notation here.
          </p>
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
