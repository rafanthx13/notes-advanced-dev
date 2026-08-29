# 07 - Code Quality Tools

## Intro

Existem literalmente dezenas de ferramentas disponíveis para o ecossistema do PHP que podem nos ajudar a detectar falhas e possíveis bugs, aplicar a formatação correta de código e, em geral, nos informar sobre problemas de qualidade.

Para garantir um início rápido e fácil no mundo das ferramentas de qualidade de código, esta seção irá apresentar as mais comumente utilizadas. Para cada uma delas, você aprenderá como instalar, configurar e usá-la diretamente no seu código. Você também aprenderá sobre alguns recursos extras úteis que elas oferecem.
Vamos examinar os seguintes grupos de ferramentas:

+  Syntax checking and code styling
+  Static code analysis
+  IDE extensions


## Syntax checking and code styling

Como manter o código sintaticamente correto e formatado? Iremos ver ferramentas para garantir que o código seja salvo sem erro, usando ferramentas que automaticamente vão corrigir o erro que aparecer.

Vamos aprender sobre as seguintes ferramentas:
+ A PHP built-in linter
+ The PHP CS Fixer tool

### The PHP built-in linter

LINTER: O linter checka erros de sintaxe sem precisar executar o código.

O PHP já vem com um linter dele.

Seja o seguinte arquivo:

````php
<?php
class Example
{
    public function doSomething() bool
    {
        return true;
    }
}
````
Ao executar o comando a seguir:

````sh
$ php -lf example.php
````

Vai ter como saida

````
PHP Parse error: syntax error, unexpected identifier "bool", expecting ";" or "{" in example.php on line 5 Errors parsing example.php
````

Podemos usar para checar todo o nosso código

