# M.Folwer Refactoring - 02 - Principios da Refatoração

## Definindo a Refatoração

Substantivo

> **Refatoração (substantivo):** 
> 
> Uma modificação feita na estrutura interna 
> do software para deixá-lo mais fácil de compreender e menos custoso 
> para alterar, sem que seu comportamento observável seja alterado.

Verbo

> **Refatorar (verbo):** 
> 
> Reestruturar um software por meio da aplicação de 
> uma série de refatorações, sem alterar o seu comportamento 
> observável.

A refatoração está totalmente ligada à aplicação depequenos passos que preservam o comportamento, efetuando uma grande mudança por meio do encadeamento de uma sequência desses passos. Cada refatoração individual é, por si só, bem pequena, ou uma combinação de passos pequenos. Como resultado, quando estou refatorando, meu código não permanece muito tempo em um estado com falhas, permitindo que eu pare a qualquer momento, mesmo que ainda não tenha terminado o trabalho.

A refatoração é muito semelhante à otimização de desempenho, pois ambas envolvem fazer manipulações no código, as quais não modificam a funcionalidade geral do programa. A diferença está no propósito: a refatoração é sempre feita para deixar o código “mais fácil de compreender e menos custoso para alterar”. Isso pode deixar o código mais rápido ou maislento. Na otimização de desempenho, preocupo-me somente em deixar o código mais rápido, e fico preparado para ter um código final mais difícil de trabalhar caso eu realmente precise dessa melhoria no desempenho.

## Metáfora dos dois Chapéus: Refatorar x NewFeature

New Feature:

Quando acrescento uma funcionalidade, não devo alterar um código existente; estou simplesmente adicionando novos recursos. Avalio o meu progresso acrescentando testes e fazendo com que eles passem.

Refactoring:

Quando refatoro, minha meta é não acrescentar funcionalidades – apenas reestruturo o código. Não acrescento nenhum teste (a menos que eu identifique um caso que não havia considerado antes); mudo os testes somente se tiver de acomodar uma alteração em uma interface.

Sobre essa troca de funçâo:

À medida que desenvolvo um software, vejo-me frequentemente trocando de chapéu. Começo tentando adicionar uma nova funcionalidade, então percebo que isso seria muito mais fácil se o código estivesse estruturado de modo diferente. Assim, troco de chapéu e refatoro por um tempo. Depois que o código estiver mais bem estruturado, troco de chapéu novamente e acrescento a nova funcionalidade. Depois que a nova funcionalidade estiver pronta, percebo que criei o código dela de uma forma difícil de entender; assim, troco novamente de chapéu e refatoro. Tudo isso pode demorar apenas dez minutos, mas, durante esse período, sempre tenho consciência de qual chapéu estou usando e da sutil diferença que isso faz para o modo como programo.

**!!!Nâo faça as duas coisa ao mesmo tempo. Quando colocar uma nova Feature, mesmo que tenha vontade, nao refatore o código. COloque ela. Somente depois de colocala e validala voce pdoe Refatorar. QUando for refatorar, nâo pense em numha nova feautre,s coloque testes, refatore, e veja se o resultado saiu sempre do mesmo jeito !!!**

## Porque Refatorar?

+ Refatoração melhora o design do software

+ Sem a refatoração, o design interno do software se deteriora à medida que as pessoas modificam o código para atingir objetivos de curto prazo, sem compreender totalmente a arquitetura. Isso resulta na perda de estrutura do código, dificultando a visualização do design ao ler o código. Essa perda de estrutura é cumulativa, tornando cada vez mais difícil preservar o design e acelerando sua decadência. As refatorações regulares ajudam a manter o código em boa forma.

+ Refatoração deixa o software mais fácil de entender + A programação é uma conversa com o computador, onde escrevemos código para dizer ao computador o que queremos que ele faça. No entanto, muitas vezes esquecemos que outros desenvolvedores precisarão ler e entender nosso código no futuro. É importante tornar o código compreensível e legível para facilitar as alterações e evitar desperdício de tempo. A refatoração é uma prática que melhora a legibilidade do código, ajudando-o a comunicar melhor seu propósito. Essa prática não é apenas altruísta, mas também benéfica para o próprio programador, pois ajuda a evitar a sobrecarga de informações na memória e a facilitar o trabalho futuro. 

+ Refatoração me ajuda a programar mais rapidamente 

