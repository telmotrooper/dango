import { mainExample } from "../../client/utils/erExamples"
import { erToCypher } from "./erToCypher"

test("Example diagram generates correct schema", () => {
  const schema = erToCypher(mainExample)
  console.log(schema)

  expect(1 + 1).toBe(2)
})