````php
$ php -lf src/*
````

Essa é a ferramenta nativa no php mas há também uma muito boa:

https://github.com/overtrue/phplint

### PHP CS Fixer: a code sniffer

CODE SNIFFER: Verificador que checa violações de padrões do PHP.

O principal é o **"PHP CS Fixer"** encontrado em https://github.com/FriendsOfPHP/PHP-CS-Fixer

Há também um outro muito bom: https://github.com/squizlabs/PHP_CodeSniffer

### Installation and usage do php-cs-fixer

**Instalando**

```
composer require friendsofphp/php-cs-fixer --dev
```

Com o composer, vai criar `composer.json`, `composer.lock` e a pastavendor com as dependências do pacote. OBS:  Vai instalar localmente aonde estiver, e não precisar ter o composer.json lá, ele cria do zero se não tiver.

Para o código anterior vamos executar o seguinte comando para executar o code sniffer

````
vendor/bin/php-cs-fixer fix example.php
````

**OBS**:
+ O codeSnifer só vai funcionar se a sintaxe estiver correta, ou sea, deve usar ele depois de usar o LINTER.

O QUE É ÚTIL
+ Corrigir indentação
+ Espaços em brancos desnecessários


If you do not want to fix the file immediately, you can use the --dry-run option to just scan for
issues. Add the -v option as well, to display the findings:

```
$ vendor/bin/php-cs-fixer fix example.php --dry-run -v
```

As with all code quality tools, you can also run it on all the files in a folder. The following command
will scan the src folder recursively, so all subfolders are scanned as well:

```
$ vendor/bin/php-cs-fixer fix src
```

### Uso de Rules

A common pattern within code quality tools is the organization of rules within rulesets. A rule is
a simple instruction that tells PHP CS Fixer how our code should be formatted regarding a certain aspect. For example, if we want to make use of strict types in PHP, every PHP file should contain the declare(strict_types=1); instruction.

There is a rule in PHP CS Fixer that can be used to force this:

```
$ vendor/bin/php-cs-fixer fix src  --rules=declare_strict_types
```

This command will check each file in src and add declare(strict_types=1); after the
opening PHP tag.

###  Uso do formato PSR12

Since a coding standard such as PSR-12 (https://www.php-fig.org/psr/psr-12/)
includes many instructions on how the code should be formatted, it would be cumbersome to add all
these rules to the preceding command. That is why rulesets have been introduced, which are simply
a combination of rules, and even other rulesets.

If we want to format code following PSR-12 explicitly, we can just run this:

```
$ vendor/bin/php-cs-fixer fix src --rules=@PSR12
```

As you can see, a ruleset is indicated by the @ symbol.

###  Arquivo de configuração

O arquivo de configuração do PHP CSFixer é `.php-cs-fixer.dist.php`.

Podemos modificá lo para que o pHP CS Fixer usar sempre essas regras que estamos usando

````php
<?php

$finder = PhpCsFixer\Finder::create()
    ->in(__DIR__)
    ->exclude('templates');

$config = new PhpCsFixer\Config();

return $config->setRules([
    '@PSR12' => true,
    'declare_strict_types' => true,
    'array_syntax' => ['syntax' => 'short'],
])
->setFinder($finder);
````

###  A recap of PHP CS Fixer

Um verificador de código, como o PHP CS Fixer, deve fazer parte de todo projeto PHP sério. A capacidade de corrigir violações de regras automaticamente economizará muitas horas de trabalho. Se você optar por não aplicar correções arriscadas, dificilmente causará problemas.

Agora aprendemos como garantir que nosso código esteja bem formatado e corretamente sintático. Embora isso seja a base de qualquer código de alta qualidade, não nos ajuda a evitar bugs ou problemas de manutenibilidade. Nesse ponto, entram em jogo as ferramentas de análise estática de código.

## Static code analysis

Static Code Analysis são ferramentas que escaneiam o código fonte e encontram problemas e questões que muito senior pode deixar passar no code review.

Iremos ver 4 ferramentas

These are the tools we would like to introduce you to in the next sections:
+ phpcpd – the copy and paste detector
+ PHPMD - the PHP mess detector
+ PHPStan - PHPStan – a static analyzer for PHP
+ Psalm - A PHP static analysis linting machine

### phpcpd – the copy and paste detector

Bugs, problemas de segurança e más práticas serão copiados e, portanto, mais difíceis de corrigir. Pense nele como se fosse uma praga se espalhando pelo seu código.

Felizmente há uma ferramenta que verifica isso  o PHP copie e cole o detector (phpcpd).

**Instalação**

É baixar um arquivo phar (self-containing PHP archive (phar) e isso não requer o composer

```
$ wget https://phar.phpunit.de/phpcpd.phar
```

Depois é executar o código passando a pasta/arquivo a ser analisado

```
$ php phpcpd.phar src
```

**O que phppcpd avalia**

Ele não olha se o trecho foi copiado da internet ou não, ele olha se um programador fez ctr-c e ctrl-v de um trecho em outros lugares.

Você pode usar `--min-lines e`--min-tokens` como parâmetros para pegar mais detalhado exemplo

```
$ php phpcpd.phar --min-lines 4 --min-tokens 20 src
```

**Alguns parâmetros interessantes**

+ `--min-line:` A opção min-lines nos permite definir o número mínimo de linhas que um trecho de código precisa ter para ser considerado um clone.
+ `--min-tokens`: Essa opção controla o número de instruções que um trecho de código contém antes de ser considerado um clone.
+ `--exclude`: Exclui um caminho da análise. Por exemplo, os testes unitários frequentemente contêm muito código copiado e colado, portanto, você deseja excluir a pasta de testes. Se você precisar excluir vários caminhos, as opções podem ser fornecidas várias vezes.
+ `---fuzzy`: Com esta opção especialmente útil, o phpcpd irá ofuscar os nomes das variáveis ao realizar sua verificação. Dessa forma, clones serão detectados mesmo se os nomes das variáveis tiverem sido alterados por um colega inteligente, mas preguiçoso.

**Recap phpcp**

Embora o phpcpd seja fácil de usar, ele é uma ajuda significativa contra a disseminação lenta de código copiado e colado em seus projetos. Por isso, recomendamos adicioná-lo ao seu conjunto de ferramentas de programador limpor clean coder toolkit.

#### phpcpd - ChatGPT


Verifique se você tem o PHP instalado em seu sistema. O PHPCPD requer o PHP versão 5.3 ou superior.

> $>  **O que é phpcpd?**

O PHPCPD significa PHP Copy/Paste Detector, ou Detector de Cópia/Colagem em PHP, em português. É uma ferramenta de análise de código-fonte em PHP que identifica trechos de código duplicados ou semelhantes em um projeto.

O PHPCPD examina o código PHP em busca de sequências de tokens idênticas ou semelhantes. Ele compara blocos de código e relata as semelhanças encontradas, ajudando a identificar áreas do código que podem ter sido copiadas e coladas de outros lugares, o que pode indicar práticas de desenvolvimento inadequadas ou redundâncias no código.

Essa ferramenta é útil para manter a qualidade do código, facilitando a identificação de partes duplicadas que podem ser refatoradas em funções ou classes reutilizáveis. Isso ajuda a reduzir a duplicação de código, melhorar a manutenibilidade e evitar possíveis erros ou problemas de consistência.

> User :$>  **Quais são seus principais parâmetros**

O PHPCPD possui alguns parâmetros principais que podem ser configurados para ajustar sua análise. Alguns dos principais parâmetros incluem:

--names: Permite especificar nomes de arquivos ou diretórios específicos a serem analisados. Por exemplo, você pode definir --names src/ para analisar apenas os arquivos no diretório "src".

--exclude: Permite excluir arquivos ou diretórios específicos da análise. Por exemplo, --exclude tests/ exclui todos os arquivos no diretório "tests" da análise.

--suffixes: Permite definir os sufixos de arquivo a serem considerados durante a análise. Por padrão, o PHPCPD analisa arquivos PHP, mas você pode usar esse parâmetro para especificar outros tipos de arquivo, como --suffixes php,inc.

--min-lines: Define o número mínimo de linhas para um trecho de código duplicado ser relatado. Por padrão, o valor é 5 linhas, mas você pode ajustá-lo de acordo com suas necessidades.

--min-tokens: Define o número mínimo de tokens (unidades léxicas) para um trecho de código duplicado ser relatado. Por padrão, o valor é 70 tokens. Ajustar esse valor pode ajudar a filtrar duplicações menores e focar em áreas mais significativas.

--progress: Exibe uma barra de progresso durante a análise para acompanhar o status e o progresso do PHPCPD.

Esses são apenas alguns dos parâmetros disponíveis no PHPCPD. Você pode consultar a documentação oficial ou executar phpcpd --help no seu ambiente para obter uma lista completa de parâmetros e suas descrições.

> $> ** USER:: Fale mais sobre o phpcp**

O PHPCPD (PHP Copy/Paste Detector) é uma ferramenta de análise de código-fonte em PHP que ajuda a identificar trechos de código duplicados ou semelhantes em um projeto. Foi desenvolvido para auxiliar na detecção de práticas de desenvolvimento inadequadas, reduzir a duplicação de código e melhorar a manutenibilidade do software.

A detecção de código duplicado é importante porque a duplicação excessiva pode levar a problemas como:

1. Manutenção difícil: Quando um trecho de código duplicado precisa ser corrigido ou atualizado, é necessário fazer essas alterações em várias partes do código, o que aumenta a complexidade e o tempo necessário para a manutenção.
2. Risco de erros: Se uma correção ou melhoria for aplicada em um trecho de código duplicado, é fácil esquecer de aplicá-la em todas as outras instâncias, resultando em comportamentos inconsistentes e possíveis erros no sistema.
3. Código inchado: A duplicação de código pode levar a um código-fonte inflado e desnecessariamente longo, tornando-o mais difícil de entender e dar manutenção.

O PHPCPD funciona examinando o código PHP em busca de sequências de tokens idênticas ou semelhantes. Ele compara blocos de código em diferentes arquivos e relata as semelhanças encontradas, indicando as linhas de código duplicadas e os arquivos envolvidos.

Ao identificar trechos de código duplicados, o PHPCPD fornece informações úteis para os desenvolvedores:

1. Localização precisa: Ele informa quais arquivos contêm o código duplicado e as linhas exatas onde a duplicação ocorre, facilitando a localização e ação corretiva.
2. Estatísticas de duplicação: O PHPCPD apresenta estatísticas sobre a quantidade de duplicações encontradas, incluindo a porcentagem do código duplicado em relação ao código total analisado.
3. Configurações flexíveis: Ele oferece uma variedade de parâmetros de linha de comando que permitem personalizar a análise, como especificar arquivos ou diretórios a serem analisados, definir o número mínimo de linhas ou tokens para considerar um trecho duplicado e excluir arquivos ou diretórios da análise.

Em resumo, o PHPCPD é uma ferramenta útil para identificar e corrigir duplicações de código em projetos PHP, contribuindo para um código mais limpo, organizado e de fácil manutenção.

### PHPMD - the PHP mess detector

O PHPMD é uma ferramenta que detecta problemas potenciais no código, conhecidos como "code smells", que podem causar bugs, comportamento inesperado e dificuldade na manutenção. Ele aplica regras específicas para evitar problemas relacionados ao estilo de código. 

O PHPMD é a ferramenta default do PHP para isso, sendo muitíssimo útil na identificação e correção de problemas no código.

**Instalar**

```
$ composer require phpmd/phpmd --dev
```

**Usar em forma text**

```
$ vendor/bin/phpmd src text cleancode, codesize 
```

==> Com esse comando, vai busca rna pasta `src/`, vai ler os arquivos e detectar problemas quanto ao clean code e code size. O resultado vai ser gerado no CLI, por isso o `text`

**Usar como HTML**

Você pode usar o PHPMD para gerar um arquivo HTML que lista tudo com muito detalhe e interativo:

```
$ vendor/bin/phpmd src html cleancode,codesize > phpmd_report.html
```

**Rules e Rulests**

+ cleancode - Enforces clean code in general
+ codesize - Checks for long or complex code blocks
+ controversial - Checks for best and bad practices where there are
controversial opinions about them
+ design - Helps find software design-related issues
+ naming - Avoids names that are too long or short
+ unused - Detects unused code that can be deleted

#### Usar PHPMD em projetos legados

Muitas vezes, você deseja usar o PHPMD para um projeto existente. Neste caso, você mais provavelmente ficará impressionado com os inúmeros avisos que lançará na primeira execução. Não dê up – existem algumas opções para te ajudar!

Você pode modifica o arquivo xml usado pelo phpmd para adicionar ou excluir algumas regras. Pois, em projetos legados, deve gerar tanta coisa ....

Ao instalar o phpmd ele cria na raiz do projeto o arquivo `phpmd.xml` que é o arquivo de configuração.

Ele vem como padrão na seguinte forma:

````xml
<?xml version="1.0"?>
<ruleset name="My first PHPMD rule set"
         xmlns="http://pmd.sf.net/ruleset/1.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://pmd.sf.net/ruleset/1.0.0
                       http://pmd.sf.net/ruleset_xml_schema.xsd"
         xsi:noNamespaceSchemaLocation="
                       http://pmd.sf.net/ruleset_xml_schema.xsd">
    <description>
        Rule set which contains all codesize and cleancode rules
    </description>

    <rule ref="rulesets/codesize.xml" />
    <rule ref="rulesets/cleancode.xml" />
</ruleset>
````

The <rule> tag is important for us. In the preceding example, we referenced both the codesize
and cleancode rules.

DICA: At this point, it is a good idea to dig through the built-in rule sets in the GitHub repository
https://github.com/phpmd/phpmd/tree/master/src/main/resources/ rulesets. Thanks to XML being a quite verbose file format, you will get familiar with it very quickly.

**Remover uma expressão**

Imagine we want to remove the mentioned ElseExpression rule from our checks. To achieve
this, you just need to add an <exclude> tag within the according <rule> tag as follows:

````xml
<rule ref="rulesets/cleancode.xml">
    <exclude name="ElseExpression" />
</rule>
````

**Pegar somente certas regras**

If you just want to pick certain rules from different rulesets, you can also go the other way round and reference the desired rules directly. If you want your custom ruleset to only include the StaticAccess and UndefinedVariable rules, your XML file should contain the following two tags:

````xml
<rule ref="rulesets/cleancode.xml/StaticAccess" />
<rule ref="rulesets/cleancode.xml/UndefinedVariable" />
````

**Como usar o novo .xml**

Tem que declara o arquivo no comando

```
$ vendor/bin/phpmd src text phpmd.xml
```

**Suppressing warnings**

Usa a notação para pular uma warning: @SuppressWarnings

````php
/**
* @SuppressWarnings(PHPMD.StaticAccess)
*/
class ExampleClass {
    public function getUser(int $id): User {
        return User::find($id);
    }
}
````

