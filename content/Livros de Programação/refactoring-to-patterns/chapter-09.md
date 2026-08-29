# Chapter 9. Protection

Uma refatoração que melhora a proteção do código existente deve fazê-lo de uma forma que não altere o comportamento do código existente. Todas as três refatorações nesta seção fazem exatamente isso. Sua motivação para aplicá-los pode ser melhorar a proteção ou pode ser uma motivação de refatoração padrão, como reduzir a duplicação ou simplificar ou esclarecer o código.

**Replace Type Code with Class (286)** ajuda a proteger um campo de atribuições a valores incorretos ou inseguros. Isso é particularmente importante quando um campo controla qual comportamento é executado no tempo de execução porque uma atribuição incorreta pode colocar um objeto em um estado inválido. **Replace Type Code with Class (286)** usa uma classe em vez de uma enumeração para restringir quais valores podem ser atribuídos a um campo. Um enum fornece uma maneira melhor de implementar essa refatoração ou até mesmo torná-la desatualizada? Isso não. A principal diferença entre uma classe e uma enumeração é que você pode adicionar comportamento a uma classe. Isso é importante porque a aula produzida durante **Replace Type Code with Class (286)** pode precisar ser estendido com comportamento à medida que você aplica uma sequência de refatorações. Isso é exatamente o que ocorre durante a refatoração **Replace State-Altering Conditionals with State (166).**

**Limit Instantiation with Singleton (296)** é útil quando você deseja controlar quantas instâncias de uma classe podem ser instanciadas. As motivações típicas para aplicar essa refatoração são reduzir o uso de memória ou melhorar o desempenho. Uma motivação ruim para refatorar para um Singleton [DP ] é dar a um trecho de código acesso a informações de difícil acesso (consulte Inline Singleton , 114,para uma discussão sobre isso). Em geral, é melhor aplicar **Limit Instantiation with Singleton (296)** somente quando um criador de perfil informa que vale a pena fazer isso.

**Introduce Null Object** (301)é uma refatoração que ajuda a transformar como o código é protegido de valores nulos. Se você tiver muito da mesma lógica condicional que verifica o mesmo valor nulo, provavelmente poderá simplificar e condensar o código refatorando-o para usar um Null Object [Woolf ].

## Replace Type Code with Class

### O que é

**Se**

A field's type (e.g., a String or int) fails to protect it from unsafe assignments and invalid equality comparisons.

**Refatore para**

Constrain the assignments and equality comparisons by making the type of the field a class.

### Schema

![](/home/rhavel/Documentos/CREDICOM-2023/php-ultimate-notes/awesome-books/refactoring-to-patterns/asserts/cap09-protection/09-01-replace-raw-type-to-class-01.png)

### Resumo

Para uma variável importante (algo como uma constante), em que se verifica muitas vezes se ela tem um determinado valor, ao invés de usar um  `int` ou `string` que pode dar uma margem de erro grande (errar um carácter, ou qualquer coisa boba assim), use `enum`, ou melhor, uma classe que faça o papel de `enum` com muito mais segurança e controle de acesso e validação para garantir que ela jamais tenha um valor fora do seu escopo.

### Motivação

Uma motivação primária para refatorar a tipagem de uma variável para uma classe é tornar o código seguro para o tipo. Uma maneira de fazer isso é restringir os possíveis valores que podem ser atribuídos ou equiparados a um campo ou variável. Considere o seguinte código de tipo não seguro:

```java
public void testDefaultsToPermissionRequested() {
    SystemPermission permission = new SystemPermission();
	assertEquals(permission.REQUESTED, permission.state());
	assertEquals("REQUESTED", permission.state());
}
```

Este código cria um objeto `SystemPermission`. O construtor desse objeto define seu `state` campo igual ao `SystemPermission.REQUEST` como a seguir:

```java
public SystemPermission() {
	state = REQUESTED;
}
```

Outros métodos dentro de `SystemPermission` atribuir `state` aos estados de `SystemPermission` , como `GRANTED` E `DENIED.` . Dado que cada um desses tipos de estado foi definido usando uma constante `String` (como `public final static String REQUESTED = "REQUESTED"`) e `state` foi definido como tipo `String`, as duas declarações assert acima são passam porque o campo `state`, que é acessado através da chamada para `permission.state()`, é considerado igual a ambos `SystemPermission.REQUESTED` e a Corda, `"REQUESTED"`.

**Qual é o problema com isso? O problema é que usando uma `String` neste contexto é propenso a erros.**

 Por exemplo o quê se uma instrução assert fosse acidentalmente escrita assim:

```
assertEquals("REQEUSTED", permission.state());
```

Isso deveria passar? Não, pois a `String`,"`"REQEUSTED",`", foi escrito incorretamente acidentalmente! Usando um `String` como o tipo para `state` da classe `SystemPermission's` também o deixa exposto a erros como este a seguir:

```java
public class SystemPermission...
    
	public void setState(String newState){
		state = newState;
	}

permission.setState("REQESTED"); // another misspelling of "REQUESTED"
```

Aqui, o erro ortográfico de "REQESTED" não causará um erro do compilador, mas vai permitir uma instância de `SystemPermission` inserir um estado inválido. Depois de entrar nesse estado inválido, `SystemPermission` a lógica de transição de estado de não permitirá que ele saia desse estado inválido.

Usando uma classe em vez de uma `String` para representar um `state` de `SystemPermission` reduzirá tais erros porque **garante que todas as atribuições e comparações sejam realizadas usando uma família de constantes de tipo seguro. Essas constantes são consideradas de tipo seguro porque seu tipo, que é uma classe, as protege de serem representadas por outras constantes.** 

Por exemplo, no código a seguir, a constante type-safe, REQUESTED, reside em uma classe e não pode ser confundido com nenhum outro valor:

```java
public class PermissionState {
	public final static PermissionStateREQUESTED = new PermissionState();
```

