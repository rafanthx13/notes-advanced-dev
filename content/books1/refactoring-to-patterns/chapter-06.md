# Chapter 6. Creation

Embora todo sistema orientado a objetos crie objetos ou estruturas de objetos, o código de criação nem sempre é livre de duplicação, simples, intuitivo ou tão livremente acoplado ao código do cliente quanto poderia ser. As seis refatorações neste capítulo visam problemas de projeto em tudo, desde construtores até lógica de construção excessivamente complicada e Singletons desnecessários [DP ]. Embora essas refatorações não abordem todos os problemas de design criacional que você provavelmente encontrará, elas abordam alguns dos problemas mais comuns.

Se houver muitos construtores em uma classe, os clientes terão dificuldade em saber qual construtor chamar. Uma solução é reduzir o número de construtores aplicando refatorações como Extrair classe[F ] ouExtrair subclasse[F ]. Se isso não for possível ou útil, você pode esclarecer a intenção dos construtores aplicandoSubstituir construtores por métodos de criação (57).

O que é um Método de Criação? É simplesmente um método estático ou não estático que cria e retorna uma instância de objeto. Para este livro, decidi definir o padrão Creation Method para ajudar a diferenciá-lo do Factory Method [DP ] padrão. Um método de fábrica é útil para a criação polimórfica. Ao contrário de um método de criação, um método de fábrica não pode ser estático e deve ser implementado por pelo menos duas classes, geralmente uma superclasse e uma subclasse. Se as classes em uma hierarquia implementam um método de forma semelhante, exceto para uma etapa de criação de objeto, você provavelmente pode remover o código duplicado aplicando primeiroIntroduza a criação polimórfica com o método de fábrica (88).

Uma classe que é uma Fábrica é aquela que implementa um ou mais Métodos de Criação. Se dados e/ou código usados na criação do objetose espalhe por várias classes, você provavelmente se encontrará atualizando o código com frequência em vários lugares, um sinal claro do cheiroExpansão de soluções (43). AplicandoMover conhecimento de criação para a fábrica (68)reduzirá a expansão criacional consolidando o código e os dados de criação em uma única fábrica.

Encapsule Classes com Factory (80)é outra refatoração útil que envolve o padrão Factory. As duas motivações mais comuns para aplicar essa refatoração são (1) garantir que os clientes se comuniquem com instâncias de classes por meio de uma interface comum e (2) reduzir o conhecimento do cliente sobre as classes enquanto torna as instâncias das classes acessíveis por meio de uma fábrica.

Para simplificar a construção de uma estrutura de objeto, não existe padrão melhor que o Builder [DP ].Encapsular composição com construtor (96)mostra como um Builder pode fornecer uma maneira mais simples e menos propensa a erros de construir um Composite [DP ].

A refatoração final nesta seção éSingleton embutido (114). Foi uma alegria escrever esta refatoração, pois muitas vezes encontro Singletons que não precisam existir. Esta refatoração, que mostra como remover um Singleton de seu código, apresenta conselhos sobre Singletons de Ward Cunningham, Kent Beck e Martin Fowler.

## Replace Constructors with Creation Methods

### O que é

**Se**

Constructors on a class make it hard to decide which constructor to call during development.

**Refatore para:**

Replace the constructors with intention-revealing Creation Methods that return object instances.

**Descrição do capítulo**

### Resumo

### Schema

06-01-creation-methods.png

### Motivação

Algumas linguagens permitem que você nomeie os construtores da maneira que desejar, independentemente do nome da classe. Outras linguagens, como Java e C++, não permitem isso; cada construtor deve ser nomeado após sua classe. Se você tiver um construtor simples, isso pode não ser um problema. Por outro lado, se você tiver vários construtores, os programadores terão que escolher qual construtor chamar estudando os parâmetros esperados e/ou vasculhando o código do construtor. O que há de errado com isso? Muita coisa.

Os construtores simplesmente não comunicam a intenção de forma eficiente ou eficaz. Quanto mais construtores você tiver, mais fácil será para os programadores escolherem o errado. Ter que escolher qual construtor chamar retarda o desenvolvimento, e o código que chama um dos muitos construtores geralmente falha em comunicar suficientemente a natureza do objeto que está sendo construído.

Se precisar adicionar um novo construtor a uma classe com a mesma assinatura de um construtor existente, você está sem sorte. Como eles precisam compartilhar o mesmo nome, você não pode adicionar o novo construtor — já que não é possível ter dois construtores com a mesma assinatura na mesma classe, apesar do fato de que eles criariam diferentes tipos de objetos.

É comum, particularmente em sistemas maduros, encontrar vários construtores que não estão mais sendo usados, mas continuam vivos no código. Por que esses construtores mortos ainda estão presentes? Na maioria das vezes é porque os programadores não sabem que os construtores não têm chamador. Ou eles não verificaram os chamadores (talvez porque a expressão de pesquisa que precisam formular é muito complicada) ou não estão usando um ambiente de desenvolvimento que destaca automaticamente o código não chamado. Seja qual for o motivo, os construtores mortos apenas incham uma classe e a tornam mais complicada do que o necessário.

Um Método de Criação pode ajudar a resolver esses problemas. Um método de criação é simplesmente um método estático ou não estático em uma classe que instancia novas instâncias da classe. Não há restrições de nome nos Métodos de Criação, então você pode nomeá-los para expressar claramente o que está criando (por exemplo, criarTermLoan()oucreateRevolver()). Esta nomenclatura flexibilidade significa que dois Métodos de Criação com nomes diferentes podem aceitar o mesmo número e tipo de argumentos. E para programadores que carecem de ambientes de desenvolvimento modernos, geralmente é mais fácil encontrar código de método de criação morto do que encontrar código de construtor morto porque as expressões de pesquisa em métodos nomeados especificamente são mais fáceis de formular do que as expressões de pesquisa em um grupo de construtores.

Uma responsabilidade dessa refatoração é que ela pode introduzir uma maneira não padronizada de executar a criação. Se a maioria de suas classes são instanciadas usandonovoainda alguns são instanciados usando um Creation Method, os programadores terão que aprender como a criação é feita para cada classe. No entanto, essa técnica não padronizada de criação pode ser um mal menor do que ter classes com muitos construtores.

Depois de identificar uma classe que possui muitos construtores, é melhor considerar a aplicaçãoExtrair classe[F ] ouExtrair subclasse[F ]antesvocê decide aplicar essa refatoração.Extrair classeé uma boa escolha se a classe em questão estiver simplesmente fazendo muito trabalho (isto é, se tiver muitas responsabilidades).Extrair subclasseé uma boa escolha se as instâncias da classe usarem apenas uma pequena parte das variáveis de instância da classe.

### Creation Methods and Factory Methods

Como nossa indústria chama um método que cria objetos? Muitos programadores responderiam "Factory Method", após o nome dado a um padrão de criação em Design Patterns [DP ]. Mas todos os métodos que criam objetos são verdadeiros Factory Methods? Dada uma definição ampla do termo (ou seja, um método que simplesmente cria objetos), a resposta seria um enfático "sim!" Mas, dada a maneira como os autores do padrão Factory Method o escreveram em 1995, fica claro que nem todo método que cria objetos oferece o tipo de acoplamento flexível fornecido por um Factory Method genuíno (por exemplo, consulteIntroduza a criação polimórfica com o método de fábrica , 88).

Para nos ajudar a esclarecer ao discutir designs ou refatorações relacionadas à criação de objetos, estou usando o termo Método de Criação para me referir a um método estático ou não estático que cria instâncias de uma classe. Isso significa que todo Factory Method é um Método de Criação, mas não necessariamente o contrário. Isso também significa que você pode substituir o termo Método de Criação sempre que Martin Fowler usar o termo "método de fábrica" em Refatoração [F ] e sempre que Joshua Bloch usa o termo "método de fábrica estático" em Java efetivo [ Bloch ].

### Prós e Contras

**Prós:**

+ Comunica quais tipos de instâncias estão disponíveis melhor
do que os construtores.
+ Ignora as limitações do construtor, como a incapacidade de
ter dois construtores com o mesmo número e tipo de
argumentos.
+ Facilita a localização de código de criação não utilizado.

**Contras:**

+ Torna a criação fora do padrão: algumas classes são
  instanciadas usando new, enquanto outras usamMétodos
  de criação

### Mecânica da Refatoração

Antes de iniciar esta refatoração, identifique oconstrutor catch-all, um construtor completo ao qual outros construtores delegam seu trabalho. Se você não tiver um construtor abrangente, crie um aplicando Construtores de Cadeia (340).

1 - Encontre um cliente que chame o construtor de uma classe para criar um tipo de instância. Aplicar Extrair Método [F] na chamada do construtor para produzir um método estático público. Este novo método é umamétodo de criação. Agora aplique Método de movimentação [F] para mover o método de criação para a classe que contém o construtor escolhido.

Compilar e testar.

2 - Encontre todos os chamadores do construtor escolhido que instanciam o mesmo tipo de instância que o método de criação e atualize-os para chamar o método de criação.

Compilar e testar.

3 - Se o construtor escolhido estiver encadeado a outro construtor, faça o método de criação chamar o construtor encadeado em vez do construtor escolhido. Você pode fazer isso inserindo o construtor, uma refatoração que se assemelha Método embutido[F ].

Compilar e testar.

4 - Repita as etapas 1–3 para cada construtor na classe que você gostaria de transformar em um método de criação.

5 - Se um construtor na classe não tiver chamadores fora da classe, torne-o não público.

Compilar.

## Exemplo

Este exemplo é inspirado no domínio bancário e em uma determinada calculadora de risco de empréstimo que passei vários anos escrevendo, ampliando e mantendo. A classe `Loan` tinha vários construtores, como mostrado no seguinte código.

```java
public class Loan {
    
    private static String TERM_LOAN = “TL”;
    private static String REVOLVER = “RC”;
    private static String RCTL = “RCTL”;
    private String type;
    private CapitalStrategy strategy;
    private float notional;
    private float outstanding;
    private int customerRating;
    private Date maturity;
    private Date expiry;
    
    public Loan(float notional, float outstanding, int customerRating, Date expiry) {
        this(TERM_LOAN, new TermROC(), notional, outstanding,
        customerRating, expiry, null);
    }
    
    public Loan(float notional, float outstanding, int customerRating, Date expiry,
Date maturity) {
        this(RCTL, new RevolvingTermROC(), notional, outstanding, customerRating,
        expiry, maturity);
    }
    
    public Loan(CapitalStrategy strategy, float notional, float outstanding, 
    int customerRating, Date expiry, Date maturity) {
        this(RCTL, strategy, notional, outstanding, customerRating,
        expiry, maturity);
    }
    
    public Loan(String type, CapitalStrategy strategy, float notional,
    float outstanding, int customerRating, Date expiry) {
        this(type, strategy, notional, outstanding, customerRating, expiry, null);
    }
    
    public Loan(String type, CapitalStrategy strategy, float notional,
    float outstanding, int customerRating, Date expiry, Date maturity) {
        this.type = type;
        this.strategy = strategy;
        this.notional = notional;
        this.outstanding = outstanding;
        this.customerRating = customerRating;
        this.expiry = expiry;
        if (RCTL.equals(type))
        this.maturity = maturity;
    }
    
}
```

`Loan` poderia ser usado para representar sete tipos de empréstimos. Vou discutir apenas três deles aqui. Um empréstimo a prazo é um empréstimo que deve ser pago integralmente até a data de vencimento. Um `Revolving`, que é como um cartão de crédito, é um empréstimo que significa "crédito rotativo": você tem um limite de gastos e um prazo de validade. Um empréstimo a prazo de crédito rotativo (RCTL) é um revólver que se transforma em um empréstimo a prazo quando o revólver expira.

Dado que a calculadora oferece suporte a sete tipos de empréstimos, você pode se perguntar por que `Loan` não era uma superclasse abstrata com uma subclasse para cada tipo de empréstimo. Afinal, isso reduziria o número de construtores necessários para `Loan` e suas subclasses. Haviam dois razões pelas quais esta não foi uma boa ideia.

01 => .O que distingue os diferentes tipos de empréstimos não são tanto seus campos, mas como os números, como capital, renda e duração, são calculados. Para dar suporte a três maneiras diferentes de calcular o capital para um empréstimo a prazo, não gostaríamos de criar três subclasses diferentes de `Loan` . É mais fácil apoiar um `Loan` classe e tem três diferentesEstratégiaclasses para um empréstimo a prazo (veja o exemplo deSubstitua a lógica condicional pela estratégia , 129).

02 => O aplicativo que usou `Loan` instâncias necessárias para transformar empréstimos de um tipo de empréstimo para outro. Essa transformação era mais fácil de fazer quando envolvia alterar alguns campos em um único `Loan` instância, em vez de mudar completamente uma instância de um `Loan` subclasse em outra.

