# Data Transfer Object

## Notas de Estudo

- **O que é:** 
- **Como funciona:** 
- **Quando usar:** 
- **Exemplos/Anotações:** 

---
---
---

# GPT 001 - Fale sobre DTO


Ótima escolha. O **DTO (Data Transfer Object)** é um padrão muito utilizado em arquiteturas modernas, embora tenha uma história um pouco diferente dos padrões principais do *PoEAA*. Ele aparece muito quando começamos a falar de **Service Layer**, **APIs**, **Clean Architecture** e **DDD**.

A ideia central é:

> **DTO é um objeto criado para transportar dados entre camadas, sem carregar regras de negócio.**

Ele é um "pacote de dados".

---

## O problema que o DTO resolve

Imagine um Controller recebendo uma requisição:

```json
{
    "nome": "Rafael",
    "email": "rafael@email.com",
    "senha": "123456",
    "tipo": "ADMIN"
}
```

Uma abordagem comum é passar isso diretamente:

```php
$service->criarUsuario($request->all());
```

O problema:

O Service agora depende de um array.

Ele precisa saber:

```php
$dados['nome']
$dados['email']
$dados['senha']
```

Isso gera problemas:

* sem garantia de campos existentes;
* sem tipo;
* difícil de entender;
* fácil passar dados errados.

---

## A ideia do DTO

Criar uma classe que representa os dados que entram ou saem.

Exemplo:

```php
class CriarUsuarioDTO
{
    public function __construct(
        public string $nome,
        public string $email,
        public string $senha
    ) {}
}
```

Agora:

```php
$dto = new CriarUsuarioDTO(
    $request->nome,
    $request->email,
    $request->senha
);

$service->criarUsuario($dto);
```

---

O Service recebe:

```php
CriarUsuarioDTO
```

e não um array genérico.

---

## Antes e depois

### Sem DTO

```php
public function criarUsuario(array $dados)
{
    $dados['email'];
    $dados['nome'];
}
```

Problemas:

* qualquer array entra;
* nomes podem estar errados;
* estrutura implícita.

---

### Com DTO

```php
public function criarUsuario(
    CriarUsuarioDTO $dados
)
{
    $dados->email;
    $dados->nome;
}
```

Agora a assinatura da função explica o contrato.

---

## DTO não tem regra de negócio

Esse é um ponto muito importante.

Evite:

```php
class CriarUsuarioDTO
{
    public function validarEmail()
    {
        ...
    }

    public function criarUsuario()
    {
        ...
    }
}
```

Isso não é DTO.

O DTO não sabe:

* criar usuário;
* consultar banco;
* validar regra de negócio.

Ele apenas carrega dados.

---

## Onde o DTO fica na arquitetura?

Normalmente:

```text
Controller

↓

DTO

↓

Service

↓

Domain Model

↓

Repository
```

Exemplo:

Controller recebe HTTP:

```json
{
 "plano": "premium",
 "cliente": 10
}
```

Transforma em:

```php
ContratarPlanoDTO
```

Passa para:

```php
PlanoService
```

---

## Exemplo completo

### Controller

```php
public function contratar(Request $request)
{
    $dto = new ContratarPlanoDTO(
        $request->clienteId,
        $request->planoId
    );

    $this->service->contratar($dto);
}
```

---

### DTO

```php
class ContratarPlanoDTO
{
    public function __construct(
        public int $clienteId,
        public int $planoId
    ) {}
}
```

---

### Service

```php
public function contratar(
    ContratarPlanoDTO $dto
)
{
    $cliente =
        $this->clienteRepository
             ->buscar($dto->clienteId);

    $cliente->contratarPlano(
        $dto->planoId
    );
}
```

---

## DTO de entrada e DTO de saída

Existem dois usos principais.

---

### 1. Request DTO (entrada)

Dados que entram:

```text
Frontend
   |
   ↓
CriarUsuarioDTO
   |
   ↓
Service
```

Exemplo:

```php
CriarUsuarioDTO
```

---

### 2. Response DTO (saída)

Dados que saem:

```text
Service
   |
   ↓
UsuarioDTO
   |
   ↓
API
```

Exemplo:

```json
{
 "id":10,
 "nome":"Rafael"
}
```

---

## DTO vs Model

Essa confusão é muito comum.

### Model

Representa uma entidade do domínio.

Exemplo:

```php
class Usuario
{
    public function bloquear()
    {
        ...
    }
}
```

Ele tem comportamento.

---

### DTO

Representa apenas dados.

Exemplo:

```php
class UsuarioDTO
{
    public string $nome;
    public string $email;
}
```

Ele não tem comportamento.

---

Uma comparação:

|                | Model         | DTO              |
| -------------- | ------------- | ---------------- |
| Representa     | Negócio       | Dados            |
| Tem regras?    | Sim           | Não              |
| Tem métodos?   | Sim           | Poucos ou nenhum |
| Conhece banco? | Talvez        | Não              |
| Objetivo       | Comportamento | Transporte       |

---

## DTO vs Array

Essa é a maior motivação no PHP.

Array:

```php
[
 'nome'=>'Rafael',
 'email'=>'x'
]
```

Problemas:

* sem contrato;
* sem autocomplete;
* sem tipo.

DTO:

```php
$user->email
```

Benefícios:

* IDE ajuda;
* refatoração melhor;
* código mais explícito.

---

## No Laravel

O Laravel não obriga DTO.

Muita gente faz:

```php
$request->validated()
```

e passa array.

Funciona.

Mas em sistemas maiores:

```php
$request
   ↓
DTO
   ↓
Service
```

fica mais organizado.

Bibliotecas comuns:

* Spatie Laravel Data;
* Laravel Data Objects;
* classes próprias.

---


---

## A frase que resume DTO

> **DTO é um objeto simples usado para transportar dados entre camadas, criando um contrato explícito de comunicação sem carregar regras de negócio.**

---

E uma observação conectando com tudo que estudamos: o DTO normalmente aparece justamente no ponto onde o **Controller encontra o Service Layer**. Ele funciona como uma "fronteira" entre o mundo externo (HTTP, JSON, telas) e o mundo interno da aplicação (casos de uso e domínio). Ele ajuda a evitar que detalhes da entrada contaminem sua lógica de negócio.


# 002- GPT - Fale sobre essa libs Laravel apra criar DTO. Além disso, não fica umonte de DTOs no sistema?

Ótima pergunta. Você chegou exatamente no ponto onde muitos desenvolvedores começam a usar DTO e acabam criando um problema novo: **"DTO para tudo"**.

O DTO é uma ferramenta muito útil, mas ele precisa ser usado com critério.

---

## 1. Sobre as bibliotecas de DTO no Laravel

### Spatie Laravel Data

A biblioteca mais conhecida atualmente para DTO no ecossistema Laravel é o **Spatie Laravel Data**.

A ideia é criar classes de dados com recursos extras:

* tipagem;
* conversão automática;
* validação;
* transformação de entrada/saída;
* serialização para JSON;
* integração com requests.

Exemplo sem biblioteca:

```php
class CriarUsuarioDTO
{
    public function __construct(
        public string $nome,
        public string $email
    ) {}
}
```

Com Laravel Data:

```php
use Spatie\LaravelData\Data;

class CriarUsuarioData extends Data
{
    public function __construct(
        public string $nome,
        public string $email
    ) {}
}
```

Agora você ganha coisas como:

```php
CriarUsuarioData::from($request);
```

Ele consegue transformar:

```json
{
    "nome": "Rafael",
    "email": "rafael@email.com"
}
```

em:

```php
CriarUsuarioData
```

---

Também pode gerar respostas:

```php
return UsuarioData::from($usuario);
```

Transformando um Model em uma resposta:

```json
{
    "id": 10,
    "nome": "Rafael"
}
```

---

## Laravel Data Objects

Esse termo é mais genérico.

Existem várias bibliotecas e abordagens para criar objetos de dados.

Algumas pessoas usam:

* classes próprias;
* `spatie/laravel-data`;
* objetos imutáveis;
* Value Objects.

A ideia é a mesma:

```php
class CriarPedidoDTO
{
    public function __construct(
        public int $clienteId,
        public array $itens
    ) {}
}
```

---

## Classes próprias

Muitas empresas simplesmente fazem isso:

```php
namespace App\DTO;

class CriarPlanoDTO
{
    public function __construct(
        public string $codigo,
        public string $nome,
        public int $valor
    ) {}
}
```

E pronto.

Não existe problema nisso.

Na verdade, para muitos sistemas, é suficiente.

---

## 2. Mas não vira excesso de classes?

Sim, esse é o principal risco.

