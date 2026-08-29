# 08 - Code Quality Metrics

## Intro

A importância de medir a qualidade do software e como isso pode ser útil para os desenvolvedores. Ele menciona que os desenvolvedores sempre buscam melhorar seu software, mas às vezes pode ser que ele já esteja bom o suficiente. No entanto, como saber quando ele atinge um estado satisfatório?

Para resolver essa questão, foram introduzidas métricas de qualidade de software por especialistas nos primórdios da programação. Na década de 1970, eles pensaram sobre esse assunto e desenvolveram ideias que ainda são utilizadas hoje. O objetivo é aproveitar esse conhecimento e aplicá-lo em projetos próprios.

No capítulo em questão, serão abordados os seguintes tópicos: 
+ Introducing code quality metrics
+ coleta de métricas em PHP
+ os prós e contras do uso de métricas.

## Introducing code quality metrics

### O que é FURPS - Aspectos de qualidade de software

FURPS é um acrônimo usado para descrever características ou requisitos de qualidade de um software. Cada letra representa uma categoria específica de requisitos. Aqui está o significado de cada letra:

+ Funcionalidade (Functionality): Refere-se às capacidades funcionais do software, ou seja, o que o software deve fazer. Isso inclui os requisitos de negócios, as funcionalidades esperadas e os casos de uso do sistema.
  - O software é capaz de lidar com uma ampla variedade de casos de uso? Foi desenvolvido levando em consideração a segurança?

+ Usabilidade (Usability): Envolve a facilidade de uso do software. Inclui requisitos relacionados à interface do usuário, como a aparência, a navegabilidade, a intuição, a eficiência e a facilidade de aprendizado do sistema.
  - Quão boa é a experiência do usuário? Está documentada e é fácil de entender?

+ Confiabilidade (Reliability): Refere-se à capacidade do software de executar suas funções de maneira confiável, sem falhas ou erros. Isso envolve requisitos relacionados à estabilidade, à disponibilidade, à capacidade de recuperação de falhas e à precisão do software.
  - O software está disponível o tempo todo? Quão prováveis são as falhas ou erros que podem afetar a saída?

+ Desempenho (Performance): Diz respeito ao desempenho do software em termos de velocidade, tempo de resposta e eficiência. Isso inclui requisitos relacionados à capacidade de processamento, ao consumo de recursos, à escalabilidade e à velocidade de execução do software.
  - Indica a velocidade do software. Ele faz uso eficiente dos recursos disponíveis? Escala bem?

+ Suporte (Supportability): Refere-se à facilidade de manutenção e suporte do software após sua implantação. Isso envolve requisitos relacionados à facilidade de instalação, configuração, atualização e correção de problemas. Também inclui requisitos relacionados à documentação, ao treinamento e ao suporte técnico.
  - O software pode ser testado e mantido facilmente? É fácil de instalar e pode ser traduzido (localizado) para outros idiomas?

FURPS é usado como uma estrutura para ajudar a identificar e descrever diferentes aspectos dos requisitos de qualidade de um software. Ele fornece uma maneira de categorizar e organizar esses requisitos, permitindo uma melhor compreensão e gerenciamento do projeto de software.

Há duas formas de avaliar o código: qualidade extrna e interna. A externa fica a cargo do QA/UX, que é a qualidade do software como produto e a interna é o que nos interressa, a qualidade do código

Qualidade externa: Refere-se aos aspectos visíveis ou perceptíveis pelo usuário. Isso inclui a usabilidade, desempenho e outros aspectos que podem ser medidos sem analisar diretamente o código-fonte do software.
  - Seria algo que um QA faria, é usar o programa como usuário leigo e vê se as coisa estâo indo bem

Qualidade interna: Diz respeito aos aspectos relacionados ao código e ao desenvolvimento do software. Os desenvolvedores se preocupam principalmente com a qualidade interna, como a legibilidade do código, facilidade de extensão e capacidade de escrever testes. Embora os usuários não vejam diretamente o código, a qualidade interna afeta indiretamente a experiência do usuário, pois um código de alta qualidade tende a ter menos bugs e ser mais rápido e eficiente. Esses aspectos podem ser verificados usando testes unitários automatizados ou analisadores de código.

### Code quality Métricas

As métricas que iremos estudar são as seguintes:

+ Lines of code (LOC)
+ The cyclomatic complexity (CC)
+ The NPath complexity (NPath)
+ Halstead metrics
+ The Change Risk Anti-Patterns index
+ The maintainability index

