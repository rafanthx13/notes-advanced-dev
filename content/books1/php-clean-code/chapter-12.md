# 12 - Working in a Team

## Intro

Sempre haverá várias maneiras de realizar uma tarefa no desenvolvimento de software. Isso é o que torna mais desafiador trabalhar em equipe quando se deseja escrever um código limpo juntos. Neste capítulo, você encontrará várias dicas e melhores práticas sobre como estabelecer padrões de codificação e diretrizes de codificação.

Também falaremos sobre como as revisões de código melhorarão o código e garantirão que as diretrizes sejam seguidas. Também exploraremos o tópico de padrões de design com mais detalhes no final deste capítulo. Esses padrões podem ajudar sua equipe a resolver problemas típicos de desenvolvimento de software, pois oferecem soluções bem testadas.

Este capítulo incluirá as seguintes seções:

+ Coding standards
+ Coding guidelines
+ Code reviews
+ Design patterns

## Coding standards

O PHP em si não possui um Padrão de Codificação oficial. Historicamente, cada grande framework em PHP que existia, ou ainda existe hoje, introduziu algum tipo de padrão porque os desenvolvedores logo perceberam que utilizá-los traz benefícios.

No entanto, como cada projeto usava seus próprios padrões, o mundo do PHP acabou com uma mistura de diferentes padrões de formatação. Em 2009, quando o PHP-FIG (PHP Framework Interoperability Group) foi formado, consistindo de membros de todos os projetos e frameworks importantes em PHP daquela época, eles queriam resolver exatamente esse tipo de problema.

Naquela época, o Composer estava se tornando cada vez mais importante, e foram introduzidos pacotes que poderiam ser facilmente usados em diferentes frameworks. Para manter o código um pouco consistente, concordou-se em uma forma mútua de escrever código: as **Recomendações Padrão do PHP (PSRs)** nasceram.

Para fazer o carregador automático do Composer funcionar, foi necessário concordar em como nomear classes e diretórios. Isso foi feito com a primeira recomendação padrão, a PSR-0 (sim, os nerds começam a contar em 0), que eventualmente foi substituída pela PSR-4.

A primeira recomendação de Padrão de Codificação foi introduzida com a PSR-1 e PSR-2. A PSR-2 foi posteriormente substituída pela PSR-12, que continha regras para recursos de linguagem das versões mais recentes do PHP.

Embora a PSR-12 aborde o estilo de código, ela não abrange convenções de nomenclatura ou como estruturar o código. Isso geralmente ainda é pré-definido pelo framework que você usa. O framework Symfony, por exemplo, tem seu próprio conjunto de Padrões de Codificação baseados nas mencionadas PSR-4 e PSR-12, mas adicionam diretrizes adicionais, como convenções de nomenclatura ou documentação. Mesmo se você não usar um framework e apenas escolher componentes individuais para construir um aplicativo, você pode considerar o uso dessas diretrizes, que você encontrará no site do Symfony: https://symfony.com/doc/current/contributing/code/standards.html.

PER estilo de codificação

A PSR-12 foi lançada em 2019 e, portanto, não abrange mais os recursos mais recentes do PHP. Portanto, no momento da escrita deste livro, o PHP-FIG lançou o PER Coding Style 1.0.0 (PER é a sigla de PHP Extended Recommendation). Ele é baseado na PSR-12 e contém algumas adições a ela. No futuro, o PHP-FIG não planeja mais lançar novos Padrões de Codificação relacionados às PSRs, mas novas versões deste PER, se necessário. É muito provável que as ferramentas de qualidade de código apresentadas neste livro em breve adotem o novo PER. Você encontrará mais informações sobre ele aqui: https://www.php-fig.org/per/coding-style.

Com o tempo, o PHP-FIG introduziu mais de uma dúzia de recomendações, e outras estão em desenvolvimento. Elas abrangem tópicos como integração de registro, cache e clientes HTTP, para citar apenas alguns. Você encontrará uma

### Enforcing coding standards in your IDE

Existem várias maneiras de garantir a aderência aos padrões de codificação. No capítulo anterior, Capítulo 11, Integração Contínua, explicamos como garantir que nenhum código com formatação incorreta possa comprometer a base de código. Isso funcionou bem, no entanto, requer uma etapa adicional, mesmo que permitamos que nossas ferramentas corrijam automaticamente a formatação do código, pois precisamos commitar novamente os arquivos modificados. Portanto, não seria útil se nosso editor de código, ou IDE, nos ajudasse a formatar o código enquanto o escrevemos?

