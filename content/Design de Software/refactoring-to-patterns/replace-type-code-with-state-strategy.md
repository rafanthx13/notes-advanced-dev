
# GPT001 - O que é esse refactoring

Esse é um dos refactorings mais importantes do livro porque ele resolve um problema muito comum em sistemas corporativos: **objetos cujo comportamento depende de um código de tipo**.

A ideia é:

> **Se um atributo (`type`, `status`, `category`, etc.) está sendo usado para decidir comportamento com vários `if` ou `switch`, substitua esse código por objetos.**

O interessante é que o próprio nome já diz: você pode resolver isso com **State** ou **Strategy**. A escolha depende do domínio.

---

## O problema

Imagine uma classe assim:

```php
class Order
{
    public string $status;
}
```

E vários lugares do sistema fazem:

```php
if ($order->status == "NEW") {
    ...
}
else if ($order->status == "PAID") {
    ...
}
else if ($order->status == "CANCELLED") {
    ...
}
```

Ou:

```php
switch ($order->status) {
    case "NEW":
    case "PAID":
    case "CANCELLED":
}
```

O problema é que:

* o comportamento fica espalhado;
* cada novo status exige alterar vários `switch`;
* o sistema vai ficando cada vez mais difícil de manter.

---

## Antes

Imagine um pedido.

```php
class Order
{
    public function canCancel()
    {
        switch ($this->status) {
            case "NEW":
                return true;

            case "PAID":
                return false;

            case "CANCELLED":
                return false;
        }
    }
}
```

Depois aparece:

```text
DELIVERED
```

Você precisa alterar o método.

Depois outro método também usa o status.

Depois outro.

Logo existem 15 switches.

---

## Depois (State)

Cada estado vira uma classe.

```text
OrderState
    ▲
    │
NewState
PaidState
CancelledState
```

Cada uma implementa:

```php
abstract class OrderState
{
    abstract public function canCancel();
}
```

Agora:

```php
$order->state->canCancel();
```

Sem switch.

---

## Mas por que o nome fala Strategy também?

Porque nem todo `type` representa um **estado**.

Às vezes ele representa uma **forma de executar** alguma coisa.

Por exemplo:

```php
class Payment
{
    public string $type;
}
```

```text
PIX

BOLETO

CARTAO
```

Você pode modelar isso como:

```text
PaymentStrategy
```

porque são algoritmos diferentes de pagamento.

---

## Então quando usar State?

Quando o objeto muda ao longo da vida.

Exemplo:

```text
Pedido

↓

Novo

↓

Pago

↓

Enviado

↓

Entregue
```

O estado muda.

---

Outro exemplo:

```text
Conta

↓

Ativa

↓

Bloqueada

↓

Encerrada
```

Também muda.

Isso é State.

---

## Quando usar Strategy?

Quando o tipo não muda porque o objeto mudou de fase.

Ele apenas define uma forma de trabalhar.

Exemplo:

```text
Pagamento

↓

PIX

↓

Cartão

↓

Boleto
```

O pagamento não "evolui" de PIX para boleto.

Ele simplesmente usa um algoritmo.

---

## Um exemplo mais próximo do seu contexto

Imagine um arquivo.

Ele possui:

```text
tipo

↓

Mensalidade

↓

Coparticipação
```

A pergunta é:

Esse "tipo" muda durante a vida do objeto?

Provavelmente não.

Então não é State.

Pode ser Strategy...

...ou subclasses.

---

## Por que o livro fala "State/Strategy"?

Porque a refatoração não quer impor um padrão.

Ela quer apenas eliminar isto:

```php
switch ($obj->type)
```

Dependendo do significado daquele campo:

* vira State;
* vira Strategy.

---

## Benefícios

* Elimina `switch`.
* Facilita adicionar novos tipos.
* Cada comportamento fica isolado.
* Segue o Open/Closed Principle.

---

## Quando NÃO usar?

Nem todo código merece isso.

Por exemplo:

```php
if ($idade >= 18)
```

Não faz sentido criar:

```text
AdultState

MinorState
```

Só para evitar um if.

---

## Uma dica prática

Quando você encontrar:

```php
switch ($obj->status)
```

Pergunte:

> **Esse status representa uma fase da vida do objeto?**

Se sim:

→ State.

---

Quando encontrar:

```php
switch ($obj->tipo)
```

Pergunte:

> **Esse tipo representa apenas uma forma diferente de executar alguma coisa?**

Se sim:

→ Strategy.

---

### Um detalhe que conecta tudo o que conversamos

Você deve ter percebido que esse refactoring parece muito parecido com **Replace Conditional Tests with Polymorphism**.

E isso não é coincidência.

Na verdade, a relação é mais ou menos esta:

```text
Replace Conditional Tests with Polymorphism
                │
      ┌─────────┴─────────┐
      │                   │
  Subclasses         State / Strategy
```

Ou seja, **Replace Conditional Tests with Polymorphism** é uma ideia mais geral: "troque `if`/`switch` por polimorfismo". Já **Replace Type Code with State/Strategy** é um caso específico, voltado para quando o `if` depende de um **campo que representa um tipo ou estado**.

Por isso, depois da nossa conversa sobre o seu sistema de importação, eu não aplicaria esse refactoring diretamente. Você não tem um objeto com um atributo `tipo` que controla o comportamento; você já tem objetos diferentes (`MensalidadeProcessor`, `CoparticipacaoProcessor` etc.). Em outras palavras, você **já passou da etapa do "type code"**. Em vez de um único objeto com um campo `tipo`, você modelou o domínio com classes distintas, usando polimorfismo desde o início. Esse é, em geral, um design ainda mais alinhado com orientação a objetos.


# GPT0002 - Quando uso State? Pois no dseneovliemtno web é bem dificil algo que mude

Essa pergunta é excelente. E acho que encontrei o motivo pelo qual o padrão **State** nunca "clicou" para você.

Pelo que conversamos sobre o seu trabalho, você desenvolve principalmente **aplicações web tradicionais (PHP/Laravel/Zend)**.

Nesse tipo de aplicação, acontece o seguinte:

1. A requisição chega.
2. Você carrega o objeto do banco.
3. Executa uma operação.
4. Salva no banco.
5. A requisição termina.
6. Toda a memória é destruída.

Ou seja, o objeto quase nunca fica vivo por muito tempo.

Por isso, você dificilmente vê um objeto mudando de estado várias vezes na memória.

---

## Onde o State nasceu?

O padrão State ficou famoso em programas que permanecem executando por muito tempo.

Por exemplo:

* Jogos
* Interfaces gráficas (desktop)
* Robôs
* Máquinas industriais
* Caixas eletrônicos
* Editores de texto
* Sistemas embarcados

Nesses casos, o mesmo objeto pode existir por horas.

---

## Exemplo: um jogador de videogame

Imagine um personagem.

```text
Idle
↓
Running
↓
Jumping
↓
Falling
↓
Idle
```

O objeto continua sendo o mesmo.

```php
$player
```

Mas seu estado muda constantemente.

Sem State:

```php
if ($player->state == "RUNNING") {

}

if ($player->state == "JUMPING") {

}

if ($player->state == "FALLING") {

}
```

Com State:

```php
$player->update();
```

Cada estado sabe o que fazer.

---

## Outro exemplo: caixa eletrônico

```text
Sem cartão

↓

Cartão inserido

↓

Senha digitada

↓

Operação escolhida

↓

Dinheiro sendo entregue
```

O ATM muda de estado.

Cada estado aceita ações diferentes.

---

## Outro exemplo: pedido de comida

Imagine um sistema do iFood.

```text
Pedido

↓

Criado

↓

Pago

↓

Preparando

↓

Saiu para entrega

↓

Entregue
```

Aqui já começa a parecer um sistema web.

---

Sem State:

```php
if ($pedido->status == "CRIADO") {

}

if ($pedido->status == "PAGO") {

}
```

Com State:

```php
$pedido->cancel();
```

Quem decide se pode cancelar é o estado atual.

---

## Mas no PHP isso também acontece?

Sim.

Só que de uma forma diferente.

Imagine:

```php
$pedido = $repository->find($id);
```

Ele veio do banco como:

```text
status = PAID
```

Você cria o objeto:

```php
Order
```

Dentro dele existe:

```php
PaidState
```

Agora alguém chama:

```php
$pedido->ship();
```

O estado muda.

```php
$this->state = new ShippedState();
```

Depois você salva.

```php
$repository->save($pedido);
```

Na próxima requisição, quando carregar novamente do banco, ele já virá com:

```text
status = SHIPPED
```

Então, mesmo que o objeto em memória viva só alguns milissegundos, o conceito de estado continua existindo.

---

## Mas vale a pena?

Na maioria dos sistemas web...

**Não.**

E isso é importante.

Imagine um Pedido com três estados.

```php
if ($pedido->status == Status::PAGO)
```

Isso é totalmente aceitável.

Criar:

```text
PaidState

CancelledState

DeliveredState
```

talvez seja exagero.

Martin Fowler fala bastante sobre isso.

Nem todo `status` merece virar State.

---

## Quando eu realmente usaria?

Quando cada estado possui muito comportamento.

Imagine:

```text
Novo
```

Pode:

* cancelar
* editar
* adicionar itens

---

```text
Pago
```

Pode:

* emitir nota
* solicitar reembolso

---

```text
Enviado
```

Pode:

* rastrear
* confirmar entrega

---

```text
Cancelado
```

Pode:

* nada
* apenas consultar

Agora existem dezenas de regras.

O State começa a fazer sentido.

---

## Um exemplo do seu contexto

Vamos imaginar um arquivo de importação.

Hoje ele pode estar:

```text
Recebido

↓

Validando

↓

Importando

↓

Finalizado

↓

Erro
```

Cada estado permite operações diferentes.

Por exemplo:

```text
Recebido
```

Pode:

* excluir
* validar

---

```text
Importando
```

Não pode:

* excluir

---

```text
Finalizado
```

Pode:

* gerar relatório

---

```text
Erro
```

Pode:

* reprocessar

Se você começar a espalhar isso pelo sistema:

```php
if ($arquivo->status == VALIDANDO)

if ($arquivo->status == FINALIZADO)

if ($arquivo->status == ERRO)
```

em vários lugares, aí o State começa a ser uma boa alternativa.

---

## Acho que aqui está o principal insight

Você imaginou o State como:

> "Um objeto que fica horas na memória mudando de estado."

Isso realmente acontece em jogos e aplicações desktop.

Mas em sistemas web, o mais comum é pensar assim:

* O **estado persiste no banco**.
* A cada requisição, você recria o objeto já no estado correto.
* Durante aquela operação, ele pode até mudar de estado uma vez (por exemplo, de `Pago` para `Enviado`), e depois você persiste essa mudança.

Então o padrão **State não depende de o objeto viver muito tempo na memória**. Ele depende de uma coisa muito mais importante: **o comportamento da classe variar conforme seu estado atual**.

É por isso que, apesar de existir em aplicações web, ele é bem menos frequente do que padrões como **Factory**, **Template Method**, **Builder** ou **Strategy**. Em muitos sistemas corporativos, um `enum Status` e alguns `if` bem localizados são suficientes. O State só costuma valer a pena quando as regras por estado começam a crescer e se espalhar pelo código.

# GPT003- E qual a relaçao com o strategy `replace-conditional-logic-with-strategy`

Sim! E essa é uma observação muito perspicaz.

Na verdade, **`replace-type-code-with-state-strategy`** e **`replace-conditional-logic-with-strategy`** são muito parecidos. A diferença está **no que está causando o `if`**.

Vou comparar os dois.