Imagine um sistema pequeno:

```
UsuarioDTO
UsuarioCreateDTO
UsuarioUpdateDTO
UsuarioResponseDTO
UsuarioListDTO

ClienteDTO
ClienteCreateDTO
ClienteUpdateDTO
...
```

Você pode acabar com centenas de classes que só fazem:

```php
public string $nome;
public string $email;
```

E pouca utilidade real.

---

## Quando DTO vale a pena?

Eu usaria quando existe uma **fronteira entre contextos**.

Por exemplo:

### API → Aplicação

```text
JSON

↓

DTO

↓

Service
```

Aqui faz muito sentido.

Porque o JSON é um formato externo.

---

### Serviço interno → Serviço interno

Exemplo:

```text
PagamentoService

↓

DTO

↓

NotificacaoService
```

Também pode fazer sentido.

---

### Exportação/importação

No seu caso de planos de saúde:

Esse é um ótimo candidato.

Você tem:

```text
Arquivo Excel

↓

Processor

↓

Dados normalizados

↓

Service

↓

Banco
```

O DTO pode representar a informação já organizada.

Exemplo:

```php
class PlanoImportacaoDTO
{
    public function __construct(
        public string $codigoPlano,
        public string $nomePlano,
        public string $tipoContrato
    ) {}
}
```

O Service não precisa saber que veio de Excel.

---

## Quando eu NÃO usaria DTO?

Eu evitaria:

### Dentro do domínio

Exemplo:

```php
$pedido->calcularFrete(
    CalcularFreteDTO $dto
);
```

Normalmente não.

O domínio deveria trabalhar com conceitos do negócio:

```php
$pedido->calcularFrete();
```

---

### Para substituir Model

Errado:

```
UsuarioDTO
    ↓
UsuarioModel
```

onde o DTO é praticamente um espelho do banco.

Isso só adiciona código.

---

## DTO vs Request do Laravel

Essa é uma dúvida comum.

Muitos pensam:

> "Eu já tenho FormRequest. Preciso de DTO?"

São coisas diferentes.

### FormRequest

Responsável por:

* validar entrada HTTP.

Exemplo:

```php
email obrigatório
senha mínima
```

---

### DTO

Responsável por:

* transportar dados para a aplicação.

Exemplo:

```php
CriarUsuarioDTO
```

Fluxo:

```
HTTP Request

↓

FormRequest
(validar)

↓

DTO
(transportar)

↓

Service
(executar)
```

---

## Como eu usaria no seu caso

Pelo que você descreveu do seu sistema, eu não criaria DTO para cada Model.

Eu criaria nos pontos onde existe transformação.

Exemplo:

Hoje:

```
Excel
 ↓
Plano1Processor
 ↓
Array
 ↓
Service
```

Eu talvez mudaria para:

```
Excel
 ↓
Plano1Processor
 ↓
PlanoImportacaoDTO
 ↓
ImportacaoPlanoService
 ↓
Repository
```

O ganho é grande porque o Service recebe algo com significado.

---

## Uma regra prática que gosto

Antes de criar um DTO, pergunte:

> "Esse objeto representa uma informação atravessando uma fronteira?"

Se sim, DTO provavelmente faz sentido.

Exemplos de fronteiras:

* HTTP → aplicação;
* arquivo → aplicação;
* serviço → serviço;
* aplicação → API externa.

Se for apenas:

> "Preciso passar 3 parâmetros para uma função"

provavelmente um DTO é exagero.

---

## Ligando com os padrões que estudamos

Olha como as peças se encaixam:

```
Front Controller
        |
        ↓
Middleware
        |
        ↓
Controller
        |
        ↓
DTO  ← (contrato de dados)
        |
        ↓
Service Layer ← (caso de uso)
        |
        ↓
Domain Model ← (regras)
        |
        ↓
Repository ← (acesso ao domínio)
        |
        ↓
Data Mapper ← (persistência)
```

O DTO não é mais uma camada de negócio. Ele é uma **fronteira de comunicação**.

E, pelo seu histórico de trabalhar com sistemas legados PHP e agora estudar arquitetura mais limpa, eu diria que o maior benefício do DTO para você provavelmente não será "organizar classes", mas sim **impedir que arrays sem contrato espalhem informações pelo sistema**. Isso costuma ser uma das maiores fontes de fragilidade em aplicações PHP grandes.
