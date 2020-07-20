import React, { Fragment } from "react"
import { Link } from "react-router-dom"

import logo from "../../assets/dango.png"
import { helpRoutes } from "./helpRoutes"

export const Home = (): JSX.Element => (
  <Fragment>
    <img className="logo" src={logo} />

    <p>
      <b>Dango</b> is a graph database modeling tool which allows you to write a schema for a Neo4j database by writing an Entity-Relationship diagram.
    </p>

    <p>
      The schema generated is composed of <a target="_blank" rel="noreferrer" href="https://neo4j.com/docs/cypher-manual/current/administration/constraints/">Neo4j constraints</a> and <a target="_blank" rel="noreferrer" href="https://neo4j.com/docs/labs/apoc/current/background-operations/triggers/">APOC triggers</a>, which force the nodes and relationships in the database to behave as modeled.
    </p>

    <h6>Concepts:</h6>

    <ul>
      <li><Link to={helpRoutes.compositeAttributes}>Composite attributes (TODO)</Link></li>
      <li><Link to={helpRoutes.relationships}>Relationships</Link></li>
      <li><Link to={helpRoutes.selfRelationships}>Self-relationships</Link></li>
      <li><Link to={helpRoutes.specializations}>Specializations</Link></li>
    </ul>
  </Fragment>
)
