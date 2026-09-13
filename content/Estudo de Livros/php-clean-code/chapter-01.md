# 01 - What Is Clean Code and Why Should You Care?

Significado de PHP: **H**ypertext **P**re**P**rocessor

Clean Code: É um mindset. E quanto mais cedo você pensar nele melhor. É como um hábito
+ Muita gente não se preocupa com clean code ou por fazer projetos sozinhos, ou por mexer em código legado

## What this book will cover

É por isso que este livro se concentra especialmente no Clean Code em PHP. 

Apenas conhecimento básico de PHP é necessário para entender completamente o que será exposto. Este livro é uma compilação de anos de experiência - anos de prática no campo, confrontados com problemas reais que tiveram de ser resolvidos de acordo com restrições técnicas, funcionais e de tempo e dinheiro. Este não será mais um livro cheio de princípios utópicos que não podem ser aplicados na realidade.

### Divisão me partes deste livro

Está dividida em duas partes distintas:

**PARTE 1**

A primeira vai expor um pouco da teoria sobre o que é Clean Code e quais são os princípios básicos dele, aplicados diretamente na linguagem PHP até a versão 8.2, e assim por diante.

**PARTE 2**

A segunda parte será focada em ferramentas práticas que você pode usar para garantir que está seguindo as regras certas da maneira correta, configurando um ambiente e seu ambiente de desenvolvimento integrado (IDE) para ser o mais eficiente e limpo possível e obtendo métricas em seu código, testes automatizados, redação de documentação e muito mais.

Isso significa que você pode pular partes, pegá-las na ordem que quiser e aprender na velocidade que quiser.

## Understanding what clean code is

**O QUE É CLEAN CODE?**

**Clean Code é o ato de escrever código pensando no futuro, ou seja, pensando nas pessoas que irá colaborar com você ou no projeto sem você.** E quando falamos de “as pessoas quem vai colaborar com você”, pode até ser você mesmo. Se você nunca fez, você deve tentar ler e mantenha o código-fonte que você escreveu alguns meses (ou anos) atrás. Não é desafiador? Bem, faça não se preocupe - é difícil para todos. Você certamente achará isso complicado por muitos anos, e há nenhuma solução rápida para isso. É o mesmo processo para todos.

Da mesma forma que pensamos em limpar a casa para a chegada de uma visita, para não passar vergonha, assim deve ser a escrita de código.

## The importance of clean code in teams

Quando você chega em um projeto que já está sendo tocado, você precisa aprender muita coisa para entendê-lo, arquitetura, dependências, libs e isso pode demorar semanas ou meses a aprender do projeto e sua complexidade

Ser capaz de escrever um código limpo é como falar fluentemente o mesmo idioma que as outras pessoas na equipe: facilita a comunicação e a escrita de código da mesma forma, sem perceber quem escreveu qual parte.

O código limpo ajudará você com a longevidade do código. Ao trabalhar em equipe em um projeto, há grandes chances de o código-fonte ser mantido por pelo menos alguns anos. O código continuará a ser mantido anos após sua partida. É importante fazer as coisas direito porque você não estará aqui sempre para explicar tudo o que você fez para a pessoa que continua trabalhando no projeto.

Escrever Clean Code garante que se evite SPOFs (single points of failure) que são o pesadelo em sistemas legados. É uma entidade que, se falha, falha todo o projeto

**==> Exemplo de SPOF: Um desenvolvedor que sabe tudo**

A concrete example of an entity failing is the departure of a developer.

 "*If they are the only person to* utterly understand how the project works and is considered the “superhero” of the project, then it*is a big problem*". 

This means the project will not be able to continue without them, and it will be an absolute pain to maintain the project after their departure.

**==> Como evitar problemas como SPOF : Use Clean Code**

Uma das inúmeras maneiras de evitar esse problema é escrever de forma clara, concisa e compreensível código—escrever código de forma que todos possam entender facilmente o que está acontecendo. Após ler este livro, você pode ter uma ideia melhor de como conseguir isso.

**==> Code Review**

Falando em team work e, outro ponto crítico são as code review. Mesmo que estejamos entrando nos detalhes destes mais adiante neste livro, vamos falar sobre eles rapidamente aqui. Se você nunca ouviu falar de um code review, é simplesmente um processo onde outros desenvolvedores dos projetos estão revisando, lendo e comentando sobre as alterações que deseja trazer para a base de código. Este processo é obrigatório na maioria projetos open source e altamente recomendado para qualquer projeto, dados os benefícios que ele traz. Você pode agora imagine facilmente que, se todos tiverem sua própria maneira de escrever código, essas revisões levarão muito mais tempo. Isso vai desde como você formata seu código ou como você separa arquivos, classes e assim sobre. Se todos falarmos o mesmo idioma, podemos nos concentrar nas coisas que realmente importam durante o código revisão: se a necessidade funcional é respeitada, se há algum bug, e assim por diante.

## The importance of clean code in personal projects

Você pode pensar que o clean code é menos importante para projetos pessoais, mesmo que seja apenas um pouquinho. Você está errado se você pensa assim por muitas razões, conforme exposto a seguir:

+ Que garantia alguém não pode pegar o seu código para desenvolver algo no futuro?
+ Se você faz um projeto OpenSource, você não gostaria que o mundo visse que você usa clean-code
+ **Você provavelmente desejará melhorar seu projeto repetidamente**. Se você escrever fundamentos ruins, será um pesadelo manter e adicionar coisas novas sem medo de quebrar nada. Às vezes, é impossível adicionar novos recursos devido à escrita incorreta do código. Nos piores casos, você terá que reescrever totalmente seu aplicativo. Você não quer fazer isso.

Como diz o ditado, “escreva código como se o próximo desenvolvedor a executá-lo soubesse seu endereço e fosse caçá-lo para entendê-lo”. E isso deve também se aplicam a projetos pessoais porque você é o próximo desenvolvedor.

## Summary

Já terminamos com a teoria? Bem, tipo isso. Definimos juntos em que consiste o código limpo. Nos deu uma definição mútua de código limpo. Tendo a mesma definição de código limpo, estamos a um passo aprofunde-se nele e esteja pronto para mergulhar em princípios mais avançados na próxima seção.

Mas é claro que ainda não terminamos. Mesmo que você concorde com a definição que apresentamos, você pode curso tem um monte de perguntas já. E as perguntas mais importantes devem ser as seguintes: Quem decide essas regras para você? Quem tem o poder de impor essa visão? Isso é o que vamos para ver juntos no próximo capítulo.

## Meu Resumo

Pratique Clean Code. O "Code" é seu trabalho, sua arte. Diferente de outras artes (como pintura). Um software é feito na colaboração de muitas pessoas. Escreva Clean Code para essas pessoas, para o futuro: para o seu eu do futuro e outros colaboradores saberem o que você escreveu com carinho e atenção eassim eles possam e dar prosseguimento ao que está feito.
