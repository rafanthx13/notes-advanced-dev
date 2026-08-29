# Clean Architecture

## Observações gerais

+ As vezes referenciado como CA = **C**lean**A**rchitecutre

## Clean Architecture by ChatGPT

> O que é clean Architecture (ChatGPT)

A "Clean Architecture" (Arquitetura Limpa) é um conceito proposto pelo renomado engenheiro de software Robert C. Martin, também conhecido como "Uncle Bob". Trata-se de um padrão de arquitetura de software que visa criar sistemas mais escaláveis, sustentáveis e testáveis, ao mesmo tempo em que promove a manutenção e a evolução do código de forma mais eficiente.

A ideia fundamental por trás da Clean Architecture é a separação clara de preocupações em camadas distintas, cada uma com sua responsabilidade bem definida. Geralmente, essas camadas incluem:

1. **Entidades**: Representam os objetos de negócio do sistema, independentes de qualquer detalhe de implementação. Essas entidades encapsulam as regras de negócio da aplicação.

2. **Casos de Uso (Use Cases)**: Também conhecidos como Interactors, são as operações específicas que o sistema pode realizar. Eles orquestram as interações entre as entidades e as camadas externas, implementando as regras de negócio e manipulando a lógica da aplicação.

3. **Interfaces do Usuário (UI)**: Esta camada é responsável por lidar com a entrada e saída do sistema, seja por meio de interfaces gráficas de usuário, interfaces de linha de comando, APIs REST, entre outros.

4. **Interface de Dados**: É a camada responsável por lidar com o armazenamento e a recuperação de dados. Isso pode incluir acesso a bancos de dados, chamadas a APIs externas, entre outros.

A arquitetura limpa preconiza que cada camada deve depender apenas das camadas internas e não de detalhes de implementação das camadas externas. Isso permite que as camadas internas sejam facilmente testáveis e substituíveis sem afetar as camadas externas, proporcionando maior flexibilidade e manutenibilidade ao sistema.

Além disso, a Clean Architecture promove o princípio de inversão de dependência (Dependency Inversion Principle), no qual os módulos de alto nível não devem depender de módulos de baixo nível, mas sim de abstrações. Isso promove a modularidade e a extensibilidade do sistema.

Em resumo, a Clean Architecture é uma abordagem para o design de sistemas de software que enfatiza a separação de preocupações, a testabilidade, a manutenibilidade e a flexibilidade, resultando em sistemas mais robustos e de fácil evolução ao longo do tempo.

## Clean Architecture (Arquitetura Limpa) // Dicionário do Programador

