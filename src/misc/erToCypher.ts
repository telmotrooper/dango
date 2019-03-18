const erToCypher = (er: string) => {
  const erCode = JSON.parse(er)

  return "CREATE CONSTRAINT ON (bibliotecarios:Bibliotecário) ASSERT exists(bibliotecarios.CPF)"
}

export default erToCypher
