# Chapter 8. Generalization

A generalização é a transformação de um código específico em um código de uso geral. A produção de código generalizado freqüentemente ocorre como resultado da refatoração. Todas as sete refatorações neste capítulo produzem código generalizado. 

A motivação mais comum para aplicá-los é remover código duplicado. Uma motivação secundária é simplificar ou esclarecer o código.

***Form Template Method*** (205) ajuda a remover a duplicação em métodos semelhantes de subclasses em uma hierarquia de classes. Se os métodos executam aproximadamente as mesmas etapas, na mesma ordem, mas as etapas são ligeiramente diferentes, **você pode separar o que varia do que é genérico produzindo um método de superclasse conhecido como Template Method** [DP].

***Extract Composite*** (214) é uma aplicação da refatoração *Extract Superclass* [F]. É aplicável quando um design patterns Composite [DP] foi implementado em várias subclasses de uma hierarquia sem um bom motivo. Ao extrair um Composite para uma superclasse, as subclasses compartilham uma implementação genérica do Composite.

Se você tiver algum código para lidar com um objeto e código separado para lidar com um grupo dos mesmos objetos (geralmente em alguma coleção), ***Replace One/Many Distinctions with Composite*** (224) irá ajudá-lo a produzir uma solução genérica que manipule um ou vários objetos sem distinguir entre os dois.

***Replace Hard-Coded Notifications with Observer*** (236) é um exemplo clássico de substituição de uma solução específica por uma geral. Nesse caso, há um acoplamento estreito entre os objetos que notificam e os objetos que são notificados. Para permitir instâncias de outros classes a serem notificadas, o código pode ser refatorado para usar um Observer [DP].

Um Adapter [DP] fornece outra forma de unificar interfaces. Quando os clientes se comunicam com classes semelhantes usando interfaces diferentes, tende a haver uma lógica de processamento duplicada. aplicando ***Unify Interfaces with Adapter*** (247), os clientes podem interagir com classes semelhantes usando uma interface genérica. Isso tende a abrir caminho para outras refatorações para remover a lógica de processo duplicada no código do cliente.

Quando uma classe atua como um Adapter para várias versões de um componente, biblioteca, API ou outra entidade, a classe geralmente contém duplicação e geralmente não possui um design simples. Aplicando ***Extract Adapter*** (258) produz classes que implementam uma interface comum e adaptam uma única versão de algum código.

A refatoração final neste capítulo, **Replace Implicit Language with Interpreter** (269), visa o código que seria melhor projetado se usasse uma linguagem explícita. Esse código geralmente usa vários métodos para realizar o que uma linguagem pode fazer, apenas de uma maneira muito mais primitiva e repetitiva. Refatorar tal código para um interpretador [DP] pode produzir uma solução de propósito geral que é mais compacta, simples e flexível.

## Form Template Method

### O que é

**Se**

Two methods in subclasses perform similar steps in the same order, yet the steps are different.

**Refatore para**

Generalize the methods by extracting their steps into methods with identical signatures, then pull up the generalized methods to form a Template Method.

**Descrição do capítulo**

***Form Template Method*** (205) ajuda a remover a duplicação em métodos semelhantes de subclasses em uma hierarquia de classes. Se os métodos executam aproximadamente as mesmas etapas, na mesma ordem, mas as etapas são ligeiramente diferentes, **você pode separar o que varia do que é genérico produzindo um método de superclasse conhecido como Template Method** [DP].

### Resumo

Se classes filhas implementam um mesmo método com PARTES IGUAIS e PARTES DIFERENTES entre si, você pode agrupar essas partes iguais (colocando na classe pai do template method)  e chamar métodos abstratos que serão a parte diferente nos filhos.

É comum combinar *Strategy* com *Template Method*, pois Strategy separar algoritmos em classes diferentes. Aí, se nesse algoritmos tiver partes iguais, elas podem ser juntadas na classe pai pelo Template Method.

### Schema

08-01-template-method-01

### Motivação

Template Methods "implementam as partes invariantes de um
algoritmo uma vez e deixam para as subclasses implementarem o
comportamento que pode variar" [DP , 326]. Quando comportamentos
invariantes e variantes são misturados nas implementações de subclasse
de um método, o comportamento invariante é duplicado na subclasses. A refatoração para um *Template Method* ajuda a livrar as
subclasses de seu comportamento invariante duplicado, movendo o
comportamento para um lugar: um algoritmo generalizado em um método de
superclasse.

O comportamento invariante de um Template Method consiste no
seguinte:

+ Métodos chamados e a ordem desses métodos
+ Métodos abstratos que subclasses deve sobrepor
+ Métodos de gancho (ou seja, métodos concretos) que subclasses
  poderia sobrepor

Por exemplo, considere o seguinte código:

```java
public abstract class Game... 
    
    public void initialize() { 
        deck = createDeck(); 
        shuffle(deck); 
        drawGameBoard(); 
        dealCardsFrom(deck); 
    } 

    protected abstract Deck createDeck(); 

    protected void shuffle(Deck deck) { 
        /// ...shuffle implementation 
    } 

    protected abstract void drawGameBoard();

    protected abstract void dealCardsFrom(Deck deck);

}
```

A lista de métodos chamados por e ordenados dentro `initialize()` é
invariante. O fato de que as subclasses devem
substituir os métodos abstratos também é invariante. A implementação de `shuffle()`
fornecida por `Game` é invariável: é um método de gancho (ou seja, é concreto)
que permite que as subclasses herdem o comportamento ou variem
sobrescrevendo `shuffle()`.

Como é muito tedioso implementar muitos métodos apenas para
desenvolver um Template Method em uma subclasse, os autores de
Padrões de design[DP] sugerem que um Template Method deve
minimizar o número de classes de métodos abstratos deve sobrepor.
Também não há uma maneira simples de os programadores saberem
quais métodos podem ser substituídos (ou seja, métodos de gancho) sem
estudar o conteúdo de um *Template Method*.

Template Methods geralmente chamam *Factory Methods* [DP],
como `createDeck()` no código acima. A refatoração *Introduce
Polymorphic Creation with Factory Method*(88) fornece um
exemplo do mundo real disso.

Linguagens como Java permitem que você declare um *Template Method*  como `final`, o que evita a substituição acidental do modelo Método por subclasses. Em geral, isso é feito apenas se o código do cliente em um
sistema ou estrutura depender totalmente do comportamento invariável em um
*Template Method* e se permitir a reinterpretação desse comportamento invariável
puder fazer com que o código do cliente funcione incorretamente.

Martin Fowler's *Form Template Method*[F ] e minha versão
cobrem muito do mesmo terreno e podem ser consideradas como a
mesma refatoração. Minha mecânica usa uma terminologia diferente
e tem uma etapa final diferente da de Martin. Além disso, o código
que discuti na seção Exemplo ilustra um caso em que o
comportamento invariável duplicado em subclasses é sutil, enquanto
o exemplo de Martin trata de um caso em que essa duplicação é
explícita. Se você não está familiarizado com o *Template Method* pattern, você faria bem em estudar ambas as versões desta
refatoração.

### Prós e Contras

**Prós**

+ Remove código duplicado em subclasses movendo o
comportamento invariável para uma superclasse.
+ Simplifica e comunica efetivamente as etapas de um
algoritmo geral.
+ Permite que as subclasses personalizem facilmente um algoritmo.

**Contras**

+ Complica um projeto quando as subclasses devem implementar
  muitos métodos para desenvolver o algoritmo.

### Mecânica da Refatoração

1 - Em uma hierarquia, encontre um método semelhante (um método em uma
subclasse que executa etapas semelhantes em uma ordem semelhante a um
método em outra subclasse). Aplique *Compose Method*
(123) no método semelhante (em ambas as subclasses), extraindo
métodos idênticos(métodos que possuem a mesma assinatura e
corpo em cada subclasse) em métodos únicos (métodos que
possuem assinatura e corpo diferentes em cada subclasse).

Ao decidir se deseja extrair o código como um método exclusivo ou
um método idêntico, considere o seguinte: Se você extrair o código
como um método exclusivo, eventualmente (durante a etapa 5)
precisará produzir uma versão abstrata ou concreta desse método
exclusivo em a superclasse. Fará sentido que as subclasses herdem
ou sobrescrevam o método exclusivo? Caso contrário, extraia o
código em um método idêntico.

2 - Puxe os métodos idênticos para a superclasse aplicando
Método de  Pull Up Method [F].

3 - Para produzir um corpo idêntico para cada versão do método
semelhante, aplique Rename Method [F ] em cada método exclusivo
até que o método semelhante seja idêntico em cada subclasse.

+ Compile e teste após cada aplicação de Rename Method [F ].

4 - Se o método semelhante ainda não tiver uma assinatura
idêntica em cada subclasse, aplique Rename Method [F ] para
produzir uma assinatura idêntica.

5 - Aplicar Pull Up Method [F] no método semelhante (em
qualquer subclasse), definindo métodos abstratos na superclasse para
cada método exclusivo. O método semelhante puxado para cima agora é
um *Template Method*.

+ Compilar e testar.

### Exemplo

No final do exemplo utilizado neste catálogo para a refatoração
*Replace Conditional Logic with Strategy* (129) resultou em três
subclasses da classe abstrata,  `CapitalStrategy` :

08-02-template-method-02

Essas três subclasses contêm uma pequena quantidade de
duplicação, que, como veremos nesta seção, pode ser removida
aplicando *Form Template Method* . **É relativamente
comum combinar os padrões Strategy e Template Method para
produzir classes Strategy concretas que tenham pouco ou nenhum
código duplicado.**

A classe  `CapitalStrategy`  define um método abstrato para o
cálculo do capital:

```java
public abstract class CapitalStrategy... 
    
    public abstract double capital(Loan loan);

```

Subclasses de `CapitalStrategy` calculam o capital de forma semelhante:

```java
public class CapitalStrategyAdvisedLine  {
    public double capital(Loan loan) { 
        return loan.getCommitment() * loan.getUnusedPercentage() * duration(loan) * riskFactorFor(loan); 
    }
}

public class CapitalStrategyRevolver {
    // ...
    public double capital(Loan loan) { 
        return (loan.outstandingRiskAmount() * duration(loan) * riskFactorFor(loan)) + (loan.unusedRiskAmount() * duration(loan) * unusedRiskFactor(loan)); 
    }
}

public class CapitalStrategyTermLoan {
    // ...
    public double capital(Loan loan) { 
        return loan.getCommitment() * duration(loan) * riskFactorFor(loan); 
    }

    protected double duration(Loan loan) { 
        return weightedAverageDuration(loan); 
    }
    private double weightedAverageDuration(Loan loan) {
        // ...
    }
}
/*
As três classes implementam capital d eforma bem semelhante com uma pequena diferença
*/
```

Observe que  cálculo de  `CapitalStrategyAdvisedLine`   é idêntico ao
 `CapitalStrategyTermLoan`  do, exceto por uma etapa
que multiplica o resultado pelo percentual não utilizado do
empréstimo (`loan.getUnusedPercentage()`). 

Identificar essa
sequência semelhante de etapas com uma ligeira variação significa
que posso generalizar o algoritmo refatorando para o Template
Method. 

Farei isso nas etapas a seguir e, em seguida, lidarei com a
terceira classe, `CapitalStrategyRevolver`, no final desta seção de
Exemplo.

1 - O ` capital(...) ` método implementado por
` ``CapitalStrategyAdvisedLine`` ` e `CapitalStrategyTermLoan` é o método similar
neste exemplo.

O mecanismo descrito anteriormente me orientam a aplicar Composite Method
(123) no `capital()` implementações extraindo idênticos
métodos ou métodos únicos. Como as fórmulas em
 `capital()` são idênticos exceto por
 `CapitalStrategyAdvisedLine` passo de multiplicar por
 `loan.getUnusedPercentage()` , devo escolher se deseja extrair
essa etapa em seu próprio método exclusivo ou extraí-la como parte
de um método que inclui outro código. A mecânica funciona de
qualquer maneira. Nesse caso, vários anos programando
calculadoras de empréstimo para um banco me ajudam a tomar uma
decisão. O valor do risco para uma linha aconselhada é calculado
multiplicando o valor do compromisso do empréstimo por sua
porcentagem não utilizada (ou seja, `loan.getCommitment()` *
 `loan.getUnusedPercentage()` ). Além disso, conheço a fórmula
padrão para capital ajustado ao risco:

Valor do Risco x Duração x Fator de Risco | Risk Amount x Duration x Risk Factor

Esse conhecimento me leva a extrair o código de
` `CapitalStrategyAdvisedLine` ` ,
`loan.getCommitment() *  `loan.getUnusedPercentage()` `, em seu próprio método,
`riskAmountFor()`, ao executar uma etapa semelhante para
`CapitalStrategyTermLoan`:

```java
public class  `CapitalStrategyAdvisedLine`  {
    public double capital(Loan loan) { 
        return riskAmountFor(loan) * duration(loan) * riskFactorFor(loan); 
    }
    private double riskAmountFor(Loan loan) { 
        return loan.getCommitment() * loan.getUnusedPercentage(); 
    }
}

public class CapitalStrategyTermLoan {
    public double capital(Loan loan) { 
        return riskAmountFor(loan) * duration(loan) * riskFactorFor(loan); 
    } 
    private double riskAmountFor(Loan loan) { 
        return loan.getCommitment(); 
    }
}

/* O que foi feito:
Pegou `loan.getCommitment() * duration(loan) * riskFactorFor(loan)` que aparece em duas classes extraiu par ao método riskAmountFor das respectias clases que o usam

*/
```

Conhecimento do domínio claramente influenciou minhas decisões de
refatoração durante esta etapa. Em seu livro Design Orientado ao Domínio[
Evans ], Eric Evans descreve como o conhecimento de domínio geralmente
direciona o que escolhemos refatorar ou como escolhemos refatorá-lo.

2 - Esta etapa me pede para puxar métodos idênticos para
a superclasse, `CapitalStrategy` . Neste caso, o
 `RiskAmountFor(...)`  não é um método idêntico porque o
código em cada implementação dele varia, então eu posso passar para a próxima etapa.

3 - Agora devo garantir que todos os métodos exclusivos
tenham a mesma assinatura em cada subclasse. O único
método único, `RiskAmountFor(...)` , já tem o mesmo
assinatura em cada subclasse, para que eu possa prosseguir para a próxima
etapa.

4 - Devo agora garantir que o método semelhante,  `capital(...)` , tem
a mesma assinatura em ambas as subclasses.
Ele já faz isso, então eu prossigo para a próxima etapa.

5 - Porque o `capital(...)` método em cada subclasse agora tem a
mesma assinatura e corpo, posso puxá-lo para
 `CapitalStrategy` aplicando Pull Up Method [F ].
Isso envolve declarar um método abstrato para o método
único, `RiskAmountFor(...)` :

```java
public abstract class CapitalStrategy {
    // public abstract double capital(Loan loan); 
    public double capital(Loan loan) { 
        return riskAmountFor(loan) * duration(loan) * riskFactorFor(loan); 
    } 
    public abstract double riskAmountFor(Loan loan);
}

/*
O método Pull Up Method virou um método abstrato na classe pai
*/

```

O método  `capital()` agora é um *Template Method*. Isso completa a
refatoração para de   `CapitalStrategyAdvisedLine` e `CapitalStrategyTermLoan` subclasses usando *Template Method*.

**Olhando por uma outar pespectiva agora ...**

Antes de lidar com o cálculo de capital em
`CapitalStrategyRevolver`, gostaria de mostrar o que seria
teria acontecido se eu não tivesse criado um
 `RiskAmountFor(...)`  durante a etapa 1 da refatoração. Nesse
caso, eu teria criado um método único para
 `CapitalStrategyAdvisedLine` passo de multiplicar por
 `loan.getUnusedPercentage()` . Eu teria chamado tal passo
`unusedPercentageFor(...)` e o implementou como um método
de gancho em `CapitalStrategy` :

```java
public abstract class CapitalStrategy {
    
    public double capital(Loan loan) { 
        return loan.getCommitment() * unusedPercentageFor(loan) * duration(loan) * riskFactorFor(loan); 
    } 
    
    public abstract double riskAmountFor(Loan loan); 
    
    protected double unusedPercentageFor(Loan loan) { // hook method 
        return 1.0;
    };
}
```

Como esse método de gancho retorna `1.0`, não tem efeito nos
cálculos, a menos que o método seja substituído, como acontece
com  `CapitalStrategyAdvisedLine` :

```java
public class  `CapitalStrategyAdvisedLine`  {
    protected double unusedPercentageFor(Loan loan) {
        return loan.getUnusedPercentage(); 
    };
}
```

O método hook permite `CapitalStrategyTermLoan` 
herdar seu `capital(...)` cálculo, em vez de implementar um
 `riskAmount(...)`  método:

```java
public class CapitalStrategyTermLoan {
    // public double capital(Loan loan) { 
    //     return loan.getCommitment() * duration(loan) * riskFactorFor(loan); 
    // } 
    protected double duration(Loan loan) { 
        return weightedAverageDuration(loan); 
    } 
    private double weightedAverageDuration(Loan loan) {
        // ...
    }
}
```

Essa é outra maneira de produzir um *Template Method*
para o Cálculo de  `capital()` . No entanto, sofre de alguns
desvantagens:

+ O código resultante comunica mal a fórmula de capital
  ajustado ao risco (Valor do risco x Duração x Fator de risco).
+ Dois dos três `CapitalStrategy` subclasses,
   `CapitalStrategyTermLoan`  e, como veremos,
  `CapitalStrategyRevolver`, herdam o comportamento de não
  fazer nada do método hook, que, por ser uma etapa única em
   `CapitalStrategyAdvisedLine` , realmente pertence
  exclusivamente a essa classe.

