# # Domain Logic Patterns (cap9)

> **Objetivo:** Como organizar as regras de negócio da aplicação.

|Padrão|Resumo|
|---|---|
|**Transaction Script**|Cada caso de uso é implementado como um procedimento. **Use em sistemas simples**, com pouca lógica de negócio.|
|**Domain Model**|As regras ficam dentro dos objetos de domínio. **Use em sistemas complexos**, onde o negócio possui muitas regras.|
|**Table Module**|Uma classe representa uma tabela inteira e contém suas regras. **Use quando o sistema trabalha naturalmente em cima de tabelas**, e não de objetos ricos.|
|**Service Layer**|Centraliza os casos de uso da aplicação e coordena o domínio. **Use para separar Controllers da lógica de negócio.**|
# # Data Source Architectural Patterns (cap10)

> **Objetivo:** Como acessar o banco de dados.

| Padrão                 | Resumo                                                                                                                              |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Table Data Gateway** | Uma classe acessa diretamente uma tabela. **Use quando deseja encapsular SQL de uma tabela específica.**                            |
| **Row Data Gateway**   | Cada objeto representa uma linha da tabela e sabe persistir a si mesmo. **Use quando cada registro possui comportamento simples.**  |
| **Active Record**      | O objeto contém dados e métodos de persistência. **Ideal para CRUDs e aplicações simples (Laravel Eloquent é o exemplo clássico).** |
| **Data Mapper**        | Separa completamente o domínio da persistência. **Ideal para domínios complexos (Hibernate, Doctrine).**                            |
# Object-Relational Behavioral Patterns (cap11)

> **Objetivo:** Como controlar o ciclo de vida dos objetos persistidos.

|Padrão|Resumo|
|---|---|
|**Unit of Work**|Rastreia alterações dos objetos e grava tudo em uma única operação. **Use quando várias entidades são alteradas em uma mesma transação.**|
|**Identity Map**|Garante que uma mesma linha do banco seja representada por apenas um objeto em memória. **Evita objetos duplicados e consultas repetidas.**|
|**Lazy Load**|Carrega dados apenas quando realmente necessários. **Use para melhorar desempenho quando relações podem não ser utilizadas.**|
# Object-Relational Structural Patterns (cap12)
> **Objetivo:** Como mapear estruturas orientadas a objetos para tabelas relacionais.

| Padrão                         | Resumo                                                                                                                                    |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Identity Field**             | O objeto possui um atributo correspondente à chave primária. **Use sempre que o objeto representar uma linha do banco.**                  |
| **Foreign Key Mapping**        | Representa relacionamentos usando chaves estrangeiras. **Use em associações entre entidades.**                                            |
| **Association Table Mapping**  | Usa tabela intermediária para relacionamentos N:N. **Use em relacionamentos muitos-para-muitos.**                                         |
| **Dependent Mapping**          | Objetos dependentes existem apenas junto ao objeto principal. **Use em composições (Pedido → Itens).**                                    |
| **Embedded Value**             | Objetos de valor são armazenados na mesma tabela da entidade. **Use quando o objeto não possui identidade própria (Endereço, Dinheiro).** |
| **Serialized LOB**             | Armazena objetos serializados em um único campo. **Use para estruturas complexas pouco consultadas.**                                     |
| **Single Table Inheritance**   | Toda a hierarquia fica em uma única tabela. **Use quando desempenho é prioridade e há poucas subclasses.**                                |
| **Class Table Inheritance**    | Cada classe possui sua própria tabela. **Use quando deseja normalização e menos colunas nulas.**                                          |
| **Concrete Table Inheritance** | Cada classe concreta possui todos os seus campos. **Use quando subclasses são independentes.**                                            |
| **Inheritance Mappers**        | Abstrai o mapeamento da herança. **Use ao implementar ORMs.**                                                                             |
| **Metadata Mapping**           | Define o mapeamento por metadados em vez de código. **Use para tornar o ORM configurável.**                                               |
# Object-Relational Metadata Mapping (cap13)

> **Objetivo:** Tornar consultas e persistência mais flexíveis.

|Padrão|Resumo|
|---|---|
|**Query Object**|Representa consultas como objetos reutilizáveis. **Use para consultas complexas montadas dinamicamente.**|
|**Repository**|Centraliza o acesso às entidades do domínio. **Use para desacoplar a lógica de negócio do banco de dados.**|
# Web Presentation Patterns (cap14)

> **Objetivo:** Organizar a camada de apresentação.

