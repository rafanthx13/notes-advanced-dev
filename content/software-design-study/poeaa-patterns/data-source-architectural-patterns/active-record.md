**Resumo:** É o Eloquente do Laravel, quando fazemos `extends Model` a classe que era apenas dados passa a também poder por ela mesma fazer acesso ao banco

![[Pasted image 20260719201532.png]]


## Notas de Estudo

- **O que é:** Active Record é um objeto que representa uma linha do banco de dados e também sabe como persistir a si mesm
- **Como funciona:** O Obejto além de ter seus atributos pode salavar/atualizar/deletar com base em seus próprios dados
- **Quando usar:** É usado no Laravel com Elqouent. Mas nao é usado no Spring, lá usa´se dataMapper. O obejto é apenas daodas e é neces´sairo de outro apra fazer operaç~eos de banco
- **Exemplos/Anotações:** 
	- Active Record: A classe é dado + acesos ao banco e pode ser Domain Model
	- Data Mapper: A class eé só dado e pode ser DOmain Model, ela sozinha nao tem acesos ao banco. Data Mapper é usadao em cosia mais complexas pois:
		- A classe fica agnostica (indedpende de framewrk que implemente active Record ou qualquer coutra coisa)
		- Se a classe for muito complesax, seria melhor de deixar o acesso de banco a outra classe

---
# Conversa GPT: O que é

Excelente. E esse é um padrão que você **já usa diariamente**, porque o **Eloquent do Laravel é uma implementação clássica de Active Record**.

O interessante é que, depois da nossa conversa sobre **Domain Model** e **Service Layer**, você vai entender muito melhor por que o Active Record é amado por alguns e criticado por outros.

---

# O problema que o Active Record resolve

Imagine que você tem uma tabela:

```text
clientes

id
nome
email
```

Você quer fazer algo simples:

```php
$cliente = buscarCliente(10);

$cliente->nome = "Rafael";

salvar($cliente);
```

Sem um padrão, você acabaria escrevendo SQL o tempo todo:

```php
$row = mysqli_query(...);

$row['nome'] = 'Rafael';

mysqli_query("UPDATE...");
```

O código de negócio e o SQL ficam misturados.

---

# A ideia do Active Record

O próprio objeto sabe como se salvar.

```php
$cliente = Cliente::find(10);

$cliente->nome = "Rafael";

$cliente->save();
```

O objeto representa:

- os dados
    
- e a persistência.
    

---

# A definição de Martin Fowler

Ele define Active Record mais ou menos assim:

> **Um objeto que encapsula os dados de uma linha do banco e também os métodos para acessar e persistir esses dados.**

Perceba que ele fala em:

- dados
    
- persistência
    

Ele **não fala em regras de negócio**.

Essa é uma diferença importante.

---

# Exemplo simples

```php
class Cliente extends Model
{
}
```

Você ganha automaticamente:

```php
Cliente::find(1);

Cliente::all();

Cliente::where(...);

$cliente->save();

$cliente->delete();
```

Tudo isso faz parte do Active Record.

---

# O que normalmente existe em um Active Record

```php
$cliente->save();

$cliente->delete();

$cliente->refresh();

$cliente->update();

Cliente::find();

Cliente::where();

Cliente::create();
```

São operações de persistência.

---

# Laravel é praticamente o exemplo oficial

Quando Martin Fowler escreveu o livro (2002), o Laravel nem existia.

Mas anos depois, o Eloquent ficou conhecido justamente como um dos melhores exemplos modernos do padrão.

---

# Onde entra o Domain Model?

Agora vem uma dúvida que muita gente tem.

Imagine:

```php
class Pedido extends Model
{
    public function cancelar()
    {
        ...
    }
}
```

Isso ainda é Active Record?

Sim.

Agora ele também é um Domain Model.

Os dois padrões convivem.

---

# Então Active Record e Domain Model são concorrentes?

Não.

Eles respondem perguntas diferentes.

## Active Record

