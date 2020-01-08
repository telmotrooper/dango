import dotenv from "dotenv"
dotenv.config()

import Proxy from 'http-proxy-middleware';
import Bundler from 'parcel-bundler';
import { join } from 'path';
import { exec } from 'child_process';

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

const entryFiles = join(__dirname, 'client/index.html');

const bundler = new Bundler(entryFiles, { // more at https://parceljs.org/cli.html#options
  sourceMaps: true,
  outDir: 'build',
  publicUrl: "/app/"
} as Bundler.ParcelOptions);

// app.use(bundler.middleware());

bundler.on('bundled', () => {
  console.log('\n' + bold(`Running application on ` + blue(`http://localhost:${port}`)) + '\n');

  if (process.argv[2] === '--cheap') {
    console.log(yellow('Running without type and lint checking and without source maps to save memory.\n'));
  } else {
    console.log('A type and lint checking report is being generated...\n');
    typeCheck();
    lintCheck();
  }

});

// HTTP request logger (can be safely disabled if wanted)
app.use(morgan("tiny"))

// Parses requests to JSON format
app.use(express.json())

// View engine setup
app.set("views", __dirname + "/views")
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "../static")))

// Routes
app.use("/app", Index)
app.use("/er-code", ERCode)
app.use("/test-db", TestDB)
app.use("/get-cypher-from-er", GetCypherFromER)
app.use("/run-in-neo4j", RunInNeo4j)
app.use("/", bundler.middleware())

// Set port and start listening to it
app.listen(port)

const typeCheck = () => {
  exec('npm run type-check', (error, stdout, stderr) => {
    const output = stdout.split('\n');

    if (output.length > 5) {  // 5 lines = output with no errors found
      console.log('\n' + red(bold((output.length - 5) + ' type error(s) found:') + '\n'));

      for (let i = 4; i < output.length; i++) {
        console.log(red(output[i]) + '\n');
      }
    } else {
      console.log('\n' + green(bold('No type errors found.')) + '\n');
    }

  });
};

const lintCheck = () => {
  exec('npm run lint', (error, stdout, stderr) => {
    const output = stdout.split('\n');

    if (output.length > 5) {  // 5 lines = output with no errors found
      console.log('\n' + red(bold((output.length - 7) + ' lint error(s) found:') + '\n'));

      for (let i = 5; i < output.length - 2; i++) { // "- 2" because the two last lines are always empty
        console.log(red(output[i]) + '\n');
      }
    } else {
      console.log('\n' + green(bold('No lint errors found.')) + '\n');
    }

  });
};

// ANSI escape codes for formatting in the terminal
const bold   = (str: string) => '\u001b[1m'  + str + '\u001b[22m';
const red    = (str: string) => '\u001b[31m' + str + '\u001b[0m';
const green  = (str: string) => '\u001b[32m' + str + '\u001b[0m';
const blue   = (str: string) => '\u001b[34m' + str + '\u001b[0m';
const yellow = (str: string) => '\u001b[33m' + str + '\u001b[0m';
