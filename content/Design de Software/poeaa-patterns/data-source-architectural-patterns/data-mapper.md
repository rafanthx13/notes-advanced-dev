**Resumo**: Traduzir objetos em registros do banco e SQL e objeto. o Sprgin está escondido dentro do Repository: por isso é passado objeto e retorna obejto, porque dentro tem o Data Mpaper;. 

![[Pasted image 20260719201736.png]]

## Notas de Estudo

- **O que é:**  Data Mapper é um objeto cuja única responsabilidade é traduzir objetos do domínio para o banco de dados e vice-versa, mantendo o domínio completamente independente da persistência.
- **Como funciona:** Um objeto que recebe o Domainio e faz as operaçoes de banco
- **Quando usar:** Convertter um objeto anemico ou Domain Model no banco. Dessa forma não há dependencia como aconteceria em um Active Record
- **Exemplos/Anotações:** 
	- Difenreça entre DataMapper e Repository
		- Data Mapper
			- Pergunta: Como transformar objetos em registros do banco?
			- O que faz: Traduçao entre objeto e Banco
			- DataMappe fala lingaugem de baco: colans, tabels, joins, Ids,
			- Reponsde perguntas como: Como um Pedido vira SQL?
			- **Data Mapper** → faz a tradução entre objetos e o banco de dados.
		- Repository
			- Pergunta: Como a aplicação encontra e salva objetos do domínio?
			- O que faz: IntOferece Interface de aceesso ao dominio
			- Repository fala lingaugem de dominio
			- Repsonde perguntas como: Onde encontro um Peridio? COmo salvo um Peiddo
			- **Repository** → representa uma coleção de objetos do domínio para a aplicação.
		- As pessoa confundem ele porque quando vc chama um repository, por dentro tem o Data Mapper

---
--- 
---

# 01 - Convrsa T: O que é Data Mapper

Agora sim chegamos ao padrão que, na minha opinião, é o **coração do PoEAA**.

Na verdade, eu diria que **Repository**, **Unit of Work**, **Identity Map** e boa parte do Hibernate só existem por causa do Data Mapper.

---

# O problema que o Data Mapper resolve

Vamos imaginar uma classe simples.

```java
class Pedido {

    private Cliente cliente;

    private List<Item> itens;

    private BigDecimal total;

    public void adicionarItem(Item item) {
        ...
    }

    public void aplicarDesconto(...) {
        ...
    }

    public void cancelar() {
        ...
    }

}
```

Essa classe sabe tudo sobre pedidos.

Agora surge uma pergunta:

> Como transformar isso em tabelas?

O Pedido não deveria saber.

Ele é um especialista em pedidos.

Não em banco de dados.

---

# A ideia do Data Mapper

Criamos outro objeto cuja única responsabilidade é:

> **Traduzir objetos em registros do banco e vice-versa.**

```text
Pedido

↓

Data Mapper

↓

Banco
```

O Pedido nunca fala com o banco.

---

# Comparando

## Active Record

```php
$pedido->save();
```

O Pedido sabe persistir.

---

## Data Mapper

```java
pedidoRepository.save(pedido);
```

Quem sabe persistir é outro objeto.

---

# O Mapper é um tradutor

Imagine uma pessoa que fala português.

Outra fala japonês.

Elas nunca conversam diretamente.

Existe um tradutor.

```text
Português

↓

Tradutor

↓

Japonês
```

O tradutor conhece os dois idiomas.

As pessoas não.

---

No Data Mapper acontece exatamente isso.

```text
Objeto

↓

Mapper

↓

Tabela
```

---

# O objeto não conhece SQL

```java
class Pedido {

    cancelar()

    calcularFrete()

    aplicarCupom()

}
```

Perceba:

Nenhuma linha de SQL.

Nenhum UPDATE.

Nenhum INSERT.

Nada.

---

# Quem faz isso?

```java
PedidoMapper
```

ou

```java
PedidoRepository
```

dependendo da arquitetura.

---

# O Mapper faz a tradução

Imagine este objeto.

```text
Pedido

id = 15

cliente = Rafael

total = 1500
```

Ele vira

```text
pedido

id

cliente_id

total
```

O Mapper faz essa conversão.

---

Depois acontece o contrário.

Banco

```text
pedido

15

3

1500
```

↓

Objeto

```java
Pedido

Cliente

1500
```

---

# O Mapper conhece os dois mundos

Ele conhece:

Objetos

↓

e

↓

Banco.

O Pedido conhece apenas:

Pedido.

---

# Um exemplo simplificado

```java
class PedidoMapper {

    public Pedido buscar(Long id){

        // SQL

        // monta Pedido

        return pedido;

    }

}
```

