# 02 - Who Gets to Decide What “Good Practices” Are?


## Who decides these things anyway?

Uma coisa que vamos ver é que você deve sempre questionar as “boas práticas” e nunca considerá-las uma verdade geral que você deve respeitar sem entender o porquê. Uma excelente maneira de aprimorar é perguntar toda vez que você não concorda com a crítica ou ponto de vista de alguém.

Ser um bom desenvolvedor é (também) ser capaz de justificar e explicar todas as suas escolhas. Não mais: “Sempre fizemos coisas assim; não há outras razões para fazê-lo desta maneira.” Quando você está decidindo ou dizendo a alguém para seguir algumas diretrizes, você deve sempre ser capaz de justificar e explicar claramente porque seu caminho é o melhor para você. Pode não ser a melhor maneira de fazer isso objetivamente, mas se você for capaz de explicar por que é mais adequado para você, isso fará com que você pareça muito mais aberto.



## Best practices – where do they really come from?

Quando falamos sobre "melhores práticas", podemos diferenciar três casos, da seguinte forma:

**Princípios** que foram comprovados por décadas e também são deduzidos do bom senso:

- Nessa categoria, podemos encontrar, por exemplo, padrões de design. Em resumo, se você não os conhece, são ferramentas que resolvem problemas de programação recorrentes. Eles existem há décadas e são conhecidos por milhões de desenvolvedores.

**Escolhas** feitas porque tivemos que fazê-las:

- Aqui, podemos encontrar coisas como estilo de código, convenções de nomenclatura, e assim por diante. Tecnicamente, não importa se você prefere usar camelCase ou snake_case para nomear seus arquivos. Mas se todos seguirem a mesma regra, é mais fácil para todos entenderem reciprocamente.

"Melhores práticas" técnicas:

- Algumas "melhores práticas" são ditadas por restrições, recursos técnicos ou uma convenção global. Um exemplo concreto é o "adivinhamento de nome de método" em PHP. Digamos que você queira adivinhar os "getters" (acessores) e "setters" (mutadores) de um atributo de uma classe PHP.  Se cada um tiver suas próprias regras sobre a nomenclatura de getters e setters, pode ter certeza de que em algum momento, e sem aviso, as coisas vão dar errado.

## As boas práticas e os bons princípios

### Design pattern principles

Os casos de uso dos  design patterns descrevem soluções objetivas para resolver problemas.

Você pode não gostar deles e como o código está sendo organizado por eles, mas não pode dizer que eles são objetivamente ruins. Porque o seu pensamentos sobre eles não importam, eles funcionam.

### DRY

+ DRY: stands for Don’t Repeat Yourself.
+ Esse princípio simplesmente afirma que você nunca deve ter, em sua aplicação, duas autoridades fazendo a mesma coisa.

### KISS

+ KISS: stands for Keep It Simple, Stupid.
+ Muitas vezes a primeira tentativa de resolver um problema vai ser complexa, pois a sua cabeça está a mil. Para garantir que segue o KISS, reescreva de forma mais simples possível, para qualquer um entender fluxograma do que está acontecendo

### YAGNI

+ YAGNI: stands for You Aren’t Gonna Need It Tradução: Você não vai precisar disso
+ Em resumo é: Não adicione funcionalidade que você não vai usar
+ Mantenha as coisas simples e sem acréscimos supérfluos. Perdemos tempo e também complicamos nossas vidas ao pensar muito adiante. Nos afastamos de nosso objetivo inicial, que é encontrar uma solução rápida, viável e robusta. Não somos videntes e não podemos conhecer todos os problemas que surgirão se a tarefa que previmos aparecer. Você perceberá rapidamente que, se mantiver as coisas simples e sem adições supérfluas para tentar se antecipar ao jogo do próximo dia, terá uma base de código saudável e sem complicações. Isso significa uma compreensão mais rápida do código, maior facilidade para navegá-lo e fazer alterações quando realmente necessário. Além disso, você provavelmente evitará muitos erros. 
+ Sempre é complicado (senão impossível) justificar que um erro foi cometido em seu código-fonte porque você desenvolveu e gastou tempo em algo que não lhe foi solicitado. 
+ Se o seu trabalho como desenvolvedor exige colaboração direta com o cliente, você deve saber que o cliente não irá pagar por algo que não lhe foi solicitado. Você terá trabalhado de graça, o que nunca é ideal.

