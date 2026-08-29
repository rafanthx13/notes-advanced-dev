# 11 - Continuous Integation

## Intro ao que vamos ver

Neste capítulo, iremos elaborar sobre integração contínua (CI) e aprender através de exemplos como configurar um fluxo de trabalho automatizado simples, mas eficaz.

Além disso, vamos mostrar como configurar uma seleção de ferramentas de qualidade de código localmente, de modo que elas ofereçam o máximo de suporte, sem a necessidade de executá-las manualmente. Além disso, compartilharemos algumas melhores práticas sobre como adicionar esses fluxos de trabalho a um projeto existente.

Os principais tópicos que iremos abordar estão listados aqui:

+ Why you need CI
+ The build pipeline
+ Building a pipeline with GitHub Actions
+ Your local pipeline—Git hooks
+ Excursion—Adding CI to existing software
+ An outlook on continuous delivery (CD)

## Why you need CI

Uma grande do nosso trabalho como desenvolvedor é corrigir bugs, dár manutenção e aplicar mudanças no software. Entregar um software livre de erros é algo que provavelmente todos os desenvolvedores gostariam de alcançar. Não cometemos erros intencionalmente, mas eles sempre acontecerão. No entanto, existem maneiras de reduzir os custos dos erros.

### Custo de Bugs

Bugs são custosos, pois são difíceis de achar e gastam o tempo do programador para consertar algo que a se espera dar certo. É bom quando se é capaz de pegar o bug no início, mas, muitas vezes é necessário o programa ser rodado das mais diversas formas para capturar ele. 

Os custos de bugs crescem a medida que desenvolve o sistema.

A razão para o aumento maciço de custos ao longo do tempo é devida a diversos fatores. No início, os custos estão principalmente relacionados ao tempo necessário para resolver o problema. Se um bug poderia ter sido evitado com requisitos melhores, por exemplo, menos esforço seria necessário, pois ele seria descoberto durante os testes manuais. No entanto, se um bug é encontrado em produção, várias pessoas estão envolvidas em sua correção: um funcionário do suporte precisa reconhecer o bug relatado por um cliente e encaminhá-lo para um engenheiro de garantia de qualidade (QA), que o reproduz e escreve um ticket adequado para o bug.

Esse ticket é então atribuído ao gerente de produto, que, após gastar tempo reproduzindo e verificando o defeito, o planeja para a próxima sprint. O ticket é eventualmente atribuído a um desenvolvedor, que precisa de algum tempo para reproduzir e corrigir o bug. Mas não acaba aí, porque a correção do bug provavelmente requer uma revisão de código de outro desenvolvedor e é verificada novamente pelo gerente de produto ou pelo engenheiro de QA antes de poder ser finalmente lançada.

Uma vez "escapado" do ambiente local do desenvolvedor, todas essas etapas adicionais aumentam significativamente os custos do defeito. Além disso, se o bug já estiver em produção, pode levar os clientes a não quererem mais usar o produto, pois não estão mais satisfeitos com ele. Isso é chamado de perda de clientes. Mesmo se você não estiver trabalhando em um produto comercial, mas, por exemplo, em um projeto de código aberto, o conceito pode ser traduzido em tempo ou esforço. Um bug resultará em um relatório de problema que você precisa ler e entender, provavelmente fazendo mais perguntas e esperando pela resposta do autor do ticket. Se o seu software for muito cheio de bugs, as pessoas o usarão menos, e todos os seus esforços anteriores podem ter sido em vão em algum momento.

### Como precaver de Bugs

Felizmente, agora temos uma caixa de ferramentas completa ao nosso lado que pode nos ajudar a encontrar bugs em seu código antes que outra pessoa o faça. Só precisamos usá-la - e isso já é um problema porque nós, desenvolvedores, geralmente somos preguiçosos.

