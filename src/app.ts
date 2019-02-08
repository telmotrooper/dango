import express from "express"
import morgan from "morgan"

import normalizePort from "./misc/normalizePort"

// Route imports
import { Index } from "./routes/index"

// Basic settings
const app: express.Application = express()
const port: number = normalizePort(process.env.PORT || 8000)

// HTTP request logger (can be safely disabled if wanted)
app.use(morgan("tiny"))

// View engine setup
app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

// Routes
app.use("/", Index)

// Set port and start listening to it
app.listen(port, () => console.log(
  `--------------------------------------------------\n` +
  `Application running on http://localhost:${port}\n` +
  `--------------------------------------------------`,
))
