# M.Folwer Refactoring - 01  - Refatoração: Primeiro exemplo

## Descrição do programa inicial

Pense em uma companhia de atores de teatro que saia para participar de vários eventos apresentando suas peças. Em geral, os clientes solicitarão algumas peças e a companhia cobrará deles com base no número de espectadores e no tipo de peça encenada. Atualmente há dois tipos de peças que a companhia apresenta: tragédias e comédias. Além de apresentar uma conta pela apresentação, a companhia dá “créditos por volume” aos seus clientes, os quais podem ser usados como descontos em futuras apresentações – pense nisso como um mecanismo de fidelização do cliente.

Os atores armazenam dados sobre suas peças em um arquivo JSON simples semelhante a este: plays.json...

```json
{
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You Like It", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
}
```

Os dados para as contas também estão em um arquivo JSON:
invoices.json...

```json
[
    {
        "customer": "BigCo",
        "performances": [
            {
            "playID": "hamlet",
            "audience": 55
            },
            {
            "playID": "as-like",
            "audience": 35
            },
            {
            "playID": "othello","audience": 40
            }
        ]
    }
]
```

O código que exibe a conta está na função simples a seguir:

```js
function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    }).format;
    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let thisAmount = 0;
        switch (play.type) {

            case "tragedy":
                thisAmount = 40000;
                if (perf.audience > 30) {
                    thisAmount += 1000 * (perf.audience - 30);
                }
                break;

            case "comedy":
                thisAmount = 30000;
                if (perf.audience > 20) {
                    thisAmount += 10000 + 500 * (perf.audience - 20);
                }
                thisAmount += 300 * perf.audience;
                break;

            default:
                throw new Error(`unknown type: ${play.type}`);
        }

        // soma créditos por volume
        volumeCredits += Math.max(perf.audience - 30, 0);

        // soma um crédito extra para cada dez espectadores de comédia
        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
        // exibe a linha para esta requisição
        result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }
    result += `Amount owed is ${format(totalAmount/100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
}
```

A execução desse código nos arquivos de dados de teste anteriores resulta na
seguinte saída:

```
Statement for BigCo
Hamlet: $650.00 (55 seats)
As You Like It: $580.00 (35 seats)
Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
```

## Comentários sobre o programa inicial

**E se eu quiser mudar essa funçâo**

Considerando que o programa funciona, qualquer afirmação sobre a sua estrutura não seria apenas um julgamento estético, ou uma demonstração de desgosto por um código “feio”? Afinal de contas, o compilador não se importa se o código é feio ou claro. Todavia, se altero o sistema, há um ser humano envolvido, e os seres humanos se importam. Um sistema com design ruim é difícil de ser alterado – porque é difícil identificar o que deve ser modificado e como essas modificações interagirão com o código existente para termos o comportamento desejado. E se for difícil identificar o que deve ser alterado, há uma boa chance de que vou cometer erros e introduzir bugs.

**E se eu quise-se adicionar uma funcionaldiade**

se eu tiver de modificar um programa com centenas de linhas de código, preferiria que ele estivesse estruturado na forma de um conjunto de funções e de outros elementos de programa que me permitissem compreender mais facilmente o que o programa faz. Se o programa não estiver estruturado, em geral será mais fácil para mim conferir-lhe uma estrutura antes, e então fazer a alteração necessária.

> **Se você tiver de acrescentar uma funcionalidade em um programa, mas ocódigo não está estruturado de modo conveniente, refatore-o antes para > que seja mais fácil acrescentar a funcionalidade, e então a acrescente.**

Nesse exemplo, tenho duas modificações que os usuários gostariam de fazer.

**1 - mod - Inseir opçao de output em HTML**

Em primeiro lugar, eles querem que o demonstrativo seja exibido em HTML. Considere o impacto que essa modificação teria. Estou diante de uma situação que exigiria colocar instruções condicionais extras em torno de cada instrução que acrescente uma string no resultado. Isso adicionará uma série de complexidades à função. Diante disso, a maioria das pessoas preferirá copiar o método e alterá-lo para que gere HTML. Fazer uma cópia não parece uma tarefa muito custosa, mas criará todo tipo de problemas no futuro. Qualquer mudança na lógica de cobrança me forçaria a atualizar os dois métodos – e garantir que sejam atualizados de forma consistente. Se eu estivesse escrevendo um programa que não mudasse nunca, esse tipo de operação de copiar e colar não seria um problema. Porém, se for um programa com vida útil longa, a duplicação será então uma ameaça.

**2 - mod - sera adicionado mais peças**

Isso me remete à segunda modificação. Os atores querem encenar outros tipos de peças: eles esperam acrescentar os estilos histórico, pastoral, pastoral-cômico, histórico-pastoral, trágico-histórico, trágico-cômico- histórico-pastoral, cenas indivisíveis e poema ilimitado ao seu repertório. Eles ainda não decidiram exatamente o que querem fazer nem quando. Essa mudança afetará tanto o modo como suas peças serão cobradas quanto a forma de calcular os créditos por volume. Como desenvolvedor experiente, posso garantir que, qualquer que seja o esquema concebido, eles o modificarão novamente no período de seis meses. Afinal de contas, quando chegam requisições por funcionalidades, elas não chegam como espiões solitários, mas em batalhões.

**Perceba entâo anecessidade de refatorar**

Deixe-me enfatizar que são essas mudanças que determinam a necessidade de fazer uma refatoração. Se o código estiver funcionando e não tiver de ser alterado, deixá-lo como está não é um problema. Seria bom aperfeiçoá-lo, mas, a menos que alguém precise entendê-lo, ele não estará causandonenhum dano real. Contudo, assim que alguém precisar entender como esse código funciona e tiver dificuldade para saber o que ele faz, será necessário tomar alguma atitude a respeito.

## Primeiro passo na refatoração - Ter testes automatizados

Toda vez que faço uma refatoração, o primeiro passo é sempre o mesmo. Devo garantir que tenho um conjunto robusto de testes para essa seção de código. Os testes são essenciais porque, apesar de fazer uma refatoração estruturada a fim de evitar a maior parte das oportunidades para introdução de bugs, ainda sou um ser humano e cometo erros. Quanto maior o programa, mais provável será que minhas alterações, inadvertidamente, façam algo deixar de funcionar – na era digital, o nome para a fragilidade é software.

É essencial criar testes que sejam conferidos automaticamente. Se eu não fizesse isso, acabaria gastando tempo para verificar manualmente os valores dos testes, comparando-os com valores anotados em um bloquinho, e isso me causaria atrasos. Frameworks de teste modernos oferecem todas as funcionalidades necessárias para escrever e executar testes conferidos automaticamente.

> **Antes de começar a refatorar, certifique-se de que você tenha um conjunto > de testes robusto. Esses testes devem ser conferidos automaticamente.**

**As vantagens de ter testes:**

À medida que fizer a refatoração, contarei com os testes. Penso neles como um detector de bugs para me proteger contra meus próprios erros. Ao escrever o que quero duas vezes, no código e no teste, eu teria de cometer oerro de forma consistente nos dois lugares para enganar o detector. Ao conferir meu trabalho duas vezes, reduzo as chances de fazer algo errado. Embora criar testes exija tempo, acabo economizando esse tempo, com juros consideráveis, ao gastar menos tempo na depuração.

## Código após refatorar

Código após refatorar para separar melhor as partes lógicas do código

```js
// createStatementData.js
function statement(invoice, plays) {

    function totalAmount() {
        let result = 0;
        for (let perf of invoice.performances) {
            result += amountFor(perf);
        }
        return result;
    }

    function totalVolumeCredits() {
        let result = 0;
        for (let perf of invoice.performances) {
            result += volumeCreditsFor(perf);
        }
        return result;
    }

    function usd(aNumber) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2
        }).format(aNumber / 100);
    }

    function volumeCreditsFor(aPerformance) {
        let result = 0;
        result += Math.max(aPerformance.audience - 30, 0);
        if ("comedy" === playFor(aPerformance).type) result +=
            Math.floor(aPerformance.audience / 5);
        return result;
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    function amountFor(aPerformance) {
        let result = 0;
        switch (playFor(aPerformance).type) {
            case "tragedy":
                result = 40000;
                if (aPerformance.audience > 30) {
                    result += 1000 * (aPerformance.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if (aPerformance.audience > 20) {
                    result += 10000 + 500 * (aPerformance.audience - 20);
                }
                result += 300 * aPerformance.audience;
                break;
            default:
                throw new Error(`unknown type: ${playFor(aPerformance).type}`);
        }
        return result;
    }
    
    let result = `Statement for ${invoice.customer}\n`;
    for (let perf of invoice.performances) {
        result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(totalAmount())}\n`;
    result += `You earned ${totalVolumeCredits()} credits\n`;
    return result;
}
```

Até agora, minha refatoração teve como foco o acréscimo de estrutura suficiente à função para que eu pudesse entendê-la e vê-la em termos de suas partes lógicas. Em geral, é isso que ocorre no início da refatoração. Separar porções complicadas em partes menores é importante, assim como lhes dar bons nomes. 

## Código após adicionar funcionaldiade , refatorar mais e separa rem arquivos

```js
// index.js
const plays = require('./plays.json');
const invoice = require('./invoices.json')[0];
const { statement, htmlStatement } = require('./statement.js');

const result = statement(invoice, plays);
console.log(result);

const htmlResult = htmlStatement(invoice, plays);
console.log(htmlResult);
```

.`createStatementData.js`

```js
// createStatementData.js
module.exports = createStatementData;

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }
  get amount() {
    throw new Error('subclass responsability');
  }
  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }
  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}

function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case 'tragedy': return new TragedyCalculator(aPerformance, aPlay);
    case 'comedy': return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`unknown type: ${aPlay.type}`)
  }
}

function createStatementData(invoice, plays) {
  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);
  return result;

  function enrichPerformance(aPerformance) {
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
    const result = Object.assign({}, aPerformance);
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    return result;
  }
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }
  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }
  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }
}
```

`statement.js`

```js
// statement.js
const createStatementData = require('./createStatementData');

module.exports = {
  statement,
  htmlStatement
};

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;
  for (let perf of data.performances) {
    result += `  ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
  }
  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
}

function htmlStatement (invoice, plays) {
  return renderHtml(createStatementData(invoice, plays));
}

function renderHtml (data) {
  let result = `<h1>Statement for ${data.customer}</h1>\n`;
  result += "<table>\n";
  result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";
  for (let perf of data.performances) {
    result += `  <tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
    result += `<td>${usd(perf.amount)}</td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
  return result;
}

function usd(aNumber) {
  return new Intl.NumberFormat("en-US",
    {
      style: "currency", currency: "USD",
      minimumFractionDigits: 2
    }).format(aNumber / 100);
}
```

## Considerações finais

Este é um exemplo simples, mas espero que ele dê a você uma noção de como é uma refatoração. Usei várias refatorações, incluindo Extrair função(Extract Function), Internalizar variável (Inline Variable), Mover função (Move Function) e Substituir condicional por polimorfismo (Replace Conditional with Polymorphism).

Houve três etapas principais nesse episódio de refatoração: 

1) decomposição da função original em um conjunto de funções aninhadas

2) uso de Separar em fases (Split Phase) para separar o código de cálculos do código de exibição 

3), introdução de uma calculadora polimórfica para a lógica de cálculos.

Cada uma delas acrescentou estrutura ao código, permitindo que eu comunicasse melhor o que o código estava fazendo.

Como ocorre com frequência na refatoração, **as primeiras etapas foram direcionadas principalmente para tentar entender o que estava acontecendo.** Eis uma sequência comum: ler o código, obter alguns insights e usar a refatoração para passar esse insight de sua mente de volta para o código. **O código mais claro então facilita a sua compreensão, levando a insights mais profundos e a um ciclo de feedback positivo benéfico**. Ainda há algumas melhorias que eu poderia ter feito, mas sinto que fiz o suficiente para passar no meu teste de deixar o código significativamente melhor do que estava quando o encontrei.

> **O verdadeiro teste para um bom código é a facilidade com que ele pode ser > alterado.**

Estou falando de melhorar o código – mas os programadores adoram discutir sobre como é a aparência de um bom código. Sei que algumas pessoas têm objeção à minha preferência por funções pequenas e bem nomeadas. Se considerarmos que isso é uma questão de estética, em que nada é bom nem ruim, mas o pensamento o faz ser assim, não teremos nenhuma diretriz, exceto o gosto pessoal. Acredito, porém, que podemos ir além do gosto pessoal e dizer que o verdadeiro teste para um bom código é a facilidade com que podemos modificá-lo. **O código deve ser óbvio: quando alguém tiver de fazer uma alteração, essa pessoa deverá localizar facilmente o código a ser modificado e fazer a alteração rapidamente, sem introduzir erros.** Uma base de código saudável maximiza nossa produtividade, permitindo desenvolver mais funcionalidades para os nossos usuários, de modo mais rápido e mais barato. Para manter um código saudável, preste atenção no que está entre a equipe de programação e esse ideal, e então refatore para se aproximar do ideal.

Contudo, o mais importante a se aprender com esse exemplo é o ritmo da refatoração. Sempre que mostro às pessoas como faço uma refatoração, elas ficam surpresas com o tamanho pequeno de meus passos, em que cada passo deixa o código em um estado funcional no qual ele compila e os testes passam. Fiquei igualmente surpreso quando Kent Beck me mostrou como fazer isso em um quarto de hotel em Detroit duas décadas atrás. **O segredo para uma refatoração eficaz é reconhecer que você será mais rápido se der passos minúsculos, pois o código nunca apresenta falhas e você pode combinar esses passos pequenos em alterações substanciais.** Lembre-se disso – e o resto é silêncio.
