export const normalizePort = (val: string | number): number => {
  const port = parseInt(val as string, 10)

  if (isNaN(port)) {
    return val as number
  }

  return port
}