**Voltando ...**

Agora vamos ver como `CapitalStrategyRevolver` proveitaria o
novo `capital()` *Template Method*.  O método  original `capital()`  se
parece com isso:

```java
public class CapitalStrategyRevolver {
    
    public double capital(Loan loan) { 
        return (loan.outstandingRiskAmount() * duration(loan) * riskFactorFor(loan)) + (loan.unusedRiskAmount() * duration(loan) * unusedRiskFactor(loan)); 
    }
}
```

A primeira metade da fórmula se assemelha à fórmula geral, Valor do Risco
x Duração x Fator de Risco. A segunda metade da fórmula é semelhante,
mas trata da parte não utilizada de um empréstimo. Podemos refatorar
esse código para aproveitar as vantagens do Template Method feito antes da seguinte
maneira:

```java
public class CapitalStrategyRevolver {
    
    public double capital(Loan loan) { 
        return super.capital(loan) + (loan.unusedRiskAmount() * duration(loan) * unusedRiskFactor(loan)); 
    } 
    
    protected double riskAmountFor(Loan loan) { 
        return loan.outstandingRiskAmount(); 
    }
}
```

Você poderia argumentar se esta nova implementação é mais fácil
de entender do que a anterior. Certamente alguma duplicação na
fórmula foi removida. No entanto, a fórmula resultante é mais fácil
de seguir? Acho que sim, porque comunica que o capital é
calculado de acordo com a fórmula geral com a adição de capital
não utilizado. A adição de capital não utilizado pode ser tornada
mais clara aplicando Extract Method [F ] sobre  `capital()` :

```java
public class CapitalStrategyRevolver {
    
    public double capital(Loan loan) { 
        return super.capital(loan) + unusedCapital(loan); 
    } 
    
    public double unusedCapital(Loan loan) { 
        return loan.unusedRiskAmount() * duration(loan) * unusedRiskFactor(loan); 
    }
} 
```



## Extract Composite

### O que é

**Se**

Subclasses in a hierarchy implement the same Composite.

**Refatore para:**

Extract a superclass that implements the Composite.

**Descrição do capítulo**

### Resumo

### Schema

### Motivação

EmExtrair superclasse[F ], Martin Fowler explica que se você tiver
duas ou mais classes com recursos semelhantes, faz sentido mover
os recursos comuns para uma superclasse. Esta refatoraçãoé semelhante: aborda o caso em que o recurso semelhante é um
composto [DP ] que seria melhor em uma superclasse.

Subclasses em hierarquias que armazenam coleções de filhos e
possuem métodos para relatar informações sobre esses filhos são
comuns. Quando os filhos que estão sendo coletados são classes na
mesma hierarquia, há uma boa chance de que muito código duplicado
possa ser removido pela refatoração para Composite.

A remoção dessa duplicação pode simplificar bastante as subclasses. Em um
projeto, descobri que as pessoas estavam confusas sobre como adicionar um
novo comportamento ao sistema, e grande parte da confusão originava-se da
complexa lógica de manipulação de crianças propagada em várias
subclasses. aplicandoExtrair composto, o código da subclasse tornou-se
simples, o que tornou mais fácil para as pessoas entenderem como escrever
novas subclasses. Além disso, a própria existência de uma superclasse
nomeada para expressar que lidava com Composites comunicou aos
desenvolvedores que algumas funcionalidades avançadas poderiam ser
herdadas por meio de subclasses.

Essa refatoração eExtrair superclasse[F ] são essencialmente os mesmos. Eu
aplico essa refatoração quando estou apenas preocupado em puxar a lógica
comum de manipulação de crianças para uma superclasse. Depois disso, se
ainda houver mais comportamento que pode ser puxado para uma
superclasse, mas não relacionado ao Composto, aplico a lógica pull-up em
Extrair superclasse.

### Prós e Contras

**Prós:**

+ Elimina a lógica duplicada de armazenamento e manipulação de
  crianças.

**Contras:**

+ Comunica efetivamente que a lógica de manipulação de crianças pode
  ser herdada.

### Mecânica da Refatoração

Essas mecânicas são baseadas nas mecânicas deExtrair superclasse[F ].

1 - Criar umacomposto, uma classe que se tornará um Composite [DP ] durante
esta refatoração. Nomeie esta classe para refletir que tipo de filhos ela conterá
(por exemplo,CompositeTag).

Compilar.

2 - Faça cada umrecipiente filho(uma classe na hierarquia que contém código de
manipulação de filhos duplicado) uma subclasse de suacomposto.

Compilar.

3 - Em um contêiner filho, encontre um método de processamento filho que seja
totalmente duplicado ou parcialmente duplicado nos contêineres filho. Amétodo
puramente duplicadotem o mesmo corpo de método com nomes de métodos
iguais ou diferentes nos contêineres filhos. Aparcialmente duplicadométodotem um corpo de método com comumecódigo incomum e nomes
de método iguais ou diferentes em contêineres filho.

Se você encontrou um método puramente duplicado ou parcialmente
duplicado, se seu nome não for consistente nos contêineres filho, torne-o
consistente aplicandoRenomear Método[F ].

Para um método puramente duplicado, mova o campo de coleção filho referenciado
pelo método para sua composição aplicandoPuxe o campo para cima [F ]. Renomeie
este campo se seu nome não fizer sentido para todos os contêineres filhos. Agora
mova o método para o composto aplicandoMétodo de puxar para cima[F ]. Se o
método pull-up depende do código do construtor que ainda reside em contêineres
filho, puxe esse código para o construtor do composto.

Para um método parcialmente duplicado, veja se o corpo do método pode ser
consistente em todos os contêineres filho usandoAlgoritmo Substituto[F ]. Em caso
afirmativo, refatore-o como um método puramente duplicado. Caso contrário, extraia
o código que é comum em todas as implementações de contêiner filho usandoExtrair
Método[F ] e puxe-o para o composto usandoMétodo de puxar para cima[F ]. Se o
corpo do método seguir a mesma sequência de etapas, algumas das quais
implementadas de maneira diferente, veja se você pode aplicarMétodo de modelo de
formulário (205).

Compile e teste após cada refatoração.

4 - Repita a etapa 3 para métodos de processamento filho nos contêineres filho que
contêm código totalmente duplicado ou parcialmente duplicado.

5 - Verifique cada cliente de cada contêiner filho para ver se agora ele pode se
comunicar com o contêiner filho usando a interface composta. Se puder, faça-o
fazê-lo.

Compile e teste após cada refatoração.

### Exemplo

Essa refatoração ocorreu no analisador HTML de código aberto (consulte http://
sourceforge.net/projects/htmlparser ). Quando o analisador analisa um pedaço de HTML,
ele identifica e cria objetos que representam tags HTML e pedaços de texto. Por exemplo,
aqui está um pouco de HTML:

```html
<HTML>
    <BODY> Hello, and welcome to my Web page! I work for 
        <A HREF="http://industriallogic.com"> 
            <IMG SRC="http://industriallogic.com/images/logo141x145.gif"> 
        </A> 
    </BODY> 
</HTML>
```



Dado tal HTML, o analisador criaria objetos dos seguintes tipos:

+ Marcação(para o<CORPO>marcação)
+ StringNode(para oCorda, "Olá e bem-vindo . . .")
+ LinkTag(para o<A HREF="...">marcação)

Como a tag de link (<A HREF="...">) contém uma tag de imagem (<IMG SRC"...">), você
pode se perguntar o que o analisador faz com ele. A tag de imagem, que o analisador
trata como umImageTag, é tratado como filho do LinkTag. Quando o analisador
percebe que a tag de link contém uma tag de imagem, ele constrói e fornece uma
ImageTagobjeto como uma criança para oLinkTag objeto.

Tags adicionais no analisador, comoFormTag,TitleTag, e outros, também são
contêineres filho. Conforme estudei algumas dessas classes, não demorou muito para
detectar códigos duplicados para armazenar e manipular nós filhos. Por exemplo,
considere o seguinte:

```java
public class LinkTag extends Tag {
    // ...
    private Vector nodeVector; 
    public String toPlainTextString() { 
        StringBuffer sb = new StringBuffer(); 
        Node node; 
        for (Enumeration e = linkData(); e.hasMoreElements();) {
            node = (Node)e.nextElement();
            sb.append(node.toPlainTextString()); 
        } 
        return sb.toString(); 
    }
}

public class FormTag extends Tag {
    // ...
    protected Vector allNodesVector; 
    public String toPlainTextString() { 
        StringBuffer stringRepresentation = new StringBuffer(); 
        Node node; 
        for (Enumeration e = getAllNodesVector().elements(); e.hasMoreElements();) { 
            node = (Node)e.nextElement(); 
            stringRepresentation.append(node.toPlainTextString()); 
        } 
        return stringRepresentation.toString(); 
    }
}
```

PorqueFormTageLinkTagambos contêm filhos, ambos têm um Vetorpara armazenar
crianças, embora tenha um nome diferente em cada classe. Ambas as classes precisam
suportar otoPlainTextString() operação, que gera o texto não formatado em HTML dos
filhos da tag, para que ambas as classes contenham lógica para iterar sobre seus filhos
e produzir texto simples. No entanto, o código para fazer essa operação é quase
idêntico nessas classes! Na verdade, existem vários métodos quase idênticos nas
classes de contêiner filho, todos os quais cheiram a duplicação. Então acompanhe
enquanto eu me inscrevoExtrair compostoa este código.

1 - Devo primeiro criar uma classe abstrata que se tornará a superclasse das
classes de contêiner filho. Como as classes filho-container, comoLinkTageFormTag, já são subclasses deMarcação, criei a seguinte
classe:

```java
public abstract class CompositeTag extends Tag { 
    public CompositeTag(int tagBegin, int tagEnd, String tagContents, String tagLine) { 
        super(tagBegin, tagEnd, tagContents, tagLine); 
    }
}
```



2 - Agora eu faço as subclasses dos contêineres filhos deCompositeTag:

```java
public class LinkTag extends CompositeTag {...}
public class FormTag extends CompositeTag {...}
```



Observe que, no restante desta refatoração, mostrarei o código de
apenas dois contêineres filhos,LinkTageFormTag, embora existam
outros na base de código.

3 - Procuro um método puramente duplicado em todos os contêineres filho e
encontrotoPlainTextString(). Porque este método tem o mesmo
name em cada contêiner filho, não preciso alterar seu nome em nenhum
lugar. Meu primeiro passo é puxar a criançaVetorque armazena
crianças. Eu faço isso usando oLinkTagaula:

Eu queroFormTagpara usar o mesmo recém-puxadoVetor, nodeVector(
sim, é um nome horrível, vou mudá-lo em breve), então renomeio seu
filho localVetorsernodeVector:

Então eu excluo este campo local (porqueFormTagherda):

```java
public abstract class CompositeTag extends Tag { 
    protected Vector nodeVector; // pulled-up field  
}

public class LinkTag extends CompositeTag {
    // private Vector nodeVector; // deleted
}

public class FormTag extends CompositeTag {
    // protected Vector nodeVector; // deleted
}
```

Agora posso renomearnodeVectorno composto:

```java
public abstract class CompositeTag extends Tag {
    // protected Vector nodeVector; 
    protected Vector children;
}
```

Agora estou pronto para puxar otoPlainTextString()método para
CompositeTag. Minha primeira tentativa de fazer isso com uma ferramenta
de refatoração automatizada falha porque os dois métodos não são
idênticos em LinkTageFormTag. O problema é queLinkTagobtém um
iterador em seus filhos por meio do métodolinkData()método, enquanto
FormTag obtém um iterador em seus filhos por meio do método
getAllNodesVector().elements():

```java
public class LinkTag extends CompositeTag {
    public Enumeration linkData() { 
        return children.elements(); 
    } 
    public String toPlainTextString() {
        // ...
        for (Enumeration e = linkData(); e.hasMoreElements();) 
            // ...
    } 
}

public class FormTag extends CompositeTag {
    public Vector getAllNodesVector() { 
        return children; 
    } 
    public String toPlainTextString() {
        // ...
        for (Enumeration e = getAllNodesVector().elements(); e.hasMoreElements();) 
            // ...
    }
}
```

Para corrigir esse problema, devo criar um método consistente para obter
acesso a umCompositeTagfilhos de. Eu faço isso fazendoLinkTag
eFormTagimplementar um método idêntico, chamadocrianças(), que
eu puxo para cimaCompositeTag:

```java
public abstract class CompositeTag extends Tag...
    public Enumeration children() {
    	return children.elements();
}
```

A refatoração automatizada em meu IDE agora permite que eu acesse
facilmente toPlainTextString()paraCompositeTag. Eu faço meus testes e
tudo funciona bem.

4.Nesta etapa, repito a etapa 3 para métodos adicionais que podem ser
extraídos dos contêineres filho para o composto. Acontece que existem vários
desses métodos. Eu vou te mostrar um que envolve um método chamado
toHTML(). Este método gera o HTML de um determinado nó.
AmbosLinkTageFormTagtêm suas próprias implementações para este método.
Para implementar o passo 3, devo primeiro decidir setoHTML()é puramente
duplicado ou parcialmente duplicado.

Aqui está uma olhada em comoLinkTagimplementa o método:

```java
public class LinkTag extends CompositeTag {
    public String toHTML() { 
        StringBuffer sb = new StringBuffer();
        putLinkStartTagInto(sb); 
        Node node; 
        for (Enumeration e = children(); e.hasMoreElements();) { 
            node = (Node)e.nextElement(); 
            sb.append(node.toHTML()); 
        } 
        sb.append("</A>"); 
        return sb.toString(); 
    } 
    
    public void putLinkStartTagInto(StringBuffer sb) { 
        sb.append("<A "); 
        String key, value; 
        int i = 0; 
        for (Enumeration e = parsed.keys(); e.hasMoreElements();) { 
            key = (String)e.nextElement(); 
            i++; 
            if (key!=TAGNAME) { 
                value = getParameter(key); 
                sb.append(key + "=\"" + value + "\""); 

                if (i < parsed.size()-1) 
                    sb.append(" "); 
            } 
        } 
        sb.append(">"); 
    }
}
```

Depois de criar um buffer,putLinkStartTagInto(...)lida com a obtenção do
conteúdo da tag de início no buffer, juntamente com quaisquer atributos
que ela possa ter. A tag inicial seria algo como<A HREF="...">ou<UM
NOME="...">, ondehrEFeNOMErepresentam atributos da tag. A tag pode
ter filhos, como umStringNode, como em<A HREF="...">Sou um nó de
string</A>ou criançaImageTaginstâncias. Finalmente, há a tag final,</A>,
que deve ser adicionado ao buffer de resultado antes que a representação
HTML da tag seja retornada.

Vamos agora ver comoFormTagimplementa otoHTML()método:

```java
public class FormTag extends CompositeTag {
    public String toHTML() { 
        StringBuffer rawBuffer = new StringBuffer(); 
        Node node,prevNode = ; 
        rawBuffer.append("<FORM METHOD=\"" + formMethod + "\" ACTION=\"" + formURL + "\""); 
        
        if (formName!=null && formName.length()>0) 
            rawBuffer.append(" NAME=\"" + formName + "\""); 
        
        Enumeration e = children.elements(); 
        node = (Node)e.nextElement(); 
        Tag tag = (Tag)node;
        Hashtable table = tag.getParsed(); 
        String key, value; 
        for (Enumeration en = table.keys(); en.hasMoreElements();) { 
            key = (String)en.nextElement(); 
            if (!(key.equals("METHOD") || key.equals("ACTION") || key.equals("NAME") || key.equals(Tag.TAGNAME))) { 
                value = (String)table.get(key); 
                rawBuffer.append(" " + key + "=" + "\"" + value + "\""); 
            } 
        } 
        rawBuffer.append(">"); 
        rawBuffer.append(lineSeparator); 
        
        for (;e.hasMoreElements();) { 
            node = (Node)e.nextElement(); 
            if (prevNode != null) { 
                if (prevNode.elementEnd() > node.elementBegin()) { 
                    // It’s a new line 
                    rawBuffer.append(lineSeparator); 
                } 
            } 
            
            rawBuffer.append(node.toHTML()); 
            prevNode = node; 
        }

        return rawBuffer.toString(); 
    }
}
```

Esta implementação tem algumas semelhanças e diferenças em comparaçãocom oLinkTagimplementação. Portanto, de acordo com a definição
apresentada anteriormente na seção Mecânica,toHTML()deve ser tratado
como umparcialmente duplicadométodo do recipiente-filho. Isso significa que
meu próximo passo é ver se consigo fazer uma implementação desse método
aplicando a refatoraçãoAlgoritmo Substituto[F ].

Acontece que eu posso. É mais fácil do que parece porque ambas as versões do
toHTML()essencialmente, faça as mesmas três coisas: imprima a tag inicial
juntamente com quaisquer atributos, gere quaisquer tags filhas e gere a tag
de fechamento. Sabendo disso, chego a um método comum para lidar com a
tag de início, que abro paraCompositeTag:

```java
public abstract class CompositeTag extends Tag {
    public void putStartTagInto(StringBuffer sb) { 
        sb.append("<" + getTagName() + " ");
        String key, value; 
        int i = 0; 
        for (Enumeration e = parsed.keys(); e.hasMoreEle ments();) { 
            key = (String)e.nextElement(); 
            i++; 
            if (key != TAGNAME) { 
                value = getParameter(key); 
                sb.append(key + "=\"" + value + "\""); 
                
                if (i < parsed.size()) 
                    sb.append(" "); 
            } 
        } 
        sb.append(">"); 
    }
}
    
public class LinkTag extends CompositeTag {
    public String toHTML() { 
        StringBuffer sb = new StringBuffer();
        putStartTagInto(sb); 
        // ...
    }
}

public class FormTag extends CompositeTag {
    public String toHTML() { 
        StringBuffer rawBuffer = new StringBuffer();
        putStartTagInto(rawBuffer);
        // ...
    }
}
```

Realizo operações semelhantes para criar uma maneira consistente de
obter HTML de nós filhos e de uma tag final. Todo esse trabalho me permite
puxar um genéricotoHTML()método para o composto:

```java
public abstract class CompositeTag extends Tag {
    public String toHTML() { 
        StringBuffer htmlContents = new StringBuffer(); 
        putStartTagInto(htmlContents); 
        putChildrenTagsInto(htmlContents); 
        putEndTagInto(htmlContents); 
        return htmlContents.toString(); 
    }
}
```

Para concluir esta parte da refatoração, continuarei a mover métodos
relacionados a filhos paraCompositeTag, embora eu o poupe dos detalhes.

5 - A etapa final envolve a verificação dos clientes dos contêineres filhos para ver
se agora eles podem se comunicar com os contêineres filhos usando o método
CompositeTaginterface. Neste caso, não há tais casos no
parser em si, então terminei a refatoração.



## Replace One/Many Distinctions with Composite

### O que é

**Se**

A class processes single and multiple objects using separate pieces of

**Refatore para:**

Use a Composite to produce one piece of code capable of handling single
or multiple objects.

**Descrição do capítulo**

Se você tiver algum código para lidar com um objeto e código separado para lidar com um grupo dos mesmos objetos (geralmente em alguma coleção), ***Replace One/Many Distinctions with Composite*** (224) irá ajudá-lo a produzir uma solução genérica que manipule um ou vários objetos sem distinguir entre os dois.

### Resumo

### Schema

### Motivação

Quando uma classe tem um método para processar um objeto e um método quase
idêntico para processar uma coleção de objetos, existe uma distinção um/muitos. Tal
distinção pode resultar em problemas como os seguintes.
Código duplicadoObservação: como o método que processa um objeto faz a mesma
coisa que o método que processa uma coleção de objetos, o código duplicado
geralmente se espalha pelos dois métodos. É possível reduzir essa duplicação sem
implementar um Composite [DP ] (consulte a seção Exemplo para obter detalhes), mas
mesmo que a duplicação seja reduzida, ainda existem dois métodos realizando o
mesmo tipo de processamento.
Código de cliente não uniforme: quer tenham objetos únicos ou coleções de objetos, os
clientes desejam que seus objetos sejam processados de uma maneira. No entanto, a
existência de dois métodos de processamento com assinaturas diferentes força os clientes a
passar diferentes tipos de dados para os métodos (ou seja, um objeto ou uma coleção de
objetos). Isso torna o código do cliente não uniforme, o que reduz a simplicidade.
Fusão de resultados: A melhor maneira de explicar isso é com um exemplo. Digamos que você
queira encontrar todos os produtos que são vermelhos e custam menos de US\$ 5,00ouazul e
com preço acima de ​\$ 10,00. Uma maneira de encontrar esses produtos é ligar para um
ProductRepositorydeselectBy(Lista de especificações)método, que retorna
aListade resultados. Aqui está um exemplo de chamada paraselecionePor(...):

```java
List redProductsUnderFiveDollars = new ArrayList();
redProductsUnderFiveDollars.add(new ColorSpec(Color.red));
redProductsUnderFiveDollars.add(new BelowPriceSpec(5.00));
List foundRedProductsUnderFiveDollars = productRepository.selectBy(redProductsUnderFiveDollars);
```

O principal problema comselectBy(Lista de especificações)é que ele não pode lidar com uma
condição OR. Portanto, se você deseja encontrar todos os produtos vermelhos e abaixo de ​\$
5,00ouazul e acima de \$ 10,00, você deve fazer chamadas separadas para selecionePor(...)e,
em seguida, mesclar os resultados:

```java
List foundRedProductsUnderFiveDollars = productRepository.selectBy(redProductsUnderFiveDolla rs);
List foundBlueProductsAboveTenDollars = productRepository.selectBy(blueProductsAboveTenDollars);

List foundProducts = new ArrayList();
foundProducts.addAll(foundRedProductsUnderFiveDollars);
foundProducts.addAll(foundBlueProductsAboveTenDollars);
```

Como você pode ver, essa abordagem é desajeitada e detalhada.

O padrão Composite fornece uma maneira melhor. Ele permite que os clientes processem um ou
vários objetos com um único método. Isso tem muitos benefícios.

+ Não há código duplicado nos métodos porque apenas um método lida
  com os objetos, sejam eles um ou muitos.
+ Os clientes se comunicam com esse método de maneira uniforme.
+ Os clientes podem fazer uma chamada para obter os resultados do processamento de uma
  árvore de objetos em vez de fazer várias chamadas e mesclar os resultados processados.
  Por exemplo, para encontrar produtos vermelhos abaixo de ​\$ 5,00ouprodutos azuis acima
  de US\$ 10,00, um cliente cria e passa o seguinte composto para o método de
  processamento:

08-03-replace-composite-02.jpg

Resumindo, substituir uma distinção um/muitos por um Composite é uma forma de remover a
duplicação, tornar as chamadas do cliente uniformes e suportar o processamento de árvores de
objetos. No entanto, se esses dois últimos benefícios específicos não forem tão importantes para o
seu sistema e você puder reduzir a maior parte da duplicação em métodos que têm uma distinção
um/muitos, uma implementação composta pode ser um exagero.

Uma desvantagem comum do padrão Composite está relacionada à segurança de tipo. Para evitar
que os clientes adicionem objetos inválidos a um composto, o código composto deve conter
verificações de tempo de execução dos objetos que os clientes tentam adicionar a ele. Esse
problema também está presente nas coleções porque os clientes também podem adicionar objetos
inválidos às coleções.

### Prós e Contras

**Prós:**

+ Remove o código duplicado associado ao manuseio de
um ou muitos objetos.
+ Fornece uma maneira uniforme de processar um ou vários
objetos.
+ Oferece suporte a formas mais ricas de processar muitos objetos (por
exemplo, uma expressão OR).

**Contras:**

+ Pode exigir verificações de tempo de execução para segurança de tipo
  durante a construção do composto.

### Mecânica da Refatoração

Nesta seção e na seção de exemplo, um método que funciona com um
objeto é chamado demétodo de um objetoenquanto um método que
trabalha com uma coleção de objetos é chamado demétodo de muitos
objetos.

1 - .O método de muitos objetos aceita uma coleção como
parâmetro. Crie uma nova classe que aceite a coleção em um
construtor e forneça um método getter para ela. Esse
compostoclasse se tornará o que é conhecido como
Composite emPadrões de design[DP ].

Dentro do método de muitos objetos, declare e instancie uma
instância de sua composição (ou seja, a nova classe). Além disso,
encontre todas as referências dentro do método de muitos objetos
para a coleção e atualize o código para que o acesso à coleção seja
obtido por meio do método getter do composto.

Compilar e testar.

2 - AplicarExtrair Método[F ] no código dentro do método
manyobject que funciona com a coleção. Torne público o
método extraído. Então apliqueMétodo de movimentação[F ] no
método extraído para movê-lo para seu arquivo composite.

Compilar e testar.

3 - O método de muitos objetos agora será quase idêntico ao
método de um objeto. A principal diferença é que o método
manyobject instancia seu arquivo composite. Se houver outras
diferenças, refatore para eliminá-las.

Compilar e testar.

4 - Altere o método de muitos objetos para que ele contenha uma linha de
código: uma chamada para o método de um objeto que o passa por
sua instância composta como um argumento. Você precisará fazer com
que o composto compartilhe a mesma interface ou superclasse do tipo
usado pelo método de um objeto.

Para fazer isso, considere tornar o composto uma subclasse
do tipo usado pelo método de um objeto ou crie uma nova
interface (usandoExtrair interface[F ]) que o compostoe todos os objetos passados para o implemento do método de
um objeto.

Compilar e testar.

5 - Como o método de muitos objetos agora consiste em apenas uma linha
de código, ele pode ser embutido aplicandoMétodo embutido[F ].

Compilar e testar.

6 - AplicarColeção de encapsulamento[F ] em seu composto.
Isso produzirá umadicionar(...)método no compósito, que
os clientes chamarão em vez de passar uma coleção para o
construtor do composto. Além disso, o método getter para a
coleção agora retornará uma coleção não modificável.

Compilar e testar.

### Exemplo

Este exemplo trataEspecificaçãoinstâncias e como elas são usadas
para obter um conjunto desejado deprodutosinstâncias de um
ProductRepository. O exemplo também ilustra o padrão Specification
[Evans ] conforme descrito emSubstituir linguagem implícita por
intérprete (269).

Vamos começar estudando algum código de teste para o
ProductRepository. Antes que qualquer teste possa ser executado, um
ProductRepository(chamadorepositório) deve ser criado. Para o código
de teste, preencho umrepositóriocom brinquedoprodutos instâncias:

```java
public class ProductRepositoryTest extends TestCase {
    private ProductRepository repository;
    private Product fireTruck = new Product("f1234", "Fire Truck", Color.red, 8.95f, ProductSize.MEDIUM);
    private Product barbieClassic = new Product("b7654", "Barbie Classic", Color.yellow, 15.95f, ProductSize.SMALL);
    private Product frisbee = new Product("f4321", "Frisbee", Color.pink, 9.99f, ProductSize.LARGE); 
    private Product baseball = new Product("b2343", "Baseball", Color.white, 8.95f, ProductSize.NOT_APPLICABLE); 
    private Product toyConvertible = new Product("p1112", "Toy Porsche Convertible", Color.red, 230.00f, ProductSize.NOT_APPLICABLE); 
    
    protected void setUp() { 
        repository = new ProductRepository(); 
        repository.add(fireTruck); 
        repository.add(barbieClassic); 
        repository.add(frisbee); 
        repository.add(baseball); 
        repository.add(toyConvertible); 
    }
}
```

O primeiro teste que estudaremos procuraprodutosinstâncias de uma
determinada cor por meio de uma chamada para
repositório.selectBy(...):

```java
public class ProductRepositoryTest extends TestCase {
    public void testFindByColor() { 
        List foundProducts = repository.selectBy(new ColorSpec(Color.red)); 
        assertEquals("found 2 red products", 2, foundProducts.size()); 
        assertTrue("found fireTruck", foundProducts.contains(fireTruck)); 
        assertTrue( "found Toy Porsche Convertible", foundProducts.contains(toyConvertible));
    }
}
```

Orepositório.selectBy(...)método se parece com isso:

```java
public class ProductRepository { 
    private List products = new ArrayList();

    public Iterator iterator() { 
        return products.iterator(); 
    }

    public List selectBy(List specs) { 
        List foundProducts = new ArrayList(); 
        Iterator products = iterator(); 
        while (products.hasNext()) { 
            Product product = (Product)products.next(); 
            if (spec.isSatisfiedBy(product )) 
                foundProducts.add(product); 
        }
        
        return foundProducts; 
    }
```

Vejamos agora outro teste, que chama uma função diferente
repositório.selectBy(...)método. Este teste monta uma
ListadeEspecificaçãoinstâncias, a fim de selecionar tipos
específicos de produtos darepositório:

```java
public class ProductRepositoryTest extends TestCase {
    // ...

    public void testFindByColorSizeAndBelowPrice() { 
        List specs = new ArrayList(); 
        specs.add(new ColorSpec(Color.red)); 
        specs.add(new SizeSpec(ProductSize.SMALL)); 
        specs.add(new BelowPriceSpec(10.00)); 
        List foundProducts = repository.selectBy(specs); 
        assertEquals( "small red products below $10.00", 0, foundProducts.size()); 
    }
}
```

OLista-baseadorepositório.selectBy(...)método se parece com
isso:

```java
public class ProductRepository { 
    public List selectBy(List specs) { 
        List foundProducts = new ArrayList();
        Iterator products = iterator();
        while (products.hasNext()) { 
            Product product = (Product)products.next(); 
            Iterator specifications = specs.iterator(); 
            boolean satisfiesAllSpecs = true; 
            while (specifications.hasNext()) { 
                Spec productSpec = ((Spec)specifications.next()); 
                satisfiesAllSpecs &= productSpec.isSatisfiedBy(product); 
            } 
            if (satisfiesAllSpecs) 
                foundProducts.add(product); 
        } 
    
        return foundProducts; 
    }
}
```

Como você pode ver, oLista-baseadoselecionePor(...)método é mais
complicado do que oSpec selectBy(...)método. Se você comparar os
dois métodos, notará uma boa quantidade de código duplicado. Um
composto pode ajudar a remover essa duplicação; no entanto, há
outra maneira de remover a duplicação que não envolve uma
composição. Considere isto:

```java
public class ProductRepository {
    public List selectBy(Spec spec) {
        Spec[] specs = { spec }; 
        return selectBy(Arrays.asList(specs)); 
    }
    public List selectBy(List specs) { 
        // ...
        // same implementation as before
    }
}
```

Esta solução mantém o mais complicadoLista-baseado
selecionePor(...)método. No entanto, também simplifica
completamente oSpec selectBy(...)método, o que reduz
bastante o código duplicado. A única duplicação restante é a
existência dos doisselecionePor(...)métodos.

Então, é sensato usar esta solução em vez de refatorar para
Composite? Sim e não. Tudo depende das necessidades do código
em questão. Para o sistema no qual este código de exemplo foi
baseado, é necessário suportar consultas com condições OR, AND
e NOT, como esta:

```java
product.getColor() != targetColor || product.getPrice() < targetPrice
```

OLista-baseadoselecionePor(...)O método não pode suportar tais
consultas. Além disso, ter apenas umselecionePor(...)método é preferido
para que os clientes possam chamá-lo de maneira uniforme. Portanto,
decido refatorar para o padrão Composite implementando as etapas a
seguir.

1.OLista-baseadoselecionePor(...)é o método de muitos
objetos. Aceita o seguinte parâmetro:Especificações da lista.
Meu primeiro passo é criar uma nova classe que manterá o
valor doespecificaçõesparâmetro e forneceracessá-lo através de um método getter:

```java
public class CompositeSpec { 
    private List specs; 

    public CompositeSpec(List specs) { 
        this.specs = specs; 
    } 
    
    public List getSpecs() { 
        return specs;
    }
}
```

A seguir, instanciarei essa classe dentro doLista-baseado
selecionePor(...)e atualize o código para chamar seu método
getter:

```java
public class ProductRepository {
    public List selectBy(List specs) { 
        CompositeSpec spec = new CompositeSpec(specs); 
        List foundProducts = new ArrayList(); 
        Iterator products = iterator(); 
        while (products.hasNext()) { 
            Product product = (Product)products.next(); 
            Iterator specifications = spec.getSpecs().iterator(); 
            boolean satisfiesAllSpecs = true; 
            while (specifications.hasNext()) { 
                Spec productSpec = ((Spec)specifications.next()); 
                satisfiesAllSpecs &= productSpec.isSatisfiedBy(product); 
            } 
            if (satisfiesAllSpecs) 
                foundProducts.add(product); 
        }

        return foundProducts; 
    }
}
```

Eu compilo e testo para confirmar se essas alterações funcionam.

2.Agora eu aplicoExtrair Método[F ] noselecionePor(...) código que
lida especificamente comespecificações:

```java
public class ProductRepository {
    public List selectBy(List specs) { 
        CompositeSpec spec = new CompositeSpec(specs); 
        List foundProducts = new ArrayList(); 
        Iterator products = iterator(); 
        while (products.hasNext()) { 
            Product product = (Product)products.next(); 
            if (isSatisfiedBy(spec, product)) 
                foundProducts.add(product); 
        } 
        return foundProducts; 
    }
    
    public boolean isSatisfiedBy(CompositeSpec spec, Product product) { 
        Iterator specifications = spec.getSpecs().iterator(); 
        boolean satisfiesAllSpecs = true; 
        while (specifications.hasNext()) { 
            Spec productSpec = ((Spec)specifications.next());
            satisfiesAllSpecs &= productSpec.isSatisfiedBy(product); 
        }
        
        return satisfiesAllSpecs; 
    }
}
```

O compilador e o código de teste estão satisfeitos com essa alteração,
então agora posso aplicarMétodo de movimentação[F ] para mover o
estáSatisfeitoPor(...)método para oCompositeSpec
aula:

```java
public class ProductRepository {
    public List selectBy(List specs) { 
        CompositeSpec spec = new CompositeSpec(specs);
        List foundProducts = new ArrayList(); 
        Iterator products = iterator(); 
        while (products.hasNext()) { 
            Product product = (Product)products.next(); 
            if (spec.isSatisfiedBy(product)) 
                foundProducts.add(product); 
        } 
        return foundProducts; 
    }
        
    public class CompositeSpec {
        public boolean isSatisfiedBy(Product product) { 
            Iterator specifications = getSpecs().iterator(); 
            boolean satisfiesAllSpecs = true;
            while (specifications.hasNext()) { 
                Spec productSpec = ((Spec)specifications.next());
                satisfiesAllSpecs &= productSpec.isSatisfiedBy(product); 
            }
            return satisfiesAllSpecs; 
        }
    }
}
```

Mais uma vez, verifico se o compilador e o código de teste estão
satisfeitos com essa alteração. Ambos são.

