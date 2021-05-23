import { testExample } from "../../client/utils/testExample"
import { parseERCode } from "../parser/parseERCode"

test("Example EER diagram generates correct JSON representation", () => {
  const intermediateRepresentation = parseERCode(testExample)

  expect(intermediateRepresentation).toEqual(expectedResult)
})

export const expectedResult = {
  "ent": [
    {
      "id": "Bibliotecarios",
      "attributes": [
        "CPF",
        "Nome",
        "Salario"
      ],
      "compositeAttributes": {},
      "multivalued": {},
      "pk": [
        "CPF"
      ]
    },
    {
      "id": "Estagiarios",
      "attributes": [],
      "compositeAttributes": {},
      "multivalued": {},
      "pk": []
    },
    {
      "id": "Efetivos",
      "attributes": [
        "DataAdmissao"
      ],
      "compositeAttributes": {},
      "multivalued": {},
      "pk": []
    },
    {
      "id": "InstituicoesEnsino",
      "attributes": [
        "CNPJ",
        "Nome"
      ],
      "compositeAttributes": {},
      "multivalued": {},
      "pk": [
        "CNPJ"
      ]
    },
    {
      "id": "Exemplares",
      "attributes": [
        "Numero",
        "EstadoConservacao"
      ],
      "compositeAttributes": {},
      "multivalued": {},
      "pk": [
        "Numero"
      ]
    },
    {
      "id": "Clientes",
      "attributes": [
        "ID",
        "Nome"
      ],
      "compositeAttributes": {
        "Endereco": [
          "CEP",
          "Rua",
          "Numero",
          "Complemento"
        ]
      },
      "multivalued": {
        "Telefone": {
          "min": "1",
          "max": "2"
        }
      },
      "pk": [
        "ID"
      ]
    },
    {
      "id": "Livros",
      "attributes": [
        "ISBN",
        "Titulo",
        "Volume",
        "Ano",
        "NumeroDePaginas"
      ],
      "compositeAttributes": {},
      "multivalued": {},
      "pk": [
        "ISBN"
      ]
    },
    {
      "id": "Autores",
      "attributes": [
        "CPF",
        "Nome"
      ],
      "compositeAttributes": {},
      "multivalued": {},
      "pk": [
        "CPF"
      ]
    },
    {
      "id": "Editoras",
      "attributes": [
        "CNPJ",
        "Nome"
      ],
      "compositeAttributes": {},
      "multivalued": {},
      "pk": [
        "CNPJ"
      ]
    },
    {
      "id": "CursosRelevantes",
      "attributes": [
        "Nome"
      ],
      "compositeAttributes": {},
      "multivalued": {},
      "pk": []
    }
  ],
  "rel": [
    {
      "id": "oferta",
      "entities": [
        {
          "id": "InstituicoesEnsino",
          "cardinality": "1,1",
          "weak": false,
          "relName": null
        },
        {
          "id": "CursosRelevantes",
          "cardinality": "2,10",
          "weak": false,
          "relName": null
        }
      ],
      "attributes": [],
      "compositeAttributes": {},
      "multivalued": {},
      "pk": [],
      "hasTimestamp": false
    },
    {
      "id": "responsabilidade",
      "entities": [
        {
          "id": "Efetivos",
          "cardinality": "1,1",
          "weak": false,
          "relName": null
        },
        {
          "id": "Estagiarios",
          "cardinality": "0,n",
          "weak": false,
          "relName": null
        }
      ],
      "attributes": [
        "DataInicio"
      ],
      "compositeAttributes": {},
      "multivalued": {},
      "pk": [],
      "hasTimestamp": false
    },
    {
      "id": "vinculo",
      "entities": [
        {
          "id": "Estagiarios",
          "cardinality": "0,n",
          "weak": false,
          "relName": null
        },
        {
          "id": "InstituicoesEnsino",
          "cardinality": "1,1",
          "weak": false,
          "relName": null
        }
      ],
      "attributes": [],
      "compositeAttributes": {},
      "multivalued": {},
      "pk": [],
      "hasTimestamp": false
    },
    {
      "id": "cadastro",
      "entities": [
        {
          "id": "Bibliotecarios",
          "cardinality": "1,1",
          "weak": false,
          "relName": null
        },
        {
          "id": "Emprestimo",
          "cardinality": "0,n",
          "weak": false,
          "relName": null
        }
      ],
      "attributes": [],
      "compositeAttributes": {},
      "multivalued": {},
      "pk": [],
      "hasTimestamp": false
    },
    {
      "id": "disponibilidade",
      "entities": [
        {
          "id": "Livros",
          "cardinality": "1,1",
          "weak": false,
          "relName": null
        },
        {
          "id": "Exemplares",
          "cardinality": "1,n",
          "weak": true,
          "relName": null
        }
      ],
      "attributes": [],
      "compositeAttributes": {},
      "multivalued": {},
      "pk": [],
      "hasTimestamp": false
    },
    {
      "id": "publicacao",
      "entities": [
        {
          "id": "Editoras",
          "cardinality": "1,1",
          "weak": false,
          "relName": null
        },
        {
          "id": "Livros",
          "cardinality": "0,n",
          "weak": false,
          "relName": null
        }
      ],
      "attributes": [],
      "compositeAttributes": {},
      "multivalued": {},
      "pk": [],
      "hasTimestamp": false
    },
    {
      "id": "autoria",
      "entities": [
        {
          "id": "Livros",
          "cardinality": "0,n",
          "weak": false,
          "relName": null
        },
        {
          "id": "Autores",
          "cardinality": "1,n",
          "weak": false,
          "relName": null
        }
      ],
      "attributes": [
        "Ordem"
      ],
      "compositeAttributes": {},
      "multivalued": {},
      "pk": [],
      "hasTimestamp": false
    },
    {
      "id": "indicacao",
      "entities": [
        {
          "id": "Clientes",
          "cardinality": "0,1",
          "weak": false,
          "relName": "indicado_por"
        },
        {
          "id": "Clientes",
          "cardinality": "0,n",
          "weak": false,
          "relName": "indicou"
        }
      ],
      "attributes": [],
      "compositeAttributes": {},
      "multivalued": {},
      "pk": [],
      "hasTimestamp": false
    },
    {
      "id": "contrato_de_estagio",
      "entities": [
        {
          "id": "InstituicoesEnsino",
          "cardinality": "1,1",
          "weak": false,
          "relName": null
        },
        {
          "id": "Estagiarios",
          "cardinality": "1,n",
          "weak": false,
          "relName": null
        },
        {
          "id": "Efetivos",
          "cardinality": "1,1",
          "weak": false,
          "relName": null
        }
      ],
      "attributes": [
        "DataInicio",
        "Salario"
      ],
      "compositeAttributes": {},
      "multivalued": {},
      "pk": [],
      "hasTimestamp": false
    }
  ],
  "aent": [
    {
      "id": "Emprestimo",
      "entities": [
        {
          "id": "Exemplares",
          "cardinality": "0,n",
          "weak": false,
          "relName": null
        },
        {
          "id": "Clientes",
          "cardinality": "0,1",
          "weak": false,
          "relName": null
        }
      ],
      "attributes": [
        "DataRetirada",
        "DataPrevistaDevolucao",
        "ValorMulta"
      ],
      "compositeAttributes": {},
      "multivalued": {},
      "pk": [],
      "relationships": [
        "cadastro"
      ],
      "hasTimestamp": false
    }
  ],
  "spe": [
    {
      "id": "Bibliotecarios",
      "total": true,
      "disjoint": true,
      "entities": [
        "Estagiarios",
        "Efetivos"
      ]
    }
  ],
  "unions": [
    {
      "id": "FiltrosDePesquisa",
      "entities": [
        "Autores",
        "Livros",
        "Editoras"
      ],
      "attributes": [],
      "compositeAttributes": {},
      "multivalued": {},
      "pk": []
    }
  ]
}