Se você olhar para o `Loan` código-fonte apresentado anteriormente, você verá que ele possui cinco construtores, o último dos quais é seuconstrutor catch- all (verConstrutores de Cadeia , 340). Sem conhecimento especializado, é difícil saber quais os construtores que criam empréstimos a prazo, quais os que criam revólveres e quais os que criam RCTL.

Por acaso sei que um RCTL precisa tanto de uma data de expiração quanto de uma data de vencimento, então sei que para criar um RCTL devo chamar um construtor que me deixe passar as duas datas. Você sabia disso? Você acha que o próximo programador que ler este código saberá disso?

O que mais está embutido como conhecimento implícito no `Loan` construtores? Bastante. Se você chamar o primeiro construtor, que aceita três parâmetros, receberá um empréstimo a prazo. Mas se você quiser um revólver, precisará chamar um dos construtores que pegam duas datas e depois fornecem null para a data de vencimento. Eu me pergunto se todos os usuários deste código saberão disso? Ou eles apenas terão que aprender encontrando alguns defeitos feios?

Vamos ver o que acontece quando eu aplico a restruturação **Replace Constructors with Creation Methods**.

1 -Meu primeiro passo é encontrar um cliente que ligue para um dos `Loan` 's construtores. Aqui está um chamador que reside em um caso de teste:

```java
public class CapitalCalculationTests... 
    public void testTermLoanNoPayments() { 
        ... 
        Loan termLoan = new Loan(commitment, riskRating, maturity); 
        ... 
    }
```

Neste caso, uma chamada para o acima `Loan` construtor produz um
empréstimo a prazo. eu aplico Extrair Método [F] nessa chamada para produzir
um método estático público chamadocriarTermLoan:

```java
Loan termLoan = createTermLoan(commitment, riskRating, maturity) ;
```

```java
public static Loan createTermLoan(double commitment, int riskRating, Date maturity) {
    return new Loan(commitment, riskRating, maturity);
}
```

A seguir, aplico Método de movimentação [F] sobre o método de criação, `createTermLoan`, para movê-lo para `Loan` . Isso produz as
seguintes alterações:

```java
public class Loan... 
    public static Loan createTermLoan(double commitment, int riskRating, Date maturity) {
        return new Loan(commitment, riskRating, maturity);
    }

public class CapitalCalculationTest...
    public void testTermLoanNoPayments() {
        ... 
        Loan termLoan = Loan.createTermLoan(commitment, riskRating, maturity); 
        ...
    }
```

Eu compilo e testo para confirmar se tudo funciona.

2 - Em seguida, encontro todos os chamadores no construtor
que criarTermLoanchamadas, e eu as atualizo para ligar
criarTermLoan. Por exemplo:

```java
public class CapitalCalculationTest...
    public void testTermLoanOnePayment() {
    ...
    // Loan termLoan = new Loan(commitment, riskRating,maturity);
    Loan termLoan = Loan.createTermLoan(commitment,
    riskRating, maturity);
    ...
}
```

Mais uma vez, compilo e testo para confirmar se está tudo
funcionando.

3 - OcriarTermLoanagora é o único chamador no construtor. Como
esse construtor está encadeado a outro construtor, posso
removê-lo aplicandoMétodo embutido[F ] (que, neste caso, é na
verdade "construtor embutido"). Isso leva às seguintes
alterações:

```java
public Loan(double commitment, int riskRating, Date maturity) {
        this(commitment, 0.00, riskRating, maturity, null);
    }
```

```java
public class Loan...
    ... // 移除 public Loan(double commitment, int riskRating, Date maturity)
    public static Loan createTermLoan(double commitment, int riskRating, Date maturity) {
        return new Loan(commitment, 0.00, riskRating, maturity, null);
    }
```

Eu compilo e testo para confirmar se a alteração funciona.
4 - Agora repito os passos 1–3 para produzir métodos de criação adicionais
em `Loan` . Por exemplo, aqui está um código que chama
 `Loan` Construtor catch-all de:

```java
public class CapitalCalculationTest... 
    public void testTermLoanWithRiskAdjustedCapitalStrategy() {
        ...
        Loan termLoan = new Loan(riskAdjustedCapitalStrategy, commitment, outstanding, riskRating, maturity, null); 
        ...
    }
```

Observe o valor nulo que é passado como o último parâmetro para o
construtor. Passar valores nulos para um construtor é uma prática ruim. Isso
reduz a legibilidade do código. Isso geralmente acontece porque os
programadores não conseguem encontrar o construtor exato de que
precisam, então, em vez de criar outro construtor, eles chamam um de uso
mais geral.

Para refatorar este código para usar um método de criação, seguirei as
etapas 1 e 2. A etapa 1 leva a outracriarTermLoanmétodo em

```java
public class CapitalCalculationTest...
    public void testTermLoanWithRiskAdjustedCapitalStrategy() {
        ...
        Loan termLoan = Loan.createTermLoan (riskAdjustedCapitalStrategy, commitment, outstanding, riskRating, maturity);
        ...
    } 
    
public class Loan...
    
    public static Loan createTermLoan(double commitment, int riskRating, Date maturity) {
        return new Loan(commitment, 0.00, riskRating, maturity, null);
    }

    public static Loan createTermLoan(CapitalStrategy riskAdjustedCapitalStrategy, 
double commitment, double outstanding, int riskRating, Date maturity) {
        return new Loan(riskAdjustedCapitalStrategy, commitment, outstanding, riskRating, maturity, null);
    }
```

Por que eu escolhi sobrecarregarcriarTermLoan(...)em vez de
produzir um método de criação com um nome único, como
criarTermLoanWithStrategy(...)? Porque eu senti que a presença
doCapitalEstratégiaparâmetro suficientementecomunicou a diferença entre as duas versões
sobrecarregadas decriarTermLoan(...).

Agora, para a etapa 2 da refatoração. Porque o novo criarTermLoan(...)
chamadas `Loan` construtor abrangente de ', devo
encontre outros clientes que chamem o construtor catch-all para instanciar o
mesmo tipo de `Loan` produzido porcriarTermLoan(...). Esse
requer um trabalho cuidadoso porque alguns chamadores do construtor
catch-all produzem revólver ou instâncias RCTL de `Loan` . Então eu
atualize apenas o código do cliente que produz instâncias de empréstimo a prazo de
 `Loan` .

Não preciso executar nenhum trabalho para a etapa 3 porque o construtor
catch-all não está acorrentado a nenhum outro construtor. Continuo
implementando a etapa 4, que envolve a repetição das etapas 1–3. Quando
termino, termino com os seguintes métodos de criação:

06-01-creation-methods-02.png

5.A última etapa é alterar a visibilidade do único construtor
público restante, que é `Loan` é pega-tudo
construtor. Como ele não tem subclasses e agora não tem
chamadores externos, eu o torno privado:

Eu compilo para confirmar que tudo ainda funciona. A refatoração está
completa.

Agora está claro como obter diferentes tipos de `Loan` instâncias. As
ambigüidades foram reveladas e o conhecimento implícito foi explicitado. O
que resta fazer? Bem, como os métodos de criação usam um número
razoavelmente grande de parâmetros, pode fazer sentido aplicar Introduzir
Objeto de Parâmetro[F ].

```java
public class Loan... 
    
    private Loan(CapitalStrategy capitalStrategy, double commitment, double outstanding, int riskRating, Date maturity, Date expiry)
        ...
```

## Move Creation Knowledge to Factory

### O que é

**Se**

**Refatore para:**

**Descrição do capítulo**

### Resumo

### Schema

06-02-knowledge-to-factory.jpg

### Motivação

Quando o conhecimento para criar um objeto está espalhado por várias
classes, você temexpansão da criação: a colocação de responsabilidades
de criação em classes que não deveriam desempenhar nenhum papel na
criação de um objeto. Expansão da criação, que é um caso doExpansão de
soluções cheiro (43), tende a resultar de um problema de projeto anterior.
Por exemplo, um cliente precisava configurar um objeto com base em algumas preferências, mas
não tinha acesso ao código de criação do objeto. Se o cliente não puder
acessar facilmente o código de criação do objeto, digamos, porque ele existe
em uma camada do sistema muito distante do cliente, como o cliente pode
configurar o objeto?

Uma resposta típica é usando força bruta. O cliente passa suas
preferências de configuração para um objeto, que as passa para
outro objeto, que as retém até que o código de criação, por meio de
mais objetos, obtenha as informações para uso na configuração do
objeto. Enquanto isso funciona, ele espalha o código de criação e os
dados por toda parte.

O padrão Factory é útil neste contexto. Ele usa uma classe para encapsular
tanto a lógica de criação quanto a lógica de um cliente.
preferências de instanciação/configuração. Um cliente pode dizer a
uma instância de Factory como instanciar/configurar um objeto, e
então a mesma instância de Factory pode ser usada em tempo de
execução para realizar a instanciação/configuração. Por exemplo, um
NodeFactorycriaStringNodeinstâncias e podem ser
configurado pelos clientes para embelezar essas instâncias com
um DecodingStringNodeDecorador:

06-02-knowledge-to-factory-02.jpg

Uma fábrica não precisa ser implementada exclusivamente por uma classe
concreta. Você pode usar uma interface para definir uma fábrica e fazer uma
classe existente implementar essa interface. Essa abordagem é útil quando
você deseja que outras áreas de um sistema se comuniquem com uma
instância da classe existente exclusivamente por meio de sua interface
Factory.

Se a lógica de criação dentro de uma Factory se tornar muito
complexa, talvez por suportar muitas opções de criação, pode fazer
sentido evoluí-la para uma Abstract Factory [DP ]. Feito isso, os
clientes podem configurar um sistema para usar uma
ConcreteFactory específica (ou seja, uma implementação concreta de
uma Abstract Factory) ou deixar o sistema usar um padrão
ConcreteFactory. Enquanto o acimaNodeFactoryé certamente
não complicado o suficiente para merecer tal evolução, o
diagrama na próxima página mostra como seria uma Fábrica
Abstrata.

06-02-knowledge-to-factory-03.jpg

Já vi vários sistemas nos quais o padrão Factory foi usado em
demasia. Por exemplo, se cada objeto em um sistema for criado
usando uma fábrica, em vez de instanciação direta (por exemplo,novo
StringNode(...)), o sistema provavelmente tem uma
superabundância de fábricas. O uso excessivo desse padrão
geralmente ocorre quando as pessoas sempredesacoplar o código
do cliente do código que escolhe entre quais classes instanciar ou
como instanciá-las. Por exemplo, o seguintecriarQuery()faz uma
escolha sobre qual das duas classes de consulta instanciar:

```
public class Query...
    public void createQuery() throws
    QueryException...
    if (usingSDVersion52()) {
    query = new QuerySD52();
    ...
    } else {
    query = new QuerySD51();
    ...
}
```

Para eliminar a lógica condicional no código acima, alguns o
refatorariam para usar umQueryFactory:

```
public class Query...
    public void createQuery() throws
    QueryException...
    query = queryFactory.createQuery();
...
```

QueryFactoryagora encapsula a escolha de qual classe de consulta
concreta instanciar. Ainda assimQueryFactorymelhorar o design
deste código? Certamente não consolida a expansão da criação, e se
apenas dissociar oConsultaclass do código que instancia uma das
duas consultas concretas, definitivamente não adiciona valor
suficiente para merecer sua existência. Isso ilustra o ponto de que é
melhor não implementar uma fábrica a menos que ela realmente
melhore o design do seu código oupermite criar/configurar objetos de uma forma que não era
possível com a instanciação direta.

### O que é uma Factory

"Fábrica" é uma das palavras mais usadas e imprecisas em nosso
setor. Alguns usam o termo "padrão de fábrica" para se referir a
um método de fábrica [DP ], alguns usam o termo para se referir a
uma Abstract Factory [DP ], alguns usam o termo para se referir a
ambos os padrões e alguns usam o termo para se referir a
qualquer código que crie objetos.

Nossa falta de uma definição comumente compreendida de
"Fábrica" limita nossa capacidade de saber quando um projeto
pode se beneficiar de uma Fábrica. Portanto, apresentarei minha
definição, que é ampla e limitada: uma classe que implementa um
ou mais métodos de criação é uma fábrica.

Isso é verdadeiro se os Métodos de Criação forem estáticos ou não
estáticos; se o tipo de retorno dos Métodos de Criação for uma
interface, classe abstrata ou classe concreta; ou se a classe que
implementa os Métodos de Criação também implementa
responsabilidades não criacionais.

Um método de fábrica [DP ] é um método não estático que
retorna uma classe base ou tipo de interface e que é
implementado em uma hierarquia para permitir a criação
polimórfica (consulteIntroduza a criação polimórfica com o
método de fábrica , 88). Um Factory Method deve ser
definido/implementado por uma classe e uma ou mais
subclasses da classe. A classe e as subclasses agem como
Fábricas. No entanto, não dizemos que um Factory Method é
uma Factory.

