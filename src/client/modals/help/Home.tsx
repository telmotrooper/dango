import React, { Fragment } from "react"
import { Link } from "react-router-dom"

import logo from "../../assets/dango.png"
import { helpRoutes } from "./helpRoutes"

export const Home = (): JSX.Element => (
  <Fragment>
    <img src={logo} className="center logo mb-1" />
    <p className="paragraph">
      <b>Dango</b> is a graph database modeling tool which allows you to write a schema for a Neo4j database by writing an Entity-Relationship diagram.
    </p>
    <p className="paragraph">
      The schema generated is composed of <a target="_blank" rel="noreferrer" href="https://neo4j.com/docs/cypher-manual/current/administration/constraints/">Neo4j constraints</a> and <a target="_blank" rel="noreferrer" href="https://neo4j.com/docs/labs/apoc/current/background-operations/triggers/">APOC triggers</a>, which force the nodes and relationships in the database to behave as modeled.
    </p>
    <p><b>Concepts:</b></p>
    <ul>
      <li><Link to={helpRoutes.selfRelationships}>Self-relationship</Link></li>
      <li><Link to={helpRoutes.specializations}>Specializations</Link></li>
    </ul>
    <p>
    </p>
  </Fragment>
)
