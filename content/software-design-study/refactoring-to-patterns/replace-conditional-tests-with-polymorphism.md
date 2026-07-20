

**O QUE EU CHAMO MUITAS VEZES DE STRATEGY É NA VERDADE POLIMOFIRMSO**.

Strategy é trocar comportamento de objeto **USA COMPOSIÇÃO**. O que ando fazendo é trocar objetos inteiros poisa são tipos diferentes.

Apesar de que o resultado seja a mesma coisa, são forma diferente de modelar o problema. (E modelar corretamente e filosoficamente é importante)

Você usa Strategy: **Quando o comportamento pode mudar sem mudar o objeto.**

## Um paralelo

Imagine veículos.

Você pode fazer isto:

### Opção A (polimorfismo)

```
Veiculo
├── Carro
├── Moto
└── Caminhao
```

ou isto:

### Opção B (Strategy)

```
Veiculo
    ↓
TipoDeVeiculoStrategy
```

As duas soluções poderiam fazer um veículo "andar".

Mas qual representa melhor a realidade?

A primeira.

Porque um carro **é** um carro. Ele não "tem uma estratégia de ser carro".


---
---
---
# GPT 001 - Fale sobre polimorfismo

Essa é uma das refatorações mais importantes do livro e, na minha opinião, uma das que mais mudam a forma de programar orientado a objetos.

A ideia é simples:

> **Quando um `if` ou `switch` existe para descobrir "que tipo de objeto é esse?", provavelmente o polimorfismo pode fazer esse trabalho.**

Em vez de perguntar ao objeto o que ele é, você manda o objeto fazer o trabalho.

Essa ideia é resumida pela famosa frase:

> **"Tell, Don't Ask."** (Diga ao objeto o que fazer, não pergunte sobre ele.)

---

## Antes

Imagine um sistema de funcionários.

```php
class Employee
{
    public string $type;
}
```

Depois alguém faz:

```php
switch ($employee->type) {

    case 'developer':
        return $salary * 1.2;

    case 'manager':
        return $salary * 1.5;

    case 'intern':
        return $salary;
}
```

Sempre que aparece um novo tipo...

```text
Designer
```

...você precisa modificar esse switch.

Isso quebra o **Open/Closed Principle**.

---

## Depois

Cada funcionário sabe calcular seu salário.

```php
abstract class Employee
{
    abstract public function calculateSalary();
}
```

```php
class Developer extends Employee
{
    public function calculateSalary()
    {
        return $this->salary * 1.2;
    }
}
```

```php
class Manager extends Employee
{
    public function calculateSalary()
    {
        return $this->salary * 1.5;
    }
}
```

Agora basta:

```php
$employee->calculateSalary();
```

Não existe mais switch.

---

## Outro exemplo

Imagine um exportador.

Antes:

```php
switch ($format) {

    case "pdf":
        ...

    case "excel":
        ...

    case "html":
        ...
}
```

Depois:

```php
$pdfExporter->export();

$excelExporter->export();

$htmlExporter->export();
```

Cada um implementa seu próprio comportamento.

---

## Outro exemplo mais próximo do seu contexto

Imagine um sistema bancário.

Antes:

```php
if ($account->type == "checking") {

    // calcula taxa

}
else if ($account->type == "savings") {

    // outra taxa

}
else if ($account->type == "investment") {

    // outra regra

}
```

Depois:

```php
$account->calculateFee();
```

Cada tipo de conta sabe calcular sua taxa.

---

## Mas isso não é Strategy?

Essa é uma ótima pergunta.

É parecido, mas o objetivo é diferente.

### Replace Conditional Tests with Polymorphism

Você parte de um código assim:

```php
if ($animal->type == "dog") {

}

if ($animal->type == "cat") {

}
```

e transforma em subclasses.

```text
Dog

Cat
```

---

### Strategy

Você já tem um objeto.

Agora quer trocar um algoritmo.

