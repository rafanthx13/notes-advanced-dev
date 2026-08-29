# 05 - Optimizing Your Time and Separating Responsibilities

## O que será estudado

+ Convenções de nomes
+ O porquê é importante separar as responsabilidades, o princípio S do SOLID
+ Descobrir maneiras elegantes de separar um evento no sistema
+ Ver polimorfismo: classes abstratas, herança, interface, e como usá-los

## Naming and organizational conventions

### Class files and interface files


Em PHP, é bom que o nome do arquivo seja o mesmo nome da classe.

Exemplo: a classe `Foo` deve ser definida no arquivo `Foo.php`.

É importante, pois o ``autoloading`` do PHP espera isso dos arquivos/classes que for ler.
+ Autoloading é uma forma do PHP descobrir as classes a serem usadas no sistema e carregalas de uma vez só, e eles esperam que tenham o esmo nome o arquivo e a classe

**É usado PascalCase para Nomes de Classe**

### Executables


Script executáveis são definidos no padrão **kebab-case**: tudo minúsculo e separando com hífen pois, como executável, essa nomenclatura é ideal para chamar os arquivos no prompt/CLI

### Web assets and resources

É preferível o kebab-case para arquivos CSS e HTML. Pois, é mais fácil acessar e ver em chamadas de URL "/contact-us" do que "/contactus" ou "/ContactUs". É importante usar isso no front-end.

### Naming classes, interfaces, and methods

Classes abstratas devem começar com *Abstract* exemplo *AbstractMailer*

Interfaces devem Terminar com Interface. Exemplo: MailerINterface

Não se preocupe com nome grande, como uma IDE ele faz o autocomplete.

**Métodos e Atributos de classes são camelCase**

### Naming folders

+ Convenções de nomenclatura para pastas: É recomendado usar **PascalCase** para nomear pastas. No entanto, para pastas expostas publicamente, como recursos da web, outros estilos de nomenclatura também podem ser usados.

+ Evite nomes genéricos para pastas: nomes como "Manager", "Service" ou "Wrapper" devem ser evitados, pois são muito genéricos e não fornecem uma compreensão fácil do que eles definem. É preferível usar variantes mais explícitas, como "Mail" e suas subpastas "Provider" e "Logger".

+ Use pastas para separar seu código-fonte em diferentes domínios: uma maneira inteligente de se orientar é usar pastas para separar o código-fonte em diferentes domínios. Isso ajuda a dividir melhor a aplicação e torna a arquitetura mais clara. Elementos relacionados ao mesmo tema estarão no mesmo local, o que aumenta a eficiência.

+ Dê nomes significativos e claros: Ao nomear elementos como classes, arquivos, variáveis, etc., é importante encontrar um nome que seja claro e significativo. Evite a tentação de usar um nome vago com a intenção de alterá-lo posteriormente, pois isso pode levar a dívidas técnicas e dificuldades futuras.

## Separating responsibilities

A separação de responsabilidades no código tem como objetivo torná-lo mais limpo, compreensível, sustentável e extensível. Isso é o que o primeiro princípio do SOLID preconiza. No capítulo anterior, vimos o princípio da responsabilidade única, que estabelece que uma classe deve ser responsável por apenas uma tarefa.

SOLID é um conjunto de regras conhecidas de código limpo que, quando aplicadas em conjunto, tornam o código mais claro e preciso. Em vez de seguir à risca os cinco princípios descritos por cada letra do SOLID, é mais importante ter uma ideia global desses princípios em mente ao programar.

O primeiro passo para respeitar esse princípio é a nomenclatura, como vimos anteriormente. Ao nomear uma classe de forma adequada, clara e precisa, garantimos que ela não se torne confusa, com uma mistura de várias funcionalidades. Por isso, é importante evitar nomes genéricos para os métodos, como "Manager" e "Service". Essa prática evita que uma classe como "EmailManager" se torne um repositório de métodos relacionados ao gerenciamento de e-mails, o que pode levar ao caos. Em vez disso, é preferível criar classes como "EmailFactory" e "AbstractEmailSender" para evitar classes com centenas de métodos diferentes.

Entendemos melhor o princípio da responsabilidade única. O objetivo não é criar classes com apenas um método. Isso não faz sentido. É preciso dividir as responsabilidades de forma inteligente. Não há uma regra geral para dividir classes. A maneira correta de dividir uma classe virá naturalmente com a experiência e surgirá por si só. Podemos ver as pastas como domínios e os arquivos como subdomínios. Por exemplo, podemos ter um domínio (ou pasta) chamado "Email" e subdomínios dedicados a tarefas específicas, como criar um e-mail, definir uma classe base para enviar um e-mail com um provedor específico, entre outros. Podemos ir ainda mais longe nessa separação de responsabilidades. 

## Demystifying polymorphism – interfaces and abstract classes

Nessa parte ensina sobre polmorfismo: interface a classe abstratas

interfaces são contratos, em que você garante que quem implementa a interface vai ter aqueles métodos. É uma forma de definir um shap para uma classe

classe abstrata é um passo mais baixo, entre interface e implementação. Permite um comportamento default para quem a extendé-la

##  Summary

Acabamos de abordar a parte mais avançada da seção teórica deste livro. Agora estamos armados com o conhecimento para escrever nosso código de forma limpa, mantendo-o sustentável e extensível para futuros desenvolvedores. Também estará preparado para o futuro, sendo fortemente aberto para extensões e fechado para modificações (conforme descrito em um dos princípios SOLID).

Revisamos muitos casos que você pode encontrar ao nomear arquivos, classes e métodos ao desenvolver uma aplicação PHP. Além disso, vimos que as pastas devem ter nomes específicos e podem ser usadas para dividir sua aplicação em diferentes domínios.

A separação de responsabilidades também foi um tópico importante. É especialmente importante entender por que essa separação é útil, até vital, em um projeto. É a chave real para um projeto bem arquitetado e fácil de navegar. O despacho de eventos é uma excelente maneira de alcançar isso, como vimos. O despacho de eventos é um dos fundamentos de projetos web críticos, como o framework Symfony, apenas para citar um exemplo. Esse framework depende muito desse mecanismo, tornando-se uma ferramenta conhecida por sua robustez, eficiência e, especialmente, flexibilidade. Isso também é devido ao polimorfismo e às diferentes interfaces declaradas nele. Você pode redeclarar praticamente qualquer parte do framework graças a isso e adaptar tudo às suas necessidades mais avançadas.

## Meu Resumo

O principal desse capítulo é: Fala sobre padronizar como nomear  as coisas em projetos PHP.

+ Classes: são escritas em PascalCase, e, tanto seu nome quanto seu arquivo (PascalCse.php);
+ Script php executáveis: kebab-case
+ Web asserts e resources: kebab-case (bom para ler em url)
+ Classes abstratas: prefixo "Abstract"
+ Interfaces: sufixo Interface, exemplo: MailerINtercace
+ Atributos e métodos camelCase
+ Nomes de pasta, primeira letra maiúscula
