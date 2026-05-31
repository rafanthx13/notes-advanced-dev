# Chapter 7. Simplification

Much of the code we write doesn't start out being simple. To
make it simple, we must reflect on what isn't simple about it
and continually ask, "How could it be simpler?" We can often
simplify code by considering a completely different solution.
The refactorings in this chapter present different solutions for
simplifying methods, state transitions, and tree structures.

Compose Method (123) is about producing methods that
efficiently communicate what they do and how they do what
they do. A Composed Method [Beck, SBPP] consists of calls to
well-named methods that are all at the same level of detail. If
you want to keep your system simple, endeavor to apply
Compose Method (123) everywhere.

Algorithms often become complex as they begin to support
many variations. Replace Conditional Logic with Strategy (129)
shows how to simplify algorithms by breaking them up into
separate classes. Of course, if your algorithm isn't sufficiently
complicated to justify a Strategy [DP], refactoring to one will
only complicate your design.

You probably won't refactor to a Decorator [DP] frequently. Yet
it is a great simplification tool for a certain situation: when you
have too much special-case or embellishment logic in a class.
Move Embellishment to Decorator (144) describes how to
identify when you really need a Decorator and then shows how
to separate embellishments from the core responsibility of a
class.

Logic for controlling state transitions is notorious for becoming
complex. This is especially true as you add more and more
state transitions to a class. The refactoring Replace State-Altering Conditionals with State (166) describes how to
drastically simplify complex state transition logic and helps you
determine whether your logic is complex enough to require a
State [DP] implementation.

Replace Implicit Tree with Composite (178) is a refactoring that
targets the complexity of building and working with tree
structures. It shows how a Composite [DP] can simplify a
client's creation and interaction with a tree structure.
The Command pattern [DP] is useful for simplifying certain
types of code. The refactoring Replace Conditional Dispatcher
with Command (191) shows how this pattern can completely
simplify a switch statement that controls which chunk of
behavior to execute.

## Compose Method

## Motivação

A Composed Method is a small, simple method that you can
understand in seconds. Do you write a lot of Composed
Methods?

Kent Beck once said that some of his best patterns are those
that he thought someone would laugh at him for writing. Composed Method [Beck, SBPP - Beck, Kent. Smalltalk Best Practice Patterns.
Upper Saddle River, NJ: Prentice Hall, 1997.] may be such a pattern.

A Composed Method is composed of calls to other methods.
Good Composed Methods have code at the same level of detail.

Most refactorings to Composed Method involve applying Extract
Method [F] several times until the Composed Method does most
(if not all) of its work via calls to other methods. The most difficult
part is deciding what code to include or not include in an
extracted method.

If you extract too much code into a method,
you'll have a hard time naming the method to adequately
describe what it does. In that case, just apply Inline Method [F] to
get the code back into the original method, and then explore
other ways to break it up.

O que você tem no final:
Once you finish this refactoring, you will likely have numerous
small, private methods that are called by your Composed
Method. Some may consider such small methods to be a
performance problem. They are only a performance problem
when a profiler says they are. I rarely find that my worst
performance problems relate to Composed Methods; they almost
always relate to other coding problems.

If you apply this refactoring on numerous methods within the
same class, you may find that the class has an overabundance
of small, private methods. In that case, you may see an
opportunity to apply Extract Class [F].

Another possible downside of this refactoring involves
debugging. If you debug a Composed Method, it can become
difficult to find where the actual work gets done because the logic
is spread out across many small methods.

A Composed Method's name communicates what it does, while
its body communicates how it does what it does. This allows you
to rapidly comprehend the code in a Composed Method. When
you add up all the time you and your team spend trying to
understand a system's code, you can just imagine how much
more efficient and effective you'll be if the system is composed of
many Composed Methods.

## Prós e COntras

Benefits and Liabilities

+ Efficiently communicates what a method does and
how it does what it does.
+ Simplifies a method by breaking it up into well-
named chunks of behavior at the same level of
detail.


– Can lead to an overabundance of small methods.
– Can make debugging difficult because logic is spread
out across many small methods.

## Mecânica

Mechanics
This is one of the most important refactorings I know.
Conceptually, it is also one of the simplest—so you'd think that
this refactoring would lead to a simple set of mechanics. In
fact, it's just the opposite. While the steps themselves aren't
complex, there is no simple, repeatable set of steps. Instead,there are guidelines for refactoring to Composed Method,
some of which include the following.

+ Think small: Composed Methods are rarely more than ten
lines of code and are usually about five lines.

+ Remove duplication and dead code: Reduce the amount
of code in the method by getting rid of blatant and/or
subtle code duplication or code that isn't being used.

+ Communicate intention: Name your variables, methods,
and parameters clearly so they communicate their
purposes (e.g., public void addChildTo(Node
parent)).

+ Simplify: Transform your code so it's as simple as
possible. Do this by questioning how you've coded
something and by experimenting with alternatives.

+ Use the same level of detail: When you break up one
method into chunks of behavior, make the chunks operate
at similar levels of detail. For example, if you have a piece
of detailed conditional logic mixed in with some high-level
method calls, you have code at different levels of detail.
Push the detail down into a well-named method, at the
same level of detail as the other methods in the
Composed Method.

## Exemmplo

Foi usado os seguintas refact-actions:
+ Extract Method [F]




## Replace Conditional Logic with Strategy

Conditional logic in a method controls which of several
variants of a calculation are executed.

Create a Strategy for each variant and make the method
delegate the calculation to a Strategy instance.

## Motivação

"Simplifying Conditional Expressions" is a chapter in
Refactoring [F] that contains over a half-dozen highly useful
refactorings devoted to cleaning up conditional complexity.

Replace Conditional Logic with Strategy (129) envolve composição de objetos: você produz uma família de classes para cada variação do algoritmo e equipa a classe hospedeira (quem vai fazer a chamada) com uma instância de Estratégia para a qual a classe hospedeira delega em tempo de execução.
+ Uma solução baseada em herança pode ser alcançada aplicando a Replace Conditional with Polymorphism [F]. O pré-requisito para essa refatoração é uma estrutura de herança (ou seja, a classe hospedeira do algoritmo deve ter subclasses). Se as subclasses existirem e cada variação do algoritmo for facilmente mapeada para subclasses específicas, esta é provavelmente a refatoração preferida. Se você precisar primeiro criar as subclasses, terá que decidir se seria mais fácil usar uma abordagem de composição de objetos, como refatoração para Strategy. 
+ Se as condicionais no algoritmo forem controladas por um código de tipo, pode ser fácil criar subclasses da classe hospedeira do algoritmo, uma para cada código de tipo (consulte Replace Type Code with Subclasses [F]). Se não houver tal código de tipo, provavelmente será melhor refatorar para Strategy. Por fim, se os clientes precisarem trocar um tipo de cálculo por outro em tempo de execução, é melhor evitar uma abordagem baseada em herança, porque isso significa alterar o tipo de objeto com o qual um cliente está trabalhando em vez de simplesmente substituir uma instância de Estratégia por outra.

Ao decidir se deve refatorar para ou em direção a uma Strategy, você precisa considerar como o algoritmo incorporado em cada Strategy acessará os dados de que precisa para realizar seu trabalho. Como a seção Mecânica destaca, existem duas maneiras de fazer isso: passar a classe hospedeira (chamada de contexto) para a Strategy, para que ela possa chamar métodos de retorno para obter seus dados, ou passar os dados diretamente para a Strategy por meio de parâmetros. Ambas as abordagens têm vantagens e desvantagens, que são discutidas na seção Mecânica.

Os padrões Strategy e Decorator oferecem maneiras alternativas de eliminar a lógica condicional associada a comportamentos especiais ou alternativos. A seção lateral Decorator vs. Strategy na seção Motivação de Move Embellishment to Decorator(144) oferece uma visão de como esses dois padrões diferem.

