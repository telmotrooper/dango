export const testExample = 
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

ent CursosRelevantes {
  Nome
}

spe {
  Bibliotecarios (t,d)
  Estagiarios
  Efetivos
}

rel oferta {
  InstituicoesEnsino (1,1)
  CursosRelevantes (2,10)
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
  DataRetirada
  DataPrevistaDevolucao
  ValorMulta
}

rel indicacao {
  Clientes (0,1) indicado_por
  Clientes (0,n) indicou
}

union FiltrosDePesquisa {
  Editoras
  Livros
  Autores
}

rel contrato_de_estagio {
  InstituicoesEnsino (1,1)
  Estagiarios (1,n)
  Efetivos (1,1)
  DataInicio
  Salario
}`