ou

```java
class PedidoRepository {

    public void save(Pedido pedido){

        // gera UPDATE

    }

}
```

---

# Hibernate

O mais interessante é que no Hibernate você praticamente nunca vê o Mapper.

Você escreve:

```java
repository.save(pedido);
```

Parece simples.

Mas internamente acontece algo parecido com isto:

```text
Pedido

↓

Hibernate

↓

Data Mapper

↓

SQL

↓

Banco
```

O Hibernate é praticamente um enorme Data Mapper.

---

# Por que isso é poderoso?

Imagine que amanhã você decide trocar:

MySQL

↓

PostgreSQL

↓

Oracle

↓

SQL Server

O Pedido continua igual.

Quem muda é o Mapper.

---

# Outro benefício

Imagine uma regra.

```java
pedido.cancelar();
```

Ela funciona mesmo sem banco.

Você pode fazer:

```java
Pedido pedido = new Pedido();

pedido.cancelar();
```

Sem conexão.

Sem framework.

Sem Hibernate.

É um objeto puro.

---

# Um exemplo de teste

```java
@Test

public void deveCancelarPedido(){

    Pedido pedido = new Pedido();

    pedido.cancelar();

    assertEquals(Status.CANCELADO, pedido.getStatus());

}
```

Nada de banco.

Nada de SQL.

Nada de mocks complicados.

---

# No Laravel

Você faz:

```php
$pedido->save();
```

No Spring:

```java
repository.save(pedido);
```

A diferença parece pequena.

Mas filosoficamente é enorme.

---

# Uma analogia

Imagine um escritor.

O escritor escreve um livro.

Ele não sabe imprimir.

Não sabe vender.

Não sabe distribuir.

Existe uma editora.

```text
Escritor

↓

Editora

↓

Livraria
```

O escritor continua escrevendo.

A editora cuida da publicação.

---

O Pedido é o escritor.

O Mapper é a editora.

---

# Uma coisa interessante

Muita gente acha que Repository e Data Mapper são iguais.

Não são.

O Repository responde:

> Como encontro um Pedido?

```java
pedidoRepository.findById(...)
```

O Data Mapper responde:

> Como transformar um Pedido em SQL?

No Hibernate:

```text
Repository

↓

Hibernate

↓

Data Mapper

↓

Banco
```

Você normalmente usa Repository.

O Hibernate implementa o Data Mapper por baixo.

---

# No seu caso

Pensando no sistema de planos de saúde que você me descreveu, eu faria a seguinte leitura.

Hoje você tem algo como:

```text
Plano1Processor

↓

Plano1DbTable
```

A `Plano1DbTable` recebe arrays e faz `INSERT`s.

Ela **não é um Data Mapper**.

Ela está mais próxima do padrão **Table Data Gateway**, outro padrão do PoEAA, porque sua responsabilidade é encapsular o acesso a uma tabela (ou conjunto de tabelas), trabalhando com estruturas de dados simples.

Se um dia você migrasse para um modelo mais orientado a objetos, poderia ter algo como:

```text
PlanoImportado (objeto)

↓

PlanoImportadoRepository

↓

Hibernate / Doctrine

↓

Data Mapper

↓

Banco
```

O objeto `PlanoImportado` nunca saberia como é gravado. Ele apenas representaria o domínio.

---

# A frase que resume o padrão

> **Data Mapper é um objeto cuja única responsabilidade é traduzir objetos do domínio para o banco de dados e vice-versa, mantendo o domínio completamente independente da persistência.**

E eu vou deixar uma última observação que considero a mais importante de todas.

Quando comecei a estudar esses padrões, eu também pensava:

> "Mas isso é só trocar `pedido.save()` por `repository.save(pedido)`."

Hoje eu vejo que essa é a menor das diferenças.

A verdadeira mudança é esta:

- **Active Record** faz você modelar o software a partir do **banco de dados**.
    
- **Data Mapper** faz você modelar o software a partir do **domínio do problema**.
    

Essa inversão de perspectiva é justamente o que tornou possível o surgimento de arquiteturas como **Domain-Driven Design (DDD)**, **Clean Architecture** e o uso de entidades ricas em frameworks como Spring/Hibernate. É por isso que Martin Fowler considera o Data Mapper um dos padrões fundamentais do livro.


---
---
---

# 02 - GPT: Direnrea entre Repository e DataMapper

Essa pergunta é excelente. Na verdade, **Repository e Data Mapper são dois dos padrões mais confundidos do livro**, porque, em muitos frameworks, eles trabalham juntos.

