# 09 - Organizing PHP Quality Tools

## Intro

Nesse capitulo vamos aprender como configurar da melhor formas essa ferramentas de qualidade de software do PHP no nosso projeto, iremos ver 3 formas:

1 -  composer,

2 -  phar files

3 -  pHive

**Só irei mostrar como fazer pelo composer**

+ Installing code quality tools using Composer
+ Installing code quality tools as phar files
+ Managing phar files using the PHAR Installation and Verification Environment (Phive)



## Installing code quality tools using Composer

```
$ composer require phpmetrics/phpmetrics --dev
```

**Você pode baixar o phpmetrics também de forma global**

```
$ composer global update
```

```
$ composer global require phpmetrics/phpmetrics
```



### Configurar `composer.json`

````json
{
  ...
  "scripts": {
    "analyze": [
      "vendor/bin/php-cs-fixer fix src",
      "vendor/bin/phpstan analyse --level 1 src"
    ]
  }
}
````

Se você deseja compartilhar esses comandos do Composer, talvez queira adicionar também um breve texto de descrição, que será exibido quando você executar o comando composer list para ver uma lista de comandos disponíveis.

Para fazer isso, você precisa adicionar a seção script-descriptions ao seu arquivo `composer.json`. Para o comando analyze introduzido anteriormente, poderia ser algo assim:

````json
{
  ...
    "scripts": {
        ...
    },
    "scripts-descriptions": {
        "analyze": "Perform code cleanup and analysis"
    }
}
````


## Summary

O Composer é uma parte indispensável do mundo PHP atual. A abordagem usual para adicionar ferramentas de qualidade de código ao seu projeto é adicioná-las à seção require-dev das dependências, o que funciona bem em muitos casos.

No entanto, o Composer não é a única opção disponível. Portanto, neste capítulo, apresentamos mais duas opções para gerenciar suas ferramentas de qualidade de código: adicionando manualmente os arquivos phar ao seu projeto ou utilizando o Phive para gerenciar os arquivos phar.

Você provavelmente está ansioso para aplicar todo o conhecimento adquirido ao seu código agora. No entanto, refatorar implacavelmente pode causar mais danos do que benefícios, e clicar em todas as partes de sua aplicação após cada alteração para verificar se algo quebrou exigirá muito tempo e pode ser muito frustrante. Portanto, no próximo capítulo, mostraremos como os testes automatizados podem ajudar nesse sentido.

## Meu Resumo

Esse cap apresenta outras formas de usar as ferramentas de qualidades: arquivos phar e phive.