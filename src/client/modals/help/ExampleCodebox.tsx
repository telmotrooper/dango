import React from "react"

interface Props {
  code: string
}

export const ExampleCodebox = (props: Props): JSX.Element => (
  <textarea className="textarea has-fixed-size is-small mb-1" rows={10}>
    {props.code}
  </textarea>
)