#### Lines of Code (LOC)

Contar linhas de código (LOC) não é exatamente uma métrica de qualidade. De qualquer forma, é útil pr saber o tamanho do projeto. Há diversas tipos de LOC

+ Lines of Code (LOC): Contar todas as linhas do arquvo

+ Comment Lines of Code (CLOC): Quantas linhas estão comentadas

+ Non-Comment Lines of Code (NCLOC): Linhas sem comentarios

+ Logical Lines of Code (LLOC): Conta as linhas que tem código mesmo, retirando comentários e abre e fecha de parentes além des espaços em branco

#### The cyclomatic complexity

Uma métrica comum para isso é a Complexidade Ciclomática (CC) que é a contagem de número de caminhos de execução dentro de uma função. Ela foi introduzida no final da década de 1970, mas ainda é útil. A ideia por trás do nome críptico é simples: contamos o número de pontos de decisão, que são as declarações if, while, for e case. Além disso, a entrada da função conta como uma declaração também.

````php
// first decision point
function someExample($a, $b)
{
    // second decision point
    if ($a < $b) {
        echo "1";
    } else {
        echo "2";
    }
    // third
    if ($a >
        echo
    } else {
        echo
    }
}
````

O CC para o trecho de código anterior seria 3: a entrada da função conta como o primeiro caminho de decisão e ambas as declarações if contam como um caminho de decisão cada uma. No entanto, as declarações else não são levadas em conta pela definição, pois fazem parte das cláusulas if. Essa métrica é especialmente útil para avaliar rapidamente a complexidade de um código que você ainda não conhece. Geralmente é usada para verificar uma única função, mas também pode ser aplicada a classes ou até mesmo a um aplicativo inteiro. Se você tiver uma função com um CC alto, considere dividi-la em várias funções menores para reduzir o valor.

#### The NPath complexity

Uma segunda métrica de complexidade de código é a complexidade NPath. A ideia básica é semelhante à CC, pois conta os caminhos de decisão de uma função também. No entanto, ela conta todos os caminhos de decisão possíveis e não apenas as quatro declarações (if, while, for e case) definidas para a CC. Além disso, o ponto de entrada da função não é contado como um caminho de decisão para essa métrica.

Ao observar o exemplo acima, a complexidade NPath seria 4, porque temos 2 * 2 caminhos possíveis através da função: ambos os if statements, assim como ambos os else statements. Portanto, os quatro echo statements são considerados caminhos de decisão. Conforme mencionado anteriormente, a chamada da própria função não é considerada. Agora, se adicionássemos mais um if statement, a complexidade NPath aumentaria para 8. Isso ocorre porque teríamos então 2 * 2 * 2 caminhos possíveis. Em outras palavras, a métrica cresce exponencialmente, tornando-se rapidamente bastante alta.

A complexidade NPath retrata o esforço real de testar uma função melhor do que a CC, pois nos informa diretamente quantos resultados possíveis da função precisaríamos testar para alcançar uma cobertura de teste de 100%.

#### Métricas Hasltead

https://www.verifysoft.com/en_halstead_metrics

+ Length: Calculating the sum of the total number of operators and operands tells us how much
code we must deal
+ Vocabulary: The sum of the number of unique operators and operands already indicates the
complexity of the code
+ Volume: Describes the information content of the code based on the length and vocabulary
+ Difficulty: Indicates the error proneness (i.e., how likely it is to introduce bugs)
+ Level: Inverts the difficulty – as in, the higher the level, the less error-prone it is
+ Effort: The effort that is necessary to understand the code
+ Time: Tells us how long it roughly took to implement it
+ Bugs: Estimates the number of bugs that the code contains

These values will give you a rough indication of what type of code you are dealing with. Is it easy to
understand? How much time was spent developing it? How many bugs can be expected? However,
without comparing these values with results from other applications, they will not help you that much.

#### The Change Risk Anti-Patterns index (CRAP)

Usa CC (Complexidade ciclomática) + code coverage (quantas linhas os tests cobriram)

A combinação dessas duas métricas é bastante útil. Um código que não é excessivamente complexo e possui uma alta cobertura de testes é muito mais propenso a estar livre de bugs e ser mantido do que um código que é complexo e para o qual não existem muitos testes.

#### The maintainabiliry index