Ao implementar um design baseado em Strategy, você deve considerar como sua classe de contexto obterá sua Strategy. Se você não tiver muitas combinações de Strategies e classes de contexto, é uma boa prática proteger o código do cliente de ter que se preocupar tanto em instanciar uma instância de Estratégia quanto em equipar um contexto com uma instância de Strategy. Encapsulate Classes with
Factory (80) ca (80) pode ajudar com isso: basta definir um ou mais métodos que retornem uma instância de contexto, devidamente equipada com a instância apropriada de Estratégia.


### Prós e COntras

Benefícios
+ Esclarece algoritmos ao diminuir ou remover lógica condicional.
+ Simplifica uma classe ao mover variações de um algoritmo para uma hierarquia.
+ Permite que um algoritmo seja trocado por outro em tempo de execução.

Responsabilidades
- Complica um design quando uma solução baseada em herança ou uma refatoração de "Simplificar Expressões Condicionais" [F] é mais simples.
- Complica como os algoritmos obtêm ou recebem dados de sua classe de contexto.

## COmo fazer



## Exemplo



Temos a clsse LOan (emprstimo) que calcula emprestimos. Hoje, ela tem 4 formas de fazer (4 possiveis campinhos) que envolve chamar outras funçẽs



```java
public class Loan {

    // Metodo princiapl que queremos aplicar o Strategy
    public double capital() { 
        if (expiry == null && maturity != null) // 1
            return commitment * duration() * riskFactor(); 
        if (expiry != null && maturity == null) {
            if (getUnusedPercentage() != 1.0) // 2
                return commitment * getUnusedPercentage() * duration() * riskFactor();         
            else // 3
                return (outstandingRiskAmount() * duration() * riskFactor()) + (unusedRiskAmount() * duration() * unusedRiskFactor()); 
        } 
        return 0.0; // 4
    }
    
    /* *** FUNÇÕES ADICIONAIS  de capital() **/
    
    private double outstandingRiskAmount() { 
        return outstanding; 
    } 
    
    private double unusedRiskAmount() { 
        return (commitment - outstanding); 
    }
    
    public double duration() { 
        if (expiry == null && maturity != null) 
            return weightedAverageDuration(); 
        else if (expiry != null && maturity == null) 
            return yearsTo(expiry); 
        return 0.0; 
    }
    
    private double weightedAverageDuration() { 
        double duration = 0.0; 
        double weightedAverage = 0.0;
        double sumOfPayments = 0.0;
        Iterator loanPayments = payments.iterator(); 
        while (loanPayments.hasNext()) { 
            Payment payment = (Payment)loanPayments.next(); 
            sumOfPayments += payment.amount(); 
            weightedAverage += yearsTo(payment.date()) * payment.amount();
        } 
        if (commitment != 0.0) 
            duration = weightedAverage / sumOfPayments;
         return duration; 
    }
    
    private double yearsTo(Date endDate) {
        Date beginDate = (today == null ? start : today); 
        return ((endDate.getTime() - beginDate.getTime()) / MILLIS_PER_DAY) /  DAYS_PER_YEAR;
    }
    
    private double riskFactor() { 
        return RiskFactor.getFactors().forRating(riskRating);
    }
    
    private double unusedRiskFactor() { 
        return UnusedRiskFactors.getFactors().forRating( riskRating); 
    }
    
    
}
```



Como vai ficar as Strategy

```java
public abstract class CapitalStrategy { 
    
    	// Variaveis usadas no processo
    private static final int MILLIS_PER_DAY = 86400000; 
    private static final int DAYS_PER_YEAR = 365;
    public abstract double capital(Loan loan); 
    
    protected double riskFactorFor(Loan loan) { 
        return RiskFactor.getFactors().forRating(loan.getRiskRating()); 
    } 
    
    public double duration(Loan loan) { 
        return yearsTo(loan.getExpiry(), loan); 
    } 
    
    protected double yearsTo(Date endDate, Loan loan) { 
        Date beginDate = (loan.getToday() == null ? loan.getStart() : loan.getToday()); 
        return ((endDate.getTime() - beginDate.getTime()) / MILLIS_PER_DAY) / DAYS_PER_YEAR; 
    } 
    
}
```



..

```java
public class CapitalStrategyTermLoan extends CapitalStrategy { 
    
    public double capital(Loan loan) { 
        return loan.getCommitment() * duration(loan) * riskFactorFor(loan); 
    } 

    public double duration(Loan loan) { 
        return weightedAverageDuration(loan); 
    }

    private double weightedAverageDuration(Loan loan) { 
        double duration = 0.0; 
        double weightedAverage = 0.0; 
        double sumOfPayments = 0.0; 
        Iterator loanPayments = loan.getPayments().iterator(); 
        
        while (loanPayments.hasNext()) { 
            Payment payment = (Payment)loanPayments.next(); 
            sumOfPayments += payment.amount(); 
            weightedAverage += yearsTo(payment.date(), loan) * payment.amount(); 
        } 
        
        if (loan.getCommitment() != 0.0) 
            duration = weightedAverage / sumOfPayments; 
        
        return duration; 
    }
}
```

Classe principal

```java
public class Loan { 
    
    	private CapitalStrategy capitalStrategy; 
    
    private Loan(..., CapitalStrategy capitalStrategy ) { 
        // ... 
        this.capitalStrategy = capitalStrategy; 
    }
    
     public static Loan newTermLoan( double commitment, Date start, Date maturity, int riskRating) { 
        return new Loan( commitment, commitment, start, null, maturity, riskRating, new CapitalStrategyTermLoan() );
    }
    
    public static Loan newRevolver( double commitment, Date start, Date expiry, int riskRating) { 
        return new Loan( commitment, 0, start, expiry, null, riskRating, new CapitalStrategyRevolver() ); 
    } 
    public static Loan newAdvisedLine( double commitment, Date start, Date expiry, int riskRating) { 
        if (riskRating > 3) 
            return null; 
        
        Loan advisedLine = new Loan( commitment, 0, start, expiry, null, riskRating, new CapitalStrategyAdvisedLine());
        advisedLine.setUnusedPercentage(0.1); 
        return advisedLine;
    }
    
    public double capital() { 
        return capitalStrategy.capital(this); 
    }
    public double duration() {
        return capitalStrategy.duration(this); 
    }

    
}
```

O que fiz:

+ Ao criar Loan, a depender de qual MethodFactory eu escolher, eu especifico diferntes objetos CaptiralStrategy e asism posso realizad o cálculo sem me preocupar com a lógica
+ 

7-2-1-schema-no-final

**Como ficaria o tetes disso**

```java
public class CapitalCalculationTests extends TestCase { 

    public void testTermLoanSamePayments() { 
        Date start = november(20, 2003); 
        Date maturity = november(20, 2006); 
        // Cria a classe
        Loan termLoan = Loan.newTermLoan(
            LOAN_AMOUNT, start, maturity, HIGH_RISK_RATING); 
        termLoan.payment(1000.00, november(20, 2004)); 
        termLoan.payment(1000.00, november(20, 2005)); 
        termLoan.payment(1000.00, november(20, 2006)); 
        // Testa os metodos capital e duraction
        assertEquals("duration", 2.0, termLoan.duration(), TWO_DIGIT_PRECISION); 
        assertEquals("capital", 210.00, termLoan.capital(), TWO_DIGIT_PRECISION); 
    }
    
}
```

7-2-1-schema-no-final.png

## Move Embellishment to Decorator

### Explicação com ChatGPT

"Move Embellishment to Decorator" é um padrão de refatoração que envolve mover a lógica de embelezamento de um objeto para um decorator separado. O objetivo é separar a funcionalidade de embelezamento da lógica principal do objeto, tornando o código mais modular, reutilizável e seguindo o princípio de responsabilidade única.

Aqui está um exemplo em PHP para ilustrar o processo de "Move Embellishment to Decorator" passo a passo:

Passo 1: Identificar o embellishment
Identifique a funcionalidade específica que deseja mover para o decorator. Neste exemplo, vamos supor que temos uma classe `Texto` que possui um método `gerarTexto()` e queremos adicionar um comportamento adicional de adicionar um cabeçalho ao texto.

```php
class Texto {
    public function gerarTexto() {
        return "Conteúdo do texto";
    }
}
```

Passo 2: Criar o decorator
Crie uma classe decorator separada que irá encapsular a funcionalidade de embelezamento. Neste exemplo, vamos criar a classe `TextoDecorator` que adicionará um cabeçalho ao texto.

```php
class TextoDecorator {
    protected $texto;

    public function __construct(Texto $texto) {
        $this->texto = $texto;
    }

    public function gerarTexto() {
        $cabeçalho = "Cabeçalho do Texto\n";
        $conteúdo = $this->texto->gerarTexto();
        return $cabeçalho . $conteúdo;
    }
}
```

Passo 3: Mover a lógica de embelezamento para o decorator
Mova a lógica de embelezamento do objeto original para o decorator. No exemplo, movemos a lógica de adicionar o cabeçalho para o método `gerarTexto()` da classe `TextoDecorator`.

Passo 4: Aplicar o decorator
Aplique o decorator ao objeto original. No exemplo, vamos criar uma instância da classe `Texto` e, em seguida, criar uma instância da classe `TextoDecorator`, passando o objeto `Texto` como parâmetro.

```php
$textoOriginal = new Texto();
$textoDecorado = new TextoDecorator($textoOriginal);
```

Passo 5: Utilizar o objeto decorado
Utilize o objeto decorado como se fosse o objeto original. No exemplo, chamamos o método `gerarTexto()` no objeto `TextoDecorator`, que agora inclui o comportamento de adicionar um cabeçalho.

```php
echo $textoDecorado->gerarTexto();
```

A saída resultante será:

```
Cabeçalho do Texto
Conteúdo do texto
```

Ao seguir esses passos, movemos a lógica de embelezamento para um decorator separado, separando as responsabilidades e tornando o código mais modular e reutilizável. O objeto decorado pode ser facilmente personalizado com diferentes decoradores para adicionar ou remover funcionalidades extras de forma flexível.

**Minhas Consideraçôes**:

+ Decorator é recusao, onde você tem o objeto base (que fica no final e é o ultimo a ser executado) e vai vai empilhando chamaos sobre eles (cada chamada é um decorator).
  + A ideia é que cada decorator faça algo independente e assim um nao atrapalhe o outro e que nem a odem deles altere as coisa  (ou, pode até mesmo alterar, dando mais funcionaldaide por essa questão de ordenação)
  + A vantagem é, se quiser adicionar mais alguma coisa, é só criar uma classe decorator e jogar na stack
+ No final, esse exemplo do ChatGPT explica bem o decorator mas não explica o exemplo dado no livro

## Mecanism do livro

1 - Antes de começar esta refatoração, você deve identificar umclasse embelezada, uma classe que contém um embelezamento para sua responsabilidade principal.

+ Será a calsse base, no cal vai ser a ultima a ser executarda. é nela que ficara na base da stack de chaamdas

2 - .Identifique ou crie um tipo de exosure, uma interface ou classe que declara todos os métodos públicos necessários aos clientes da classe embelezada. Um tipo de gabinete é conhecido como Decorador:

+ Joque tudo no guardachuva d euma só interface

3 - Encontre a lógica condicional (umatrocarousedeclaração) que adiciona o embelezamento à sua classe embelezada e remove essa lógica aplicando Substituir condicional por polimorfismo

4 - A etapa anterior produziu uma ou mais subclasses da classe embelezada. Transforme essas subclasses em delegar classes aplicandoSubstituir Herança por Delegação[F ]. Ao implementar essa refatoração, certifique-se de fazer o seguinte.

+ Faça com que cada classe delegante implemente o tipo de gabinete.
+ Faça com que o tipo do campo delegado da classe delegante seja o tipo de inclusão. 
+ Decida se seu código de embelezamento será executado antes ou depois que sua classe delegante fizer sua chamada para o delegado.

5 - Cada classe delegante agora atribui seu campo delegado a uma nova instância da classe embelezada. Certifique-se de que essa lógica de atribuição exista em um construtor de classe de delegação. Em seguida, extraia a parte da instrução de atribuição que instancia a classe embelezada em um parâmetro aplicandoExtrair Parâmetro (346). Se possível, remova quaisquer parâmetros de construtor desnecessários aplicando repetidamenteRemover Parâmetro[F ].

**É extramamente confuso, ele passa 1/3 para chegar na hora em que vê a chance de colocar o decortaor, e no 1/3 final refatoranadno mais ainda. No final nem sei se dá certo ou não**

## Replace State-Altering Conditionals with State

### O que é

**Se**

The conditional expressions that control an object's state transitions are complex.

**Refatore para**

Replace the conditionals with State classes that handle specific states and transitions between them.

### Simplificando em uma imagem

### Schema

### Motivação

A principal razão para refatorar para o Design Pattern State [DP ] é domar lógica condicional de alteração de estado excessivamente complexa. Essa lógica, que tende a se espalhar por uma classe, controla o estado de um objeto, incluindo como os estados fazem a transição para outros estados. Ao implementar o padrão State, você cria classes querepresentam estados específicos de um objeto e as transições entre esses estados. O objeto que tem seu estado alterado é conhecido em Design Patterns [DP ] Enquanto o `context`. Um contexto delega um comportamento dependente de estado a um objeto de estado. Objetos de estado fazem transições de estado em tempo de execução, fazendo com que o contexto aponte para um objeto de estado diferente.

Mover a lógica condicional de alteração de estado de uma classe para uma família de classes que representam diferentes estados pode resultar em um design mais simples que fornece uma visão panorâmica melhor das transições entre os estados. Por outro lado, se você puder entender facilmente a lógica de transição de estado em uma classe, provavelmente não precisará refatorar para o padrão State (a menos que planeje adicionar muito mais transições de estado no futuro). A seção de exemplo para esta refatoração mostra um caso em que a lógica condicional de alteração de estado não é mais fácil de seguir ou estender e onde o padrão State pode fazer uma diferença real.

Antes de refatorar para State, é sempre uma boa ideia verificar se refatorações mais simples, comoExtrair método[F ], pode ajudar a limpar a lógica condicional de mudança de estado. Se não puderem, a refatoração para State pode ajudar a remover ou reduzir muitas linhas de lógica condicional, gerando um código mais simples, mais fácil de entender e estender.

Essa Refatoração Replace State-Altering Conditionals with State é diferente da de Martin Fowler Replace Type Code with State/Strategy [F ] pelas seguintes razões.

+ Diferenças entre State e Strategy: O padrão State é útil para uma classe que deve transitar facilmente entre instâncias de uma família de classes state, enquanto o padrão Strategy é útil para permitir que uma classe delegue a execução de um algoritmo para uma instância de uma família de classes Strategy. Devido a essas diferenças, a motivação e a mecânica para refatorar esses dois padrões é diferente (consulte Replace Conditional Logic with Strategy, 129). 
+ Mecânica end-to-end: Martin deliberadamente não documenta uma refatoração completa para o padrão State porque a implementação completa depende de uma refatoração adicional que ele escreveu, Replace Conditional with Polymorphism[F ]. Embora eu respeite essa decisão, achei que seria mais útil para os leitores entender como a refatoração funciona de ponta a ponta, então minhas seções Mecânica e Exemplo delineiam todas as etapas para levá-lo da lógica de mudança de estado condicional para uma implementação de estado .

