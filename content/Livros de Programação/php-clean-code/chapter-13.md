# 13 - Creating Effective Documentation

## Intro

Estamos convencidos de que a documentação é muito importante para ser abandonada. Se feita corretamente, ela será uma adição valiosa e um bloco de construção importante para escrever código limpo, especialmente ao trabalhar em equipe.

Vamos abordar os seguintes tópicos principais neste capítulo:

+ Why documentation matters
+ Creating documentation
+ Inline documentation

## Why documentation matters

### Why documentation is important

Criamos documentação porque podemos facilitar o trabalho de outras pessoas com nosso software. Trata-se de contexto, que não pode ser facilmente extraído ao ler o código de algumas classes.

**A documentação muitas vezes não se trata apenas do que ou como, mas também do porquê.**

### Developer documentation

Vamos focar na documentação que o auxilia no processo de desenvolvimento e permite que você escreva um código limpo, conforme descrito na seguinte lista não exaustiva:

O que devemos documentar

+ **Guias de administração e configuração:** Além da necessidade óbvia de descrever como instalar e configurar o software, certifique-se de incluir uma seção sobre qualidade de código. Isso deve conter informações sobre quais ferramentas são usadas localmente e como são configuradas.
+ **Documentação da arquitetura do sistema:** Assim que seu projeto se tornar grande o suficiente para que a configuração básica do servidor (geralmente um servidor web e um banco de dados em uma única máquina física) se torne um gargalo, e você começar a dimensioná-lo, deve pensar em documentar também sua infraestrutura. Eventualmente, isso economizará muito tempo para você e para os outros ao procurar os URLs corretos ou acessos ao servidor, especialmente em situações críticas. Pode ser um bom lugar para adicionar informações sobre o pipeline de integração contínua (CI) também.

+ **Documentação da arquitetura do software:** Como seu software é construído internamente? Ele usa eventos para se comunicar entre os módulos? Existem filas que devem ser usadas? Perguntas como essas devem ser respondidas na documentação da arquitetura do software. Isso facilita para outros desenvolvedores seguir os princípios.

+ **Diretrizes de codificação:** Além da documentação da arquitetura do software, as diretrizes de codificação oferecem conselhos sobre como escrever o código. Discutimos esse tópico em profundidade no Capítulo 12, Trabalhando em Equipe.

+ **Documentação da API:** Se sua aplicação PHP tem uma API que é usada por outros desenvolvedores ou até mesmo clientes, você precisa fornecer uma boa visão geral da funcionalidade da API. Isso facilita a vida deles e a sua, pois você terá menos interrupções de pessoas que querem saber como a API funciona. Você também pode fornecer bons exemplos de como criar endpoints adicionais da API.

## Creating documentation

**Textos**

Para projetos pequenos, É recomendável fazer a documentação como uma subpasta do projeto, colocando a documentação num formato fácil de ser lido, como o Markdown. 

**Diagramas**