### SOLID

+ **S stands for single-responsibility principle (often abbreviated to SRP).**
  + Very simply, it means that a class in your code must respond to only one task. Obviously, the size of that task is the key point here. We are not talking about creating a class with only one available method. Rather, we are talking about creating a logical breakdown. 
  + A very concrete example is the model- view-controller (MVC) architecture.
+ **O stands for open/closed principle (OCP).**
  + A class must be open to extension and closed to modification.
  + Concretely, in the code, this is materialized by the strong use of polymorphism and the use of interfaces rather than by conditional branching with multiple if and else  statements.
  + Indeed, if you use conditional branching, you incur a modification of the class, and this can quickly become unmanageable if you have more than two cases. By extending a class and overloading the methods you are interested in, you get concise code, well broken up and without branching of several hundred lines.
+ **L stands for Liskov substitution principle (LSP)**
  + This principle simply says that when you use an interface implementation, you should be able to replace it with another implementation without having to modify the implementation in any way. 
  + In the code, this translates into the fact that the implementations of an interface must be similar, especially regarding the return values of the methods (if one implementation returns a string when calling the foo method and another implementation returns an object, it will be complicated).
+ **I stands for interface segregation principle (ISP).**
  + This describes that a class implementing an interface should not be forced to implement or depend on other methods of the interface that it does not use.
  + Concretely, this principle will prevent you from creating an interface with dozens
    of methods in it that are there just in case. It is better to create several interfaces (joining the principle of single responsibility), even little ones, with a very precise goal and responsibility. Then, you’ll be able to implement them unitarily in your class.
  + PHP allows a class to implement as many interfaces as we want, so this works perfectly fine. Thanks to this, the implementation we describe will only know the methods that are useful to it. Otherwise, we would end up with dozens of methods with an empty body or returning a null value. When you put it like that, you realize that it does not sound like very "clean code."
+ **D stands for dependency inversion principle (DIP)**
  + Very concretely and in the code, it materializes by using interfaces and abstraction rather than implementations.
  + For example, when you type the argument of a method, you use the interface as the type not a concrete class.
  + This will allow you to make full use of polymorphism and to take full advantage of Liskov substitution. By using the interface as a type, you will be able to send as an argument to the function any implementation of the interface. To give an example, if you need to send emails in an application, chances are you will create a MailerInterface interface. You will then have one implementation per mail service. By typing the argument with the interface, the method will be able to receive any implementation and use the right email service for your case.

### Scout's Principle

Uncle Bob - Deixe o código que você editou um pouco mais limpo do que quando pegou ele

## Being consistent – get results quicker

As vantagens de ser consistente, clean code:

+ Fica mais fácil de comunicar sobre o código com outros desenvolvedores se todos entenderem os princípios
+ Fica mais fácil entender e fazer verificações automáticas em time: teste unitário e CI/CD

## Teste

Os testes são em sua maioria linhas de código escritas pelos desenvolvedores. Esses testes garantem que, para determinados dados de entrada, um resultado específico seja retornado. Essas entradas e saídas (I/Os) podem ser de diversos tipos e tamanhos. Podem ser um número inteiro, uma página HTML gerada ou até mesmo uma imagem. Para facilitar as coisas e simplificar o conceito, os testes automatizados são geralmente agrupados em três famílias principais, da seguinte forma:

Tipos de testes

- **Testes unitários**, os testes com a menor granularidade. Eles geralmente avaliam o retorno dos métodos no código, ignorando tudo o que os envolve. O que importa é o resultado retornado pela função, e isso é tudo.
- **Testes funcionais** têm uma granularidade média. Eles avaliam funcionalidades completas, aonde várias partes e métodos podem estar envolvidos. O exemplo mais óbvio é o teste de uma interface de programação de aplicativos (API): verificamos se, ao chamarmos uma URL específica com parâmetros específicos na solicitação, a API retorna o resultado esperado.
- **Testes end-to-end (E2E)** são os mais complexos de manter. Esses testes geralmente simulam um navegador da web controlado automaticamente. Um exemplo clássico é o teste de um formulário de login. Um robô preencherá automaticamente os campos, clicará no botão e garantirá que...

