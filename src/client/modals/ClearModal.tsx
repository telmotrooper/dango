import React from "react"

interface Props {
  show: boolean;
  setShow: any;
}

const ClearModal = React.memo((props: Props) => {
  const { show, setShow } = props

  return (
    <div className={"modal" + (show ? " is-active": "")} id="clear-modal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <section className="modal-card-body">
          <p>Are you sure you wanna clear your code?</p>
          <p><b>WARNING: This action is irreversible.</b></p>
        </section>
        <footer className="modal-card-foot jc-space-between">
          {/* <button className="button is-danger"
            onClick={clearERCode()}>Yes</button> */}
          <button className="button"
            onClick={() => setShow(!show)}>No</button>
        </footer>
      </div>
    </div>
  )
})

export { ClearModal }