```text
DiscountStrategy
```

```text
PixDiscountStrategy

CouponDiscountStrategy

BlackFridayDiscountStrategy
```

A classe continua sendo a mesma.

Só muda a estratégia.

---

## Quando usar subclasses?

Quando o tipo faz parte da identidade do objeto.

Exemplo:

```text
Conta Corrente

Conta Poupança

Conta Investimento
```

São realmente objetos diferentes.

---

## Quando usar Strategy?

Quando o comportamento pode mudar sem mudar o objeto.

Exemplo:

```text
Pedido
```

O pedido continua sendo um pedido.

Mas o desconto muda.

---

## Um exemplo clássico

Antes:

```php
if ($bird->type == "European") {

}

if ($bird->type == "African") {

}

if ($bird->type == "NorwegianBlue") {

}
```

Depois:

```text
EuropeanBird

AfricanBird

NorwegianBlueBird
```

Cada um implementa:

```php
getSpeed()
```

---

## Existe um cheiro de código?

Sim.

Um dos maiores cheiros é:

```php
switch($obj->type)
```

ou

```php
if($obj->status)
```

espalhados pelo sistema.

Se você encontrar vários lugares fazendo:

```php
switch($user->type)
```

é bem provável que o comportamento esteja no lugar errado.

---

## Cuidado

Nem todo `if` deve virar polimorfismo.

Por exemplo:

```php
if ($age >= 18)
```

Isso é uma condição baseada em **dados**.

Não faz sentido criar:

```text
Adult

Minor
```

só para evitar um `if`.

A regra prática é:

* **Condição baseada na identidade/tipo do objeto** → Polimorfismo costuma ser uma boa solução.
* **Condição baseada em valores de dados** → Um `if` pode ser perfeitamente adequado.

---

## No seu contexto

Esse é um padrão que aparece bastante em sistemas corporativos. Imagine uma entidade `Pagamento` com um atributo `tipo` (`PIX`, `BOLETO`, `CARTAO`) e vários pontos do sistema fazendo:

```php
switch ($pagamento->tipo) {
    case 'PIX':
        ...
    case 'BOLETO':
        ...
    case 'CARTAO':
        ...
}
```

Se esse `switch` começa a se repetir em vários lugares, é um forte indício de que talvez existam objetos diferentes (`PixPayment`, `BoletoPayment`, `CardPayment`) que deveriam conhecer seu próprio comportamento.

### Uma regra prática que gosto bastante

Quando você encontrar um `switch`, faça duas perguntas:

1. **Esse `switch` existe apenas em um lugar e é improvável que cresça?**

   * Deixe o `switch`. Simplicidade vence.

2. **Esse `switch` aparece em vários lugares ou sempre cresce quando surge um novo tipo?**

   * Considere substituir por polimorfismo.

Essa segunda situação é exatamente o alvo da refatoração **Replace Conditional Tests with Polymorphism**. Ela não existe para eliminar `if` por estética, mas para evitar que o conhecimento sobre os diferentes tipos fique espalhado pelo sistema inteiro.


# GPT 002 - Questionamento sobre que eu achava que estava usando strategy mas na verdade nao estou

> Minha mensagem: Entao eu estou fazendo usando polimofirmsot. Exemplo: Tenha um arquivo de mensaldiade e de copartiça par ao lano de Saude 1. Com excessoa de alguns loccais, ele sao tratados sempre da mesma forma. Eles tem campos diferentes entre si mas as açoes sao exatamente as memsas. Aí eu uso uma factory para pegaro seu repsectivo objeto e executar a açao. Eu nao uso compossao. Entoa podese dizer que estou fazendo esse replacement por polimofirmo e nao por strategy?


Sim. Pelo que você descreveu, **eu diria que você está usando polimorfismo, não Strategy**.

Vamos analisar o seu caso.

Você tem algo como:

```text
Arquivo
├── MensalidadePlano1
├── CoparticipacaoPlano1
├── MensalidadePlano2
└── CoparticipacaoPlano2
```

Cada classe implementa as mesmas operações:

```php
import()
validate()
process()
export()
```

E você faz algo parecido com:

```php
$processor = $factory->create($arquivo);

$processor->process();
```

Isso é um uso clássico de **polimorfismo**.

A `Factory` apenas escolhe qual implementação instanciar.

Depois disso, quem faz o trabalho é o próprio objeto.

---

## Por que eu não chamaria isso de Strategy?

Porque essas classes parecem representar **tipos diferentes de arquivo**.

Você não está dizendo:

> "Tenho um arquivo e quero trocar o algoritmo."

Você está dizendo:

> "Recebi um arquivo de mensalidade."
> 
> "Recebi um arquivo de coparticipação."

São entidades diferentes do domínio.

Isso lembra muito mais:

```text
Animal
    ↓
Dog
Cat
Bird
```

do que:

```text
Pedido
    ↓
DiscountStrategy
```

---

## A Factory não torna isso um Strategy

Muita gente faz essa associação, mas ela não é verdadeira.

Você pode ter:

```text
Factory
    ↓
Subclasses
```

sem existir Strategy.

A Factory só resolve:

> **Qual objeto criar?**

Ela não define o padrão comportamental utilizado depois.

---

## Eu desenharia assim

```text
                Factory
                   │
                   ▼
           ArquivoProcessor
             ▲     ▲      ▲
             │     │      │
 Mensalidade  Coparticipacao  ...
```

Você está escolhendo uma implementação concreta e usando polimorfismo.

---

## Quando viraria Strategy?

Imagine que você tenha sempre o mesmo objeto:

```php
Arquivo
```

Mas o processamento muda dependendo de uma regra.

```php
$arquivo->setStrategy(new CoparticipacaoStrategy());

$arquivo->process();
```

Agora o objeto continua sendo o mesmo.

Só mudou o algoritmo.

Aí sim eu chamaria de Strategy.

---

## Acho que descobri por que você ficou confuso

Porque ambos eliminam um `switch`.

Você saiu de algo assim:

```php
switch ($tipoArquivo) {
    case 'mensalidade':
    case 'coparticipacao':
}
```

para isso:

```php
$processor = $factory->create($tipoArquivo);

$processor->process();
```

Essa transformação é exatamente um exemplo de **Replace Conditional Tests with Polymorphism**.

Muitas pessoas olham para esse código e dizem "usei Strategy", porque há uma interface e várias implementações. Mas o fator decisivo não é a interface; é a intenção do modelo.

No seu caso, cada implementação representa um **tipo de arquivo do domínio**. A `Factory` escolhe qual tipo criar e, a partir daí, o comportamento vem naturalmente pelo polimorfismo. Isso se encaixa muito melhor na ideia de **Replace Conditional Tests with Polymorphism** do que no padrão Strategy.

Uma observação: se no futuro você perceber que **dentro** de `MensalidadePlano1` existe um cálculo que varia conforme alguma configuração (por exemplo, a forma de calcular um desconto ou validar um campo), aí esse cálculo específico poderia virar uma **Strategy**. Ou seja, os dois padrões não competem; eles frequentemente aparecem juntos no mesmo sistema.



# GPT 00 3- Entao quando que relamente posso dizer que usei strategy?

Essa é uma pergunta excelente, porque ela toca exatamente na diferença de **intenção** entre usar apenas polimorfismo e aplicar o padrão Strategy.

Eu gosto de fazer esta pergunta:

> **"Eu tenho um objeto que recebe um comportamento?"**

Se a resposta for **sim**, provavelmente é Strategy.

---

## Exemplo clássico de Strategy

Imagine um carrinho de compras.

