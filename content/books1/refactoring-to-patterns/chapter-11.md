# Chapter 11. Utilities

As refatorações nesta seção são transformações de baixo nível usadas pelas refatorações de nível superior no catálogo. Essas refatorações se encaixam bem com as refatorações de Martin Fowler.

**Chain Constructors** trata-se de remover a duplicação em construtores fazendo com que eles chamem uns aos outros. Esta refatoração é usada pela refatoração *Replace Constructors with Creation Methods*.

**Unify Interfaces** é útil quando você precisa que uma superclasse e/ou interface compartilhe a mesma interface que uma subclasse. A motivação usual para aplicar esta refatoração é possibilitar o tratamento de objetos polimorficamente. As refatorações *Move Embellishment to Decorator* and *Move Accumulation to Visitor*  fazem uso dessa refatoração.

**Extract Parameter** é útil quando um campo é atribuído a um valor instanciado localmente e você prefere que esse valor seja fornecido por um parâmetro. Embora isso possa ser útil em muitas situações, a refatoração *Move Embellishment to Decorator*  usa essa refatoração logo após a aplicação de *Substituir* *Herança por Delegação* [F].

## Chain Constructors

### O que é

**Se**

You have multiple constructors that contain duplicate code.

**Refatore para:**

Chain the constructors together to obtain the least amount of duplicate code.

### Simplificando em uma imagem

Se eu tenho muitos construtores que parecem fazer as mesmas coisas, com uma pequena diferença entre eles, eu posso encadear eles, para assim evitar ter um monte de construtores com código duplicado e só uma coisinha de diferente. A imagem mostra isso 

### Schema

![](/home/rhavel/Documentos/CREDICOM-2023/php-ultimate-notes/awesome-books/refactoring-to-patterns/asserts/cap11-utilities/11-01-chain-constructors-01.png)

### Motivação

O código duplicado em dois ou mais construtores de uma classe é um convite para problemas. Se alguém adicionar uma nova variável para uma classe e atualiza um construtor para inicializar a variável, mas depois deixa de atualizar os outros construtores— bang, diga olá ao seu próximo defeito. Quanto mais construtores você tiver em uma classe, mais a duplicação irá prejudicá-lo. Portanto, é uma boa ideia reduzir ou remover a duplicação em seus construtores.

Frequentemente realizamos essa refatoração de encadeamento de constructors : construtores específicos chamam mais construtores de uso geral até que um construtor final seja alcançado. Se você tiver um construtor no final de cada cadeia, é um construtor catch-all porque ele lida com todas as chamadas do construtor. Um construtor catch-all geralmente aceita mais parâmetros do que outros construtores.

Se você achar que ter muitos construtores em sua classe prejudica sua usabilidade, considere aplicar *Replace Constructors with Creation Methods*. 

### Prós e Contras

### Mecânica da Refatoração

1 - Encontre dois construtores que contenham código duplicado. Determine se um pode chamar o outro de forma que o código duplicado possa ser excluído com segurança (e, esperançosamente, facilmente) de um desses construtores. Em seguida, faça com que um construtor chame o outro construtor de forma que o código duplicado seja reduzido ou eliminado.

Compilar e testar.

2 - Repita a etapa 1 para todos os construtores da classe, incluindo os que você já tocou, para obter o mínimo possível de duplicação em todos os construtores.

3 - Altere a visibilidade de qualquer construtor que não precise ser público. 

### Exemplo

Para este exemplo, usarei o cenário mostrado no esboço do código no início desta refatoração. Uma única classe `Loan` (Empréstimo) tem três construtores para representar diferentes tipos de empréstimos, bem como toneladas de duplicação inchada e feia:

```java
// 1
public Loan(float notional, float outstanding, int rating, Date expiry) { 
    this.strategy = new TermROC(); 
    this.notional = notional; 
    this.outstanding = outstanding; 
    this.rating = rating; 
    this.expiry = expiry; 
}
// 2
public Loan(float notional, float outstanding, int rating, Date expiry, Date maturity) { 
    this.strategy = new RevolvingTermROC(); 
    this.notional = notional;
    this.outstanding = outstanding; 
    this.rating = rating; 
    this.expiry = expiry; 
    this.maturity = maturity;
}
// 3
public Loan(CapitalStrategy strategy, float notional, float outstanding, int rating, Date expiry, Date maturity) { 
    this.strategy = strategy; 
    this.notional = notional; 
    this.outstanding = outstanding; 
    this.rating = rating; 
    this.expiry = expiry; 
    this.maturity = maturity; 
}
```

Vamos ver o que acontece quando eu refatoro este código.

