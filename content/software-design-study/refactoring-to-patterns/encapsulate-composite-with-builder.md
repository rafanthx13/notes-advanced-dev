

# GPT001 - Eu já fiz isso antes


Esse é um dos refactorings que, curiosamente, **você já aplicou sem saber**.

Pelas conversas que tivemos sobre seu exportador de Excel (que na verdade gera HTML), ele me lembrou bastante essa ideia.

---

## O problema

Imagine que você precisa montar uma estrutura de objetos complexa.

Por exemplo, uma árvore HTML.

Sem Builder:

```php
$html = new Html();

$table = new Table();

$row = new Row();

$cell = new Cell("Nome");

$row->add($cell);

$table->add($row);

$html->add($table);
```

Quem usa a API precisa conhecer toda a estrutura interna.

---

### Outro exemplo

Imagine XML.

```php
$book = new XmlNode("book");

$title = new XmlNode("title");

$title->setValue("DDD");

$book->add($title);

$author = new XmlNode("author");

$author->setValue("Evans");

$book->add($author);
```

Muito código.

Muito detalhe.

---

## O Composite

Antes de entender o Builder, precisamos entender o Composite.

Composite significa representar uma estrutura em árvore.

```
HTML
 ├── HEAD
 └── BODY
      ├── TABLE
      │     ├── TR
      │     │    ├── TD
      │     │    └── TD
      │     └── TR
      └── DIV
```

Cada nó possui filhos.

---

## O problema

Quem usa essa estrutura precisa conhecer todos os detalhes.

Ele precisa saber:

* criar nós
* adicionar filhos
* fechar elementos
* respeitar a ordem

Isso gera muito código repetitivo.

---

## Builder

Então criamos um Builder.

Ao invés disso:

```php
$table = new Table();

$row = new Row();

$row->add(new Cell("Nome"));

$table->add($row);
```

fazemos:

```php
$builder
    ->table()
        ->row()
            ->cell("Nome")
            ->cell("Idade")
        ->endRow()
    ->endTable();
```

Ou até:

```php
$builder
    ->addHeader(...)
    ->addBody(...)
    ->addFooter();
```

Quem usa não sabe mais como a árvore é construída.

---

## Por que chama "Encapsulate Composite with Builder"?

Porque o Builder **esconde** (encapsula) o Composite.

O usuário nunca manipula:

```text
Table

Row

Cell

Div

Span
```

Ele só fala:

```php
builder->table()

builder->row()

builder->cell()
```

O Builder monta tudo por trás.

---

## O exemplo que você me contou

Você comentou que antigamente fazia algo assim:

```php
$html .= "<table>";

$html .= "<tr>";

$html .= "<td>";

...
```

Depois criou algo parecido com:

```php
$builder->openTable();

$builder->openRow();

$builder->addCell();

$builder->closeRow();

$builder->closeTable();
```

Na época nós falamos sobre o Builder.

Agora podemos ser mais específicos.

Você provavelmente fez exatamente isto:

```
HTML (Composite)

↓

HtmlBuilder

↓

Quem usa o Builder
```

Ou seja:

Você encapsulou a estrutura HTML atrás de um Builder.

Isso é muito próximo do que o livro chama de **Encapsulate Composite with Builder**.

---

## Outro exemplo

Imagine gerar um relatório.

Sem Builder:

```php
$report = new Report();

$page = new Page();

$table = new Table();

$row = new Row();

...
```

Com Builder:

```php
$builder
    ->page()
    ->title("Funcionários")
    ->table($dados)
    ->footer();
```

Muito mais simples.

---

## Quando aplicar?

Quando perceber que o código cliente está fazendo muitas chamadas para montar uma estrutura.

Por exemplo:

```php
$parent->add(...);

$child->add(...);

$child->add(...);

$parent->add(...);
```

ou

```php
append()

append()

append()

append()
```

Começa a ficar difícil entender a intenção.

---

## Benefícios

* Esconde a complexidade.
* Deixa o código muito mais legível.
* Evita estados inválidos.
* Centraliza a lógica de construção.
* Facilita mudar a estrutura interna.

---

## No seu projeto

Na minha opinião, esse é um dos refactorings que você **já aplicou de forma bastante natural**.

Seu exportador não deveria saber:

* qual tag abrir;
* qual tag fechar;
* como concatenar HTML;
* onde colocar `<tr>`;
* onde colocar `<td>`.

Ele deveria apenas dizer:

```php
$builder->header();

$builder->body($dados);

$builder->footer();
```

Ou, se preferir um nível um pouco mais baixo:

```php
$builder->table();

$builder->row();

$builder->cell("Nome");

$builder->cell("João");
```

E deixar que o Builder monte toda a árvore HTML corretamente.

---

### Uma observação interessante

Esse refactoring mostra uma ideia que aparece várias vezes no livro:

> **O Builder não existe apenas para criar objetos complexos. Ele também pode servir para esconder uma estrutura complexa.**

Muita gente aprende o padrão Builder apenas pelo exemplo de um objeto com muitos parâmetros (`PersonBuilder`, `HouseBuilder` etc.). Mas, no livro *Refactoring to Patterns*, o foco é diferente: usar o Builder para **esconder a complexidade da construção de uma estrutura composta** (um Composite).

Por isso, quando você me descreveu seu `HtmlBuilder`, eu achei um ótimo exemplo. Você não estava apenas facilitando a criação de HTML; estava **encapsulando toda a estrutura da árvore HTML**, permitindo que quem usa a API pense apenas na intenção ("abrir uma tabela", "adicionar uma célula", "fechar a linha"), sem conhecer os detalhes internos de como essa estrutura é montada. Isso é exatamente a motivação desse refactoring.
