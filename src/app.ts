import dotenv from "dotenv"
dotenv.config()

import express from "express"
import morgan from "morgan"
import path from "path"

import normalizePort from "./misc/normalizePort"

// Route imports
import { ERCode } from "./routes/er_code"
import { GetCypherFromER } from "./routes/get_cypher_from_er"
import { Index } from "./routes/index"
import { RunInNeo4j } from "./routes/run_in_neo4j"
import { TestDB } from "./routes/test_db"

// Basic settings
const app: express.Application = express()
const port: number = normalizePort(process.env.PORT || 8000)

// HTTP request logger (can be safely disabled if wanted)
app.use(morgan("tiny"))

// Parses requests to JSON format
app.use(express.json())

// View engine setup
app.set("views", __dirname + "/views")
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "../static")))

// Routes
app.use("/", Index)
app.use("/er-code", ERCode)
app.use("/test-db", TestDB)
app.use("/get-cypher-from-er", GetCypherFromER)
app.use("/run-in-neo4j", RunInNeo4j)

// Set port and start listening to it
app.listen(port, () => console.log(
  `--------------------------------------------------\n` +
  `Application running on http://localhost:${port}\n` +
  `--------------------------------------------------`,
))