1 - Eu estudo os dois primeiros construtores. Eles contêm código duplicado, mas também o terceiro construtor. Eu considero qual construtor seria mais fácil para o primeiro construtor chamar. Vejo que poderia chamar o terceiro construtor com um mínimo de trabalho. Então eu mudo o primeiro construtor para ser:

```java
public Loan(float notional, float outstanding, int rating, Date expiry) { 
    this(new TermROC(), notional, outstanding, rating, expiry, null);
}
```

Eu compilo e testo para ver se a alteração funciona.

2 - Repito o passo 1 para remover o máximo de duplicação possível. Isso me leva ao segundo construtor. Parece que ele também pode chamar o terceiro construtor, da seguinte maneira: 

```java
public Loan(float notional, float outstanding, int rating, Date expiry, Date maturity) { 
    this(new RevolvingTermROC(), notional, outstanding, rating, expiry, maturity);
}
```

Agora estou ciente de que o terceiro construtor é o construtor geral da minha classe porque ele lida com todos os detalhes da construção.

3 - Verifico todos os chamadores dos três construtores para determinar se posso alterar a visibilidade pública de algum deles.

Nesse caso não consigo. (Acredite em mim - você não pode ver o código que chama esses métodos).

Eu compilo e testo para completar a refatoração.

## Unify Interfaces

### O que é

**Se**

You need a superclass and/or interface to have the same interface as a subclass.

**Refatore para** 

Find all public methods on the subclass that are missing on the superclass/interface. Add copies of these missing methods to the superclass, altering each one to perform null behavior.

### Resumo