Um Abstract Factory é "uma interface para criar famílias de
objetos relacionados ou dependentes sem especificar suas
classes concretas" [DP , 87]. As fábricas abstratas sãoprojetado para ser substituível em tempo de execução, portanto,
um sistema pode ser configurado para usar um implementador
específico e concreto de uma Abstract Factory. Toda fábrica abstrata
é uma fábrica, embora nem toda fábrica seja uma fábrica abstrata.
Classes que são Factories, não Abstract Factories, às vezes evoluem
para Abstract Factories quando surge a necessidade de suportar a
criação de várias famílias de objetos relacionados ou dependentes.

O próximo diagrama, que usa linhas em negrito para
designar métodos que criam objetos, ilustra as diferenças
comuns entre amostras de estruturas Factory Method,
Factory e Abstract Factory.



### Prós e Contras

**Prós:**

+ Consolida lógica de criação e preferências
de instanciação/configuração.
+ Desacopla um cliente da lógica de criação.

**Contras:**

+ Complica um projeto quando a instanciação direta faria.

### Mecânica da Refatoração

Essas mecânicas assumem que sua fábrica será implementada como uma classe, em vez de uma
interface implementada por uma classe. Se você precisar de uma interface Factory implementada por
uma classe, deverá fazer pequenas modificações nessa mecânica.

1 - Uminstanciadoré uma classe que colabora comoutras classespara instanciar umprodutos (ou seja,
uma instância de alguma classe). Se oinstanciadornão instancia oprodutosusando um Método de
Criação, modifique-o e, se necessário, modifique também oprodutos, então a instanciação ocorre
através de um Método de Criação.

Compilar e testar.

2 - Crie uma nova classe que se tornará suafábrica. Nomeie sua fábrica com base no que ela
cria (por exemplo,NodeFactory,LoanFactory).

Compilar.

3 - Aplicar Método de movimentação [F] para mover o Método de Criação para a fábrica. Se o Método de
Criação for estático, você pode torná-lo não estático depois de movê-lo para a fábrica.

Compilar.

4 - Atualize o instanciador para instanciar a fábrica e chame a fábrica para obter uma
instância da classe.

Compile e teste se o instanciador ainda funciona corretamente.

Repita esta etapa para todos os instanciadores que não puderam mais compilar devido às alterações feitas
durante a etapa 3.

5 - Os dados e métodos das outras classes ainda estão sendo usados na instanciação. Mova
o que fizer sentido para a fábrica, para que ela lide com o máximo possível do trabalho de
criação. Isso pode envolver mover onde a fábrica é instanciada e quem a instancia.

Compilar e testar.

### Exemplo

Este exemplo vem do projeto HTML Parser. Conforme descrito emMover enfeite para decorador (144), um
usuário do analisador pode instruí-lo a lidar com a análise de string de diferentes maneiras. Se um usuário não
quiser que as strings analisadas contenham caracteres codificados, como&amplificador;
(que representa um e comercial, &) ou&l;(que representa um colchete angular de abertura, <),
o usuário pode chamar o analisadorsetStringNodeDecoding(shouldDecode: booleano)método,
que ativa ou desativa a opção de decodificação de string. Como o esboço no início desteMover
conhecimento de criação para a fábricarefatoração ilustra, o analisador StringParserrealmente
criaStringNodeobjetos, e quando o faz, configura-os para decodificar ou não decodificar, com
base no valor do campo decodificação emanalisador.

Embora esse código funcionasse,StringNodeo conhecimento da criação estava agora espalhado por
todo o analisador,StringParser, eStringNodeAulas. Esse problema piorou à medida que novas opções
de análise de string foram adicionadas aoanalisador. Cada nova opção exigia a criação de um novo
analisadorcampo com getters e setters correspondentes, bem como o novo código no StringParsere
StringNodepara lidar com a nova opção. O código em negrito no diagrama da página a seguir ilustra
algumas das alterações feitas nas classes resultantes da adição de um caractere de escape (por
exemplo,\nou\r) opção de remoção.

06-02-knowledge-to-factory-05.jpg

Os campos, getters e setters que foram adicionados aanalisadorpara suportar diferentes opções de
análise paraStringNodesnão pertencia aoanalisadoraula. Por que? Porqueanalisadortem a
responsabilidade de iniciar uma sessão de análise, não controlando comoStringNodes(que
representam apenas um dos inúmerosNóeMarcaçãotipos) devem ser analisados. Além disso, o
StringNodeclasse também não tinha um bom motivo para saber nada sobre opções de decodificação
ou remoção de caractere de escape, que já foram modeladas usando o padrão Decorator (veja o
exemplo paraMover enfeite para decorador , 144).

Com base na minha definição anterior, podemos dizer queStringNodejá é uma Fábrica porque
implementa um Método de Criação. O problema é,StringNodenão está ajudando a consolidar todo o
conhecimento usado na instanciação/configuração de umStringNode, nem realmente queremos
porque é melhor manterStringNodepequeno e simples. Uma nova classe Factory será mais capaz de
consolidar a instanciação/configuração, então irei refatorar para uma. Para simplificar, o código a
seguir inclui apenas uma opção de análise - aquela para decodificar nós
— e não inclui a opção de remoção do caractere de escape.

1 - StringParserinstanciaStringNodeobjetos. O primeiro passo nesteMover
conhecimento de criação para a fábricarefatorar é fazerStringParserrealizar sua
instanciação deStringNodeobjetos usando um método de criação. Ele já faz isso, como
mostra o código a seguir.

```java
public class StringParser...
    public Node find(...) { 
        ...
        return StringNode.createStringNode( textBuffer, textBegin, textEnd, parser.shouldDecodeNodes( )); 
    }

public class StringNode... 
    public static Node createStringNode( StringBuffer textBuffer, int textBegin, int textEnd, boolean shouldDecode) {
        if (shouldDecode) 
            return new DecodingStringNode( new StringNode(textBuffer, textBegin, textEnd) ); 
        
        return new StringNode(textBuffer, textBegin, textEnd); 
    }
```

2.Agora crio uma nova turma que vai virar uma fábrica deStringNodeobjetos.
Porque umStringNodeé um tipo deNó, eu nomeio a classeNodeFactory:

```java
public class NodeFactory {
}
```

3.A seguir, aplico Método de movimentação [F] moverStringNodeMétodo de criação de NodeFactory
. Decido tornar o método movido não estático porque não quero que o código do cliente seja
vinculado estaticamente a uma implementação de fábrica. Eu também decido deletar o Método de
Criação emStringNode:

```java
public class NodeFactory {
    public static Node createStringNode( StringBuffer textBuffer, int textBegin, int textEnd, boolean shouldDecode) {
        if (shouldDecode)
            return new DecodingStringNode( new StringNode(textBuffer, textBegin, textEnd));
        
        return new StringNode(textBuffer, textBegin, textEnd);
    }
}

public class StringNode... 
    // public static Node createStringNode
```

Após esta etapa,StringParsere outros clientes que costumavam ligar para oStringNodeO método de
criação de não compila mais. Vou consertar isso a seguir.

4.Agora eu modifico oStringParserpara instanciar umNodeFactorye chame-o para criar um
StringNode:

```java
public class StringParser... 
    public Node find(...) { 
        ... 
        
        NodeFactory nodeFactory = new NodeFactory(); 
        return nodeFactory.createStringNode( textBuffer, textBegin, textEnd, parser.shouldDecodeNodes() ); 
    }
```

Realizo uma etapa semelhante para quaisquer outros clientes que não compilam mais devido ao trabalho realizado
na etapa 3.

5 - Agora vem a parte divertida: eliminar ou reduzir a expansão da criação movendo o
código de criação apropriado de outras classes para oNodeFactory. Neste caso o
outra classe é aanalisador, qual oStringParserchamadas para passar um argumento para o
NodeFactoryduranteStringNodecriação:

```java
public class StringParser... 
public Node find(...) { 
    ... 
    NodeFactory nodeFactory = new NodeFactory(); 
    return nodeFactory.createStringNode( textBuffer, textBegin, textEnd, parser.shouldDecodeNodes() ); 
}
```

Eu gostaria de mover o seguinteanalisadorcódigo para oNodeFactory:

```java
public class Parser...
private boolean shouldDecodeNodes = false; 
public void setNodeDecoding(boolean shouldDecodeNodes) { 
    this.shouldDecodeNodes = shouldDecodeNodes; 
} 
public boolean shouldDecodeNodes() { 
    return shouldDecodeNodes; 
}
```

No entanto, não posso simplesmente mover esse código para oNodeFactoryporque os clientes deste
código são clientes do analisador, que chamamanalisadormétodos comosetNodeDecoding(...) para
configurar o analisador para uma determinada análise. Enquanto isso,NodeFactorynem mesmo é
visível para os clientes do analisador: é instanciado porStringParser, que por si só não é visível para os
clientes do analisador. Isso me leva a concluir que oNodeFactoryinstância deve ser acessível a ambos
analisadorclientes e oStringParser. Para que isso aconteça, sigo os seguintes passos.

(a) primeiro me inscrevoExtrair classe[F ] noanalisadorcódigo que eu quero
eventualmente fundir com oNodeFactory. Isso leva à criação doString-
NodeParsingOptionaula:

```java
public class StringNodeParsingOption { 
    private boolean decodeStringNodes; 
    public boolean shouldDecodeStringNodes() { 
        return decodeStringNodes; 
    } 
    public void setDecodeStringNodes(boolean decodeStringNodes) { 
        this.decodeStringNodes = decodeStringNodes; 
    } 
}
```

Esta nova classe substitui ashouldDecodeNodescampo, getter e setter com umStringNodeParsingOptioncampo e seu getter e setter:

```java
public class Parser.... 
    private StringNodeParsingOption stringNodeParsingOption = new StringNodeParsingOption(); 
    
    // private boolean shouldDecodeNodes = false;
    // public void setNodeDecoding(boolean shouldDecodeNodes) { 
    //     this.shouldDecodeNodes = shouldDecodeNodes; 
    // } 
    // public boolean shouldDecodeNodes() { 
    //     return shouldDecodeNodes; 
    // } 
    public StringNodeParsingOption getStringNodeParsingOption() { 
        return stringNodeParsingOption; 
    } 
    public void setStringNodeParsingOption(StringNodeParsingOption option) { 
        stringNodeParsingOption = option; 
    }
```

analisadoros clientes agora se voltamStringNodedecodificação instanciando e
configurando umStringNodeParsingOptioninstância e passando-o para o analisador:

```java
class DecodingNodeTest... 
    public void testDecodeAmpersand() { 
        ... 
        StringNodeParsingOption decodeNodes = new StringNodeParsingOption(); 
        decodeNodes.setDecodeStringNodes(true);
        parser.setStringNodeParsingOption(decodeNodes); 
        parser.setNodeDecoding(true); 
        ... 
    }
```

OStringParser agora obtém o estado doStringNodeopção de decodificação por
meio da nova classe:

```java
public class StringParser... 
    ... 
    public Node find(...) { 
        NodeFactory nodeFactory = new NodeFactory(); 
        return nodeFactory.createStringNode( textBuffer, textBegin, textEnd, parser. getStringNodeParsingOption().shouldDecodeStringNodes() ); 
    }
```

(b). Agora eu aplicoClasse Inline[F ] fundirNodeFactorycom
StringNodeParsing-Option. Isso leva às seguintes alterações
StringParser:

```java
public class StringParser... 
    public Node find(...) {
        ... 
        return parser.getStringNodeParsingOption().createStringNode( textBuffer, textBegin, textEnd
        // , parser.getStringNodeParsingOption().shouldDecodeStringNodes() 
        ); 
    }
```

E as seguintes mudançasStringNodeParsingOption:

```java
public class StringNodeParsingOption... 
    private boolean decodeStringNodes; 
    public Node createStringNode( StringBuffer textBuffer, int textBegin, int textEnd , 
    // boolean shouldDecode 
    ) { 
        if (decodeStringNodes) 
            return new DecodingStringNode( new StringNode(textBuffer, textBegin, textEnd)); 
        
        return new StringNode(textBuffer, textBegin, textEnd); 
    }
```

(c).A etapa final é renomear a classeStringNodeParsingOptionpara NodeFactorye, em
seguida, execute uma renomeação semelhante noNodeFactorycampo, getter e
setter emanalisador:

```java
// public class StringNodeParsingOption...
public class NodeFactory ...

public class Parser... 
    private NodeFactory nodeFactory = new NodeFactory(); 
    public NodeFactory getNodeFactory() { 
        return nodeFactory; 
    } 
    public void setNodeFactory(NodeFactory nodeFactory) { 
        this.nodeFactory = nodeFactory; 
    }
```

E isso faz.NodeFactoryajudou a domar a expansão da criação lidando com o trabalho
associado à instanciação e configuraçãoStringNodeobjetos.

## Encapsulate Classes with Factory

### O que é

**Se**

Clients directly instantiate classes that reside in one package and implement a common interface.

**Refatore para:**

Make the class constructors non-public and let clients create instances of them using a Factory.

**Descrição do capítulo**

### Resumo

### Schema

06-03-encapsulate-with-factory-02.jpg

### Motivação

