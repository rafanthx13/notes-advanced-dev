# Resumo

O **Specification Pattern** é uma forma de transformar **regras de negócio em objetos reutilizáveis**. Em vez de espalhar vários `if/else` pelo sistema, você cria uma classe que representa uma condição do negócio e pergunta a ela se algo atende ou não à regra.

Exemplo:

Antes:

```
if (
    $cliente->ativo &&
    $cliente->idade >= 18 &&
    !$cliente->inadimplente
) {
    contratarPlano();
}
```

Depois:

```
if ($clientePodeContratar->isSatisfiedBy($cliente)) {
    contratarPlano();
}
```

A regra fica isolada:

```
class ClientePodeContratarPlanoSpecification
{
    public function isSatisfiedBy(Cliente $cliente): bool
    {
        return 
            $cliente->ativo &&
            $cliente->idade >= 18 &&
            !$cliente->inadimplente;
    }
}
```

A classe responde uma pergunta:

> "Esse objeto satisfaz essa regra?"

## Benefícios
+ Remove regras espalhadas entre vários `ifs` do sistema
+ Permite reutilizar
+ Centraliza núcleo da regra (facilita mudança)

## Quando usar

+ ✅ Existem muitas regras de negócio condicionais.  
+ ✅ As regras mudam frequentemente.  
+ ✅ As mesmas regras aparecem em vários lugares.  
+ ✅ Os `if` começam a ficar grandes e difíceis de entender


# URLS

+ https://dev.to/horse_patterns/simplifying-business-rules-with-the-specification-pattern-4o4o

---
---
---
# GPT-001 : Fale sobre specification

O **Specification Pattern** é um padrão muito interessante porque ele resolve um problema que aparece bastante em sistemas corporativos: **regras de negócio de seleção e validação ficando espalhadas em `if` gigantes**.

Ele é muito associado a DDD (*Domain-Driven Design*) e costuma aparecer junto com **Domain Model**.

A ideia central:

> **Uma Specification encapsula uma regra de negócio que pode responder se um objeto satisfaz ou não determinada condição.**

Em outras palavras:

```text
Objeto atende a regra?
        |
        ↓
     true / false
```

---

## O problema que ele resolve

Imagine um sistema de plano de saúde.

Você tem uma regra:

> Um cliente pode contratar um plano se:
>
> * estiver ativo;
> * tiver idade mínima;
> * não possuir dívida;
> * o plano aceitar o perfil dele.

Um código comum seria:

```php
if (
    $cliente->ativo &&
    $cliente->idade >= 18 &&
    !$cliente->possuiDivida &&
    $plano->aceita($cliente)
) {
    contratar();
}
```

No começo parece tranquilo.

Mas depois aparecem mais regras:

```php
if (
    $cliente->ativo &&
    $cliente->idade >= 18 &&
    !$cliente->possuiDivida &&
    $cliente->documentoValido &&
    $cliente->cidadePermitida &&
    $cliente->temCarenciaCumprida &&
    ...
)
```

A regra ficou:

* difícil de ler;
* difícil de testar;
* difícil de reutilizar.

---

## A solução: Specification

Você cria uma classe:

```php
class ClientePodeContratarPlanoSpecification
{
    public function isSatisfiedBy(Cliente $cliente): bool
    {
        return 
            $cliente->ativo &&
            $cliente->idade >= 18 &&
            !$cliente->possuiDivida;
    }
}
```

Agora:

```php
if ($specification->isSatisfiedBy($cliente)) {
    contratar();
}
```

O código fica dizendo:

```text
Se o cliente satisfaz a regra de contratação, pode contratar.
```

Muito mais próximo do negócio.

---

## O ganho principal

A regra ganhou um nome.

Antes:

```php
if(
    ativo &&
    idade > 18 &&
    semDivida
)
```

O programador precisa interpretar.

Depois:

```php
ClientePodeContratarPlanoSpecification
```

O próprio nome explica.

---

## Specification também pode impedir ações

Ela não serve apenas para consultas.

Exemplo:

```php
public function contratarPlano(Cliente $cliente)
{
    if (!$this->specification->isSatisfiedBy($cliente)) {
        throw new ClienteNaoPodeContratarPlanoException();
    }

    // continua
}
```

Aqui conecta com nossa conversa sobre Exceptions.

---

## O poder maior: combinar Specifications

Essa é a parte mais interessante.

Você pode criar regras menores.

Exemplo:

```php
ClienteAtivoSpecification

MaiorDeIdadeSpecification

SemDividaSpecification
```

Cada uma:

```php
class ClienteAtivoSpecification
{
    public function isSatisfiedBy($cliente)
    {
        return $cliente->ativo;
    }
}
```

---