Pelo princípio I do SOLID, eu devo conseguir substituir todos os filhos pelo pai ou pelos irmãos e deve dar tudo certo. Mas se um filho tiver um método que não tem no pai (a exemplo da imagem `accept()`

### Schema

![](/home/rhavel/Documentos/CREDICOM-2023/php-ultimate-notes/awesome-books/refactoring-to-patterns/asserts/cap11-utilities/11-02-unify-intefaces-01.png)

### Motivação

Para processar objetos polimorficamente, as classes dos objetos precisam compartilhar uma interface comum, seja uma superclasse ou uma interface real. **Essa refatoração aborda o caso em que uma** **superclasse ou interface precisa ter a mesma interface que uma** **subclasse.**

Eu me deparei com a necessidade dessa refatoração em duas ocasiões distintas. Uma vez, quando eu estava aplicando Move Embellishment to Decorator, um decorador [DP] emergente precisava da mesma interface que uma subclasse. A maneira mais fácil de fazer isso acontecer era aplicar Unify Interfaces . Da mesma forma, durante uma aplicação da refatoração Move Accumulation to Visitor, o código duplicado pode ser removido se certos objetos compartilharem a mesma interface, o que Unify Interfaces tornou possível.

Depois de aplicar essa refatoração em uma superclasse e subclasse, às vezes aplico Extract Interface[F] na superclasse para produzir uma interface autônoma. Normalmente faço isso quando uma classe base abstrata contém campos de estado e não quero que os implementadores da classe base comum, como um decorador, herdem esses campos. Ver Move Embellishment to Decorator Por exemplo.

Unify Interfaces das muitas vezes é um passo temporário no caminho para outro lugar. Por exemplo, depois de executar essa refatoração, você pode executar uma sequência de refatorações que permite remover métodos adicionados ao unificar suas interfaces. Outras vezes, uma implementação padrão de um método em uma classe base abstrata pode não ser mais necessária após a aplicação Extrair interface [F].


### Mecânica da Refatoração

1 - Encontre um método ausente, um método público na subclasse que não é declarado na superclasse e/ou interface e está na classe filha.

2 - Adicione uma cópia do método ausente à superclasse/interface. Se estiver adicionando o método ausente a uma superclasse, modifique seu corpo para executar o comportamento nulo.

+ Compilar.

Repita até que a superclasse/interface e a subclasse compartilhem a mesma interface.

+ Teste se todo o código relacionado à superclasse funciona conforme o esperado.

### Exemplo

Preciso unificar as interfaces de uma subclasse chamada `StringNode` e sua superclasse, `AbstractNode` (Exemplo da imagem) . `StringNode` herda a maioria de seus métodos públicos de `AbstractNode`, com exceção de um método:

```java
public class StringNode extends AbstractNode {
    // ...
    public void accept(textExtractor: TextExtractor) { 
        // implementation details...
    }
}
```

1 - Eu adiciono uma cópia do método  `accept(...)` para `AbstractNode`, modificando seu corpo para fornecer comportamento nulo:

```java
public abstract class AbstractNode {
    // ...
    public void accept(textExtractor: TextExtractor) {}
}
```

Neste ponto, as interfaces de `AbstractNode` e `StringNode` foram unificados. Eu compilo e testo para garantir que tudo funcione bem. Sim.

## Extract Parameter

### O que é

**Se**

A method or constructor assigns a field to a locally instantiated value.

*Um método ou construtor atribui um campo a um valor instanciado localmente.*

**Refatore para**

Assign the field to a parameter supplied by a client by extracting one-half of the assignment statement to a parameter.

*Atribua o campo a um parâmetro fornecido por um cliente extraindo metade da instrução de atribuição a um parâmetro.*

### Resumindo

Nunca dependa de classe concreta, e de preferência não as crie para atribuição dentro do construtor ou método. Essa refatoração serve para seguir o Clena Code, SOLID.

Ao invés de dar um new no construtor, passa o objeto por parâmetro.

### Schema

![](/home/rhavel/Documentos/CREDICOM-2023/php-ultimate-notes/awesome-books/refactoring-to-patterns/asserts/cap11-utilities/11-03-extract-parameter.png)

### Motivação

Às vezes, você deseja atribuir um campo dentro de um objeto a um valor fornecido por outro objeto. Se o campo já estiver atribuído a um valor local, você poderá extrair metade da instrução de atribuição para um parâmetro para que um cliente possa fornecer o valor do campo em vez do objeto host.

Eu precisava dessa refatoração depois de executar Replace Inheritance with Delegation [F]. Ao final dessa refatoração, uma classe delegante contém um campo para um objeto ao qual ele delega (o delegado). A classe delegante atribui este campo delegado a uma nova instância do delegado. No entanto, eu precisava de um objeto cliente para fornecer o valor do delegado. Extract Parameter e permitiu simplesmente extrair o código de instanciação delegado para um valor de parâmetro fornecido por um cliente.

### Mecânica da Refatoração

1- A instrução de atribuição para o campo deve estar em um construtor ou método antes que você possa fazer essa refatoração. Se ainda não estiver em um construtor ou método, mova-o para um.

2- Aplicar Add Parameter [F] para passar o valor do campo, usando o tipo do campo como o tipo do parâmetro. Faça com que o valor do parâmetro seja o valor ao qual o campo está atribuído em seu objeto host. Altere a instrução de atribuição para que o campo seja atribuído ao novo parâmetro.

Compilar e testar.

Quando terminar esta refatoração, você pode querer remover parâmetros não utilizados aplicando Remover Parâmetro [F].

### Exemplo

Este exemplo vem de uma etapa que realizo durante a refatoração
Move Embellishment to Decorator. O HTML Parser `DecodingNode` classe contém um campo chamado `delegate` que é atribuído a uma nova instância de `StringNode` dentro do construtor de `DecodingNode`.

```java
public class DecodingNode implements Node {
    // ...
    private Node delegate; 
    
    public DecodingNode(StringBuffer textBuffer, int textBegin, int textEnd) { 
        delegate = new StringNode(textBuffer, textBegin, textEnd); 
    }
}
```

Dado esse código, aplico essa refatoração da seguinte maneira.

1 - Desde de que `delegate` está atribuído a um valor dentro  do construtor de `DecodingNode`, posso passar para a próxima etapa.

2 - eu aplico  Add Parameter [F] e use um valor padrão de novo `StringNode(textBuffer, textBegin,` `textEnd)`. Em seguida, altero a instrução de atribuição para que ela atribua `delegate` ao valor do parâmetro,  `newDelegate`:

```java
public class DecodingNode implements Node {
    // ...
    private Node delegate; 
    
    public DecodingNode(StringBuffer textBuffer, int textBegin, int textEnd, 
    Node newDelegate ) { 
        delegate = newDelegate; 
    }
}
```

Essa mudança envolve a atualização do cliente, `StringNode`, para passar o valor para `newDelegate` :

```java
public class StringNode {
    // ...
    ... {
        return new DecodingNode(..., 
        new StringNode(textBuffer, textBegin, textEnd));
    }
}
```

Eu compilo e testo para confirmar que tudo ainda funciona bem.

Depois de concluir esta refatoração, aplicarei Remove Parameter [F] várias vezes, para que o construtor de  `DecodingNode` torne-se:

```java
public class DecodingNode implements Node {
    // ...
    private Node delegate; 
    
    public DecodingNode( 
        // StringBuffer textBuffer, int textBegin, int textEnd, 
        Node newDelegate ) { 
            delegate = newDelegate; 
        }
}
```

FIM.
