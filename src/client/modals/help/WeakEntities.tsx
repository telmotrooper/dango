import React, { Fragment } from "react"

import { weakEntity } from "../../utils/erExamples"
import { ExampleCodebox } from "./ExampleCodebox"

interface Props {
  setCode: (code: string) => void;
}

export const WeakEntities = (props: Props): JSX.Element => 
  <Fragment>
    <p>
      <b>Weak Entities</b> are entities which depend on the existence of another entity to exist.
    </p>  

    <p>Example:</p>
    <div className="columns">
      <div className="column">
        <ExampleCodebox code={weakEntity} setCode={props.setCode} rows={14} />
      </div>
      <div className="column">
        <p>
          In this example, we define entities "Book" and "Copy", which are connected through a "has" relationship.
          The "w" before the entity name "Copy" in the relationship, defines "Copy" as a weak entity.
          If the "Book" connected to a "Copy" is removed, the "Copy" will be removed as well.
        </p>
      </div>
    </div>
  </Fragment>
