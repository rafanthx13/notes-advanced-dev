**Resumo**: Criamos um objeto especializado em fornecer acesso aos objetos do domínio. Martin Fowler usa a ideia de que um Repository deve parecer uma ``collection`` o Java. Seus métodos representam perguntas que o negócio faria ou que precisa fazer.
![[Pasted image 20260719203014.png]]

# Atenção

> **Repository não é um padrão de persistência.**
> 
> Esse é o erro mais comum.

O Repository **não existe para fazer SQL**. Esse é o papel do Data Mapper.

O Repository existe para **dar ao domínio a impressão de que os objetos vivem em uma coleção**, como se estivessem em memória.

Essa ideia é a essência do padrão.

## Uma observação final

Depois de toda a nossa conversa, acho que você já consegue perceber uma sequência muito interessante entre os padrões:

- **Domain Model** → "Onde ficam as regras de negócio?"
- **Service Layer** → "Quem coordena um caso de uso?"
- **Data Mapper** → "Quem traduz objetos para o banco e vice-versa?"
- **Repository** → "Como o restante da aplicação encontra e salva objetos do domínio?"

Eles não competem entre si. Na verdade, **eles se complementam**. É justamente essa combinação que aparece em arquiteturas modernas com Spring/Hibernate, DDD e Clean Architecture. Quando estudados nessa ordem, fica muito mais fácil entender por que Martin Fowler organizou o livro dessa maneira.


## Notas de Estudo

- **O que é:** Repository é um objeto que oferece uma interface para acessar entidades do domínio como se elas estivessem em uma coleção em memória, escondendo completamente os detalhes da persistência.
- **Como funciona:** 
- **Quando usar:** 
- **Exemplos/Anotações:** 

--- 
# 01 - GPT O que é o padrao Repository


Agora chegamos em um padrão que você provavelmente já viu dezenas de vezes, mas talvez sem entender **por que ele existe**.

E existe um detalhe importante:

> **Repository não é um padrão de persistência.**
> 
> Esse é o erro mais comum.

O Repository **não existe para fazer SQL**. Esse é o papel do Data Mapper.

O Repository existe para **dar ao domínio a impressão de que os objetos vivem em uma coleção**, como se estivessem em memória.

Essa ideia é a essência do padrão.

---

# O problema que o Repository resolve

Imagine que você tem uma classe `Pedido`.

Você precisa:

- buscar por ID;
    
- buscar pedidos pendentes;
    
- buscar pedidos de um cliente;
    
- salvar um pedido.
    

Sem Repository, você poderia espalhar isso pelo código:

```php
Pedido::find($id);

Pedido::where(...);

DB::table(...);

SELECT ...
```

Cada lugar acessa o banco de um jeito.

---

# A ideia do Repository

Criamos um objeto especializado em fornecer acesso aos objetos do domínio.

```text
Controller

↓

PedidoRepository

↓

Banco
```

Quem precisa de um Pedido pergunta ao Repository.

---

# A analogia mais famosa

Martin Fowler usa a ideia de que um Repository deve parecer uma coleção.

Imagine isto:

```text
List<Pedido>
```

Você faz:

```java
lista.get(10);
```

ou

```java
lista.add(pedido);
```

Você não pensa:

> "Esse objeto veio de um banco."

Você pensa:

> "Peguei um objeto da coleção."

O Repository tenta dar exatamente essa sensação.

---

# Exemplo

```java
Pedido pedido =
    pedidoRepository.findById(15);
```

Parece que você pegou um objeto de uma coleção.

Você não sabe:

- se veio do banco;
    
- do cache;
    
- de uma API;
    
- de um arquivo;
    
- da memória.
    

Isso é responsabilidade do Repository.

---

# O Repository fala a linguagem do domínio

Esse é um ponto importantíssimo.

Imagine estes métodos:

```java
findById()

save()

delete()
```

São genéricos.

Agora imagine:

```java
buscarPedidosPendentes();

buscarPedidosVencidos();

buscarUltimaCompraDoCliente();

buscarPedidosDoMes();
```

Esses métodos fazem sentido para o negócio.

O Repository fala a linguagem do domínio.

---

# O que NÃO deveria existir

```java
buscarPorCampoX();

buscarTabelaPedido();

executarJoin();
```

Isso é linguagem do banco.

Não do domínio.

---

# O Repository esconde a persistência

