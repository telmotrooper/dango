import { expectedResult as jsonObject } from "../routes/erToJSON.test"
import { erToCypher } from "./erToCypher"

test("Example EER diagram generates correct JSON representation", () => {
  const eerDiagram = JSON.stringify(jsonObject)
  const schema = erToCypher(eerDiagram)

  expect(schema).toEqual(expectedResult)
})

const expectedResult = 
`/* Strict mode */

CALL apoc.trigger.add('Strict mode (nodes)', 'CALL apoc.periodic.submit("Strict mode (nodes)", \\'
    MATCH (n) WHERE
        NOT "Bibliotecarios" IN LABELS(n) AND
        NOT "Estagiarios" IN LABELS(n) AND
        NOT "Efetivos" IN LABELS(n) AND
        NOT "InstituicoesEnsino" IN LABELS(n) AND
        NOT "Exemplares" IN LABELS(n) AND
        NOT "Clientes" IN LABELS(n) AND
        NOT "Livros" IN LABELS(n) AND
        NOT "Autores" IN LABELS(n) AND
        NOT "Editoras" IN LABELS(n) AND
        NOT "CursosRelevantes" IN LABELS(n) AND
        NOT "Clientes_Endereco" IN LABELS(n) AND
        NOT "Emprestimo" IN LABELS(n) AND
        NOT "contrato_de_estagio" IN LABELS(n) 
    DETACH DELETE n
\\')', {phase: 'after'});

CALL apoc.trigger.add('Strict mode (relationships)', 'CALL apoc.periodic.submit("Strict mode (relationships)", \\'
    MATCH ()-[r]-() WHERE
        TYPE(r) <> "oferta" AND
        TYPE(r) <> "responsabilidade" AND
        TYPE(r) <> "vinculo" AND
        TYPE(r) <> "cadastro" AND
        TYPE(r) <> "disponibilidade" AND
        TYPE(r) <> "publicacao" AND
        TYPE(r) <> "autoria" AND
        TYPE(r) <> "has_clientes_endereco" AND
        TYPE(r) <> "associated_to_emprestimo" AND
        TYPE(r) <> "connected_to_contrato_de_estagio" AND
        TYPE(r) <> "indicado_por" AND
        TYPE(r) <> "indicou" 
    DETACH DELETE r
\\')', {phase: 'after'});

/* Constraints */

CREATE CONSTRAINT ON (b:Bibliotecarios) ASSERT exists(b.CPF);
CREATE CONSTRAINT ON (b:Bibliotecarios) ASSERT exists(b.Nome);
CREATE CONSTRAINT ON (b:Bibliotecarios) ASSERT exists(b.Salario);
CREATE CONSTRAINT ON (b:Bibliotecarios) ASSERT (b.CPF) IS UNIQUE;
CREATE CONSTRAINT ON (e:Efetivos) ASSERT exists(e.DataAdmissao);
CREATE CONSTRAINT ON (i:InstituicoesEnsino) ASSERT exists(i.CNPJ);
CREATE CONSTRAINT ON (i:InstituicoesEnsino) ASSERT exists(i.Nome);
CREATE CONSTRAINT ON (i:InstituicoesEnsino) ASSERT (i.CNPJ) IS UNIQUE;
CREATE CONSTRAINT ON (e:Exemplares) ASSERT exists(e.Numero);
CREATE CONSTRAINT ON (e:Exemplares) ASSERT exists(e.EstadoConservacao);
CREATE CONSTRAINT ON (e:Exemplares) ASSERT (e.Numero) IS UNIQUE;
CREATE CONSTRAINT ON (c:Clientes) ASSERT exists(c.ID);
CREATE CONSTRAINT ON (c:Clientes) ASSERT exists(c.Nome);
CREATE CONSTRAINT ON (c:Clientes) ASSERT (c.ID) IS UNIQUE;
CREATE CONSTRAINT ON (c:Clientes_Endereco) ASSERT exists(c.CEP);
CREATE CONSTRAINT ON (c:Clientes_Endereco) ASSERT exists(c.Rua);
CREATE CONSTRAINT ON (c:Clientes_Endereco) ASSERT exists(c.Numero);
CREATE CONSTRAINT ON (c:Clientes_Endereco) ASSERT exists(c.Complemento);
CREATE CONSTRAINT ON (l:Livros) ASSERT exists(l.ISBN);
CREATE CONSTRAINT ON (l:Livros) ASSERT exists(l.Titulo);
CREATE CONSTRAINT ON (l:Livros) ASSERT exists(l.Volume);
CREATE CONSTRAINT ON (l:Livros) ASSERT exists(l.Ano);
CREATE CONSTRAINT ON (l:Livros) ASSERT exists(l.NumeroDePaginas);
CREATE CONSTRAINT ON (l:Livros) ASSERT (l.ISBN) IS UNIQUE;
CREATE CONSTRAINT ON (a:Autores) ASSERT exists(a.CPF);
CREATE CONSTRAINT ON (a:Autores) ASSERT exists(a.Nome);
CREATE CONSTRAINT ON (a:Autores) ASSERT (a.CPF) IS UNIQUE;
CREATE CONSTRAINT ON (e:Editoras) ASSERT exists(e.CNPJ);
CREATE CONSTRAINT ON (e:Editoras) ASSERT exists(e.Nome);
CREATE CONSTRAINT ON (e:Editoras) ASSERT (e.CNPJ) IS UNIQUE;
CREATE CONSTRAINT ON (c:CursosRelevantes) ASSERT exists(c.Nome);
CREATE CONSTRAINT ON ()-[r:responsabilidade]-() ASSERT exists(r.DataInicio);
CREATE CONSTRAINT ON ()-[a:autoria]-() ASSERT exists(a.Ordem);
CREATE CONSTRAINT ON (c:contrato_de_estagio) ASSERT exists(c.DataInicio);
CREATE CONSTRAINT ON (c:contrato_de_estagio) ASSERT exists(c.Salario);
CREATE CONSTRAINT ON (e:Emprestimo) ASSERT exists(e.DataRetirada);
CREATE CONSTRAINT ON (e:Emprestimo) ASSERT exists(e.DataPrevistaDevolucao);
CREATE CONSTRAINT ON (e:Emprestimo) ASSERT exists(e.ValorMulta);

/* Multivalued attributes */

CALL apoc.trigger.add('Clientes telefone multivalued', 'CALL apoc.periodic.submit("Clientes telefone multivalued", \\'
    MATCH (n:Clientes) WHERE
        size(n.Telefone) < 1 OR
        size(n.Telefone) > 2
    DETACH DELETE n
\\')', {phase: 'after'});

/* Specializations */

CALL apoc.trigger.add('Bibliotecarios children', 'CALL apoc.periodic.submit("Bibliotecarios children", \\'
    MATCH (n) WHERE
        ("Estagiarios" IN LABELS(n) OR
        "Efetivos" IN LABELS(n)) AND
        NOT "Bibliotecarios" IN LABELS(n)
    DETACH DELETE n
\\')', {phase: 'after'});

CALL apoc.trigger.add('Bibliotecarios disjointness', 'CALL apoc.periodic.submit("Bibliotecarios disjointness", \\'
    MATCH (n) WHERE
        ("Estagiarios" IN LABELS(n) AND "Efetivos" IN LABELS(n))
    DETACH DELETE n
\\')', {phase: 'after'});

CALL apoc.trigger.add('Bibliotecarios completeness', 'CALL apoc.periodic.submit("Bibliotecarios completeness", \\'
    MATCH (n:Bibliotecarios) WHERE
        NOT "Estagiarios" IN LABELS(n) AND
        NOT "Efetivos" IN LABELS(n) 
    DETACH DELETE n
\\')', {phase: 'after'});

/* Unions */

CALL apoc.trigger.add('Union filtrosdepesquisa for parent', 'CALL apoc.periodic.submit("Union filtrosdepesquisa for parent", \\'
    MATCH (n:FiltrosDePesquisa) WHERE
        NOT "Autores" IN LABELS(n) AND
        NOT "Livros" IN LABELS(n) AND
        NOT "Editoras" IN LABELS(n) 
    DETACH DELETE n
\\')', {phase: 'after'});

CALL apoc.trigger.add('Union filtrosdepesquisa for children', 'CALL apoc.periodic.submit("Union filtrosdepesquisa for children", \\'
    MATCH (n) WHERE
        NOT n:FiltrosDePesquisa AND
        (n:Autores OR n:Livros OR n:Editoras)
    SET n:FiltrosDePesquisa
\\')', {phase: 'after'});

/* Weak entities */

CALL apoc.trigger.add('Weak entity exemplares in disponibilidade', 'CALL apoc.periodic.submit("Weak entity exemplares in disponibilidade", \\'
    MATCH (n:Exemplares)
        WHERE NOT (:Livros)-[:disponibilidade]-(n)
        DETACH DELETE n
\\')', {phase: 'after'});

/* Relationships (format) */

CALL apoc.trigger.add('Has_clientes_endereco clientes_endereco clientes', 'CALL apoc.periodic.submit("Has_clientes_endereco clientes_endereco clientes", \\'
    MATCH (n)-[r:has_clientes_endereco]-(:Clientes_Endereco) WHERE NOT "Clientes" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Has_clientes_endereco clientes_endereco', 'CALL apoc.periodic.submit("Has_clientes_endereco clientes_endereco", \\'
    MATCH (n)-[r:has_clientes_endereco]-(:Clientes) WHERE NOT "Clientes_Endereco" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Clientes has_clientes_endereco clientes_endereco', 'CALL apoc.periodic.submit("Clientes has_clientes_endereco clientes_endereco", \\'
    MATCH (n)-[r:has_clientes_endereco]-() WHERE NOT "Clientes" IN LABELS(n) AND NOT "Clientes_Endereco" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Oferta cursosrelevantes instituicoesensino', 'CALL apoc.periodic.submit("Oferta cursosrelevantes instituicoesensino", \\'
    MATCH (n)-[r:oferta]-(:CursosRelevantes) WHERE NOT "InstituicoesEnsino" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Oferta cursosrelevantes', 'CALL apoc.periodic.submit("Oferta cursosrelevantes", \\'
    MATCH (n)-[r:oferta]-(:InstituicoesEnsino) WHERE NOT "CursosRelevantes" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Instituicoesensino oferta cursosrelevantes', 'CALL apoc.periodic.submit("Instituicoesensino oferta cursosrelevantes", \\'
    MATCH (n)-[r:oferta]-() WHERE NOT "InstituicoesEnsino" IN LABELS(n) AND NOT "CursosRelevantes" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Responsabilidade estagiarios efetivos', 'CALL apoc.periodic.submit("Responsabilidade estagiarios efetivos", \\'
    MATCH (n)-[r:responsabilidade]-(:Estagiarios) WHERE NOT "Efetivos" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Responsabilidade estagiarios', 'CALL apoc.periodic.submit("Responsabilidade estagiarios", \\'
    MATCH (n)-[r:responsabilidade]-(:Efetivos) WHERE NOT "Estagiarios" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Efetivos responsabilidade estagiarios', 'CALL apoc.periodic.submit("Efetivos responsabilidade estagiarios", \\'
    MATCH (n)-[r:responsabilidade]-() WHERE NOT "Efetivos" IN LABELS(n) AND NOT "Estagiarios" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Vinculo instituicoesensino estagiarios', 'CALL apoc.periodic.submit("Vinculo instituicoesensino estagiarios", \\'
    MATCH (n)-[r:vinculo]-(:InstituicoesEnsino) WHERE NOT "Estagiarios" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Vinculo instituicoesensino', 'CALL apoc.periodic.submit("Vinculo instituicoesensino", \\'
    MATCH (n)-[r:vinculo]-(:Estagiarios) WHERE NOT "InstituicoesEnsino" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Estagiarios vinculo instituicoesensino', 'CALL apoc.periodic.submit("Estagiarios vinculo instituicoesensino", \\'
    MATCH (n)-[r:vinculo]-() WHERE NOT "Estagiarios" IN LABELS(n) AND NOT "InstituicoesEnsino" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Cadastro emprestimo bibliotecarios', 'CALL apoc.periodic.submit("Cadastro emprestimo bibliotecarios", \\'
    MATCH (n)-[r:cadastro]-(:Emprestimo) WHERE NOT "Bibliotecarios" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Cadastro emprestimo', 'CALL apoc.periodic.submit("Cadastro emprestimo", \\'
    MATCH (n)-[r:cadastro]-(:Bibliotecarios) WHERE NOT "Emprestimo" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Bibliotecarios cadastro emprestimo', 'CALL apoc.periodic.submit("Bibliotecarios cadastro emprestimo", \\'
    MATCH (n)-[r:cadastro]-() WHERE NOT "Bibliotecarios" IN LABELS(n) AND NOT "Emprestimo" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Disponibilidade exemplares livros', 'CALL apoc.periodic.submit("Disponibilidade exemplares livros", \\'
    MATCH (n)-[r:disponibilidade]-(:Exemplares) WHERE NOT "Livros" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Disponibilidade exemplares', 'CALL apoc.periodic.submit("Disponibilidade exemplares", \\'
    MATCH (n)-[r:disponibilidade]-(:Livros) WHERE NOT "Exemplares" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Livros disponibilidade exemplares', 'CALL apoc.periodic.submit("Livros disponibilidade exemplares", \\'
    MATCH (n)-[r:disponibilidade]-() WHERE NOT "Livros" IN LABELS(n) AND NOT "Exemplares" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Publicacao livros editoras', 'CALL apoc.periodic.submit("Publicacao livros editoras", \\'
    MATCH (n)-[r:publicacao]-(:Livros) WHERE NOT "Editoras" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Publicacao livros', 'CALL apoc.periodic.submit("Publicacao livros", \\'
    MATCH (n)-[r:publicacao]-(:Editoras) WHERE NOT "Livros" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Editoras publicacao livros', 'CALL apoc.periodic.submit("Editoras publicacao livros", \\'
    MATCH (n)-[r:publicacao]-() WHERE NOT "Editoras" IN LABELS(n) AND NOT "Livros" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Autoria autores livros', 'CALL apoc.periodic.submit("Autoria autores livros", \\'
    MATCH (n)-[r:autoria]-(:Autores) WHERE NOT "Livros" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Autoria autores', 'CALL apoc.periodic.submit("Autoria autores", \\'
    MATCH (n)-[r:autoria]-(:Livros) WHERE NOT "Autores" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Livros autoria autores', 'CALL apoc.periodic.submit("Livros autoria autores", \\'
    MATCH (n)-[r:autoria]-() WHERE NOT "Livros" IN LABELS(n) AND NOT "Autores" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Clientes indicado_por clientes', 'CALL apoc.periodic.submit("Clientes indicado_por clientes", \\'
    MATCH (n)-[r:indicado_por]-() WHERE NOT "Clientes" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Clientes indicou clientes', 'CALL apoc.periodic.submit("Clientes indicou clientes", \\'
    MATCH (n)-[r:indicou]-() WHERE NOT "Clientes" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Connected_to_contrato_de_estagio instituicoesensino contrato_de_estagio', 'CALL apoc.periodic.submit("Connected_to_contrato_de_estagio instituicoesensino contrato_de_estagio", \\'
    MATCH (n)-[r:connected_to_contrato_de_estagio]-(:InstituicoesEnsino) WHERE NOT "contrato_de_estagio" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Connected_to_contrato_de_estagio estagiarios contrato_de_estagio', 'CALL apoc.periodic.submit("Connected_to_contrato_de_estagio estagiarios contrato_de_estagio", \\'
    MATCH (n)-[r:connected_to_contrato_de_estagio]-(:Estagiarios) WHERE NOT "contrato_de_estagio" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Connected_to_contrato_de_estagio efetivos contrato_de_estagio', 'CALL apoc.periodic.submit("Connected_to_contrato_de_estagio efetivos contrato_de_estagio", \\'
    MATCH (n)-[r:connected_to_contrato_de_estagio]-(:Efetivos) WHERE NOT "contrato_de_estagio" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Contrato_de_estagio associations', 'CALL apoc.periodic.submit("Contrato_de_estagio associations", \\'
    MATCH (n)-[r:connected_to_contrato_de_estagio]-(:contrato_de_estagio) WHERE 
        NOT n:\`InstituicoesEnsino\` AND
        NOT n:\`Estagiarios\` AND
        NOT n:\`Efetivos\` 
    DETACH DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Associated_to_emprestimo exemplares emprestimo', 'CALL apoc.periodic.submit("Associated_to_emprestimo exemplares emprestimo", \\'
    MATCH (n)-[r:associated_to_emprestimo]-(:Exemplares) WHERE NOT "Emprestimo" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Associated_to_emprestimo clientes emprestimo', 'CALL apoc.periodic.submit("Associated_to_emprestimo clientes emprestimo", \\'
    MATCH (n)-[r:associated_to_emprestimo]-(:Clientes) WHERE NOT "Emprestimo" IN LABELS(n) DELETE r
\\')', {phase: 'after'});

CALL apoc.trigger.add('Emprestimo associations', 'CALL apoc.periodic.submit("Emprestimo associations", \\'
    MATCH (n)-[r:associated_to_emprestimo]-(:emprestimo) WHERE 
        NOT n:\`Exemplares\` AND
        NOT n:\`Clientes\` 
    DETACH DELETE r
\\')', {phase: 'after'});

/* Relationships (cardinalities) */

CALL apoc.trigger.add('Clientes_endereco has_clientes_endereco less than 1 clientes', 'CALL apoc.periodic.submit("Clientes_endereco has_clientes_endereco less than 1 clientes", \\'
    MATCH (n:Clientes_Endereco) WHERE NOT (:Clientes)-[:has_clientes_endereco]-(n) DETACH DELETE n
\\')', {phase: 'after'});

CALL apoc.trigger.add('Clientes_endereco has_clientes_endereco more than 1 clientes', 'CALL apoc.periodic.submit("Clientes_endereco has_clientes_endereco more than 1 clientes", \\'
    MATCH (n:Clientes_Endereco)-[r:has_clientes_endereco]-(:Clientes) 
      WITH n, COLLECT(r) AS rs
      WHERE SIZE(rs) > 1
      FOREACH (r IN rs[1..] | DELETE r)
\\')', {phase: 'after'});

CALL apoc.trigger.add('Clientes has_clientes_endereco less than 1 clientes_endereco', 'CALL apoc.periodic.submit("Clientes has_clientes_endereco less than 1 clientes_endereco", \\'
    MATCH (n:Clientes) WHERE NOT (:Clientes_Endereco)-[:has_clientes_endereco]-(n) DETACH DELETE n
\\')', {phase: 'after'});

CALL apoc.trigger.add('Clientes has_clientes_endereco more than 1 clientes_endereco', 'CALL apoc.periodic.submit("Clientes has_clientes_endereco more than 1 clientes_endereco", \\'
    MATCH (n:Clientes)-[r:has_clientes_endereco]-(:Clientes_Endereco) 
      WITH n, COLLECT(r) AS rs
      WHERE SIZE(rs) > 1
      FOREACH (r IN rs[1..] | DELETE r)
\\')', {phase: 'after'});

CALL apoc.trigger.add('Cursosrelevantes oferta more than 1 instituicoesensino', 'CALL apoc.periodic.submit("Cursosrelevantes oferta more than 1 instituicoesensino", \\'
    MATCH (n:CursosRelevantes)-[r:oferta]-(:InstituicoesEnsino) 
      WITH n, COLLECT(r) AS rs
      WHERE SIZE(rs) > 1
      FOREACH (r IN rs[1..] | DELETE r)
\\')', {phase: 'after'});

CALL apoc.trigger.add('Instituicoesensino oferta less than 2 cursosrelevantes', 'CALL apoc.periodic.submit("Instituicoesensino oferta less than 2 cursosrelevantes", \\'
    MATCH (n:InstituicoesEnsino)-[r:oferta]-(:CursosRelevantes) 
        WITH n, COLLECT(r) AS rs
        WHERE SIZE(rs) < 2
        FOREACH (r IN rs | DELETE r)
\\')', {phase: 'after'});

CALL apoc.trigger.add('Instituicoesensino oferta more than 10 cursosrelevantes', 'CALL apoc.periodic.submit("Instituicoesensino oferta more than 10 cursosrelevantes", \\'
    MATCH (n:InstituicoesEnsino)-[r:oferta]-(:CursosRelevantes) 
      WITH n, COLLECT(r) AS rs
      WHERE SIZE(rs) > 10
      FOREACH (r IN rs[10..] | DELETE r)
\\')', {phase: 'after'});

CALL apoc.trigger.add('Estagiarios responsabilidade more than 1 efetivos', 'CALL apoc.periodic.submit("Estagiarios responsabilidade more than 1 efetivos", \\'
    MATCH (n:Estagiarios)-[r:responsabilidade]-(:Efetivos) 
      WITH n, COLLECT(r) AS rs
      WHERE SIZE(rs) > 1
      FOREACH (r IN rs[1..] | DELETE r)
\\')', {phase: 'after'});

CALL apoc.trigger.add('Estagiarios vinculo more than 1 instituicoesensino', 'CALL apoc.periodic.submit("Estagiarios vinculo more than 1 instituicoesensino", \\'
    MATCH (n:Estagiarios)-[r:vinculo]-(:InstituicoesEnsino) 
      WITH n, COLLECT(r) AS rs
      WHERE SIZE(rs) > 1
      FOREACH (r IN rs[1..] | DELETE r)
\\')', {phase: 'after'});

CALL apoc.trigger.add('Emprestimo cadastro more than 1 bibliotecarios', 'CALL apoc.periodic.submit("Emprestimo cadastro more than 1 bibliotecarios", \\'
    MATCH (n:Emprestimo)-[r:cadastro]-(:Bibliotecarios) 
      WITH n, COLLECT(r) AS rs
      WHERE SIZE(rs) > 1
      FOREACH (r IN rs[1..] | DELETE r)
\\')', {phase: 'after'});

CALL apoc.trigger.add('Exemplares disponibilidade more than 1 livros', 'CALL apoc.periodic.submit("Exemplares disponibilidade more than 1 livros", \\'
    MATCH (n:Exemplares)-[r:disponibilidade]-(:Livros) 
      WITH n, COLLECT(r) AS rs
      WHERE SIZE(rs) > 1
      FOREACH (r IN rs[1..] | DELETE r)
\\')', {phase: 'after'});

CALL apoc.trigger.add('Livros publicacao more than 1 editoras', 'CALL apoc.periodic.submit("Livros publicacao more than 1 editoras", \\'
    MATCH (n:Livros)-[r:publicacao]-(:Editoras) 
      WITH n, COLLECT(r) AS rs
      WHERE SIZE(rs) > 1
      FOREACH (r IN rs[1..] | DELETE r)
\\')', {phase: 'after'});

CALL apoc.trigger.add('Clientes indicado_por more than 1 clientes', 'CALL apoc.periodic.submit("Clientes indicado_por more than 1 clientes", \\'
    MATCH (n:Clientes)-[r:indicado_por]->(:Clientes) 
      WITH n, COLLECT(r) AS rs
      WHERE SIZE(rs) > 1
      FOREACH (r IN rs[1..] | DELETE r)
\\')', {phase: 'after'});

CALL apoc.trigger.add('Contrato_de_estagio connected_to_contrato_de_estagio less than 1 instituicoesensino', 'CALL apoc.periodic.submit("Contrato_de_estagio connected_to_contrato_de_estagio less than 1 instituicoesensino", \\'
    MATCH (n:contrato_de_estagio) WHERE NOT (:InstituicoesEnsino)-[:connected_to_contrato_de_estagio]-(n) DETACH DELETE n
\\')', {phase: 'after'});

CALL apoc.trigger.add('Contrato_de_estagio connected_to_contrato_de_estagio more than 1 instituicoesensino', 'CALL apoc.periodic.submit("Contrato_de_estagio connected_to_contrato_de_estagio more than 1 instituicoesensino", \\'
    MATCH (n:contrato_de_estagio)-[r:connected_to_contrato_de_estagio]-(:InstituicoesEnsino) 
      WITH n, COLLECT(r) AS rs
      WHERE SIZE(rs) > 1
      FOREACH (r IN rs[1..] | DELETE r)
\\')', {phase: 'after'});

CALL apoc.trigger.add('Contrato_de_estagio connected_to_contrato_de_estagio less than 1 estagiarios', 'CALL apoc.periodic.submit("Contrato_de_estagio connected_to_contrato_de_estagio less than 1 estagiarios", \\'
    MATCH (n:contrato_de_estagio) WHERE NOT (:Estagiarios)-[:connected_to_contrato_de_estagio]-(n) DETACH DELETE n
\\')', {phase: 'after'});

CALL apoc.trigger.add('Contrato_de_estagio connected_to_contrato_de_estagio less than 1 efetivos', 'CALL apoc.periodic.submit("Contrato_de_estagio connected_to_contrato_de_estagio less than 1 efetivos", \\'
    MATCH (n:contrato_de_estagio) WHERE NOT (:Efetivos)-[:connected_to_contrato_de_estagio]-(n) DETACH DELETE n
\\')', {phase: 'after'});

CALL apoc.trigger.add('Contrato_de_estagio connected_to_contrato_de_estagio more than 1 efetivos', 'CALL apoc.periodic.submit("Contrato_de_estagio connected_to_contrato_de_estagio more than 1 efetivos", \\'
    MATCH (n:contrato_de_estagio)-[r:connected_to_contrato_de_estagio]-(:Efetivos) 
      WITH n, COLLECT(r) AS rs
      WHERE SIZE(rs) > 1
      FOREACH (r IN rs[1..] | DELETE r)
\\')', {phase: 'after'});

CALL apoc.trigger.add('Emprestimo associated_to_emprestimo more than 1 clientes', 'CALL apoc.periodic.submit("Emprestimo associated_to_emprestimo more than 1 clientes", \\'
    MATCH (n:Emprestimo)-[r:associated_to_emprestimo]-(:Clientes) 
      WITH n, COLLECT(r) AS rs
      WHERE SIZE(rs) > 1
      FOREACH (r IN rs[1..] | DELETE r)
\\')', {phase: 'after'});

`