Clientes que desejam executar instruções de atribuição ou igualdade usando `REQUESTED` só pode obter uma referência a ele chamando `PermissionState.REQUESTED`.

Usar uma classe para obter segurança de tipo para uma família de constantes foi descrito por Joshua Bloch como o padrão Type-Safe Enum [Bloch]. Joshua faz um excelente trabalho explicando esse padrão e como lidar com os problemas de serialização/desserialização associados a ele. As linguagens que fornecem suporte nativo para o que é comumente chamado de **"enums"** podem parecer tornar essa refatoração inútil. Esse não é o caso, pois depois de executar essa refatoração, muitas vezes você estenderá seu código para oferecer suporte a mais comportamento, o que não é possível com enums. Por exemplo, o primeiro passo na mecânica para Replace State- Altering Conditionals with State (166) se baseia nessa refatoração, mas não pode se basear em uma enumeração baseada em linguagem. 

## Prós e Contras

**Prós**

+ Oferece melhor proteção contra atribuições e comparações inválidas.

**Contras**

+ Requer mais código do que o uso de tipo não seguro.

### Mecânica da Refatoração

Nas etapas abaixo uma constante de tipo inseguro é uma constante definida usando um tipo primitivo ou não baseado em classe, como uma `String` ou `int`.

1 - Identificar um campo de tipo não seguro, um campo declarado como um tipo primitivo ou não baseado em classe que é atribuído ou comparado a uma família de constantes de tipo inseguro. Autoencapsular o campo de tipo não seguro aplicando Campo auto-encapsulado [F ].

Compilar e testar.

2 - Criar uma nova classe, uma classe concreta que em breve substituirá o tipo usado para o campo type-unsafe. Nomeie essa class após os tipos de tipos que irá armazenar. No momento, não forneça nenhum construtor para a nova classe.

3 - Escolha um valor constante ao qual o campo de tipo não seguro é atribuído e/ou comparado e defina uma nova versão dessa constante em sua nova classe criando uma constante que seja uma instância da nova classe. Em Java, é comum declarar essa constante como `public final static`

Repita esta etapa para todos os valores constantes atribuídos ou comparados com o campo de tipo não seguro.

Compilar.

Agora você definiu uma família de constantes na nova classe. Se for importante evitar que os clientes adicionem membros a essa família de constantes, declare um único construtor privado para a nova classe ou, se sua linguagem permitir, marque a nova classe como `final`.

4 - Na classe que declarou o campo type-unsafe, crie um campo de tipo seguro, um campo cujo tipo é a nova classe. Crie um método de configuração para isso.

5 - Sempre que uma atribuição for feita ao campo de tipo não seguro, adicione uma instrução de atribuição semelhante ao campo de tipo seguro, usando a constante apropriada na nova classe.

Compilar.

6 - Altere o método getter para o campo de tipo não seguro para que seu valor de retorno seja obtido do campo de tipo seguro. Isso requer fazer as constantes na nova classe capaz de retornar o valor correto.

Compilar e testar.

7 - Na classe que declarou o campo de tipo não seguro, exclua o campo de tipo não seguro, o método setter para ele e todas as chamadas para o método de configuração.

Compilar e testar.

8 - Encontre todas as referências às constantes de tipo não seguro e substitua-as por chamadas à constante correspondente na nova classe. Como parte desta etapa, altere o método getter para o campo de tipo não seguro para que seu tipo de retorno seja a nova classe e faça todas as alterações necessárias para os chamadores do método getter revisado.

A lógica de igualdade que antes dependia de primitivos agora dependerá da comparação de instâncias da nova classe. Seu idioma pode fornecer uma maneira padrão de fazer essa lógica de igualdade. Caso contrário, escreva o código para garantir que a lógica de igualdade funcione corretamente com novas instâncias de classe.

Compilar e testar.

Exclua as constantes não seguras de tipo não utilizadas.

### Exemplo

Este exemplo, que foi mostrado no esboço de código no início desta refatoração e mencionado na Motivação seção, lida com o tratamento de solicitações de permissão para acessar sistemas de software. Começaremos examinando as partes relevantes da classe `SystemPermission`:

```java
public class SystemPermission { 

    private String state; 
    private boolean granted; 
    public final static String REQUESTED = "REQUESTED"; 
    public final static String CLAIMED = "CLAIMED"; 
    public final static String DENIED = "DENIED"; 
    public final static String GRANTED = "GRANTED"; 

    public SystemPermission() { 
        state = REQUESTED; 
        granted = false; 
    } 

    public void claimed() { 
        if (state.equals(REQUESTED)) 
            state = CLAIMED; 
    } 

    public void denied() { 
        if (state.equals(CLAIMED)) 
        state = DENIED; 
    } 

    public void granted() { 
        if (!state.equals(CLAIMED)) 
            return;
    }
    
}
```

1 - O campo de tipo não seguro em `SystemPermission` é chamado `state`. É atribuído e comparado com uma família de constantes `String` também definidas dentro de `SystemPermission`. O objetivo é fazer `state` um type-safe, tornando seu tipo uma classe em vez de uma `String`.

Começo por me auto-encapsular `state`:

```java
public class SystemPermission {

    public SystemPermission() { 
        setState(REQUESTED); // ENCAPSULA 'state' usando set e getters agora
        granted = false;
    } 

    public void claimed() { 
        if (getState().equals(REQUESTED)) 
            setState(CLAIMED); 
    } 
    
    private void setState(String state) { 
        this.state = state; 
    } 
    
    public String getState() { // note: this method already existed 
        return state; 
    } 
}
// etc.
```

Esta é uma mudança trivial, e meu compilador e testes estão satisfeitos com isso.

2 - Eu crio uma nova classe e a chamo `PermissionState` porque em breve representará o estado de uma instância de `SystemPermission`.

```java
public class PermissionState {

}
```