Vantagens de ter testes

Quando sua cobertura de testes é boa o suficiente (a proporção de linhas de código e recursos cobertos por um ou mais testes), você pode modificar quase qualquer coisa e ter certeza de que nunca quebrará nada se os testes estiverem sempre verdes. De fato, você pode quebrar funcionalidades para reescrevê-las de forma diferente e testar novas maneiras de fazer as coisas. Desde que os testes estejam verdes, você pode ter certeza de que a aplicação se comporta corretamente, como antes de suas modificações. Claro, várias coisas entram em jogo.

### TDD

TDD significa desenvolvimento orientado a testes (Test-Driven-Development). 

É uma metodologia que consiste em escrever testes antes de escrever o restante do código. Trata-se de pensar para trás e questionar nossos hábitos de pensamento, mas o princípio é bastante trivial. 

1 - Primeiro, pensamos nos testes, ou seja, nos dados que vamos enviar (para nossos métodos em testes de unidade, para um endpoint de API no caso de testes funcionais e assim por diante), bem como na saída que queremos (um objeto ou valor preciso em testes de unidade; um retorno preciso de JavaScript Object Notation (JSON), por exemplo, no caso de um teste funcional de API). 

2 - Obviamente, porque você ainda não escreveu o restante do código, todos os testes falham. Isso é intencional. 

3 - O objetivo agora é fazer com que esses testes fiquem verdes um por um.

**Se você experimentar essa prática, perceberá que uma espécie de mágica acontece sem nem perceber. Você organizará seu código de uma forma que nunca teria feito no começo. Ele será recortado de maneira clara e precisa para que seus testes passem da forma mais rápida e fácil possível. Além da excepcional satisfação intelectual resultante, você terá um código instantaneamente mais legível e limpo.** Além disso (e ao contrário da crença e intuição generalizadas), os desenvolvimentos serão muito mais rápidos. Existe sim um período de adaptação para ficar bem natural, e você pode ter a impressão de ser terrivelmente lento no começo. No entanto, graças a isso, seu código é mais simples e, portanto, mais rápido de escrever, entender, adaptar e estender. Você tem que experimentar para experimentar isso, pois pode soar um pouco milagroso. E realmente é de alguma forma.

Além disso, **a cobertura do código se torna cada vez mais extensa à medida que você desenvolve.** Isso tem um impacto direto na manutenção da sua aplicação, como já dissemos: **você terá muito mais segurança para alterar seu código, assim como todas as pessoas que terão que lê-lo e modificá-lo. Os testes estarão lá para protegê-lo. Como um bônus, os testes de leitura podem ser inestimáveis para entrar no código complexo. Ao ler os testes, você pode entender pelas I/O fornecidas para onde o desenvolvedor que escreveu os testes estava pensando.** Isso não tem preço na grande maioria dos aplicativos, principalmente os legados. Além disso, muitos desenvolvedores estão olhando para os testes em primeiro lugar ao revisar seu código. É um ponto de entrada incrível ao entrar na alteração de alguém na base de código. Veja seus testes como a única maneira de provar que o que você acabou de fazer realmente funciona. Esta é uma realidade: a maioria dos desenvolvedores sensíveis ao código limpo e afins consideram os testes como a única prova valiosa de que suas alterações funcionam.

Pode-se notar, por exemplo, que para a maioria (se não todos) os projetos de código aberto, como PHP, você deve adicionar testes ao fazer alterações. Seja para adicionar um novo recurso ou corrigir um problema, os testes serão obrigatórios e suas alterações nunca serão aprovadas sem testes. Esses testes serão, mais uma vez, provas irrefutáveis do comportamento do seu novo recurso ou de que você realmente corrigiu o bug em questão. Tudo isso dá muito trabalho, mas com isso instalado, a cobertura do código torna-se enorme e você contribui totalmente para a estabilidade do software.

O teste é inestimável, tanto pela qualidade do seu código quanto pela velocidade com que você obtém resultados. Graças a ele, você será consistente e obterá resultados mais rapidamente.

