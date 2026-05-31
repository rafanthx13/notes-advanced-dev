# 04 - It is about More Than Just Code



## PHP as an ecosystem

**O pdoer do PHP**

Isso pode ser percebido em vários itens que podemos listar juntos, como segue: 

+ O PHP é, ainda no início da década de 2020, a linguagem server-side mais utilizada para o desenvolvimento de aplicações web.   Quando você conhece o lugar predominante (para não dizer esmagador) dos aplicativos da Web em nosso   uso diário, este é um prêmio genuinamente bom! 

+ A linguagem continua evoluindo muito fortemente, principalmente nos últimos anos. Passou por um   queda durante o desenvolvimento do PHP 6 (que nunca foi lançado) antes de experimentar uma verdadeira   explosão de sua popularidade começando com a versão 7. A versão 7 definiu a base do futuro   de PHP com recursos altamente exigidos, como digitação forte, além de desempenho incrível   e melhoria da velocidade. Benchmarks comparando PHP 5 e 7 eram simplesmente loucos quando   saiu. Os desenvolvimentos continuam fortes, com novos recursos sendo propostos com muita regularidade. 

+ **PHP tem um gerenciador de dependências excepcional chamado Composer**. Simples, de código aberto e   incrivelmente eficiente, muitas vezes é reconhecido por seus usuários como o melhor gerenciador de dependências do   mercado, todas as linguagens de programação incluídas. Embora esta possa ser uma opinião subjetiva, nós   não pode tirar sua confiabilidade. 

+ Falando em dependências, basta visitar o site Packagist (o repositório onde   Composer leva dependências) para perceber a comunidade excepcional que o PHP tem em seu   disposição para disponibilizar tantas bibliotecas, cada uma mais incrível que a outra, com   sendo a grande maioria gratuita e sem restrições de uso. Se você tem uma necessidade, há   é uma biblioteca externa disponível que certamente resolverá seu problema. 

+ Extensões PHP são uma verdadeira mina de ouro para estender a linguagem. As extensões, ao contrário do   bibliotecas que você instala com o Composer, são escritas em C e plugadas diretamente no código-fonte   do interpretador PHP. Isso nos dá a possibilidade de estender a linguagem com impressionantes   desempenho. Isso também significa que a instalação padrão do PHP pode ser extremamente mínima   e não precisa de quase nada para funcionar. Podemos então instalar extensões unitariamente de acordo com nosso   precisa. Isso é especialmente útil se nosso aplicativo precisar ser executado em um servidor com recursos limitados. 

+ Múltiplas conferências ao redor do mundo mostram um forte compromisso com o PHP. Igualmente incrível   e ferramentas renomadas como os frameworks Symfony, Drupal e Laravel mostram um desejo real de   empurre o idioma o mais longe possível. Essas próprias estruturas organizam   conferências e são usados por empresas multinacionais (Airbnb, Spotify, TheFork e assim por diante).   Só para constar, o Symfony ainda é em 2022 um dos projetos open source com maior número   de contribuidores para a estrutura e documentação, entre todos os projetos de código aberto existentes.

+ O desenvolvimento do núcleo PHP ainda está em pleno andamento hoje, e mais do que nunca. Propostas para   novos recursos e solicitações de comentários (RFCs) (o primeiro passo para propor uma mudança no   idioma) estão surgindo em um ritmo rápido e são implementados com a mesma rapidez. Muitos contribuidores são envolvidos, observando-se também uma renovação dos principais contribuintes. Mais velho e mais importante   colaboradores, como o conhecido Nikita Popov, estão deixando o navio enquanto novos colaboradores   estão vindo para o projeto. A comunidade está em perpétua efervescência. 

   PHP é uma linguagem que tem uma reputação comprovada. Sua robustez e eficiência fizeram dela a linguagem de escolha para alguns dos maiores sites do mundo. Onde alternativas foram implementadas no passado ou atualmente, como Python (que é usado por cerca de 1,2% de todos os sites no momento da escrita) para alguns sites do Google, o PHP está na maioria. Obviamente, muitas tecnologias atraentes estão surgindo e ganhando participação de mercado do PHP, como Node.js ou C# e o .NET Framework. PHP ainda tem uma boa futuro à sua frente. Saber escrever um site em PHP garante que você saiba ler o código-fonte da esmagadora maioria dos sites existentes no mundo.

  Por todas essas razões, o PHP é um ecossistema. Levando a reflexão um pouco mais longe... se PHP não é apenas um linguagem de programação e se o PHP não é apenas código, por que deveríamos limitar o código limpo ao código? O código limpo também pode conter, por extensão, a escolha certa de dependências e bibliotecas externas instalar em seu projeto. Vamos ver por que você deve escolher suas dependências com sabedoria e como escolhê-los bem para limitar os riscos.

## Choosing the right libraries

CHATO

## Versonamento Semantico

Versionamento é simplesmente colocar um número em uma versão do código fonte. Todos nós estamos familiarizados com versões como 1.0, 1.5.0, 2.0.0 e assim por diante. O versionamento semântico adiciona um significado semântico - isto é, um significado preciso - a cada um desses números. Vamos pegar a versão 2.3.15 como exemplo. Aqui está como o versionamento semântico quebra este número de versão:

• O "2" indica uma versão principal. Uma versão principal pode introduzir novos recursos, correções de bugs e, mais importante, mudanças que quebram a compatibilidade com versões anteriores. Este último ponto é o mais importante. De fato, de uma versão principal para outra, as assinaturas de método ou até mesmo os nomes de classe completos podem mudar, e alguns também podem desaparecer. Portanto, você deve ser extremamente cuidadoso ao passar para uma versão principal superior à atual, e deve testar se tudo ainda funciona. Muitas vezes, os logs de alterações da versão fornecem as alterações que você precisa fazer para estar em conformidade com a nova versão principal.

• O "3" indica uma versão menor. Assim como as principais lançamentos, lançamentos menores podem trazer novos recursos e correções de bugs. A principal diferença é que lançamentos menores não podem fazer mudanças que quebram a compatibilidade com versões anteriores. Isso significa que você pode atualizar uma dependência para a próxima versão menor para aproveitar todos os novos recursos e correções de bugs sem se preocupar que seu código quebrará quando você atualizar. No entanto, nunca é demais executar todos os seus testes posteriormente no momento da atualização menor. Você nunca sabe. Muitas vezes, os lançamentos menores acionam mensagens de depreciação de código. Essas mensagens informam quais métodos você não deve mais usar porque certamente serão removidos na próxima versão principal. Ao levar em consideração as mensagens de depreciação enquanto você desenvolve, você economiza muito trabalho quando se trata de atualizar a dependência para a próxima versão principal.

• O "15" indica o número de correção. Uma correção contém apenas correções de bugs e correções de segurança. Não contém novos recursos. Você deve considerar sempre instalar os novos patches de suas dependências em seu projeto.

Podemos ver as vantagens do versionamento semântico: serenidade, lógica e consistência. Obviamente, existem outras variações, como Alpha, Beta, Release Candidate e Golden Master. Mas estes são mais raros.

```json
{
    "require": {
        "php": ">=7.3",
        "symfony/dotenv": "3.4.*",
        "symfony/event-dispatcher-contracts": "~1.1",
        "symfony/http-client": "^4.2.2"
    }
}
```

Este trecho descreve quatro dependências: uma versão mínima para o PHP e três bibliotecas externas. Há quatro maneiras de definir as versões aceitas nas dependências: 

+ usando o operador >= para aceitar todas as versões maiores ou iguais à especificada, 
+ usando o caractere curinga * para aceitar qualquer valor em determinada posição,
+  usando o operador til ~ para aceitar apenas as correções de determinada versão e 
+ usando o operador circunflexo ^ para aceitar novas correções e versões menores, mas rejeitar novas versões principais.

É importante sempre aceitar novas correções e versões menores de uma dependência e evitar bloquear uma dependência a uma versão específica sem a possibilidade de atualização. Além disso, é preciso ter cuidado ao atualizar dependências de versões principais, pois mudanças significativas podem exigir adaptações no código existente.

## Summary

Limitar o PHP à linguagem de programação é redutor. Acabamos de ver - é um ecossistema real com uma comunidade rica e ativa, e extremamente longe de enterrar sua linguagem favorita. os desenvolvimentos em torno do PHP são incontáveis, e a própria linguagem evoluiu da maneira mais bonita nos últimos anos. As contribuições das funcionalidades deram um verdadeiro segundo fôlego a este, permitindo-lhe reivindicar - ainda hoje - primeiro lugar entre as linguagens de programação mais usadas no lado do servidor para um aplicativo da web.

Tudo isso não seria nada sem a explosão no número de bibliotecas externas disponíveis para o
linguagem. Você tem um problema; existe uma solução. Temos a sorte de que a maioria das bibliotecas externas são Código aberto. Milhares de desenvolvedores disponibilizam, de forma voluntária e gratuita, o fruto de horas, semanas ou anos de trabalho.

Fazer uma escolha entre essas bibliotecas pode ser difícil e desafiador. É importante, mesmo obrigatório, fazer um trabalho de pesquisa real de antemão para ter certeza de fazer a escolha certa. Nós não somos imune a obstáculos e incidentes, mas este capítulo forneceu ferramentas e ferramentas prontas para uso soluções para limitar os riscos. Acima de tudo, não se precipite nas tecnologias mais modernas. Se você quiser para atrair usuários e fazer com que eles continuem usando seu aplicativo mais do que outro, as palavras-chave são “robustez” e “estabilidade”!

Já falamos muito sobre o trabalho de outras pessoas, mas não devemos esquecer nossas próprias conquistas. Como você consegue desenvolver bons hábitos para encontrar seu caminho em seu código enquanto consegue encontrar seu facilmente no código fonte de suas bibliotecas externas favoritas quando você precisa entender seu funcionamento interno? Voltamos ao que dissemos nos primeiros capítulos: tendo os mesmos hábitos, nos entendemos com mais facilidade. Isso obviamente se aplica à organização de um projeto, no nomeação de arquivos, a estrutura de pastas e assim por diante. E é exatamente isso que veremos na prática em o próximo capítulo.

## Meu Resumo

Fala sobre o poder do PHP e sobre seu ecossistema. Chato.