Let us assume one class in your project makes use of a static method call and that cannot be changed right now. By default, any static access will throw a warning. Since you do not want to use static access anywhere else in your code, but just in this class, removing the StaticAccess rule would be counterproductive.

**Accepting violations**

Você pode escolher aceitar as violações existentes.

Or example, when you want to use PHPMD on a legacy project, you can decide to ignore all violations that are already in the code for now. However, if new violations are introduced by a new class, they will be reported.

Luckily, PHPMD makes this task quite easy by providing a so-called baseline file, which it will generate
for you automatically by running the following:

```
$ vendor/bin/phpmd src text phpmd.xml --generate-baseline
```

In the preceding command, we expect that a phpmd.xml file already exists in the project root
folder. Using the preceding command, PHPMD will now create a file called phpmd.baseline.xml.

Now, you may run the following:

```
$ vendor/bin/phpmd src text phpmd.xml
```

The next time, PHPMD will automatically detect the previously generated baseline file and use it to
suppress all warnings accordingly. However, if a new rule violation is introduced in a new location,
it will still be detected and reported as a violation.

**PHPMD Recap**

A menos que você esteja começando um projeto do zero, a configuração do PHPMD exigirá um pouco mais de tempo. Especialmente se você estiver trabalhando em equipe, você passará mais tempo discutindo quais regras usar e quais excluir. No entanto, uma vez que isso seja feito, você terá uma ferramenta poderosa à sua disposição que ajudará os desenvolvedores a escrever código de alta qualidade e fácil manutenção.

#### PHPMD - ChatGPT

> $> O que é PHPMD

O PHPMD (PHP Mess Detector) é uma ferramenta de análise estática de código para PHP que ajuda a identificar problemas e padrões de código potencialmente problemáticos. Ele examina o código-fonte PHP em busca de possíveis más práticas, complexidade excessiva, código duplicado, acoplamento forte, entre outros problemas.

O objetivo principal do PHPMD é ajudar os desenvolvedores a melhorar a qualidade do código, detectando problemas que podem afetar a manutenibilidade, legibilidade e desempenho do software.

Algumas das verificações que o PHPMD realiza incluem:

Complexidade do código: O PHPMD mede a complexidade de um método ou função com base em fatores como o número de declarações condicionais, loops e chamadas de função. Ele fornece métricas como o número de pontos de decisão, que podem ajudar a identificar código complexo e difícil de entender.

Acoplamento: O PHPMD analisa as dependências entre classes e componentes, identificando acoplamentos fortes e indicando áreas onde o código pode ser reestruturado para melhorar a modularidade e a flexibilidade.

Código duplicado: Assim como o PHPCPD, o PHPMD também é capaz de identificar trechos de código duplicados em um projeto. Ele pode ajudar a encontrar áreas que podem ser refatoradas para promover a reutilização e evitar a duplicação desnecessária.

Regras de boas práticas: O PHPMD também implementa várias regras baseadas em práticas recomendadas de programação. Ele verifica o código em busca de problemas comuns, como variáveis não utilizadas, parâmetros de função não utilizados, nomeação inadequada de variáveis e métodos, uso inadequado de estruturas de controle, entre outros.

O PHPMD pode ser integrado em fluxos de trabalho de desenvolvimento contínuo (CI/CD) e IDEs populares, como o PhpStorm, para fornecer feedback instantâneo sobre a qualidade do código enquanto você escreve ou realiza verificações automatizadas.

Em resumo, o PHPMD é uma ferramenta valiosa para análise estática de código PHP, ajudando a identificar problemas de qualidade de código e promovendo melhores práticas de programação. Ele fornece insights e sugestões para melhorar a legibilidade, manutenibilidade e desempenho do código PHP.
> $> Como instalar o PHPMD