É claro que você poderia executar todas as ferramentas manualmente antes de cada implantação. Vamos supor que você queira implantar algum código em produção. Após mesclar o código na ramificação principal, as seguintes etapas devem ser executadas para garantir que nenhum código com erros seja entregue em produção:

1.  Usar o PHPlinter para garantir a corretude sintática do código.
2.  Executar um code style checker para manter a formatação do código alinhada.
3.  Encontrar possíveis problemas usando análise de código estático.
4.  Executar todos os conjuntos de testes automatizados para garantir que seu código ainda funcione.
5.  Criar relatórios para as métricas de qualidade de código usadas.
6.  Limpar a pasta de compilação e criar um arquivo compactado do código para implantar.

**São muitos passos a serem executados para subir um código com a certeza que está correto e livre de bugs. Por isso, é necessário criar um script para executar tudo isso em sequência além de subir a alteração. Isso é a motivação para CI (Continous Integration) : Fazer tudo isso automatizado.**

### Introduzindo CI

Isso é precisamente o que o CI faz: ele descreve o processo automatizado de reunir todos os componentes necessários de sua aplicação em um pacote entregável para que possa ser implantado nos ambientes desejados. Durante o processo, verificações automatizadas garantirão a qualidade geral do código. É importante ter em mente que, se uma das verificações falhar, toda a construção será considerada como falha.

Existem muitas ferramentas de CI disponíveis, como o Jenkins, que geralmente é auto-hospedado (ou seja, operado por você ou alguém da sua equipe ou empresa). Ou você pode escolher serviços pagos, como GitHub Actions, GitLab CI, Bitbucket Pipelines ou CircleCI.

Configurar uma dessas ferramentas pode parecer muito trabalho, mas também possui grandes benefícios, como os seguintes:

-   **Escalabilidade:** Se você trabalha em equipe, usar a configuração local rapidamente causará problemas. Qualquer alteração no processo de construção precisaria ser feita no computador de cada desenvolvedor. Embora o script de construção faça parte do seu repositório, as pessoas podem esquecer de puxar as alterações mais recentes antes de implantar, ou algo pode dar errado.
    
-   **Velocidade:** Testes automatizados ou análise de código estático consomem bastante recursos. Embora os computadores atuais sejam poderosos, eles precisam realizar muitas tarefas simultâneas, e você não deseja executar adicionalmente um pipeline de construção em seu sistema local. Os servidores de CI/CD fazem apenas esse trabalho e geralmente o fazem rapidamente. E mesmo que sejam lentos, eles ainda aliviam a carga do seu sistema local.
    
-   **Não bloqueante:** Você precisa de um ambiente de construção para executar todas as ferramentas e verificações em seu código. Usar seu ambiente de desenvolvimento local para isso simplesmente o bloqueará durante a construção, especialmente quando você usa tipos de teste mais lentos, como testes de integração ou ponta a ponta (E2E). Executar dois ambientes em seu sistema local - um para desenvolvimento e outro para CI/CD - não é recomendado, pois você rapidamente ficará preso em um inferno de configuração (apenas pense em bloquear um banco de dados ou portas do servidor web).
    
-   **Monitoramento:** Usar um servidor dedicado de CI/CD permitirá que você mantenha uma visão geral de quem implantou o quê e quando. Imagine que seu sistema de produção esteja de repente com problemas - usando um servidor de CI/CD, você pode ver imediatamente quais foram as últimas alterações e implantar a versão anterior de sua aplicação com alguns cliques. Além disso, as ferramentas de CI/CD mantêm você atualizado e informam você, por exemplo, por e-mail ou por meio do seu aplicativo de mensagens favorito, sobre quaisquer atividades de construção e implantação.
    
-   **Gerenciamento:** Um script de implantação feito à mão certamente fará o trabalho, mas leva muito tempo para torná-lo tão conveniente e flexível

## The build pipeline

É então necessário construir um pipeline. Ele terá como entrada a aplicação com o código alterado e passará por várias ferramentas até está no ponto apto ao deploy.

### Stage 1: Build Project

