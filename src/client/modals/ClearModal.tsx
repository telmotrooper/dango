import React, { RefObject } from "react"
import { clearCode } from "../utils/codebox"

interface Props {
  checkbox: RefObject<unknown>;
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
        <footer className="modal-card-foot jc-space-between">
          <button className="button is-danger"
            onClick={handleClearCode}>Yes</button>
          <button className="button"
            onClick={handleSetShow}>No</button>
        </footer>
      </div>
    </div>
  )
})

export { ClearModal }