A capacidade de um cliente de instanciar classes diretamente é útil desde que o cliente precise saber sobre a própria existência dessas classes. Mas e se o cliente não precisar desse conhecimento? E se as classes residirem em um pacote e implementarem uma interface, e essas condições provavelmente não mudarem? Nesse caso, as classes do pacote podem ser ocultadas dos clientes fora do pacote, atribuindo a uma Fábrica a responsabilidade de criar e retornar instâncias que implementam uma interface comum.

Existem várias motivações para fazer isso. Primeiro, ele fornece uma maneira de aplicar rigorosamente o mantra “programa para uma interface, não uma implementação” [DP], garantindo que os clientes interajam com as classes por meio de sua interface comum. Em segundo lugar, ele fornece uma maneira de reduzir o “peso conceitual” [Bloch] de um pacote ocultando classes que não precisam ser publicamente visíveis fora de seu pacote (ou seja, os clientes não precisam saber que essas classes existem). E, terceiro, simplifica a construção de *tipos* de instâncias disponíveis, tornando o conjunto disponível por meio dos Métodos de Criação reveladores de intenção de uma Fábrica.

O maior problema com essa refatoração envolve um ciclo de dependência: sempre que você criar uma nova subclasse ou adicionar/modificar um construtor de subclasse existente, você deve adicionar um novo método de criação à sua fábrica. Se você não costuma adicionar novas subclasses ou adicionar/modificar construtores a subclasses existentes, isso não é um problema. Se o fizer, talvez você queira evitar essa refatoração ou transição para um design que permite que os clientes instanciem diretamente quaisquer subclasses que desejarem. Você também pode considerar uma abordagem híbrida na qual produz uma fábrica para os tipos de instâncias mais populares e não encapsula totalmente todas as subclasses para que os clientes possam instanciar as classes conforme necessário.

Os programadores que disponibilizam seu código para outros como código binário, não como código-fonte, também podem querer evitar essa refatoração porque ela não fornece aos clientes a capacidade de modificar classes encapsuladas ou os métodos de criação da fábrica.

Essa refatoração pode produzir uma classe que se comporta tanto como uma fábrica quanto como uma classe de implementação (ou seja, implementando métodos não baseados em criação). Alguns se sentem confortáveis com essa mistura, enquanto outros não. Se você achar que tais misturas obscurecem a responsabilidade primária de uma classe, considere *Extract Factory (66)* .

O esboço no início desta refatoração dá a você um vislumbre de algum código de mapeamento de banco de dados objeto para relacional. Antes da refatoração ser aplicada, os programadores (inclusive eu) ocasionalmente instanciavam a subclasse errada ou a subclasse correta com argumentos incorretos (por exemplo, chamamos um construtor que recebeu um Java int primitivo quando realmente precisávamos chamar o construtor que recebeu o objeto Integer do Java) . A refatoração reduziu nossa contagem de defeitos encapsulando o conhecimento sobre as subclasses e produzindo um único local para obter uma variedade de instâncias de subclasses bem nomeadas.

### Prós e Contras

**Prós:**

\+ Simplifica a criação de tipos de instâncias ao disponibilizar o conjunto por meio de métodos reveladores de intenção.

\+ Reduz o “peso conceitual” [Bloch] de um pacote ocultando classes que não precisam ser públicas.

\+ Ajuda a reforçar o mantra “programar para uma interface, não uma implementação” [DP].

**Contras:**

– Requer Métodos de Criação novos/atualizados quando novos tipos de instâncias devem ser criados.

– Limita a personalização quando os clientes só podem acessar o código binário de uma fábrica, não seu código-fonte.

### Mecânica da Refatoração

Em geral, você desejará aplicar essa refatoração quando suas classes compartilharem uma interface pública comum, compartilharem a mesma superclasse e residirem no mesmo pacote.

1. Encontre um cliente que chame o construtor de uma classe para criar um tipo de instância. Aplique *Extract Method* [F] na chamada do construtor para produzir um método estático público. Este novo método é um *método de criação* . Agora aplique *Move Method* [F] para mover o método de criação para a superclasse da classe com o construtor escolhido.
2. → Compilar e testar.

3. Encontre todos os chamadores do construtor escolhido que instanciam o mesmo tipo de instância que o método de criação e atualize-os para chamar o método de criação.
4. → Compilar e testar.

5. Repita as etapas 1 e 2 para quaisquer outros tipos de instâncias que possam ser criadas pelo construtor da classe.
6. Declare o construtor da classe como não público.
7. → Compilar.

8. Repita as etapas 1 a 4 para todas as classes que deseja encapsular.

### Exemplo

O exemplo a seguir é baseado no código de mapeamento objeto-para-relacional usado para gravar e ler objetos de e para um banco de dados relacional.

1. Começo com uma pequena hierarquia de classes que residem em um pacote chamado descritores. Essas classes auxiliam no mapeamento de atributos do banco de dados para as variáveis de instância dos objetos:

2. ```java
   package descriptors;
      
   public abstract class AttributeDescriptor...
      protected AttributeDescriptor(...)
      
   public class BooleanDescriptor extends AttributeDescriptor...
      public BooleanDescriptor(...) {
         super(...);
      }
      
   public class DefaultDescriptor extends AttributeDescriptor...
      public DefaultDescriptor(...) {
         super(...);
      }
      
   public class ReferenceDescriptor extends AttributeDescriptor...
      public ReferenceDescriptor(...) {
         super(...);
      }
   
   ```

3. O construtor AttributeDescriptor abstrato é protegido e os construtores das três subclasses são públicos. Enquanto estou mostrando apenas três subclasses de AttributeDescriptor, na verdade existem cerca de dez no código real.

4. Vou me concentrar na subclasse DefaultDescriptor. A primeira etapa é identificar um tipo de instância que pode ser criada pelo construtor DefaultDescriptor. Para fazer isso, eu olho para algum código de cliente:

5. ```java
   protected List createAttributeDescriptors() {
      List result = new ArrayList();
      result.add(new DefaultDescriptor("remoteId", getClass(), Integer.TYPE));
      result.add(new DefaultDescriptor("createdDate", getClass(), Date.class));
      result.add(new DefaultDescriptor("lastChangedDate", getClass(), Date.class));
      result.add(new ReferenceDescriptor("createdBy", getClass(), User.class, 
         RemoteUser.class));
      result.add(new ReferenceDescriptor("lastChangedBy", getClass(), User.class,
         RemoteUser.class));
      result.add(new DefaultDescriptor("optimisticLockVersion", getClass(), Integer.TYPE));
      return result;
   }
   ```

6. Aqui vejo que DefaultDescriptor está sendo usado para representar mapeamentos para os tipos Integer e Date. Embora também possa ser usado para mapear outros tipos, devo me concentrar em um tipo de instância por vez. Decido produzir um método de criação que criará descritores de atributos para tipos inteiros. Começo aplicando *Extract Method* [F] para produzir um método de criação público e estático chamado forInteger(ﾉ):

7. ```java
   protected List createAttributeDescriptors()...
      List result = new ArrayList();
      result.add(forInteger("remoteId", getClass(), Integer.TYPE)); 
      ...
      
   public static DefaultDescriptor forInteger(...) {
      return new DefaultDescriptor(...);
   }
   ```

8. Como forInteger(ﾉ) sempre cria objetos AttributeDescriptor para um Integer, não há necessidade de passar a ele o valor Integer.TYPE:

9. ```java
   protected List createAttributeDescriptors()...
      List result = new ArrayList();
      result.add(forInteger("remoteId", getClass(), Integer.TYPE)); 
      ...
      
   public static DefaultDescriptor forInteger(...) {
      return new DefaultDescriptor(..., Integer.TYPE);
   }
   ```

10. Também altero o tipo de retorno do método forInteger(ﾉ) de DefaultDescriptor para AttributeDescriptor porque desejo que os clientes interajam com todas as subclasses de AttributeDescriptor por meio da interface AttributeDescriptor:

11. ```java
    public static AttributeDescriptor //  DefaultDescriptor forInteger(...)...
    ```

12. Agora eu movo forInteger(ﾉ) para a classe AttributeDescriptor aplicando *Move Method* [F]:

13. ```java
    public abstract class AttributeDescriptor {
        public static AttributeDescriptor forInteger(...) {
            return new DefaultDescriptor(...);
        }
    ```

14. O código do cliente agora se parece com isso:

15. ```java
    protected List createAttributeDescriptors()... 
        List result = new ArrayList();
        result.add(AttributeDescriptor.forInteger(...));
        ...
    ```

16. Eu compilo e testo para confirmar se tudo funciona conforme o esperado.

17. Em seguida, procuro todos os outros chamadores para o construtor DefaultDescriptor que produzem um AttributeDescriptor para um Integer e os atualizo para chamar o novo método de criação:

18. ```java
    protected List createAttributeDescriptors() {
        List result = new ArrayList();
        result.add(AttributeDescriptor.forInteger("remoteId", getClass()));
        ...
        result.add(AttributeDescriptor.forInteger("optimisticLockVersion", getClass()));
        return result;
    }
    ```

19. Eu compilo e testo. Tudo está funcionando.

20. Agora repito as etapas 1 e 2 enquanto continuo a produzir métodos de criação para os demais tipos de instâncias que o construtor DefaultDescriptor pode criar. Isso leva a mais dois métodos de criação:

21. ```java
    public abstract class AttributeDescriptor {
        public static AttributeDescriptor forInteger(...) {
            return new DefaultDescriptor(...);
        }
    
        public static AttributeDescriptor forDate(...) {
            return new DefaultDescriptor(...);
        }
    
        public static AttributeDescriptor forString(...) {
            return new DefaultDescriptor(...);
        }
    }
    ```

22. Agora declaro o construtor DefaultDescriptor protegido:

23. ```java
    public class DefaultDescriptor extends AttributeDescriptor {
        protected DefaultDescriptor(...) {
            super(...);
        }
    ```

24. Eu compilo e tudo corre conforme o planejado.

25. Repito as etapas 1 a 4 para as outras subclasses AttributeDescriptor. Quando terminar, o novo código

26. - Dá acesso às subclasses AttributeDescriptor por meio de sua superclasse.
    - Garante que os clientes obtenham instâncias de subclasse por meio da interface AttributeDescriptor.
    - Impede que os clientes instanciem diretamente as subclasses AttributeDescriptor.
    - Comunica a outros programadores que as subclasses AttributeDescriptor não devem ser públicas. Os clientes interagem com instâncias de subclasses por meio de sua interface comum.

27. ### variações *Encapsulando classes internas*

28. A classe java.util.Collections de Java contém um exemplo notável do que é o encapsulamento de classes com métodos de criação. O autor da classe, Joshua Bloch, precisava fornecer aos programadores uma maneira de tornar coleções, listas, conjuntos e mapas não modificáveis e/ou sincronizados. Ele sabiamente escolheu implementar esse comportamento usando a forma de proteção do padrão Proxy [DP]. No entanto, em vez de criar classes públicas java.util Proxy (para lidar com a sincronização e a impossibilidade de modificá-las) e esperar que os programadores protejam suas próprias coleções, ele definiu os proxies na classe Collections como classes internas não públicas e deu a Collections um conjunto de Creation Métodos dos quais os programadores podem obter os tipos de proxies de que precisam. O esboço na página 87 mostra algumas das classes internas e métodos de criação especificados pela classe Collections.

29. Observe que java.util.Collections contém até mesmo pequenas hierarquias de classes internas, todas as quais não são públicas. Cada classe interna tem um método correspondente que recebe uma coleção, a protege e então retorna a instância protegida, usando um tipo de interface comumente definido (como List ou Set). Essa solução reduziu o número de classes que os programadores precisavam conhecer, ao mesmo tempo em que forneceu a funcionalidade necessária. A classe java.util.Collections também é um exemplo de Factory.

06-03-encapsulate-with-factory-01.jpg

## Introduce Polymorphic Creation with
Factory Method

### O que é

**Se**

Classes in a hierarchy implement a method similarly,
except for an object creation step.

**Refatore para:**

Make a single superclass version of the method that calls
a Factory Method to handle the instantiation.

**Descrição do capítulo**

### Resumo

### Schema

06-04-polimorfism-01.jpg

### Motivação

Para formar um método de criação (consulte *Substituir construtores por métodos de criação, 57* ), uma classe deve implementar um método estático ou não estático que instancia e retorna um objeto. Por outro lado, se você deseja formar um Factory Method [DP], você precisa do seguinte:

- Um tipo (definido por uma interface, classe abstrata ou classe) para identificar o conjunto de classes que os implementadores do Factory Method podem instanciar e retornar
- O conjunto de classes que implementam esse tipo
- Várias classes que implementam o Factory Method, tomando decisões locais sobre qual conjunto de classes instanciar, inicializar e retornar

Embora isso possa parecer uma tarefa difícil, os Factory Methods são mais comuns em programas orientados a objetos porque fornecem uma maneira de tornar a criação de objetos polimórfica.

