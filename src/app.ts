import dotenv from "dotenv"
dotenv.config()

import express from "express"
import morgan from "morgan"
import path from "path"

import normalizePort from "./misc/normalizePort"

// Route imports
import { Code } from "./routes/code"
import { Index } from "./routes/index"
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
app.use("/code", Code)
app.use("/testdb", TestDB)

// Set port and start listening to it
app.listen(port, () => console.log(
  `--------------------------------------------------\n` +
  `Application running on http://localhost:${port}\n` +
  `--------------------------------------------------`,
))
