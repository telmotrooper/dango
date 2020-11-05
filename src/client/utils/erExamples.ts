export const mainExample = 
`ent Bibliotecarios {
  CPF *
  Nome
  Salario
}

ent Estagiarios {}

ent Efetivos {
  DataAdmissao
}

ent InstituicoesEnsino {
  CNPJ *
  Nome
}

ent Exemplares {
  Numero *
  EstadoConservacao
}

ent Clientes {
  ID *
  Nome
  Telefone <1,2>
  Endereco [
    CEP
    Rua
    Numero
    Complemento
  ]
}

ent Livros {
  ISBN *
  Titulo
  Volume
  Ano
  NumeroDePaginas
}

ent Autores {
  CPF *
  Nome
}

ent Editoras {
  CNPJ *
  Nome
}

spe {
  Bibliotecarios (t,d)
  Estagiarios
  Efetivos
}

rel responsabilidade {
  Efetivos (1,1)
  Estagiarios (0,n)
  DataInicio
}
  
rel vinculo {
  Estagiarios (0,n)
  InstituicoesEnsino (1,1)
}

rel cadastro {
  Bibliotecarios (1,1)
  Emprestimo (0,n)
}

rel disponibilidade {
  Livros (1,1)
  w Exemplares (1,n)
}

rel publicacao {
  Editoras (1,1)
  Livros (0,n)
}

rel autoria {
  Livros (0,n)
  Autores (1,n)
  Ordem
}

aent Emprestimo {
  Exemplares (0,n)
  Clientes (0,1)
  Efetivos (0,n)
  DataRetirada
  DataPrevistaDevolucao
  ValorMulta
}

rel recomendado_por {
  Clientes (0,n)
  Clientes (0,n)
}

union FiltrosDePesquisa {
  Editoras
  Livros
  Autores
}

rel contrato_de_estagio {
  InstituicoesEnsino (1,1)
  Estagiarios (1,1)
  Efetivos (1,1)
  DataInicio
  Salario
}`


export const relationshipExample = 
`ent Driver {}

ent Car {}

rel has {
  Driver (0,n)
  Car (0,n)
  since
}`

export const nAryRelationshipExample = 
`ent City {}
ent Supplier {}
ent Product {}

rel distribution {
  City (1,n)
  Supplier (1,1)
  Product (1,n)
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

export const union = 
`ent Car {}
ent Truck {}

union Vehicle {
  Car
  Truck
  plate_number
}`

export const weakEntity =
`ent Book {
  isbn *
  title
}

ent Copy {
  id
  acquisition_date
}

rel has {
  Book (1,1)
  w Copy (0,n)
}`