Na prática, os Factory Methods geralmente são implementados dentro de uma hierarquia de classes, embora possam ser implementados por classes que simplesmente compartilham uma interface comum. É comum para uma classe abstrata declarar um Factory Method e forçar as subclasses a substituí-lo ou fornecer uma implementação padrão do Factory Method e permitir que as subclasses herdem ou substituam essa implementação.

Os Factory Methods geralmente são projetados em classes de estrutura para tornar mais fácil para os programadores estender a funcionalidade de uma estrutura. Tais extensões são comumente implementadas pela subclasse de uma classe de estrutura e substituindo um Factory Method para retornar um objeto específico.

Como a assinatura de um Factory Method deve ser a mesma para todos os implementadores do Factory Method, você pode ser forçado a passar parâmetros desnecessários para alguns implementadores do Factory Method. Por exemplo, se uma subclasse requer um int e um double para criar um objeto, enquanto outra subclasse requer apenas um int para criar um objeto, um Factory Method implementado por ambas as subclasses precisará aceitar um int e um double. Como o double será desnecessário para uma subclasse, olhar o código pode ser um pouco confuso.

Os Factory Methods são frequentemente chamados por Template Methods [DP]. A colaboração desses dois padrões frequentemente evolui para uma hierarquia de classes como resultado da refatoração para livrar a hierarquia de código duplicado. Por exemplo, imagine que você encontra um método em uma superclasse e substituído por uma subclasse ou em várias subclasses, e esse método é implementado de maneira quase idêntica nesses locais, exceto por uma etapa de criação de objeto. Você vê como pode substituir todas as versões desse método por um único Template Method de superclasse, desde que o Template Method possa emitir uma chamada de criação de objeto sem conhecer a classe de objeto que a superclasse e/ou subclasses instanciarão, inicializarão e retornarão. Nenhum padrão é mais adequado para essa tarefa do que o Factory Method.

Usar um Factory Method é mais simples do que chamar new ou chamar um Creation Method? O padrão certamente não é mais simples de implementar. No entanto, o código resultante que usa um Factory Method tende a ser mais simples do que o código que duplica um método em várias classes apenas para executar a criação de objetos personalizados.

### Prós e Contras

**Prós:**

\+ Reduz a duplicação resultante de uma etapa de criação de objeto personalizado.

\+ Comunica efetivamente onde a criação ocorre e como ela pode ser substituída.

\+ Impõe qual tipo uma classe deve implementar para ser usada por um Factory Method.

**Contras:**

Pode exigir que você passe parâmetros desnecessários para alguns implementadores do Factory Method.

### Mecânica da Refatoração

Essa refatoração é mais comumente usada nas seguintes situações:

- Quando subclasses irmãs implementam um método de forma semelhante, exceto para uma etapa de criação de objeto
- Quando uma superclasse e uma subclasse implementam um método de forma semelhante, exceto para uma etapa de criação de objeto

A mecânica apresentada nesta subseção lida com o cenário de subclasses irmãs e pode ser facilmente adaptada para o cenário de superclasse e subclasse. Para efeitos desta mecânica, um método que é implementado de forma semelhante em uma hierarquia, exceto para uma etapa de criação de objeto, será chamado de *método semelhante.*

1. Em uma subclasse que contém um método semelhante, modifique o método para que a criação do objeto personalizado ocorra no que essas etapas chamarão de *método de instanciação.* Normalmente, você fará isso aplicando *Extract Method* [F] no código de criação ou refatorando o código de criação para chamar um método de instanciação extraído anteriormente.
2. Use um nome genérico para o método de instanciação (por exemplo, createBuilder, newProduct) porque o mesmo nome de método precisará ser usado nos métodos semelhantes da subclasse irmã. Faça com que o tipo de retorno para o método de instanciação seja o tipo comum para a lógica de instanciação personalizada nos métodos semelhantes da subclasse irmã.

3. → Compilar e testar.

4. Repita a etapa 1 para o método semelhante nas subclasses irmãs. Isso deve gerar um método de instanciação para cada uma das subclasses do irmão, e a assinatura do método de instanciação deve ser a mesma em todas as subclasses do irmão.
5. → Compilar e testar.

6. Em seguida, modifique a superclasse das subclasses irmãs. Se você não puder modificar essa classe ou preferir não fazê-lo, aplique *Extract Superclass* [F] para produzir uma superclasse que herda da superclasse das subclasses irmãs e faz com que as subclasses irmãs herdem da nova superclasse.
7. O nome do participante para a superclasse das subclasses irmãs é Factory Method: Creator [DP].

8. → Compilar e testar.

9. Aplique *o método de modelo de formulário* [F] no método semelhante *.* Isso envolverá a aplicação *do Método Pull Up* [F]. Ao aplicar essa refatoração, certifique-se de implementar o seguinte conselho, que vem de uma nota na mecânica do *Método Pull Up* [F]:
10. - Se você estiver em uma linguagem fortemente tipada e o [método que deseja obter] chama outro método que está presente em ambas as subclasses, mas não na superclasse, declare um método abstrato na superclasse. [F, 323]

11. Um desses métodos abstratos que você declarará na superclasse será para seu método de instanciação. Tendo declarado esse método abstrato, você terá implementado um *método de fábrica* . Cada uma das subclasses irmãs é agora um Factory Method: ConcreteCreator [DP].

12. → Compilar e testar.

13. Repita as etapas 1 a 4 se tiver métodos semelhantes adicionais nas subclasses irmãs que possam se beneficiar da chamada do método de fábrica criado anteriormente.
14. Se o método de fábrica na maioria dos ConcreteCreators contiver o mesmo código de instanciação, mova esse código para a superclasse transformando a declaração do método de fábrica na superclasse em um método de fábrica concreto que executa o comportamento de instanciação padrão (“caso majoritário”).
15. → Compilar e testar.

### Exemplo

Em um de meus projetos, usei o desenvolvimento orientado a testes para produzir um XMLBuilder — um Builder [DP] que permitia aos clientes produzir XML com facilidade. Então descobri que precisava criar um DOMBuilder, uma classe que se comportaria como o XMLBuilder, só que produziria XML internamente criando um Document Object Model (DOM) e forneceria aos clientes acesso a esse DOM.

Para produzir o DOMBuilder, usei os mesmos testes que já havia escrito para produzir o XMLBuilder. Precisei fazer apenas uma modificação em cada teste: instanciação de um DOMBuilder ao invés de um XMLBuilder:

```
classe pública DOMBuilderTest estende TestCase...
  construtor privado OutputBuilder;
   
  public void testAddAboveRoot() {
   String resultado inválido =
   "<pedidos>" +
     "<ordem>" +
     "</ordem>" +
   "</pedidos>" +
   "<cliente>" +
   "</cliente>";
   construtor = new DOMBuilder("pedidos"); // costumava ser new XMLBuilder("orders")
   builder.addBelow("ordem");
   tentar {
     builder.addAbove("cliente");
     fail("esperando java.lang.RuntimeException");
   } catch (RuntimeException ignorado) {}
  }
```

Um dos principais objetivos de design do DOMBuilder era fazer com que ele e o XMLBuilder compartilhassem o mesmo tipo: OutputBuilder, conforme mostrado no diagrama a seguir.

06-04-polimorfism-02.jpg

Depois de escrever o DOMBuilder-, eu tinha nove métodos de teste que eram quase idênticos no XMLBuilderTest e no DOMBuilderTest. Além disso, o DOMBuilderTest tinha seus próprios testes exclusivos, que testavam o acesso e o conteúdo de um DOM. Não fiquei satisfeito com toda a duplicação do código de teste, porque se eu fizesse uma alteração em um XMLBuilderTest, precisaria fazer a mesma alteração no DOMBuilderTest correspondente. Eu sabia que era hora de refatorar para o Factory Method. Aqui está como eu fiz esse trabalho.

1. O método semelhante que identifico primeiro é o método de teste, testAddAboveRoot(). Eu extraio sua lógica de instanciação em um método de instanciação como este:
2. ```java
   public class DOMBuilderTest extends TestCase...
       private OutputBuilder createBuilder(String rootName) {
           return new DOMBuilder(rootName);
       }
   
       public void testAddAboveRoot() {
           String invalidResult = 
               "<orders>" +
               "<order>" +
               "</order>" +
               "</orders>" +
               "<customer>" +
               "</customer>";
           builder = createBuilder("orders");    // !!
           builder.addBelow("order");
           try {
               builder.addAbove("customer");
               fail("expecting java.lang.RuntimeException");
           }
           catch (RuntimeException ignored) {}
       }
   ```

3. Observe que o tipo de retorno para o novo método createBuilder(ﾉ) é um OutputBuilder. Eu uso esse tipo de retorno porque a subclasse irmã, XMLBuilderTest, precisará definir seu próprio método createBuilder(ﾉ) (na etapa 2) e quero que a assinatura do método de instanciação seja a mesma para ambas as classes.

4. Eu compilo e executo meus testes para garantir que tudo ainda esteja funcionando.

5. Agora repito a etapa 1 para todas as outras subclasses irmãs, que neste caso é apenas XMLBuilderTest:
6. ```
   public class XMLBuilderTest extends TestCase...
       private OutputBuilder createBuilder(String rootName) {
           return new XMLBuilder(rootName);
       }
       public void testAddAboveRoot() {
           String invalidResult = 
               "<orders>" +
               "<order>" +
               "</order>" +
               "</orders>" +
               "<customer>" +
               "</customer>";
           builder = createBuilder("orders"); // !!
           builder.addBelow("order");
           try {
               builder.addAbove("customer");
               fail("expecting java.lang.RuntimeException");
           }
           catch (RuntimeException ignored) {} 
       }
   ```

7. Eu compilo e testo para garantir que os testes ainda funcionem.

8. Agora estou prestes a modificar a superclasse dos meus testes. Mas essa superclasse é TestCase, que faz parte do framework JUnit. Não quero modificar essa superclasse, então aplico *Extract Superclass* [F] para produzir AbstractBuilderTest, uma nova superclasse para minhas classes de teste:
9. ```java
   public class AbstractBuilderTest extends TestCase {
   }
   public class XMLBuilderTest extends AbstractBuilderTest ...
   public class DOMBuilderTest extends AbstractBuilderTest ...
   ```

10. Agora posso aplicar *o método de modelo de formulário (205)* . Como o método semelhante agora é idêntico em XMLBuilderTest e DOMBuilderTest, a mecânica *do método de modelo de formulário* que devo seguir me instrui a usar *o método pull up* [F] em testAddAboveRoot(). Essas mecânicas primeiro me levam a aplicar *Pull Up Field* [F] no campo do construtor:
11. ```java
    public class AbstractBuilderTest extends TestCase {
        protected OutputBuilder builder;
    }
    
    public class XMLBuilderTest extends AbstractBuilderTest {
        private OutputBuilder builder;    // deleted
        ...
    }
        
    
    public class DOMBuilderTest extends AbstractBuilderTest {
        private OutputBuilder builder;    // deleted
        ...
    }
    ```

12. Continuando com a mecânica do *Método Pull Up* [F] para testAddAboveRoot(), agora descobri que devo declarar um método abstrato na superclasse para qualquer método chamado por testAddAboveRoot() e presente no XMLBuilderTest e no DOMBuilderTest. O método, createBuilder(ﾉ), é um desses métodos, então eu puxo uma declaração de método abstrato dele:

13. ```java
    public
    abstract class AbstractBuilderTest extends
    TestCase {
    protected OutputBuilder builder;protected abstract OutputBuilder
    createBuilder(String rootName);
    }
    ```

14. Agora posso continuar puxando testAddAboveRoot() para AbstractBuilderTest:

15. ```java
    public abstract class AbstractBuilderTest extends TestCase...
    public void testAddAboveRoot() {
        String invalidResult = 
            "<orders>" +
            "<order>" +
            "</order>" +
            "</orders>" +
            "<customer>" +
            "</customer>";
        builder = createBuilder("orders");
        builder.addBelow("order");
        try {
            builder.addAbove("customer");
            fail("expecting java.lang.RuntimeException");
        }
        catch (RuntimeException ignored) {}
    }
    ```

16. Essa etapa removeu testAddAboveRoot() de XMLBuilderTest e DOMBuilderTest. O método createBuilder(ﾉ), que agora é declarado em AbstractBuilderTest e implementado em XMLBuilderTest e DOMBuilderTest, agora implementa o padrão Factory Method [DP].

17. Como sempre, compilo e testo meus testes para garantir que ainda funcionem.

18. Como existem métodos semelhantes adicionais entre XMLBuilderTest e DOMBuilderTest, repito as etapas 1 a 4 para cada método semelhante.
19. Neste ponto, considero criar uma implementação padrão de createBuilder(ﾉ) em AbstractBuilderTest. Eu só faria isso se ajudasse a reduzir a duplicação nas várias implementações de subclasse de createBuilder(ﾉ). Nesse caso, não tenho essa necessidade porque XMLBuilderTest e DOMBuilderTest instanciam cada um seu próprio tipo de OutputBuilder. Isso me leva ao fim da refatoração.

