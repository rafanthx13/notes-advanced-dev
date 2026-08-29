Esse é um dos meus padrões favoritos porque ele aparece muito em sistemas corporativos, especialmente em importadores, exportadores, integrações e processamento de arquivos.

E, curiosamente, **você já me descreveu um caso que é praticamente um Template Method**: seu exportador de Excel/PDF.

---

## A ideia

O Template Method responde à pergunta:

> **Existe um algoritmo que é sempre igual, mas algumas etapas mudam?**

Se a resposta for sim, ele pode ser uma boa solução.

---

## Antes

Imagine um sistema que exporta vários formatos.

Excel:

```php
public function export()
{
    openFile();

    writeHeader();

    writeRows();

    writeFooter();

    closeFile();
}
```

PDF:

```php
public function export()
{
    openFile();

    writeHeader();

    writeRows();

    writeFooter();

    closeFile();
}
```

Perceba que 90% do algoritmo é igual.

Só muda a forma de escrever.

---

## Depois

Criamos uma classe base.

```php
abstract class Exporter
{
    final public function export()
    {
        $this->open();

        $this->header();

        $this->body();

        $this->footer();

        $this->close();
    }

    abstract protected function header();

    abstract protected function body();

    abstract protected function footer();

    protected function open()
    {
    }

    protected function close()
    {
    }
}
```

Agora cada exportador implementa apenas o que muda.

```php
class ExcelExporter extends Exporter
{
    protected function header()
    {
        ...
    }

    protected function body()
    {
        ...
    }

    protected function footer()
    {
        ...
    }
}
```

O algoritmo continua sempre igual.

---

## Por que chama Template?

Porque o método principal é um **molde**.

Ele define a receita.

```text
Exportar

↓

Abrir

↓

Cabeçalho

↓

Corpo

↓

Rodapé

↓

Fechar
```

Ninguém pode mudar essa ordem.

---

## Um exemplo clássico

Imagine preparar bebidas.

```text
Preparar bebida

↓

Ferver água

↓

Adicionar ingrediente principal

↓

Servir
```

Para café:

```text
Ferver água

↓

Adicionar café

↓

Servir
```

Para chá:

```text
Ferver água

↓

Adicionar chá

↓

Servir
```

A receita é a mesma.

Só muda uma etapa.

---

## Outro exemplo

Importação de arquivos.

Todos fazem:

```text
Abrir arquivo

↓

Ler linhas

↓

Validar

↓

Persistir

↓

Gerar relatório

↓

Fechar
```

Mas a validação muda.

Então:

```text
Importer
      ▲
      │
CsvImporter

ExcelImporter

XmlImporter
```

---

## Hooks

O Template Method possui um conceito chamado **Hook**.

É um método opcional.

```php
protected function beforeExport()
{
}
```

A classe filha implementa apenas se precisar.

Caso contrário:

Nada acontece.

---

## Benefícios

* Evita duplicação.
* Garante a ordem correta das etapas.
* Facilita criar novas implementações.
* Centraliza o fluxo do algoritmo.

---

## Quando usar?

Quando você percebe vários métodos assim:

```text
A

↓

B

↓

C

↓

D
```

e todas as classes fazem exatamente essa sequência.

Só muda:

* B
* C

---

## Quando NÃO usar?

Quando a sequência também muda.

Por exemplo:

Classe A:

```text
A

↓

B

↓

C
```

Classe B:

```text
A

↓

D

↓

C

↓

E
```

Agora já não existe um algoritmo comum.

Talvez Strategy seja mais adequado.

---

## No seu exportador

Lembra do que você me contou?

Você tinha uma classe base.

Para criar um novo exportador bastava implementar:

* gerar Excel
* gerar PDF

e a sequência era sempre:

```text
Header

↓

Body

↓

Footer
```

Na época eu até comentei que isso tinha cara de Template Method.

Agora podemos afirmar com mais confiança.

Seu algoritmo é:

```text
Exportar

↓

Header

↓

Body

↓

Footer
```

Essa ordem nunca muda.

Logo:

**isso é um Template Method clássico.**

---

## Uma observação interessante

Muitas pessoas confundem Template Method com Strategy.

Os dois lidam com algoritmos.

A diferença é:

### Template Method

A classe base controla a execução.

```text
Classe Base

↓

Etapa 1

↓

Etapa 2

↓

Etapa 3
```

As subclasses apenas implementam algumas etapas.

---

### Strategy

A classe principal não conhece o algoritmo.

Ela apenas faz:

```php
$strategy->execute();
```

Quem decide tudo é a Strategy.

---

### A regra que eu uso

Pergunto:

> **Existe uma sequência fixa que ninguém pode alterar?**

Se sim:

→ **Template Method**

Agora pergunto:

> **Quero poder trocar completamente o algoritmo?**

Se sim:

→ **Strategy**

---

### Acho que você vai gostar desta conclusão

Pelas conversas que tivemos nas últimas semanas, eu diria que o seu projeto já contém exemplos de vários padrões:

* **Factory**: escolhe o processador correto para o tipo de arquivo.
* **Replace Conditional Tests with Polymorphism**: eliminou `if`/`switch` usando subclasses.
* **Builder**: encapsulou a construção do HTML do Excel.
* **Template Method**: definiu um fluxo fixo de exportação (`header → body → footer`).

O interessante é que **eles não competem entre si**. Pelo contrário, eles costumam aparecer juntos. Um sistema bem modelado raramente usa apenas um padrão; é comum uma `Factory` criar uma subclasse que implementa um `Template Method`, enquanto essa subclasse usa um `Builder` para montar a saída. É justamente essa combinação de padrões que torna o código mais organizado e extensível.