+ Uma ferramenta versátil é https://www.diagrams.net
+ Existe a linguagem UML que define documentação mais específica
+ Outra ferramenta é o MermaidJS no seguinte link: Mermaid.js (https://mermaid-js.github.io)
+ PlantUML: https://plantuml.com
+ Diagrams-MinGrammer: https://diagrams.mingrammer.com

**Documentando API**

Um formato muito popular é o de OpenAPi pela ferramenta **Swagger** que descreve os aspectos das API, seus end-points usando arquivo YAML (Ain't Markup Language) como  trecho a seguir

````yaml
openapi: 3.0.0
info:
  title: 'Product API'
  version: '0.1'
paths:
  /product:
    get:
      operationId: getProductsUsingAnnotations
      parameters:
        -
          name: limit
          in: query
          description: 'How many products to return'
          required: false
          schema:
            type: integer
      responses:
        '200':
          description: 'Returns the product data'
````

A partir desse pequeno trecho o swagger consegue gerar ruma página que descreve o endpoint e a mesmo pode consumi-lo.

Ao invés de escrever todo o arquivo, você pode usar ferramentas que gerar o swagger, em https://github.com/zircote/swagger-php

Ele vai gerar a documentação de acordo com as Annotation e comentários no método. Infelizmente é necessário criar um comentário muito grande.

**Swagger UI: Swagger UI**

(https://github.com/swagger-api/swagger-ui), que é uma documentação visual e interativa da sua API.

**Alternativas OpenAPI - RAML e API Blueprint**

Existem outros formatos, como a Linguagem de Modelagem de API RESTful (RAML) ([https://raml.org](https://raml.org/)) ou API Blueprint ([https://apiblueprint.org](https://apiblueprint.org/)), que você pode usar, e não temos preferência por nenhuma solução em particular.

## Inline documentation

**DockBlocks**

Anotações em comentários que usam `@`. Tanto IDES quanto outros programa conseguem ler essa anotações e gerar documentação com informação.

Algumas ferramentas de qualidade de código usam anotações para alterar o seu comportamento.

**Useless comments**

Evite comentários inúteis como o a seguir:

````php
// write the string to the log file
file_put_contents($logFileName, $someString)
````
Useless comments

**When commenting is useful**

+ Para evitar confusão: Se você pode antecipar que outros desenvolvedores podem se perguntar por que você escolheu aquela implementação, você deve adicionar mais contexto adicionando um comentário.
+ Ao implementar algoritmos complexos: Mesmo se tentarmos evitá-lo, às vezes temos que escrever código que é difícil de entender, por exemplo, se precisamos implementar um determinado algoritmo ou uma lógica de negócio desconhecida. Nestes casos, um breve comentário pode ser um salva-vidas. 
+ Para fins de referência: Se o seu código implementa alguma lógica que já está explicada em outro lugar, por exemplo, em um wiki ou em um ticket, você pode adicionar um link para a fonte correspondente para facilitar que outros encontrem mais informações sobre isso. Isso deve ser apenas uma exceção e não a regra.

## Summary

Escrever código limpo não é apenas saber como fazê-lo por conta própria, mas também garantir que outros desenvolvedores sigam esse caminho também. Para poder fazer isso, eles precisam conhecer as regras que se aplicam ao projeto.

Neste capítulo, discutimos como criar documentação que possa ajudá-lo a alcançar esse objetivo. Discutimos as melhores práticas para escrever documentação manualmente, bem como a criação de diagramas informativos e ao mesmo tempo mantíveis. Por fim, apresentamos maneiras de gerar documentação a partir do código e elaboramos sobre os prós e contras da documentação embutida.

## Meu Resumo

Documentar:

+ Porque fazer: Facilitar o trabalho de quem pegar o código
+ O que documentar:
  - Configurações
  - Regras de Negócio
  - Arquitetura do Sistema
  - Diretrizes e padrões usados
  - Documentar API

Formas de documentar:

+ Texto: Via Markdown
+ Diagrama: Há as seguintes opções
  - Uma ferramenta versátil é https://www.diagrams.net
  - Existe a linguagem UML que define documentação mais específica
  - Outra ferramenta é o MermaidJS no seguinte link: Mermaid.js (https://mermaid-js.github.io)
  - PlantUML: https://plantuml.com
  - Diagrams-MinGrammer: https://diagrams.mingrammer.com

Quando comentários no código são bons:

+ Quando forem DocBlocks
+ Quando o comentário evita confusão
+ Para descrever algoritmos complexos
+ Para referenciar algum outro link

Documentar API: Através do Swagger

+ Alternativas ao Swagger: Existem outros formatos, como a Linguagem de Modelagem de API RESTful (RAML) ([https://raml.org](https://raml.org/)) ou API Blueprint ([https://apiblueprint.org](https://apiblueprint.org/)), que você pode usar, e não temos preferência por nenhuma solução em particular.

## Further reading

Se você deseja aprender mais sobre o Mermaid.js, recomendamos o livro "The Official Guide to Mermaid.js" de Knut Sveidqvist e Ashish Jain, publicado pela Packt em 2021.