Se seus objetos de estado não tiverem variáveis de instância (ou seja, eles são apátrida ), você pode otimizar o uso da memória fazendo com que os objetos de contexto compartilhem instâncias das instâncias de estado sem estado. Os padrões Flyweight e Singleton [DP ] são frequentemente usados para implementar o compartilhamento (por exemplo, consulte Instanciação de Limite com Singleton , 296). No entanto, é sempre melhor adicionar código de compartilhamento de estado depois seus usuários experimentam atrasos no sistema e um criador de perfil aponta para o código de instanciação de estado como um gargalo principal.

### Prós e Contras

**Prós**

+ Reduz ou remove a lógica condicional de mudança de estado.

+ Simplifica a lógica complexa de mudança de estado.
+ Fornece uma boa visão panorâmica da lógica de mudança de estado.

**Contras**

+ Complica um projeto quando a lógica de transição de
  estado já é fácil de seguir.

### Mecânica da Refatoração

1 - A classe de `context` é uma classe que contém o campo com o estado original, um campo que é atribuído ou comparado a uma família de constantes durante as transições de estado. Aplicar Replace Type Code with Class (286) no campo de estado original de forma que seu tipo se torne uma classe. Chamaremos essa nova classe de superclasse de estado.

A classe context é conhecida como State: Context e a superclasse state são State

+ Compilar.

2 - Cada constante na superclasse de estado agora se refere a uma instância da superclasse de estado. Apply Extract Subclass [F] para produzir uma subclasse (conhecida como State: ConcreteState [DP ]) por constante, então atualize as constantes na superclasse de estado para que cada uma se refira à instância de subclasse correta da superclasse de estado. Por fim, declare a superclasse de estado como abstrata.

Compilar.

3 - Encontre um método de classe de contexto que altere o valor do campo de estado original com base na lógica de transição de estado. Copie esse método para a superclasse de estado, fazendo as alterações mais simples possíveis para que o novo método funcione. (Um comum,simplesa mudança é passar a classe de contexto para o método para ter métodos de chamada de código na classe de contexto.) Finalmente, substitua o corpo do método de classe de contexto por uma chamada de delegação para o novo método.

Compilar e testar.

Repita esta etapa para cada método de classe de contexto que altera o valor do campo de estado original com base na lógica de transição de estado.

4 - Escolha um estado no qual a classe de contexto pode entrar e identifique quais métodos de superclasse de estado fazem essa transição de estado para outros estados. Copie o(s) método(s) identificado(s), se houver, para a subclasse associada ao estado escolhido e remova toda a lógica não relacionada.

A lógica não relacionada geralmente inclui verificações de um estado atual ou lógica que faz a transição para estados não relacionados.

+ Compilar e testar.

Repita para todos os estados em que a classe de contexto pode entrar.

5 - Exclua os corpos de cada um dos métodos copiados para a superclasse de estado durante a etapa 3 para produzir uma implementação vazia para cada método.

+ Compilar e testar.

### Exemplo

Para entender quando faz sentido refatorar para o padrão State, é útil estudar uma classe que gerencia seu estado sem exigir a sofisticação do padrão State. `SystemPermission` é uma aula assim. Ele usa lógica condicional simples para acompanhar o estado de uma solicitação de permissão para acessar um sistema de software. Ao longo da vida de um  `SystemPermission` objeto, uma variável de instância chamada `state`
transições entre os estados solicitado, reclamado, negado, e garantido. Aqui está um diagrama de estado das possíveis transições:

07-04-state-02.jpg

Abaixo está o código para `SystemPermission` e um fragmento de código de teste para mostrar como a classe é usada:

```java
ic class SystemPermission {
    // ...
    private SystemProfile profile; 
    private SystemUser requestor; 
    private SystemAdmin admin; 
    private boolean isGranted; 
    private String state; 
    public final static String REQUESTED = "REQUESTED"; 
    public final static String CLAIMED = "CLAIMED";
    public final static String GRANTED = "GRANTED"; 
    public final static String DENIED = "DENIED"; 
    
    public SystemPermission(SystemUser requestor, SystemProfile profile) { 
        this.requestor = requestor; 
        this.profile = profile; 
        state = REQUESTED; 
        isGranted = false; 
        notifyAdminOfPermissionRequest(); 
    } 
    
    public void claimedBy(SystemAdmin admin) { 
        if (!state.equals(REQUESTED)) 
            return; 
            
        willBeHandledBy(admin); 
        state = CLAIMED; 
    } 
    
    public void deniedBy(SystemAdmin admin) { 
        if (!state.equals(CLAIMED)) 
            return; 
            
        if (!this.admin.equals(admin)) 
            return; 
        
        isGranted = false; 
        state = DENIED; 
        notifyUserOfPermissionRequestResult(); 
    }

    public void grantedBy(SystemAdmin admin) { 
        if (!state.equals(CLAIMED)) 
            return; 
            
        if (!this.admin.equals(admin)) 
            return; 
            
        state = GRANTED; 
        isGranted = true; 
        notifyUserOfPermissionRequestResult(); 
    }
}

public class TestStates extends TestCase {
    // ...
    private SystemPermission permission; 
    
    public void setUp() { 
        permission = new SystemPermission(user, profile); 
    } 
    
    public void testGrantedBy() { 
        permission.grantedBy(admin); 
        assertEquals("requested", permission.REQUESTED, permission.state()); 
        assertEquals("not granted", false, permission.isGranted()); 
        permission.claimedBy(admin); 
        permission.grantedBy(admin); 
        assertEquals("granted", permission.GRANTED, permission.state()); 
        assertEquals("granted", true, permission.isGranted()); 
    }
}
```

Observe como a variável de instância, `state`, é atribuído a valores diferentes conforme os clientes chamam `SystemPermission` métodos. Agora observe a lógica condicional geral em `SystemPermission` . Essa lógica é responsável pela transição entre os estados, mas a lógica não é muito complicada, então o
código não requer a sofisticação do padrão State.

Essa lógica de mudança de estado condicional pode rapidamente se tornar difícil de seguir à medida que mais comportamento do mundo real é adicionado ao `SystemPermission`  aula. Por exemplo, ajudei a projetar um sistema de segurança no qual os usuários precisavam obter permissões UNIX de banco de dados antes que o usuário pudesse receber permissão geral para acessar um determinado sistema de software. A lógica de transição de estado que requer permissão do UNIX antes que a permissão geral possa ser concedida se parece com isto:

07-04-state-03.jpg

Adicionar suporte para permissão UNIX torna `SystemPermission` a lógica condicional de alteração de estado é mais complicada do que costumava ser. Considere o seguinte:

```java
public class SystemPermission {
    // ...
    public void claimedBy(SystemAdmin admin) {
        if (!state.equals(REQUESTED) && !state.equals(UNIX_REQUESTED)) 
            return; 
            
        willBeHandledBy(admin); 
        if (state.equals(REQUESTED)) 
            state = CLAIMED; 
        else if (state.equals(UNIX_REQUESTED)) 
            state = UNIX_CLAIMED; 
        
    } 
    
    public void deniedBy(SystemAdmin admin) { 
        if (!state.equals(CLAIMED) && !state.equals(UNIX_CLAIMED)) 
            return; 
            
        if (!this.admin.equals(admin)) 
            return; 
            
        isGranted = false; 
        isUnixPermissionGranted = false; 
        state = DENIED; 
        notifyUserOfPermissionRequestResult(); 
    } 
    
    public void grantedBy(SystemAdmin admin) { 
        if (!state.equals(CLAIMED) && !state.equals(UNIX_CLAIMED)) 
            return; 
            
        if (!this.admin.equals(admin)) 
            return; 
        
        if (profile.isUnixPermissionRequired() && state.equals(UNIX_CLAIMED))
            isUnixPermissionGranted = true; 
        else if (profile.isUnixPermissionRequired() && !isUnixPermissionGranted()) { 
            state = UNIX_REQUESTED; 
            notifyUnixAdminsOfPermissionRequest(); 
            return; 
        } 
        state = GRANTED; 
        isGranted = true; 
        notifyUserOfPermissionRequestResult(); 
    }
}
```

