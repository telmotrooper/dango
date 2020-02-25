import React, { ChangeEvent } from "react"
import { TextArea } from "./utils/interfaces"

interface Props {
  textAreaRef: TextArea;
  handleSubmit: () => Promise<void>;
}

const Codebox = React.memo((props: Props) => {
  const { textAreaRef, handleSubmit } = props

  return (
    <section id="form" className="column is-two-fifths">
      <textarea
        name="codebox"
        ref={textAreaRef}
        className="textarea has-fixed-size is-small mb-1"
        rows={25}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>): void => {
          console.log(`Code updated:\n${event.target.value}`)
        }}
      />
      <button className="button is-primary is-fullwidth" onClick={handleSubmit}>
        Send
      </button>
    </section>
  )
})

export { Codebox }
