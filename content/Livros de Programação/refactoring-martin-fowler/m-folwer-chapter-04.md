# M.Folwer Refactoring - 04 - Escrevendo Testes

A refatoração é uma ferramenta importante, mas não pode vir sozinha. Para fazer a refatoração de forma apropriada, preciso ter uma suíte de testes robusta a fim de identificar meus erros inevitáveis. Mesmo com ferramentas de refatoração automatizadas, muitas de minhas refatorações ainda exigirão uma verificação com uma suíte de testes.

## Importância de um código autotestável 

**O processo de depuraçâo é longo**

Se você observar como a maioria dos programadores gasta o tempo, verá que escrever código, na verdade, representa uma pequena fração desse tempo. Uma parte é gasta para descobrir o que está acontecendo, outra, no design, mas a maior parte do tempo é gasta com depuração. Tenho certeza de que todo leitor é capaz de se lembrar de ter passado longas horas fazendo depuração – muitas vezes, noite adentro. Todo programador tem uma história de um bug que custou um dia inteiro (ou mais) para ser encontrado. Corrigir o bug em geral é bem rápido, mas encontrá-lo é um pesadelo. Então, quando você corrige um bug, há sempre a chance de que outro apareça e talvez não seja nem sequer notado até ser tarde demais. E você gastará muito tempo para encontrar esse bug.

**Testes: Uma forma de depurar**

Garanta que os testes sejam totalmente automatizados e que verifiquem os próprios resultados.

**Aumento de produtividade**

o executar os testes sempre que compilava, ele conseguia identificar rapidamente os bugs introduzidos recentemente, pois se algum teste falhasse, ele saberia que o bug estava no trabalho feito desde a última vez que os testes foram executados. Como ele executava os testes com frequência, geralmente apenas alguns minutos haviam se passado desde a última execução, tornando mais fácil encontrar a origem do bug em uma porção de código pequena e fresca em sua memória. Essa abordagem reduziu drasticamente o tempo gasto na depuração, permitindo que ele adicionasse funcionalidades novas diariamente, acompanhadas por testes para verificá-las. Como resultado, a busca por bugs de regressão se tornou rápida e ele gastava apenas alguns minutos nessa tarefa. Isso demonstrou que seu software era autotestável e ele tinha um eficaz detector de bugs ao executar os testes com frequência.

Conforme percebia isso, tornei-me mais agressivo em relação aos testes. Em vez de esperar pelo término de um incremento, eu adicionava os testes logo depois de escrever uma pequena função. Todos os dias eu adicionava algumas funcionalidades novas e os testes para verificá-las. Dificilmente eu gastava mais que alguns minutos procurando um bug de regressão.

> Uma suíte de testes é um detector de bugs eficaz, que reduz o tempo necessário para encontrar bugs.

## Principais pontos pelo ChatGPT

Os principais pontos sobre as vantagens de se usar testes, mencionados no trecho, são:

1. A maior parte do tempo dos programadores é gasta com depuração. Bugs podem ser difíceis de encontrar e corrigir, consumindo horas ou até mesmo dias de trabalho.

2. A prática de escrever testes junto com o código de produção e executá-los frequentemente reduz o tempo gasto na depuração. Ao encontrar um bug, é possível identificar rapidamente a origem do problema no código recentemente escrito.

3. A execução frequente dos testes, realizada logo após compilar o código, permite detectar bugs imediatamente, facilitando sua correção. Essa abordagem reduz o tempo necessário para encontrar e corrigir bugs, de horas para apenas alguns minutos.

4. A incorporação de testes na base de código, junto com o código de produção, torna o software autotestável. A execução automatizada dos testes, que verificam os próprios resultados, se torna simples e eficaz na detecção de bugs.

5. A produtividade aumenta drasticamente ao utilizar testes. Adicionando testes logo após escrever pequenas funções e adicionando funcionalidades novas diariamente, o tempo gasto na busca por bugs de regressão é minimizado.

6. A automação dos testes é essencial para evitar o trabalho manual e monótono. Ferramentas como o framework JUnit facilitam a escrita e organização dos testes em diversas linguagens de programação.

7. Escrever testes antes de começar a programar, utilizando a abordagem de Desenvolvimento Orientado a Testes (TDD), ajuda a definir claramente o que precisa ser feito para acrescentar uma funcionalidade. Essa abordagem baseada em ciclos rápidos de teste-programação-refatoração pode ser produtiva e tranquila.

8. Testes são fundamentais para a prática de refatoração. Se deseja refatorar um código, é necessário escrever testes para garantir que as alterações não introduzam novos bugs.

9. Embora o livro não seja especificamente sobre testes, o autor destaca a importância dos testes como um ponto de partida para a prática de refatoração. Testes ajudam a obter benefícios significativos com um pequeno volume de trabalho.

Em resumo, o uso de testes automatizados traz benefícios como a redução do tempo gasto na depuração, a detecção rápida de bugs, o aumento da produtividade e a garantia de que as alterações introduzidas não causem regressões no código.

## Dicas de como fazr o código

OBS: O autor dá umexempllo de código em JS e usa a lib Mocha para realizar tsetse. A seguir está lsitad os princiapsi ensinamentos dessa parte:

+ Sempre garanta que um teste falhará quando deve falhar

+ Execute testes frequentemente. Execute os testes que exercitam o código com o qual você está trabalhando, pelo menos com um intervalo de alguns minutos; execute todos os testes no mínimo uma vez por dia.

+ É melhor escrever e executar testes incompletos do que não executar testes completos.

+ Pense nas condições limites nas quais algo pode dar errado e concentre aí seus testes.

+ Não deixe que o medo de os testes não capturarem todos os bugs impeça você de escrever testes que capturem a maioria dos bugs.

+ Ao receber o relatório de um bug, comece escrevendo um teste unitário que exponha o bug. 