Para realizar todas essas etapas será necessário ter o ambiente totalmente funcionar. Isso é possível via Conteinerização, Docker e instalar todas as dependências necessárias para a aplicação funcionar: pois. Além de verificação estática de código pode ser necessário o ambiente totalmente pronto arpara executar testes E2E.

### Stage 2: Code Analysis

Consiste em usar as ferramentas que vimos no capítulo 7:

+ PHP linter (verificar sintaxe)
+ Check code style PHP Coding Standards
+ Fixer (PHP-CS-Fixer)
+ Gerar as análises estáticas de código.

### Stage 3 – Tests

Rodar:
+ Unit Testes
+ Integration ests
+ E2E Tests

### Stage 4 - Deploy

Limpar tudo das etapas anteriores que agora não são mais necessária e fazer o deploy

### Integrating the pipeline into your workflow

Após configurar todas as etapas necessárias, finalmente precisamos integrar a pipeline ao seu fluxo de trabalho. As ferramentas de CI/CD geralmente oferecem diferentes opções para executar uma pipeline. No início, isso pode ser feito manualmente, clicando em um botão. No entanto, isso não é muito conveniente. Se você usa repositórios Git hospedados, como GitHub, GitLab ou Bitbucket, pode conectá-los à sua pipeline de build e iniciar o build sempre que uma solicitação de pull (PR) for criada ou um branch for mesclado no branch principal.

Para projetos grandes em que o build leva horas, também é comum executar um build para a base de código atual durante a noite (os chamados builds noturnos). Os desenvolvedores então recebem os feedbacks da pipeline no dia seguinte.

Executar um build requer algum tempo e, é claro, os desenvolvedores não devem ficar na frente das telas esperando até que possam continuar seu trabalho. Eles devem ser informados assim que o build for concluído com sucesso ou falhar. Todas as ferramentas de CI/CD atualmente oferecem várias maneiras de notificar o desenvolvedor, principalmente por e-mail e mensagens em ferramentas de chat como Slack ou Microsoft Teams. Além disso, frequentemente também oferecem visualizações em painéis, onde você pode ver o status de todos os builds em uma única tela.

Agora você deve ter uma boa ideia de como uma pipeline de build poderia ser para o seu projeto. Portanto, é hora de mostrar um exemplo prático.

## Building a pipeline with GitHub Actions

Mostra passo a apsso de como executar com GitActions

## Your local pipeline—Git hooks

Nesta seção será orientado a usar pre-commit com hooks para executar essas análises ao fazer commit, pois, é bom fazermos as verificações de linter, code-style e testes antes de colocar a máquina para fazer com o docker buildado, pois ocupa muito tempo.

Após configurarmos com sucesso uma pipeline de CI/CD simples, mas já muito útil, agora queremos analisar a execução de algumas etapas no ambiente de desenvolvimento local, antes mesmo de enviá-las para o repositório. Isso pode parecer um trabalho duplicado no momento - por que devemos executar as mesmas ferramentas duas vezes?

Lembre-se da Figura 11.1 - Estimativa dos custos relativos de correção de um bug com base no momento de sua detecção, desde o início do capítulo: quanto mais cedo identificarmos um bug, menores serão os custos ou o esforço necessário. É claro que se encontrarmos um bug durante a pipeline de CI/CD, isso ainda é muito mais cedo do que no ambiente de produção.

No entanto, a pipeline não é gratuita. A compilação do nosso exemplo de aplicação foi rápida e levou apenas cerca de um minuto. Agora, imagine uma configuração completa do Docker que já leva um tempo considerável para criar todos os contêineres necessários. E agora, a compilação falha simplesmente por causa de um pequeno bug que você poderia ter resolvido em 2 minutos se não tivesse esquecido de executar os testes unitários antes de enviar seu código. Talvez você tenha feito uma pausa para tomar um chá ou café bem merecido, apenas para descobrir que a compilação falhou por causa disso quando voltou. Isso é irritante e um desperdício de dinheiro e poder computacional.