Como última métrica nesta seção, vamos analisar o índice de manutenibilidade. Ele fornecerá apenas um valor que indica a manutenibilidade do código inspecionado, ou seja, ele diz o quão fácil será alterá-lo sem introduzir novos bugs. Duas coisas tornam essa métrica particularmente interessante para nós.

Em primeiro lugar, ela é baseada nas métricas mencionadas anteriormente e utiliza LOC, métricas de Halstead e o CC para calcular o índice. Mais uma vez, não precisamos realmente saber a fórmula exata. Se você estiver interessado, pode consultá-la aqui: https://www.verifysoft.com/en_maintainability.html.

Em segundo lugar, essa métrica retornará um valor que você pode usar para avaliar diretamente a qualidade do código:

- 85 ou mais: Boa manutenibilidade
- 65 a 85: Manutenibilidade moderada
- 65 ou menos: Má manutenibilidade

Com essa métrica, você não precisa de nenhum outro código para compará-la. É por isso que ela é especialmente útil para avaliar rapidamente a qualidade do código.


### Medidas de Qualidade de Software Chat GPT

> $> **O QUE É COMPLEIDADE ACINTOMATICA**

A complexidade ciclomática de um programa é determinada pelo número de caminhos independentes que podem ser percorridos durante a execução do código. Esses caminhos são determinados pelas estruturas de controle, como condicionais (if-else, switch-case), loops (for, while, do-while) e estruturas de controle de fluxo (break, continue, return). Quanto maior o número de caminhos independentes, maior será a complexidade ciclomática do programa.

A complexidade ciclomática é importante porque está relacionada ao número de casos de teste necessários para cobrir todas as possíveis combinações de caminhos no programa. Além disso, ela também está relacionada à facilidade de manutenção e compreensão do código-fonte. Programas com alta complexidade ciclomática tendem a ser mais difíceis de entender, depurar e manter.

Existem várias fórmulas e ferramentas para calcular a complexidade ciclomática de um programa, como o grafo de fluxo de controle. No entanto, é importante lembrar que a complexidade ciclomática é apenas uma das muitas métricas utilizadas na avaliação da qualidade do software e não é uma medida absoluta de sua qualidade ou eficiência.

> $> **O QUE É NPATH**

A complexidade NPath é outra métrica utilizada na avaliação da complexidade de um programa de computador. Diferentemente da complexidade ciclomática, que mede o número de caminhos independentes, a complexidade NPath foca na contagem do número total de caminhos possíveis em um programa.

A complexidade NPath é calculada considerando todas as combinações possíveis de caminhos em um programa, levando em conta as estruturas de controle, como condicionais (if-else, switch-case) e loops (for, while, do-while). Cada caminho é multiplicado pelo número de vezes que pode ser executado. Ao somar todos esses caminhos ponderados, obtemos a complexidade NPath.

Essa métrica é útil para avaliar a cobertura de teste do programa, pois quanto maior a complexidade NPath, maior será o número de casos de teste necessários para garantir uma cobertura adequada de todos os caminhos possíveis.

Embora a complexidade NPath seja uma métrica mais abrangente que a complexidade ciclomática, ela tende a ser menos usada na prática devido à sua complexidade de cálculo e interpretação. A complexidade ciclomática é mais amplamente adotada por sua simplicidade e eficácia na análise da complexidade estrutural do código.

> $> **O QUE É HALSTEAD METRICS**

As métricas de Halstead são um conjunto de métricas de software propostas por Maurice H. Halstead em 1977. Essas métricas visam quantificar diferentes aspectos do software com base nas características do código-fonte.

As métricas de Halstead são derivadas de quatro medidas básicas: o número de operadores distintos (N1), o número de operandos distintos (N2), o número total de operadores (n1) e o número total de operandos (n2). Com base nessas medidas, várias métricas são calculadas:

1. Volume (V): Mede o tamanho do programa e é calculado como V = (n1 + n2) * log2(N1 + N2).

2. Dificuldade (D): Indica o quão difícil é entender o programa e é calculada como D = (N1 / 2) * (n2 / N2).

3. Esforço (E): Mede a quantidade de esforço necessário para escrever o programa e é calculado como E = V * D.

4. Tempo estimado (T): Estima o tempo necessário para escrever o programa e é calculado como T = E / 18 segundos.

5. Número de erros (B): Estima o número de erros no programa e é calculado como B = V / 3000.