Imagine que hoje você usa:

```text
MySQL
```

Amanhã:

```text
MongoDB
```

Depois:

```text
Redis
```

Depois:

```text
API externa
```

O código continua igual:

```java
pedidoRepository.buscarPedidosPendentes();
```

Quem muda é a implementação.

---

# Comparando com Data Mapper

## Repository

```java
pedidoRepository.buscarPedidosPendentes();
```

Ele responde:

> Onde encontro esses pedidos?

---

## Data Mapper

Recebe um Pedido.

Gera:

```sql
SELECT ...

UPDATE ...

INSERT ...
```

Ele responde:

> Como transformar objetos em SQL?

---

# Um exemplo completo

Imagine:

```java
Pedido pedido =
    pedidoRepository.buscarPedidoAberto(15);
```

Internamente:

```text
Repository

↓

Hibernate

↓

Data Mapper

↓

Banco
```

Você nunca vê o Mapper.

---

# Um exemplo do seu sistema

Vamos usar o sistema de importação dos planos de saúde.

Hoje você comentou algo parecido com:

```text
Plano1Processor

↓

Plano1DbTable
```

Imagine que você tenha uma entidade:

```php
ImportacaoPlano
```

Você poderia ter:

```php
$repository->buscarImportacoesComErro();

$repository->buscarUltimaImportacao();

$repository->buscarImportacoesPendentes();
```

Perceba que os nomes são todos do domínio da aplicação.

O Repository não sabe que existe uma tabela `tb_importacao`.

Ele sabe apenas que existem **importações**.

---

# O Repository não precisa usar banco

Esse é um detalhe muito interessante.

Imagine um teste.

Você pode criar:

```java
FakePedidoRepository
```

```java
MemoryPedidoRepository
```

Tudo continua funcionando.

Porque ninguém depende do banco.

Depende apenas do Repository.

---

# O Repository representa uma coleção

Essa é, para mim, a melhor forma de entender.

Imagine que todos os pedidos do sistema estivessem em memória.

Você faria:

```java
pedidos.buscarPendentes();

pedidos.buscarPorCliente();

pedidos.salvar();
```

O Repository tenta reproduzir exatamente essa experiência, mesmo que os dados estejam no banco.

---

# Um detalhe importante sobre ORMs

Muita gente diz:

> "O JPA Repository é um Repository."

Sim.

Mas ele também faz muito mais.

Frameworks modernos acabam misturando:

- Repository
    
- Unit of Work
    
- Identity Map
    
- Data Mapper
    

Tudo escondido atrás de uma API simples.

Por isso às vezes fica difícil perceber onde termina um padrão e começa outro.

---

# Uma dica prática

Quando você criar um Repository, faça esta pergunta:

> **Os métodos representam perguntas que o negócio faria?**

Se sim, você provavelmente está no caminho certo.

Por exemplo:

```php
$pedidoRepository->buscarPedidosAprovados();

$clienteRepository->buscarClientesInadimplentes();

$contratoRepository->buscarContratosVencidos();
```

Esses métodos têm significado para quem conhece o negócio.

Agora compare com:

```php
$pedidoRepository->buscarPorCampo('status', 'A');

$pedidoRepository->executarJoin();

$pedidoRepository->buscarTabelaPedido();
```

Esses métodos revelam detalhes de implementação e da estrutura do banco. Eles deixam de falar a linguagem do domínio.

---

# A frase que resume o padrão

> **Repository é um objeto que oferece uma interface para acessar entidades do domínio como se elas estivessem em uma coleção em memória, escondendo completamente os detalhes da persistência.**

---

## Uma observação final

Depois de toda a nossa conversa, acho que você já consegue perceber uma sequência muito interessante entre os padrões:

- **Domain Model** → "Onde ficam as regras de negócio?"
    
- **Service Layer** → "Quem coordena um caso de uso?"
    
- **Data Mapper** → "Quem traduz objetos para o banco e vice-versa?"
    
- **Repository** → "Como o restante da aplicação encontra e salva objetos do domínio?"
    

Eles não competem entre si. Na verdade, **eles se complementam**. É justamente essa combinação que aparece em arquiteturas modernas com Spring/Hibernate, DDD e Clean Architecture. Quando estudados nessa ordem, fica muito mais fácil entender por que Martin Fowler organizou o livro dessa maneira.


