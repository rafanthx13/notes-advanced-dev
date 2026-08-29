# Chapter 2. Refactoring

Neste capítulo, ofereço algumas reflexões sobre o que é refatoração e o
que você precisa fazer para ser bom nisso. Este capítulo é melhor lido em acompanhamento com o capítulo "Princípios de Refatoração" 

## What Is Refactoring?

**O qu eé Refatoraçâo**: Refatoração  uma "transformação de preservação de
comportamento" ou, como Martin Fowler define, "uma alteração feita na
estrutura interna do software para torná-lo mais fácil de entender e mais
barato de modificar sem alterar seu comportamento observável" (Refactoring, MartinFolwer).

**O que é o procesos de rafatoração**: O processo de refatoração envolve a remoção da duplicação, a
simplificação da lógica complexa e o esclarecimento do código
obscuro. Ao refatorar, você incansavelmente cutuca e estimula seu
código para melhorar seu design. Essas melhorias podem envolver
algo tão pequeno quanto alterar o nome de uma variável ou tão
grande quanto unificar duas hierarquias.

**Com garantir que a refatoraçâo nao quebrre nada?** Para refatorar com segurança, você deve testar manualmente se suas
alterações não quebraram nada ou executar testes automatizados. Você terá
mais coragem para refatorar e estará mais disposto a tentar projetos
experimentais se puder executar rapidamente testes automatizados para
confirmar que seu código ainda funciona.

**Quando é a hora de refatorar**: É melhor refatorar continuamente, em vez de em fases. Quando você vir um
código que precisa ser melhorado, melhore-o (Lei do escoteiro). Por outro lado, se o seu
gerente precisar que você termine uma feature antes de uma demonstração
que acabou de ser agendada para amanhã, termine o recurso e refatore mais
tarde. O negócio é bem servido por contínua
refatoração, mas a prática da refatoração deve coexistir
harmoniosamente com as prioridades de negócios.
 
## What Motivates Us to Refactor?

As principais razões para refatorar mencionadas no texto são as seguintes:

1. Facilitar a adição de novo código: Refatorar o código existente permite modificar o projeto para acomodar melhor um novo recurso. Isso evita a criação de dívida de projeto e torna mais fácil e elegante adicionar o novo recurso posteriormente.

2. Melhorar o design do código existente: Ao melhorar continuamente o design do código, torna-se mais fácil trabalhar com ele. A refatoração contínua ajuda a identificar e corrigir problemas de design, removendo "cheiros de codificação" assim que são encontrados. Isso resulta em um código mais limpo e facilita a extensão e a manutenção futuras.

3. Obter uma melhor compreensão do código: A refatoração ajuda a melhorar a legibilidade e a compreensão do código. Quando o código não está claro, em vez de adicionar comentários, é preferível realizar refatorações para eliminar os "odores" do código, tornando-o mais expressivo e compreensível.

4. Tornar a codificação menos irritante: A motivação emocional também pode ser um fator para a refatoração. Quando o código é difícil de trabalhar, irritante ou gera atritos constantes, refatorar pode ser uma forma de tornar a experiência de programação mais agradável. Eliminar problemas de design, como uma classe enorme e sobrecarregada, pode reduzir o tempo necessário para integração do código e melhorar a satisfação geral.

Em resumo, as razões para refatorar incluem facilitar a adição de novo código, melhorar o design do código existente, obter uma melhor compreensão do código e tornar a codificação menos irritante, melhorando a experiência de programação.


## Many Eyes

Em seu livro "Simples e direto", Jacques Barzun explica que toda boa escrita
é baseada na revisão [Barzun , 227]. Revisão, ele aponta, significa re-ver. Ter muitos olhos revisando o
trabalho de um indivíduo ajudou a produzir melhorias dramáticas.