É exatamente nesses tipos de verificações rápidas, como testes unitários, um "code sniffer" ou análise estática de código, que queremos executar antes de iniciar uma compilação completa para as alterações. Não podemos confiar em nós mesmos para executar essas verificações automaticamente porque somos humanos. Esquecemos coisas, mas as máquinas não.

Se você usa o Git para o desenvolvimento, o que a maioria dos desenvolvedores faz atualmente, podemos utilizar a funcionalidade incorporada dos "hooks" do Git para automatizar essas verificações. Os "hooks" do Git são scripts de shell que são executados automaticamente em determinados eventos, como antes ou depois de cada "commit".

Para nossas necessidades, o "hook" pre-commit é particularmente útil. Ele será executado cada vez que você executar o comando "git commit" e poderá interromper o "commit" se o script executado retornar um erro. Nesse caso, nenhum código será adicionado ao repositório.

### Setting up Git Hooks

Nesta parte, ensina a usar o captain-hook (do PHP) para, quando dar o git commit executar esses tetes

````sh
$ composer require --dev captainhook/captainhook
````

CaptainHook provides the useful {$STAGED_FILES} placeholder, which contains all staged files. It is very convenient to use, as we can see here:

````
{
    "pre-commit": {
        "enabled": true,
        "actions": [
            {
                "action": "vendor/bin/php-cs-fixer fix
                  {$STAGED_FILES|of-type:php} --dry-run"
            },
            {
                "action": "vendor/bin/phpstan analyse
                  {$STAGED_FILES|of-type:php}"
            }
        ]
    }
}
````

O exemplo anterior executa as verificações apenas nos arquivos PHP modificados. Isso traz dois benefícios principais: em primeiro lugar, é mais rápido, pois você não precisa verificar o código que não foi alterado. A velocidade de execução, é claro, depende do tamanho da sua base de código.

Em segundo lugar, especialmente se você estiver trabalhando em um projeto existente e acabou de começar a introduzir essas verificações, executá-las em toda a base de código não é uma opção, pois você precisaria corrigir muitos arquivos de uma só vez.

## Excursion—Adding CI to existing software

Comece adicionando testes de integração e testes de ponta a ponta (E2E). Ambos os tipos de teste geralmente exigem poucas ou nenhuma alteração no código, mas trarão grandes benefícios, pois cobrem indiretamente uma grande quantidade de código sem a necessidade de escrever testes unitários. Depois de cobrir os caminhos críticos (ou seja, os fluxos de trabalho mais usados) da aplicação com testes, você pode começar a refatorar as classes e introduzir testes unitários adicionais. Os testes ajudarão você a descobrir bugs e efeitos colaterais rapidamente, sem precisar clicar repetidamente pela aplicação.

Introduzir um estilo de código como o PSR-12 é, como você já sabe, tão fácil quanto executar uma ferramenta como o PHP-CS-Fixer em todo o código de uma vez. O commit resultante será, é claro, enorme, então você deve concordar com os outros desenvolvedores em congelar o código antes de fazê-lo. Um congelamento do código significa que todos os desenvolvedores fazem commit de suas alterações no repositório para que sua refatoração não cause grandes conflitos de mesclagem quando eles atualizarem as alterações posteriormente.

Para decidir qual código refatorar, pretendemos usar uma ou mais das muitas ferramentas de qualidade de código que você conhece agora. Optar pelo PHPStan no nível 0 é uma boa escolha. Você também pode considerar o Psalm, pois ele também pode resolver alguns problemas automaticamente. Dependendo do tamanho do projeto, a lista de erros pode ser assustadoramente longa. Usar o recurso de linha de base, conforme descrito no Capítulo 7, Ferramentas de Qualidade de Código, pode ajudar a mascarar isso, mas apenas ocultará e não resolverá os problemas de código.