Os editores de código modernos geralmente possuem funcionalidades incorporadas que auxiliam na aderência aos seus padrões de codificação preferidos, se você os configurar corretamente. Se não estiverem incorporadas, essa funcionalidade pode ser fornecida por meio de plugins.

Existem duas maneiras básicas pelas quais seu editor pode ajudá-lo:

+ Destacar as violações dos padrões de codificação: O IDE marca as partes do código-fonte que precisam ser corrigidas. No entanto, ele não altera o código ativamente.
+ Reformatar o código: O IDE ou um plugin adicional cuida da formatação do código, por exemplo, executando um corretor de estilo de código como o PHP_CS_Fixer. Isso pode ser feito mediante solicitação manual ou sempre que um arquivo é salvo.

Reformatar o código ao salvar o arquivo é uma maneira muito conveniente de garantir que seu código atenda aos padrões de codificação. Como configurar isso depende do IDE que você está usando, portanto, não entraremos em detalhes sobre isso neste livro.

Ainda recomendamos o uso de ganchos do Git e integração contínua como uma segunda camada de verificação para garantir que nenhum código mal formatado seja enviado ao repositório do projeto. Você nunca pode ter certeza se um membro da equipe desabilitou acidental ou intencionalmente a formatação automática ou não se importou com as partes destacadas do código.

## Coding guidelines

### Como escrever alguns trechos

Padronização das seguintes coisas:
+ Como escrever classes: UpperCamelCase
+ Eventos UpperCamelCase
+ Propriedade, variáveis e métodos: lowerCamelCase
+ Testes: lowerCamelCase.
+ Traits: UpperCamelCase.
+ Interfaces:  UpperCamelCase.

### Convenção de comentários e DocBlocks

````php
/**
* @param int $property
* @return void
*/
public function setProperty(int $property): void {
    // ...
}
````

### Padronização de algumas coisas

+ `if`: Não usar `if` com `';'`
+ `else`: Se o `else` só for um `return`, evite de usar ele e coloque o return fora
+ Todo `try` deve ter um `catch`, sempre

## Code reviews

O processo de verificar manualmente o código de outros desenvolvedores é chamado de revisão de código. Isso inclui todas as alterações, ou seja, não apenas novas funcionalidades, mas também correções de bugs ou até mesmo alterações simples de configuração. Uma revisão é sempre realizada por pelo menos um colega desenvolvedor e geralmente ocorre no contexto de uma solicitação de pull (pull request), pouco antes de o código de um ramo de funcionalidade ou correção de bug ser mesclado (merged) no ramo principal. Somente se o revisor aprovar as alterações elas se tornarão parte efetiva da aplicação.

Nesta seção, discutiremos o que você deve procurar em revisões de código, por que elas são tão importantes e como devem ser realizadas para se tornarem uma ferramenta de sucesso em seu conjunto de ferramentas.

### Why you should do code reviews

Pode parecer um pouco óbvio porque todo este livro trata disso. No entanto, não pode ser enfatizado o suficiente - as revisões de código irão melhorar a qualidade do seu código. Vamos examinar mais de perto o porquê:

+ Fácil de introduzir: Introduzir revisões de código geralmente não envolve custos adicionais (exceto pelo tempo necessário). Todos os principais serviços de repositório Git, como Bitbucket, GitLab ou GitHub, possuem uma funcionalidade de revisão incorporada que você pode usar imediatamente.
+ Impacto rápido: As revisões de código não são apenas fáceis de introduzir, mas mostrarão sua utilidade logo após serem implementadas.
+ Compartilhamento de conhecimento: Como as revisões de código frequentemente levam a discussões entre os desenvolvedores, elas são uma ótima ferramenta para disseminar conhecimento sobre as melhores práticas na equipe. Naturalmente, os desenvolvedores juniores se beneficiarão enormemente do mentoring, mas até mesmo os desenvolvedores mais experientes aprenderão algo novo de tempos em tempos.
+ Melhoria constante: As discussões regulares resultarão em diretrizes de codificação aprimoradas, pois elas são constantemente desafiadas e atualizadas, se necessário.
+ Evitar problemas antecipadamente: As revisões de código ocorrem muito cedo no processo (consulte o Capítulo 11, Integração Contínua), portanto, há boas chances de que bugs, problemas de segurança ou problemas arquitetônicos sejam encontrados antes mesmo de chegarem ao ambiente de teste.

