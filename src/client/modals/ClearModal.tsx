import React from "react"
import { clearCode } from "../utils/codebox"
import { TextArea } from "../utils/interfaces"

interface Props {
  checkbox: TextArea;
  show: boolean;
  setShow: (boolean) => void;
}

const ClearModal = React.memo((props: Props) => {
  const { checkbox, show, setShow } = props

  const handleClearCode = (): void => clearCode(checkbox, setShow)
  const handleSetShow = (): void => setShow(!show)

  return (
    <div className={"modal" + (show ? " is-active": "")} id="clear-modal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <section className="modal-card-body">
          <p>Are you sure you wanna clear your code?</p>
          <p><b>WARNING: This action is irreversible.</b></p>
        </section>
        <footer className="modal-card-foot jc-flex-end">
          <button className="button" onClick={handleSetShow}>
            No
          </button>
          <button className="button is-danger" onClick={handleClearCode}>
            Yes
          </button>
        </footer>
      </div>
    </div>
  )
})

export { ClearModal }