Não é preciso ter pressa. Se você configurar sua pipeline de CI/CD para verificar apenas os arquivos modificados, poderá começar a melhorar o código ao longo do tempo, aos poucos. Isso pode resultar no problema de que, uma vez que você tenha tocado em um arquivo, precisará refatorá-lo para atender às regras. Especialmente para classes antigas, mas extensas, isso pode ser problemático. No entanto, no Capítulo 7, Ferramentas de Qualidade de Código, explicamos como você pode excluir arquivos ou partes do código das verificações realizadas. Você pode até configurar uma pipeline que permita pular as verificações com base em uma palavra-chave específica (por exemplo, "skip ci") na mensagem de commit. No entanto, essa abordagem deve ser usada apenas como último recurso, caso contrário, você nunca começará a refatorar o código antigo. É necessário ter algum controle por parte dos desenvolvedores para não abusar desse recurso.

Com o tempo, a equipe trabalhando no projeto ganhará confiança e, com uma cobertura de testes cada vez maior, começará a refatorar mais e mais código. Certifique-se de instalar uma pipeline local também para manter os tempos de espera curtos.

## An outlook on continuous delivery (CD)

Eventualmente, sua pipeline de CI funcionará tão bem que, em caso de sucesso, será um pacote 100% confiável. Esse processo impedirá que código com erros seja enviado para produção de forma confiável, e em algum momento você se encontrará fazendo menos verificações manuais se a implantação ocorreu bem. Nesse ponto, você pode pensar em usar o **CD: isso descreve a combinação de ferramentas e processos para implantar código em qualquer ambiente automaticamente.**

Um fluxo de trabalho comum é que sempre que as alterações são mescladas em um determinado ramo (por exemplo, principal para o ambiente de produção), a pipeline de CI/CD será acionada automaticamente. Se as alterações passarem por todas as verificações e testes, o processo é tão confiável que o código é implantado no destino desejado sem a necessidade de testar manualmente o resultado da construção.

Se você já teve a oportunidade de trabalhar em um ambiente assim, certamente não gostaria de perdê-lo. Além de uma ótima pipeline de CI/CD e 99% de confiança nela, são necessários mais processos para reagir rapidamente se houver problemas em uma implantação. Mesmo as melhores ferramentas não podem evitar erros lógicos ou problemas de infraestrutura que só aparecerão sob uma carga maior.

Sempre que houver um problema após a implantação, sua equipe deve ser a primeira a perceber! Você não só precisa confiar totalmente na pipeline, mas também na configuração de monitoramento e registro. Existem muitos conceitos e ferramentas disponíveis, e estamos finalmente deixando o tópico de qualidade de código aqui, entrando nos domínios de desenvolvimento-operacional (DevOps) e administração de sistemas. No entanto, queremos fornecer algumas orientações breves sobre alguns conceitos-chave nos quais você pode se aprofundar, conforme a seguir:

- O monitoramento coleta informações sobre o status de um sistema. Em nosso contexto, isso geralmente são informações como carga da unidade central de processamento (CPU), uso da memória de acesso aleatório (RAM) ou tráfego do banco de dados de todos os servidores ou instâncias. Por exemplo, se a carga da CPU aumentar repentinamente de forma significativa, isso é um excelente indicador de que há problemas à frente.

- O registro ajuda a organizar todas as mensagens de registro que sua aplicação produz em um único local de fácil acesso. Não é útil se você precisar procurar por arquivos de registro em diferentes servidores quando o sistema estiver com problemas e todos os alertas estiverem tocando.

- Existem vários métodos de implantação disponíveis. Especialmente quando sua configuração cresce e consiste em vários servidores ou instâncias em nuvem, você pode implantar o novo código apenas em algumas instâncias ou até mesmo em um ambiente de implantação separado e monitorar o comportamento lá. Se tudo correr bem, você pode continuar a implantação nas demais instâncias. Esses métodos são chamados de implantações canary, rolling e blue/green. Você encontrará um link com mais informações sobre eles no final deste capítulo.