Se você ainda não está convencido dos benefícios das revisões de código, confira a próxima seção, na qual falaremos mais sobre o que as revisões de código devem abordar - e o que não devem.

### What code reviews should cover

Quais aspectos devemos verificar ao fazer revisões de código?

+ **Design do código:** O código está bem projetado e consistente com o restante da aplicação? Ele segue as melhores práticas gerais, como reutilização, padrões de design (consulte a próxima seção) ou princípios de design SOLID (consulte o Capítulo 2, Quem Decide o que são "Boas Práticas")?
+ **Funcionalidade:** O código faz o que deveria fazer ou possui algum efeito colateral?
+ **Legibilidade:** O código é fácil de entender ou muito complexo? Os comentários são necessários? A legibilidade poderia ser melhorada renomeando uma função ou uma variável, ou extraindo código para uma função com um nome significativo?
+ **Segurança:** O código introduz possíveis vetores de ataque? Todas as saídas estão escapadas para evitar ataques XSS? As entradas do banco de dados estão sanitizadas para evitar injeções de SQL?
+ **Cobertura de testes:** O novo código está coberto por testes automatizados? Eles testam as coisas certas? São necessários mais casos de teste?
+ **Padrões e diretrizes de codificação:** O código segue os Padrões de Codificação e as diretrizes de codificação acordados pela equipe?
  Sua equipe também deve considerar se testar o código em seu ambiente de desenvolvimento local deve fazer parte do processo de revisão ou não. Não há uma recomendação clara sobre isso.

### Ensuring code reviews are done

Durante o trabalho diário estressante, com correções urgentes de bugs e prazos apertados, é fácil esquecer-se de fazer revisões de código. Felizmente, todos os provedores de serviços Git oferecem funcionalidades para ajudar nesse aspecto:

+ Tornar as revisões obrigatórias: A maioria dos serviços de repositório Git pode ser configurada para permitir que as alterações sejam mescladas apenas na branch principal se receberem pelo menos uma aprovação. Você definitivamente deve habilitar esse recurso.
+ Rotacionar as revisões: Se sua equipe for maior, tente solicitar a revisão não sempre à mesma pessoa. Algumas ferramentas até permitem selecionar um revisor aleatoriamente para você.
+ Usar uma lista de verificação: As listas de verificação têm se mostrado úteis, então você também deve utilizá-las. Configure uma lista de verificação para todos os aspectos que você precisa verificar nas revisões de código. Na próxima seção, mostraremos como garantir que ela seja utilizada.

## Definition of done

````
\# Definition of Done
\## Reviewer
[ ] Code changes reviewed
    1. Coding Guidelines kept
    2. Functionality considered
    3. Code is well-designed
    4. Readability and Complexity considered
    5. No Security issues found
    6. Coding standard and guidelines kept
[ ] Change tested manually
\## Developer
[ ] Acceptance Criteria met
[ ] Automated Tests written or updated
[ ] Documentation written or updated
````

O que é incluído na lista de verificação fica a critério de você e sua equipe. Se utilizado como um modelo, esses itens sempre aparecerão na descrição da solicitação de pull por padrão. Destina-se a ser usado tanto pelo revisor quanto pelo desenvolvedor para não esquecer o que precisa ser feito antes de aprovar a solicitação de pull e mesclá-la na branch principal.

Algumas ferramentas, como o GitHub, usam uma linguagem de marcação no estilo Markdown para esses modelos. Eles exibirão os checkboxes (os dois colchetes quadrados antes de cada item) como checkboxes clicáveis no navegador e acompanharão se eles foram marcados ou não. Voilà! Sem muito trabalho, você configurou uma lista de verificação fácil de usar e útil!

### Code reviews conclusion

Esperamos que esta seção tenha fornecido boas informações sobre o quão benéficas as revisões de código podem ser para sua equipe e para você. Como podem ser introduzidas sem esforço, vale a pena experimentá-las. As melhores práticas nesta seção ajudarão você a evitar alguns dos problemas que as revisões de código podem apresentar.

No entanto, como sempre, elas também têm algumas desvantagens: as revisões consomem muito tempo e podem levar a conflitos entre os membros da equipe. Estamos convencidos de que o tempo gasto vale a pena, pois os aspectos positivos superam em muito os negativos. Os conflitos provavelmente ocorreriam de qualquer maneira, e as revisões são apenas um meio de desabafar. Isso não pode ser totalmente evitado se você trabalha em equipe, mas deve ser abordado cedo com seu gerente. É responsabilidade deles lidar com esse tipo de problema.