O mesmo vale para o código. Para obter os melhores resultados de
refatoração, você precisará da ajuda de muitos olhos. Esta é uma das
razões pelas quais a programação extrema sugere as práticas de
pairprogramming e propriedade coletiva de código [Beck, XP

## Human-Readable Code

Martin Fowler disse melhor:
Qualquer tolo pode escrever um código que um computador possa
entender. Bons programadores escrevem código que os humanos podem
entender. [F , 15]

## Keeping It Clean

Para manter o código limpo, devemos continuamente remover a duplicação
e simplificar e esclarecer o código. Não devemos tolerar bagunças no código
e não devemos retroceder em maus hábitos. O código limpo leva a um
design melhor, o que leva a um desenvolvimento mais rápido, o que leva a
clientes e programadores satisfeitos. Mantenha seu código limpo.

## Small Steps

O autor descreve a expericneid e um programador que falou que faria uma rfatoraçao em 5miutos mas demorou 1h. Isso ocorreu pois ele fez em grandes passso e nao em pequenos passos. Se você for refatorar, refatore umpoquinho (até um ponto aceitavel) e realize os tets unitarios. Nao pense que vai refatorar tudo de uma vez e vai passar, nao, pode ocorre de falhar. Aí, como voce fez muita cosia, voce vai ter que lhar muita coisa para descobrir o que é que causuou aquele eror.

Trecho 

Cada grande passo gerava falhas nos testes de unidade, quedemoravam bastante para serem corrigidas, sem contar que algumas das correções precisavam ser desfeitas em etapas posteriores.

Muitos de nós já tivemos experiências semelhantes - damos passos muito grandes e depois lutamos por minutos, horas ou até dias para voltar a uma barra verde. Quanto melhor eu fico na refatoração, mais prossigo dando passos muito pequenos e seguros. Na verdade, a barra verde tornou-se um giroscópio, um dispositivo que me ajuda a manter o rumo. Se a barra ficar vermelha por muito tempo - mais do que alguns minutos - sei que não estou dando passos pequenos o suficiente. Então eu volto atrás e começo de novo. Quase sempre encontro passos menores e mais simples que posso dar e que me levarão ao meu objetivo mais rapidamente do que se eu tivesse dado passos maiores.

## Design Debt

Se você pedir ao seu gerente para permitir que você gaste tempo refatorando
continuamente seu código para "melhorar seu design", qual você acha que
será a resposta? Provavelmente "Não" ou uma gargalhada prolongada ou um
olhar severo. Acompanhar um fluxo interminável de solicitações de recursos
e relatórios de defeitos já é bastante difícil! Quem tem tempo para melhorias
de design? Em que planeta você vive?

**TRECHO MUITO BOM APRA FALAR COM A GERENCIA SOBRE A REFATORAÇÕ**

A linguagem técnica da refatoração não se comunica efetivamente com a
grande maioria da administração. Em vez disso, a metáfora financeira da
dívida de design de Ward Cunningham [F , 66] funciona infinitamente melhor.
A dívida de design ocorre quando você **NÃO** faz três coisas consistentemente.

1.Remova a duplicação.
2.Simplifique seu código.
3.Esclareça a intenção do seu código.

Poucos sistemas permanecem completamente livres de dívidas de projeto.
Conectados como somos, os humanos simplesmente não escrevem um código
perfeito na primeira vez. Nós naturalmente acumulamos dívidas de design. Então a
pergunta se torna: "Quando você paga?"

Devido à ignorância ou ao compromisso de "não consertar o que não está quebrado", muitos programadores e equipes gastam pouco tempo pagando dívidas de design.Como resultado, eles criam uma grande bola de lama [Foote e Yoder ]. Em termos financeiros, se você não pagar uma dívida, incorrerá em multas por atraso. Se você não pagar suas multas por atraso, incorrerá em multas por atraso mais altas. Quanto mais você não paga, piores se tornam suas taxas e pagamentos. Os juros compostos entram em ação e, à medida que o tempo passa, sair das dívidas torna-se um sonho impossível. Assim é com a dívida de design.

Discutir problemas técnicos usando a metáfora financeira da dívida de
design é uma maneira comprovada de chegar à gerência. Costumo pegar
um cartão de crédito e mostrá-lo aos gerentes quando falo sobre dívidas de
design. Pergunto-lhes: "Quantos meses seguidos vocês não pagam suas
dívidas?" Embora alguns nem sempre paguem suas dívidas integralmente
todos os meses, quase todos não permitem que as dívidas se acumulem por
muito tempo. Discussões como essa ajudam os gerentes a reconhecer a
sabedoria de pagar continuamente a dívida de design.

Uma vez que o gerenciamento aceita a importância da refatoração
contínua, toda a maneira de construir software da organização pode
mudar. De repente, todos, de executivos a gerentes e programadores,
concordam que ir rápido demais prejudica a todos. Os programadores
agora têm a bênção da administração para refatorar. Com o tempo, os
pequenos e higiênicos atos de refatoração se acumulam para tornar os
sistemas cada vez mais fáceis de estender e manter. Quando isso
acontece, todos se beneficiam, incluindo criadores, gerentes e usuários do
software.

## Evolving a New Architecture

JUMP

## Composite and Test-Driven Refactorings

JUMP

## The Benefits of Composite Refactorings

As refatorações compostas neste livro, cada uma das quais tem como
alvo um padrão específico, têm alguns dos seguintes benefícios.

+ Eles descrevem um plano geral para uma sequência de refatoração.
  - A mecânica de uma refatoração composta descreve a sequência de
refatorações de baixo nível que você pode aplicar para melhorar um
projeto de uma maneira específica. Você precisa dessa sequência? Se
você já conhece as refatorações de baixo nível, certamente pode
aplicá-las na ordem que achar melhor.
  - No entanto, as sequências de refatoração neste catálogo podem
ser mais seguras, eficazes ou eficientes para melhorar seu projeto
do que suas próprias sequências de refatoração. Certa vez, segui
certas refatorações de baixo nível para refatorar para o estado [DP
] padrão. Então aprendi uma sequência melhor e mais segura.
Então alguém sugeriu melhorias para essa sequência. Quando
cheguei à quinta versão da sequência, sabia que tinha uma
maneira muito melhor de refatorar o padrão State, e era muito
diferente da minha abordagem inicial.


+ Eles sugerem direções de design não óbvias.
  - As refatorações compostas começam em uma origem e levam
você a um destino. O destino pode ou não ser óbvio, dada a
sua fonte. Muito depende de sua familiaridade com os
padrões, cada um dos quais define um destino, bem como as
forças que sugerem a necessidade de ir em direção a esse
destino. As refatorações compostas neste livro tornam essas
direções de projeto não óbvias mais claras, descrevendo
casos do mundo real em que fazia sentido mover-se na
direção de um padrão.

+ Eles fornecem insights sobre a implementação de padrões.
  - Como não existe uma maneira correta de implementar um padrão
(consulte Existem muitas maneiras de implementar um padrão , 26), é
útil considerar implementações de padrão alternativas. Isso é
particularmente verdadeiro para padrões que resolvem diferentes tipos
de problemas de design. Por exemplo, este livro contém três
refatorações diferentes para Composite [DP ] e três maneiras diferentes
de refatorar para Visitor [DP ]. Como você refatora esses padrões e
outros irá variar dependendo do problema inicial que você enfrentar.
Em reconhecimento a isso, as sequências de refatoração neste livro
variam em como elas finalmente implementam um padrão.

## Refactoring Tools

As principais lições que podem ser tiradas sobre ferramentas de refatoração com base no trecho são:

+ Ferramentas de refatoração automatizadas revolucionaram o desenvolvimento de software, permitindo que os programadores executem refatorações com facilidade e agilidade.

+ O desafio inicial era criar ferramentas de refatoração para linguagens convencionais, como Java, e muitos fornecedores responderam a essa demanda.

+ Com o tempo, os fornecedores de ferramentas automatizaram refatorações de baixo nível, como "Extrair Método" e "Extrair Classe", o que facilitou a realização de transformações maiores nos projetos.

+ As refatorações automatizadas podem ser usadas para se aproximar, afastar ou seguir padrões de projeto, oferecendo uma alternativa aos geradores de código de padrão.

+ Mesmo com ferramentas automatizadas, é importante executar os testes após a aplicação de uma refatoração para garantir que o comportamento do código seja preservado.

+ A confiabilidade das ferramentas de refatoração depende da cobertura de testes existente. Sem testes adequados, a refatoração pode ser menos estável ou confiável.

+ Os avanços nas ferramentas de refatoração automatizada estão tornando a mecânica das refatorações mais inteligente e automatizada, mudando a forma como as etapas são abordadas.

+ O futuro das ferramentas de refatoração pode incluir mais suporte automatizado para refatorações de baixo nível, sugestões de refatorações específicas para melhorar partes do código e a capacidade de explorar como o design seria com a aplicação de várias refatorações juntas.

Em resumo, as ferramentas de refatoração automatizadas trouxeram melhorias significativas para o processo de desenvolvimento de software, facilitando a aplicação de refatorações e promovendo um melhor design de código. A cobertura de testes adequada e os avanços contínuos na automação das refatorações são aspectos-chave para o sucesso e a confiabilidade dessas ferramentas.