Uma tentativa pode ser feita para simplificar este código aplicando Extrair método [F]. Por exemplo, eu poderia refatorar o método  `grantedBy()` para:

```java
public void grantedBy(SystemAdmin admin) { 
    if ( !isInClaimedState() ) 
        return; 
    
    if (!this.admin.equals(admin)) 
        return; 
    
    if ( isUnixPermissionRequestedAn dClaimed() ) 
        isUnixPermissionGranted = true;
    else if ( isUnixPermisionDesiredButNotRequested() ) { 
        state = UNIX_REQUESTED; 
        notifyUnixAdminsOfPermissionRequest(); 
        return; 
    } 
// ...
```

Embora isso seja uma melhoria, `SystemPermission` agora tem muita lógica booleana específica do estado (por exemplo, métodos como `isUnixPermissionRequestedAndClaimed`() ), e a `grantedBy()` método
ainda não é simples. **AGORA é hora de ver como simplifiquei as coisas refatorando para o padrão State.**

1 - `SystemPermission` tem um campo chamado `state`, que é do tipo  `String` . O primeiro passo é mudar estado para ser uma classe aplicando a refatoração Replace Type Code with Class (286). Isso produz a  eguinte nova classe:

```java
public class PermissionState { 
    private String name;
    
    private PermissionState(String name) { 
        this.name = name; 
    } 
    
    public final static PermissionState REQUESTED = new PermissionState("REQUESTED"); 
    public final static PermissionState CLAIMED = new PermissionState("CLAIMED"); 
    public final static PermissionState GRANTED = new PermissionState("GRANTED"); 
    public final static PermissionState DENIED = new PermissionState("DENIED"); 
    public final static PermissionState UNIX_REQUESTED = new PermissionState("UNIX_REQUESTED"); 
    public final static PermissionState UNIX_CLAIMED = new PermissionState("UNIX_CLAIMED"); 
    public String toString() { 
        return name; 
    } 
}
```

A refatoração também substitui `state` de `SystemPermission`  com um chamado a  `permissionState,` , que é do tipo  `PermissionState` 

```java
public class SystemPermission {

    private PermissionState permissionState;
    
    public SystemPermission(SystemUser requestor, SystemProfile profile) { 
        // ... 
        setState(PermissionState.REQUESTED); 
        // ... 
    } 
    
    public PermissionState getState() { 
        return permissionState ; 
    } 
    
    private void setState(PermissionState state) { 
        permissionState = state; 
    } 
    
    public void claimedBy(SystemAdmin admin) { 
        if (!getState().equals(PermissionState.REQUESTED) && !getState().equals(PermissionState.UNIX_REQUESTED)) 
            return; 
        
        // ...     
    }
}
```

2 - `PermissionState` agora contém seis constantes, todas as quais são instâncias de `PermissionState` . Para tornar cada uma dessas constantes uma instância de uma subclasse de `PermissionState` , eu aplico Extrair subclasse[F ] seis vezes para produzir o resultado mostrado no diagrama a seguir.

Porque nenhum cliente jamais precisará instanciar `PermissionState` , declaro-o abstrato:

```java
public abstract class PermissionState...
```

O compilador está satisfeito com todo o novo código, então continuo.

3 - Em seguida, encontro um método em `SystemPermission` que muda o valor `permission` com base na lógica de transição de estado. Existem três desses métodos em `SystemPermission` : `claimedBy()`,
`deniedBy()`, e `grantedBy()`. Eu começo trabalhando com reivindicado por (). Devo copiar este método para `PermissionState` , fazendo alterações suficientes para compilar e, em seguida, substituindo o corpo do original de `claimedBy()` método com uma chamada para o novo  `PermissionState` versão:

```java
public class SystemPermission {
    // private 
    void setState(PermissionState state) { // now has package-level visibility 
        permissionState = state; 
    } 
    
    public void claimedBy(SystemAdmin admin) {
        permissionState.claimedBy(admin, this); 
    } 
    
    void willBeHandledBy(SystemAdmin admin) { 
        this.admin = admin; 
    } 
}
abstract class PermissionState {
    public void claimedBy(SystemAdmin admin, SystemPermission permission) { 
        if (!permission.getState().equals(REQUESTED) && !permission.getState().equals(UNIX_REQUESTED)) 
            return; 
            
        permission.willBeHandledBy(admin); 

        if (permission.getState().equals(REQUESTED)) 
            permission.setState(CLAIMED); 
        else if (permission.getState().equals(UNIX_REQUESTED)) { 
            permission.setState(UNIX_CLAIMED); 
        } 
    } 
}
```

Depois de compilar e testar para ver se as alterações funcionaram, repito esta etapa para `deniedBy()` e  `grantedBy()` .

4 - Agora eu escolho um estado que `SystemPermission` pode entrar e identificar quais `PermissionState` métodos fazem essa transição de estado para outros estados. vou começar com o REQUESTED estado. Este
estado só pode transitar para o CLAIMED estado, e a transição acontece no `PermissionState.claimedBy()` método. Eu copio esse método para a classe `PermissionRequested`:

```java
class PermissionRequested extends PermissionState {
    public void claimedBy(SystemAdmin admin, SystemPermission permission) { 
        if (!permission.getState().equals(REQUESTED) && !permission.getState().equals(UNIX_REQUESTED)) 
            return; 
        
        permission.willBeHandledBy(admin); 

        if (permission.getState().equals(REQUESTED)) 
            permission.setState(CLAIMED); 
        else if (permission.getState().equals(UNIX_REQUESTED)) { 
            permission.setState(UNIX_CLAIMED); 
        } 
    } 
}
```

Muita lógica neste método não é mais necessária. Por exemplo, qualquer coisa relacionada ao UNIX_REQUESTED estado não é necessário porque estamos preocupados apenas com o REQUESTED estado na classe `PermissionRequested`. Também não precisamos verificar se nosso estado atual é REQUESTED porque o fato de estarmos na classe `PermissionRequested` nos diz isso. Então eu posso reduzir esse código para o seguinte:

```java
class PermissionRequested extends PermissionState {
    public void claimedBy(SystemAdmin admin, SystemPermission permission) { 
        permission.willBeHandledBy(admin); 
        permission.setState(CLAIMED);
    } 
}
```

Como sempre, compilo e testo para ter certeza de que não quebrei nada. Agora repito este passo para os outros cinco estados. Vejamos o que é necessário para produzir os estados `PermissionClaimed` e `PermissionGranted`.

O estado `CLAIMED` pode transitar para DENIED, GRANTED, ou UNIX_REQUESTED. Os métodos `deniedBy()` ou `grantedBy()` cuidam dessas transições, então eu copio esses métodos para o
`PermissionClaimed` e exclua a lógica desnecessária:

```java
class PermissionClaimed extends PermissionState {
    // ...
    public void deniedBy(SystemAdmin admin, SystemPermission permission) { 
        // if (!permission.getState().equals(CLAIMED) && !permission.getState().equals(UNIX_CLAIMED)) 
        //     return; 
        
        if (!permission.getAdmin().equals(admin)) 
            return; 
        
        permission.setIsGranted(false); 
        permission.setIsUnixPermissionGranted(false); 
        permission.setState(DENIED); 
        permission.notifyUserOfPermissionRequestResult(); 
    } 
    
    public void grantedBy(SystemAdmin admin, SystemPermission permission) { 
        // if (!permission.getState().equals(CLAIMED) && !permission.getState().equals(UNIX_CLAIMED))
        //     return; 
        
        if (!permission.getAdmin().equals(admin)) 
            return; 
        
        // if (permission.getProfile().isUnixPermissionRequired() && permission.getState().equals(UNIX_CLAIMED)) 
        //     permission.setIsUnixPermissionGranted(true); 
        // else 
        if (permission.getProfile().isUnixPermissionRequired() && !permission.isUnixPermissionGranted()) { 
            permission.setState(UNIX_REQUESTED); 
            permission.notifyUnixAdminsOfPermissionRequest(); 
            return; 
        } 
        permission.setState(GRANTED); 
        permission.setIsGranted(true); 
        permission.notifyUserOfPermissionRequestResult(); 
    }
}
```