A diferença fica clara quando você olha **a responsabilidade de cada um**.

---

# Vamos começar pelo objetivo de cada um

## Data Mapper

Pergunta:

> **Como transformar objetos em registros do banco?**

Ele faz a tradução.

```text
Objeto Pedido
        ↓
Data Mapper
        ↓
Tabela pedido
```

---

## Repository

Pergunta:

> **Como a aplicação encontra e salva objetos do domínio?**

Ele fornece uma coleção de objetos.

```text
PedidoRepository

↓

findById()

↓

save()

↓

buscarPedidosAbertos()
```

Perceba que ele não existe para traduzir objetos.

Ele existe para fornecer uma interface de acesso ao domínio.

---

# Uma analogia

Imagine uma biblioteca.

Você quer um livro.

Quem conversa com você?

O bibliotecário.

Você pede:

> "Quero Dom Casmurro."

O bibliotecário procura.

Você nunca entra no depósito.

---

Agora imagine o depósito.

Lá dentro existe alguém que:

- pega o livro da prateleira;
    
- registra empréstimos;
    
- coloca etiquetas;
    
- organiza tudo.
    

Esse cara seria o Data Mapper.

---

Em outras palavras:

```text
Cliente

↓

Bibliotecário

↓

Funcionário do depósito

↓

Prateleira
```

Bibliotecário = Repository

Funcionário = Data Mapper

---

# Exemplo

Imagine esta entidade.

```java
Pedido
```

Você quer buscá-la.

Você faz:

```java
Pedido pedido = repository.findById(10);
```

Quem respondeu?

Repository.

---

Agora imagine que o banco retornou isto.

```text
pedido

id = 10

cliente = 5

valor = 200
```

Quem transforma isso em:

```java
Pedido
```

?

O Data Mapper.

---

# Outro exemplo

Você faz:

```java
pedido.cancelar();
```

Depois:

```java
repository.save(pedido);
```

O Repository recebe:

```text
Pedido
```

Mas quem gera:

```sql
UPDATE pedido

SET status='Cancelado'
```

?

O Data Mapper.

---

# Então o Repository não faz SQL?

Idealmente, não.

Ele delega isso.

Imagine:

```text
PedidoRepository

↓

PedidoMapper

↓

SQL
```

---

# Por que então muita gente acha que são iguais?

Porque frameworks escondem o Mapper.

No Spring:

```java
pedidoRepository.save(pedido);
```

Você não vê isto:

```text
PedidoRepository

↓

Hibernate

↓

Data Mapper

↓

SQL
```

O Hibernate implementa o Mapper.

---

# Pensando em responsabilidades

Repository conhece:

- Pedido
    
- Cliente
    
- Contrato
    

Ele fala a linguagem do domínio.

Por exemplo:

```java
buscarPedidosPendentes()
```

```java
buscarPedidosDoCliente()
```

```java
buscarUltimaCompra()
```

Esses métodos fazem sentido para o negócio.

---

O Mapper conhece:

- colunas
    
- tabelas
    
- joins
    
- ids
    
- foreign keys
    
- tipos SQL
    

Ele fala a linguagem do banco.

---

# Outro jeito de pensar

Repository responde perguntas como:

```text
Onde encontro um Pedido?

Como salvo um Pedido?
```

Mapper responde:

```text
Como um Pedido vira SQL?
```

---

# Exemplo completo

Imagine isto:

```java
Pedido pedido =
    repository.buscarPedidoEmAberto(15);
```

O Repository diz:

> Vou buscar.

Depois ele chama:

```text
PedidoMapper
```

O Mapper faz:

```sql
SELECT ...

FROM pedido

JOIN cliente

JOIN item
```

Depois monta:

```java
Pedido

↓

Cliente

↓

Itens
```

Entrega para o Repository.

O Repository entrega para você.

---

# O Repository é mais próximo do domínio

Imagine que amanhã você muda o banco.

O domínio continua dizendo:

```java
repository.buscarPedidosPendentes();
```

Nada muda.

---

Agora imagine que mudou a estrutura das tabelas.

Quem sofre?

O Mapper.

Não o Repository.

---

# E no Hibernate?

É interessante porque, no Spring Data JPA, parece que o Repository faz tudo:

```java
repository.findById(1);
```

Mas internamente acontece algo parecido com:

```text
PedidoRepository

↓

EntityManager

↓

Hibernate

↓

Data Mapper

↓

Banco
```

O Data Mapper fica escondido.

---

# Agora vou usar um exemplo do seu sistema

Hoje você comentou que possui algo como:

```text
Plano1Processor

↓

Plano1DbTable
```