Para instalar o PHPMD (PHP Mess Detector), siga estas etapas:

Verifique se você tem o PHP instalado em seu sistema. O PHPMD requer o PHP versão 7.2 ou superior. Você pode verificar a versão do PHP digitando o seguinte comando no terminal:

Instale o PHPMD usando o Composer. Certifique-se de ter o Composer instalado em seu sistema. Se você ainda não tiver o Composer, pode baixá-lo e instalá-lo seguindo as instruções em https://getcomposer.org/.

Abra o terminal e navegue até o diretório raiz do seu projeto PHP.

Execute o seguinte comando para instalar o PHPMD via Composer:

```
composer require --dev phpmd/phpmd
```

Isso instalará o PHPMD e suas dependências no diretório vendor do seu projeto.

Após a instalação, você pode executar o PHPMD para analisar seu código-fonte PHP. Use o seguinte comando:

```
vendor/bin/phpmd [diretório ou arquivo] [formato de saída] [regras]
```

Substitua [diretório ou arquivo] pelo diretório ou arquivo que você deseja analisar. Por exemplo, para analisar todos os arquivos PHP em um diretório chamado src, você pode executar:

```
vendor/bin/phpmd src text cleancode,codesize,controversial,design,naming,unusedcode
```

O PHPMD analisará o código-fonte e exibirá os resultados da análise de acordo com as regras especificadas. No exemplo acima, foram especificadas várias categorias de regras, como cleancode, codesize, controversial, design, naming e unusedcode, para uma análise abrangente.

O PHPMD oferece muitas regras diferentes que podem ser ativadas ou desativadas conforme necessário. Você pode consultar a documentação oficial do PHPMD para obter mais informações sobre as regras disponíveis e como personalizar a análise de acordo com suas necessidades.

Lembre-se de que é recomendável executar o PHPMD regularmente durante o desenvolvimento do projeto para identificar e corrigir problemas de qualidade de código. Isso ajudará a melhorar a legibilidade, manutenibilidade e desempenho do seu código PHP.

> $> Resuma a importancia e pra que serve o PHPMD em poucas linhas


O PHPMD (PHP Mess Detector) é uma ferramenta essencial para melhorar a qualidade do código PHP. Ele ajuda a identificar problemas de código, como complexidade excessiva, acoplamento forte, duplicação e más práticas. O PHPMD promove a legibilidade, manutenibilidade e desempenho do código, fornecendo feedback valioso para os desenvolvedores e permitindo a correção de problemas de qualidade antes que eles se tornem mais difíceis de lidar. É uma ferramenta indispensável para garantir a consistência, modularidade e escalabilidade do código PHP.


> $> Mostre os prompts mais usados do PHPMD
ChatGPT
Aqui estão alguns dos prompts mais usados do PHPMD:

unusedcode: Identifica métodos, propriedades, parâmetros e variáveis não utilizados no código.

design: Detecta problemas de design, como classes com muitas responsabilidades, falta de coesão e baixo acoplamento.

codesize: Verifica a complexidade do código, incluindo o número de linhas por arquivo, complexidade ciclomática e tamanho excessivo de classes e métodos.

cleancode: Aplica regras relacionadas à legibilidade do código, como nomes de variáveis e métodos significativos, controle de fluxo simplificado e remoção de código duplicado.

controversial: Detecta práticas controversas que podem levar a problemas, como uso excessivo de comentários, dependências excessivas e manipulação insegura de exceções.

naming: Verifica a consistência e a adequação dos nomes de variáveis, métodos, classes e namespaces, seguindo convenções de nomenclatura recomendadas.

Esses são apenas alguns dos prompts disponíveis no PHPMD. Você pode personalizar a análise, ativando ou desativando prompts específicos, conforme necessário, com base nas necessidades do seu projeto e nas melhores práticas de codificação.



> $> Escreva um prompt com todas essa regras juntas

Para usar todas as regras mencionadas juntas em um prompt do PHPMD, você pode usar o seguinte comando:

```
vendor/bin/phpmd [diretório ou arquivo] text unusedcode,design,codesize,cleancode,controversial,naming
```

Substitua [diretório ou arquivo] pelo diretório ou arquivo que você deseja analisar. Por exemplo, para analisar todos os arquivos PHP em um diretório chamado src, você pode executar:

```
vendor/bin/phpmd src text unusedcode,design,codesize,cleancode,controversial,naming
```

Isso executará o PHPMD com todas as regras ativadas e exibirá os resultados em formato de texto. O PHPMD analisará o código-fonte e fornecerá informações sobre problemas de código potenciais relacionados a código não utilizado, design, tamanho, estilo limpo, práticas controversas e nomenclatura inadequada.

Isso executará o PHPMD com todas as regras ativadas e exibirá os resultados em formato de texto. O PHPMD analisará o código-fonte e fornecerá informações sobre problemas de código potenciais relacionados a código não utilizado, design, tamanho, estilo limpo, práticas controversas e nomenclatura inadequada.

Lembre-se de que você pode ajustar as regras de acordo com suas necessidades específicas, ativando ou desativando prompts individuais ou adicionando outras regras conforme necessário. Certifique-se de consultar a documentação oficial do PHPMD para obter informações completas sobre as opções disponíveis e como personalizar a análise.

> $> Como fazer para o phpmd gerar arquivo html como relatório?


Para fazer o PHPMD gerar um arquivo HTML como relatório, você pode usar a opção de saída html e redirecionar a saída para um arquivo. Siga as etapas abaixo:

Abra o terminal e navegue até o diretório raiz do seu projeto PHP.

Execute o seguinte comando para gerar o relatório HTML:

```
vendor/bin/phpmd [diretório ou arquivo] html [regras] > relatorio.html
```

Substitua [diretório ou arquivo] pelo diretório ou arquivo que você deseja analisar e [regras] pelas regras que deseja aplicar. Por exemplo:

Substitua [diretório ou arquivo] pelo diretório ou arquivo que você deseja analisar e [regras] pelas regras que deseja aplicar. Por exemplo:

> $> Onde fica o arquivo de configuração do PHPMD

O arquivo de configuração do PHPMD é chamado de .phpmd.xml e geralmente fica localizado na raiz do seu projeto PHP. No entanto, é possível especificar um arquivo de configuração personalizado com um nome diferente ou em uma localização diferente.

Por padrão, o PHPMD procura pelo arquivo de configuração .phpmd.xml na pasta raiz do projeto. Se não encontrar esse arquivo, ele usa suas configurações padrão internas.

O arquivo .phpmd.xml permite que você personalize as regras, ignore diretórios ou arquivos específicos, configure a formatação do relatório e muito mais. Você pode definir as regras a serem ativadas ou desativadas, ajustar os níveis de severidade das regras e personalizar as configurações de cada regra individualmente.

Se você deseja usar um arquivo de configuração com um nome diferente, ou em uma localização diferente, pode especificar o arquivo de configuração personalizado usando a opção --configuration ao executar o PHPMD:

```
vendor/bin/phpmd [diretório ou arquivo] [formato de saída] [regras] --configuration caminho/para/arquivo.xml
```


Substitua caminho/para/arquivo.xml pelo caminho e nome do seu arquivo de configuração personalizado.

Certifique-se de consultar a documentação oficial do PHPMD para obter mais informações sobre a estrutura e as opções de configuração disponíveis no arquivo .phpmd.xml.


> $> Como suprimir warnings no PHPMD


No PHPMD, você pode usar a diretiva @SuppressWarnings para suprimir avisos (warnings) específicos em partes do seu código onde você não deseja que sejam relatados.

Para suprimir um aviso específico, siga as etapas abaixo:

Identifique o aviso específico que deseja suprimir. O aviso será indicado por um número de regra fornecido pelo PHPMD. Por exemplo, se o aviso for gerado pela regra "UnusedLocalVariable", você encontrará o número de regra correspondente a ele.

Vá para a parte do código onde você deseja suprimir o aviso e adicione a diretiva @SuppressWarnings seguida do número da regra.

Por exemplo:

```
// @SuppressWarnings("UnusedLocalVariable")
$unusedVariable = 42;
```

Com essa diretiva, o aviso "UnusedLocalVariable" será suprimido para essa linha específica de código.

Com essa diretiva, o aviso "UnusedLocalVariable" será suprimido para essa linha específica de código.

Você pode usar a diretiva @SuppressWarnings em nível de método, classe ou até mesmo em um escopo menor, como uma variável ou um bloco de código. Certifique-se de usar o número correto da regra para suprimir o aviso específico que você deseja ignorar.

Lembre-se de que a supressão de avisos deve ser usada com cuidado. É importante entender as razões por trás de um aviso antes de optar por suprimi-lo, pois pode indicar problemas potenciais no código. A supressão excessiva de avisos pode levar a uma diminuição da qualidade e da manutenibilidade do código.


> $> Como aceitar violaçoes no PHPMD

Se você deseja aceitar (ignorar) violações específicas no PHPMD, pode usar a diretiva @SuppressWarnings em conjunto com o número da regra correspondente para indicar que determinada violação deve ser aceita.

Siga estas etapas para aceitar violações no PHPMD:

Identifique o número da regra correspondente à violação que você deseja aceitar. Os números das regras são fornecidos pelo PHPMD e indicam o tipo específico de violação.

Vá para o local no seu código onde a violação ocorre e adicione a diretiva @SuppressWarnings seguida do número da regra que deseja aceitar.

Por exemplo:

```
// @SuppressWarnings("RuleNumber")
// Código que viola a regra
```

Com essa diretiva, a violação da regra com o número "RuleNumber" será aceita e não será relatada pelo PHPMD.

Lembre-se de usar a diretiva @SuppressWarnings com cautela e apenas para violações específicas que você tem uma razão válida para aceitar. Suprimir violações em excesso pode resultar em código de menor qualidade e tornar a manutenção mais difícil no futuro.

Certifique-se de entender o impacto das violações que você está aceitando e considere se há uma abordagem melhor para lidar com elas, como refatoração do código para corrigir os problemas subjacentes.

### PHPStan – a static analyzer for PHP

PHPStan  = Focado em to analyze our code with bad PHP practices in mind now.

**instalar**

```
$ composer require phpstan/phpstan --dev
```

**executar**

```
$ vendor/bin/phpstan analyse src
```

**Níveis de Rules**

These levels have been defined by the developers of PHPStan, starting from level 0 (just performing basic checks) to level 9 (being very strict on issues). To not overwhelm users with errors at first, PHPStan by default will use level 0, which only executes very few checks.

You can specify the level using the level (-l|--level) option. Let us try the next highest level:

```
$ vendor/bin/phpstan analyse --level 1 src
```

Using the level approach, you can effortlessly increase the quality of your code step by step, as we will
demonstrate using the following, made-up example.

**Arquivo de configuração**