3 - Eu escolho um valor constante ao qual o campo de tipo não seguro é atribuído ou comparado e crio uma representação constante para ele em `PermissionState` . eu faço isso por declarando um `public static final` em `PermissionState` isso é uma instância de `PermissionState` :

```java
public final class PermissionState { 
    public final static PermissionState REQUESTED = new PermissionState(); 
}
```

Repito este passo para cada constante em `SystemPermission`, resultando no seguinte código:

```java
public class PermissionState { 
    public final static PermissionState REQUESTED = new PermissionState(); 
    public final static PermissionState CLAIMED = new PermissionState(); 
    public final static PermissionState GRANTED = new PermissionState(); 
    public final static PermissionState DENIED = new PermissionState(); 
}
```

O compilador aceita esse novo código. Agora devo decidir se quero impedir que os clientes estendam ou instanciem `PermissionState` a fim de garantir que as únicas instâncias dela sejam suas próprias quatro constantes. Nesse caso, não preciso de um nível tão rigoroso de segurança de tipo, então não defino um construtor privado ou uso a keyword final para a nova classe.

4 - Em seguida, crio um campo type-safe dentro Permissão do sistema, usando o `PermissionState` tipo. Eu também crio um método setter para ele:

```java
public class SystemPermission {
    // ...
    private String state; 
    private PermissionState permission; 
    
    private void setState(PermissionState permission) { 
        this.permission = permission; 
    }
}
```

5 - Agora devo encontrar todas as instruções de atribuição para o campo type unsafe,estado, e faça uma atribuição semelhante declarações para o campo type-safe,permissão:

```java
public class SystemPermission {
    // ...
    public SystemPermission() { 
        setState(REQUESTED); 
        setState(PermissionState.REQUESTED); 
        granted = false; 
    } 

    public void claimed() { 
        if (getState().equals(REQUESTED)) { 
            setState(CLAIMED); 
            setState(PermissionState.CLAIMED); 
        } 
    } 

    public void denied() { 
        if (getState().equals(CLAIMED)) { 
            setState(DENIED); 
            setState(PermissionState.DENIED); 
        } 
    } 

    public void granted() { 
        if (!getState().equals(CLAIMED)) 
            return; 
        
        setState(GRANTED); 
        setState(PermissionState.GRANTED);
        granted = true; 
    }
}
```

Confirmo que o compilador aceita essas alterações.

6 - Em seguida, quero alterar o método getter para `state` para retornar um valor obtido do campo de tipo seguro, `permission`. Porque o método getter para `state` retorna uma `String`, vou ter que fazer `permission` capaz de devolver uma `String` também. Meu primeiro passo é modificar `PermissionState` para apoiar um para método `toString()` que retorna o nome de cada constante:

```java
public class PermissionState { 
    private final String name; 

    private PermissionState(String name) { 
        this.name = name; 
    } 

    public String toString() { 
        return name; 
    }

    public final static PermissionState REQUESTED = new PermissionState( "REQUESTED" ); 
    public final static PermissionState CLAIMED = new PermissionState( "CLAIMED" ); 
    public final static PermissionState GRANTED = new PermissionState( "GRANTED" ); 
    public final static PermissionState DENIED = new PermissionState( "DENIED" ); 
}
```

Agora posso atualizar o método getter para `state`:

```java
public class SystemPermission {
    // ...
    public String getState() { 
        // return state; 
        return permission.toString(); 
    }
}
```
O compilador e os testes confirmam que tudo ainda está funcionando.

7 - Agora posso excluir o campo de tipo não seguro,estado,  `SystemPermission` chamadas para seu método setter privado e o próprio método setter:

```java
public class SystemPermission {
    // private String state; 
    private PermissionState permission; 
    private boolean granted;
    
    public SystemPermission() { 
        // setState(REQUESTED); 
        setState(PermissionState.REQUESTED); 
        granted = false; 
    } 
    
    public void claimed() { 
        if (getState().equals(REQUESTED)) { 
            // setState(CLAIMED); 
            setState(PermissionState.CLAIMED); 
        } 
    } 
    
    public void denied() { 
        if (getState().equals(CLAIMED)) { 
            // setState(DENIED); 
            setState(PermissionState.DENIED); 
        } 
    } 
    
    public void granted() { 
        if (!getState().equals(CLAIMED)) 
            return; 
        
        // setState(GRANTED); 
        setState(PermissionState.GRANTED); 
        granted = true;
    } 
    
    // private void setState(String state) { 
    //     this.state = state; 
    // }
}
```

eu testei isso `SystemPermission` ainda funciona normalmente.

Sim.

8 - Agora eu substituo todo o código que faz referência `SystemPermission` Constantes de tipo inseguro com código que referencia `PermissionState` 's valores constantes. Por exemplo, `SystemPermission` `claimed()` ainda referencia o"REQUERIDOS"Constante de tipo inseguro: 

```java
public class SystemPermission {
    // ... 
    public void claimed() { 
        if (getState().equals(REQUESTED)) // equality logic with type-unsafe constant 
            setState(PermissionState.CLAIMED); 
    }
}
```

Eu atualizo este código da seguinte maneira:

```java
public class SystemPermission {
    // ...
    public PermissionState getState() { 
        return permission // .toString();
    } 
    
    public void claimed() { 
        if (getState().equals(PermissionState.REQUESTED)) { 
            setState(PermissionState.CLAIMED); 
        }
    }
}
```

Eu faço mudanças semelhantes em todo `SystemPermission` . Além disso, eu atualizo todos os chamadores em `getState()` para que agora trabalhem exclusivamente com `PermissionState` constantes. Por exemplo, aqui está um método de teste que requer atualização:

```java
public class TestStates...
    public void testClaimedBy() {
    SystemPermission permission = new
    SystemPermission();
    permission.claimed();
    assertEquals(SystemPermission.CLAIMED,
    permission.getState());
}
```

Eu altero este código da seguinte forma:

```java
public class TestStates...
    public void testClaimedBy() {
    SystemPermission permission = new
    SystemPermission();
    permission.claimed();
    assertEquals(
    PermissionState.CLAIMED,permission.getState());
}
```

Depois de fazer alterações semelhantes em todo o código, compilo e testo para confirmar se a nova lógica de igualdade de tipo seguro funciona corretamente.

Finalmente, posso excluir com segurança `SystemPermission` constantes type-unsafe porque não estão mais sendo usadas:

```java
public class SystemPermission {
    // public final static String REQUESTED = "REQUESTED"; 
    // public final static String CLAIMED = "CLAIMED"; 
    // public final static String DENIED = "DENIED"; 
    // public final static String GRANTED = "GRANTED";
}
```

Agora `SystemPermission` atribuições de o campo `permission` e todas as comparações de igualdade com o campo `permission` são de tipo seguro. 

## Limit Instantiation with Singleton

### O que é

**Se**

Your code creates multiple instances of an object, and that uses too much memory or slows system performance.

**Refatore para**

Replace the multiple instances with a Singleton.

### Resumindo

Se você chama/instância uma classe várias vezes que não muda de estado, use `SINGLETON`

### Schema

09-02-use-singleton-01.png

### Motivação

Se você quer ser um bom designer de software, não otimize o código prematuramente. O código otimizado prematuramente é mais difícil de refatorar do que o código que não foi otimizado. Em geral, você  descobrirá mais alternativas para melhorar seu código antes que ele seja otimizado do que depois.

Se você usar o Singleton [DP ] por hábito, porque "torna seu código mais eficiente", você está otimizando prematuramente. você sofre de Singletonitee é melhor seguir o conselho em Inline Singleton (114). Por outro lado, às vezes é uma boa decisão refatorar para um Singleton, como no cenário a seguir.

+ Os usuários do seu sistema estão reclamando sobre o desempenho do sistema.
+ Seu criador de perfil informa que você pode melhorar o desempenho não instanciando determinados objetos repetidas vezes.
+ Os objetos que você deseja compartilhar não têm estado ou contêm um estado compartilhável.

Um colega e eu criamos o perfil de um sistema que lida com permissões de segurança. O sistema usa o Estado [DP ] padrão (ver Replace State-Altering Conditionals with State , 166). Cada transição de estado leva à instanciação de um novo objeto State. Criamos o perfil do sistema para verificar o uso e o desempenho da memória. Embora a instanciação de objetos State não fosse o maior gargalo do sistema, ela contribuía para diminuir o desempenho sob uma carga pesada.

Com base nesta pesquisa, determinamos que fazia sentido refatorar para um Singleton para limitar a instanciação de objetos Stateless State. E essa é a ideia geral por trás dessa refatoração: espere por um bom motivo para limitar a instanciação e, quando encontrar um, refatore para um Singleton. Claro, nósperfilado após a implementação do Singleton, e o uso de memória foi muito melhorado.

Para outras razões para refatorar para um Singleton que não envolva melhorar o desempenho, veja as sábias palavras fornecidas por Kent Beck, Ward Cunningham e Martin Fowler anteriormente neste catálogo em Inline Singleton (114).

### Prós e Contras

**Pros**

+ Melhora o desempenho.
+ É facilmente acessível de qualquer lugar. Em muitos casos, isso pode indicar uma falha de projeto (consulte *Inline Singleton*) embutido).

**Contras**

+ Não é útil quando um objeto possui um estado que não pode ser
  compartilhado.

### Mecânica da Refatoração

Antes de executar essa refatoração, certifique-se de que o objeto que deseja transformar em um Singleton não tenha estado ou tenha um estado compartilhável. Como a maioria das classes que acabam se tornando Singletons tem um construtor, essas mecânicas assumem que você tem um construtor em sua classe.

1 - Identificar uma classe de instância múltiplas, uma classe que é instanciada mais de uma vez por um ou mais clientes. Aplique a mecânica de Replace Constructors with Creation Methods (57) mesmo que sua classe tenha apenas umconstrutor. O tipo de retorno para seu novo método de criação deve ser a classe de várias instâncias.

Compilar e testar.

2 - Declare umcampo singleton, um campo estático privado do tipo classe de instância múltipla na classe de instância múltipla e, se possível, inicialize-o em uma instância da classe de instância múltipla.

Pode não ser possível inicializar este campo porque, para isso, você precisa de argumentos passados por um cliente em tempo de execução. Nesse caso, simplesmente defina o campo e não o inicialize.

Compilar.

3 - Faça seu método de criação retornar o valor no campo singleton. Se precisar ser instanciado preguiçosamente, faça essa instanciação preguiçosa no método de criação, com base em quaisquer parâmetros passados.

Compilar e testar.

### Exemplo

Este exemplo é baseado no exemplo de código de segurança encontrado na refatoração Replace State-Altering Conditionals with State (166). Se você estudar o código produzido após a aplicação dessa refatoração, descobrirá que cada instância de State é um Singleton. No entanto, essas instâncias de Singleton State não foram criadas por motivos de desempenho; eles resultaram da execução da refatoração Replace Type Code with Class (286).

Quando refatorei inicialmente para o padrão State no projeto do código de segurança, não apliquei Replace Type Code with Class. Eu ainda não sabia o quanto essa refatoração simplifica as etapas posteriores na refatoração para o padrão State. Minha abordagem anterior para a refatoração State envolvia instanciar `Permission` subclasses cada vez que eram necessárias, pagando sem levar em conta o padrão Singleton.

Nesse projeto, meu colega e eu traçamos o perfil de nosso código e encontramos vários lugares onde ele poderia ser otimizado. Um desses lugares envolvia a frequente instanciação das classes de estado. Portanto, como parte de um esforço geral para melhorar o desempenho, **o código para instanciar repetidamente o `Permission` subclasses foi refatorado para usar o padrão Singleton. Eu descrevo as etapas a seguir.**

