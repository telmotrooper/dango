import React, { Fragment } from "react"

import { ExampleCodebox } from "./ExampleCodebox"
import { associativeEntities } from "../../utils/erExamples"

interface Props {
  setCode: (code: string) => void;
}

export const AssociativeEntities = (props: Props): JSX.Element => 
  <Fragment>
    <p>
      <b>Associative Entities</b> are entities that hold informations about the association between other entities.
    </p>

    <p>Example:</p>
    <div className="columns">
      <div className="column">
        <ExampleCodebox code={associativeEntities} setCode={props.setCode} rows={15} />
      </div>
      <div className="column">
        <p>
          In this example, "loan" is an associative entity which represents a relationship between entities "Librarians", "Books" and "Customers". It also holds the attributes "withdrawal_date" and "return_date".
        </p>
      </div>
    </div>
  </Fragment>