Essas métricas de Halstead são úteis para avaliar a complexidade, o esforço e outros aspectos do software com base em suas características estruturais. Elas podem fornecer informações sobre a qualidade, a manutenibilidade e a facilidade de compreensão do código-fonte. No entanto, é importante notar que as métricas de Halstead têm limitações e devem ser usadas em conjunto com outras métricas e técnicas de análise de software para uma avaliação mais abrangente.

> $> **COMO CALUCALAR AS METRICAS HASTENAD**

As métricas de Halstead podem ser calculadas com base em quatro medidas básicas: o número de operadores distintos (N1), o número de operandos distintos (N2), o número total de operadores (n1) e o número total de operandos (n2). A partir dessas medidas, você pode calcular as seguintes métricas de Halstead:

1. Volume (V): V = (n1 + n2) * log2(N1 + N2)
2. Dificuldade (D): D = (N1 / 2) * (n2 / N2)
3. Esforço (E): E = V * D
4. Tempo estimado (T): T = E / 18 segundos
5. Número de erros esperados (B): B = V / 3000

Para calcular essas métricas, siga estes passos:

1. Identifique os operadores distintos (N1): conte o número total de operadores únicos no código-fonte. Isso inclui símbolos, palavras-chave e outros elementos que representam operações.
2. Identifique os operandos distintos (N2): conte o número total de operandos únicos no código-fonte. Isso inclui variáveis, constantes e outros elementos nos quais as operações são realizadas.
3. Conte o número total de operadores (n1): conte todas as ocorrências de operadores no código-fonte.
4. Conte o número total de operandos (n2): conte todas as ocorrências de operandos no código-fonte.
5. Calcule o Volume (V) usando a fórmula: V = (n1 + n2) * log2(N1 + N2).
6. Calcule a Dificuldade (D) usando a fórmula: D = (N1 / 2) * (n2 / N2).
7. Calcule o Esforço (E) multiplicando o Volume (V) pela Dificuldade (D): E = V * D.
8. Calcule o Tempo estimado (T) dividindo o Esforço (E) por 18 segundos: T = E / 18.
9. Calcule o Número de erros esperados (B) dividindo o Volume (V) por 3000: B = V / 3000.

Lembrando que essas métricas são apenas indicadores e devem ser interpretadas e utilizadas em conjunto com outras técnicas de análise de software para uma avaliação mais abrangente da qualidade e complexidade do código-fonte.

> $> **O que é The maintainability index**

ChatGPT
O índice de manutenibilidade (maintainability index) é uma métrica que visa avaliar a facilidade de manutenção de um software. Ele fornece uma medida numérica da qualidade do código-fonte com base em diversos fatores, como legibilidade, complexidade e facilidade de compreensão.

O índice de manutenibilidade geralmente é calculado usando uma fórmula padronizada que considera diferentes características do código. Embora as fórmulas possam variar ligeiramente dependendo da ferramenta ou método específico utilizado, geralmente levam em consideração fatores como o tamanho do código, a complexidade ciclomática, a profundidade de aninhamento, a coesão e o acoplamento.

Normalmente, o índice de manutenibilidade é representado como um valor numérico, geralmente em uma escala de 0 a 100. Quanto maior o valor, maior é considerada a manutenibilidade do código. Um índice mais alto indica que o código é mais fácil de entender, modificar e corrigir, o que facilita a manutenção contínua.

O índice de manutenibilidade é útil para desenvolvedores, equipes de projeto e gerentes de software, pois fornece uma métrica objetiva para avaliar a qualidade do código e identificar áreas que podem exigir mais esforços de manutenção ou melhorias. No entanto, é importante lembrar que o índice de manutenibilidade é apenas uma métrica e deve ser considerado em conjunto com outras práticas e técnicas de engenharia de software para obter uma visão completa da qualidade do código e facilitar a manutenção efetiva do software.


## Gathering metrics in PHP

A seguir, será apresentado 3 ferramentas para obter métricas

+ phploc
+ PHP Depend
+ PhpMetrics

#### phploc

Como o nome diz, serve para calcular o LOC

**Instalar**

```
$ wget https://phar.phpunit.de/phploc.phar
```

**Usar**

```
$ php phploc.phar src
```

**As métrias que mostra**

Essas informações são muito mais abrangentes do que apenas as linhas de código (LOC). As informações são divididas nas seguintes categorias:

- Tamanho: Obviamente, o principal objetivo dessa ferramenta é medir o tamanho de um projeto contando o número de linhas de código, usando várias formas de contagem que foram introduzidas na seção anterior. O foco está nas LLOCs e você obterá as médias dessa métrica por classe, método de classe e função.
- CC (Complexidade Ciclomática): O phploc calculará os valores médios de CC por LLOC, classes e métodos.
- Dependências: Esta seção informa quantos acessos ao estado global foram feitos e quantos atributos e métodos estão sendo acessados de forma estática. Tanto o acesso global quanto o acesso estático são considerados práticas que devem ser evitadas, portanto, esses números fornecem pistas sobre a qualidade do código.
- Estrutura: Na última seção de saída (que não coube na captura de tela anterior), o phploc fornece mais detalhes sobre a estrutura do código. Não existem regras claras sobre como interpretá-los, mas você pode tirar algumas conclusões a partir deles. Por exemplo:
  - Em relação ao tamanho geral do código, quantos namespaces são usados? Uma grande base de código com apenas alguns namespaces indica que o projeto não está bem estruturado.
  - Interfaces são usadas e quantas em comparação com o tamanho do projeto? O uso de interfaces aumenta a intercambiabilidade das classes e indica um código bem estruturado.

Isso é tudo o que precisamos saber sobre a funcionalidade do phploc por enquanto. É uma ferramenta simples de usar, porém útil, que ajuda a ter uma visão rápida sobre a qualidade geral do código e a estrutura de um projeto, portanto, deve fazer parte do seu conjunto de ferramentas.

**Exemplo de Saida do phploc**

````
Directories                                         3
Files                                               10

Size
  Lines of Code (LOC)                              500
  Comment Lines of Code (CLOC)                     100
  Non-Comment Lines of Code (NCLOC)                400

Classes
  Abstract                                          2
  Concrete                                          8

Methods
  Scope
    Non-Static                                      30
    Static                                          10

  Visibility
    Public                                          25
    Protected                                        5
    Private                                         10

Complexity
  Cyclomatic Complexity / LLOC                      0.5
  Cyclomatic Complexity / Number of Methods         3.0

Dependencies
  Global Accesses / Non-Static Method               20
  Global Accesses / Static Method                    5
````

### PHPLoc - ChatGPT

> $> **O que é PHPLoc**

PHPLoc é uma ferramenta de análise estática para código PHP. Ela fornece métricas e estatísticas detalhadas sobre um projeto PHP, permitindo que os desenvolvedores obtenham insights sobre a qualidade, complexidade e tamanho do código. O nome PHPLoc é uma abreviação de "PHP Lines of Code" (Linhas de Código PHP) e seu objetivo principal é ajudar os desenvolvedores a entenderem melhor a estrutura e a saúde do código PHP.

Ao executar o PHPLoc em um projeto PHP, ele analisa todos os arquivos PHP encontrados, contando as linhas de código, comentários, classes, funções, métodos e outros elementos do código. Ele também calcula métricas como complexidade ciclomática, acoplamento, coesão e outras medidas de qualidade de código.

Além disso, o PHPLoc fornece um resumo geral do projeto, incluindo o número total de arquivos e diretórios, tamanho total do código, médias de linhas de código por classe, função, método, entre outros dados relevantes. Essas informações podem ser úteis para identificar áreas problemáticas, como classes muito grandes, funções complexas ou baixa coesão.

O PHPLoc é uma ferramenta de linha de comando e pode ser executado em diferentes sistemas operacionais. Ele é distribuído como um pacote phar (PHP Archive) e pode ser facilmente integrado em fluxos de trabalho de desenvolvimento ou sistemas de integração contínua para análise automatizada de código.

> $> **Dê um exemplo da saida do PHPLoc**

Aqui está um exemplo simplificado da saída do PHPLoc:

```
sqlCopy codeDirectories                                         3
Files                                               10

Size
  Lines of Code (LOC)                              500
  Comment Lines of Code (CLOC)                     100
  Non-Comment Lines of Code (NCLOC)                400

Classes
  Abstract                                          2
  Concrete                                          8

Methods
  Scope
    Non-Static                                      30
    Static                                          10

  Visibility
    Public                                          25
    Protected                                        5
    Private                                         10

Complexity
  Cyclomatic Complexity / LLOC                      0.5
  Cyclomatic Complexity / Number of Methods         3.0

Dependencies
  Global Accesses / Non-Static Method               20
  Global Accesses / Static Method                    5
```

