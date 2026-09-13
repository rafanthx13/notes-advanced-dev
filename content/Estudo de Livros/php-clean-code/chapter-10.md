# 10 - Automated Testing

## Intro

Por meio dos testes automatizados, você poderá verificar de forma rápida e confiável se suas melhorias no código não comprometeram sua funcionalidade. Isso é um dos pilares da escrita de clean code, pois permite que você refatore o código com confiança.

O tópico dos testes automatizados merece um livro inteiro, ou até mesmo dois, então só podemos arranhar a superfície aqui. No entanto, como estamos convencidos de que você se beneficiará muito disso em seu trabalho diário, esperamos que este capítulo desperte seu interesse em aprender mais sobre esse tópico empolgante. As seções a seguir lhe darão uma boa visão geral:

+ Why you need automated tests
+ Types of automated tests
+ About code coverage

## Technical requirements

Será necessário instalar a extensão Xdebug, somente disponível no PHP moderno.

## Vantagens dos testes automatizados

+ **Velocidade e confiabilidade:** Imagine que você precise executar as mesmas etapas de teste repetidamente. Em pouco tempo, você cometeria erros ou simplesmente pularia os testes em algum momento. No entanto, os testes automatizados fazem o trabalho chato para você de uma maneira muito mais rápida e confiável - e eles não reclamam.

+ **Documentação:** Com os testes automatizados, você pode documentar indiretamente a funcionalidade do código por meio de asserções, que explicam o que se espera que o código faça. Em comparação com comentários ou artigos em uma wiki, você será imediatamente notificado pelos testes falhados quando algo tiver mudado significativamente. Abordaremos esse tópico novamente no Capítulo 13, Criando Documentação Eficaz, quando falarmos sobre a criação de documentação eficaz.

+ **Integração de novos membros:** Um conjunto de testes com boa cobertura do código ajuda novos desenvolvedores a se tornarem produtivos em um projeto mais rapidamente. Os testes não apenas atuam como documentação adicional, mas também permitem que os desenvolvedores façam alterações ou adicionem recursos com confiança. Eles podem verificar se suas alterações não quebram nada antes de serem implantadas em qualquer ambiente de preparação ou produção.

+ **Integração contínua/implantação contínua (CI/CD):** Sejam CI ou CD, se seus testes forem automatizados, você pode confiar em seu pipeline de build para garantir que o código que você mescla não esteja quebrado, o que permite que você envie código para produção mais rápido e com mais frequência. No próximo capítulo, daremos uma olhada detalhada nesse tópico.

+ **Melhor código:** Você não precisa seguir estritamente a infame abordagem de desenvolvimento orientado a testes (TDD) para se beneficiar de testes já em desenvolvimento. Escrever código testável por unidades melhora ainda mais seu código. Para testar o código isoladamente (por exemplo, sem executar um banco de dados real em segundo plano), é necessário escrever o código com separação em mente. Se as dependências externas forem injetadas usando injeção de dependência (DI), será muito mais fácil substituí-las por objetos de teste do que se elas forem instanciadas nas funções da classe. Dedicaremos um olhar mais atento ao padrão DI no Capítulo 12, Trabalhando em Equipe. Além disso, funções longas e complexas são tão difíceis de testar quanto as curtas (pense, por exemplo, na complexidade do NPath aqui, que discutimos no Capítulo 8), então você logo começará a escrever funções mais curtas para reduzir o número de caminhos de decisão em seu código.

+ **Refatoração mais fácil:** Testes automatizados são uma ferramenta inestimável quando você deseja refatorar um projeto com base nos resultados

## O que é TDD

**O que é TDD**: O TDD (Test-Driven Development) é uma forma de desenvolver código que combina escrever testes e o código real ao mesmo tempo. 

**Como fazer TDD**: A ideia básica é simples e é chamada de vermelho/verde/refatorar: antes de escrever qualquer código para uma nova funcionalidade ou até mesmo corrigir um erro, o primeiro passo é escrever um teste que verifica o resultado esperado. Como você ainda não escreveu nenhum código real, os testes falharão (indicado pela cor vermelha). No segundo passo, você escreve o código, sem se preocupar muito em deixá-lo perfeito, até que os testes passem (fiquem verdes). Agora que você tem testes funcionando, pode facilmente melhorar (refatorar) o código até ficar satisfeito.

