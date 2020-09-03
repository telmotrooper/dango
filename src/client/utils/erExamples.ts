export const mainExample = 
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


export const relationshipExample = 
`ent Driver {}

ent Car {}

rel has {
  Driver (0,n)
  Car (0,n)
  since
}`


export const selfRelationshipsSameCardinalities = 
`ent Worker {}

rel management {
  Worker (0,1)
  Worker (0,1)
}`


export const selfRelationshipsDifferentCardinalities = 
`ent Worker {}

rel management {
  Worker (1,1)
  Worker (0,n)
}`


export const specializationsTotalDisjoint = 
`ent Person {}

ent Developer {}

ent Non-Developer {}

spe {
  Person (t,d)
  Developer
  Non-Developer
}`


export const specializationsPartialOverlap = 
`ent Person {}

ent Cyclist {}

ent Engineer {}

spe {
  Person (p,o)
  Cyclist
  Engineer
}`

export const compositeAttributes = 
`ent Employee {
  name
  birthdate
  address [
    number
    street
    suburb
  ]
  salary
}`

export const multivaluedAttributes =
`ent Person {
  name
  languages <1,3>
}`

export const associativeEntities = 
`ent Librarians {}
ent Books {}
ent Customers {}

rel registration {
  Librarians (1,1)
  loan (0,n)
}

aent loan {
  Books (0,n)
  Customers (0,1)
  withdrawal_date
  return_date
}`