## Encapsulate Composite with Builder

### O que é

**Se**

Building a Composite is repetitive, complicated, or error-prone.

**Refatore para:**

Simplify the build by letting a Builder handle the details.

**Descrição do capítulo**

### Resumo

### Schema

### Motivação

Um construtor [DP ] executa etapas de construção onerosas ou complicadas
em nome de um cliente. Uma motivação comum para refatorar para um
Builder é simplificar o código do cliente que cria objetos complexos. Quando
partes difíceis ou tediosas da criação são implementadas por um Construtor,
um cliente pode direcionar o trabalho de criação do Construtor sem precisar
saber como esse trabalho é realizado.

Os construtores geralmente encapsulam Composites [DP ] porque a
construção de Composites pode frequentemente ser repetitiva,
complicada ou propensa a erros. Por exemplo, para adicionar um nó
filho a um nó pai, um cliente deve fazer o seguinte:

+ Instanciar um novo nó
+ Inicialize o novo nó
+ Adicione corretamente o novo nó ao nó pai correto

Este processo é propenso a erros porque você pode esquecer de
adicionar um novo nó a um pai ou pode adicionar o novo nó ao pai
errado. O processo é repetitivo porque requer a execução do
mesmo lote de etapas de construção repetidas vezes. Vale a pena
refatorar para qualquer Builder que possa reduzir erros ou
minimizar e simplificar as etapas de criação.

Outra motivação para encapsular um Composite com um Builder é
desacoplar o código do cliente do código Composite. Por exemplo,
no código do cliente mostrado no diagrama a seguir, observe como
a criação do DOM Composite,pedidoTag, é
fortemente acoplado ao DOMDocumento,DocumentImpl,
Elemento, eTextointerfaces e classes.

IMG

Esse acoplamento rígido dificulta a alteração das implementações
compostas. Em um projeto, precisávamos atualizar nosso sistema para
usar uma versão mais recente do DOM, que apresentava várias diferenças
em relação à versão DOM 1.0 que estávamos usando. Essa atualização
dolorosa envolveu a alteração de muitas linhas de código de construção
composta que estavam espalhadas pelo sistema. Como parte da
atualização, encapsulamos o novo código DOM em umConstrutor de DOM
, como mostrado no diagrama em
a página seguinte.

IMG

Todos os métodos emConstrutor de DOMaceita strings como
argumentos e retorna void. Não há menção de interfaces DOM ou
classes emConstrutor de DOMinterface do, aindaConstrutor de DOMmonta internamente objetos DOM em tempo de execução.
Código do cliente que usa umConstrutor de DOMé vagamente acoplado ao
código DOM. Isso é bom, para quando versões futuras do DOM forem lançadas
ou quando decidirmos usar o JDOM ou o nosso próprio TagNodeobjetos,
podemos facilmente produzir novos Builders que apresentam a interface
idêntica comoConstrutor de DOM. Ter uma interface genérica do Builder
também nos permite configurar nosso sistema para usar qualquer
implementação do Builder necessária em um determinado contexto.

Os autores dePadrões de designdescrevem a intenção do padrão
Builder da seguinte forma: "Separar a construção de um objeto
complexo de sua representação interna para que o mesmo
processo de construção possa criar diferentes representações" [
DP , 97].

Embora "criar diferentes representações" de um objeto complexo seja um
serviço útil, não é o único serviço que um Construtor oferece. Conforme
mencionado anteriormente, simplificar a construção ou desacoplar o código
do cliente de um objeto complexo também são boas razões para usar um
Builder.

A interface de um Construtor deve revelar suas intenções tão claramente que
qualquer um que olhar para ela saberá instantaneamente o que ela faz. Na
prática, a interface de um Builder, ou parte dela, pode não ser tão clara
porque os Builders trabalham muito nos bastidores para simplificar a
construção. Isso significa que você pode precisar examinar a implementação
de um Construtor ou ler seu código de teste ou documentação para entender
completamente os recursos que ele fornece.

### Prós e Contras

**Prós:**

+ Simplifica o código de um cliente para construir um
Composite.
+ Reduz a natureza repetitiva e propensa a erros da
criação composta.
+ Cria um acoplamento frouxo entre o cliente e o
composto.
+ Permite diferentes representações do objeto
composto ou complexo encapsulado.

**Contras:**

+ Pode não ter a interface mais reveladora de intenções.

### Mecânica da Refatoração

Como existem inúmeras maneiras de escrever um Builder que cria um
Composite, não pode haver um conjunto de mecânicas para essa
refatoração. Em vez disso, oferecerei etapas gerais que você podeimplemente como achar melhor. Qualquer que seja o design que você escolher para
o seu Builder, sugiro que você use o desenvolvimento orientado a testes [Beck, TDD ]
para produzi-lo.

A mecânica a seguir pressupõe que você já tenha o código
Compositeconstruction e gostaria de encapsular esse código com
um Builder.

1 - Criar umaconstrutor, uma nova classe que se tornará um Builder [
DP ] até o final desta refatoração. Torne possível para o seu
construtor produzir um nó composto [DP ]. Adicione um método ao
construtor para obter o resultado de sua construção.

Compilar e testar.

2 - Tornar o construtor capaz de construir crianças. Isso geralmente
envolve a criação de vários métodos para permitir que os clientes
direcionem facilmente a criação e o posicionamento das crianças.

Compilar e testar.

3 - Se o código de construção composta que você está substituindo
definir atributos ou valores em nós, torne o construtor capaz de
configurar esses atributos e valores.

Compilar e testar.

4 - Reflita sobre a simplicidade de uso do seu construtor para os clientes e, em
seguida, torne-o mais simples.

5 - Refatore seu código de construção composta para usar o novo
construtor. Isso envolve tornar seu código de cliente o que é conhecido
emPadrões de designcomo Construtora: Cliente e Construtora:Diretor.

Compilar e testar.

### Exemplo

O Composite que eu gostaria de encapsular com um Builder é chamado
TagNode. Esta classe é apresentada na refatoraçãoSubstituir
Árvore Implícita com Composto (178).TagNodefacilita a criação de XML.
Ele desempenha todas as três funções compostas porque o TagNodeclass
é um componente, que pode ser uma folha ou um composto em tempo
de execução, conforme mostrado no diagrama a seguir.

IMG

TagNodedepara sequenciar()O método gera uma representação XML
de todosTagNodeobjetos que contém. A TagBuildervai encapsular
TagNode, oferecendo aos clientes uma maneira menos repetitiva e
propensa a erros de criar um composto de TagNodeobjetos.

1.Meu primeiro passo é criar um construtor que possa construir
um nó com sucesso. Neste caso, eu quero criar um TagBuilder
que produz o XML correto para uma árvore
contendo um únicoTagNode. Eu começo escrevendo uma falhateste que usaassertXmlEquals, um método que escrevi para
comparar duas partes de XML:

```java
public class TagBuilderTest...
  public void testBuildOneNode() {
    String expectedXml =
      "<flavors/>";
    String actualXml = new TagBuilder("flavors").toXml();
    assertXmlEquals(expectedXml, actualXml);
  }
```

Passar nesse teste é fácil. Aqui está o código que escrevo:

```java
public class TagBuilder {
  private TagNode rootNode;
  
  public TagBuilder(String rootTagName) {
    rootNode = new TagNode(rootTagName);
  }
  
  public String toXml() {
    return rootNode.toString();
  }
}
```

O compilador e o código de teste estão satisfeitos com este novo código.

2.Agora eu vou fazerTagBuildercapaz de lidar com crianças.
Quero lidar com vários cenários, cada um dos quais me leva
a escrever umaTagBuildermétodo.

Começo com o cenário de adicionar um filho a um nó
raiz. Porque eu queroTagBuilderpara criar um nó filho
e posicioná-lo corretamente dentro do Composite
encapsulado, decido produzir um método para fazer
exatamente isso, chamadoaddChild(). O teste a seguir usa isso
método:

```java
public class TagBuilderTest...
  public void testBuildOneChild() {
    String expectedXml = 
      "<flavors>"+
        "<flavor/>" +
      "</flavors>";
   
    TagBuilder builder = new TagBuilder("flavors");
    builder.addChild("flavor");
    String actualXml = builder.toXml();
   
    assertXmlEquals(expectedXml, actualXml);
  }
```

Aqui estão as alterações que faço para passar neste teste:

```java
public class TagBuilder {
  private TagNode rootNode;
  private TagNode currentNode;
  
  public TagBuilder(String rootTagName) {
    rootNode = new TagNode(rootTagName);
    currentNode = rootNode;
  }
```

.

```java
public void addChild(String childTagName) {
    TagNode parentNode = currentNode;
    currentNode = new TagNode(childTagName);
    parentNode.add(currentNode);
  }

  public String toXml() {
    return rootNode.toString();
  }
} 
```

Essa foi fácil. Para testar totalmente se o novo código funciona, faço um
teste ainda mais difícil e vejo se ele é executado com sucesso:

```java
public class TagBuilderTest...
  public void testBuildChildrenOfChildren() {
    String expectedXml = 
      "<flavors>"+
        "<flavor>" +
          "<requirements>" +
            "<requirement/>" +
          "</requirements>" +
        "</flavor>" + 
      "</flavors>";
   
    TagBuilder builder = new TagBuilder("flavors");
    builder.addChild("flavor");
      builder.addChild("requirements");
        builder.addChild("requirement");
    String actualXml = builder.toXml();
   
    assertXmlEquals(expectedXml, actualXml);
  }
```

O código também passa neste teste. Agora é hora de lidar com outro
cenário - adicionar um irmão. Mais uma vez, escrevo um teste com falha:

```java
public class TagBuilderTest...
  public void testBuildSibling() {
    String expectedXml = 
      "<flavors>"+
        "<flavor1/>" +
        "<flavor2/>" +
      "</flavors>";
   
    TagBuilder builder = new TagBuilder("flavors");
    builder.addChild("flavor1");
    builder.addSibling("flavor2");
    String actualXml = builder.toXml();
   
    assertXmlEquals(expectedXml, actualXml);
  }
```

Acrescentar um irmão para um filho existente implica que há
uma maneira deTagBuildersaber quem é o pai comum
para a criança e seu novo irmão. Atualmente não há como
saber isso, pois cadaTagNodeinstância não armazena um
referência ao seu pai. Portanto, escrevo o seguinte teste com falha para
orientar a criação desse comportamento necessário:

```java
public class TagNodeTest...
  public void testParents() {
    TagNode root = new TagNode("root");
    assertNull(root.getParent());
   
    TagNode childNode = new TagNode("child");
    root.add(childNode);
    assertEquals(root, childNode.getParent());
    assertEquals("root", childNode.getParent().getName());
  }
```

Para passar neste teste, adiciono o seguinte código aTagNode:

```java
public class TagNode...
  private TagNode parent;
  
  public void add(TagNode childNode) {
    childNode.setParent(this);
    children().add(childNode);
  }
   
  private void setParent(TagNode parent) {
    this.parent = parent;
  }
   
  public TagNode getParent() {
    return parent;
  }
```

Com a nova funcionalidade implementada, posso me concentrar novamente
em escrever código para passar otestBuildSibling()teste, listado
mais cedo. Aqui está o novo código que escrevo:

```java
public class TagBuilder...
  public void addChild(String childTagName) {
    addTo(currentNode, childTagName);
  }
   
  public void addSibling(String siblingTagName) {
    addTo(currentNode.getParent(), siblingTagName);
  }
  
  private void addTo(TagNode parentNode, String tagName) {
    currentNode = new TagNode(tagName);
    parentNode.add(currentNode);
  }
```

Mais uma vez, o compilador e os testes estão satisfeitos com o novo
código. Escrevo testes adicionais para confirmar que o comportamento
de irmãos e filhos funciona sob várias condições.

Agora preciso lidar com um cenário final de construção de uma criança:
o caso em queaddChild()ouadicionarirmão()não vai funcionar
porque um filho deve ser adicionado a um pai específico. O
teste abaixo indica o problema:

```java
public class TagBuilderTest...
  public void testRepeatingChildrenAndGrandchildren() {
    String expectedXml = 
      "<flavors>"+
        "<flavor>" +
          "<requirements>" +
            "<requirement/>" +
          "</requirements>" +
        "</flavor>" + 
        "<flavor>" +
          "<requirements>" +
            "<requirement/>" +
          "</requirements>" +
        "</flavor>" +
      "</flavors>";
   
    TagBuilder builder = new TagBuilder("flavors");
    for (int i=0; i<2; i++) {
      builder.addChild("flavor");
        builder.addChild("requirements");
          builder.addChild("requirement");
    }
   
    assertXmlEquals(expectedXml, builder.toString());
  }
```

O teste anterior não passará porque não cria o que é
esperado. Quando o loop é executado pela segunda vez, a
chamada para oconstrutordeaddChild()método pega
onde parou, o que significa que adiciona um filho ao último nó
adicionado, o que produz o seguinte resultado incorreto:

```java
<flavors>
  <flavor>
    <requirements>
      <requirement/>
        <flavor> →   Error: misplaced tags
          <requirements>
            <requirement/>
          </requirements>
        </flavor>
    </requirements>
  </flavor>
<flavors>
```

Para corrigir esse problema, altero o teste para referir-se a um método quechamaraddToParent(), que permite que um cliente adicione um novo
nó a um pai específico:

```java
public class TagBuilderTest...
  public void testRepeatingChildrenAndGrandchildren()...
    ...
    TagBuilder builder = new TagBuilder("flavors");
    for (int i=0; i<2; i++) {
      builder.addToParent("flavors", "flavor");
        builder.addChild("requirements");
          builder.addChild("requirement");
    }
    assertXmlEquals(expectedXml, builder.toXml());
```

Este teste não será compilado ou executado até que eu
implemente addToParent(). A ideia por trásaddToParent()é
que vai pedir oTagBuilderdecurrentNodese seu nome corresponder
ao nome pai fornecido (passado por meio de um parâmetro). Se o
nome corresponder, o método adicionará um novo nó filho a
currentNode, ou se o nome não corresponder, o método solicitará
currentNodepai de e continue o processo até que uma
correspondência seja encontrada ou um pai nulo seja encontrado. O
nome do padrão para esse comportamento é Cadeia de
Responsabilidade [DP ].

Para implementar a Cadeia de Responsabilidade, escrevo
o seguinte novo código emTagBuilder:

```java
public class TagBuilder...
  public void addToParent(String parentTagName, String childTagName) {
    addTo(findParentBy(parentTagName), childTagName);
  }
  
  private void addTo(TagNode parentNode, String tagName) {
    currentNode = new TagNode(tagName);
    parentNode.add(currentNode);
  }
  
  private TagNode findParentBy(String parentName) {
    TagNode parentNode = currentNode;
    while (parentNode != null) {
      if (parentName.equals(parentNode.getName()))
        return parentNode;
      parentNode = parentNode.getParent();
    }
    return null;
  }
```

O teste passa. Antes de seguir em frente, eu quero
addToParent()para lidar com o caso em que o nome
fornecido para um nó pai não existe. Então eu escrevo o
seguinte teste:

```java
public class TagBuilderTest...
  public void testParentNameNotFound() {
    TagBuilder builder = new TagBuilder("flavors");
    try {
      for (int i=0; i<2; i++) {
        builder.addToParent("favors", "flavor");   should be "flavors" not "favors"
        builder.addChild("requirements");
        builder.addChild("requirement");
      }
      fail("should not allow adding to parent that doesn't exist.");
    } catch (RuntimeException runtimeException) {
      String expectedErrorMessage = "missing parent tag: favors";
      assertEquals(expectedErrorMessage, runtimeException.getMessage());
    }
  }
```

Eu faço este teste passar fazendo as seguintes modificações
paraTagBuilder:

```java
public class TagBuilder...
  public void addToParent(String parentTagName, String childTagName) {
    TagNode parentNode = findParentBy(parentTagName);
    if (parentNode == null)
      throw new RuntimeException("missing parent tag: " + parentTagName); 
    addTo(parentNode, childTagName);
  }
```

3.Agora eu façoTagBuildercapaz de adicionar atributos e
valores aos nós. Este é um passo fácil porque o
encapsuladoTagNodejá manipula atributos e valores.
Aqui está um teste que verifica se os atributos e valores
são tratados corretamente:

```java
public class TagBuilderTest...
  public void testAttributesAndValues() {
    String expectedXml = 
      "<flavor name='Test-Driven Development'>" +  ←    tag with attribute
        "<requirements>" +
          "<requirement type='hardware'>" +
              "1 computer for every 2 participants" +   ← tag with value
            "</requirement>" +
          "<requirement type='software'>" +
              "IDE" +
          "</requirement>" +
        "</requirements>" +
      "</flavor>";

    TagBuilder builder = new TagBuilder("flavor");
    builder.addAttribute("name", "Test-Driven Development");
      builder.addChild("requirements");
        builder.addToParent("requirements", "requirement");
        builder.addAttribute("type", "hardware");
        builder.addValue("1 computer for every 2 participants");
        builder.addToParent("requirements", "requirement");
        builder.addAttribute("type", "software");
        builder.addValue("IDE");
   
    assertXmlEquals(expectedXml, builder.toXml());
  }
```

Os novos métodos a seguir fazem o teste passar:

```java
public class TagBuilder...
  public void addAttribute(String name, String value) {
    currentNode.addAttribute(name, value);
  }
  
  public void addValue(String value) {
    currentNode.addValue(value);
  }
```

4 - Agora é hora de refletir sobre como simplesTagBuilderé e como é fácil
para os clientes usarem. Existe uma maneira mais simples de produzir
XML? Este não é o tipo de pergunta que você normalmente pode
responder imediatamente. Experimentos e horas, dias ou semanas de
reflexão às vezes podem render uma ideia mais simples. Discutirei uma
implementação mais simples na seção Variações abaixo. Por enquanto,
passo para a última etapa.

5 - Concluo a refatoração substituindo o código
Compositeconstruction pelo código que usa oTagBuilder.
Não conheço nenhuma maneira fácil de fazer isso; O código de construção
composta pode abranger grandes partes de um sistema. Esperamos que
você tenha um código de teste para detectá-lo se cometer algum erro
durante a transformação. Aqui está um método em uma classe chamada
Escritor de Catálogoque deve ser alterado de
usandoTagNodepara usarTagBuilder:

```java
public class CatalogWriter...
  public String catalogXmlFor(Activity activity) {
    TagNode activityTag = new TagNode("activity");
    ...
    TagNode flavorsTag = new TagNode("flavors");
    activityTag.add(flavorsTag);
    for (int i=0; i < activity.getFlavorCount(); i++) {
      TagNode flavorTag = new TagNode("flavor");
      flavorsTag.add(flavorTag);
      Flavor flavor = activity.getFlavor(i);
      ...
      int requirementsCount = flavor.getRequirements().length;
      if (requirementsCount > 0) {
        TagNode requirementsTag = new TagNode("requirements");
        flavorTag.add(requirementsTag);
        for (int r=0; r < requirementsCount; r++) {
          Requirement requirement = flavor.getRequirements()[r];
          TagNode requirementTag = new TagNode("requirement");
          ...
          requirementsTag.add(requirementTag); 
        }
      }
    }
    return activityTag.toString();
  }
```

Este código funciona com os objetos de domínioAtividade,
Sabor, eRequerimento, conforme mostrado no diagrama a
seguir.



Você pode se perguntar por que esse código cria um composto de
TagNodeobjetos apenas para renderizarAtividadedados em XML,
em vez de simplesmente perguntarAtividade,Sabor, e
Requerimentoinstâncias se renderizem em XML por meio de
seus própriostoXml()método. Essa é uma boa pergunta a ser
feita, pois se os objetos de domínio já formam uma estrutura
Composite, pode não fazer sentido formar outra estrutura
Composite, comoActivityTag, apenas para renderizar os objetos
de domínio em XML. Nesse caso, no entanto, produzir o XML
externamente a partir dos objetos de domínio faz sentido
porque o sistema que usa esses objetos de domínio deve
produzir várias representações XML deles, todas bastante
diferentes. um únicotoXml()método para cada objeto de
domínio não funcionaria bem aqui - cada implementação do
método precisaria produzir muitas representações XML
diferentes do objeto de domínio.

Depois de transformar ocatalogXmlFor(...)método para usar
umTagBuilder, Se parece com isso:

```java
public class CatalogWriter...
  private String catalogXmlFor(Activity activity) {
    TagBuilder builder = new TagBuilder("activity");
    ...
    builder.addChild("flavors");
    for (int i=0; i < activity.getFlavorCount(); i++) {
      builder.addToParent("flavors", "flavor");
      Flavor flavor = activity.getFlavor(i);
      ...
      int requirementsCount = flavor.getRequirements().length;
      if (requirementsCount > 0) {
        builder.addChild("requirements");
        for (int r=0; r < requirementsCount; r++) {
          Requirement requirement = flavor.getRequirements()[r];
          builder.addToParent("requirements", "requirement");
          ...
        }
      }
    }
    return builder.toXml();
  }
   
```

E isso basta para esta refatoração!TagNodeagora está
totalmente encapsulado porTagBuilder.



### Melhorando um Construtor

Não resisti em falar sobre uma melhoria de desempenho feita
noTagBuilderporque revela a elegância e
simplicidade do padrão Builder. Alguns de meus colegas de uma
empresa chamada Evant criaram alguns perfis de nosso sistema
e descobriram que umStringBufferusado pelo
TagBuilderestá encapsuladoTagNodeestava causandoproblemas de desempenho. EsseStringBufferé usado como um
parâmetro de coleta - é criado e passado para cada nó em um
composto deTagNodeobjetos para produzir os resultados
retornados da chamadaTagNodedetoXml()método. Para ver como
isso funciona, veja o exemplo emMover Acumulação para
Parâmetro de Coleta (313).

OStringBufferque estava sendo usado nesta operação não foi instanciado
com nenhum tamanho específico, o que significava que, à medida que mais e
mais XML era adicionado aoStringBuffer, ele precisava crescer
automaticamente quando não pudesse mais armazenar todos os seus dados.
Isso é bom; oStringBufferclasse é projetada para crescer automaticamente
quando necessário. Mas há uma penalidade de desempenho porque
StringBufferdeve trabalhar para aumentar de forma transparente seu
tamanho e mudar os dados. Essa penalidade de desempenho não era
aceitável no sistema Evant.

A solução estava em saber o tamanho exato doStringBuffer precisa ser
antes de instanciá-lo. Como poderíamos calcular o tamanho apropriado?
Fácil. À medida que cada nó, atributo ou valor é adicionado aoTagBuilder,
ele pode incrementar um tamanho de buffer com base no tamanho do
que está sendo adicionado. O tamanho final do buffer calculado pode
então ser usado para instanciar umStringBuffer que nunca precisa
crescer de tamanho.

Para implementar essa melhoria de desempenho, começamos como de costume
escrevendo um teste com falha. O teste a seguir constrói uma árvore XML
fazendo chamadas para umTagBuilder, então obtém o tamanho de
a string XML resultante retornada pelo construtor e, finalmente, compara
o tamanho dessa string com o tamanho do buffer calculado:

```java
public class TagBuilderTest...
  public void testToStringBufferSize() {
    String expected =
    "<requirements>" +
      "<requirement type='software'>" +
        "IDE" +
      "</requirement>" +
    "</requirements>";
   
    TagBuilder builder = new TagBuilder("requirements");
    builder.addChild("requirement");
    builder.addAttribute("type", "software");
    builder.addValue("IDE");
   
    int stringSize = builder.toXml().length();
    int computedSize = builder.bufferSize();
    assertEquals("buffer size", stringSize, computedSize);
  }
```

Para passar neste teste e em outros semelhantes, alteramosTagBuilderdo seguinte
modo:

```java
public class TagBuilder...
  private int outputBufferSize;
  private static int TAG_CHARS_SIZE = 5;
  private static int ATTRIBUTE_CHARS_SIZE = 4;
   
  public TagBuilder(String rootTagName) {
    ...
    incrementBufferSizeByTagLength(rootTagName);
  }
   
  private void addTo(TagNode parentNode, String tagName) {
    ...
    incrementBufferSizeByTagLength(tagName);
  }
   
  public void addAttribute(String name, String value) {
    ...
    incrementBufferSizeByAttributeLength(name, value);
  }
   
  public void addValue(String value) {
    ...
    incrementBufferSizeByValueLength(value);
  }
   
  public int bufferSize() {
    return outputBufferSize;
  }

  private void incrementBufferSizeByAttributeLength(String name, String value) {
    outputBufferSize += (name.length() + value.length() + ATTRIBUTE_CHARS_SIZE);
  }
   
  private void incrementBufferSizeByTagLength(String tag) {
    int sizeOfOpenAndCloseTags = tag.length() * 2;
    outputBufferSize += (sizeOfOpenAndCloseTags + TAG_CHARS_SIZE);
  }
   
  private void incrementBufferSizeByValueLength(String value) {
    outputBufferSize += value.length();
  }
}   
```

Essas mudanças paraTagBuildersão transparentes para os
usuários de TagBuilderporque encapsula a nova lógica de
desempenho. A única alteração adicional necessária para
TagBuilderdetoXml()método, para que ele pudesse instanciar
um StringBufferdo tamanho correto e passá-lo para a raiz
TagNode, que acumula o conteúdo XML. Para que isso
aconteça, mudamos otoXml()método de

```java
public class TagBuilder...
  public String toXml() {
    return rootNode.toString();
  }
```

ate

```java
public class TagBuilder...
  public String toXml() {
    StringBuffer xmlResult = new StringBuffer(outputBufferSize);
    rootNode.appendContentsTo(xmlResult);
    return xmlResult.toString();
  }
```

Era isso. O teste passou eTagBuildercorreu
significativamente mais rápido.



## Inline Singleton