A `Plano1DbTable` recebe arrays e faz `INSERT`s.

Ela está muito mais próxima de um **Data Mapper** (ou, mais precisamente, de um **Table Data Gateway**, que veremos depois) do que de um Repository.

Se amanhã você criasse um `PlanoImportadoRepository`, ele poderia oferecer métodos como:

```php
$repository->buscarImportacoesComErro();

$repository->buscarUltimaImportacao();

$repository->salvar($planoImportado);
```

Ou seja, ele falaria a **linguagem do domínio da aplicação**.

Já a classe que realmente sabe que existe uma tabela `tb_importacao_plano`, que monta o `INSERT`, converte tipos e executa SQL estaria desempenhando o papel de **Mapper**.

---

## A forma mais simples de nunca mais confundir

Eu uso uma pergunta para distinguir os dois:

### Se a classe responde...

> **"Como encontro um Pedido?"**

➡️ É um **Repository**.

---

### Se a classe responde...

> **"Como transformar um Pedido em linhas do banco?"**

➡️ É um **Data Mapper**.

---

### Uma última observação

Na prática, principalmente em projetos menores, **Repository e Data Mapper costumam acabar na mesma classe**. Isso não é necessariamente errado. Muitos ORMs escondem completamente o Data Mapper e expõem apenas o Repository.

É justamente por isso que eles parecem iguais.

O importante é entender que **conceitualmente** eles têm responsabilidades diferentes:

- **Repository** → representa uma coleção de objetos do domínio para a aplicação.
    
- **Data Mapper** → faz a tradução entre objetos e o banco de dados.
    

Quando você entende essa separação, passa a enxergar melhor a arquitetura dos ORMs modernos e também consegue decidir quando faz sentido separar essas responsabilidades ou deixá-las encapsuladas pelo framework.


---
---
---

# 0 -Data Mppaer conevrte SQL em objeto e vice-versa

**Exatamente!** Esse é um detalhe fundamental do padrão.

Na verdade, o Data Mapper faz **as duas traduções**.

```text
Objeto  ─────────────► Banco
          (INSERT/UPDATE)

Objeto  ◄──────────── Banco
          (SELECT)
```

Ou seja, ele é um **tradutor bidirecional**.

---

## Objeto → Banco

Imagine:

```java
Pedido pedido = new Pedido();

pedido.setNumero(123);
pedido.setTotal(1500);
```

O Data Mapper transforma isso em algo como:

```sql
INSERT INTO pedido
(numero, total)

VALUES
(123, 1500);
```

---

## Banco → Objeto

Agora imagine que o banco retornou:

|id|numero|total|
|---|---|---|
|15|123|1500|

O Data Mapper faz:

```java
Pedido pedido = new Pedido();

pedido.setId(15);
pedido.setNumero(123);
pedido.setTotal(1500);

return pedido;
```

Perceba que ele também sabe **construir o objeto**.

---

## Quando existem relacionamentos

É aqui que a coisa fica interessante.

Imagine:

```java
class Pedido {

    Cliente cliente;

    List<Item> itens;

}
```

O banco retorna:

```text
pedido

id = 15

cliente_id = 7
```

O Data Mapper pode fazer:

```java
Pedido pedido = new Pedido();

pedido.setCliente(clienteMapper.buscar(7));
```

Ou, dependendo da estratégia (como **Lazy Load**), colocar um proxy que só buscará o cliente quando ele for acessado.

É por isso que padrões como **Lazy Load**, **Identity Map** e **Unit of Work** aparecem logo depois no livro: eles complementam o trabalho do Data Mapper.

---

## Um exemplo do Hibernate

Você escreve:

```java
Pedido pedido = repository.findById(15).get();
```

Mas internamente acontece algo parecido com:

```text
SELECT ...

↓

Resultado SQL

↓

Hibernate

↓

Data Mapper

↓

new Pedido()

↓

setId()

↓

setCliente()

↓

setItens()

↓

return Pedido
```

Toda essa transformação é trabalho do Data Mapper.

---

## Uma frase que ajuda a memorizar

Eu costumo resumir assim:

> **O Data Mapper é um tradutor entre dois mundos.**

Ele conhece:

- o mundo dos objetos (classes, atributos, listas, herança);
    
- o mundo relacional (tabelas, colunas, chaves estrangeiras).
    

E faz a tradução **nos dois sentidos**:

```text
Objetos  ⇄  Data Mapper  ⇄  Banco
```

Por isso o nome **Mapper** ("mapeador"): ele cria um **mapeamento** entre o modelo orientado a objetos e o modelo relacional, tanto para gravar quanto para reconstruir objetos a partir dos dados do banco.