Pergunta:

> Como esse objeto conversa com o banco?

Resposta:

```php
$pedido->save();
```

---

## Domain Model

Pergunta:

> Onde ficam as regras do negócio?

Resposta:

```php
$pedido->cancelar();
```

---

# Um exemplo completo

```php
$pedido = Pedido::find(10);

$pedido->cancelar();

$pedido->save();
```

Temos duas responsabilidades diferentes acontecendo:

```text
Pedido::find()

↓

Active Record
```

Depois:

```text
pedido->cancelar()

↓

Domain Model
```

Depois:

```text
pedido->save()

↓

Active Record
```

O mesmo objeto exerce dois papéis.

---

# Por que muita gente critica Active Record?

Porque ele mistura responsabilidades.

O objeto sabe:

- como salvar
    
- como atualizar
    
- como apagar
    
- como consultar
    

E às vezes também sabe:

- calcular imposto
    
- cancelar pedido
    
- aprovar pagamento
    

Isso pode deixar a classe muito grande.

---

# A alternativa

O outro padrão do livro:

## Data Mapper

Em vez de:

```php
$pedido->save();
```

Você faz:

```php
$pedidoRepository->save($pedido);
```

O objeto não sabe nada de SQL.

Quem sabe é o Mapper.

É exatamente o modelo usado pelo Hibernate/JPA.

---

# Comparando Laravel e Spring

## Laravel

```php
$pedido = Pedido::find(1);

$pedido->cancelar();

$pedido->save();
```

O Pedido sabe persistir.

---

## Spring

```java
Pedido pedido = repository.findById(1);

pedido.cancelar();

repository.save(pedido);
```

O Pedido não sabe persistir.

Quem sabe é o Repository/Hibernate.

---

# Então qual é melhor?

Essa pergunta gera discussões há mais de 20 anos.

A resposta do próprio Martin Fowler é interessante:

## Active Record é excelente quando

- CRUDs
    
- sistemas administrativos
    
- regras simples
    
- desenvolvimento rápido
    
- aplicações pequenas e médias
    

Por isso ele combina tão bem com Laravel.

---

## Data Mapper é excelente quando

- ERP
    
- bancos
    
- seguradoras
    
- sistemas financeiros
    
- regras muito complexas
    
- DDD
    

Por isso Hibernate usa Data Mapper.

---

# O seu caso

Pelas conversas que tivemos, seu sistema importa arquivos de planos de saúde, faz transformações, validações e grava dados. Não parece ser um domínio extremamente rico como um sistema bancário ou um ERP gigantesco.

Nesse contexto, eu não veria problema em usar o Eloquent como **Active Record** e também colocar **algumas regras de negócio diretamente no Model**, desde que realmente pertençam à entidade.

Por exemplo:

```php
$plano->estaAtivo();
$plano->podeReceberImportacao();
$plano->calcularVigencia();
```

Esses métodos fazem sentido no próprio modelo.

Já algo como:

```php
$plano->importarArquivo();
```

eu evitaria.

Importar um arquivo não é uma responsabilidade do **Plano**. É um **caso de uso da aplicação**, que poderia ser coordenado por um `ImportacaoPlanoService`, utilizando o seu `Plano1Processor` (ou `Plano2Processor`) para lidar com as particularidades de cada layout.

---

## A frase que resume o padrão

> **Active Record é um objeto que representa uma linha do banco de dados e também sabe como persistir a si mesmo.**

Essa simplicidade é justamente a razão do seu sucesso. Ela reduz muito a quantidade de código em aplicações CRUD. A desvantagem é que, se não houver disciplina, a classe pode acabar acumulando responsabilidades demais. É aí que entram padrões como **Domain Model** e **Service Layer**, ajudando a manter a organização mesmo usando Active Record.

---
---
---

# Conversa GPT: Difenreça entre Active Record e Data Mapper

Active Record é um objeto que representa uma linha do banco de dados e também sabe como persistir a si mesm