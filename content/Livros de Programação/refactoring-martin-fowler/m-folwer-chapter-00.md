# M.Folwer Refactoring - 00 - Prefácio

**Qual o problema de refatorar?**: qual é o problema? Simplesmente este: a refatoração é arriscada. Ela exige mudanças que podem introduzir bugs sutis em um código que está funcionando. A refatoração, se não for feita de forma adequada, pode fazer você atrasar dias, até mesmo semanas. E a refatoração será mais arriscada ainda se for conduzida informalmente ou ad hoc. Quanto mais você o analisa, mais detalhes percebe... e mais mudanças faz. Em algum momento, você cavará a própria sepultura e não conseguirá sair dela. Para evitar que isso aconteça, a refatoração deve ser feita sistematicamente.

**O que é refatorar**: A refatoração é o processo de modificar um sistema de software de modo que não altere o comportamento externo do código, embora melhore a sua estrutura interna. É uma maneira disciplinada de reorganizar o código, minimizando as chances de introduzir bugs. Em sua essência, ao refatorar, você estará aperfeiçoando o design do código depois que ele foi escrito.

**O que este livro contém?** Este livro é um guia para a refatoração: foi escrito para um programador profissional. Meu objetivo é mostrar como refatorar de uma maneira controlada e eficiente. Você aprenderá a refatorar de modo a não introduzir bugs no código, e aperfeiçoará metodicamente a sua estrutura. 

**O que trate esse livro:** Este livro explica os princípios e as melhores práticas para a refatoração, e mostra quando e onde você deve começar a explorar seu código a fim de aperfeiçoá-lo. Como parte essencial do livro, há um catálogo abrangente de refatorações. Cada refatoraçãodescreve a motivação e o mecanismo de uma transformação de código comprovada. Algumas das refatorações, por exemplo, Extrair método ou Mover campo, podem parecer óbvias.

## Do que se trata os capitulos do livro

Tradicionalmente, um livro começa com uma introdução. Em princípio, concordo com isso, mas acho difícil apresentar a refatoração com uma discussão ou definições generalizadas – portanto, começarei com um exemplo. O Capítulo 1 parte de um pequeno programa com algumas falhas comuns de design e o refatora, transformando-o em um programa mais fácil de entender e de modificar. Você verá tanto o processo da refatoração quanto uma série de refatorações úteis. É o capítulo principal para ler se quiser entender realmente do que se trata a refatoração.

No Capítulo 2, abordarei mais dos princípios gerais da refatoração, darei algumas definições e os motivos para fazer uma refatoração. Além disso, apresentarei alguns dos desafios da refatoração. No Capítulo 3, Kent Beck me ajudou a descrever como identificar “maus cheiros” (bad smells) no código, e como eliminá-los com refatorações. Os testes desempenham um papel muitoimportante na refatoração, de modo que o Capítulo 4 descreve como incluí- los no código.

O coração do livro – o catálogo de refatorações – ocupa o restante do volume. Embora esse catálogo, de forma alguma, seja um catálogo completo, ele inclui as refatorações essenciais de que a maioria dos desenvolvedores provavelmente precisará. Ele evoluiu a partir de anotações que fiz enquanto aprendia sobre refatoração no final dos anos 1990, e ainda as uso hoje em dia, pois não me lembro de todas. Quando quero fazer uma refatoração, por exemplo, Separar em fases (Split Phase), o catálogo me lembra de como fazê-la de um modo seguro, passo a passo. Espero que essa seja a parte do livro à qual você recorrerá com frequência.

Será feito em JS. Escolhi JavaScript para ilustrar essas refatorações, pois achei que essa linguagem seria legível para o maior número de pessoas. Contudo, você não deverá ter dificuldades em adaptar as refatorações para qualquer linguagem que esteja usando no momento.

## Eis o modo de tirar o máximo proveito deste livro sem lê-lo por completo.

Se quiser entender o que é refatoração, leia o Capítulo 1 – o exemplo deverá deixar o processo claro.

+ Se quiser entender por que deve refatorar, leia os dois primeiros capítulos. Eles mostram o que é a refatoração e por que você deve usá-la.

+ Se quiser descobrir onde deve refatorar, leia o Capítulo 3. Ele mostra os sinais que sugerem a necessidade de refatoração.

+ Se quiser realmente refatorar, leia os quatro primeiros capítulos completos e, em seguida, vá direto para o catálogo. Leia o suficiente do catálogo para saber, grosso modo, o que há nele. Você não precisa entender todos os detalhes. Quando tiver realmente que fazer uma refatoração, leia os detalhes sobre ela e utilize-a como ajuda. O catálogo é uma seção de referência, portanto é provável que você não queira lê-lo de uma só vez.