Na última parte deste capítulo, examinaremos os padrões de design com mais detalhes. Eles podem atuar como diretrizes sobre como resolver problemas gerais no desenvolvimento de software.

## Design patterns

Padrões de projeto são soluções comumente usadas para problemas que ocorrem regularmente no desenvolvimento de software. Como desenvolvedor, mais cedo ou mais tarde você encontrará esse termo, se ainda não o fez - e não sem motivo, pois esses padrões são baseados nas melhores práticas e comprovaram sua utilidade. Nesta seção, vamos lhe contar mais sobre os diferentes tipos de padrões de projeto e por que eles são tão importantes a ponto de se tornarem parte deste livro. Além disso, vamos apresentar alguns padrões de projeto comuns amplamente utilizados em PHP.

### Understanding design patterns

Vamos dar uma olhada mais de perto nos padrões de projeto agora. Eles podem ser considerados modelos para resolver problemas específicos e são nomeados de acordo com a solução que eles fornecem. Por exemplo, neste capítulo, você aprenderá sobre o padrão Observer, que pode ajudá-lo a implementar uma maneira de observar mudanças em objetos. Isso é muito útil quando você escreve código, mas também quando você projeta software com outros desenvolvedores. É muito mais fácil usar um nome curto para nomear um conceito em vez de ter que explicá-lo toda vez.

No entanto, não confunda padrões de projeto com algoritmos. Algoritmos definem etapas claras que precisam ser seguidas para resolver um problema, enquanto os padrões de projeto descrevem como implementar a solução em um nível mais alto. Eles não estão vinculados a nenhuma linguagem de programação.

Você também não pode adicionar padrões de projeto ao seu código como faria com um pacote do Composer, por exemplo. Você precisa implementar o padrão por conta própria e tem certa liberdade em como fazer isso.

No entanto, os padrões de projeto não são a solução única para todos os problemas, nem afirmam oferecer as soluções mais eficientes. Sempre leve esses padrões com cautela - muitas vezes, os desenvolvedores querem implementar um determinado padrão apenas porque o conhecem. Ou, como diz o ditado: "Se tudo que você tem é um martelo, tudo parece um prego".


Normalmente, os padrões de projeto são divididos em três categorias:

-   Padrões criacionais lidam com a maneira eficiente de criar objetos e, ao mesmo tempo, oferecem soluções para reduzir a duplicação de código.
-   Padrões estruturais ajudam a organizar os relacionamentos entre entidades (ou seja, classes e objetos) em estruturas flexíveis e eficientes.
-   Padrões comportamentais organizam a comunicação entre entidades, mantendo um alto grau de flexibilidade.

Nas próximas páginas, vamos dar uma olhada em algumas implementações de exemplo para explicar a ideia por trás dos padrões de projeto.

### Creational - Factory Method

Imagine o seguinte problema: você precisa escrever um aplicativo que seja capaz de gravar dados em arquivos usando diferentes formatos. No nosso exemplo, queremos oferecer suporte a CSV e JSON, mas potencialmente também a outros formatos no futuro. Antes que os dados sejam gravados, gostaríamos de aplicar algum filtro, que deve sempre ocorrer, independentemente do formato de saída escolhido.

Um padrão aplicável para resolver esse problema seria o Factory Method (Método de Fábrica). É um padrão Criacional, pois lida com a criação de objetos.

A ideia principal desse padrão é que subclasses podem implementar maneiras diferentes de alcançar o objetivo. É importante observar que não usamos o operador new na classe pai para instanciar subclasses, como você pode ver na seguinte classe:

````php
abstract class AbstractWriter
{
    public function write(array $data): void
    {
        $encoder = $this->createEncoder();
        // Apply some filtering which should always happen,
        // regardless of the output format.
        array_walk(
            $data,  function (&$value) {
                $value = str_replace(‘data’, ‘’, $value);
            }
        );
        // For demonstration purposes, we echo the result
        // here, instead of writing it into a file
        echo $encoder->encode($data);
    }
    abstract protected function createEncoder(): Encoder;
}
````




### Dependency injection (DI)

Em suma é: ao invés de instanciar classes entro de um método, passar ele por parâmetro

### Container Dependency Injection (CDI)

