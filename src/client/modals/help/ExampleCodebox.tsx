import React from "react"

interface Props {
  code: string,
  setCode: (code: string) => void,
  rows?: number
}

export const ExampleCodebox = (props: Props): JSX.Element => {
  const { code, setCode } = props
  let { rows } = props

  if (!rows) { rows = 10 }

  return (
    <div className="example-codebox">
      <textarea readOnly={true} className="textarea has-fixed-size is-small mb-1" rows={rows}>
        {code}
      </textarea>
      <button className="button is-small" onClick={() => setCode(code)}>Copy to editor</button>
    </div>
  )
}