1 - Existem seis classes State diferentes, cada uma das quais é uma classe de instância múltipla porque os clientes as instanciam várias vezes. Neste exemplo, trabalharei com o a classe `PermissionRequested`, que se parece com isso:

```java
public class PermissionRequested extends Permission { 
    public static final String NAME= "REQUESTED"; 
    
    public String name() { 
        return NAME; 
    } 
    
    public void claimedBy(SystemAdmin admin, SystemPermission permission) { 
        permission.willBeHandledBy(admin); 
        permission.setState(new PermissionClaimed()); 
    } 
}
```

`PermissionRequested` não define um construtor porque usa o construtor padrão de Java (por isso posso dar `new` várias vezes e vai criar cada vez mais instâncias). Como o primeiro passo na mecânica é converter seu(s) construtor(es) em Métodos de Criação, defino um Método de Criação da seguinte forma: 

```java
public class PermissionRequested extends Permission {
    // ...
    // Método static, pode ser chamado a qualquer hora
    public static Permission state() { 
        return new PermissionRequested(); 
    }
}
```

Você notará que eu uso `Permission` (a classe pai) como o tipo de retorno para este método de criação. Faço isso porque quero que todo o código do cliente interaja com as subclasses State por meio da interface de sua superclasse. Eu também atualizo todos os chamadores do construtor para agora chamar o Método de Criação: 

```java
public class SystemPermission {
    // ...
    private Permission state; 
    
    public SystemPermission(SystemUser requestor, SystemProfile profile) { 
        this.requestor = requestor; 
        this.profile = profile; 
        // state = new PermissionRequested();  // Local em que essa 
        state = PermissionRequested.state(); 
        // ... 
    }
}
```

Eu compilo e testo para ter certeza de que essa mudança trivial não quebrou nada.

2 - Agora eu crio o campo singleton, um campo estático privado do tipo `Permission` em `PermisionRequested,`, e inicializá-lo para uma instância de `PermisionRequested,`:

```java
public class PermissionRequested extends Permission {
    private static Permission state = new PermissionRequested();
}
```

Eu compilo para confirmar que minha sintaxe está correta.

3 - Por fim, altero o Método de Criação, `state()`, para retornar o valor do campo `state`:

```java
public class PermissionRequested extends Permission {
    // ...
    public static Permission state() { 
        return state;
    }
}
```

**OBS: Agora, toda vez que eu fizer um `PermissionRequested.state(); ` vai retornar uma instância que só é criada uma única vez, depois só pega esse valor criado**

Eu compilo e testo mais uma vez e tudo funciona. Agora repito essas etapas para as classes State restantes até que todas sejam Singletons. Nesse ponto, executo o criador de perfil paraverifique como o uso de memória e o desempenho foram afetados. Espero que as coisas tenham melhorado. Caso contrário, posso decidir desfazer essas etapas, pois sempre prefiro trabalhar com objetos regulares do que com Singletons. 

## Introduce Null Object

### O que é

**Se**

Logic for dealing with a null field or variable is duplicated throughout your code.

*A lógica para lidar com um campo nulo ou variável é duplicada em todo o seu código.*

**Refatore para**

Replace the null logic with a Null Object, an object that provides the appropriate null behavior.

*Substitua a lógica nula por um objeto nulo, um objeto que fornece o comportamento nulo apropriado.*

### Resumo

Caso uma variável for nula e resultar em um comportamento nulo, afim de evitar ter vários  `if (x == null) ...;` Você pode encapsular todos esses comportamentos colocando em uma classe que tem os mesmos métodos mas que executa nada. O Null Object não serve para centralizar um `throw Exception` ,ele serve para centralizar o comportamento nulo.. Serve para evitar de repetir o `if == null` em vários locais

ChatGPT: Em programação, o termo "null object" (objeto nulo) refere-se a um padrão de design que permite criar uma instância de uma classe que não faz nada ou tem um comportamento neutro. Esse objeto é usado como substituto de um objeto nulo convencional para evitar verificações constantes de nulos em seu código.

### Simplificando em uma imagem

![](/home/rhavel/Documentos/CREDICOM-2023/php-ultimate-notes/awesome-books/refactoring-to-patterns/asserts/cap09-protection/09-03-null-object-01.png)

### Motivação

Se um cliente chama um método em um campo ou variável que é nulo, uma exceção pode ser gerada, um sistema pode travar ou problemas semelhantes podem ocorrer. Para proteger nossos sistemas de tal comportamento indesejado, escrevemos verificações para evitar que campos nulos ou variáveis sejam chamados e, se necessário, especificamos um comportamento alternativo para executar quando nulos são encontrados:

```java
if (someObject != null)
	someObject.doSomething();
else
	performAlternativeBehavior();
```

**Repetir essa lógica nula em um ou dois lugares em um sistema não é um problema, mas repeti-la em vários lugares incha um sistema com código desnecessário**. Comparado com o código livre de lógica nula, o código cheio dela geralmente leva mais tempo para ser compreendido e requer mais reflexão sobre como estender. A lógica nula também não fornece proteção nula para o novo código. Portanto, se um novo código for escrito e os programadores se esquecerem de incluir lógica nula para ele, erros nulos podem começar a ocorrer.

O Null Object pattern [1] fornece uma solução para tais problemas. Ele elimina a necessidade de verificar se um campo ou variável é nulo, tornando possível sempre chame o campo ou variável com segurança. O truque é atribuir o campo ou variável ao objeto certo no momento certo. Quando um campo ou variável pode ser nulo, você pode fazer com que ele se refira a uma instância de um objeto nulo, que fornece comportamento inofensivo, padrão ou não fazer nada. Posteriormente, o campo ou variável pode ser atribuído a algo diferente de um objeto nulo. Até que isso aconteça, todas as invocações são roteadas com segurança pelo objeto nulo.