Neste exemplo, o PHPLoc analisou um projeto PHP que contém três diretórios e um total de dez arquivos. O código tem 500 linhas no total, sendo 100 linhas de código de comentário e 400 linhas de código não comentadas.

A análise também revela que há duas classes abstratas e oito classes concretas no projeto. Quanto aos métodos, existem 30 métodos não estáticos e 10 métodos estáticos. Quanto à visibilidade dos métodos, 25 são públicos, 5 são protegidos e 10 são privados.

Em relação à complexidade do código, é fornecido o valor da complexidade ciclomática, que é uma medida da complexidade estrutural do código. Neste exemplo, o valor é 0.5 para a relação entre a complexidade ciclomática e as linhas de código (LLOC), e 3.0 para a relação entre a complexidade ciclomática e o número de métodos.

Por fim, são fornecidas algumas métricas de dependências do código. O PHPLoc registra o número de acessos globais a métodos não estáticos e a métodos estáticos no projeto.

Essa é apenas uma representação simplificada da saída do PHPLoc. A ferramenta oferece informações mais detalhadas sobre cada classe, método e métrica, permitindo uma análise mais aprofundada da estrutura e qualidade do código PHP.

#### phpdepend

If there was a prize for the most metrics combined in one tool, then it would surely go to PHP Depend (PDepend). It covers all the metrics we discussed in the previous section, plus many more. However, it is not the most user-friendly tool there is. Plus, the website and the repository documentation are not perfect. Nevertheless, you should check it out.

**Instalar e suar**

```
$ composer require pdepend/pdepend --dev
```

usar

```
$ vendor/bin/pdepend --summary-xml=pdepend_summary.xml src
```

**Exemplo de saida**

```
PDepend 2.10.3
Parsing source files:
...............................................          47
Calculating Cyclomatic Complexity metrics:
.................                                        355
Calculating Node Loc metrics:
.............                                            279
Calculating NPath Complexity metrics:
.................                                        355
Calculating Inheritance metrics:
.....                                                    101
```

**Reumo do phpdepend**

PDepend é poderoso, mas ao mesmo tempo difícil de acompanhar. A saída gerada é difícil de ler e, quando o projeto fica um pouco maior, torna-se inutilizável a menos que você utilize outras ferramentas para analisar o arquivo XML. No entanto, talvez você precise das métricas avançadas que ele fornece um dia, ou talvez esteja trabalhando em um projeto onde ele já está em uso. Então, pelo menos agora você está preparado.



#### phpdepend - ChatGPT

> $> **O que é phpdepend**

O PHP Depend é uma ferramenta de análise estática de código-fonte PHP que permite identificar e analisar as dependências entre as classes e os pacotes de um projeto PHP. Ele ajuda os desenvolvedores a entender a estrutura e as relações entre os componentes do código, permitindo uma melhor visualização da arquitetura e da qualidade do software.

O PHP Depend utiliza a análise estática do código PHP para extrair informações sobre as classes, interfaces, namespaces e suas dependências. Ele cria um mapa das dependências e fornece métricas e estatísticas sobre o código.

Ao executar o PHP Depend em um projeto PHP, ele identifica as dependências entre as classes e os pacotes. Ele pode detectar classes que dependem de outras classes, interfaces ou namespaces, permitindo uma análise abrangente das interações entre os componentes do código.

Além disso, o PHP Depend fornece métricas e estatísticas sobre o código, como o acoplamento entre classes, a coesão dos pacotes, a complexidade ciclomática, o tamanho do código e outras medidas de qualidade de software. Essas informações ajudam os desenvolvedores a identificar possíveis problemas, como classes altamente acopladas, pacotes com baixa coesão ou áreas do código que precisam de refatoração.

O PHP Depend é executado como uma ferramenta de linha de comando e pode ser integrado em fluxos de trabalho de desenvolvimento ou sistemas de integração contínua para análise automatizada de código. Ele fornece relatórios detalhados e visuais, incluindo gráficos e diagramas, para auxiliar na compreensão das dependências e da estrutura do código PHP.

#### PHPMetrics

Tem uma saida muito mais facil de se observar do que o phploc e o ppdepdn

**Installation and usage**

Let us add PhpMetrics to your project using Composer:

```
$ composer require phpmetrics/phpmetrics --dev
```