**Vantagens de fazer TDD mencionadas no texto: (Gerado pelo ChatGPT lendo o trecho acima)**

1. **Organização do código:** o desenvolvedor organiza o código de maneira clara e precisa para que seus testes passem da forma mais rápida e fácil possível. Isso resulta em um código mais legível e limpo.
2. **Desenvolvimento mais rápido:** apesar do período de adaptação inicial, os desenvolvimentos se tornam mais rápidos, pois o código é mais simples e, portanto, mais rápido de escrever, entender, adaptar e estender.
3. **Cobertura extensiva do código:** a medida que os testes são desenvolvidos, a cobertura do código se torna cada vez mais extensa, o que tem um impacto direto na manutenção da aplicação, fornecendo mais segurança para alterar o código.
4. **Testes como prova valiosa:** os testes são a única maneira de provar que as alterações funcionam e, portanto, são uma prova valiosa para os desenvolvedores sensíveis ao código limpo e afins.
5. **Contribuição para a estabilidade do software:** com a instalação de testes, a cobertura do código se torna enorme e o desenvolvedor contribui totalmente para a estabilidade do software.
6. **Leitura de testes:** os testes de leitura podem ser inestimáveis para entrar no código complexo, permitindo que o desenvolvedor entenda pelas I/O fornecidas para onde o desenvolvedor que escreveu os testes estava pensando.
## Summary

Acabamos de ver muitos novos conhecimentos juntos. Se você entender, pode ter certeza de que já é um desenvolvedor melhor do que no capítulo anterior.

Conhecer os princípios SOLID é um verdadeiro trunfo no mundo profissional e na qualidade industrial projetos. Mesmo que cada caso seja um caso e cada projeto tenha suas especificidades, esses princípios têm a vantagem de serem aplicáveis em quase todos os lugares, e pelo menos de serem muito fortemente inspirados por eles.

Ter em mente os princípios KISS, DRY e YAGNI permitirá que você mantenha os pés no chão e não se espalhe muito nos próximos desenvolvimentos. Eles enfatizam pensar no momento presente para ajudar a preparar o futuro, em vez de pensar no futuro para tentar se adaptar ao momento presente. Você definitivamente deve se lembrar disso. Não sabemos os constrangimentos futuros que nos vão ser impostos, sejam eles técnicos ou funcionais, pelo que faz mais sentido pensar em como facilitar a gestão desses constrangimentos do que adivinhá-los. Porque, convenhamos: temos muito poucas chances de acertar na mosca.

Se você tiver a oportunidade e a possibilidade, implementando o “princípio dos escoteiros” em um TDD estratégia pode ser mais do que benéfica e sempre será uma excelente ideia. Se você nunca praticou TDD, e apesar das explicações dadas neste capítulo, é normal ter dúvidas sobre sua utilidade e, principalmente, sobre sua eficácia. Isso é normal, e todos nós já passamos por isso. No entanto, os resultados estão aí, e os vários estudos de caso realizados sobre o assunto demonstram isso drasticamente. Talvez seja hora de testar esse jeito de fazer as coisas, que é muito bem visto e apreciado pelos veteranos do código limpo!

Apesar de tudo isso, devemos ter em mente que o código limpo também é uma adaptação ao seu ambiente. Não se trata de reescrever totalmente o aplicativo e mudar todos os hábitos da equipe de desenvolvimento sob o pretexto de que alguém de fora do projeto decidiu fazê-lo. Você deve estar ciente de seu contexto e lidar com seu ambiente. Você deve ser capaz de se adaptar à necessidade e ao que está ao seu redor. É isso que fará de você um bom “clean-coder”. propor várias soluções, bem como as vantagens e desvantagens de cada uma.

Depois de toda essa teoria, podemos passar para uma parte um pouco mais prática. Quais são as maneiras de escrever código limpo? Qual é o propósito do código? Embora tenhamos visto alguns princípios avançados, não devemos esquecer os básicos, e também devemos questionar o que já sabemos.



## Meu resumo:

Fala sobre principlios: DRY KISS, YAGNI, Scout - Bom Escoteiro, Design Patterns, SOLID, a improtancia de testes e TDD

The Boy Scouts have a rule: “***Always leave the campground cleaner than you found it”\***.