+ A refatoração ajuda a desenvolver código mais rapidamente, apesar de parecer contraintuitivo. Muitas equipes enfrentam dificuldades para adicionar novas funcionalidades em um sistema existente, devido à complexidade e falta de clareza do código. No entanto, equipes que investem em um bom design interno do software conseguem aproveitar o código existente de forma eficiente, acrescentando funcionalidades mais rapidamente. Um bom design interno permite entender facilmente onde e como fazer alterações, reduzindo a introdução de bugs e facilitando a depuração. Essa abordagem, conhecida como Hipótese da Estamina no Design, aumenta a capacidade de avançar rapidamente no desenvolvimento de software ao longo do tempo. A refatoração permite melhorar o design do código existente, mesmo quando as necessidades do programa mudam, tornando-a essencial para alcançar funcionalidades rápidas e eficientes. 

+ Quando devemos refatorar? 

+ Refatoração é algo que faço o tempo todo enquanto programo. Tenho percebido diversas formas pelas quais ela se encaixa em meu fluxo de trabalho.A Regra dos Três + Eis uma orientação que Don Roberts me deu: **Regra dos 3 strikes**: 

+ na primeira vez que fizeralgo, você simplesmente faz. 

+ Na segunda vez que fizer algo similar, você torce o nariz diante da duplicação, mas faz a duplicação, de qualquer modo. 

+ Na terceira vez que fizer algo similar, você refatora.

+ Ou, para aqueles que gostam de beisebol: três strikes, então você refatora.

## Tipos de refatoação

### Refatoração preparatória – facilitando o acréscimo de uma funcionalidade

**A melhor hora para refatorar é logo antes de acrescentar uma nova funcionalidade na base de código**

Quando faço isso, observo o código existente e muitas vezes percebo que, se ele estivesse estruturado de modo um pouco diferente, meu trabalho seria bem mais fácil

### Refatoração para compreensão: deixando o código mais fácil de entender Antes de alterar um código, devo entender o que ele faz. Esse código pode ter sido escrito por mim ou por outra pessoa. Sempre que eu tiver de pensar para entender o que o código faz, pergunto a mim mesmo se posso refatorá-lo a fim de deixar essa compreensão mais aparente de forma imediata.

Faço logo a refatoração para compreensão nos pequenos detalhes. Renomeio algumas variáveis, agora que entendo o que elas são, ou divido uma função longa em partes menores. Então, à medida que o código se torna mais claro, percebo que consigo enxergar detalhes do design que eu não conseguia ver antes. Se eu não tivesse modificado o código, provavelmente nunca teria visto esses detalhes, pois não sou inteligente o bastante para visualizar todas essas alterações em minha mente. Ralph Johnson descreve essas refatorações prévias como limpar a sujeira de uma janela para que você enxergue além. Quando estou estudando um código, a refatoração me leva a níveis mais elevados de compreensão que, de outra forma, eu não teria.

### Refatoração para coleta de lixo

Uma variação da refatoração para compreensão é quando entendo o que o código faz, mas percebo que ele o faz de modo ruim. A lógica está desnecessariamente confusa, ou vejo funções que são quase idênticas e que poderiam ser substituídas por uma única função parametrizada. Há algumas contrapartidas nesse caso. Não gostaria de passar muito tempo com a atenção distante da tarefa que estou fazendo no momento, mas também não quero deixar lixo espalhado pelo código atrapalhando futuras alterações. Se for uma modificação simples, faço-a de imediato. Se exigir um pouco mais de esforço para corrigir, posso tomar nota dela e fazer a correção quando terminar minha tarefa imediata.

Conforme diz o velho ditado sobre acampamentos, sempre deixe o local mais limpo do que estava quando você o encontrou. Se eu deixar o código um pouco melhor a cada vez que passar por ele, com o tempo ele estará corrigido.

### Refatorações planejadas 

As 3 refatorações anteriores são chamadas de oportunitas, eu refatorao para adiconar uma nova feature.

Por muito tempo, as pessoas pensavam na escrita de software como um processo de acréscimo: para adicionar novas funcionalidades, na maioria das vezes deveríamos acrescentar um novo código. Bons desenvolvedores, porém, sabem que, muitas vezes, o modo mais rápido de adicionar uma nova funcionalidade é alterar o código para facilitar a adição. Desse modo, o software jamais deveria ser pensado como algo “pronto”. À medida que novas funcionalidades são necessárias, o software muda para refletir isso. Essas alterações, com frequência, podem ser maiores no código existente do que no código novo.

Tudo isso não significa que uma refatoração planejada seja sempre errada. Às vezes, mesmo com refatorações constantes, posso ver uma área de problema crescer até o ponto em que seja necessário um esforço orquestrado para corrigi-la. Porém, episódios de refatoração planejada como esses devem ser raros. A maior parte do esforço de refatoração deve ser do tipo não planejado e oportunista.

Um pequeno conselho que ouvi é separar o trabalho de refatoração e deacréscimos de novas funcionalidades em dois commits diferentes no sistema de controle de versões. A grande vantagem disso é o fato de eles poderem ser revisados e aprovados de forma independente. 

 ### Refatoração de longo prazo

