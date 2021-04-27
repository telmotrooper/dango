import React, { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MainContext } from "../store/context"
import { enableSendButton, setDiagram } from "../store/generalSlice"
import { toggleClearModal } from "../store/modalSlice"
import { RootState } from "../store/store"
import { clearCode } from "../utils/codebox"

const ClearModal = React.memo(() => {
  const { textAreaRef } = useContext(MainContext)

  const show = useSelector((state: RootState) => state.modal.showClearModal)
  const dispatch = useDispatch()


  const handleClearCode = (): void => {
    dispatch(setDiagram("")) // Clear visualization
    if (textAreaRef !== null)
      clearCode(textAreaRef, handleSetShow) // Clear codebox and close modal
    dispatch(enableSendButton(false))
  }
  const handleSetShow = () => dispatch(toggleClearModal())

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