### O que é

**Se**

**Refatore para:**

**Descrição do capítulo**

### Resumo

### Schema

### Motivação

Singletonite, um termo que criei, significa "vício no padrão Singleton". A
intenção de um Singleton é "garantir que uma classe tenha apenas
uma instância e fornecer um ponto global de acesso a ela"
[DP , 127]. Você está infectado com Singletonitis quando o padrão
Singleton se fixa tão profundamente em seu crânio que começa a
dominar outros padrões e ideias de design mais simples, fazendo com
que você produza muitos Singletons.

Eu me livrei de Singletonitis e agora estou pensando em começar
"Singletons Anonymous", um lugar onde os abusadores de Singleton em
recuperação podem apoiar uns aos outros na lenta jornada de volta ao
uso de objetos simples e não globais. OSingleton embutido a refatoração
é uma etapa útil nessa jornada. Isso ajuda a livrar seus sistemas de
Singletons desnecessários. Isso leva à pergunta óbvia: quando um
singleton é desnecessário?

Resposta curta: Na maioria das vezes.

Resposta longa: Um Singleton é desnecessário quando é mais simples passar
um recurso de objeto como uma referência aos objetos que precisam dele,
em vez de permitir que os objetos acessem o recurso globalmente. Um
Singleton é desnecessário quando é usado para obter melhorias
insignificantes de memória ou desempenho. Um Singleton não é necessário
quando o código profundo em uma camada de um sistema precisa acessar
um recurso, mas o código não pertence a essa camada para começar. Eu
poderia continuar. O ponto é que Singletons não são necessários quando
você pode projetar ou redesenhar para evitar usá-los.

Ao escrever esta refatoração, decidi pedir a Ward Cunningham
e Kent Beck que comentassem sobre o padrão Singleton.

### Ward Cunningham em Singletons

Grande parte do padrão Singleton trata de persuadir os
mecanismos de proteção da linguagem a proteger este único
aspecto: a singularidade. Eu acho que é importante, mas
parece ter crescido fora de proporção.

Existe um contexto apropriado para cada cálculo. Grande
parte da programação orientada a objetos trata de
estabelecer contexto, equilibrar o tempo de vida das
variáveis, fazendo com que vivam o tempo certo e depois
morram normalmente. Não tenho medo de alguns
globais. Eles fornecem o contexto global que todos devem
entender. Não deve haver muitos embora. Muitos me
assustariam.

### Kent Beck em Singletons

O verdadeiro problema com os Singletons é que eles fornecem
uma boa desculpa para não pensar cuidadosamente sobre a
visibilidade apropriada de um objeto. Encontrar o equilíbrio certo
de exposição e proteção para um objeto é fundamental para
manter a flexibilidade.

Massimo Arnoldi e eu já trabalhamos em um sistema que tinha
um Singleton para armazenar taxas de câmbio. Sempre que
escrevíamos um teste que lidava com várias moedas, tínhamos
que nos certificar de salvar as taxas de câmbio antigas,
armazenar algumas novas, executar o teste e restaurar as taxas
de câmbio antigas. Um dia, cansamos dos erros de teste
causados pelo uso de taxas de câmbio erradas.

"Mas as taxas de câmbio são usadas em todo o sistema!" nós
choramingamos. Porém, uma boa ideia é uma boa ideia, por
isso analisamos todos os lugares onde as taxas de câmbio
foram usadas. Adicionamos parâmetros conforme necessário
para passar as taxas de câmbio explicitamente. Achamos que
seria um trabalho enorme, mas levamos apenas meia hora. Às
vezes, era um pouco difícil colocar as taxas de câmbio onde
eram necessárias, mas era óbvio como refatorar para facilitar.
Essas refatorações também resolveram vários problemas
crônicos de design que nos incomodavam, mas não sabíamos
como resolver.

O resultado da meia hora:

+ Design geral mais limpo e flexível
+ testes estáveis
+ Uma profunda sensação de alívio

Martin Fowler também reconhece a necessidade de alguns globais,
embora os use apenas como último recurso. Seu padrão de registro, de
Padrões de Arquitetura de Aplicativo Corporativo, é uma pequena
variação de Singleton. Martin descreve um Registro como "um objeto
conhecido que outros objetos podem usar para encontrar objetos e
serviços comuns" [Fowler, PEAA , 480]. Sobre quando usar esse padrão,
ele escreve:

> Existem alternativas ao uso de umRegistro. Uma delas é passar
> quaisquer dados amplamente necessários em parâmetros. O problema
> com isso é que os parâmetros são adicionados às chamadas de método
> quando não são necessários para o método chamado, mas apenas para
> algum outro método chamado em várias camadas profundas na árvore
> de chamadas. Passar um parâmetro quando não é necessário 90% das
> vezes é o que me leva a usar umRegistroem vez de. . . .



> Portanto, há momentos em que é correto usar umRegistro, mas lembre-
> se de que qualquer dado global é sempre culpado até que se prove o
> contrário. [Fowler, PEAA , 482–483]

Minha leitura bastante atenta dePadrões de design[DP ] me infectou com
Singletonitis. Cada padrão nesse livro contém uma seção de padrões
relacionados e, em muitas dessas seções, você encontrará frases que
mencionam Singleton. Por exemplo, na seção sobre o padrão State, os
autores escrevem, "objetos State são frequentemente Singletons" [DP ,
313], e na seção sobre o padrão Abstract Factory, eles escrevem, "Uma
fábrica concreta é freqüentemente um Singleton" [DP , 95]. Em defesa dos
autores, essas sentenças simplesmente observam que as classes Estado e
Fábrica Abstratamuitas vezessão solteiros. O livro não diz que eles têm que ser. Se houver um bom
motivo para tornar uma classe um Singleton ou Registry, faça-o. A
refatoraçãoInstanciação de Limite com Singleton (296) descreve um
bom motivo para refatorar para um Singleton: melhoria real do
desempenho. Ele também adverte contra a otimização prematura.

Uma coisa é certa: você precisa pensar e explorarmuito difícil antes de
implementar um Singleton. E se você encontrar um Singleton que não
deveria ser um Singleton, com certezacoloque em linha!

### Prós e Contras

**Prós:**

+ Torna as colaborações de objetos mais visíveis e explícitas.
+ Não requer nenhum código especial para proteger uma única instância.

**Contras:**

+ Complica um projeto quando a passagem de uma instância de
  objeto por muitas camadas é desajeitada ou difícil.

### Mecânica da Refatoração

A mecânica desta refatoração é idêntica à doClasse Inline[F ]. Nas etapas
seguintes, umclasse absorventeé aquele que assumirá as
responsabilidades do Singleton embutido.

1 - Declare os métodos públicos do Singleton em sua classe envolvente. Faça com
que os novos métodos sejam delegados de volta ao Singleton e remova
quaisquer designações "estáticas" que possam ter (na classe absorvente).

Se sua classe absorvente for um Singleton, você desejará manter as
designações "estáticas" para os métodos.

2 - Altere todas as referências de código do cliente ao Singleton para referências à
classe absorvente.

Compilar e testar.

3 - Usar Método de movimentação [F] eMover campo[F ] para mover recursos
do Singleton para a classe absorvente até que não haja mais nada.

Como na etapa 1, se sua classe absorvente não for um Singleton, remova
quaisquer designações "estáticas" dos métodos e campos que você mover.

Compilar e testar.

4 - Exclua o Singleton.

### Exemplo

O código para este exemplo vem de uma evolução inicial de um jogo de blackjack
simples baseado em console. O jogo é jogado em um console exibindo as cartas de um
jogador, solicitando repetidamente que um jogador bata ou fique e, em seguida,
exibindo a mão do jogador e a mão do dealer para revelar quem ganhou. O código de
teste pode executar este jogo e simular a entrada do usuário, como bater e
permanecer durante o jogo.

A entrada simulada de um jogador é especificada e obtida em tempo de execução
de um Singleton chamadoConsole, que mantém uma instância de
HitStayResponseou uma de suas subclasses:

```java
public class Console {
    static private HitStayResponse hitStayResponse = new HitStayResponse(); 
    private Console() { super(); } 
    public static HitStayResponse obtainHitStayResponse(BufferedReader input) { 
        hitStayResponse.readFrom(input); 
        return hitStayResponse; 
    } 
    public static void setPlayerResponse(HitStayResponse newHitStayResponse) { 
        hitStayResponse = newHitStayResponse; 
    } 
}
```

Antes de iniciar o jogo, um determinadoHitStayResponseestá registrado
noConsole. Por exemplo, aqui está um código de teste que registra um
TestAlwaysHitResponseinstância com oConsole:

```java
public class ScenarioTest extends TestCase... 
    public void testDealerStandsWhenPlayerBusts() { 
        Console.setPlayerResponse(new TestAlwaysHitResponse()); 
        int[] deck = { 10, 9, 7, 2, 6 }; 
        Blackjack blackjack = new Blackjack(deck); 
        blackjack.play(); 
        assertTrue("dealer wins", blackjack.didDealerWin()); 
        assertTrue("player loses", !blackjack.didPlayerWin()); 
        assertEquals("dealer total", 11, blackjack.getDealerTotal());
        assertEquals("player total", 23, blackjack.getPlayerTotal()); 
    }
```

Ovinte-e-umcódigo que chama oConsolepara obter o registro
HitStayResponseinstância não é um código complicado. Veja como fica:

```java
public class Blackjack {
    // ...
    public void play() { 
        deal(); 
        writeln(player.getHandAsString()); 
        writeln(dealer.getHandAsStringWithFirstCardDown()); 
        HitStayResponse hitStayResponse; 
        do { 
            write("H)it or S)tay: "); 
            hitStayResponse = Console.obtainHitStayResponse(input);
            write(hitStayResponse.toString()); 
            if (hitStayResponse.shouldHit()) {
                dealCardTo(player); 
                writeln(player.getHandAsString()); 
            } 
        } while (canPlayerHit(hitStayResponse)); 
        // ... 
    }
}
```

O código acima não reside em uma camada de aplicativo cercada por outras
camadas de aplicativo, dificultando a passagem de uma HitStayResponse
instância até uma camada que precise dela. Todos os
código para acessar umHitStayResponseinstância vive dentrovinte-e-um em
si. Então por que deveriavinte-e-umtem que passar por umConsoleapenas
para chegar a umHitStayResponse? Não deveria! É mais um Singleton que não
precisa ser um Singleton. Hora de refatorar.

1 - O primeiro passo é declarar os métodos públicos deConsole, o
Singleton, emvinte-e-um, a classe absorvente. Quando faço isso, faço com
que cada método seja delegado de volta aoConsole, e removo a
designação "estática" para cada método:

```java
public class Blackjack {
    public HitStayResponse obtainHitStayResponse(BufferedReader input) { 
        return Console.obtainHitStayResponse(input); 
    } 
    public void setPlayerResponse(HitStayResponse newHitStayResponse) { 
        Console.setPlayerResponse(newHitStayResponse); 
    }
}
```

2 - Agora eu mudo todos os chamadores paraConsolemétodos para serem
chamadores vinte-e-umversões dos métodos. Aqui estão algumas dessas
mudanças:

```java
public class ScenarioTest extends TestCase {
    // ...
    public void testDealerStandsWhenPlayerBusts() { 
        // Console.setPlayerResponse(new TestAlwaysHitResponse()); 
        int[] deck = { 10, 9, 7, 2, 6 }; 
        Blackjack blackjack = new Blackjack(deck); 
        blackjack.setPlayerResponse(new TestAlwaysHitResponse()); 
        blackjack.play(); 
        assertTrue("dealer wins", blackjack.didDealerWin()); 
        assertTrue("player loses", !blackjack.didPlayerWin()); 
        assertEquals("dealer total", 11, blackjack.getDealerTotal()); 
        assertEquals("player total", 23, blackjack.getPlayerTotal()); 
    }
}
```

e

```java
public class Blackjack {
    // ...
    public void play() { 
        deal(); 
        writeln(player.getHandAsString());
        writeln(dealer.getHandAsStringWithFirstCardDown()); 
        HitStayResponse hitStayResponse; 
        do { 
            write("H)it or S)tay: "); 
            hitStayResponse = obtainHitStayResponse(input);
            write(hitStayResponse.toString()); 
            if (hitStayResponse.shouldHit()) { 
                dealCardTo(player); 
                writeln(player.getHandAsString()); 
            } 
        } while (canPlayerHit(hitStayResponse)); 
        // ... 
    }
}
```

Neste ponto eu compilo, executo meus testes automatizados e jogo o jogo no
console para confirmar se tudo está funcionando corretamente.

3 - agora posso aplicar Método de movimentação [F] eMover campo[F ] para obter
todos Consolecaracterísticas devinte-e-um. Quando termino, compilo eteste para ter certeza quevinte-e-umainda funciona.

4 - Agora eu apagoConsolee, como Martin recomenda em seuClasse Inline[F ]
refatoração, eu presto um serviço memorial muito curto, mas comovente para
outro Singleton malfadado.