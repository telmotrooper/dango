let cardinalitiesCounter = 0

const getRotatingCardinalities = (): string => {
  switch (cardinalitiesCounter) {
    case 0: // one-to-one
      cardinalitiesCounter++
      return "(1,1)"
    case 1: // one-to-many
      cardinalitiesCounter++
      return "(1,n)"
    case 2: // many-to-many
      cardinalitiesCounter = 0
      return "(2,5)"
    default:
      return "ERROR"
  }
}

const generateTestModeling = (n: number, current = 1): string => {

  let template = `
ent Ent${current} {
  a
  b
  c
}

ent Ent${current+1} {
  a
  b
  c
}

rel Rel${current} {
  Ent${current} ${getRotatingCardinalities()}
  Ent${current+1}  ${getRotatingCardinalities()}
  x
  y
  z
}

rel Rel${current+1} {
  Ent${current+1} ${getRotatingCardinalities()}
  Ent${current} ${getRotatingCardinalities()}
  x
  y
  z
}
  `

  if (current < n-1) {
    template += generateTestModeling(n, current+2)
  }

  return template
}

// Must be pair
const iterations = process.argv[2] as unknown as number ?? 6

console.log(generateTestModeling(iterations))