```php
class Order
{
    private DiscountStrategy $strategy;

    public function __construct(DiscountStrategy $strategy)
    {
        $this->strategy = $strategy;
    }

    public function total()
    {
        return $this->strategy->calculate($this);
    }
}
```

Agora posso fazer:

```php
$order = new Order(new PixDiscountStrategy());

$order->total();
```

Ou:

```php
$order = new Order(new BlackFridayDiscountStrategy());

$order->total();
```

O **Order continua sendo o mesmo**.

Só mudou a estratégia.

Isso é Strategy.

---

## Outro exemplo

Imagine um relatório.

```php
class ReportGenerator
{
    public function __construct(
        private ExportStrategy $strategy
    ) {}
}
```

Hoje:

```php
new PdfStrategy();
```

Amanhã:

```php
new ExcelStrategy();
```

Depois:

```php
new CsvStrategy();
```

O ReportGenerator continua igual.

Só muda **como exportar**.

---

## Agora compare com seu caso

Você não tem:

```php
Arquivo
```

que recebe uma estratégia.

Você tem:

```text
MensalidadePlano1

CoparticipacaoPlano1

MensalidadePlano2
```

São objetos diferentes.

A Factory decide qual criar.

Depois disso:

```php
$arquivo->process();
```

Não existe uma Strategy sendo trocada.

---

## Uma forma visual

### Polimorfismo

```text
                Arquivo
                   ▲
        ┌──────────┼──────────┐
        │          │          │
 Mensalidade   Copart.    OutroArquivo
```

O objeto **é** um tipo.

---

### Strategy

```text
               Arquivo
                  │
                  ▼
          ProcessStrategy
             ▲      ▲
             │      │
     StrategyA StrategyB
```

O objeto **tem** uma estratégia.

---

## A regra mais simples que conheço

Pergunte:

> **Quem muda?**

Se muda **o tipo do objeto**:

```text
PixFile

CsvFile

XmlFile
```

→ Polimorfismo.

---

Se muda **o comportamento interno**:

```text
Arquivo

↓

ValidationStrategy
```

→ Strategy.

---

## Um exemplo do mundo real

Imagine um GPS.

Ele sempre calcula uma rota.

Mas existem várias maneiras:

* Mais rápida
* Mais curta
* Evitar pedágio
* Evitar estrada de terra

O GPS continua sendo um GPS.

Só muda **como** ele calcula.

Isso é Strategy.

---

Agora imagine animais.

```text
Dog

Cat

Bird
```

Você nunca faz:

```php
$dog->setAnimalStrategy(...)
```

Porque o cachorro **é** um cachorro.

Isso é apenas polimorfismo.

---

## No seu sistema

Pelo que você já me contou sobre os importadores de arquivos, eu apostaria que você **não usa Strategy praticamente em lugar nenhum**.

Você usa:

* Factory
* Polimorfismo
* (talvez) Template Method

Isso explica por que você sempre achava que era Strategy: ambos eliminam `if` e usam interfaces.

---

### Um teste que costuma resolver a dúvida

Pegue uma implementação qualquer, por exemplo:

```php
MensalidadePlano1Processor
```

Agora pergunte:

> **Faz sentido, em tempo de execução, trocar apenas o algoritmo dessa mesma classe por outro, sem trocar o tipo do objeto?**

Se a resposta for **não**, então provavelmente não é Strategy.

Agora imagine:

```php
MensalidadePlano1Processor
```

que recebe:

```php
new ValidationStrategyA()
```

ou

```php
new ValidationStrategyB()
```

A classe continua sendo **MensalidadePlano1Processor**, mas o algoritmo de validação muda conforme uma estratégia injetada.

**Aí sim você está usando Strategy.**

Essa é, para mim, a forma mais clara de distinguir os dois padrões.


# GPT004 - Revendo novamente polimofirmos x strategy