A maioria das refatorações pode ser feita em alguns minutos – no máximo, em algumas horas. No entanto, há esforços para algumas refatorações maiores que podem exigir semanas de uma equipe para terminar.

Situaçoes em que a refatoração dedemoraria muito:

Talvez seja necessário substituir uma biblioteca existente por uma nova. Ou extrair alguma seção de código e colocá-la em um componente que possa ser compartilhado com outra equipe. Ou corrigir alguma confusão terrível com dependências que eles permitiram que surgisse.

### Refatorando em CodeReview

As revisões de código são importantes para disseminar conhecimentos e melhorar a compreensão de um sistema de software. Elas ajudam a escrever um código claro e permitem que mais pessoas contribuam com ideias úteis. A refatoração durante as revisões de código ajuda a revisar o código de outra pessoa e a obter resultados concretos. É preferível ter o autor original do código presente durante a revisão, para explicar o contexto e apreciar as intenções dos revisores. A programação em pares é uma forma de revisão de código contínua incorporada ao processo de programação.

## Quando não devo refatorar?

+ Se eu deparar com um código confuso, mas que não precisa ser modificado, não terei de refatorá-lo. + Alguns códigos feios que eu possa tratar como uma API podem permanecer feios. + A refatoração me trará alguma vantagem somente se eu precisar entender como o código funciona. Outro caso é aquele em que é mais fácil reescrever o código do que o refatorar.

## A importância dos testes

A refatoração é uma técnica de melhoria do código que não altera o comportamento observável do programa. No entanto, erros podem ocorrer durante a refatoração, e é crucial identificá-los rapidamente.

Para identificar rapidamente os erros, é necessário executar um conjunto abrangente de testes no código de forma rápida e frequente. Isso é especialmente importante ao realizar refatorações. Ter um código autotestável é essencial para realizar as refatorações com segurança. O código autotestável permite localizar e corrigir rapidamente qualquer bug introduzido, pois é possível analisar as modificações feitas entre a última vez que os testes estavam executando corretamente e o código atual.

## Refatoraçao em sistemas legados

A refatoração é uma ferramenta valiosa para entender e melhorar sistemas legados. No entanto, a falta de testes é um desafio comum. Adicionar testes é a solução óbvia, mas na prática pode ser complexo. É recomendado o livro "Trabalho eficaz com código legado" como guia para lidar com essa situação. O livro sugere encontrar pontos-chave no código para inserir testes, mesmo que isso envolva riscos. Refatorações seguras e automatizadas podem ajudar nesse processo. Lidar com o sistema em partes relevantes é preferível a tentar refatorar tudo de uma vez. A abordagem é melhorar gradualmente as seções de código que são frequentemente visitadas, para obter recompensas maiores em termos de compreensibilidade.

## Outras leituras Importantes

Pode parecer um pouco estranho falar sobre outras leituras já no segundo capítulo, mas este é um local tão bom quanto qualquer outro para enfatizarque há outros materiais por aí sobre refatoração que vão além do básico que está nesta obra.

Este livro ensinou refatoração a muitas pessoas, mas meu foco está mais voltado em apresentar uma referência para a refatoração do que em conduzir os leitores no processo de aprendizado. Se você estiver procurando um livro como esse, sugiro a obra **Refactoring Workbook [Wake] de Bill Wake**, que contém muitos exercícios para praticar a refatoração.

Muitos dos que foram pioneiros na refatoração também eram ativos na comunidade de padrões de software. Josh Kerievsky aproximou bastante esses dois mundos com o livro **Refatoração para padrões [Kerievsky]**, que descreve os padrões mais importantes do extremamente influente livro da “Gangue dos Quatro” [gof] e mostra como usar a refatoração para evoluir em direção a eles.

Este livro tem como foco a refatoração na programação de propósito geral, mas ela também pode ser aplicada em áreas especializadas. Duas obras que receberam bastante atenção são **Refactoring Databases [Ambler & Sadalage]** **(de Scott Ambler e Pramod Sadalage) e Refatorando HTML [Harold] (de** **Elliotte Rusty Harold).**

Embora não tenha refatoração no título, também vale a pena incluir **Trabalho eficaz com código legado de Michael Feathers [Feathers],** que é um livro essencialmente sobre como pensar em refatorar uma base de código antiga com uma cobertura de testes precária.

Apesar de este livro (e seu antecessor) estar voltado para programadores de qualquer linguagem, há lugar para livros de refatoração em linguagens específicas. Dois de meus antigos colegas, Jay Fields e Shane Harvey, fizeram isso para a linguagem de programação Ruby [Fields et al.]. Para um conteúdo mais atualizado, consulte o representante deste livro na web, bem como o site principal sobre refatoração: refactoring.com [ref.com]. 