3.Os doisselecionePor(...)os métodos agora são quase
idênticos. A única diferença é que oLista-baseado
selecionePor(...)método instancia umCompositeSpec
instância:

```java
public class ProductRepository {
    public List selectBy(Spec spec) { 
        // same code
    }
    public List selectBy(List specs) { 
        CompositeSpec spec = new CompositeSpec(specs);
        // same code
    }
}
```

A próxima etapa ajudará a remover o código duplicado.

4.agora eu quero fazer oLista-baseadoselecionePor(...)
método chamar o one-Spec selectBy(...)método, assim:

```java
public class ProductRepository {
    public List selectBy(Spec spec) {
        // ...
    }
    public List selectBy(List specs) { 
        return selectBy(new CompositeSpec(specs)); 
    }
}
```

O compilador não gosta deste código porque
CompositeSpecnão compartilha a mesma interface que
Especificação, o tipo usado pelo chamadoselecionePor(...)método.
Especificaçãoé uma classe abstrata que se parece com isso:

img

DesdeCompositeSpecjá implementa o estáSatisfeitoPor(...)
método declarado porEspecificação, é trivial fazer
CompositeSpecuma subclasse deEspecificação:

```java
public class CompositeSpec extends Spec ...
```

Agora o compilador está satisfeito, assim como o código de teste.

5.Porque oLista-baseadoselecionePor(...)método agora é apenas
uma linha de código que chama o one-Spec selectBy(...)método,
incorporo-o aplicandoMétodo embutido[F ]. Código do cliente que
costumava chamar oLista-baseado selecionePor(...)agora chama o
um-Spec selectBy(...) método. Aqui está um exemplo de tal
mudança:

```java
public class ProductRepositoryTest {
    public void testFindByColorSizeAndBelowPrice() { 
        List specs = new ArrayList(); 
        specs.add(new ColorSpec(Color.red)); 
        specs.add(new SizeSpec(ProductSize.SMALL)); 
        specs.add(new BelowPriceSpec(10.00)); 
        // List foundProducts = repository.selectBy(specs); 
        List foundProducts = repository.selectBy(new CompositeSpec(specs));
    }
}
```

Agora há apenas umselecionePor(...)método que aceita
Especificaçãoobjetos comoColorSpec,SizeSpec, ou o novo
CompositeSpec. Este é um começo útil. No entanto, para construir
Estruturas compostas que oferecem suporte a pesquisas de
produtos, como product.getColor() != targetColor ||
product.getPrice() < targetPrice, há uma necessidade de
classes comoNotSpeceOrSpec. Não vou mostrar como eles
são criados aqui; você pode ler sobre eles na refatoração
Substituir linguagem implícita por intérprete
(269).

6 - A etapa final envolve a aplicaçãoColeção de encapsulamento [
F ] na coleção dentro deCompositeSpec. eu faço isso para
fazerCompositeSpecmais type-safe (ou seja, para evitar que os clientes
adicionem objetos a ele que não sejam uma subclasse de Especificação
).

Começo definindo oadd(especificação)método:

```java
public class CompositeSpec extends Spec {
    private List specs; 

    public void add(Spec spec) { 
        specs.add(spec); 
    }
}
```

Em seguida, eu inicializoespecificaçõespara uma lista vazia:

```java
public class CompositeSpec extends Spec {
    private List specs = new ArrayList();
}
```

Agora vem a parte divertida. Eu encontro todos os chamadores de
CompositeSpecdo construtor e atualizá-los para chamar um
novo, padrãoCompositeSpecconstrutor, bem como o novo
adicionar(...)método. Aqui está um chamador e as
atualizações que faço nele:

```java
public class ProductRepositoryTest {
    public void testFindByColorSizeAndBelowPrice() {
        // ...
        // List specs = new ArrayList(); 
        CompositeSpec specs = new CompositeSpec(); 
        specs.add(new ColorSpec(Color.red)); 
        specs.add(new SizeSpec(ProductSize.SMALL)); 
        specs.add(new BelowPriceSpec(10.00)); 
        List foundProducts = repository.selectBy(specs);
    }
    // ...
}
```

Eu compilo e testo para confirmar se as alterações funcionam. Depois
de atualizar todos os outros clientes, não há mais chamadores para
CompositeSpecdo construtor que leva umLista. Então eu
delete isso:

```java
public class CompositeSpec extends Spec {
    // public CompositeSpec(List specs) { 
    //    this.specs = specs; 
    // }
}
```

Agora eu atualizoCompositeSpecdegetSpecs(...)método para retornar
uma versão não modificável deespecificações:

```java
public class CompositeSpec extends Spec {
    private List specs = new ArrayList(); 
    
    public List getSpecs() {
        return Collections.unmodifiableList (specs); 
    }
}
```

Eu compilo e testo para confirmar que minha implementação de
Coleção de encapsulamentofunciona. Sim.CompositeSpecé
agora uma boa implementação do padrão Composite:

08-03-replace-composite-03.jpg

## Replace Hard-Coded Notifications with Observer

### O que é

**Se**

Subclasses are hard-coded to notify a single instance of
another class.

**Refatore para:**

Remove the subclasses by making their superclass
capable of notifying one or more instances of any class
that implements an Observer interface.

**Descrição do capítulo**

***Replace Hard-Coded Notifications with Observer*** (236) é um exemplo clássico de substituição de uma solução específica por uma geral. Nesse caso, há um acoplamento estreito entre os objetos que notificam e os objetos que são notificados. Para permitir instâncias de outros classes a serem notificadas, o código pode ser refatorado para usar um Observer [DP].

### Resumo

### Schema

08-04-observer-01.jpg

### Motivação

Saber quando refatorar para um Observador [DP ] primeiro envolve
entender quando você não precisa de um Observador. Considere o caso
de uma única instância de uma classe chamadaReceptorque
muda quando uma instância de uma classe chamadaNotificador
mudanças, como mostrado no diagrama a seguir.

08-04-observer-02.jpg

Neste caso, oNotificadorinstância se apega a umReceptor referência e é
codificado para notificar essa referência quando recebe novas
informações. Um acoplamento tão forte entre NotificadoreReceptorfaz
sentido quando alguémNotificador instância deve notificar apenas um
Receptorinstância. Se essa circunstância mudar e umNotificador
instância deve notificar numerososReceptorinstâncias, ou instâncias de
outras classes, o design deve evoluir. Isso é exatamente o que ocorreu
no framework JUnit de Kent Beck e Erich Gamma [Beck e Gama ].
Quando os usuários da estrutura precisavam de mais de uma parte
para observar as alterações em umResultado do testePor exemplo,
uma notificação embutida em código foi refatorada para usar o padrão
Observer (consulte a seção Exemplo para obter detalhes).

Toda implementação do padrão Observer leva a um acoplamento
frouxo entre um assunto (uma classe que é a fonte de notificações) e
seus observadores. A interface do Observer possibilita esse
acoplamento flexível. Para ser notificada sobre novas informações,
uma classe precisa apenas implementar a interface Observer e se
registrar com um subject. O sujeito, por sua vez, detém uma coleção
de instâncias que implementam a interface Observer, notificando-as
quando ocorrem mudanças.

As classes que desempenham o papel de subject devem conter um método
para adicionar Observadores e, opcionalmente, podem conter um método
para remover Observadores. Se nunca houver necessidade de remover
observadores durante a vida de uma instância de assunto, não há
necessidade de implementar o método remove. Embora isso pareça senso
comum básico, muitos programadores caem na armadilha de implementar
esse padrão exatamente como veem sua estrutura definida nos diagramas
de classe dos livros.

Dois problemas comuns de implementação do Observer a serem observados
envolvem notificações em cascata e vazamentos de memória. As notificações
em cascata ocorrem quando um subject notifica um observador, que, por
também desempenhar o papel de subject, notifica outros observadores, e
assim por diante. O resultado é um design excessivamente complicado que é
difícil de depurar. Um Mediador [DP ] pode ajudar a melhorar esse código.
Vazamentos de memória ocorrem quando uma instância do observador não
é coletada como lixo porque a instância ainda é referenciada por um assunto.
Se você se lembrar de sempre remover seus observadores de seus assuntos,
evitará vazamentos de memória.

O padrão Observer é usado frequentemente. Como não é difícil de
implementar, você pode ficar tentado a usar esse padrão antes que seja
realmente necessário. Resista a essa tentação! Se você começar com uma
notificação codificada, sempre poderá desenvolver um design para usar um
Observer quando realmente precisar de um.



### Prós e Contras

**Prós:**

+ Acopla vagamente um sujeito com seus observadores.
+ Suporta um ou vários observadores.

**Contras:**

+ Complica um design quando uma notificação codificada é
  suficiente.
+ Complica um design quando você tem notificações
  em cascata.
+ Pode causar vazamentos de memória quando os observadores
  não são removidos de seus assuntos.

### Mecânica da Refatoração

Anotificadoré uma classe que referencia e envia notificações
para outra classe. Areceptoré uma classe que se registra com
um notificador e recebe mensagens do notificador. Esta
refatoração detalha as etapas para eliminarnotificadores tornando sua superclasse umaassunto(conhecido emPadrões de
designcomo Sujeito Concreto) e transformando receptores em observadores(
conhecido emPadrões de designcomo Observadores Concretos).

1 - Se um notificador executar um comportamento personalizado em nome de
seu receptor, em vez de executar uma lógica de notificação pura, mova esse
comportamento para o receptor do notificador aplicando Método de
movimentação[F ]. Ao terminar, o notificador contém apenas métodos de
notificação(métodos que notificam um receptor).

Repita para todos os notificadores.

Compilar e testar.

2 - Produza uma interface de observador aplicandoExtrair interface[F ] em um
receptor, selecionando apenas os métodos chamados por seu notificador. Se
outros notificadores chamarem métodos do receptor que não estejam na
interface do observador, adicione esses métodos à interface do observador
para que funcione para todos os receptores.

Compilar.

3 - Faça com que cada receptor implemente a interface do observador. Em
seguida, faça com que cada notificador se comunique com seu receptor
exclusivamente por meio da interface do observador. Cada receptor é agora
um observador.

Compilar e testar.

4 - Escolha um notificador e apliqueMétodo de puxar para cima[F ] em
seus métodos de notificação. Isso inclui extrair a referência da interface
do observador do notificador, bem como o código para definir essa
referência. A superclasse do notificador agora é o sujeito.

+ Repita para todos notificadores.
+ Compilar.

5 - Atualize o observador de cada notificador para registrar e se
comunicar com o assunto, em vez do notificador e, em seguida,
exclua o notificador.

Compilar e testar.

6 - Refatore o assunto para que ele se agarre a uma coleção de
observadores, em vez de apenas um. Isso inclui atualizar a maneira
como os observadores se registram com seu assunto. É comum criar
um método sobre o assunto para adicionar observadores (por
exemplo,addObserver(observador observador)).

Por fim, atualize o assunto para que seus métodos de notificação notifiquem todos
os observadores em sua coleção de observadores.

+ Compilar e testar.

### Exemplo

O esboço do código no início desta refatoração descreve uma
parte do design do JUnit Testing Framework de Kent Beck e
Erich Gamma [Beck e Gama ]. No JUnit 2.x, os autores definiram
doisResultado do testesubclasses chamadas
UITestResulteTextTestResult, ambos são parâmetros de
coleta (consulteMover Acumulação para Parâmetro de Coleta
, 313).

Resultado do testesubclasses reúnem informações de objetos de caso de
teste (por exemplo, se um teste passou ou falhou) para relataressa informação a umTestRunner, uma classe que exibe os
resultados do teste na tela. OUITestResultclasse foi codificada para
relatar informações para um Java Abstract Window Toolkit (AWT)
TestRunner, enquanto oTextTestResultfoi codificado para relatar
informações para um console baseadoTestRunner. Aqui está uma
olhada em uma parte doUITestResultclasse e a conexão com sua
TestRunner:

```java
class UITestResult extends TestResult { 
    private TestRunner fRunner; UITestResult( TestRunner runner ) {
        fRunner= runner; 
    } 
    
    public synchronized void addFailure(Test test, Throwable t) { 
        super.addFailure(test, t); 
        fRunner.addFailure(this, test, t); // notification to TestRunner 
    } 
    // ... 
} 
```

```java
package ui; 

public class TestRunner extends Frame { // TestRunner for AWT 
    private TestResult fTestResult; 
    // ... 
    protected TestResult createTestResult() { 
        return new UITestResult(this); // hard-coded to UITestResult 
    } 
    
    synchronized public void runSuite() { 
        // ... 
        fTestResult = createTestResult(); 
        testSuite.run( fTestResult ); 
    } 
    
    public void addFailure(TestResult result, Test test, Throwable t) { 
        // ... 
        // display the failure in a graphical AWT window 
    } 
}
```

Este projeto era perfeitamente simples e bom, pois nesta fase da
evolução do JUnit, se oResultado do teste/TestRunner.

Se as notificações tivessem sido programadas com o padrão Observer, o
design teria sido mais sofisticado do que o necessário. Essa circunstância
mudou quando os usuários do JUnit solicitaram a capacidade de vários
objetos observarem um Resultado do teste em tempo de execução. Agora,
o relacionamento codificado
entreTestRunnerinstâncias eResultado do testeinstâncias não era
suficiente. Fazer umResultado do testeinstância capaz de suportar
muitos observadores, uma implementação Observer era
necessária.

Essa mudança seria uma refatoração ou um aprimoramento?
Fazendo JUnit'sTestRunnerinstâncias dependem de um Observer
implementação, em vez de ser codificado para específicos Resultado do
testesubclasses, não mudariam seu comportamento; isto
apenas os tornaria mais frouxamente acoplados aResultado do teste.

Por outro lado, fazer umaResultado do testea classe manter uma coleção de
observadores, em vez de apenas um observador solitário, seria um novo
comportamento. Portanto, uma implementação do Observer neste exemplo
é tanto uma refatoração (isto é, uma transformação que preserva o
comportamento) quanto um aprimoramento. No entanto, a refatoração é o
trabalho essencial aqui, enquanto o aprimoramento (suportando uma
coleção de observadores em vez de apenas um observador) é simplesmente
uma consequência de uma introdução do padrão Observer.

1 - A primeira etapa envolve garantir que cada notificador implemente
apenas métodos de notificação, em vez de executar um
comportamento personalizado em nome de um receptor. Isso é
verdade deUITestResulte não é verdadeTextTestResult.
Ao invés de notificar seuTestRunnerde resultados de testes,
TextTestResultrelata os resultados do teste diretamente para o
console usando Java'sSystem.out.println()método:

```java
public class TextTestResult extends TestResult {
    // ...
    public synchronized void addError(Test test, Throwable t) { 
        super.addError(test, t); 
        System.out.println("E"); 
    } 
    
    public synchronized void addFailure(Test test, Throwable t) { 
        super.addFailure(test, t); 
        System.out.print("F"); 
    }
}
```

aplicandoMétodo de movimentação[F ], Eu façoTextTestResultcontém métodos de notificação puros, enquanto move seu
comportamento personalizado para seu associadoTestRunner:

```java
package textui; 

public class TextTestResult extends TestResult {
    // ... 
    private TestRunner fRunner; 
    
    TextTestResult( TestRunner runner ) { 
        fRunner= runner; 
    } 
    
    public synchronized void addError(Test test, Throwable t) { 
        super.addError(test, t); 
        fRunner.addError(this, test, t); 
    }
}
```

```java
package textui;

public class TestRunner {
    // ...
    protected TextTestResult createTestResult() { 
        return new TextTestResult( this ); 
    } 
    
    // moved method 
    public void addError(TestResult testResult, Test test, Throwable t) { 
        System.out.println("E"); 
    }
// ...
}
```

TextTestResultagora notifica seuTestRunner, que relata
informações para a tela. Eu compilo e testo para confirmar
se as alterações funcionam.

2 - Agora eu quero criar uma interface de observador chamada
TestListener. Para criar essa interface, aplicoExtrair
Interface[F ] noTestRunnerassociado com o TextTestResult.
Ao escolher quais métodos incluir na nova interface, devo
saber quais métodos TextTestResultchamaTestRunner.
Esses métodos são destacados em negrito na listagem a
seguir:

```java
class TextTestResult extends TestResult {
    public synchronized void addError(Test test, Throwable t) { 
        super.addError(test, t); 
        fRunner.addError(this, test, t); 
    } 
    
    public synchronized void addFailure(Test test, Throwable t) { 
        super.addFailure(test, t); 
        fRunner.addFailure(this, test, t); 
    } 
    
    public synchronized void startTest(Test test) { 
        super.startTest(test); 
        fRunner.startTest(this, test); 
    }
}
```

Dadas essas informações, extraio a seguinte interface:

```java
public interface TestListener { 
    public void addError(TestResult testResult, Test test, Throwable t); 
    public void addFailure(TestResult testResult, Test test, Throwable t); 
    public void startTest(TestResult testResult, Test test);
} 

public class TestRunner implements TestListener ...
```

Agora eu inspeciono o outro notificador,UITestResult, para ver
se chamaTestRunnermétodos que não estão no TestListener
interface. Ele faz - ele substitui um Resultado do testemétodo
chamadofimTeste(...):

```java
package ui; 

class UITestResult extends TestResult {
    // ...
    public synchronized void endTest(Test test) { 
        super.endTest(test); 
        fRunner.endTest(this, test); 
    }
}
```

Isso me leva a atualizarTestListenercom o método
adicional:

```java
public interface TestListener {
    // ...
    public void endTest(TestResult testResult, Test test);
}
```