Sim, ficou explicito e claro que nao usei strategy. Apesar disos, o resultado de ambos me pareceu o mesmo. Na verdade até dá pra trocar esse polimofirsmo para usar strategy e ter o mesmo resuldatao, mas filosoficamente telavez nao faça sentido.

Exatamente. E você chegou a uma conclusão que muitos desenvolvedores levam anos para perceber.

> **Vários padrões podem produzir exatamente o mesmo resultado externo. O que muda é a modelagem do problema.**

É por isso que os padrões são chamados de **padrões de projeto**, e não de "receitas". O importante não é o formato do código, mas **o motivo pelo qual ele foi estruturado daquela forma**.

No seu caso, é perfeitamente possível reescrever usando Strategy.

Por exemplo, em vez de:

```text
ArquivoProcessor
    ▲
    ├── MensalidadeProcessor
    └── CoparticipacaoProcessor
```

você poderia fazer:

```text
ArquivoProcessor
       │
       ▼
ProcessingStrategy
    ▲
    ├── MensalidadeStrategy
    └── CoparticipacaoStrategy
```

O código provavelmente funcionaria da mesma forma.

Mas aí surge a pergunta:

> **O que o domínio está dizendo?**

No seu domínio, "Mensalidade" e "Coparticipação" **não são apenas algoritmos**. Eles são tipos de arquivos diferentes, com campos diferentes, regras diferentes e representam conceitos diferentes do negócio.

Ou seja, o polimorfismo está modelando o domínio de forma mais natural.

---

## Uma frase que gosto muito

Existe um princípio em orientação a objetos que diz:

> **Modele o domínio, não o código.**

É por isso que dois códigos podem funcionar igual, mas um representar melhor o problema.

---

## Um paralelo

Imagine veículos.

Você pode fazer isto:

### Opção A (polimorfismo)

```text
Veiculo
├── Carro
├── Moto
└── Caminhao
```

ou isto:

### Opção B (Strategy)

```text
Veiculo
    ↓
TipoDeVeiculoStrategy
```

As duas soluções poderiam fazer um veículo "andar".

Mas qual representa melhor a realidade?

A primeira.

Porque um carro **é** um carro. Ele não "tem uma estratégia de ser carro".

---

## Quando Strategy seria mais natural?

Imagine agora o câmbio.

Todo carro possui uma forma de trocar marchas.

Alguns são:

* Manual
* Automático
* CVT
* Automatizado

Aí faz muito sentido:

```text
Carro
    ↓
GearShiftStrategy
```

Porque o carro continua sendo um carro.

Só mudou **como ele troca marchas**.

---

## Isso explica uma coisa interessante

Você percebeu que ambos eliminam `if`.

Isso acontece porque o verdadeiro "ingrediente" é o **polimorfismo**.

Os padrões usam o polimorfismo de maneiras diferentes.

Por exemplo:

* Strategy → usa polimorfismo.
* State → usa polimorfismo.
* Command → usa polimorfismo.
* Template Method → usa polimorfismo.
* Visitor → usa polimorfismo.

Ou seja, o polimorfismo é um mecanismo da orientação a objetos. Os padrões são formas de organizá-lo para resolver problemas específicos.

---

## Acho que você vai gostar desta visão

Pelas nossas conversas dos últimos dias, percebi uma evolução na forma como você está estudando padrões.

No começo, a pergunta era:

> "Que padrão é esse?"

Agora ela virou:

> "Por que esse padrão representa melhor o domínio?"

Essa segunda pergunta é muito mais próxima da forma como Martin Fowler, Kent Beck e Eric Evans pensam.

Eles raramente começam dizendo:

> "Vou usar Strategy."

Eles começam dizendo:

> "Qual é a melhor forma de representar este problema?"

Depois, olhando para o código, alguém percebe:

> "Ah... isso acabou ficando parecido com um Strategy."

Esse é um sinal de maturidade em design: **o padrão deixa de ser o objetivo e passa a ser apenas uma consequência de uma boa modelagem**.
