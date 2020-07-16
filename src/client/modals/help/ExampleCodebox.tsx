import React from "react"

interface Props {
  code: string,
  rows?: number
}

export const ExampleCodebox = (props: Props): JSX.Element => {
  const { code } = props
  let { rows } = props

  if (!rows) { rows = 10 }

  return (<textarea readOnly={true} className="textarea has-fixed-size is-small mb-1" rows={rows}>
    {code}
  </textarea>)
}
