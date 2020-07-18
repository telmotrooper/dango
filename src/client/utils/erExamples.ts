export const mainExample = (
`ent Bibliotecários {
  CPF *
  Nome
  Salário
}

ent Estagiários {}

ent Efetivos {
  DataAdmissão
}

ent InstituiçõesEnsino {
  CNPJ *
  Nome
}

ent Exemplares {
  Número *
  EstadoConservação
}

ent Clientes {
  ID
  Nome
}

spe {
  Bibliotecários (t,d)
  Estagiários
  Efetivos
}

rel responsabilidade {
  Efetivos (1,1)
  Estagiários (0,n)
  DataInicio
}

rel vínculo {
  Estagiários (0,n)
  InstituiçõesEnsino (1,1)
}

rel cadastro {
  Bibliotecários (1,1)
  empréstimo (0,n)
}

aent empréstimo {
  Exemplares (0,n)
  Clientes (0,1)
  Efetivos (0,n)
  DataRetirada *
  DataPrevistaDevolução
  ValorMulta
}`
)

export const selfRelationshipSameCardinality = (
`ent Worker {}

rel management {
  Worker (0,1)
  Worker (0,1)
}`
)

export const selfRelationshipDifferentCardinalities = (
`ent Worker {}

rel management {
  Worker (1,1)
  Worker (0,n)
}`
)

export const specializations = (
`TODO`
)
