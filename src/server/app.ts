import dotenv from "dotenv"
dotenv.config()
import Bundler from "parcel-bundler"
import { join } from "path"
import express from "express"
import morgan from "morgan"

import { normalizePort } from "./misc/normalizePort"
import { erToJSON } from "./routes/erToJSON"
import { jsonToCypher } from "./routes/jsonToCypher"
import { bold, blue } from "./misc/consoleUtils"
import { typeCheck, lintCheck } from "./misc/codeChecks"

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

// Routes
app.use("/api/er-to-json", erToJSON)
app.use("/api/json-to-cypher", jsonToCypher)
app.use("/", bundler.middleware())

// Set port and start listening to it
app.listen(port)