- Independentemente de quão bem você monitore seu software, se as coisas derem errado (e elas darão), você precisará voltar para uma versão anterior de sua aplicação

## Summary

Esperamos que, após ler este capítulo, você esteja tão convencido quanto nós de que o CI é extremamente útil e, portanto, uma ferramenta indispensável em seu arsenal. Explicamos os termos necessários sobre esse tópico, assim como as diferentes etapas de uma pipeline, não apenas em teoria, mas também na prática, construindo uma pipeline simples, mas funcional, usando o GitHub Actions. Por fim, demos a você uma visão geral do CD.

Agora você tem uma ótima base de conhecimento e ferramentas para escrever um ótimo código PHP. Claro, a aprendizagem nunca para, e há muito mais conhecimento por aí para você descobrir, que não pudemos abordar neste livro.

Se você tornou o desenvolvimento de software PHP sua profissão, normalmente trabalha em equipes de desenvolvedores. E mesmo que você esteja mantendo seu próprio projeto de código aberto, você interagirá com outras pessoas, por exemplo, quando elas enviarem alterações para o seu código. O CI é um componente importante, mas não é a única coisa que você precisa considerar para uma configuração de equipe bem-sucedida.

Para nós, esse tópico é tão importante que dedicamos os próximos dois capítulos à introdução de técnicas modernas de colaboração que o ajudarão a escrever um ótimo código PHP ao trabalhar em equipes. Esperamos vê-lo no próximo capítulo!

## Meu Resumo

O que é CI:
+  Processo automatizado de reunir todos os componentes necessários de sua aplicação em um pacote entregável para poder ser implantado nos ambientes desejados. Durante o processo, verificações automatizadas garantirão a qualidade geral do código. É importante ter em mente que, se uma das verificações falhar, toda a construção será considerada falha.
+ Exemplo de etapas:
1.  Usar o PHPlinter para garantir a corretude sintática do código.
2.  Executar um code style checker para manter a formatação do código alinhada.
3.  Encontrar possíveis problemas usando análise de código estático.
4.  Executar todos os conjuntos de testes automatizados para garantir que seu código ainda funcione.
5.  Criar relatórios para as métricas de qualidade de código usadas.
6.  Limpar a pasta de compilação e criar um arquivo compactado do código para implantar.

Ferramentas de CI:
+ Existem muitas ferramentas de CI disponíveis, como o Jenkins, que geralmente é auto-hospedado (ou seja, operado por você ou alguém da sua equipe ou empresa). Ou você pode escolher serviços pagos, como GitHub Actions, GitLab CI, Bitbucket Pipelines ou CircleCI.

Neste capítulo ensina fazer CI com GitActions além de falar muita coisa sobre esse processo.

O que é CD:
+ Após passar pelo CI, já sabemos que está tudo correto, então, podemos mandar numa esteira para implantar o pacote

## Further reading

If you wish to know more, have a look at the following resources:

+ Additional information about GitHub Actions:
  + The official GitHub Actions documentation with lots of examples: 
    + https://docs.github.com/en/actions
  + `setup-php` is not only very useful for PHP developers, but also offers a lot of useful
    information—for example, about the matrix setup (how to test code against several PHP versions) or caching Composer dependencies to speed up the build:
    + https://github.com/marketplace/actions/setup-php-action
+ More information about CD and related topics can be found here:
  + A good overview of CD: https://www.atlassian.com/continuous-delivery
  + Logging and monitoring explained:
    + https://www.vaadata.com/blog/logging-monitoring-definitions-and-best-practices/
  + A great introduction to advanced deployment methods:
    +  https://www.techtarget.com/searchitoperations/answer/When-to-use-canary-vs-blue-green-vs-rolling-deployment
+ Tools and links regarding your local pipeline:
  + More insights on Git hooks: 
    + https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks
    + GrumPHP is a local CI pipeline “out of the box”: https://github.com/phpro/grumphp


