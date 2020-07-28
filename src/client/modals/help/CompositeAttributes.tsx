import React, { Fragment } from "react"

import { ExampleCodebox } from "./ExampleCodebox"
import { compositeAttributes } from "../../utils/erExamples"

interface Props {
  setCode: (code: string) => void;
}

export const CompositeAttributes = (props: Props): JSX.Element => 
  <Fragment>
    <p>
      <b>Composite Attributes</b> are attributes composed of other attributes.
    </p>

    <p>Example:</p>
    <div className="columns">
      <div className="column">
        <ExampleCodebox code={compositeAttributes} setCode={props.setCode} rows={10} />
      </div>
      <div className="column">
        <p>
          In this example the attribute "address" is a Composite Attribute composed of attributes "number", "street" and "suburb".
        </p>
      </div>
    </div>
  </Fragment>