**Principal ganho do TDD**: O TDD garante que todo o seu código seja testado e que o código seja escrito de uma forma totalmente testável. No entanto, não leve as coisas muito a sério: há momentos em que você simplesmente quer experimentar sem ter um objetivo claro em mente, por exemplo, quando você está brincando com uma nova interface de programação de aplicativos (API). Nesses casos, você não precisa seguir o TDD.

## Com testes fica mais fácil refatorar

Os testes são importantes para a refatoração, pois ajudam a garantir a integridade do sistema durante as alterações de código. Eles fornecem uma segurança ao desenvolvedor ao detectar possíveis efeitos colaterais indesejados das alterações. Além disso, os testes funcionam como uma documentação do comportamento esperado do código, permitindo que as modificações sejam feitas com confiança e facilitando a justificativa do trabalho de refatoração.

## Tipos de testes automatizados

### Unit Tests

Os testes unitários são utilizados para **testar pequenas unidades de código**. É recomendável escrever **um teste para cada funcionalidade** do objeto, mantendo os testes pequenos e fáceis de entender. É comum ter centenas ou milhares de testes unitários, portanto, é importante que eles sejam executados rapidamente, em alguns microssegundos cada.

**Os testes unitários devem ser executados de forma isolada, sem interação com serviços externos, como bancos de dados ou APIs.** Isso é feito simulando as dependências externas por meio de objetos simulados, chamados de "mocks". Esses mocks garantem que um teste não falhe por causa de mudanças externas ao código testado.

Os testes unitários são rápidos, independentes e úteis para identificar problemas no código em segundos. Eles formam a base da pirâmide de testes e são recomendados para começar a trabalhar com testes em PHP, usando frameworks como PHPUnit. No entanto, uma limitação dos testes unitários é que eles não interagem entre si, o que pode resultar em testes passando mesmo com erros na aplicação devido a interações não testadas entre as classes.

**Padrão AAA**

O padrão AAA (Arrange-Act-Assert) é uma convenção comum para escrever testes unitários. 

+ O "Arrange" refere-se à preparação dos objetos e dos cenários necessários para o teste. 
+ O "Act" envolve a execução da funcionalidade ou do código sendo testado. 
+ O "Assert" é o momento em que verificamos se os resultados obtidos estão de acordo com as expectativas. 

Seguir esse padrão ajuda a organizar e estruturar os testes, tornando-os mais legíveis e compreensíveis. Se uma asserção falhar, o teste será considerado um falha.

### Integration tests

É os testes da aplicação real. Não usandos mocks, usaremos o sistema em estado normal para testar tanto o sistema quanto as suas dependências externas

**Codeceptions**