|Refactoring|O `if` existe por causa de...|Solução|
|---|---|---|
|`replace-conditional-logic-with-strategy`|Um algoritmo que pode variar|Criar uma Strategy|
|`replace-type-code-with-state-strategy`|Um atributo `type` ou `status` que controla o comportamento|Substituir o atributo por um objeto State ou Strategy|

---

## 1. Replace Conditional Logic with Strategy

Você tem um código assim:

```php
if ($paymentMethod == "PIX") {
    ...
} elseif ($paymentMethod == "CARD") {
    ...
}
```

Aqui o problema é:

> **Existem vários algoritmos para realizar a mesma tarefa.**

Você cria:

```text
PaymentStrategy
    ↑
PixStrategy
CardStrategy
```

---

## 2. Replace Type Code with State/Strategy

Agora imagine uma classe assim:

```php
class Order
{
    public string $status;
}
```

E vários métodos fazem:

```php
if ($this->status == "PAID") {
    ...
}

if ($this->status == "CANCELLED") {
    ...
}
```

Aqui o problema é outro:

> **O comportamento da própria classe depende de um atributo (`status`).**

Então você substitui esse atributo por um objeto:

```text
Order
    ↓
OrderState
```

---

## A diferença filosófica

Essa é a parte mais interessante.

### Replace Conditional Logic with Strategy

Você olha para um método e pensa:

> "Esse algoritmo varia."

Então extrai o algoritmo.

---

### Replace Type Code with State/Strategy

Você olha para uma classe e pensa:

> "Esse atributo está mandando demais na classe."

Então elimina o atributo como controlador de comportamento.

---

## Um exemplo

Imagine isto:

```php
class Employee
{
    public string $type;
}
```

Depois aparece:

```php
public function calculateSalary()
{
    switch ($this->type) {
        case 'MANAGER':
        case 'DEVELOPER':
        case 'INTERN':
    }
}
```

O livro diria:

> Faça `replace-type-code-with-state-strategy`.

Porque o problema é o campo `type`.

---

Agora outro exemplo:

```php
class SalaryCalculator
{
    public function calculate(Employee $employee)
    {
        switch ($employee->contractType) {
            ...
        }
    }
}
```

Aqui eu provavelmente diria:

> Faça `replace-conditional-logic-with-strategy`.

Porque o problema está no algoritmo de cálculo.

---

## A verdade é...

Vou contar uma coisa que talvez você não encontre explicitamente no livro.

Esses refactorings **não têm fronteiras rígidas**.

Muitas vezes você pode olhar para o mesmo código e dizer:

> "Vou resolver com Strategy."

Outra pessoa dirá:

> "Vou substituir o type code."

E as duas soluções ficarão muito parecidas.

---

## Minha forma de diferenciar

Eu faço esta pergunta:

### O `if` está controlando o comportamento de um objeto por causa de um atributo dele?

```php
$order->status
```

↓

Penso em **Replace Type Code with State/Strategy**.

---

### O `if` está apenas escolhendo um algoritmo?

```php
$discountType
```

↓

Penso em **Replace Conditional Logic with Strategy**.

---

## No fundo...

Você percebeu algo importante:

**Os dois quase sempre terminam em Strategy.**

Isso acontece porque **"Replace Type Code with State/Strategy" é um caso mais específico**.

Ele começa dizendo:

> "Tenho um atributo (`type`, `status`, `category`...)."

E termina dizendo:

> "Transforme esse atributo em um objeto (State ou Strategy)."

Já o outro é mais genérico:

> "Tenho uma lógica condicional."

↓

"Extraia essa lógica para uma Strategy."

Então você pode pensar assim:

```text
Replace Conditional Logic with Strategy
            ▲
            │
            └────── inclui vários casos
                     │
                     └── Replace Type Code with State/Strategy
```

Ou seja, o segundo é praticamente uma especialização do primeiro. É por isso que eles parecem tão parecidos e, muitas vezes, acabam levando a uma estrutura de código muito semelhante.