After all the files have been downloaded, you can immediately start generating your first report:

```
$ vendor/bin/phpmetrics --report-html=phpmetrics_report src
```

The --report-html option specifies the folder in which the report will be created. You can specify
more than one folder to be scanned by providing them as a comma-separated list. For our example,
however, we will just use the src folder.

To open the actual HTML report that has just been generated, simply open the index.html file
in that folder in your browser. Before we have a closer look at the generated report, let us see which
other useful options PhpMetrics offers first:
+ --metrics: This option will return a list of the available metrics. It helps decipher abbreviations
such as mIwoC.
+ --exclude: With this option, you can specify one or more directories to be excluded from
scanning.
+ --report-[csv|json|summary-json|violations]: Allows you to save the results
in different report formats other than HTML – for example, --report-json.

**O HTML GERADO PELO PHP METRICS MOSTRA MUITA COISA QU RESOLVI PULAR, POIS É MAIS DIELA APRENDER NA HORA DE USAR MERMSO**



### PHPmetrics - ChatGPT


> $> **O que é PHP metrics e como instalar e usá-lo**

PHP Metrics é uma ferramenta que permite medir e analisar métricas de código-fonte em projetos PHP. Ela fornece informações sobre a complexidade, tamanho, coesão, acoplamento e outras características do código PHP, permitindo que os desenvolvedores avaliem a qualidade e o desempenho do software.

Para instalar e usar o PHP Metrics, você pode seguir estes passos:

1. Requisitos: Certifique-se de ter o PHP instalado no seu sistema.

2. Instalação via Composer: Abra um terminal ou prompt de comando e navegue até o diretório raiz do seu projeto PHP. Em seguida, execute o seguinte comando para instalar o PHP Metrics usando o Composer:

```
   bashCopy codecomposer require phpmetrics/phpmetrics
```

   Isso irá baixar e instalar as dependências do PHP Metrics no seu projeto.

3. Executando o PHP Metrics: Após a instalação, você pode executar o PHP Metrics usando o seguinte comando:

```
   bashCopy code./vendor/bin/phpmetrics
```

   Esse comando inicia o PHP Metrics e começa a análise do código PHP no diretório atual.

   Você também pode especificar um diretório específico para análise, fornecendo o caminho como argumento para o comando. Por exemplo:

```
   bashCopy code./vendor/bin/phpmetrics /path/to/project
```

4. Visualizando os resultados: Após a análise, o PHP Metrics gera um relatório HTML com as métricas do código. Você pode encontrar o relatório no diretório `./var/report` do seu projeto.

   Para visualizar o relatório, abra o arquivo `index.html` em um navegador da web.

O PHP Metrics fornece uma ampla variedade de métricas, como linhas de código, complexidade ciclomática, acoplamento, coesão, entre outras. O relatório gerado pelo PHP Metrics exibe essas métricas de forma organizada e fácil de ler, permitindo que você avalie a qualidade do seu código PHP e identifique áreas que podem precisar de melhorias.

Lembre-se de consultar a documentação oficial do PHP Metrics para obter informações mais detalhadas sobre as opções de configuração e uso da ferramenta.


## The pros and cons of using metrics

**Prós:** As métricas de qualidade de código fornecem uma visão geral do estado atual do projeto, ajudam a identificar áreas que precisam ser melhoradas, auxiliam no treinamento de refatoração e fornecem uma conquista quando indicadores positivos são alcançados. Além disso, elas ajudam a evitar a escrita de código ruim desde o início.

1. Fornecem uma visão geral do estado atual do projeto.
2. Auxiliam na identificação de áreas que precisam ser melhoradas.
3. Facilitam o treinamento e prática de refatoração de código.
4. Proporcionam uma sensação de conquista quando métricas positivas são alcançadas.
5. Ajudam a evitar a escrita de código ruim desde o início.

**Contras:** As métricas podem levar alguns desenvolvedores a refatorar mais código do que o necessário, com o objetivo de obter melhores métricas. Além disso, é importante encontrar um equilíbrio entre a velocidade de desenvolvimento e a qualidade do código, considerando prazos e recursos disponíveis. Também é fundamental não usar as métricas como forma de competir ou criticar colegas de trabalho, e sim promover um ambiente de respeito, colaboração e tolerância.