Eu compilo para confirmar que tudo funciona bem. No entanto,
não funciona porque oTestRunnerpara
TextTestResultimplementa oTestListener interface e não
declara o métodofimTeste(...). Sem problemas; Eu
simplesmente adiciono esse método aoTestRunner para
fazer tudo rodar:

```java
public class TestRunner implements TestListener {
    // ...
    public void endTest(TestResult testResult, Test test) { 
    }
}
```

3.Agora devo fazerUITestResultestá associado TestRunner
implementoTestListenere também fazer os dois
TextTestResulteUITestResult comunicar com seus
TestRunnerinstâncias usando o TestListenerinterface. Aqui
estão algumas das mudanças:

```java
public class TestRunner extends Frame implements TestListener {
    // ...
} 
    
class UITestResult extends TestResult {
    // ...
    protected TestListener fRunner;

    UITestResult( TestListener runner) { 
        fRunner= runner; 
    }
}

public class TextTestResult extends TestResult {
    // ...
    protected TestListener fRunner; 
    
    TextTestResult( TestListener runner) { 
        fRunner = runner; 
    }
}
```

Eu compilo e testo para confirmar se essas alterações funcionam.
4.Agora eu aplicoMétodo de puxar para cima[F ] em todos os
métodos de notificação emTextTestResulteUITestResult. Esse
passo é complicado porque os métodos que vou puxar já existem
emResultado do teste, a superclasse de
TextTestResulteUITestResult. Para fazer isso corretamente,
preciso mesclar o código doResultado do teste subclasses
emResultado do teste. Isso produz as seguintes alterações:

```java
public class TestResult {
    // ... 
    protected TestListener fRunner; 
    
    public TestResult(TestListener runner) { 
        this(); 
        fRunner = runner;
    } 

    public TestResult() { 
        fFailures= new Vector(10); 
        fErrors = new Vector(10); 
        fRunTests= 0; 
        fStop = false; 
    } 
    
    public synchronized void addError(Test test, Throwable t) { 
        fErrors.addElement(new TestFailure(test, t)); 
        fRunner.addError(this, test, t); 
    } 
    
    public synchronized void addFailure(Test test, Throwable t) { 
        fFailures.addElement(new TestFailure(test, t)); 
        fRunner.addFailure(this, test, t); 
    } 
    
    public synchronized void endTest(Test test) { 
        fRunner.endTest(this, test); 
    } 
    
    public synchronized void startTest(Test test) { 
        fRunTests++; 
        fRunner.startTest(this, test); 
    }
}
```

.

```java
package ui;

class UITestResult extends TestResult {
} 
```

.

```java
package textui; 

class TextTestResult extends TestResult {
}
```

Essas alterações passam pelo compilador sem problemas.

5.agora posso atualizar oTestRunnerinstâncias para trabalhar
diretamente comResultado do teste. Por exemplo, aqui está uma
alteração que faço paratextui.TestRunner:

```java
package textui; 

public class TestRunner implements TestListener {
    // ...
    protected TestResult createTestResult() { 
        return new TestResult(this) ; 
    } 
    
    protected void doRun(Test suite, boolean wait) {
        // ...
        TestResult result = createTestResult();
    }
}
```

Eu faço uma mudança semelhante paraui.TestRunner. Por
fim, apago os doisTextTestResulteUITestResult. Eu compilo e
testo. A compilação é boa, mas os testes falham
miseravelmente!

Eu faço algumas explorações e um pouco de depuração. Eu descubro que
minhas mudanças paraResultado do testepode causar um ponteiro nulo
exceção quando ofRunnercampo não foi inicializado. Essa
circunstância ocorre apenas quandoResultado do testeO construtor
original de é chamado porque não inicializafRunner. Eu corrijo esse
problema isolando todas as chamadas parafRunnercom a seguinte lógica condicional:

```java
public class TestResult {
    // ...
    public synchronized void addError(Test test, Throwable t) { 
        fErrors.addElement(new TestFailure(test, t)); 
        if (null != fRunner) 
            fRunner.addError(this, test, t); 
    } 
    
    public synchronized void addFailure(Test test, Throwable t) { 
        fFailures.addElement(new TestFailure(test, t)); 
        if (null != fRunner) 
            fRunner.addFailure(this, test, t); 
    }
}
```

Os testes agora passaram e estou feliz de novo. Os dois
TestRunners agora são observadores do assunto,
Resultado do teste. Neste ponto, posso deletar os dois
TextTestResulteUITestResultporque não estão mais sendo
usados.

6.A etapa final envolve a atualizaçãoResultado do testepara que possa
manter e notificar um ou mais observadores. eu declaro um Listade
observadores assim:

```java
public class TestResult {
    // ...
    private List observers = new ArrayList();
}
```

Em seguida, forneço um método pelo qual os observadores podem
se adicionar à lista de observadores:

```java
public class TestResult {
    // ...
    public void addObserver(TestListener testListener) { 
        observers.add(testListener); 
    }
}
```

A seguir, atualizoResultado do testemétodos de notificação do para que
funcionem com a lista de observadores. Aqui está uma dessas atualizações:

```java
public class TestResult {
    // ...
    public synchronized void addError(Test test, Throwable t) { 
        fErrors.addElement(new TestFailure(test, t)); 
        for (Iterator i = observers.iterator(); i.hasNext();) { 
            TestListener observer = (TestListener)i.next(); 
            observer.addError(this, test, t); 
        } 
    }
}
```

Por fim, atualizo oTestRunnerinstâncias para que usem o
novoaddObserver()método em vez de chamar um Resultado
do testeconstrutor. Aqui está a alteração que faço no
textui.TestRunneraula:

```java
package textui; 

public class TestRunner implements TestListener {
    // ...
    protected TestResult createTestResult() { 
        TestResult testResult = new TestResult(); 
        testResult.addObserver(this); 
        return testResult; 
    }
}
```

Depois de compilar e testar se essas alterações funcionam, posso
excluir o construtor agora não utilizado emResultado do teste:

```java
public class TestResult {
    // ...
    // public TestResult(TestListener runner) { 
    //     this(); 
    //     fRunner = runner; 
    // }
}
```

Isso completa a refatoração para o padrão Observer. Agora,
Resultado do testeas notificações não são mais codificadas
para específicoTestRunnerinstâncias, eResultado do testepode
manipular um ou vários observadores de seus resultados.

## Unify Interfaces with Adapter

### O que é

**Se**

Clients interact with two classes, one of which has a preferred interface.

**Refare para:**

Unify the interfaces with an Adapter.

**Descrição do capítulo**

Um Adapter [DP] fornece outra forma de unificar interfaces. Quando os clientes se comunicam com classes semelhantes usando interfaces diferentes, tende a haver uma lógica de processamento duplicada. aplicando ***Unify Interfaces with Adapter*** (247), os clientes podem interagir com classes semelhantes usando uma interface genérica. Isso tende a abrir caminho para outras refatorações para remover a lógica de processo duplicada no código do cliente.

### Resumo

### Schema

08-05-unify-with-adapter-01.jpg

### Motivação

Refatorando para um Adaptador [DP ] é útil quando todas as
condições a seguir são verdadeiras. 

+ Duas classes fazem a mesma coisa ou coisas semelhantes e têm
  interfaces diferentes.
+ O código do cliente poderia ser mais simples, mais direto e mais
  sucinto se as classes compartilhassem a mesma interface.
+ Você não pode simplesmente alterar a interface de uma das classes porque
  ela faz parte de uma biblioteca de terceiros, ou faz parte de uma estrutura
  que muitos outros clientes já usam, ou você não tem código-fonte.

O cheiroClasses Alternativas com Interfaces Diferentes (43) identifica quando o
código pode estar se comunicando com classes alternativas por meio de uma
interface comum, mas por algum motivo não o faz. Uma maneira simples de
resolver esse problema é renomear ou mover métodos até que as interfaces
sejam as mesmas. Se isso não for possível, digamos, porque você está
trabalhando com um código que não pode ser alterado (como uma classe ou
interface de terceiros, como um elemento DOM), talvez seja necessário
considerar a implementação de um adaptador.

A refatoração para um adaptador tende a generalizar o código e abrir
caminho para outras refatorações para remover o código duplicado.
Normalmente, nessa situação, você tem um código de cliente separado
para se comunicar com classes alternativas. Ao introduzir um adaptador
para unificar as interfaces das classes alternativas, você generaliza como
os clientes interagem com essas classes alternativas. Depois disso, outras
refatorações, comoMétodo de modelo de formulário
(205), pode ajudar a remover a lógica de processamento duplicada no código do
cliente. Isso geralmente resulta em um código de cliente mais simples e fácil de ler.

### Prós e Contras

**Prós**

+ Remove ou reduz o código duplicado, permitindo que os clientes se
comuniquem com classes alternativas por meio da mesma
interface.
+ Simplifica o código do cliente ao possibilitar a comunicação
com objetos por meio de uma interface comum.
+ Unifica como os clientes interagem com classes alternativas.

**Contras**

+ Complica um design quando você pode alterar a
  interface de uma classe em vez de adaptá-la.

### Mecânica da Refatoração

1 - Um cliente prefere a interface de uma classe em detrimento de outra, mas o cliente gostaria de se comunicar
com ambas as classes por meio de uma interface comum. AplicarExtrair interface[F ] na classe com a interface
preferencial do cliente para produzir uma interface comum. Atualize qualquer um dos métodos desta classe que
aceita um argumento de seu próprio tipo para aceitar o argumento como tipo de interface comum.

As restantes mecânicas vão agora permitir ao cliente comunicar com o adaptado(a
classe com a interface do clientenãopreferir) através da interface comum.

Compilar e testar.

2 - Na classe cliente que usa o adaptee, apliqueExtrair classe[F ] para produzir um primitivo
adaptador(uma classe contendo um campo adaptee, um método getter para o adaptee e um
método setter ou parâmetro construtor e código para definir o valor do adaptee).

3 - Atualize todos os campos da classe cliente, variáveis locais e parâmetros do tipo adaptee para serem do
tipo adapter. Isso envolve atualizar as chamadas do cliente no adaptee para primeiro obter uma referência
adaptee do adaptador antes de invocar o método adaptee.

Compilar e testar.

4 - Sempre que o cliente invocar o mesmo método adaptee (através do método getter do
adaptador), apliqueExtrair Método[F ] para produzir um método de invocação adaptee.
Parametrize este método de chamada adaptee com um adaptee e faça o método usar o valor
do parâmetro quando invocar o método adaptee. Por exemplo, um cliente faz uma invocação
no adaptee,atual, que é do tipoElementAdapter:

```java
ElementAdapter childNode = new ElementAdapter(...);
current.getElement().appendChild(childNode); // invocation
```

A invocação ematualé extraído para o método:

```java
appendChild(current, childNode);
```

O método,anexarCriança(...), se parece com isso:

```java
private void appendChild(ElementAdapter parent, ElementAdapter child) {
	parent.getElement().appendChild(child.getElement);
}
```


Compilar e testar. Repita esta etapa para todas as invocações do cliente de métodos adaptee.

5 - AplicarMétodo de movimentação[F ] em um método de chamada adaptee para movê-lo do cliente para
o adaptador. Cada chamada de cliente no método adaptee agora deve passar pelo adaptador.

Ao mover um método para o adaptador, torne-o semelhante ao método correspondente na interface
comum. Se o corpo de um método movido exigir um valor do cliente para compilar, evite adicioná-lo como
parâmetro ao método, pois isso fará com que a assinatura do método seja diferente do método
correspondente na interface comum. Sempre que possível, encontre uma maneira de passar o valor sem
perturbar a assinatura (por exemplo, passe-o por meio do construtor do adaptador ou passe alguma outra
referência de objeto ao adaptador para que ele possa obter o valor em tempo de execução). Se você precisar
passar o valor ausente para o método movido como um parâmetro, precisará revisar a assinatura do
método correspondente na interface comum para tornar os dois equivalentes.

Compilar e testar.

Repita para todos os métodos de chamada adaptee até que o adaptador contenha métodos com as
mesmas assinaturas que os métodos na interface comum.

6 - Atualize o adaptador para "implementar" formalmente a interface comum. Este deve ser um passo trivial
dado o trabalho já realizado. Altere todos os métodos do adaptador que aceitam um argumento do tipo
adaptador para aceitar o argumento como tipo de interface comum.

Compilar e testar.

7 - Atualize a classe do cliente para que todos os campos, variáveis locais e parâmetros usem a interface
comum em vez do tipo do adaptador.

Compilar e testar.

O código do cliente agora se comunica com ambas as classes usando a interface comum. Para remover ainda
mais a duplicação neste código de cliente, muitas vezes você pode aplicar refatorações comoMétodo de
modelo de formulário (205)eIntroduza a criação polimórfica com o método de fábrica (88).

### Exemplo

Este exemplo está relacionado ao código que cria XML (consulteSubstituir Árvore Implícita por Composta , 178;
Encapsular composição com construtor , 96; eIntroduza a criação polimórfica com o método de fábrica , 88). Neste
caso, existem dois construtores:XMLBuilderNameeConstrutor de DOM. Ambos se estendem
deAbstractBuilderName, que implementa oOutputBuilderinterface:

img

O código emXMLBuilderNameeConstrutor de DOMé basicamente o mesmo, exceto queXMLBuilderName
colabora com uma classe chamadaTagNode, enquantoConstrutor de DOMcolabora com objetos que
implementam oElementointerface:

08-05-unify-with-adapter-02.jpg



```java
public class DOMBuilder extends AbstractBuilder { 
    private Document document; 
    private Element root; 
    private Element parent;
    private Element current; 
    
    public void addAttribute(String name, String value) { 
        current.setAttribute(name, value); 
    } 
    public void addBelow(String child) { 
        Element childNode = document.createElement(child); 
        current.appendChild(childNode); 
        parent = current; 
        current = childNode; 
        history.push(current); 
    } 
    public void addBeside(String sibling) { 
        if (current == root) 
            throw new RuntimeException(CANNOT_ADD_BESIDE_R OOT); 
            
        Element siblingNode = document.createElement(sibling); 
        parent.appendChild(siblingNode); 
        current = siblingNode; 
        history.pop(); 
        history.push(current); 
    } 
    public void addValue(String value) { 
        current.appendChild(document.createTextNode(value)); 
    }
}
```

E aqui está o código semelhante deXMLBuilderName:

```java
public class XMLBuilder extends AbstractBuilder { 
    private TagNode rootNode; 
    private TagNode currentNode; 
    
    public void addChild(String childTagName) { 
        addTo(currentNode, childTagName); 
    } 
    public void addSibling(String siblingTagName) { 
        addTo(currentNode.getParent(), siblingTagName); 
    } 
    private void addTo(TagNode parentNode, String tagName) { 
        currentNode = new TagNode(tagName); parentNode.add(currentNode); 
    } 
    public void addAttribute(String name, String value) { 
        currentNode.addAttribute(name, value); 
    } 
    public void addValue(String value) { 
        currentNode.addValue(value); 
    }
}
```

Esses métodos, e vários outros que não estou mostrando para economizar espaço, são quase os mesmos
emConstrutor de DOMeXMLBuilderName, exceto pelo fato de que cada construtor trabalha com
qualquerTagNodeouElemento. O objetivo desta refatoração é criar uma interface comum para
TagNodeeElementopara que a duplicação nos métodos do construtor possa ser eliminada.

1 - Minha primeira tarefa é criar uma interface comum. Eu baseio esta interface noTagNodeclass porque sua
interface é a que eu prefiro para o código do cliente.TagNodetem cerca de dez métodos, cinco dos quais são
públicos. A interface comum precisa apenas de três desses métodos. eu aplicoExtrair interface[F ] para obter
o resultado desejado:



```java
public interface XMLNode { 
    public abstract void add(XMLNode childNode); 
    public abstract void addAttribute(String attribute, String value); 
    public abstract void addValue(String value);
} 

public class TagNode implements XMLNode {
    // ...
    public void add( XMLNode childNode) { 
        children().add(childNode); 
    } 
    // etc.
}
```



Eu compilo e testo para garantir que essas alterações funcionaram.

2 - Agora começo a trabalhar noConstrutor de DOMaula. Eu quero aplicarExtrair classe[F ] para
Construtor de DOMa fim de produzir um adaptador paraElemento. Isso resulta na criação da
seguinte classe:



```java
public class ElementAdapter { 
    Element element; 

    public ElementAdapter(Element element) { 
        this.element = element; 
    } 
    public Element getElement() { 
        return element; 
    }
}
```





3 - Agora eu atualizo todos osElementocampos emConstrutor de DOMser do tipoElementAdapter e
atualize qualquer código que precise ser atualizado por causa dessa alteração:

```java
public class DOMBuilder extends AbstractBuilder {
    private Document document; 
    private ElementAdapter rootNode; 
    private ElementAdapter parentNode; 
    private ElementAdapter currentNode; 

    public void addAttribute(String name, String value) { 
        currentNode.getElement().setAttribute(name, value); 
    } 
    public void addChild(String childTagName) { 
        ElementAdapter childNode = new ElementAdapter(document.createElement(childTagName)); 
        currentNode.getElement().appendChild(childNode.getElement()); 
        parentNode = currentNode; 
        currentNode = childNode; 
        history.push(currentNode); 
    } 
    public void addSibling(String siblingTagName) { 
        if (currentNode == root)
            throw new RuntimeException(CANNOT_ADD_BESIDE_ROOT); 
        
        ElementAdapter siblingNode = new ElementAdapter(document.createElement(siblingTagName)); 
        parentNode.getElement().appendChild(siblingNode .getElement()); 
        currentNode = siblingNode; 
        history.pop(); 
        history.push(currentNode); 
    }
}
```