Provavelmente você já se perguntou como gerenciar todas as fábricas que são necessárias, especialmente em um projeto maior. Para isso, o container de injeção de dependência (DI) foi criado. Ele não faz parte do padrão DI, mas está intimamente relacionado, então queremos introduzi-lo aqui.

O container de DI atua como armazenamento central para todos os objetos que são injetados em suas classes de destino usando padrões de DI. Ele também contém todas as informações necessárias para instanciar os objetos.

Ele também pode armazenar instâncias criadas, para que não seja necessário instanciá-las duas vezes. Por exemplo, você não criaria uma instância de FileLogger para cada classe que a utiliza, pois isso resultaria em várias instâncias idênticas. Em vez disso, você preferiria criá-la uma vez e passá-la por referência para suas classes de destino.

O conceito de container de DI foi adotado em todos os principais frameworks PHP atualmente, então é provável que você já tenha usado um container desse tipo. Provavelmente você não percebeu, pois ele geralmente está oculto nos bastidores de sua aplicação e às vezes também é chamado de container de serviços.

**Container de DI**

Mostrar todas as funcionalidades de um container de DI moderno excederia este livro. Se você estiver interessado em aprender mais sobre esse conceito, recomendamos que você confira o pacote phpleague/container: https://container.thephpleague.com. Ele é pequeno, mas rico em recursos e possui uma ótima documentação que pode introduzir você a conceitos mais interessantes, como provedores de serviços ou injetores.

### Observer

....

### Anti-Patterns

#### Singleton

#### Service Locator

````php
class ServiceLocatorExample
{
    public function __construct(
        private ServiceLocator $serviceLocator
    ) {}
    public function fooBar(): void
    {
        $someService = $this->serviceLocator
          ->get(SomeService::class);
        $someService->doSomething();
    }
}
````


## Summary

Neste capítulo, discutimos a importância dos padrões e diretrizes. Os padrões de codificação ajudam a alinhar os desenvolvedores em relação à formatação do código, e você aprendeu sobre os padrões existentes que valem a pena adotar.

As diretrizes de codificação ajudam sua equipe a se alinhar na forma de escrever software. Embora essas diretrizes sejam altamente individuais para cada equipe, fornecemos a você um bom conjunto de exemplos e melhores práticas para construir as diretrizes da sua equipe. Com as revisões de código, você também aprendeu como manter a qualidade em alta.

Por fim, apresentamos a você o mundo dos padrões de projeto. Temos confiança de que conhecer pelo menos uma boa parte desses padrões ajudará você a projetar e escrever código de alta qualidade junto com os membros da sua equipe. Há muito mais a explorar nesse tópico, e você encontrará links para ótimas fontes ao final deste capítulo.

Isso quase encerra nossa emocionante jornada pelos muitos aspectos do código limpo em PHP. Temos certeza de que você agora deseja utilizar todo o seu novo conhecimento em seu trabalho diário o mais rápido possível. No entanto, antes disso, acompanhe-nos no último capítulo, quando falamos sobre a importância da documentação.

## Meu Resumo

Padronização do PHP = PSR
+ PER Coding Style 1.0.0 (PER é a sigla de PHP Extended Recommendation)baseada na PSR-12 (de 2019): Link: https://www.php-fig.org/per/coding-style
+ O PSR não define padronização de nomenclatura. Em questão de nomenclatura, pose-se usar, por exemplo, a da Symfony: https://symfony.com/doc/current/contributing/code/standards.html.

Guide Lines para o PHP
+ Como escrever classes: UpperCamelCase
+ Eventos UpperCamelCase
+ Propriedade, variáveis e métodos: lowerCamelCase
+ Testes: lowerCamelCase.
+ Traits: UpperCamelCase.
+ Interfaces:  UpperCamelCase.

DocBlocks

````php
/**
* @param int $property
* @return void
*/
public function setProperty(int $property): void {
    // ...
}
````

+ O capítulo fala sobre como fazer e a importância do Code Review

Design Patterns
+ Creational: Exemplifica o Factory Method`
+ Dependency Injection (DI) e Container Dependency Injection (CDI)
+ Behavorial - Observer
+ Anti-Patterns:
  - Singleton
  - Service Locator

## Futher Reading

+ https://google.github.io/eng-practices/review provides you with more information about the code review process at Google
+ Links úteis sobre design patterns em php
  + https://refactoring.guru/design-patterns/adapter/php/example
  +  https://sourcemaking.com/design_patterns/adapter/php
  + https://designpatternsphp.readthedocs.io/en/latest/README.html
