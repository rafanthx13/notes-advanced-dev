É aplicar Strategy para mudar o comportamento.

Imagine o seguinte: A casse Pagamento. Ela pode receber vários tipos de pegamento: Pix, boleto e etc

# GPT - Quando na verdade é Strategy/State ou Polimofrismo (!important)

Essa é uma ótima pergunta. Acho que agora consigo mostrar a diferença de forma bem concreta.

O segredo é este:

> **No Strategy, o comportamento é uma "peça" que você encaixa em um objeto. Ele não faz parte da identidade do objeto.**

Vou dar alguns exemplos.

---

## Exemplo 1 — Compactação de arquivos (Strategy clássico)

Imagine um programa que gera backups.

Você sempre tem um `BackupService`.

Mas ele pode compactar usando:

* ZIP
* RAR
* 7Z

O BackupService continua sendo o mesmo.

```php
$service = new BackupService(
    new ZipCompressionStrategy()
);

$service->backup();
```

Amanhã:

```php
$service = new BackupService(
    new SevenZipCompressionStrategy()
);
```

O BackupService não virou outro objeto.

Só mudou **como ele compacta**.

Esse é um Strategy clássico.

---

## Exemplo 2 — Ordenação

Imagine uma lista de funcionários.

Hoje quero ordenar:

* por nome

Depois:

* por salário

Depois:

* por idade

A lista continua sendo a mesma.

```php
$list->sort(new SortByNameStrategy());

$list->sort(new SortBySalaryStrategy());

$list->sort(new SortByAgeStrategy());
```

A lista não muda.

Só muda o algoritmo de ordenação.

---

## Exemplo 3 — GPS (o melhor exemplo)

O GPS sempre calcula uma rota.

Mas pode calcular:

* mais rápida
* mais curta
* evitar pedágio
* evitar balsa

```php
$gps->setRouteStrategy(
    new FastestRouteStrategy()
);

$gps->calculate();
```

Depois:

```php
$gps->setRouteStrategy(
    new CheapestRouteStrategy()
);

$gps->calculate();
```

O GPS continua sendo um GPS.

---

## Exemplo 4 — Criptografia

Você possui um serviço.

```php
EncryptionService
```

Hoje ele usa:

```text
AES
```

Amanhã:

```text
RSA
```

Depois:

```text
ChaCha20
```

O serviço continua igual.

Só muda o algoritmo.

---

## Agora compare com polimorfismo

Imagine isto.

```text
Animal

↓

Dog

Cat

Bird
```

Você nunca faria:

```php
$dog->setAnimalStrategy(...)
```

Porque um cachorro não muda de espécie.

---

## Compare com State

Imagine um pedido.

```text
Novo

↓

Pago

↓

Enviado
```

O pedido muda naturalmente de estado.

Você não escolhe isso.

É o fluxo do domínio.

---

## O que faz o Strategy ser especial?

Você escolhe qual algoritmo usar.

É uma decisão da aplicação.

```php
if ($cliente->isPremium()) {

    $strategy = new PremiumDiscount();

} else {

    $strategy = new NormalDiscount();
}

$order->setStrategy($strategy);
```

O pedido continua igual.

---

## Agora um exemplo que talvez exista na sua empresa

Suponha que o cálculo da coparticipação mudou.

Antes:

```
Plano A

↓

valor * 20%
```

Depois surgiu um cliente especial.

```
Plano A - Empresa XPTO

↓

valor * 15%
```

Você poderia fazer:

```php
CoparticipacaoCalculator
```

que recebe:

```php
NormalCalculationStrategy
```

ou

```php
EmpresaXPTOCalculationStrategy
```

Perceba:

O arquivo continua sendo:

```
ArquivoCoparticipacaoPlanoA
```

Ele não mudou de tipo.

Só mudou a regra de cálculo.

Aí eu diria:

> Agora sim você está usando Strategy.

---

## Uma frase que talvez faça "clicar"

No polimorfismo, você normalmente pergunta:

> **"Que objeto é esse?"**

No Strategy, você pergunta:

> **"Qual algoritmo esse objeto vai usar?"**

---

## E aqui está uma curiosidade...

Depois de tudo o que conversamos hoje, eu acho que descobri por que você quase nunca usa Strategy.

Seu sistema parece ser muito orientado a **tipos de documentos**.

Ou seja, você sempre está pensando:

```
Mensalidade

Coparticipação

Plano 1

Plano 2
```

Isso naturalmente leva ao **polimorfismo por subclasses**.

Strategy costuma aparecer quando o domínio possui **regras configuráveis**, **formas alternativas de cálculo** ou **algoritmos intercambiáveis**.

Por exemplo:

* diferentes formas de calcular juros;
* diferentes políticas de desconto;
* diferentes algoritmos de validação;
* diferentes formas de exportar o mesmo relatório;
* diferentes métodos de autenticação;
* diferentes algoritmos de criptografia.

Nesses casos, o objeto principal continua sendo o mesmo. O que muda é apenas a "peça" responsável por executar aquela parte do comportamento.

Essa, para mim, é a essência do Strategy.