4 - Agora eu crio um método de invocação adaptee para cada método adaptee chamado por
Construtor de DOM. eu usoExtrair Método[F ] para este fim, certificando-se de que cadaO método usa um adaptee como argumento e usa esse adaptee em seu corpo:

```java
public class DOMBuilder extends AbstractBuilder {
    public void addAttribute(String name, String value) { 
        addAttribute(currentNode, name, value); 
    }

    private void addAttribute(ElementAdapter current, String name, String value) { 
        currentNode.getElement().setAttribute(name, value); 
    }

    public void addChild(String childTagName) {
        ElementAdapter childNode = new ElementAdapter(document.createElement(childTagName)); 
        add(currentNode, childNode); 
        parentNode = currentNode; 
        currentNode = childNode; 
        history.push(currentNode); 
    }

    private void add(ElementAdapter parent, ElementAdapter child) { 
        parent.getElement().appendChild(child.getElement()); 
    }

    public void addSibling(String siblingTagName) { 
        if (currentNode == root) 
            throw new RuntimeException(CANNOT_ADD_BESIDE_ROOT); 
        
        ElementAdapter siblingNode = new ElementAdapter(document.createElement(siblingTagName)); 
        add(parentNode, siblingNode); 
        currentNode = siblingNode; 
        history.pop(); 
        history.push(currentNode); 
    }

    public void addValue(String value) { 
        addValue(currentNode, value); 
    }

    private void addValue(ElementAdapter current, String value) { 
        currentNode.getElement().appendChild(document.createTextNode(value)); 
    }
}
```





5.Agora posso mover cada método de invocação adaptee paraElementAdapterusandoMétodo de
movimentação[F ]. Eu gostaria que o método movido se assemelhasse aos métodos correspondentes na
interface comum,XMLNode, tanto quanto possível. Isso é fácil de fazer para todos os métodos, exceto
adicionar valor(...), que abordarei em um momento. Aqui estão os resultados depois de mover o
addAttribute(...)eadicionar(...)métodos:



```java
public class ElementAdapter { 
    Element element; 
    
    public ElementAdapter(Element element) { 
        this.element = element; 
    } 
    
    public Element getElement() { 
        return element; 
    } 
    
    public void addAttribute(String name, String value) {
        getElement().setAttribute(name, value); 
    } 
    
    public void add(ElementAdapter child) { 
        getElement().appendChild(child.getElement()); 
    } 
}
```



E aqui estão exemplos de mudanças emConstrutor de DOMcomo resultado do movimento:

```java
public class DOMBuilder extends AbstractBuilder {
    public void addAttribute(String name, String value) { 
        currentNode.addAttribute(name, value); 
    } 
    
    public void addChild(String childTagName) { 
        ElementAdapter childNode = new ElementAdapter(document.createElement(childTagName)); 
        currentNode.add(childNode); 
        parentNode = currentNode; 
        currentNode = childNode; 
        history.push(currentNode); 
    } 
}

// etc.
```



Oadicionar valor(...)método é mais complicado de mover paraElementAdapterporque depende de um
campo dentroElementAdapterchamadodocumento:

```java
public class DOMBuilder extends AbstractBuilder {
    private Document document; 

    public void addValue(ElementAdapter current, String value) { 
        current.getElement().appendChild(document.createTextNode(value));
    }
}
```

não quero passar um campo do tipoDocumentopara oadicionar valor(...)método em
ElementAdapterporque se eu fizer isso, esse método vai se afastar ainda mais do alvo, que é
oadicionar valor(...)método emXMLNode:



```java
public interface XMLNode...
	public abstract void addValue(String value);
```

Neste ponto, decido passar uma instância deDocumentoparaElementAdapteratravés de seu
construtor:

```java
public class ElementAdapter {
    Element element;
    Document document; 
    
    public ElementAdapter(Element element, Document document ) { 
        this.element = element; 
        this.document = document; 
    }
}
```



E eu faço as mudanças necessárias emConstrutor de DOMpara chamar esse construtor atualizado. Agora posso me
mover facilmenteadicionar valor(...):



```java
public class ElementAdapter {
    public void addValue(String value) { 
        getElement().appendChild(document.createTextNode(value)); 
    }
}
```



6.Agora eu façoElementAdapterimplementar oXMLNodeinterface. Esta etapa é direta,
exceto por uma pequena alteração noadicionar(...)método para permitir que ele chame o
getElement()método que não faz parte doXMLNodeinterface:

```java
public class ElementAdapter implements XMLNode {
    public void add(XMLNode child) {
        ElementAdapter childElement = (ElementAdapter)child; 
        getElement().appendChild(childElement.getElement());
    }
}
```





7.O passo final é atualizarConstrutor de DOMpara que todos os seusElementAdaptercampos,
variáveis locais e parâmetros mudam seu tipo paraXMLNode:

```java
public class DOMBuilder extends AbstractBuilder {
    private Document document; 
    private XMLNode rootNode; 
    private XMLNode parentNode; 
    private XMLNode currentNode; 
    
    public void addChild(String childTagName) { 
        XMLNode childNode = new ElementAdapter(document.createElement(childTagName), document); 
        // ... 
    } 
    
    protected void init(String rootName) { 
        document = new DocumentImpl(); 
        rootNode = new ElementAdapter(document.createElement(rootName), document); 
        document.appendChild(((ElementAdapter)rootNode).getElement()); 
        // ... 
    }
}
```





Neste ponto, adaptandoElementoemConstrutor de DOM, o código emXMLBuilderNameé tão parecido com
o deConstrutor de DOMque faz sentido puxar o código semelhante paraAbstractBuilderName. Eu consigo
isso aplicandoMétodo de modelo de formulário (205)eIntroduza a criação polimórfica com o método de
fábrica (88). O diagrama a seguir mostra o resultado.



08-05-unify-with-adapter-03.jpg



## Extract Adapter



### O que é

**Se**

One class adapts multiple versions of a component,
library, API, or other entity.

**Refare para:**

Extract an Adapter for a single version of the component,
library, API, or other entity.

**Descrição do capítulo**

Quando uma classe atua como um Adapter para várias versões de um componente, biblioteca, API ou outra entidade, a classe geralmente contém duplicação e geralmente não possui um design simples. Aplicando ***Extract Adapter*** (258) produz classes que implementam uma interface comum e adaptam uma única versão de algum código.



### Resumo

### Schema

08-06-extract-adapter-01.jpg

### Motivação

Embora o software geralmente deva oferecer suporte a várias versões de um
componente, biblioteca ou API, o código que lida com essas versões não
precisa ser uma bagunça confusa. No entanto, encontro rotineiramente
códigos que tentam lidar com várias versões de algo sobrecarregando
classes com variáveis de estado, construtores e métodos específicos da
versão. Acompanhando tal código estão os comentários como "Isto é para a versão X - exclua este código quando
mudarmos para a versão Y!" Claro, como se isso fosse acontecer. A
maioria dos programadores não exclui o código da versão X por medo de
que algo que eles não conheçam ainda dependa dele. Portanto, os
comentários não são excluídos e muitas versões suportadas pelo código
permanecem no código.

Agora considere uma alternativa: para cada versão de algo que você precisa
oferecer suporte, crie uma classe separada. O nome da classe pode até incluir o
número da versão do que ela suporta, para ser realmente explícito sobre o que
ela faz. Essas classes são chamadas de Adaptadores [DP ]. Os adaptadores
implementam uma interface comum e são responsáveis por funcionar
corretamente com uma (e geralmente apenas uma) versão de algum código. Os
adaptadores facilitam a troca do código do cliente em suporte para uma
biblioteca ou versão de API ou outra. E os programadores confiam
rotineiramente nas informações de tempo de execução para configurar seus
programas com o Adaptador correto.

Eu refatoro para Adaptadores com bastante frequência. Eu gosto de adaptadores
porque eles me permitem decidir como quero me comunicar com o código de
outras pessoas. Em um mundo em rápida mudança, os adaptadores me ajudam a
ficar isolado de APIs altamente úteis, mas que mudam rapidamente, como aquelas
que surgem eternamente do mundo do código aberto.

Em alguns casos, os adaptadores podem se adaptar demais. Por exemplo, um
cliente precisa acessar o comportamento de um adaptado, mas não pode
acessar esse comportamento porque só tem acesso ao adaptado por meio de
um Adaptador. Nesse caso, o Adaptador deve ser reprojetado para acomodar as
necessidades do cliente.

Os sistemas que dependem de várias versões de um componente,
biblioteca ou API tendem a ter uma boa dose de lógica dependente de
versão espalhada por todo o código (um sinal claro daExpansão de
soluçõescheiro,43). Embora você não queira complicar um projeto
refatorando para o Adapter muito cedo, é útil aplicaressa refatoração assim que você encontrar complexidade, condicionalidade
de propagação ou um problema de manutenção resultante do código
escrito para lidar com várias versões.

### Adapter e Facade

O padrão Adapter é frequentemente confundido com o padrão
Facade [DP ]. Ambos os padrões tornam o código mais fácil de usar,
mas cada um opera em níveis diferentes: os adaptadores adaptam
objetos, enquanto as fachadas adaptam subsistemas inteiros.
As fachadas são frequentemente usadas para se comunicar com
sistemas legados. Por exemplo, considere uma organização com
um sofisticado sistema COBOL de dois milhões de linhas que
gera continuamente uma boa parte da receita da organização.
Tal sistema pode ser difícil de estender ou manter porque nunca
foi refatorado. No entanto, por conter funcionalidades
importantes, novos sistemas devem depender dele.
As fachadas são úteis neste contexto. Eles fornecem novos sistemas
com visualizações mais simples de código legado mal projetado ou
altamente complexo. Esses novos sistemas podem se comunicar
com objetos Facade, que por sua vez fazem todo o trabalho duro de
comunicação com o código legado.
Com o tempo, as equipes podem reescrever subsistemas legados
inteiros simplesmente escrevendo novas implementações para
cada fachada. O processo é assim:

+ Identifique um subsistema de seu sistema legado.
+ Escreva fachadas para esse subsistema.
+ Escreva novos programas clientes que dependem de chamadas para as
  fachadas.
+ Crie versões de cada fachada usando tecnologias
  mais recentes.
+ Teste se as fachadas mais novas e mais antigas funcionam de
  forma idêntica.
+ Atualize o código do cliente para usar o novo Facades.
+ Repita para o próximo subsistema.

### Prós e Contras

**Prós:**

+ Isola as diferenças nas versões de um componente, biblioteca ou
API.
+ Torna as classes responsáveis por adaptar apenas
uma versão de algo.
+ Fornece isolamento de código que muda com frequência.

**Contras:**

+ Pode proteger um cliente de comportamentos importantes que não
  estão disponíveis no Adaptador.

### Mecânica da Refatoração

Existem diferentes maneiras de fazer essa refatoração, dependendo da aparência do
seu código antes de começar. Por exemplo, se você tiver uma classe que usa muita
lógica condicional para lidar com várias versões de algo, é provável que você possa
criar adaptadores para cada versão aplicando repetidamenteSubstituir condicional por
polimorfismo[F ]. Se você tiver um caso como o mostrado no esboço do código — no
qual uma classe Adapter existente oferece suporte a várias versões de uma biblioteca
com variáveis e métodos específicos da versão —, você extrairá vários Adapters
usando uma abordagem diferente. Aqui eu descrevo a mecânica para este último
cenário.

1 - Identificar umadaptador sobrecarregado, uma classe que adapta
muitas versões de algo.

2 - Criar umanovo adaptador, uma classe produzida pela aplicaçãoExtrair
subclasse[F ] ouExtrair classe[F ] para uma única versão das várias versões
suportadas pelo adaptador sobrecarregado. Copie ou mova todas as variáveis
de instância e métodos usados exclusivamente para essa versão no novo
adaptador.

Para fazer isso, pode ser necessário tornar alguns membros privados do adaptador
sobrecarregado públicos ou protegidos. Também pode ser necessário inicializar
algumas variáveis de instância por meio de um construtor no novo adaptador, o
que exigirá atualizações para os chamadores do novo construtor.

+ Compilar e testar.

3 - Repita a etapa 2 até que o adaptador sobrecarregado não tenha mais código
específico de versão.

4 - Remova qualquer duplicação encontrada nos novos adaptadores aplicando
refatorações comoMétodo de puxar para cima[F ] eMétodo de modelo de formulário
(205).

+ Compilar e testar.

### Exemplo

O código que refatorarei neste exemplo, que foi descrito no esboço do código no
início desta refatoração, é baseado no código do mundo real que lida com consultas
a um banco de dados usando uma biblioteca de terceiros. Para proteger os
inocentes, renomeei aquela bibliotecaSD, que significa
SuperDatabase.

1 - Começo identificando um adaptador que está sobrecarregado com suporte
para várias versões do SuperDatabase. Esta classe, chamadaConsulta,fornece suporte para as versões 5.1 e 5.2 do SuperDatabase.
Na listagem de código a seguir, observe as variáveis de instância específicas
da versão, duplicadasConecte-se()métodos e código condicional em
doQuery():

```java
public class Query {
    private SDLogin sdLogin; // needed for SD version 5.1 
    private SDSession sdSession; // needed for SD version 5.1 
    private SDLoginSession sdLoginSession; // needed for SD version 5.2 
    private boolean sd52; // tells if we’re running under SD 5.2 
    private SDQuery sdQuery; // this is needed for SD versions 5.1 & 5.2 
    
    // this is a login for SD 5.1 
    // NOTE: remove this when we convert all aplications to 5.2 
    public void login(String server, String user, String password) throws QueryException { 
        sd52 = false; 
        try { 
            sdSession = sdLogin.loginSession(server, user, password); 
        } 
        catch (SDLoginFailedException lfe) { 
            throw new QueryException(QueryException.LOGIN_FAILED, "Login failure\n" + lfe, lfe); 
        } 
        catch (SDSocketInitFailedException ife) { 
            throw new QueryException(QueryException.LOGIN_FAILED, "Socket fail\n" + ife, ife); 
        } 
    }

    // 5.2 login 
    public void login(String server, String user, String password, String sdConfigFileName) throws QueryException { 
        sd52 = true; 
        sdLoginSession = new SDLoginSession(sdConfigFileName, false); 
        try { 
            sdLoginSession.loginSession(server, user, password); 
        } 
        catch (SDLoginFailedException lfe) { 
            throw new QueryException(QueryException.LOGIN_FAILED, "Login failure\n" + lfe, lfe); 
        } 
        catch (SDSocketInitFailedException ife) { 
            throw new QueryException(QueryException.LOGIN_FAILED, "Socket fail\n" + ife, ife); 
        } 
        catch (SDNotFoundException nfe) { 
            throw new QueryException(QueryException.LOGIN_FAILED, "Not found exception\n" + nfe, nfe); 
        } 
    } 
    
    public void doQuery() throws QueryException { 
        if (sdQuery != null) 
            sdQuery.clearResultSet(); 
        
        if (sd52) 
            sdQuery = sdLoginSession.createQuery(SDQuery.OPEN_FOR_QUERY); 
        else 
            sdQuery = sdSession.createQuery(SDQuery.OPEN_FOR_QUERY); 
        
        executeQuery();
    }
}
```



2.PorqueConsultaainda não tem subclasses, decido me candidatarExtrair
subclasse[F ] para isolar o código que manipula as consultas do
SuperDatabase 5.1. Meu primeiro passo é definir a subclasse e criar um
construtor para ela:

```java
class QuerySD51 extends Query { 
    public QuerySD51() { 
        super(); 
    } 
}
```

Em seguida, encontro todas as chamadas de clientes paraConsultado construtor e,
quando apropriado, altere o código para chamar oConsultaSD51construtor. Por exemplo,
encontro o seguinte código de cliente, que contém umConsulta campo chamadoconsulta:

```java
public void loginToDatabase(String db, String user, String password) {
    query = new Query(); 
    try { 
        if (usingSDVersion52()) { 
            query.login(db, user, password, getSD52ConfigFileName()); // Login to SD 5.2 
        } else {
           query.login(db, user, password); // Login to SD 5.1 
        } 
        // ... 
    } catch(QueryException qe) {
        // ...
    }
}
```

Eu mudo isso para:

```java
public void loginToDatabase(String db, String user, String password) {
    // query = new Query(); 
    try { 
        if (usingSDVersion52()) { 
            query = new Query(); 
            query.login(db, user, password, getSD52ConfigFileName()); // Login to SD 5.2 
        } else { 
            query = new QuerySD51(); 
            query.login(db, user, password); // Login to SD 5.1 
        } 
        // ... 
    } catch(QueryException qe) {
        // ...
    }
}
```



A seguir, aplicoMétodo Push Down[F ] eCampo Push Down[F ] para equipar
ConsultaSD51com os métodos e variáveis de instância de que necessita.
Nessa etapa, devo ter o cuidado de considerar os clientes que fazem ligações para o
públicoConsultamétodos, pois se eu mover um método público como
Conecte-se()deConsultaparaConsultaSD51, o chamador não poderá chamar o
método público, a menos que seu tipo seja alterado paraConsultaSD51. Como
não quero fazer essas alterações no código do cliente, procedo com cautela,
às vezes copiando e modificando métodos públicos em vez de removê-los
completamente doConsulta. Enquanto faço isso, gero código duplicado, mas
isso não me incomoda agora - vou me livrar doduplicação na etapa final desta refatoração.