> [1] Bruce Anderson nomeou apropriadamente esse padrão *nada acontece* [Anderson ] porque um Null Object executa ativamente um comportamento que não faz nada. Martin Fowler descreveu como um Null Object é um exemplo de um padrão mais amplo chamado Special Case [Fowler, PEAA ]. **Ralph Johnson e Bobby Woolf descreveram como versões nulas de padrões como Strategy [DP ], Procuração [DP ], Iterador [DP ], e outros são frequentemente usados para eliminar verificações nulas [Woolf ]**.

**Cuidado, nem sempre é uma boa ideia**

A introdução de um objeto nulo em um sistema deve reduzir o tamanho do código ou pelo menos mantê-lo uniforme. Se sua implementação aumentar significativamente o número de linhas de código em comparação com o uso apenas da lógica nula, é um bom sinal de que você não precisa de um Null Object. Kent Beck conta uma história sobre isso em seu livro Desenvolvimento Orientado a Testes [Beck, TDD]. Ele uma vez sugeriu refatorando para um objeto nulo para seu parceiro de programação, Erich Gamma, que rapidamente calculou a diferença nas linhas de código e explicou como a refatoração para um objeto nulo na verdade adicionaria muito mais linhas de código do que já tinham com sua lógica nula.

A existência de um objeto nulo não garante que a lógica nula não seja escrita. Por exemplo, se um programador não estiver ciente de que um Null Object já está protegendo o código de nulos, ele ou ela pode escrever uma lógica nula para um código que nunca será nulo. Por fim, se um programador espera que um nulo seja retornado sob certas condições e escreve um código importante para lidar com essa situação, uma implementação de objeto nulo pode causar um comportamento inesperado. 

 Minha versão dessa refatoração estende a de Martin FowlerIntroduzir Objeto Nulo[F ] fornecendo mecânica para lidar com uma situação comum: uma classe é polvilhada com lógica nula para um campo porque uma instância da classe pode tentar usar o campo antes que o campo tenha sido atribuído a um valor não nulo. Dado tal código, a mecânica para refatorar para um Null Object é diferente daquelas definidas na mecânica de Martin para esta refatoração.Objetos nulos são frequentemente (embora nem sempre) implementados por subclasses ou implementando uma interface, conforme mostrado no diagrama a seguir. 

 A criação de um objeto nulo por subclasse envolve a substituição de todos os métodos públicos herdados para fornecer o comportamento nulo apropriado. Um risco associado a essa abordagem é que, se um novo método for adicionado à superclasse, os programadores devem se lembrar de substituir o método pelo comportamento nulo no objeto nulo. Se eles se esquecerem de fazer isso, o Null Object herdará a lógica de implementação que pode causar um comportamento indesejado em tempo de execução. Fazer um Null Object implementar uma interface em vez de ser uma subclasse remove esse risco.

### Prós e Contras

**Prós**

+ Evita erros nulos sem duplicar a lógica nula.
+ Simplifica o código minimizando testes nulos.

**Contras**

+ Complica um projeto quando um sistema precisa de poucos testes nulos.
+ Pode produzir testes nulos redundantes se os programadores não tiverem conhecimento de uma implementação de objeto nulo.
+ Complica a manutenção. Objetos nulos que possuem uma superclasse devem substituir todos os métodos públicos herdados recentemente.

### Mecânica da Refatoração

Essa mecânica supõe que você tenha a mesma lógica nula espalhada por todo o seu código porque um campo ou variável local pode ser referenciado quando ainda é nulo. Se sua lógica nula existe por qualquer outro motivo, considere aplicar a mecânica de Martin Fowler para Introduzir Objeto Nulo[F ]. O termo classe fonte nas etapas a seguir refere-se à classe que você gostaria de proteger de nulos.

1 - Criar um objeto nulo aplicando Extrair subclasse[F ] na classe de origem ou fazendo com que sua nova classe implemente a interface implementada pela classe de origem. Se você decidir fazer seu objeto nulo implementar uma interface, mas essa interface ainda não existe, crie-a aplicando Extrair interface[F ] na classe de origem.

Compilar.

2- Procurando por um cheque nulo(código cliente que invoca um método em uma instância da classe de origem se não for nula ou executa um comportamento alternativo se for nula). Substitua o método invocado no objeto nulo para que ele implemente o comportamento alternativo.

Compilar.

3 - Repita a etapa 2 para outras verificações nulas associadas à classe de origem.

4 - Encontre uma classe que contenha uma ou mais ocorrências da verificação nula e inicialize o campo ou a variável local referenciada na verificação nula para uma instância do objeto nulo. Realize essa inicialização o mais cedo possível durante o tempo de vida de uma instância da classe (por exemplo, na instanciação).

Este código não deve afetar o código pré-existente que atribui o campo ou a variável local a uma instância da fonte aula. O novo código simplesmente executa uma atribuição a um objeto nulo antes de qualquer outra atribuição.

Compilar.

5 - Na classe selecionada na etapa 4, remova todas as ocorrências da verificação nula.

Compilar e testar.

6 - Repita as etapas 4 e 5 para cada classe com uma ou mais ocorrências da verificação nula.

Se o seu sistema criar muitas instâncias do objeto nulo, talvez você queira usar um criador de perfil para determinar se faria sentido aplicar Instanciação de Limite com Singleton (296).

### Exemplo

(Foi omitido um trecho longo anterior que não é muito necessário)

Se um usuário movesse ou clicasse o mouse em um applet antes que nossos manipuladores de eventos de mouse personalizados fossem totalmente instanciados e configurados, o navegador emitiria erros no console e os applets se tornariam instáveis.

Havia uma solução fácil: encontrar todos os lugares onde MouseEventHandlerinstâncias podem ser chamadas quando ainda eram nulos (ou seja, ainda não instanciados) e escrever código para isolá- los de tais chamadas. Isso resolveu o problema de inicialização, mas estávamos insatisfeitos com o novo design. Agora, inúmeras classes em nosso sistema apresentavam uma abundância de verificações nulas:
O código como está hoje é o seguinte:

```java
public class NavigationApplet extends Applet {
    // ...
    public boolean mouseMove(Event event, int x, int y) { 
        if (mouseEventHandler != null) 
           return 
        mouseEventHandler.mouseMove(graphicsContext, event, x, y );     
        return true; 
    } 
    
    public boolean mouseDown(Event event, int x, int y) { 
        if (mouseEventHandler != null) 
            return mouseEventHandler.mouseDown(graphicsContext, event, x, y );     
        return true; 
    }
    
    public boolean mouseUp(Event event, int x, int y) { 
        if (mouseEventHandler != null) 
            return mouseEventHandler.mouseUp(graphicsContext, event, x, y ); 
        return true; 
    } 
    
    public boolean mouseExit(Event event, int x, int y) { 
        if (mouseEventHandler != null) 
            return mouseEventHandler.mouseExit(graphicsContext, event, x, y ); 
        return true; 
    }
}
```

Para remover as verificações nulas, refatoramos os applets para que eles usassem um NullMouseEventHandler (ou seja, podem usar o *NUllObject*) na inicialização e depois passou a usar um MouseEventHandler real quando um estava pronto. Aqui estão os passos que seguimos para fazer essa mudança.

1 - Nos aplicamos Extrair subclasse[F ] definir `NullMouseEventHandler`, uma subclasse do nosso próprio mouse manipulador de eventos: 

```java
public class NullMouseEventHandler extends MouseEventHandler { 
    public NullMouseEventHandler(Context context) { 
        super(context); 
    } 
}
```

Esse código compilou muito bem, então seguimos em frente.

2 - Em seguida, encontramos uma verificação nula, como esta:

```java
public class NavigationApplet extends Applet {
    // ... 
    public boolean mouseMove(Event event, int x, int y) { 
        if (mouseEventHandler != null) // null check 
            return mouseEventHandler.mouseMove(graphicsContext, event, x, y); 
        return true;
    }
}
```

O método invocado na verificação nula acima é `mouseEventHandler.mouseMove(...)`. O código invocado se `mouseEventHandler` for null é o código que a mecânica nos orienta a implementar em um `mouseMove(...)` método em `NullMouseEventHandler`. Isso foi facilmente implementado: 

```java
public class NullMouseEventHandler {
    // ...
    public boolean mouseMove(MetaGraphicsContext mgc, Event event, int x, int y) { 
        return true; 
    }
}
```

O novo método compilou sem problemas.

3 - Repetimos a etapa 2 para todas as outras ocorrências da verificação nula em nosso código. Encontramos a verificação nula em vários métodos em três classes diferentes. Quando concluímos esta etapa,`NullMouseEventHandler` teve muitos novos métodos. Aqui estão alguns deles:

```java
public class NullMouseEventHandler {
    // ...
    public boolean mouseDown(MetaGraphicsContext mgc, Event event, int x, int y) { 
        return true; 
    }

    public boolean mouseUp(MetaGraphicsContext mgc, Event event, int x, int y) { 
        return true; 
    } 
    
    public boolean mouseEnter(MetaGraphicsContext mgc, Event event, int x, int y) { 
        return true; 
    } 
    
    public void doMouseClick(String imageMapName, String APID) { 
    }
}
```

O código acima foi compilado sem dificuldades.

4 - Então nós inicializamos `mouseEventHandler`, o campo referenciado na verificação nula dentro doa classe `NavigationApplet`, para uma instância do `NullMouseEventHandler`:

```java
public class NavigationApplet extends Applet {
    // ...
    private MouseEventHandler mouseEventHandler = new NullMouseEventHandler(null);
}
```

O nulo que foi passado para o `NullMouseEventHandler` o construtor do 's encaminhado para o construtor de sua superclasse, `MouseEventHandler`. Como não gostamos de passar esses valores nulos,alterado `NullMouseEventHandler` para fazer este trabalho:

```java
public class NullMouseEventHandler extends MouseEventHandler { 
    public NullMouseEventHandler(/* Context context */) { 
        super(null); 
    } 
}

public class NavigationApplet extends Applet {
    // ...
    private MouseEventHandler mouseEventHandler = new NullMouseEventHandler();
}
```

5 - Em seguida veio a parte divertida. Excluímos todas as ocorrências da verificação nula em classes como `NavigationApplet`:

```java
public class NavigationApplet extends Applet {
    // ... 
    public boolean mouseMove(Event event, int x, int y) { 
        // if (mouseEventHandler != null) 
        return mouseEventHandler.mouseMove(grap hicsContext, event, x, y ); 
        // return true; 
    }

    public boolean mouseDown(Event event, int x, int y) { 
        // if (mouseEventHandler != null) 
        return mouseEventHandler.mouseDown(graphicsContext, event, x, y); 
        // return true; 
    } 

    public boolean mouseUp(Event event, int x, int y) { 
        // if (mouseEventHandler != null) 
        return mouseEventHandler.mouseUp(graphicsContext, event, x, y); 
        // return true; 
    }
}
```

Depois de fazer isso, compilamos e testamos se as alterações funcionaram. Nesse caso, não tínhamos testes automatizados, então tivemos que rodar o site em um navegador e tentar repetidamente para causar problemas com nosso mouse como o Miniaplicativo de `NavigationAppletfoi` inicializado e começou a funcionar. Tudo funcionou bem.

6 - Repetimos as etapas 4 e 5 para outras classes que apresentavam a mesma verificação nula até que ela fosse completamente eliminada de todas as classes que originalmente a continham.

Como nosso sistema usou apenas duas instâncias do `NullMouseEventHandler`, não fizemos disso um Singleton [DP ].

### ChatGPT

> Null Object o que é e como usar

Em programação, o termo "null object" (objeto nulo) refere-se a um padrão de design que permite criar uma instância de uma classe que não faz nada ou tem um comportamento neutro. Esse objeto é usado como substituto de um objeto nulo convencional para evitar verificações constantes de nulos em seu código.