You can use configuration files to make sure that the same level and the same folders are always checked.
The configuration is written in NEON (https://ne-on.org/), a file format that is very similar to YAML; if you can read and write YAML, it will work out just fine.

The basic configuration only contains the level and the folders to be scanned:

````neon
parameters:
    level: 4
    paths:
        - src
````

```
$ vendor/bin/phpstan analyse
```

#### Usando PHPStan em projetos legados

Semelhante ao PHPMD

**Anotações para ignorar**

To ignore a line of code, simply add a comment before or on the affected line, using the special @
phpstan-ignore-next-line and @phpstan-ignore-line PHPDocs annotations:

```
// @phpstan-ignore-next-line
```

```
$exampleClass->foo();
$exampleClass->bar(); // @phpstan-ignore-line
```

Both lines of code will not be scanned for errors anymore. It is up to you to choose the way you prefer. 

It is not possible to ignore bigger code blocks or even entire functions or classes, though (unless you
want to add a comment to every line, that is).

**Ignorar alguns erros em específico**

To ignore this error, we need to add the ignoreErrors parameter to our phpstan.neon
configuration file:

````
parameters:
    level: 6
    paths:
        - src
    ignoreErrors:
        - '#^Method OrderPosition\:\:getGrossPrice\(\) has no
return type specified\.$#'
````

**Baseline - Ignorar o  anterior e pegar erros no próximo**

Semelhante ao PHPMD

Você vai criar uma analise e depois usar elas nas próximas, assim vai ignorar aquela

```
$ vendor/bin/phpstan analyse --generate-baseline # cria arqtiov phpstan-baseline.neon
```

The next time you run PHPStan now, any previously reported errors should not be reported anymore.

**Recap**


PHPStan is a powerful tool. We cannot cover all its functionality in just a few pages but we have
given you a good idea of how to start using it. Once you are familiar with its basic usage, check out
https://phpstan.org to learn more!

#### PHPStan - ChatGPT

>  $> O que é PHPStan

PHPStan é uma ferramenta de análise estática para o PHP. Ela é projetada para ajudar os desenvolvedores a encontrar erros em potencial, problemas de tipo e possíveis falhas no código PHP durante a fase de desenvolvimento.

Ao contrário de uma análise dinâmica que ocorre durante a execução do código, a análise estática é feita em tempo de compilação ou por meio de ferramentas externas. O PHPStan utiliza análise estática para examinar o código-fonte PHP e identificar erros comuns, como chamadas de função inválidas, referências a variáveis não declaradas, problemas de tipo, entre outros.

O PHPStan verifica a conformidade do código com as regras definidas em níveis de severidade configuráveis. Ele fornece um relatório detalhado dos problemas encontrados, incluindo a localização exata do código-fonte onde ocorreram os erros. Isso ajuda os desenvolvedores a corrigir esses problemas antes mesmo de executar o código, evitando assim erros e problemas em tempo de execução.

O PHPStan é uma ferramenta amplamente utilizada na comunidade PHP, especialmente em projetos maiores e mais complexos, onde é fundamental garantir a qualidade do código. Ao utilizar o PHPStan, os desenvolvedores podem detectar e corrigir erros mais cedo no processo de desenvolvimento, economizando tempo e reduzindo a ocorrência de erros em produção.

>  $> Quais são os níveis de análise do PHPStan?

O PHPStan possui sete níveis de análise, que são usados para definir a severidade dos problemas encontrados durante a verificação estática do código. Esses níveis são:

Nível 0: O PHPStan não gera erros ou avisos neste nível. Ele é útil quando você deseja executar apenas uma verificação sintática básica, sem análise de tipo.

Nível 1: Erros críticos são relatados neste nível. Esses erros indicam problemas sérios no código que podem levar a falhas durante a execução.

Nível 2: Além dos erros críticos, também são relatados avisos de incompatibilidade de tipo. Isso inclui atribuições de tipo incorretas, chamadas de função com argumentos incompatíveis, entre outros.

Nível 3: Neste nível, o PHPStan também relata avisos sobre o uso de recursos obsoletos e descontinuados no código.

Nível 4: Além dos avisos de nível 3, o PHPStan também relata avisos sobre problemas de código menos graves, como uso de variáveis não utilizadas, código inalcançável e outras questões de qualidade do código.

Nível 5: Este é o nível recomendado para a maioria dos projetos. Ele inclui todos os avisos de níveis anteriores, além de relatar avisos sobre padrões de codificação que podem ser melhorados para seguir as boas práticas do PHP.

Nível 6: Este é o nível mais rigoroso e abrangente. Ele inclui todas as verificações e relatórios disponíveis no PHPStan, cobrindo desde erros críticos até problemas de estilo de código.

Os níveis de análise do PHPStan permitem que você escolha a profundidade da análise estática que deseja realizar em seu código, de acordo com as necessidades do seu projeto e o grau de rigor que deseja aplicar em relação à qualidade e robustez do código PHP.

>  $> Onde fica o arquivo de configuração do STAN

O arquivo de configuração do PHPStan é chamado de phpstan.neon. Ele deve ser colocado na raiz do seu projeto ou em um diretório específico designado para configuração. O PHPStan procura por esse arquivo automaticamente na raiz do projeto e em outros diretórios específicos.

Se o arquivo phpstan.neon não estiver presente no diretório raiz do seu projeto, você também pode especificar manualmente o caminho para o arquivo de configuração ao executar o PHPStan. Por exemplo, você pode usar o seguinte comando para executar o PHPStan com um arquivo de configuração personalizado:

````
phpstan analyze --configuration=/caminho/para/o/arquivo/phpstan.neon
````

Dentro do arquivo phpstan.neon, você pode configurar várias opções, como níveis de análise, diretórios de código a serem analisados, extensões a serem carregadas, regras personalizadas e muito mais. O arquivo de configuração permite que você ajuste o comportamento do PHPStan de acordo com as necessidades específicas do seu projeto.


>  $> Como usar o baseline no PHPStan

O recurso de "baseline" no PHPStan permite que você crie uma linha de base de erros conhecidos em seu código. Isso é útil quando você deseja introduzir o PHPStan em um projeto existente que já possui muitos erros conhecidos e não quer que eles sejam relatados como novos erros.

Para usar o baseline no PHPStan, siga estas etapas:

Execute o PHPStan em seu projeto e salve a saída em um arquivo de texto. Por exemplo:

````
phpstan analyze > baseline.txt
````

Analise o arquivo de saída baseline.txt e remova quaisquer erros que você conheça e não deseja que sejam relatados como novos erros. Isso pode incluir erros que você está ciente, mas optou por não corrigir imediatamente.

Salve o arquivo baseline.txt atualizado.

Execute novamente o PHPStan, desta vez passando o arquivo de linha de base como parâmetro:

````
phpstan analyze --baseline=baseline.txt
````

O PHPStan usará o arquivo de linha de base para ignorar os erros conhecidos que foram especificados nele. A saída do PHPStan agora mostrará apenas os erros que não estão presentes na linha de base.

O uso do recurso de baseline no PHPStan permite que você introduza gradualmente a análise estática em seu projeto, começando com uma linha de base de erros conhecidos e corrigindo-os ao longo do tempo, enquanto ainda recebe notificações sobre novos erros.

### Psalm: A PHP static analysis linting machine

Site: https://psalm.dev/docs

**Instalar**

Once again, installing Psalm with Composer is just a matter of a few keystrokes:

```
$ composer require --dev vimeo/psalm
```

It is available as a phar file as well.

After installation, we cannot just start, though – rather, we need to set up a configuration file for the current project first. We can use the comfortable --init option to create it:

```
$ vendor/bin/psalm --init
```

This command will write a configuration file called psalm.xml in the current directory, which
should be the project root. During its creation, Psalm checks whether it can find any PHP code and decides which error level is suitable, to begin with. Running Psalm doesn’t require any more options:

```
$ vendor/bin/psalm
```



#### Using Psalm in legacy projects

**Tipos de codeissues mostrados em tela**

here are three code issue levels: info, error, and suppress. While info will just print info
messages if minor issues have been found, issues that are at the level of an error type, on the other hand, require you to get active. An issue of the suppress type will not be shown at all.

**Docblock suppression**

The @psalm-suppress annotation can be used either in a function docblock or a comment for
the next line. The Vat class from the previous examples could look as follows:

````php
class Vat
{
    private float $vat = 0.19;
    /**
     * @psalm-suppress InvalidReturnType
     */
    public function getVat(): int
    {
        /**
         * @psalm-suppress InvalidReturnStatement
         */
        return $this->vat;
    }
}
````

**Configuration file spression**

Modificar o arquivo xml

````xml
issueHandlers>
    <InvalidReturnType>
        <errorLevel type="suppress">
            <file name="Vat.php" />
        </errorLevel>
    </InvalidReturnType>
    <InvalidReturnStatement>
        <errorLevel type="suppress">
            <dir name="src/Vat" />
````

**Baseline**

Baseline As with the previous static code analyzers we discussed, Psalm also provides a feature to generate a baseline file, which will include all the current errors so that they will be ignored during the next run. Please note that the baseline feature only works for error issues, but not info issues. Let us create the file first:

```
$ vendor/bin/psalm --set-baseline=psalm-baseline.xml
```

Psalm has no default name for this file, so you need to pass it as an option to the command:

```
$ vendor/bin/psalm --use-baseline=psalm-baseline.xml
```

You can also add it as an additional attribute to the \<psalm\> node in the configuration file:
\<psalm\
    ...
    errorBaseline="./psalm-baseline.xml"

>
Finally, you can update the baseline file – for example, after you have made some improvements to the code:

```
$ vendor/bin/psalm --update-baseline
```

#### Usar Psalm para corrigi código

```
$ vendor/bin/psalm --alter --issues=InvalidReturnType --dry-run
```

The --dry-run option tells Psalm to only show you what it would change as diff, but not to apply the changes.


**A recap on Psalm**

Psalm is a standard tool in the clean coder’s toolkit for good reason. It is fast, easy to use, and powerful. Additionally, the code manipulation feature will save you a lot of time. Of course, there are numerous similarities with PHPStan, but often enough, you will find both tools working together on the same code base without problems. At least, you should consider giving it a try.

#### ChatGT - Psalm

> $> O que é Psalm

O Psalm é uma ferramenta de análise estática de código para projetos escritos em PHP. Ele é usado para ajudar os desenvolvedores a encontrar erros e problemas potenciais em seu código antes mesmo de executá-lo.

O Psalm utiliza uma abordagem de análise estática, o que significa que ele examina o código-fonte do PHP sem executá-lo, identificando problemas comuns, como erros de tipagem, chamadas de função inexistentes, referências a variáveis indefinidas, entre outros. Ele também fornece recursos avançados, como inferência de tipo e detecção de erros de fluxo de controle.

Além de encontrar problemas no código, o Psalm também oferece recursos para melhorar a legibilidade e a manutenibilidade do código, como sugestões de correção e dicas de estilo de codificação.

O Psalm é uma ferramenta de linha de comando que pode ser integrada a pipelines de integração contínua (CI/CD) ou executada manualmente durante o desenvolvimento. É uma opção popular entre os desenvolvedores PHP que desejam melhorar a qualidade e a robustez de seus projetos.

> $> Como instalar e usar em meu projeto o Psalm

Para instalar e usar o Psalm em seu projeto PHP, você pode seguir os seguintes passos:

1. Requisitos:

   - Certifique-se de ter o PHP instalado em seu sistema.
   - Verifique se o Composer (gerenciador de dependências do PHP) está instalado.

2. Crie um arquivo `composer.json` no diretório raiz do seu projeto ou, se já existir, abra o arquivo existente.

3. Adicione o Psalm como uma dependência ao seu projeto. No arquivo `composer.json`, adicione o seguinte código ao array `"require-dev"`:

   ```
   jsonCopy code"require-dev": {
       "vimeo/psalm": "^4.10"
   }
   ```

   Certifique-se de atualizar a versão especificada conforme necessário.

4. Salve o arquivo `composer.json` e execute o seguinte comando no terminal, na raiz do seu projeto:

   ```
   Copy codecomposer install
   ```

   Isso instalará o Psalm e suas dependências no diretório do seu projeto.

5. Após a instalação, você pode executar o Psalm para analisar seu código. No terminal, digite o seguinte comando:

   ```
   bashCopy codevendor/bin/psalm
   ```

   Isso iniciará a análise estática do seu código PHP.

O Psalm lerá o código-fonte do seu projeto, analisará-o e fornecerá relatórios sobre erros, problemas de tipagem e outras questões encontradas.

Você também pode personalizar a configuração do Psalm criando um arquivo `psalm.xml` ou `psalm.xml.dist` no diretório raiz do seu projeto. Nesse arquivo, você pode especificar configurações adicionais, como diretórios a serem ignorados ou regras de análise personalizadas.

Lembrando que o Psalm é uma ferramenta poderosa de análise estática, mas pode levar algum tempo para se familiarizar com suas configurações e interpretar os resultados. É uma boa prática integrar o Psalm em seu fluxo de trabalho de desenvolvimento contínuo para aproveitar ao máximo seus recursos de verificação de código.

> $> Como ignorar trechos de código e usar baseline no Psalm

No Psalm, é possível ignorar trechos específicos de código e usar um arquivo de referência chamado "baseline" para gerenciar as exceções ou problemas conhecidos que você não deseja que o Psalm relatar. Aqui estão os passos para realizar essas ações:

1. Ignorar trechos de código:

   - Se você deseja que o Psalm ignore um trecho específico de código, pode usar a anotação `psalm-suppress` ou `phpstan-ignore-next-line` para suprimir os erros ou avisos.

   - Por exemplo, se você deseja ignorar um erro de tipo em uma chamada de função, você pode adicionar a seguinte anotação imediatamente acima da linha com o erro:

     ```
     phpCopy code/** @psalm-suppress TypeCoercion */
     ```

     Isso instruirá o Psalm a não relatar erros de tipo na linha especificada.

   - Você também pode usar a anotação `@psalm-suppress` com argumentos mais específicos, como nomes de erros ou níveis de severidade. Consulte a documentação do Psalm para obter mais detalhes sobre como utilizar as anotações corretamente.

2. Usar baseline:

   - A baseline é um arquivo de referência que contém problemas conhecidos ou exceções que você deseja ignorar temporariamente. Ela permite que você trabalhe gradualmente para corrigir problemas sem ser sobrecarregado com uma grande quantidade de erros relatados pelo Psalm.

   - Para criar um arquivo de baseline, execute o seguinte comando no terminal, na raiz do seu projeto:

     ```
     pythonCopy codevendor/bin/psalm --set-baseline
     ```

   - O comando acima criará um arquivo `psalm-baseline.xml` que servirá como a sua referência inicial.

   - Em seguida, você pode executar o Psalm normalmente e ele usará o arquivo de baseline para ignorar os problemas relatados que estão listados nele.

   - Quando você corrigir um problema ou resolver uma exceção, pode remover a entrada correspondente do arquivo de baseline.

É importante observar que o uso de supressões ou baseline deve ser feito com cuidado e apenas quando necessário. Essas funcionalidades são úteis para gerenciar casos específicos, mas é importante garantir que você esteja resolvendo e corrigindo problemas em seu código em vez de simplesmente ignorá-los permanentemente.


> $> Qual é o arquivo de configuração do Psalm e onde ele fica

O arquivo de configuração do Psalm é chamado de `psalm.xml` ou `psalm.xml.dist`. Ele é usado para definir as configurações específicas do projeto e personalizar o comportamento do Psalm durante a análise estática do código PHP.

O arquivo de configuração do Psalm pode ser colocado no diretório raiz do seu projeto. Se você optar por usar o arquivo `psalm.xml`, ele terá precedência sobre o `psalm.xml.dist`. O `psalm.xml.dist` é geralmente usado como um modelo ou configuração padrão que pode ser copiado e renomeado para `psalm.xml` para personalizar as configurações específicas do projeto.

Dentro do arquivo `psalm.xml`, você pode definir várias configurações, como:

- Ignorar diretórios ou arquivos específicos durante a análise.
- Definir namespaces adicionais a serem carregados pelo Psalm.
- Configurar regras personalizadas para análise, como níveis de severidade para erros específicos.
- Especificar arquivos de configuração adicionais.
- Configurar plugins e integrações com outras ferramentas.

Ao executar o comando `vendor/bin/psalm`, o Psalm procurará automaticamente pelo arquivo de configuração `psalm.xml` ou `psalm.xml.dist` no diretório raiz do projeto e usará as configurações definidas nele.

Você pode consultar a documentação oficial do Psalm para obter mais detalhes sobre as opções de configuração disponíveis e como personalizar o arquivo de configuração de acordo com as necessidades do seu projeto.

> $> Qual a diferença do Psalm para o PHPStan

O Psalm e o PHPStan são duas ferramentas populares de análise estática de código para projetos em PHP. Embora ambos tenham funcionalidades semelhantes, existem algumas diferenças importantes entre eles:

1. Filosofia e abordagem:
   - O Psalm foi projetado com uma abordagem mais conservadora em relação ao PHP, priorizando a segurança e a precisão das verificações de tipo. Ele é conhecido por ser mais rigoroso na detecção de erros de tipo e na inferência de tipos.
   - O PHPStan, por outro lado, adota uma abordagem mais permissiva. Ele tenta inferir tipos da melhor maneira possível, mas também permite uma certa flexibilidade no tratamento de erros de tipo.
2. Experiência de uso:
   - O Psalm é amplamente reconhecido por sua saída de erro detalhada e mensagens claras, o que facilita a depuração e correção de problemas no código.
   - O PHPStan também oferece mensagens de erro úteis, embora possa haver uma pequena diferença na clareza e detalhes em comparação com o Psalm.
3. Requisitos e integração:
   - O Psalm requer o PHP na versão 7.1 ou superior, enquanto o PHPStan pode ser usado com versões anteriores, como o PHP 5.6.
   - Ambas as ferramentas podem ser integradas a pipelines de CI/CD (Integração Contínua/Entrega Contínua) para automatizar a análise estática do código.
4. Ecossistema e comunidade:
   - Tanto o Psalm quanto o PHPStan têm comunidades ativas e suporte contínuo. Ambos têm documentação detalhada e são atualizados regularmente para acompanhar as últimas versões do PHP.

A escolha entre o Psalm e o PHPStan geralmente depende das preferências pessoais, das necessidades do projeto e da experiência do desenvolvedor. Alguns desenvolvedores podem preferir o rigor e a precisão do Psalm, enquanto outros podem se sentir mais confortáveis com a abordagem mais permissiva do PHPStan. É recomendado experimentar ambas as ferramentas em seu projeto e decidir qual se encaixa melhor em suas necessidades específicas.

## Extensões do IDE - VSCODE

A principal é o PHP Intelephense.

A integração de ferramentas de qualidade de código no VS Code é semelhante ao PhpStorm e é possível usar plugins, como:

- PHPStan (https://marketplace.visualstudio.com/items?itemName=calsmurf2904.vscode-phpstan)
- PHP CS Fixer (https://marketplace.visualstudio.com/items?itemName=junstyle.php-cs-fixer)
- e PHPMD (https://marketplace.visualstudio.com/items?itemName=ecodes.vscode-phpmd).

Portanto, se você deseja codificar com o VS Code, certifique-se de verificar o Marketplace regularmente em busca de novos plugins.

## Summary

Neste capítulo, aprendemos sobre ferramentas de ponta que ajudam na criação de código PHP de alta qualidade. Elas ajudam a identificar problemas precocemente no ciclo de vida do desenvolvimento de software (SDLC), economizando muito tempo. A comunidade PHP ainda é ativa e muito produtiva, e não conseguimos abordar todos os softwares fantásticos que existem neste livro. No entanto, com as ferramentas que apresentamos neste capítulo, você está bem equipado para sua jornada em direção ao código limpo. No próximo capítulo, você aprenderá como avaliar a qualidade do código usando métricas estabelecidas e, é claro, as ferramentas necessárias para coletá-las. Até lá!

## Meu Resumo

Checar sintaxe e code-style

PHP Linter: Checa sintaxe:
+ Tem nativo no próprio php : `$ php -lf src/*`

PHP CS Fixer: verifica code style
+ Corrigi indentaçâo, espaços em branco inúteis; padronização do PSR-12

O que é arquio phar: phar (self-containing PHP archive (phar) 

Ferramentas de análise estática do código

+ phpcpd – the copy and paste detector
  - Detecta se um trecho de código em um lugar foi repetido em outro, assim,
  - Em resumo, o PHPCPD é uma ferramenta útil para identificar e corrigir duplicações de código em projetos PHP, contribuindo para um código mais limpo, organizado e de fácil manutenção.

+ PHPMD - the PHP mess detector
  - O PHPMD é uma ferramenta que detecta problemas potenciais no código, conhecidos como "code smells", que podem causar bugs, comportamento inesperado e dificuldade na manutenção. 
  - Ele aplica regras específicas para evitar problemas relacionados ao estilo de código. 
  - O PHPMD é a ferramenta default do PHP para isso, sendo muitíssimo útil na identificação e correção de problemas no código.

+ PHPStan - PHPStan – a static analyzer for PHP
  - O PHPStan é uma ferramenta amplamente utilizada na comunidade PHP, especialmente em projetos maiores e mais complexos, onde é fundamental garantir a qualidade do código. Ao utilizar o PHPStan, os desenvolvedores podem detectar e corrigir erros mais cedo no processo de desenvolvimento, economizando tempo e reduzindo a ocorrência de erros em produção.

+ Psalm - A PHP static analysis linting machine
  - O Psalm é uma ferramenta de análise estática de código para projetos escritos em PHP. Ele é usado para ajudar os desenvolvedores a encontrar erros e problemas potenciais em seu código antes mesmo de executá-lo.

Comparando Psalm e PHPStan
+ - O Psalm foi projetado com uma abordagem mais conservadora em relação ao PHP, priorizando a segurança e a precisão das verificações de tipo. Ele é conhecido por ser mais rigoroso na detecção de erros de tipo e na inferência de tipos.
- O PHPStan, por outro lado, adota uma abordagem mais permissiva. Ele tenta inferir tipos da melhor maneira possível, mas também permite uma certa flexibilidade no tratamento de erros de tipo.

Recomendação final: PHP linter, CodeStyle e as 3 ferramentas de analysis static (phpcpd, phpmd e phpsan)

## Futher Readings

Se você deseja experimentar ainda mais ferramentas de qualidade de código, considere os seguintes projetos:

- Exakat (https://www.exakat.io) - Uma ferramenta que também abrange problemas de segurança e desempenho, por exemplo. Ela também pode corrigir problemas automaticamente.

- Phan (https://github.com/phan/phan) - Um analisador de código estático que você pode experimentar imediatamente no seu navegador.

- PHP Insights (https://phpinsights.com/) - Outro analisador, porém com métricas fáceis de usar em termos de código, arquitetura, complexidade e estilo.