Para `PermissionGranted`,, meu trabalho é fácil. uma vez por  `SystemPermission` atinge
o estado `GRANTED`, ele não tem outros estados para os quais possa fazer a transição (ou seja, está em um estado final). Portanto, esta classe não precisa implementar nenhum método de transição (por exemplo, reivindicado por `claimedBy()`. Na verdade, ele realmente precisa herdar implementações vazias dos métodos de transição, que é exatamente o que acontecerá após a próxima etapa da refatoração.

5 -  Em  `PermissionState` , agora posso excluir os corpos de reivindicado por (), `deniedBy()` , e `grantedBy()` , deixando o seguinte:

```java
abstract class PermissionState { 
    public String toString(); 
    public void claimedBy(SystemAdmin admin, SystemPermission permission) {}
    public void deniedBy(SystemAdmin admin, SystemPermission permission) {} 
    public void grantedBy(SystemAdmin admin, SystemPermission permission) {} 
}
```

Eu compilo e testo para confirmar se os estados continuam se comportando corretamente. Eles fazem. A única questão que resta é a melhor maneira de celebrar essa refatoração bem-sucedida para o padrão State.

## Replace Implicit Tree with Composite

Envolve árvore o qu quqsse nunca se usa

## Replace Conditional Dispatcher with Command

### O que é

**SE**

Conditional logic is used to dispatch requests and execute actions.

**Refatore usando padrões para**

Create a Command for each action. Store the Commands in a collection and replace the conditional logic with code to fetch and execute Commands.

### Simplificando em uma imagem

07-06-command-dispatcher-02.png

### Schema

07-06-command-dispatcher-01.jpg

### Motivação

Muitos sistemas recebem, roteiam e lidam com solicitações. A
despachante (*dispatcher*) condicional é uma declaração condicional (como um `switch`)
que executa o roteamento e a manipulação de solicitações. Alguns
despachantes condicionais são adequados para seus trabalhos; outros
não.

Despachantes condicionais que são adequados tendem a
rotear um pequeno número de solicitações para pequenos blocos de lógica do
manipulador. Esses despachantes geralmente podem ser visualizados em um
monitor sem a necessidade de rolar para ver todo o código. O padrão Command
geralmente não fornece um substituto útil para esses tipos de despachantes
condicionais (ou seja, quando os blocos dos `ifs` são pequenos).

Por outro lado, se o seu despachante condicional for pequeno, ainda pode
não ser uma boa opção para o seu sistema (Você pode usar outras estratégias para refatorar, como usar um dicionário para mapear a chave. 

Os dois motivos mais comuns
para refatorar de um dispatcher condicional para uma solução baseada em
COMMAND são os seguintes.

1. **Quando Não há flexibilidade em tempo de execução:** os clientes que
dependem do despachante condicional desenvolvem a necessidade de
configurá-lo dinamicamente com novas solicitações ou lógica do manipulador.
No entanto, o despachante condicional não permite tais configurações
dinâmicas porque toda a sua lógica de roteamento e manipulação é
codificada em uma única instrução condicional.
2. **Um corpo grande de código:** alguns despachantes condicionais tornam-se
enormes e difíceis de manejar à medida que evoluem para lidar com novas
solicitações ou à medida que a lógica do manipulador se torna cada vez
mais complexa com novas responsabilidades. Extrair a lógica do
manipulador em métodos diferentes não ajuda o suficiente porque a
classe que contém o despachante e os métodos de manipulador extraídos
ainda é muito grande para trabalhar.

O padrão Command fornece uma excelente solução para esses problemas.
Para implementá-lo, basta colocar cada parte da lógica de manipulação de
solicitação em uma classe de "comando" separada que possui um método
comum, como `execute()` ou `run()`, por executar seu
lógica do manipulador encapsulado. Depois de ter uma família desses
comandos, você pode usar uma coleção para armazenar e recuperar
instâncias deles; adicionar, remover ou alterar instâncias; e executar
instâncias invocando seus métodos de execução.

Roetar solicitações e executar diversos comportamentos de maneira
uniforme pode ser tão central para um projeto que você pode acabar
usando o padrão Command no início, em vez de refatorá-lo
posteriormente. Muitos dos sistemas baseados na Web do lado do
servidor que construí usaram o padrão Command para produzir uma
maneira padrão de rotear solicitações, executar ações ou encaminhar
ações para outras ações. A seção Exemplo mostra como refatorar para tal
solução.

Os autores de Padrões de design [DP  explicam como o padrão Command é
freqüentemente usado para suportar uma capacidade de desfazer/refazer.
Uma questão que frequentemente surge nos círculos de programação
extrema (XP) é o que fazer quando você não tem certeza se um sistema
precisará ser desfeito/refeito. Você apenas implementa o padrão Command
caso seja necessário? Ou isso é uma violação de "Você não vai precisar disso - You aren't gonna need it - YAGNI",
um princípio do XP que adverte contra a adição de funcionalidade ao código
com base na especulação, não na necessidade genuína. Se não tenho certeza
se um sistema precisa do padrão Command, geralmente não o implemento,
pois acho que não é tão difícil refatorar para esse padrão quando surge a
necessidade. No entanto, se o seu código estiver entrando em um estado em
que será cada vez mais difícil refatorar para o padrão Commandehá uma boa
chance de você precisar em breve de um recurso de desfazer/refazer, pode
fazer sentido refatorá-lo para usar o comando antes que isso seja
incrivelmente difícil. É um pouco como fazer um plano de seguro.

O padrão Command é fácil de implementar, versátil e incrivelmente
útil. Essa refatoração captura apenas uma área em que é útil. Como
o Command pode resolver outros problemas complicados, pode
haver facilmente refatorações adicionais para ele.

### Prós e Contras

**Prós**

+ Fornece um mecanismo simples para executar diversos
  comportamentos de maneira uniforme.

+ Permite alterações de tempo de execução em relação a quais solicitações
são tratadas e como.
+ Requer código trivial para implementar.

**Contras**

+ Complica um projeto quando um despachante condicional é
  suficiente.

### Mecânica da Refatoração

1 - Em uma classe que contém um despachante condicional, encontre o código que manipula uma solicitação e aplique Extrair Método[F] nesse código até que você tenha um método de execução, um método que invoca o comportamento do código.

Compilar e testar.

2 - Repita a etapa 1 para extrair todas as partes restantes do código de manipulação de solicitação em métodos de execução.

3 - Aplicar Extrair classe[F] em cada método de execução para produzir um Command concreto, uma classe que
manipula uma solicitação. Esta etapa geralmente implica tornar público o método de execução do comando
concreto. Se o método de execução no novo comando concreto for muito grande ou não for rapidamente
compreensível, aplique Método de composição (123).

Compilar e testar.

Depois de terminar de criar todos os seus comandos concretos, procure por códigos duplicados neles. Se você encontrar algum, veja se pode removê-lo aplicando Método de modelo de formulário (205).

4 - Definir um comando, uma interface ou classe abstrata que declara um método de execução que é o mesmo para cada comando concreto. Para implementar esta etapa, você precisará analisar seus comandos concretos para saber o que há de único ou semelhante neles. Encontre respostas para as seguintes perguntas.

+ Quais parâmetros devem ser passados para um método de execução comum?
+ Que parâmetro(s) poderia(m) ser passado(s) durante a construção de um comando concreto?
+ Que informações um comando concreto poderia obter chamando de volta um parâmetro, em vez de ter dados passados diretamente para o comando concreto?
+ Qual é a assinatura mais simples para um método de execução que é o mesmo para cada
  comando concreto?

Considere produzir uma versão inicial do seu comando aplicando Extrair superclasse[F] ou
Extrair interface[F] em um comando concreto.

Compilar.

5 - Faça com que cada comando concreto implemente ou estenda seu comando e atualize todo o código do
cliente para funcionar com cada comando concreto por meio do tipo de comando.

Compilar e testar.

6 - Na classe que contém o dispatcher condicional, defina e preencha ummapa de comando, um mapa que
contém instâncias de cada comando concreto, marcado por um identificador exclusivo (por exemplo, um nome
de comando) que pode ser usado em tempo de execução para buscar um comando.

Se você tiver muitos comandos concretos, terá muito código que adiciona instâncias de comando
concretas ao seu mapa de comandos. Nesse caso, considere fazer seus comandos concretos
implementarem o padrão Plugin, de Padrões de Arquitetura de Aplicativo Corporativo [Fowler, PEAA
]. Isso permitirá que eles sejam carregados simplesmente fornecendo os dados de configuração
apropriados (como uma lista dos nomes das classes de comando ou, melhor ainda, um diretório
onde as classes residem).

Compilar.

7 - Na classe que contém o dispatcher condicional, substitua o código condicional para
despachar solicitações pelo código para buscar o comando concreto correto e execute-o
chamando seu método de execução. Esta classe agora é um Invoker [DP , 236].

Compilar e testar.

### Exemplo

O código de exemplo que veremos vem de um sistema que eu coescrevi para criar e organizar os catálogos
baseados em HTML da Industrial Logic. Ironicamente, esse sistema fez uso intenso do padrão Command
desde suas primeiras evoluções. Resolvi reescrever as seções do sistema que usavam o padrão Command
paranãousar o padrão Command para produzir o tipo de código inchado e sedento de comandos que
encontro com tanta frequência no campo.



No código alterado, uma classe chamadaCatalogAppé responsável por despachar e executar ações
e retornar respostas. Ele executa este trabalho dentro de uma grande declaração condicional:

```java
public class CatalogApp {
    private HandlerResponse executeActionAndGetResponse(String actionName, Map parameters) {
        
        // 1° IF
        if (actionName.equals(NEW_WORKSHOP)) { 
            String nextWorkshopID = workshopManager.getNextWorkshopID(); 
            StringBuffer newWorkshopContents = workshopManager.createNewFileFromTemplate(nextWorkshopID, workshopManager.getWorkshopDir(), workshopManager.getWorkshopTemplate());
            workshopManager.addWorkshop(newWorkshopContents);
            parameters.put("id",nextWorkshopID); 
            executeActionAndGetResponse(ALL_WORKSHOPS, parameters); 
            
        // 2° IF
        } else if (actionName.equals(ALL_WORKSHOPS)) { 
            XMLBuilder allWorkshopsXml = new XMLBuilder("workshops"); 
            WorkshopRepository repository = workshopManager.getWorkshopRepository(); 
            Iterator ids = repository.keyIterator(); 
            while (ids.hasNext()) { 
                String id = (String)ids.next(); 
                Workshop workshop = repository.getWorkshop(id); allWorkshopsXml.addBelowParent("workshop");
                allWorkshopsXml.addAttribute("id", workshop.getID()); 
                allWorkshopsXml.addAttribute("name", workshop.getName()); allWorkshopsXml.addAttribute("status", workshop.getStatus()); 
                allWorkshopsXml.addAttribute("duration", workshop.getDurationAsString()); 
            } 
            String formattedXml = getFormattedData(allWorkshopsXml.toString()); 
            return new HandlerResponse(new StringBuffer(formattedXml), ALL_WORKSHOPS_STYLESHEET); 
        }
        
        // ...many more "else if" statements
    }
}
```



A condicional completa se estende por várias páginas - vou poupar você dos detalhes. A primeira etapa
da condicional lida com a criação de uma nova oficina. A segunda etapa, que por acaso seráchamado pela primeira perna, retorna o XML que contém informações resumidas de todos os workshops da
Lógica Industrial. Mostrarei como refatorar esse código para usar o padrão Command.



1 - Começo trabalhando na primeira etapa da condicional. eu aplicoExtrair Método[F ] para
produzir o método de execução de `getNewWorkshopResponse()`:



```java
public class CatalogApp {
    // ...
    private HandlerResponse executeActionAndGetResponse(String actionName, Map parameters) {
        
        // ...
        
        if (actionName.equals(NEW_WORKSHOP)) {
            // <Extract Method>
            getNewWorkshopResponse(parameters); 
            // </Extract Method>
            
        } else if (actionName.equals(ALL_WORKSHOPS)) { 
            // ... 
        } // ...many more "else if" statements 
        
    }
    
    // Bloco de instruçâo extraido para um método (Semelhante a Compose Method)
    private HandlerResponse getNewWorkshopResponse(Map parameters) throws Exception { 
        String nextWorkshopID = workshopManager.getNextWorkshopID(); 
        StringBuffer newWorkshopContents = workshopManager.createNewFileFromTemplate(nextWorkshopID, workshopManager.getWorkshopDir(), workshopManager.getWorkshopTemplate()); 
        workshopManager.addWorkshop(newWorkshopContents); 
        parameters.put("id",nextWorkshopID); 
        return executeActionAndGetResponse(ALL_WORKSHOPS, parameters); 
    }
}
```

2 - Agora vou extrair o próximo pedaço de código de tratamento de solicitação, que lida com a listagem de todos os workshops no catálogo:

```java
public class CatalogApp {
    private HandlerResponse executeActionAndGetResponse(String actionName, Map parameters) {
        if (actionName.equals(NEW_WORKSHOP)) { 
            getNewWorkshopResponse(parameters); 
        } else if (actionName.equals(ALL_WORKSHOPS)) { 
        	// <Extract Method>
            getAllWorkshopsResponse();
            // </Extract Method>
            
        } // ...many more "else if" statements
    }

    public HandlerResponse getAllWorkshopsResponse() { 
        XMLBuilder allWorkshopsXml = new XMLBuilder("workshops"); 
        WorkshopRepository repository = workshopManager.getWorkshopRepository(); 
        Iterator ids = repository.keyIterator(); 
        while (ids.hasNext()) { 
            String id = (String)ids.next(); 
            Workshop workshop = repository.getWorkshop(id);
            allWorkshopsXml.addBelowParent("workshop"); 
            allWorkshopsXml.addAttribute("id", workshop.getID()); 
            allWorkshopsXml.addAttribute("name", workshop.getName()); 
            allWorkshopsXml.addAttribute("status", workshop.getStatus()); 
            allWorkshopsXml.addAttribute("duraction", workshop.getDurationAsString()); 
        }
        String formattedXml = getFormattedData(allWorkshopsXml.toString()); 
        return new HandlerResponse(new StringBuffer(formattedXml), ALL_WORKSHOPS_STYLESH EET); 
    }
    
}
```

3 - Agora começo a criar comandos concretos. Eu primeiro produzo o
`NewWorkshopHandler` comando concreto aplicando Extrair classe[F] no método de
execução `getNewWorkshopResponse()`:

```java
public class NewWorkshopHandler { 
    private CatalogApp catalogApp; 

    public NewWorkshopHandler(CatalogApp catalogApp) { 
        this.catalogApp = catalogApp; 
    } 

    public HandlerResponse getNewWorkshopResponse(Map parameters) throws Exception { 
        String nextWorkshopID = workshopManager().getNextWorkshopID(); 
        StringBuffer newWorkshopContents = WorkshopManager().createNewFileFromTemplate(nextWorkshopID, workshopManager().getWorkshopDir(), workshopManager().getWorkshopTemplate()); 
        workshopManager().addWorkshop(newWorkshopContents); 
        parameters.put("id", nextWorkshopID); 
        catalogApp.executeActionAndGetResponse(ALL_WORKSHOPS, parameters); 
    } 

    private WorkshopManager workshopManager() { 
        return catalogApp.getWorkshopManager(); 
    } 
}
```

`CatalogApp` instancia e chama uma instância de `NewWorkshopHandler` igual a:

```java
public class CatalogApp {
    public HandlerResponse executeActionAndGetResponse(String actionName, Map parameters) throws Exception { 
        if (actionName.equals(NEW_WORKSHOP)) { 
            // Usamos a classe que acabamos de ciar que substitui o bloco de instrução
            return new NewWorkshopHandler(this).getNewWorkshopResponse(parameters); 
            //
        } else if (actionName.equals(ALL_WORKSHOPS)) { 
            // ... 
        } // ...
    }
}
```

O compilador e os testes confirmam que essas alterações funcionam bem. Observe
que eu fiz `executeActionAndGetResponse`(...) público porque é chamado de
`NewWorkshopHandler`.

Antes de continuar, eu me inscrevoMétodo de composição (123)sobreNewWorkshopHandlermétodo de execução de:

```java
public class NewWorkshopHandler {
    
    public HandlerResponse getNewWorkshopResponse(Map parameters) throws Exception {
        createNewWorkshop(parameters); 
        return catalogApp.executeActionAndGetResponse(CatalogApp.ALL_WORKSHOPS, parameters); 
    }

    private void createNewWorkshop(Map parameters) throws Exception { 
        String nextWorkshopID = workshopManager().getNextWorkshopID(); 
        workshopManager().addWorkshop(newWorkshopContents(nextWorkshopID)); 
        parameters.put("id",nextWorkshopID); 
    } 

    private StringBuffer newWorkshopContents(String nextWorkshopID) throws Exception { 
        StringBuffer newWorkshopContents = workshopManager().createNewFileFro mTemplate(nextWorkshopID, workshopManager().getWorkshopDir(), workshopManager().getWorkshopTemplate()); 
        return newWorkshopContents; 
    }
    
}
```



Repito esta etapa para métodos de execução adicionais que devem ser extraídos em seus próprios
comandos concretos e transformados em Métodos Compostos.AllWorkshopsHandleré o
próximo comando concreto que extraio. Veja como fica:

```java
public class AllWorkshopsHandler {
    
    private CatalogApp catalogApp; 
    private static String ALL_WORKSHOPS_STYLESHEET="allWorkshops.xsl"; 
    private PrettyPrinter prettyPrinter = new PrettyPrinter(); 
    
    public AllWorkshopsHandler(CatalogApp catalogApp) { 
        this.catalogApp = catalogApp; 
    } 
    
    public HandlerResponse getAllWorkshopsResponse() throws Exception { 
        return new HandlerResponse( new StringBuffer(prettyPrint(allWorkshopsData())), ALL_WORKSHOPS_STYLESHEET ); 
    } 
    
    private String allWorkshopsData() {
      // ...
    }
    
    private String prettyPrint(String buffer) { 
        return prettyPrinter.format(buffer); 
    }
}
```

Depois de executar esta etapa para cada comando concreto, procuro código duplicado em todos os
comandos concretos. Não encontro muita duplicação, então não há necessidade de aplicar Método de
modelo de formulário (205).

4 -Agora devo criar um comando (conforme definido na seção Mecânica, uma interface ou classe
abstrata que declara um método de execução que todo comando concreto deve implementar). No
momento, cada comando concreto tem um método de execução com um nome diferente, e os
métodos de execução recebem um número diferente de argumentos (ou seja, um ou nenhum):

```java
if (actionName.equals(NEW_WORKSHOP)) { 
    return new NewWorkshopHandler(this).getNewWorkshopResponse(parameters); 
} else if (actionName.equals(ALL_WORKSHOPS)) { 
    return new AllWorkshopsHandler(this).getAllWorkshopsResponse(); 
} //...
```

Fazer um comando envolverá decidir sobre:

+ Um nome de método de execução comum
+ Quais informações passar e obter de cada manipulador

O nome do método de execução comum que escolho éexecutar(um nome que é
freqüentemente usado ao implementar o padrão Command, mas não é o único nome a ser
usado). Agora devo decidir quais informações precisam ser passadas e/ou obtidas de uma
chamada para executar(). Examino os comandos concretos que criei e aprendo que muitos
deles:

+ Exigir informações contidas em umMapachamadoparâmetros
+ Retorna um objeto do tipoHandlerResponse
+ Jogue umExceção

Isso significa que meu comando deve incluir um método de execução com a seguinte
assinatura:

```java
public HandlerResponse execute(Map parameters) throws Exception
```

Eu crio o comando executando duas refatorações em `NewWorkshopHandler`. Primeiro, eu
renomeio seu `getNewWorkshopResponse`(...)método para `execute`(...):

```java
public class NewWorkshopHandler...
	public HandlerResponse
execute(Map parameters) throws Exception
```

Em seguida, aplico a refatoraçãoExtrair superclasse[F ] para produzir uma classe abstrata chamada
Manipulador:

```java
public abstract class Handler { 
    protected CatalogApp catalogApp; 
    public Handler(CatalogApp catalogApp) { 
        this.catalogApp = catalogApp;
    } 

    public abstract HandlerResponse execute(Map parameters) throws Exception; 
} 

public class NewWorkshopHandler extends Handler {
    public NewWorkshopHandler(CatalogApp catalogApp) { 
        super(catalogApp); 
    }
}
```

O compilador está satisfeito com a nova classe, então sigo em frente.

5 - Agora que tenho o comando (expresso como uma classe abstrata `Handler`), farei com que cada manipulador o
implemente. Eu faço isso fazendo com que todos se estendam `Hadnler`e implemente o método `execute`.
Quando terminar, os manipuladores agora podem ser invocados de forma idêntica:

```java
if (actionName.equals(NEW_WORKSHOP)) { 
    return new NewWorkshopHandler(this).execute(parameters);
} else if (actionName.equals(ALL_WORKSHOPS)) { 
    return new AllWorkshopsHandler(this).execute(parameters); 
}
```

Eu compilo e executo os testes para descobrir se tudo está funcionando.

6 - Agora vem a parte divertida. `CatalogApp` declaração condicional de está meramente agindo como um Mapemaneto bruto (mapeia `string` para `create new ...`).
Seria melhor transformá-lo em um mapa real armazenando uma instância do meu comando em um mapa de
comando. Para fazer isso, defino e preenchomanipuladores, aMapadigitado pelo nome do manipulador:

**Esse ponto é importante para RETIRAR TOTALMENTE ESSES IFS**

```java
public class CatalogApp {
    private Map handlers; 
    
    public CatalogApp(...) { 
        // ... 
        createHandlers(); 
        // ... 
    }

    public void createHandlers() { 
        // DICIONÁRIO EM JAVA
        handlers = new HashMap(); 
        handlers.put(NEW_WORKSHOP, new NewWorkshopHandler(this)); 
        handlers.put(ALL_WORKSHOPS, new AllWorkshopsHandler(this)); 
        // ... 
    }
}
```

Como não tenho muitos manipuladores, não recorro à implementação de um Plugin,
conforme descrito na seção Mecânica. O compilador está satisfeito com o novo código.

7 - Por fim, substituo o grande instrução condicional de `CatalogApp` com código que procura um `handler` pelo nome e o executa:

```java
public class CatalogApp {
    
    public HandlerResponse executeActionAndGetResponse(String handlerName, Map parameters) throws Exception { 
        Handler handler = lookupHandlerBy(handlerName); 
        return handler.execute(parameters); 
    }

    private Handler lookupHandlerBy(String handlerName) { 
        return (Handler)handlers.get(handlerName); 
    }
}
```

O compilador e o código de teste estão satisfeitos com esta solução baseada em comando.CatalogApp
agora usa o padrão Command para executar uma ação e obter uma resposta. Esse design torna fácil
declarar um novo manipulador, nomeá-lo e registrá-lo no mapa de comandos para que possa ser
chamado no tempo de execução para executar uma ação.
