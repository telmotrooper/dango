import neo4j from "neo4j-driver"

const { DB_HOST, DB_USER, DB_PASS } = process.env

const driver = neo4j.driver(DB_HOST, neo4j.auth.basic(DB_USER, DB_PASS))

// console.log(
//   "DB_HOST: " + DB_HOST + "\n" +
//   "DB_USER: " + DB_USER + "\n" +
//   "DB_PASS: " + DB_PASS,
// )

export { driver }