```java
class Query {
    // ...
    // private SDLogin sdLogin; 
    // private SDSession sdSession; 
    protected SDQuery sdQuery; // this is a login for SD 5.1 

    public void login(String server, String user, String password) throws QueryException { 
        // I make this a do-nothing method 
    } 
    public void doQuery() throws QueryException { 
        if (sdQuery != null) 
            sdQuery.clearResultSet();
        
        // if (sd52) 
        sdQuery = sdLoginSession.createQuery(SDQuery.OPEN_FOR_QUERY); 
        // else 
        //     sdQuery = sdSession.createQuery(SDQuery.OPEN_FOR_QUERY); 
        
        executeQuery(); 
    } 

    class QuerySD51 { 
        private SDLogin sdLogin; 
        private SDSession sdSession; 
        public void login(String server, String user, String password) throws QueryException { 
            // sd52 = false; 
            try { 
                sdSession = sdLogin.loginSession(server, user, password); 
            } catch (SDLoginFailedException lfe) { 
                throw new QueryException(QueryException.LOGIN_FAILED, "Login failure\n" + lfe, lfe); 
            } catch (SDSocketInitFailedExceptio n ife) { 
                throw new QueryException(QueryException.LOGIN_FAILED, "Socket fail\n" + ife, ife); 
            } 
        } 
    
        public void doQuery() throws QueryException { 
            if (sdQuery != null)
                sdQuery.clearResultSet(); 
            
            // if (sd52) 
            //     sdQuery = sdLoginSession.createQuery(SDQuery.OPEN_FOR_QUERY); 
            // else 
            sdQuery = sdSession.createQuery(SDQuery.OPEN_FOR_QUE RY); 
            
            executeQuery(); 
        } 
    }
}
```



Eu compilo e testo issoConsultaSD51funciona. Sem problemas.

3 - Em seguida, repito o passo 2 para criarConsultaSD52. Ao longo do caminho, eu
posso fazer oConsultaclasse abstrata, juntamente com odoQuery()método. Aqui está
o que eu tenho agora:

08-06-extract-adapter-02.jpg

Consultaagora está livre de código específico da versão, mas não está livre de
código duplicado.

4  - Agora vou em uma missão para remover a duplicação. Eu rapidamente encontro
alguns nas duas implementações dedoQuery():

```java
abstract class Query {
    public abstract void doQuery() throws QueryException;
}

class QuerySD51 {
    public void doQuery() throws QueryException { 
        if (sdQuery != null) 
            sdQuery.clearResultSet();

        sdQuery = sdSession.createQuery(SDQuery.OPEN_FOR_QUERY); 
        executeQuery();        
    } 
}

class QuerySD52 {
    public void doQuery() throws QueryException { 
        if (sdQuery != null) 
            sdQuery.clearResultSet(); 
        
        sdQuery = sdLoginSession.createQuery(SDQuery.OPEN_FOR_QUERY); 
        executeQuery(); 
    }
}
```

Cada um desses métodos simplesmente inicializa osdQueryinstância de uma
maneira diferente. Isso significa que posso aplicarIntroduza a criação polimórfica
com o método de fábrica (88)eMétodo de modelo de formulário (205)para criar uma única versão de superclasse dedoQuery():

```java
public abstract class Query {
    protected abstract SDQuery createQuery(); // a Factory Method [DP] 
    public void doQuery() throws QueryException { // a Template Method [DP] 
        if (sdQuery != null) 
            sdQuery.clearResultSet(); 
        
        sdQuery = createQuery(); // call to the Factory Method 
        executeQuery(); 
    }
}

class QuerySD51 {
    protected SDQuery createQuery() { 
        return sdSession.createQuery(SDQuery.OPEN_FOR_QUERY); 
    } 
}

class QuerySD52 {
    protected SDQuery createQuery() { 
        return sdLoginSession.createQuery(SDQuery.OPEN_FOR_QUERY); 
    }
}
```

Depois de compilar e testar as alterações, agora enfrento um problema de
duplicação mais óbvio:Consultaainda contém o SD 5.1 e 5.2
Conecte-se()métodos, mesmo que eles não façam mais nada (o verdadeiro
trabalho de login agora é tratado pelas subclasses). As assinaturas desses
doisConecte-se()são idênticos, exceto por um parâmetro:

```java
// SD 5.1 login 
public void login(String server, String user, String password) throws QueryException... 

// SD 5.2 login 
public void login(String server, String user, String password, String sdConfigFileName ) throws QueryException...
```

eu decido fazer oConecte-se()assinaturas iguais, simplesmente
fornecendoConsultaSD52com osdConfigFileNameinformações através de
seu construtor:

```java
class QuerySD52 {
    private String sdConfigFileName; 
    public QuerySD52(String sdConfigFileName) { 
        super(); 
        this.sdConfigFileName = sdConfigFileName; 
    }
}
```

AgoraConsultatem apenas um resumoConecte-se()método:

```java
abstract class Query {
    public abstract void login(String server, String user, String password) throws QueryException...
}
```

O código do cliente é atualizado da seguinte forma:

```java
public void loginToDatabase(String db, String user, String password) {
    if (usingSDVersion52()) 
        query = new QuerySD52(getSD52ConfigFileName()); 
    else 
        query = new QuerySD51(); 
        
    try { 
        query.login(db, user, password); 
        // ... 
    } catch(QueryException qe) {
        // ...  
    }
}
```

Estou quase terminando. PorqueConsultaé uma classe abstrata, decido
renomeá-laAbstractQuery, que comunica mais sobre sua natureza. Mas fazer
essa mudança de nome requer mudar o código do cliente para declarar
variáveis do tipoAbstractQueryem vez deConsulta. Eu não quero fazer isso,
então eu me inscrevoExtrair interface[F ] sobre AbstractQuerypara obter um
Consultainterface queAbstractQuery pode implementar:

```java
interface Query { 
    public void login(String server, String user, String password) throws QueryException; 
    public void doQuery() throws QueryException; 
}

abstract class AbstractQuery implements Query {
    // public abstract void login(String server, String user, String password) throws QueryException ...
}
```

Agora, subclasses deAbstractQueryimplementoConecte-se(),
enquanto AbstractQuerynem precisa declararConecte-se()porque é
uma classe abstrata.
Eu compilo e testo para ver se tudo funciona conforme o planejado.
Cada versão do SuperDatabase agora está totalmente adaptada. O
código é menor e trata cada versão de forma mais uniforme, o que
facilita:

+ Veja semelhanças e diferenças entre as versões
+ Remova o suporte para versões mais antigas e não utilizadas
+ Adicionar suporte para versões mais recentes



## Replace Implicit Language with *Interpreter*r

### O que é

**Se**

Numerous methods on a class combine elements of an implicit language.

**Refatore para**

Define classes for elements of the implicit language so that instances may be combined to form interpretable expressions.

**Descrição do capítulo**

A refatoração final neste capítulo, **Replace Implicit Language with Interpreter** (269), visa o código que seria melhor projetado se usasse uma linguagem explícita. Esse código geralmente usa vários métodos para realizar o que uma linguagem pode fazer, apenas de uma maneira muito mais primitiva e repetitiva. Refatorar tal código para um interpretador [DP] pode produzir uma solução de propósito geral que é mais compacta, simples e flexível.

### Resumo

Uso o Interpreter se: Caso eu chegue e uma situação em que o usuário pode fazer combinações de lógica booleana para alguma coisa (AND, OR, NOT) ou algo parecido com SQL. EM um caso em que pode haver uma explosão combinatória, o Interpreter é extremamente indicado. Consegue criar componentes booleanos e encadea-los corretamente

### Schema

08-08-language-01.jpg

### Motivação

Um *Interpreter* [DP ] é útil para interpretar linguagens simples. Uma
linguagem simples é aquela que possui uma gramática que pode ser
modelada usando um pequeno número de classes. Frases e expressões
em linguagens simples são formadas pela combinação de instâncias das classes da gramática, normalmente usando um Composite [DP ] estrutura.

Os programadores se dividem em dois campos com relação ao padrão
*Interpreter*: aqueles que se sentem confortáveis em implementá-lo e
aqueles que não se sentem. No entanto, quer você se sinta confortável ou
não com termos como árvores sintáticas e árvores sintáticas abstratas,
expressões terminais e não terminais, implementar um *Interpreter*r é apenas
um pouco mais complicado do que implementar um Composite. O truque é
saber quando você precisa de um *Interpreter*.

Você não precisa de um *Interpreter* para linguagens complexas ou
realmente simples. Para linguagens complexas, geralmente é melhor
usar uma ferramenta (como JavaCC) que suporte análise, definição de
gramática e interpretação. Por exemplo, em um projeto, meus colegas e
eu usamos um gerador de analisador para produzir uma gramática com
mais de 20 classes — muitas para programar confortavelmente à mão
usando o padrão *Interpreter*r. Em outro projeto, a gramática da nossa
linguagem era tão simples e uniforme que não usamos nenhuma classe
para interpretar cada expressão da linguagem.

**Se a gramática de uma linguagem requer menos de uma dúzia de classes
para implementar, pode ser útil modelar usando o padrão *Interpreter*r. As
expressões de pesquisa para objetos ou valores de banco de dados
geralmente possuem essas gramáticas. Pesquisas típicas requerem o uso de
palavras como "e", "não" e "ou" (chamadas de *non-terminal expressions*), bem
como valores como "\$ 10,00", "pequeno" e "azul" (chamado expressões
terminais). Por exemplo:

+ Encontre produtos abaixo de \$ 10,00.
+ Encontre produtos abaixo de ​\$ 10,00 e não brancos.
+ Encontre produtos azuis, pequenos e abaixo de US$ 20,00.

Essas expressões de pesquisa são frequentemente programadas em sistemas
sem o uso de uma linguagem explícita da forma a seguir:

```java
class ProductFinder {
    // Expressôes terminais
    public List byColor(Color colorOfProductToFind)... 
    public List byPrice(float priceLimit)... 
    public List bySize(int sizeToFind)... 
    public List belowPrice(float price)... 
    // Combinando expressâo terminal com não terminal (e, or, not)
    public List belowPriceAvoidingAColor(float price)... 
    public List byColorAndBelowPrice(Color color, float price)... 
    public List byColorSizeAndBelowPrice(Color color, int size, float price)...
}

/*
Perceba que quando é uma expresSão terminal é fácil coloca, agora para cada nâ-terminal precisaria colocar mais uma funçâo. Isso pode gerar uma explosão de métodos e por isso há o padrão 'Interpreter'
*/
```

Programando dessa maneira, uma linguagem para localização de produtos gera dois problemas com essa bordagem. 

​	Problemas por não usar Interpreter

+ Primeiro, você deve criar um novo método para cada nova
  combinação de critérios de produto. 
+ Em segundo lugar, os métodos de
  localização de produtos tendem a duplicar muitos códigos de localização de
  produtos. 

Uma solução de *Interpreter* (mostrada na seção Exemplo) é melhor
porque pode suportar uma grande variedade de consultas de produtos com
pouco mais de meia dúzia de classes pequenas e sem duplicação de código.

A refatoração para um *Interpreter* envolve o custo inicial de definir classes
para uma gramática e alterar o código do cliente para compor instâncias
das classes para representar expressões de linguagem. Esse preço vale a
pena? É se a alternativa for muito código duplicado para lidar com uma
explosão combinatória de expressões de linguagem implícitas, como os
muitos métodos finder no`ProductFinder`classe que acabou de ser
mostrada.

Dois padrões que fazem uso intenso de *Interpreter* são Specification [
Evans ] e *QueryObject* [Fowler, PEAA ]. Ambos os modelos buscam
expressões usando gramáticas simples e composições de objetos. Esses
padrões fornecem uma maneira útil de separar uma expressão de
pesquisa de sua representação. Por exemplo, um QueryObject
modela uma consulta de maneira genérica, o que permite convertê-la
em uma representação SQL (ou alguma outra representação) quando
você deseja realizar uma consulta real ao banco de dados.

**Os *Interpreters* são frequentemente usados em sistemas para permitir a
configuração do comportamento em tempo de execução. Por exemplo, um sistema pode
aceitar as preferências de consulta de um usuário por meio de uma interface de usuário
e, então, produzir dinamicamente uma estrutura de objeto interpretável que representa
a consulta. Desta forma, os *Interpreter*s podem fornecer um nível de poder e flexibilidade
que não é possível quando todo o comportamento em um sistema é estático e não pode
ser configurado dinamicamente.**

### Prós e Contras

**Pros**

+ Suporta combinações de elementos de linguagem melhor do que uma linguagem implícita (em que tem que declarar cada possibilidade)
+ Não requer nenhum novo código para suportar novas combinações de elementos de linguagem.
+ Permite configuração de comportamento em tempo de execução.

**Contras**

+ Tem um custo inicial para definir uma gramática e alterar
  o código do cliente para usá-la.

+ Requer muita programação quando sua linguagem é
  complexa.

+ Complica um projeto quando uma linguagem é simples.

### Mecânica da Refatoração

Essas mecânicas são fortemente voltadas para o uso de *Interpreter*r no contexto dos
padrões Specification e Query Object porque a maioria das implementações de *Interpreter*r
que escrevi ou encontrei foram implementações desses dois padrões. Nesse contexto, uma
linguagem implícita é modelada usando vários métodos de seleção de objetos, cada um dos
quais itera em uma coleção para selecionar um conjunto específico de objetos.

1 - Encontre um método de seleção de objeto que dependa de um único argumento de critério
(por exemplo, `double targetPrice`) para encontrar um conjunto de objetos. Crie um concreto
classe de especificação para o argumento critério, que aceita o valor do argumento
em um construtor e fornece um método getter para ele. Dentro do método de seleção
de objeto, declare e instancie uma variável do tipo especificação concreta e atualize o
código para que o acesso ao critério seja obtido através do método `getter` da
especificação concreta.

Nomeie sua especificação concreta pelo que ela faz (por exemplo, `ColorSpec` ajuda a encontrar
produtos por uma determinada cor).

Se seu método de seleção de objeto depende de vários critérios para sua seleção de objeto,
aplique esta etapa e a etapa 2 para cada parte do critério. Na etapa 4, você lidará com a
composição de especificações concretas em especificações compostas.

Compile e teste se a seleção de objeto ainda funciona corretamente.

2 - Aplicar Extrair Método[F ] na instrução condicional no método de seleção de
objeto para produzir um método chamado isSatisfeitoPor(), que deve ter um
resultado booleano. Agora apliqueMétodo de movimentação[F ] para mover este método para a
especificação concreta.

Crie uma superclasse de especificação (se ainda não tiver criado uma) aplicando
Extrair superclasse[F ] na especificação concreta. Torne esta superclasse
abstrata e faça com que ela declare um único método abstrato para
 `isSatisfiedBy(..)`.

Compile e teste se a seleção de objeto ainda funciona corretamente.

3 - Repita as etapas 1 e 2 para métodos de seleção de objeto semelhantes, incluindo
métodos que dependem dos critérios de seleção de objeto.

4 - Se você tiver um método de seleção de objeto que depende de várias especificações
concretas (ou seja, o método agora instancia mais de uma especificação concreta para
uso em sua lógica de seleção de objeto), aplique uma versão modificada da etapa 1
criando uma especificação composta(uma classe composta pelas especificações
concretas instanciadas dentro do método de seleção do objeto). Você pode passar as
especificações concretas para a especificação composta por meio de seu construtor ou,
se houver muitas especificações concretas, fornecer um `add(..)`
método na especificação composta.

Em seguida, aplique a etapa 2 na instrução condicional do método de seleção de objeto para mova a lógica para a especificação composta  `isSatisfiedBy(..)`método. Faça com que a
especificação composta se estenda a partir da superclasse de especificação.

5 - Cada método de seleção de objeto agora funciona com um objeto de especificação (isto
é, uma especificação concreta ou uma especificação composta). Além disso, os métodos
de seleção de objeto são idênticos, exceto pelo código de criação de especificação.
Remova o código duplicado nos métodos de seleção de objeto aplicandoExtrair Método[F
] no código idêntico de qualquer método de seleção de objeto. Nomeie o método
extraído como algo como `selectBy(..)` e fazer com que aceite um
argumento da interface de especificação de tipo e retorna uma coleção de objetos
(por exemplo, `public List selectBy(Spec spec)`).

+ Compilar e testar.

Ajuste todos os métodos de seleção de objeto para chamar o `selectBy()` método.

+ Compilar e testar.

6 - Aplicar Inline Method [F ] em cada método de seleção de objeto.

+ Compilar e testar.

### Exemplo

O esboço do código e a seção Motivação já forneceram uma introdução a este
exemplo, inspirado em um sistema de gerenciamento de estoque. Esse sistema `Finder` tem as classes (`AccountFinder`, `InvoiceFinder`, `ProductFinder`,
e assim por diante) acabou sofrendo de um *Combinatorial Explosion smell* (45), o que
exigiu a refatoração para Specification. Vale a pena notar que isso não revela um problema
comlocalizadorclasses: a questão é que pode chegar um momento em que
uma refatoração para a Specification é justificada.

Começo estudando os testes e o código de um `ProductFinder` que precisa dessa
refatoração. Vou começar com o código de teste. Antes que qualquer teste possa ser executado,
preciso de um `ProductRepository` objeto que é preenchido com vários `Product` objetos e um
`ProductFinder` objeto que sabe sobre o `ProductRepository`:

```java
public class ProductFinderTests extends TestCase {
    // ...
    private ProductFinder finder; 
    private Product fireTruck = new Product("f1234", "Fire Truck", Color.red, 8.95f, ProductSize.MEDIUM); 
    private Product barbieClassic = new Product("b7654", "Barbie Classic", Color.yellow, 15.95f, ProductSize.SMALL); 
    private Product frisbee = new Product("f4321", "Frisbee", Color.pink, 9.99f, ProductSize.LARGE); 
    private Product baseball = new Product("b2343", "Baseball", Color.white, 8.95f, ProductSize.NOT_APPLICABLE); 
    private Product toyConvertible = new Product("p1112", "Toy Porsche Convertible", Color.red, 230.00f, ProductSize.NOT_APPLICABLE); 
    
    protected void setUp() { 
        finder = new ProductFinder(createProductRepository()); 
    } 
    
    private ProductRepository createProductRepository() { 
        ProductRepository repository = new ProductRepository(); 
        repository.add(fireTruck); 
        repository.add(barbieClassic); 
        repository.add(frisbee); 
        repository.add(baseball); 
        repository.add(toyConvertible); 
        return repository; 
    }
}
```

Os produtos de "brinquedo" acima funcionam bem para código de teste. Obviamente, o código de produção usa
objetos de produto reais, que são obtidos usando a lógica de mapeamento objeto-relacional.

Agora vejo alguns testes simples e o código de implementação que os
satisfaz. O `testFindByColor()` método verifica se o
`ProductFinder.byColor(...)` método encontra corretamente brinquedos vermelhos, enquanto
`testeFindByPrice()` verifica se `ProductFinder.byPrice(...)` encontra corretamente brinquedos a um
determinado preço:

```java
public class ProductFinderTests extends TestCase {
    // ...
    public void testFindByColor() { 
        List foundProducts = finder.byColor(Color.red); 
        assertEquals("found 2 red products", 2, foundProducts.size()); 
        assertTrue("found fireTruck", foundProducts.contains(fireTruck)); 
        assertTrue("found Toy Porsche Convertible", foundProducts.contains(toyConvertible)); 
    } 
    
    public void testFindByPrice() { 
        List foundProducts = finder.byPrice(8.95f); 
        assertEquals("found products that cost $8.95", 2, foundProducts.size()); 
        for (Iterator i = foundProducts.iterator(); i.hasNext();) { 
            Product p = (Product) i.next();
            assertTrue(p.getPrice() == 8.95f); 
        } 
    }
}
```

Aqui está o código de implementação que satisfaz esses testes:

```java
public class ProductFinder {
    // ...
    private ProductRepository repository; 
    
    public ProductFinder(ProductRepository repository) { 
        this.repository = repository; 
    } 
    
    public List byColor(Color colorOfProductToFind) { 
        List foundProducts = new ArrayList(); 
        Iterator products = repository.iterator(); 
        while (products.hasNext()) { 
            Product product = (Product) products.next(); 
            if (product.getColor().equals(colorOfProductToFind)) 
                foundProducts.add(product); 
        } 
        return foundProducts; 
    } 
    
    public List byPrice(float priceLimit) { 
        List foundProducts = new ArrayList(); 
        Iterator products = repository.iterator(); 
        while (products.hasNext()) {
            Product product = (Product) products.next(); 
            if (product.getPrice() == priceLimit) 
                foundProducts.add(product); 
        } 
        return foundProducts; 
    }
}
```

Há muito código duplicado nesses dois métodos. Estarei me livrando dessa duplicação
durante esta refatoração. Enquanto isso, exploro mais alguns testes e códigos envolvidos
no problema de Explosão Combinatória. Abaixo, um teste está preocupado em encontrar
`Product` instâncias por cor, tamanho e abaixo de um certo
preço, enquanto o outro teste se preocupa em encontrar `Product` instâncias por cor e acima de
um determinado preço:

```java
public class ProductFinderTests extends TestCase {
    public void testFindByColorSizeAndBelowPrice() { 
        List foundProducts = finder.byColorSizeAndBelowPrice(Color.red, ProductSize.SMALL, 10.00f); 
        assertEquals("found no small red products below $10.00", 0,foundProducts.size()); 
        
        foundProducts = finder.byColorSizeAndBelowPrice(Color.red, ProductSize.MEDIUM, 10.00f); 
        assertEquals("found firetruck when looking for cheap medium red toys", fireTruck, foundProducts.get(0));
    } 
    
    public void testFindBelowPriceAvoidingAColor() { 
        List foundProducts = finder.belowPriceAvoidingAColor(9.00f, Color.white); 
        assertEquals("found 1 non-white product < $9.00", 1, foundProducts.size()); 
        assertTrue("found fireTruck", foundProducts.contains(fireTruck)); 
        
        foundProducts = finder.belowPriceAvoidingAColor(9.00f, Color.red);
        assertEquals("found 1 non-red product < $9.00", 1, foundProducts.size()); 
        assertTrue("found baseball", foundProducts.contains(baseball)); 
    }
}
```

Veja como o código de implementação procura esses testes:

```java
public class ProductFinder {
    public List byColorSizeAndBelowPrice(Color color, int size, float price) { 
        List foundProducts = new ArrayList(); 
        Iterator products = repository.iterator(); 
        while (products.hasNext()) { 
            Product product = (Product) products.next(); 
            if (product.getColor() == color && product.getSize() == size && product.getPrice() < price) 
                foundProducts.add(product); 
        } 
        return foundProducts; 
    } 
    
    public List belowPriceAvoidingAColor(float price, Color color) { 
        List foundProducts = new ArrayList(); 
        Iterator products = repository.iterator(); 
        while (products.hasNext()) { 
            Product product = (Product) products.next(); 
            if (product.getPrice() < price && product.getColor() != color) 
                foundProducts.add(product); 
        }
        return foundProducts; 
    }
}
```

1 - A primeira etapa é encontrar um método de seleção de objeto que dependa de um argumento
de critério para sua lógica de seleção. O `ProductFinder`método
`byColor(Cor colorOfProductToFind)` atende a este requisito:

```java
public class ProductFinder {
    public List byColor(Color colorOfProductToFind) { 
        List foundProducts = new ArrayList(); 
        Iterator products = repository.iterator(); 
        while (products.hasNext()) { 
            Product product = (Product) products.next(); 
            if (product.getColor().equals(colorOfProductToFind)) 
                foundProducts.add(product); 
        } 
        return foundProducts; 
    }
}
```

Eu crio uma classe de especificação concreta para o argumento critério, `Cor`
`colorOfProductToFind`. eu chamo essa classe `ColorSpec`. Ele precisa se agarrar a um 
campo `Color` e forneça um método getter para ele:

```java
public class ColorSpec { 
    private Color colorOfProductToFind; 
    
    public ColorSpec(Color colorOfProductToFind) { 
        this.colorOfProductToFind = colorOfProductToFind; 
    } 
    
    public Color getColorOfProductToFind() { 
        return colorOfProductToFind; 
    } 
}
```

Agora posso adicionar uma variável do tipo ColorSpec para byColor(...)método e
substitua a referência ao parâmetro, colorOfProductToFind, com uma referência
ao método getter da especificação:

```java
public List byColor(Color colorOfProductToFind) { 
    ColorSpec spec = new ColorSpec(colorOfProductToFind); 
    List foundProducts = new ArrayList();
    Iterator products = repository.iterator(); 
    while (products.hasNext()) { 
        Product product = (Product) products.next(); 
        if (product.getColor().equals(spec.getColorOfProductToFind())) 
            foundProducts.add(product);
    } 
    return foundProducts; 
}
```

Após essas alterações, compilo e executo meus testes. Aqui está um desses testes:

```java
public void testFindByColor() { 
    List foundProducts = finder.byColor(Color.red); 
    assertEquals("found 2 red products", 2, foundProducts.size()); 
    assertTrue("found fireTruck", foundProducts.contains(fireTruck)); 
    assertTrue("found Toy Porsche Convertible", foundProducts.contains(toyConver tible)); 
}
```

2 - Agora vou aplicar Extrair Método[F ] para extrair a declaração condicional no
enquantoloop para um `isSatisfiedBy(..)`método:

```java
public List byColor(Color colorOfProductToFind) { 
    ColorSpec spec = new ColorSpec(colorOfProductToFind);
    List foundProducts = new ArrayList(); 
    Iterator products = repository.iterator(); 
    while (products.hasNext()) { 
        Product product = (Product) products.next(); 
        if (isSatisfiedBy(spec, product)) 
            foundProducts.add(product);
    } 
    return foundProducts; 
} 

private boolean isSatisfiedBy(ColorSpec spec, Product product) { 
    return product.getColor().equals(spec.getColorOfProductToFind()); 
}
```

O `isSatisfiedBy(..)`método agora pode ser movido paraColorSpecaplicando
Método de movimentação[F ]:

```java
public class ProductFinder {
    public List byColor(Color colorOfProductToFind) { 
        ColorSpec spec = new ColorSpec(colorOfProductToFind);
        List foundProducts = new ArrayList(); 
        Iterator products = repository.iterator(); 
        while (products.hasNext()) { 
            Product product = (Product) products.next(); 
            if (spec.isSatisfiedBy(product)) 
                foundProducts.add(product); 
        }
        return foundProducts; 
    } 
}

public class ColorSpec {
    public boolean isSatisfiedBy(Product product) {
        return product.getColor().equals(getColorOfProductToFind()); 
    }
}
```



Por fim, crio uma superclasse de especificação aplicandoExtrair superclasse[F ]
sobreColorSpec:

```java
public abstract class Spec { 
    public abstract boolean isSatisfiedBy(Product product); 
}

public class ColorSpec extends Spec {
    // ...
}
```



Eu compilo e testo para ver issoprodutosinstâncias ainda podem ser selecionadas por uma
determinada cor corretamente. Tudo funciona bem.

3 - Agora repito as etapas 1 e 2 para métodos de seleção de objetos semelhantes. Isso
inclui métodos que trabalham com critérios (ou seja, várias partes do critério). Por
exemplo, o `byColorAndBelowPrice(...)` método aceita dois argumentos
que funcionam como critérios de seleção instâncias de  `Product` fora do repositório:

```java
public List byColorAndBelowPrice(Color color, float price) { 
    List foundProducts = new ArrayList(); 
    Iterator products = repository.iterator();
    while (products.hasNext()) {
        Product product = (Product)products.next();
        if (product.getPrice() < price && product.getColor() == color) 
            foundProducts.add(product);
    } 
    return foundProducts; 
}
```

Ao implementar as etapas 1 e 2, acabo com o `BelowPriceSpec` classe:

```java
public class BelowPriceSpec extends Spec { 
    private float priceThreshold;
    
    public BelowPriceSpec(float priceThreshold) { 
        this.priceThreshold = priceThreshold; 
    } 
    
    public boolean isSatisfiedBy(Product product) {
        return product.getPrice() < getPriceThreshold();
    } 
    
    public float getPriceThreshold() {
        return priceThreshold; 
    } 
}
```

Agora posso criar uma nova versão do `byColorAndBelowPrice(...)` que funciona com
as duas especificações concretas:

```java
public List byColorAndBelowPrice(Color color, float price) { 
    ColorSpec colorSpec = new ColorSpec(color);
    BelowPriceSpec priceSpec = new BelowPriceSpec(price);
    List foundProducts = new ArrayList(); 
    Iterator products = repository.iterator();
    while (products.hasNext()) { 
        Product product = (Product)products.next();
        if (colorSpec.isSatisfiedBy(product) && priceSpec.isSatisfiedBy(product)) 
            foundProducts.add(product); 
    }
    return foundProducts; 
}
```

4 - O `byColorAndBelowPrice(...)` método usa critérios (core preço) em sua lógica de
seleção de objetos. Eu gostaria de fazer este método, e outros como ele, trabalhar com
uma especificação composta em vez de especificações individuais. Para fazer isso,
implementarei uma versão modificada da etapa 1 e uma versão não modificada da
etapa 2. Veja como `byColorAndBelowPrice(...)` fica depois do passo 1:

```java
public List byColorAndBelowPrice(Color color, float price) { 
    ColorSpec colorSpec = new ColorSpec(color);
    BelowPriceSpec priceSpec = new BelowPriceSpec(price);
    AndSpec spec = new AndSpec(colorSpec, priceSpec);
    List foundProducts = new ArrayList(); 
    Iterator products = repository.iterator();
    while (products.hasNext()) {
        Product product = (Product)products.next();
        if (spec.getAugend().isSatisfiedBy(product) && spec.getAddend().isSatisfiedBy(product)) 
            foundProducts.add(product);
    } 
    return foundProducts; 
}
```

A classe `AndSpec` fica assim:

```java
public class AndSpec {
    private Spec augend, addend;
    
    public AndSpec(Spec augend, Spec addend) {
        this.augend = augend;
        this.addend = addend;
    } 
    
    public Spec getAddend() { 
        return addend;
    } 
    
    public Spec getAugend() { 
        return augend; 
    } 
}
```

Depois de implementar a etapa 2, o código agora se parece com isso:

```java
public List byColorAndBelowPrice(Color color, float price) { 
    // ... 
    AndSpec spec = new AndSpec(colorSpec, priceSpec);
    while (products.hasNext()) {
        Product product = (Product)products.next(); 
        if (spec.isSatisfiedBy(product)) 
            foundProducts.add(product);
    }
    return foundProducts; 
}

public class AndSpec extends Spec {
    // ...
    public boolean isSatisfiedBy(Product product) { 
        return getAugend().isSatisfiedBy(product) && getAddend().isSatisfiedBy(product); 
    }
}
```

Agora tenho uma especificação composta que lida com uma operação AND para
unir duas especificações concretas. Em outro método de seleção de objeto
chamado `belowPriceAvoidingAColor(...)`, eu tenho condicional mais complicada
lógica:

```java
public class ProductFinder {
    public List belowPriceAvoidingAColor(float price, Color color) { 
        List foundProducts = new ArrayList(); 
        Iterator products = repository.iterator();
        while (products.hasNext()) {
            Product product = (Product) products.next();
            if (product.getPrice() < price && product.getColor() != color) 
                foundProducts.add(product);
        } 
        return foundProducts; 
    }
}
```

Este código requer duas especificações compostas
( `AndProductSpecification` and `NotProductSpecification`) e dois especificações concretas. A lógica condicional no método pode ser retratada
conforme mostrado no diagrama na página seguinte.

img



Minha primeira tarefa é produzir um `NotSpec`:

```java
public class NotSpec extends Spec { 
    private Spec specToNegate; 

    public NotSpec(Spec specToNegate) { 
        this.specToNegate = specToNegate;
    }
    
    public boolean isSatisfiedBy(Product product) {
        return !specToNegate.isSatisfiedBy(product); 
    } 
}
```





Então eu modifico a lógica condicional para usar AndSpec e NotSpec:

```java
public List belowPriceAvoidingAColor(float price, Color color) { 
    AndSpec spec = new AndSpec(new BelowPriceSpec(price), new NotSpec(new ColorSpec(color))); 
    List foundProducts = new ArrayList();
    Iterator products = repository.iterator();
    while (products.hasNext()) {
        Product product = (Product) products.next();
        if (spec.isSatisfiedBy(product)) 
            foundProducts.add(pro duct);
    } 
    return foundProducts; 
}
```





Isso cuida do `belowPriceAvoidingAColor(...)` método. Continuo substituindo a
lógica nos métodos de seleção de objetos até que todos eles usem uma
especificação concreta ou uma especificação composta.

5 - Os corpos de todos os métodos de seleção de objetos agora são idênticos, exceto pela
lógica de criação da especificação:

```java
Spec spec = ... // create some spec 
List foundProducts = new ArrayList(); 
Iterator products = repository.iterator(); 
while (products.hasNext()) { 
    Product product = (Product) products.next(); 
    if (spec.isSatisfiedBy(product)) 
        foundProducts.add(product); 
} 

return foundProducts;
```

Isso significa que posso me candidatarExtrair Método[F ] em tudo, exceto na lógica de criação
de especificação em qualquer método de seleção de objeto para produzir um `selectBy(...)`
método. Eu decido executar esta etapa no `belowPrice(...)`método:

```java
public List belowPrice(float price) { 
    BelowPriceSpec spec = new BelowPriceSpec(price); 
    return selectBy(spec); 
} 

private List selectBy(ProductSpecification spec) { 
    List foundProducts = new ArrayList(); 
    Iterator products = repository.iterator(); 
    while (products.hasNext()) { 
        Product product = (Product)products.next(); 
        if (spec.isSatisfiedBy(product)) 
            foundProducts.add(product);
    } 
    return foundProducts; 
}
```

Eu compilo e testo para ter certeza de que isso funciona. Agora eu faço restante `ProductFinder`métodos de seleção de objeto chamam o mesmo `selectBy(...)`
método. Por exemplo, aqui está a chamada para `belowPriceAvoidingAColor(...):`

```java
public List belowPriceAvoidingAColor(float price, Color color) { 
    ProductSpec spec = new AndProduct(new BelowPriceSpec(price), new NotSpec(new ColorSpec(color))); 
    return selectBy(spec); 
}
```

6 - Agora, todo método de seleção de objeto pode ser embutido usando Inline Method [F]:

```java
public class ProductFinder {
    // ...
    // public List byColor(Color colorOfProductToFind) { 
    //     ColorSpec spec = new ColorSpec(colorOfProductToFind)); 
    //     return selectBy(spec);
    // } 
}

public class ProductFinderTests extends TestCase {
    // ...
    public void testFindByColor() {
        // ...
        // List foundProducts = finder.byColor(Color.red); 
        ColorSpec spec = new ColorSpec(Color.red));
        List foundProducts = finder.selectBy(spec);
    }
}
```

Eu compilo e testo para ter certeza de que tudo está funcionando. Em seguida, concluo essa
refatoração repetindo a etapa 6 para cada método de seleção de objeto.