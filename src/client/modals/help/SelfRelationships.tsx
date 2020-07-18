import React from "react"
import { Link } from "react-router-dom"

import { selfRelationshipsSameCardinalities, selfRelationshipsDifferentCardinalities } from "../../utils/erExamples"
import { ExampleCodebox } from "./ExampleCodebox"
import { helpRoutes } from "./helpRoutes"

interface Props {
  setCode: (code: string) => void;
}

export const SelfRelationships = (props: Props): JSX.Element => (
  <div>
    <p className="paragraph">
      <b>Self-relationships</b> are relationships on which an entity connects to itself.
    </p>
    <p>Example 1 - Same cardinalities:</p>
    <ExampleCodebox code={selfRelationshipsSameCardinalities} setCode={props.setCode} rows={6} />
    <p className="paragraph text-after-codebox">
      Self-relationships with the same cardinalities allow us to write valid rules, since we only have one lower limit and one upper limit for each entity.
    </p>

    <p>Example 2 - Different cardinalities:</p>
    <ExampleCodebox code={selfRelationshipsDifferentCardinalities} setCode={props.setCode} rows={6} />
    <p className="paragraph text-after-codebox">
      Self-relationships with different cardinalities do not provide enough information to infer which entity should have which cardinalities,
      in such a situation we recommend writing a <Link to={helpRoutes.specializations}>Specialization</Link> for each node.
    </p>

  </div>
)