Link: [Clean Architecture (Arquitetura Limpa) // Dicionário do Programador]( https://www.youtube.com/watch?v=ow8UUjS5vzU&ab_channel=C%C3%B3digoFonteTV)

5 coisa que devem possuir:

+ Independência de framework
+ Independência da interface do usuário
+ Independência do banco de dados
+ Independência de qualquer elemento externo
+ Testabilidade
  - As regras de negócios podem ser testadas sem depender de nada externo.

  OBS:
  + Regras de negócios jamais devem ser implementadas na interface do usuário

  Entities
  + Não apenas o Model do php. Nle deve haver operações e regras de negócio cruciais para o próprio objeto

  UseCases (Service)
  + Se comunica com Entities, a entities só pode ser acessada a partir de um UseCase

  Controller, Repositories e Presenteres

  Camada mais externa: Web/Banco/Frameworks

Observações:
+ Nada das camadas de fora deve afetar as de dentro
+ independente de qualquer coisa, tem que usar muito interface

Eles dão um exemplo usando php para um projeto que tenha a entity Colaborador

Entity:

Seria :
+ Entity: Colaborador.php = Uma classe simples com atributos, getters e setters
+ UseCaseIntercace: (UseCaeInterface.php)
  - No construtor recebe um repositoryIntercace
  - Funções: search, findAll, store, delete
+ Service
  - implements UseCaseIntercae
  - Implementar usando funções do repository
+ RepositoryInterface 
  - É uma interface mas na verdade chamados de Adapter, pois especifica o que deve ser feito
  - Na verdade a parte de ports/adapters tem haver com isso, usar interface para garantir que as coisas vão ser feitas de forma que imaginamos
+ DatabaseRepository
  - implements RepositoryInterface
+ Controller
  - Também implement ControllerColaboradorInterace
  - no seu construtor teve um useCase service

Meu resumo: Pelo que entendi, seria usar muitíssima interface para tudo

## Clean Architecture com PHP com Kilderson Sena // Live #89

link: [Clean Architecture com PHP com Kilderson Sena // Live #89 - 2h37min](https://www.youtube.com/watch?v=-ndPt1Cc1l4&ab_channel=RodrigoBranas)

**00 - start (fala mais de si)**

**6min - começa a falar da história do php**
+ O Kilderson Sena já pegou o php 3 e conhece pessoalmente o criador do php
  - Em php5 que veio a orientação a objeto
+ O nome Zend vem da fusão dos nomes dos criadores

**29 min - Falando sobre como é o php hoje e causa comunidades**
 - A SJ/Node tem baixa granularidade, ou seja, é um empilhamento de frameworks para fazer as coisas enquanto que frameworks php costumam ser mais completos
 - Principais frameworks: laravel, cakephp e condenite (um pouco antigo)
   - Laravel, CodeIgniter , Symfony, Laminas, Cake, Yii entre outras dezenas.
   - MicroFramework: Slim

**33min - Porque o laravel é tão abraçado pelo mercado?**
+ Marking mais o foco na experiência do desenvolvedor (developer experience)

**35 min - Porque estudar arquitetura de software?**
- Para você não chegar no seguinte caso: ter que programar para resolver problema de framework
- É pra isso que surgiu o Clean Arch é: deixar as decisões de frameworks/banco de lado e se preocupar com a regra de negócio que é não depende de nada, pois o propósito é resolver problemas.
- Tio Bob afirma que banco de dados (ou até mesmo as tabelas) são só um detalhe. Isso quebra o paradigma. Lembre-se na neppo, a primeira coisa que agente pensava era no banco de dados, onde vai ser e o modelo de entidade e relacionamento das tabelas o SQL. 
  * Como desenvolvedor amador: você pensa em tudo externo e depois o código. Agora, como desenvolvedor sênior o correto é pensar na mentalidade de Clean Arch: você foca nas Entities
- A importância dos testes: Ao fazer testes você pensa:
  - Qual a entrada, a saída e com quem você vai ter que se comunicar para fazer os testes. É uma api externa, são muitas coisas?
- A ideia do clean arch é pensar em tudo ser um detalhe exceto a regra de negócio
- Na live falam de scream architecture: É quando as pastas denotam o tipo de coisa que faz:
  - Ex: ao abrir um projeto, só de olhar as pastas,você sabe o que o software faz (scream architecture- algo bom) ou o schema de pastas indica se é spring/laravel/nest ... (aí é ruim, pois está acoplado à framework)

- Como amador, Quando você começa uma nova features você faz o seguinte: rota da api > controller > service > repository > model. Perceba que  você focou em coisas externas, no caso,  chamada de API. Isso não é clean arch. Você está começando com framework ao invés de se preocupar com regra de negócio. Por isso fica difícil fazer TDD, pois você cria código acoplado a esses detalhes

- Clean Arch não é mudar o nome das pastas, é sim sobre a lógica do processo desde a entrada para a saída

**51min - Estado do php hoje em dia**
+ php todo ano falam que vai morrer, mas muita empresa grande (picPay e governo da espanha) usam e estão satisfeitas com php e como está o php hoje
-tudo que vai pro mainstream vira vidraça, por isso falam mal de java,php e js
+ hoje em dia, a cada versão do php ele está chegando o melhor de outras linguagens e colocando pra dentro de si. Exemplo; o tipo readonly do typescript agora tem em php
+ php não tem restrição para fazer clean arc

**58min - porque a pessoa tem que adotar clean arc**
+ tio bob SUGERE (NÃO É RECEITA DE BOLO É APENAS ABSTRAÇÃO) 4 camadas (o convidado fala que às vezes usa só 2 ou 3, juntando algumas cosias)
+ Qual o objetivo: DESACOPLAR AS REGRAS DE NEGÓCIO DE QUALQUER OUTRA COISA EXTERNA
  - O QUE GANHA: 
    * FICA MAIS FÁCIL TESTAR;
    * FICA MAIS FÁCIL TOMAR DECISÕES DE FRAMEWORKS; 
    * FICA MAIS FÁCIL TROCAR AS COISAS
    * FICA MAIS FÁCIL TESTAR (POR CAUSA DO BAIXO ACOPLAMENTO)
  - Assim evita as seguintes situações:
    - Mexo numa coisa e estraga outra
    - Ex: o gn3 onde tudo é misturado (regra, front, acesso ao banco e etc  nada desacoplado)
+ A ideia é: ter um foco no domínio e depois preencher com os detalhes: framework, api rest ou grcp, qual o banco e etc..
+ DDD não é clean arch nem concorrente. Os dois se comunicam muito bem. DD é uma forma de comunicação que leva um pouco ao CA

**1h1 - Entity**
+ Nas entities tem as regras de negócio:
  - Nelas tem as regras que existem independente de a aplicação existir ou não
  - Ex: numa locadora ahá a ação de verificar se o dvd está em atraso ou não, por exemplo
  - A entity é o de mais alto nível, e ela não deve depender de ninguém e de nada externo
  - O convidado usa Entre e Use Case juntos, isso não é certo nem errado desde que codifique direito, pois tudo isso é pura abstração
+ Uma grande dificuldade é separar essas duas cosias: regra de negócio independente e a da aplicação
+ Olhando a imagem das 4 camadas, quem tá dentro não sabe quem tá fora. Ente não pode fazer nada de Use Case
+ OBS: Gateway é qualquer coisa externa, no caso é o Repository. É quem no tio bob o equivalente do gateway é repository

A grande sacada é: DESACOPLAMENTO: ISSO PERMITE TROCARAM COISAS E TRATAR MELHOR. Você pensa que nao vai trocar nada mas, quando torar, você vai ver a dor de cabeça que vocÊ vai ter

**1h28min - O que é Model e o que é enfeite, classe anêmica e ORM**
+ Uma entidade 'pedido' pode ter 10 timbales por debaixo. Não dá pra abstrair como um único ORM
+ É mhleor estudar antes o DD pois ele trata melhor essa parte do ORM em relação com o banco
+ OBS: projeto pequenos podem evoluir, pense nisso ao não adotar um modelo arquitetural

**1h38min - mostra o código de clean-arch-php summit**
+ Feito em tdd (testa primeiro e codifica depois)
+ Neste código tem:
  - Testes de integração e de unidade 
+ É mais interessante começar de dentro pra fora, ou seja, começar pelas entities
+ Olhe as pastas em 1h42min
+ Para respeitar o Clean Arch, é importante criar DIREITOS para assim ficar livre das coisas. Em 1h48min eles falam que: não se deve, por exemplo, voltar uma entidade pro controller, pois se um muda o outro de 2 camadas de distância deveria mudar também.
+ O DTO evita acoplamento: **O QUE VOCÊ RECEBE/RETORNA ESTÁ MAIS RELACIONADO COM DTOs do que com Models/entities**
+ É recomendável não ter validação em DTOs
+ não tenha números mágicos, referência constantes declarada com nome auto-explicativo
+ falta de collection é um crime, e é tão básico 

**2h24min - Como estudar**
+ Tem Que ter a mentalidade de desconstrução, pois você já tá na cabeça que tudo é acoplado
+ livro arquitetura limpa (boa tradução)
+ Depois disso, faça uma POC gradual
+ Curso do Branas

### Comentários do ao vivo
+ Hoje em dia a galera trocou Apache por Swoole, Branas
+ Hoje é Nginx + FPM
+ João Paulo : Tem uma palestra muito boa do Rasmus que ele cita que o PHP 7 contribui até pro meio ambiente, por conta do tamanho de energia gasto com 5 ao redor do mundo e com o 7 reduziria o gasto dessa energia gerado com o processamento, por conta da otimização.
+ Hyper > abismo > galera de Laravel e Symfony brigando
+ @Marcel dos Santos semprel daqui a pouco a gente faz com PHP usando Psalm (sonho)
+ swollen, reach php
+ Falou de Swole o @Leo Cavalcanti bebe um gole
+ PHP-DI (aprenda sobre isso, é importante); Pode também criar factory para gerar esse tanto de objetos
+ autoWire é vida

### O que estudar

+ (declare_strict_ype=1)
+ classe final
+ Estude CQRS
+ PESQUISE o que é Value Object
+ PHP-DI 

## Vamos Falar Sobre Arquitetura Limpa?

Link: [Vamos Falar Sobre Arquitetura Limpa? (18min)](https://www.youtube.com/watch?v=rgthtmWMb_w&ab_channel=Cod3rCursos)

+ A dependência é de fora pra dentro, a seta de dependência é sempre de fora pra dentro. A entity é a coisa mais pura que não faz referência a nada, e à medida que saí de lá, você é ela.
+ Regra de negócio + Use Case
  - UseCaes servem mais como integrador, eles coordenam o fluxo das regras de negócio
  - Você não replica as regras de negócio que estão no Entity no UseCase
+ Para Não haver dependências alemã das cadas usamos interfaces e também inversão de dependências

## Projetos e Resources de CleanArch

+ [Como Criar DTOs eficientes em PHP8](https://cabra.dev/2022/03/28/crie-dtos-com-pouquissimo-codigo-com-php-8-1/)
+ [Clean Arc om MicroFramework Slim](https://github.com/dersonsena/clean-arch-pokemon)
+ [Clean Arc om PHP Puro da Live](https://github.com/dersonsena/clean-arch-clash-royale-php)

## Imagens que resumem

![](https://github.com/dersonsena/clean-arch-pokemon/blob/master/docs/brainstorms/clean-arch-app-flow.png?raw=true)

![](https://cabra.dev/wp-content/uploads/2022/01/infografico_cabra.dev_-1024x576.jpg)

![](https://cabra.dev/wp-content/uploads/2022/02/photo_2021-08-17_12-10-11-1024x578.jpg)