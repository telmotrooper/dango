import React, { Fragment } from "react"

import { ExampleCodebox } from "./ExampleCodebox"
import { multivaluedAttributes } from "../../utils/erExamples"

interface Props {
  setCode: (code: string) => void;
}

export const MultivaluedAttributes = (props: Props): JSX.Element => 
  <Fragment>
    <p>
      <b>Multivalued Attributes</b> are attributes which can have more than one value.
    </p>

    <p>Example:</p>
    <div className="columns">
      <div className="column">
        <ExampleCodebox code={multivaluedAttributes} setCode={props.setCode} rows={10} />
      </div>
      <div className="column">
        <p>
          In this example the attribute "languages" is a Multivalued Attribute which can have from 1 to 3 values.
        </p>
      </div>
    </div>
  </Fragment>