O Codeception (https://codeception.com) combina uma variedade de tipos de testes, como testes unitários, de integração e até mesmo de ponta a ponta, em uma única ferramenta. Por baixo dos panos, ele é baseado em ferramentas existentes, como o PHPUnit. O Codeception oferece módulos para todos os principais frameworks e, portanto, se integra bem à maioria dos projetos em PHP.

O que é Codeceptions - ChatGPT

**É OpenSOurce, MIT e de graça**

Codeception é um framework de teste de aceitação e funcional para PHP. Ele fornece uma sintaxe simples e intuitiva para escrever testes automatizados que simulam interações de usuário em um aplicativo. Com o Codeception, você pode criar cenários de teste realistas, executar testes em diferentes níveis de granularidade (unidade, funcionalidade, aceitação), além de oferecer suporte a diferentes ambientes de teste, como testes de interface de usuário, testes de API e testes de integração.

O Codeception é amplamente utilizado na comunidade PHP devido à sua facilidade de uso e recursos abrangentes. Ele inclui recursos úteis, como asserções convenientes, suporte a diferentes navegadores e emuladores, integração com frameworks populares como Laravel e Symfony, e a capacidade de gerar relatórios detalhados de testes.

Com o Codeception, você pode melhorar a qualidade e a confiabilidade do seu código, automatizando os testes e garantindo que seu aplicativo funcione corretamente em diferentes cenários e condições.

**Pontos sobre os testes de integração**

+ Testes de integração envolvem a interação com dependências externas, como bancos de dados.
+ É necessário garantir que as dependências estejam em um estado confiável antes de executar os testes.
+ A preparação do banco de dados de teste inclui a criação de um banco de dados limpo, execução de migrações e preenchimento com dados de teste.
+ Os testes de integração tendem a ser mais lentos devido às transações de banco de dados.
+ A complexidade dos testes de integração aumenta devido à interação com várias dependências, tornando-os mais propensos a quebras.
+ É importante garantir que os testes de integração façam parte da estratégia geral de testes e sejam a segunda camada na pirâmide de testes.
+ Os testes de integração são úteis para verificar a integração dos objetos testados dentro do contexto da aplicação.

Além dos testes de integração, é necessário considerar testes de interação entre o PHP e o navegador, que serão abordados nos testes E2E

## Testes E2E

Com testes de ponta a ponta (E2E), queremos garantir que todo o fluxo do servidor para o cliente (por exemplo, o navegador) e de volta para o servidor esteja funcionando corretamente. Basicamente, simulamos um usuário sentado na frente do computador e navegando pela nossa aplicação.

Para conseguir fazer isso precisamos de duas coisas

+ 1. Reproduzir o ambiente que o usuário vai usar, ou seja, os sistemas 
rodando normalmente, que o banco de dados e as API estejam como um ambiente normal, pelo menos minimamente.

+ 2.  Automatizar a interação do usuário. Como o PHP é na Web, precisamos de uma ferramenta que navegue de forma automática na web.

Para isso, usa-se de um headless browser, uma espécie de browser em CLI que não necessariamente abra uma tela e faça as operações, pois asiam, evitar ter que depender de abrir uma janela de browser para usar. Imagine, por exemplo, executar isso em um serve da azure que não tem o browser la. Hoje, o Chrome possui esse modo Headless, e uma ferramenta muito usada para usar essa interação com o browser é o **Cypress**, um framework web para Testes E2E.

O uso do Cypress sobre o selenium foi um grande avanço, ele é muito mais fácil de usar.

Apesar disso, nem tudo são flores. Testes E2E são muito mais fáceis de quebrar, pois sao baseados em elementos que podem mudar facilmente como a DOM do HTML gerado

EXTRA ==> **Page objects**: If you are interested in creating maintainable E2E tests, you should check out the concept of page objects (https://www.martinfowler.com/bliki/PageObject.html).

### ChatGPT Diferença entre tetes de integraçâo e E2E

Os testes de integração e os testes end-to-end (E2E) são dois tipos de testes que visam verificar o funcionamento do sistema como um todo, mas há diferenças sutis entre eles:

1. Testes de integração: Esses testes verificam a interação entre diferentes componentes ou módulos do sistema. Eles são usados para garantir que as partes individuais do sistema funcionem corretamente em conjunto. Os testes de integração podem envolver a comunicação entre bancos de dados, serviços externos, APIs, componentes internos, etc. O objetivo é identificar problemas de integração entre esses componentes e garantir que eles cooperem corretamente.
2. Testes E2E (end-to-end): Esses testes simulam a interação de um usuário real com o sistema, cobrindo todo o fluxo de trabalho ou funcionalidade do início ao fim. Eles são usados para verificar se o sistema funciona corretamente como uma unidade completa, do ponto de vista do usuário. Os testes E2E geralmente envolvem a automação de ações de usuário, como preencher formulários, clicar em botões, navegar por páginas e verificar resultados. Eles são úteis para identificar problemas de integração entre os diferentes componentes do sistema, bem como problemas de usabilidade e fluxo de trabalho.

**Em resumo, os testes de integração focam na interação entre componentes internos do sistema, enquanto os testes E2E simulam a experiência completa do usuário para verificar se o sistema funciona como esperado.** 

Ambos os tipos de teste são importantes para garantir a qualidade e a robustez do sistema, mas têm escopos e abordagens ligeiramente diferentes.

## Code coverage: quanto do seu código você realmente precisa testar?

Code coverage mede a proporção do código coberta pelos testes. Quanto maior a cobertura de código, melhor - se houver mais testes, é menos provável que o software contenha bugs e será mais difícil introduzir novos bugs sem serem percebidos. Uma cobertura de código mais alta também pode ser um indicador de melhor qualidade de código, já que o código testado geralmente é escrito de uma maneira que leva a uma melhor qualidade.

Geralmente, o grau de cobertura é expresso simplesmente usando a porcentagem de código testado, ou seja, de 0% (totalmente não testado) a 100% (cobertura de código completa). Mas como podemos medir a cobertura de código? Para isso, usaremos o PHPUnit, pois ele pode gerar um relatório de cobertura de código para nós. No entanto, é necessário uma extensão adicional do PHP para a funcionalidade de cobertura de código.

Será usado para medir essa code-coverage o Xdebug:.

## Configurando o XDebug

Outras alternativas 

+ Tech: Tideways (https://tideways.com); 
+ Blackfire (https://www.blackfire.io); 
+ PCOV (https://github.com/krakjoe/pcov) - para somente code-coverage e mais nada)

==> Como instalar o Xdebug no Windows 

Para instalar o Xdebug no Windows, siga estas etapas:

1. Verifique a versão do PHP instalada em seu sistema Windows. Certifique-se de baixar a versão correta do Xdebug compatível com sua versão do PHP.
2. Acesse o site oficial do Xdebug (https://xdebug.org/) e navegue até a seção "Downloads".
3. Encontre a versão do Xdebug compatível com sua versão do PHP e sistema operacional Windows. Baixe o arquivo DLL correspondente.
4. Copie o arquivo DLL do Xdebug baixado para a pasta de extensões do PHP. A localização dessa pasta pode variar dependendo da sua instalação do PHP, mas geralmente está em "C:\xampp\php\ext" se você estiver usando o XAMPP.
5. Abra o arquivo php.ini em um editor de texto. Você pode encontrá-lo na pasta de configuração do PHP, geralmente em "C:\xampp\php".
6. Adicione as seguintes linhas ao arquivo php.ini:

```sh
[Xdebug]
zend_extension = "caminho/para/o/arquivo/xdebug.dll"
xdebug.remote_enable = 1
xdebug.remote_autostart = 1
```

Certifique-se de substituir "caminho/para/o/arquivo/xdebug.dll" pelo caminho correto para o arquivo DLL do Xdebug que você copiou anteriormente.

1. Salve o arquivo php.ini e reinicie o servidor web ou o serviço PHP para aplicar as alterações.

Após a instalação, o Xdebug estará pronto para uso no seu ambiente PHP no Windows. Verifique a documentação oficial do Xdebug para obter informações adicionais sobre a configuração e o uso do Xdebug.

## Como gerar code coverage repots

......... Trecho que explica como usar o Xdebug para code coverage .........

## O que testar

Devemos buscar uma cobertura de código completa, 100%?

Seguido o princípio de Pareto, já chegar a 80% de code coverage já está bom. Concentre-se na regra de negócio mias importantes.

Há também casos de getters e setters que não precisam ser testados, então, ter 100 de code coverage vai gerar muito trabalho para pouco ganho.

Outros exemplos são arquivos de configuração, factories ou definições de rotas. É suficiente usar testes E2E ou de integração, que garantem que a aplicação funcione em geral. Eles testam implicitamente (ou seja, sem usar asserções concretas) todo o código de "cola", que é todo o código que mantém sua aplicação unida, mas é tedioso de testar.

Em particular, os testes E2E geralmente não são contabilizados na métrica de cobertura de código porque é tecnicamente difícil fazê-lo. Se você os tiver, no entanto, eles adicionam uma camada extra de cobertura de teste que não pode ser medida. Você não pode se orgulhar de ter 100% de cobertura de código, mas sabe que todos os diferentes tipos de teste estão cobrindo você, e esse deve ser nosso objetivo principal.

## Summary

Neste capítulo, discutimos por que você deve usar testes automatizados e como eles melhoram a qualidade do seu código. Cobrimos os três principais tipos de testes, que são testes unitários, testes de integração e testes E2E, com seus prós e contras, armadilhas potenciais e nossas recomendações sobre como usá-los.
Por fim, você aprendeu sobre o conceito de cobertura de código e como usá-lo em seus próprios projetos.

Juntamente com o conhecimento do capítulo anterior sobre ferramentas de qualidade de código e como organizá-las, no próximo capítulo, finalmente poderemos combinar todas essas ferramentas em um processo que ajuda a executá-las de forma estruturada e confiável - os pipelines de construção.

## Further reading

Existem mais tipos de teste do que poderíamos abordar neste capítulo. Se você achar o mundo dos testes automatizados tão fascinante quanto os autores, pode ser interessante explorar outros tipos de teste, como os seguintes:

- Teste de mutação envolve modificar o código a ser testado com pequenas alterações (chamadas de mutantes). Se seus testes conseguem capturar esses mutantes, geralmente estão bem escritos; caso contrário, permitirão que o mutante escape. A ferramenta mais conhecida para esse tipo de teste no mundo do PHP é o Infection ([https://infection.github.io](https://infection.github.io/)).

- Teste de regressão visual compara literalmente capturas de tela da aplicação feitas durante os testes com capturas de tela originais para identificar problemas em Cascading Style Sheets (CSS). Embora não seja diretamente relacionado ao PHP, pode ser interessante se você quiser manter a aparência do seu projeto web perfeita. Uma boa opção para verificar é o BackstopJS (https://github.com/garris/BackstopJS).

- Teste de API pode ser considerado um teste E2E, mas apenas para a API que sua aplicação pode fornecer. Como os testes são baseados em solicitações HTTP, um navegador sem interface gráfica não é necessário, o que facilita a configuração. Uma boa escolha para começar com testes de API é o Codeception ([https://codeception.com](https://codeception.com/)).

- Desenvolvimento orientado a comportamento (BDD) é uma abordagem muito interessante, pois se concentra na comunicação entre as partes interessadas (por exemplo, o gerente de projeto), QA (se houver) e os desenvolvedores. Isso é feito por meio de uma forma especial de escrever testes em uma linguagem chamada Gherkin, que basicamente permite que pessoas não técnicas escrevam conjuntos de testes. A ferramenta de BDD para PHP é chamada Behat (https://github.com/Behat/Behat).

Resumo ChatGPT: 

Existem outros tipos de teste além dos abordados neste capítulo. Alguns exemplos incluem teste de mutação, teste de regressão visual, teste de API e desenvolvimento orientado a comportamento (BDD). Cada um tem suas características e ferramentas específicas, e podem ser explorados para complementar as estratégias de teste.

## Meu Resumo

Teste Automatizados:

+ Vantagens: Confiabilidade para fazer mudanças; Documentar; Integrar ferramentas de CI/CD e garantir um deploy sem bugs


TDD:

+ Desenvolvimento baseado em teste

+ 1- Cria testes para avaliar o input e output da funcionalidade; Ele não passa; 2. Crie a funcionalidade; 3. Termina quando conseguir fazer passar o teste

+ Vantagem: Garante que tudo o que você fez seja testável e torna o seu pensamento mais modularizado; Ter ele permite que você refatore sem quebrar em outros locais, pois os testes automatizados são rápidos

Tipos de Testes automatizados

+ Testes unitários: 

    + Testa pequenas unidades de código. Usa mocks se necessário, pois devem ser executados de forma isolada

    + Padrão AAA: Arrange-Act-Asset

+ Teste de Integração

    + Testa a comunicação entre sistemas/módulos. N

    + Não usa mocks e usa as dependências/serviços externos reais (BD)

+ Testes E2E

  - Testa toda a experiência do usuário usando o sistema, feita por um usuário: Selenium ou Cypress


Codeceptions: Teste de integração no PHP

+ O Codeception (https://codeception.com) combina uma variedade de tipos de testes, como testes unitários, de integração e até mesmo de ponta a ponta, em uma única ferramenta

+ Muito usado na comunidade PHP. É OpenSource, Free, MIT


Code Coverage:

- Seguindo a regra de pareto, faça pelo meno chega a 80%, considerando as principais partes


Ferramenta de Testes e Debug: XDebug. Outras alternativas:

  - Tech: Tideways (https://tideways.com); 

  - Blackfire (https://www.blackfire.io); 

  - PCOV (https://github.com/krakjoe/pcov) - para somente code-coverage e mais nada)


Outros tipos de testes:

+ Teste de mutação:
  + É um teste que teste os testes. Ele altera o código em algumas partes e verifica se seus testes captam essas alterações. Servem para avaliar os testes automatizados
  + A ferramenta mais conhecida para esse tipo de teste no mundo do PHP é o Infection ([https://infection.github.io](https://infection.github.io/)).

+ Teste de regressão visual
  + Testa a captura das telas, serve para testar o CSS
  + Embora não seja diretamente relacionado ao PHP, pode ser interessante se você quiser manter a aparência do seu projeto web perfeita. Uma boa opção para verificar é o BackstopJS (https://github.com/garris/BackstopJS).

+ Teste de API
  + Como os testes são baseados em solicitações HTTP, um navegador sem interface gráfica não é necessário, o que facilita a configuração. Uma boa escolha para começar com testes de API é o Codeception ([https://codeception.com](https://codeception.com/)).

+ BDD: Outra metodologia para escrever código com testes
  + Desenvolvimento orientado a comportamento
  + Usando uma linguagem chamada Gherkin basicamente permite que pessoas não técnicas (gerente, cliente) escrevam conjuntos de testes. A ferramenta de BDD para PHP é chamada Behat (https://github.com/Behat/Behat).























