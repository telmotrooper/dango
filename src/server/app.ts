import dotenv from "dotenv"
dotenv.config()
import Bundler from "parcel-bundler"
import { join } from "path"
import express from "express"
import morgan from "morgan"

import { normalizePort } from "./misc/normalizePort"
import { ERCode } from "./routes/erCode"
import { GetCypherFromER } from "./routes/getCypherFromER"
import { RunInNeo4j } from "./routes/runInNeo4j"
import { bold, blue } from "./misc/consoleUtils"
import { typeCheck, lintCheck } from "./misc/codeChecks"
import { TestConn } from "./routes/testConn"

// Basic settings
const app: express.Application = express()
const port: number = normalizePort(process.env.PORT || 8000)

const entryFiles = join(__dirname, '../client/index.html');

const bundler = new Bundler(entryFiles, { // more at https://parceljs.org/cli.html#options
  sourceMaps: true,
  outDir: 'build'
} as Bundler.ParcelOptions);

bundler.on('bundled', () => {
  console.log('\n' + bold(`Running application on ` + blue(`http://localhost:${port}`)) + '\n');
  console.log(blue('A type and lint checking report is being generated...\n'));
  typeCheck();
  lintCheck();
});

// HTTP request logger (can be safely disabled if wanted)
app.use(morgan("tiny"))

// Parses requests to JSON format
app.use(express.json())

// View engine setup
// app.set("views", __dirname + "/views")
// app.set("view engine", "ejs")
// app.use(express.static(path.join(__dirname, "../../static")))

// Routes
app.use("/api/er-code", ERCode)
app.use("/api/get-cypher-from-er", GetCypherFromER)
app.use("/api/run-in-neo4j", RunInNeo4j)
app.use("/api/test-conn", TestConn)
app.use("/", bundler.middleware())

// Set port and start listening to it
app.listen(port)