Normalmente, quando um objeto nulo é encontrado em um programa, pode causar uma exceção ou um comportamento indesejado se não for tratado corretamente. O uso de um null object pode ajudar a evitar esses problemas, fornecendo um objeto "vazio" que implementa a mesma interface que o objeto real, mas não executa nenhuma lógica real.

A ideia principal é que, em vez de usar um valor nulo ou realizar verificações de nulos antes de chamar métodos em um objeto, você pode substituir o objeto nulo por um null object que tenha implementações vazias desses métodos. Isso permite que o código seja mais limpo, mais conciso e menos propenso a erros.

Aqui está um exemplo simples em Java para ilustrar como usar um null object:

```java
// Interface para objetos que representam animais
interface Animal {
    void emitSound();
}

// Implementação concreta para um objeto null
class NullAnimal implements Animal {
    @Override
    public void emitSound() {
        // Implementação vazia, não faz nada
    }
}

// Implementação concreta para um objeto real (cachorro)
class Dog implements Animal {
    @Override
    public void emitSound() {
        System.out.println("Woof!");
    }
}

// Exemplo de uso do null object
public class Main {
    public static void main(String[] args) {
        Animal animal1 = new Dog();
        Animal animal2 = new NullAnimal();
        
        animal1.emitSound(); // Saída: "Woof!"
        animal2.emitSound(); // Não produz nenhuma saída
    }
}
```

Nesse exemplo, o null object `NullAnimal` implementa a interface `Animal`, mas não executa nenhuma lógica real no método `emitSound()`. Ao substituir objetos nulos por esse null object, você pode chamar métodos em qualquer objeto sem precisar verificar se é nulo.

É importante notar que o uso de null objects nem sempre é a melhor abordagem em todos os cenários. Ele deve ser considerado quando a presença de objetos nulos é comum e a lógica em torno desses objetos é repetitiva ou não requer tratamento específico. Em alguns casos, outras abordagens, como exceções ou valores opcionais (como os `Optional` do Java), podem ser mais apropriadas.

> Quando usar Null Object é ruim?

Embora o uso de null objects possa ser benéfico em muitos cenários, existem situações em que essa abordagem pode não ser adequada. Aqui estão alguns casos em que o uso de null objects pode ser considerado problemático:

1. Complexidade desnecessária: Se a lógica envolvendo o tratamento de objetos nulos não é frequente ou não é complexa, a introdução de null objects pode adicionar uma camada de complexidade desnecessária ao código. Nesses casos, pode ser mais simples e direto lidar com a verificação de nulos diretamente.

2. Contratos e pré-condições: Se a interface do objeto especifica pré-condições que devem ser atendidas pelos objetos concretos, a introdução de um null object pode violar essas pré-condições. Isso pode levar a comportamentos inesperados ou erros silenciosos no código.

3. Sobrecarga de memória: O uso de null objects pode aumentar a quantidade de memória necessária para armazenar os objetos, especialmente se houver muitos objetos nulos sendo substituídos por null objects. Em sistemas com restrições de recursos, isso pode ser problemático.

4. Complexidade de manutenção: Introduzir null objects em um código existente pode tornar o código mais difícil de entender, dar manutenção e depurar. A lógica do null object pode se misturar com a lógica real dos objetos, dificultando a compreensão do fluxo do programa.

5. Semântica confusa: Em certos contextos, a presença de um null object pode ser confusa e não transmitir com clareza a intenção do código. Dependendo do domínio do problema, pode ser preferível usar outros mecanismos, como exceções ou valores opcionais, para tratar objetos nulos.

É importante considerar cuidadosamente o contexto e as necessidades do seu código antes de decidir usar null objects. Avalie os benefícios em relação aos possíveis custos adicionais em termos de complexidade, desempenho e legibilidade do código. Em alguns casos, outras técnicas de tratamento de nulos, como lançamento de exceções ou uso de valores opcionais, podem ser mais apropriadas e claras.

> E quando deveria usar?

O uso de null objects pode ser benéfico em determinadas situações. Aqui estão alguns cenários em que o uso de null objects pode ser apropriado:

1. Redução de verificações de nulos: Se você tem um código com muitas verificações de nulos, substituir os objetos nulos por null objects pode ajudar a simplificar o código, reduzindo a necessidade de verificações repetitivas.

2. Evitar exceções indesejadas: Quando um objeto nulo é encontrado em tempo de execução e não é tratado corretamente, pode resultar em uma exceção indesejada que pode quebrar o fluxo normal do programa. Usar null objects pode ajudar a evitar essas exceções, fornecendo um comportamento neutro ou vazio em vez de falhar.

3. Manter consistência de interfaces: Se você tem uma interface que espera receber um objeto de determinado tipo, usar um null object que implementa essa interface permite manter a consistência da interface. Dessa forma, você pode fornecer um objeto vazio ou nulo quando necessário, sem causar erros ou interrupções no código que usa a interface.

4. Simplificar o design e manter a legibilidade: Em alguns casos, o uso de null objects pode ajudar a simplificar o design do código, removendo a necessidade de condições complexas e tratamentos especiais para objetos nulos. Isso pode tornar o código mais legível e mais fácil de entender.

5. Testes e simulações: Null objects podem ser úteis durante testes e simulações, onde você precisa fornecer um objeto vazio ou neutro para substituir objetos reais. Isso facilita o isolamento e a verificação de determinados comportamentos sem depender de objetos complexos ou recursos externos.

Lembre-se de que o uso de null objects deve ser avaliado caso a caso, levando em consideração as necessidades específicas do seu código. Considere o impacto nas interfaces, a legibilidade, a complexidade e o desempenho antes de optar pelo uso de null objects. Em alguns casos, outras abordagens, como exceções ou valores opcionais, podem ser mais apropriadas.