|Padrão|Resumo|
|---|---|
|**Model View Controller (MVC)**|Separa interface, lógica e dados. **Use em praticamente qualquer aplicação web.**|
|**Page Controller**|Cada página possui seu controlador específico. **Use em aplicações pequenas e orientadas por páginas.**|
|**Front Controller**|Um único ponto recebe todas as requisições. **Use para centralizar autenticação, roteamento e filtros (Laravel, Spring MVC).**|
|**Template View**|A página é montada usando templates. **Use quando o layout possui partes reutilizáveis.**|
|**Transform View**|A visão é gerada transformando dados (XML, JSON etc.). **Use quando a saída depende de transformação de documentos.**|
|**Two-Step View**|A renderização ocorre em duas etapas. **Use quando diferentes telas compartilham uma estrutura comum.**|

# Distribution Patterns (cap15)

> **Objetivo:** Organizar comunicação entre sistemas ou camadas.

|Padrão|Resumo|
|---|---|
|**Remote Facade**|Expõe uma interface simplificada para chamadas remotas. **Use para reduzir chamadas entre cliente e servidor.**|
|**Data Transfer Object (DTO)**|Agrupa dados em um objeto simples para transporte. **Use para enviar informações entre camadas ou serviços sem expor entidades.**|
# Montar uma trilha de estudo

Agora que você conhece todos os padrões, eu dividiria o estudo em três níveis.

## 🟢 Nível 1 (essenciais)

São os padrões que praticamente todo desenvolvedor backend usa diariamente.

- Service Layer
- Domain Model
- Repository
- Data Mapper
- Active Record
- MVC
- Front Controller
- DTO

Dos padrões que coloquei como **Nível 1 (essenciais)**, eles aparecem em apenas **5 capítulos** do livro. Isso é uma boa notícia: você consegue extrair grande parte do valor prático do PoEAA estudando menos da metade dos capítulos.

| Capítulo | Categoria                          | Padrões essenciais                  |
| -------: | ---------------------------------- | ----------------------------------- |
|    **9** | Domain Logic Patterns              | **Domain Model**, **Service Layer** |
|   **10** | Data Source Architectural Patterns | **Active Record**, **Data Mapper**  |
|   **13** | Object-Relational Metadata Mapping | **Repository**                      |
|   **14** | Web Presentation Patterns          | **MVC**, **Front Controller**       |
|   **15** | Distribution Patterns              | **DTO (Data Transfer Object)**      |
## Minha sugestão de ordem de estudo

Se o seu objetivo é tirar o máximo proveito para o dia a dia como desenvolvedor (PHP/Laravel hoje e Java/Spring no futuro), eu estudaria nesta ordem:

### 1. Capítulo 9 — Domain Logic Patterns ⭐⭐⭐⭐⭐

-   Domain Model
-   Service Layer

**Por quê?** Porque ele responde uma das perguntas mais importantes da arquitetura: **"Onde as regras de negócio devem ficar?"**

----------

### 2. Capítulo 10 — Data Source Architectural Patterns ⭐⭐⭐⭐⭐

-   Active Record
-   Data Mapper

**Por quê?** Você vai entender a principal diferença entre Laravel (Eloquent) e Spring/Hibernate, além de compreender por que ORMs são estruturados de formas diferentes.

----------

### 3. Capítulo 13 — Object-Relational Metadata Mapping ⭐⭐⭐⭐⭐

-   Repository

**Por quê?** O padrão Repository aparece em praticamente toda aplicação Spring e em muitas arquiteturas em Laravel e .NET.

----------

### 4. Capítulo 14 — Web Presentation Patterns ⭐⭐⭐⭐☆

-   MVC
-   Front Controller

**Por quê?** Você provavelmente já usa esses padrões sem perceber. Esse capítulo ajuda a entender por que frameworks como Laravel e Spring MVC são organizados da forma que são.

----------

### 5. Capítulo 15 — Distribution Patterns ⭐⭐⭐⭐☆

-   DTO

**Por quê?** DTO é um padrão extremamente comum em APIs REST, microsserviços e comunicação entre camadas.

----------

## O que eu faria no seu caso

Como você comentou em outras conversas que quer se tornar um desenvolvedor mais forte em arquitetura (e não apenas aprender Spring Boot), eu faria este roteiro:

1.  **Capítulo 9** → Leia inteiro.
2.  **Capítulo 10** → Leia inteiro.
3.  **Capítulo 13** → Leia inteiro.
4.  **Capítulo 11** → Leia apenas os três padrões (**Unit of Work**, **Identity Map** e **Lazy Load**), mesmo não estando no Nível 1. Eles são fundamentais para entender ORMs como Hibernate.
5.  **Capítulos 14 e 15** → Leia os padrões que mais se aplicam ao seu contexto (MVC, Front Controller e DTO).

Essa sequência cobre praticamente todos os conceitos que você encontrará diariamente em frameworks modernos e facilita muito a compreensão do restante do livro.