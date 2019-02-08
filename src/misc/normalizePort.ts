const normalizePort = (val: any) => {
  const port = parseInt(val, 10)

  if (isNaN(port)) { return val }

  return port
}

export default normalizePort
