import { exec } from "child_process"

import { red, bold, green } from "./consoleUtils"


export const typeCheck = (): void => {
  exec("npm run type-check", (_error, stdout) => {
    const output = stdout.split("\n")

    if (output.length > 5) {  // 5 lines = output with no errors found
      console.log("\n" + red(bold(output.length - 5 + " type error(s) found:") + "\n"))

      for (let i = 4; i < output.length; i++) {
        if (output[i].substr(0, 4) === "src/") {
          console.log(red(__dirname.substr(0, __dirname.length - 3) + output[i]) + "\n")
        } else {
          console.log(red(output[i]) + "\n")
        }
      }
    } else {
      console.log("\n" + green(bold("No type errors found.")) + "\n")
    }

  })
}

export const lintCheck = (): void => {
  exec("npm run lint-check", (_error, stdout) => {
    const output = stdout.split("\n")

    if (output.length > 5) {  // 5 lines = output with no errors found
      console.log("\n" + red(bold(output.length - 7 + " lint error(s) found:") + "\n"))

      for (let i = 5; i < output.length - 2; i++) { // "- 2" because the two last lines are always empty
        console.log(red(output[i]) + "\n")
      }
    } else {
      console.log("\n" + green(bold("No lint errors found.")) + "\n")
    }

  })
}