Agora combina:

```php
$specification =
    new ClienteAtivoSpecification()
        ->and(
            new MaiorDeIdadeSpecification()
        )
        ->and(
            new SemDividaSpecification()
        );
```

Resultado:

```text
Cliente ativo
    E
Maior de idade
    E
Sem dívida
```

---

## Um exemplo mais próximo do seu trabalho

Imagine importação de planos.

Você tem regras:

* plano deve existir;
* código deve estar ativo;
* data de vigência deve ser válida;
* operadora deve aceitar o plano.

Ao invés de:

```php
if (
    planoExiste &&
    ativo &&
    dataValida &&
    operadoraAceita
)
```

Você poderia ter:

```php
PlanoValidoParaImportacaoSpecification
```

ou:

```php
CodigoPlanoAtivoSpecification
```

---

## Specification vs Service

Essa é uma dúvida importante.

### Service

Representa uma ação/caso de uso.

Exemplo:

```php
ImportarPlanoService
ContratarPlanoService
CancelarContratoService
```

Ele coordena.

---

### Specification

Representa uma regra.

Exemplo:

```php
ClientePodeContratarPlanoSpecification
PlanoPodeSerImportadoSpecification
```

Ela responde uma pergunta.

---

Uma comparação:

Service:

> "Faça a contratação."

Specification:

> "Esse cliente pode contratar?"

---

## Specification vs Validator

Também são parecidos.

### Validator

Normalmente valida entrada:

```text
Email está preenchido?
Campo tem formato correto?
```

---

### Specification

Valida uma regra do domínio:

```text
Cliente tem direito ao plano?
Pedido pode ser cancelado?
```

---

## Onde ele fica na arquitetura?

Algo assim:

```text
Controller

↓

Service Layer

↓

Specification
       |
       ↓
Domain Model

↓

Repository
```

---

## Exemplo completo

```php
class ContratarPlanoService
{
    public function contratar(
        Cliente $cliente,
        Plano $plano
    ) {

        if (!$this->specification
                ->isSatisfiedBy($cliente)) {

            throw new ClienteNaoElegivelException();
        }


        $cliente->contratar($plano);

        $this->repository->save($cliente);
    }
}
```

---

## Quando usar?

Eu usaria quando:

✅ Existe uma regra de negócio complexa.
✅ A mesma regra aparece em vários lugares.
✅ Existem muitas combinações de critérios.
✅ Os `if` estão ficando difíceis de entender.

---

## Quando NÃO usar?

Não transforme qualquer `if` em Specification.

Exemplo:

```php
if($usuario->ativo)
```

provavelmente não precisa.

O padrão começa a valer quando você tem algo como:

```php
if(
    usuario ativo &&
    possui permissão &&
    contrato vigente &&
    região permitida &&
    limite disponível
)
```

---

## Ligando com o que você já faz

Pelo seu exemplo de `Plano1Processor`, eu imagino que você tenha várias regras específicas:

```text
Se arquivo Plano1:
    campo X obrigatório
    código Y válido
    data Z aceita
```

Algumas dessas validações podem virar Specifications.

Mas eu teria cuidado para não substituir seu `Processor`. O Processor continua sendo responsável por **transformar dados**; a Specification seria responsável por responder **se aquele dado atende uma regra de negócio**.

A frase para guardar:

> **Processor transforma. Repository busca/salva. Service coordena. Specification decide se uma regra é satisfeita.**



---
---
---

# GPT - 002: Meu case em que usei para reutilizar em vários ifs e que ficou fácil de modificar

Rafael, esse exemplo é **exatamente o tipo de situação que levou pessoas a criarem ideias como o Specification Pattern**. E a parte mais interessante é que você chegou na solução por necessidade prática, não porque conhecia o nome do padrão.

A resposta curta:

**Sim, você aplicou uma ideia muito próxima de Specification Pattern.**
Mas com uma pequena diferença: provavelmente você criou uma **Rule/Policy (regra de negócio)**, que é um conceito muito próximo e muitas vezes se mistura com Specification em DDD.

Vamos analisar.

---

## O problema original

Você tinha algo assim:

```php
if (
    $produto->tipo == 'X' &&
    $gerente->tipo == 'Y'
) {
    aplicarRegra();
}
```

Depois vem uma mudança:

```text
Produto A entra
Produto B sai
Produto C entra
Gerente D muda
```

E o código começa:

```php
if (...) {

}
elseif (...) {

}
elseif (...) {

}
elseif (...) {

}
```

Esse é um sinal clássico de que uma **regra de negócio está vazando para o fluxo da aplicação**.

---

## O que você fez

Você criou:

```php
class RegraR11
{
    private array $produtos = [
        ProdutoA,
        ProdutoB
    ];

    private bool $active = true;


    public function aplica($produto, $gerente)
    {
        if (!$this->active) {
            return false;
        }

        return in_array(
            $produto,
            $this->produtos
        );
    }
}
```

E o código ficou:

```php
if ($regraR11->aplica($produto, $gerente)) {
    aplicarRegra();
}
```

Isso tem várias características de Specification:

---

## 1. A regra ganhou um nome

Antes:

```php
if (
 produto == X &&
 gerente == Y
)
```

Depois:

```php
RegraR11
```

Agora o código fala a linguagem do negócio.

Isso é muito DDD.

---

## 2. A regra virou um objeto

Esse é o coração do Specification:

Antes:

```text
Regra = pedaço de código perdido
```

Depois:

```text
Regra = objeto
```

Você transformou uma decisão de negócio em uma entidade do sistema.

---

## 3. Ela responde uma pergunta

Uma Specification normalmente tem uma assinatura assim:

```php
isSatisfiedBy()
```

Algo como:

```php
$specification->isSatisfiedBy($produto);
```

A sua:

```php
$regraR11->aplica($produto, $gerente);
```

tem praticamente a mesma ideia.

A pergunta é:

> "Essa regra deve ser aplicada para esse contexto?"

Resposta:

```text
true / false
```

---

## Onde está a diferença?

Uma Specification pura normalmente tem um foco maior em:

> "Esse objeto satisfaz uma condição?"

Exemplo:

```php
ClienteElegivelParaPlanoSpecification
```

```php
isSatisfiedBy($cliente)
```

Já uma Rule/Policy muitas vezes responde:

> "Essa regra deve executar?"

Exemplo:

```php
RegraR11::aplica($produto, $gerente)
```

Mas na prática, em sistemas reais, esses conceitos se misturam bastante.

---

## O mais interessante: você criou uma Feature Flag simples

Você comentou:

> "tem um atributo active, então se eu quiser desativar temporariamente posso colocar false."

Isso é realmente uma feature flag simples.

Você fez:

```php
private bool $active = false;
```

e:

```php
if (!$this->active) {
    return false;
}
```

A diferença para uma feature flag profissional é a origem da configuração.

Você tem:

```text
Código
 |
 active = true
```

Uma feature flag tradicional:

```text
Banco / Config Server
 |
 active = true
```

ou:

```text
LaunchDarkly
Azure App Configuration
AWS AppConfig
```

Mas o conceito é o mesmo:

> controlar a ativação de uma funcionalidade/regra sem remover código.

---

## Inclusive, seu caso é um exemplo de evolução natural

Muitas empresas começam assim:

### Versão 1

```php
if(produto == X)
```

---

### Versão 2 (sua solução)

```php
RegraR11
```

---

### Versão 3 (sistema mais maduro)

```text
Rule Engine
       |
       |
       +-- RegraR11
       +-- RegraR12
       +-- RegraR13
```

Cada regra:

```php
interface BusinessRule
{
    public function applies(Context $context): bool;
    public function execute(Context $context): void;
}
```

---

## Uma coisa que achei interessante no seu relato

A maior evidência de que sua solução foi boa foi essa frase:

> "Depois de um tempo falaram para tirar um dos produtos dessa regra. Bastou tirar do array interno."

Esse é exatamente o objetivo de bons designs:

A mudança aconteceu no **lugar onde a regra vive**.

Um código ruim faria você procurar:

* Controller;
* Service;
* SQL;
* vários `if`;
* vários arquivos.

Um código melhor faz você abrir:

```php
RegraR11.php
```

e alterar:

```php
private array $produtos = [
    ProdutoA
];
```

---

## Eu faria apenas algumas melhorias

Pelo padrão que você criou, eu talvez mudaria o nome.

Em vez de:

```php
RegraR11
```

algo como:

```php
ProdutoEspecialParaGerenteSpecification
```

ou:

```php
AplicarBeneficioProdutoSpecification
```

Porque o nome R11 só faz sentido dentro da empresa.

E criaria uma interface:

```php
interface Specification
{
    public function isSatisfiedBy($context): bool;
}
```

Assim:

```php
class RegraR11 implements Specification
```

---

Então, resumindo:

**Sim, você aplicou Specification (ou uma variação muito próxima chamada Business Rule/Policy).** E mais importante: você identificou o problema que o padrão resolve — regras de negócio mutáveis espalhadas em `if/else` — antes mesmo de conhecer o padrão.

Esse tipo de situação é exatamente onde estudar padrões deixa de ser decorar nomes e passa a ser reconhecer "eu já tive esse problema antes, existe uma forma conhecida de estruturá-lo".



---
---
---

# GPT-003: 