1. Alguns desenvolvedores podem refatorar mais código do que o necessário, apenas para obter melhores métricas.
2. É necessário encontrar um equilíbrio entre a velocidade de desenvolvimento e a qualidade do código, considerando prazos e recursos disponíveis.
3. Não devem ser usadas como ferramenta de competição ou para criticar colegas de trabalho.
4. É importante ter consciência de que as métricas são baseadas em critérios técnicos e não refletem necessariamente o esforço e a intenção dos desenvolvedores.
5. Devem ser usadas como uma ferramenta complementar, não como a única medida da qualidade do código.

## Summary

Este capítulo introduziu você a algumas das métricas de qualidade de código mais utilizadas no mundo do PHP. Além disso, apresentamos as ferramentas que ajudam você a coletá-las. É claro que existem muitas
outras que não pudemos abordar neste livro, mas você não precisa conhecer todas elas - agora você está equipado com uma compreensão sólida das métricas de qualidade de código que o ajudarão em sua rotina diária de trabalho.

Ferramentas e métricas de qualidade de código certamente não são a solução para todos os problemas. Por um lado, elas podem ser extremamente úteis para melhorar seu código. Por outro lado, você não deve considerá-las como a medida definitiva. Existem inúmeros exemplos de tipos bem-sucedidos de software que nunca passariam por essas verificações de qualidade, como o WordPress. No entanto, tenha certeza de que os criadores do WordPress teriam feito as coisas de maneira diferente se soubessem antecipadamente.

No próximo capítulo, deixaremos o reino da teoria. Aprenderemos como organizar as ferramentas
que apresentamos nos últimos dois capítulos em nossos projetos. Cada projeto é único, então ofereceremos diferentes opções para atender às suas necessidades.



## Meu Resumo

+ FURPS (Fncionality, suability, Reliability, Perfomance, Supportability)

Métricas de Código

+ Line of Code (LOC)
  - Contar quantas linhas tem o código. Não é exatamente uma métrica de qualidade

+ Complexidade ciclomática (CC)
  - Possíveis caminhos para a execução de um trecho
  - Conta os caminhos por f, while, for e case
  
+ NPath complexity
  -  Diferentemente da complexidade ciclomática, que mede o número de caminhos independentes, a complexidade NPath foca na contagem do número total de caminhos possíveis em um programa.

+ Halstead Metrics
  - As métricas de Halstead são um conjunto de métricas de software propostas por Maurice H. Halstead em 1977. Essas métricas visam quantificar diferentes aspectos do software com base nas características do código-fonte.
 - É originária de uma fórmula

+ The maintainability index
  - Dá uma nota de 0 a 100
  - O índice de manutenibilidade geralmente é calculado usando uma fórmula padronizada que considera diferentes características do código. Embora as fórmulas possam variar ligeiramente dependendo da ferramenta ou método específico utilizado, geralmente levam em consideração fatores como o tamanho do código, a complexidade ciclomática, a profundidade de aninhamento, a coesão e o acoplamento.

Ferramntas para buscar esa metricas

phploc
 - Calcula a quantidade de linha dos arquivos; linhas de comentários e complexidade ciclomática

phpdepend
  - Pega muito mais métricas, mas é um pouco menos amigável para utilizar
  - Analisa dependência entre classes e pacotes

phpmetrics
  - Gera um relatório com as métricas

Pros e Contras de utilizar e focar nessas métrica:

+ PROS: 

1. Fornecem uma visão geral do estado atual do projeto.
2. Auxiliam na identificação de áreas que precisam ser melhoradas.
3. Facilitam o treinamento e prática de refatoração de código.
4. Proporcionam uma sensação de conquista quando métricas positivas são alcançadas.
5. Ajudam a evitar a escrita de código ruim desde o início.

+ CONTRAS:

1. Alguns desenvolvedores podem refatorar mais código do que o necessário, apenas para obter melhores métricas.
2. É necessário encontrar um equilíbrio entre a velocidade de desenvolvimento e a qualidade do código, considerando prazo e recursos disponíveis.
3. Não devem ser usadas como ferramenta de competição ou para criticar colegas de trabalho.
4. É importante ter consciência de que as métricas são baseadas em critérios técnicos e não refletem necessariamente o esforço e a intenção dos desenvolvedores.
5. Devem ser usadas como uma ferramenta complementar, não como a única medida da qualidade do código.

## Futrhe reading

Further reading
+ dePHPend (https://dephpend.com/) is a tool that can draw UML diagrams for your
PHP code and be used to spot problems in your architecture
