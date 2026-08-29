**Resumo:** MVC separa uma aplicação em Model (dados e regras), View (apresentação) e Controller (coordenação da interação), permitindo que cada parte evolua independentemente.

![[Pasted image 20260719203944.png]]

## Notas de Estudo

- **O que é:** 
- **Como funciona:** 
- **Quando usar:** 
- **Exemplos/Anotações:** 


---
----
---

# 01- GPT - O que é MVC

Ótima escolha. O **MVC (Model-View-Controller)** é provavelmente o padrão arquitetural mais conhecido de todos, mas também um dos mais mal interpretados.

Um detalhe interessante: no **PoEAA**, Martin Fowler trata MVC como um padrão de apresentação (Web Presentation Pattern), porque o foco dele é principalmente **separar a camada de interação com o usuário da lógica da aplicação**.

---

# O problema que o MVC resolve

Imagine uma aplicação sem separação:

```php
<?php

// recebe requisição

// valida dados

// consulta banco

// calcula regra

// monta HTML

// imprime tela

?>
```

Tudo está misturado:

- lógica de negócio;
    
- acesso a dados;
    
- HTML;
    
- controle da navegação.
    

Com o tempo, uma alteração simples vira um problema.

Exemplo:

> "Preciso mudar a tela, mas não posso alterar a regra de negócio."

Se tudo está junto, é difícil.

---

# A ideia do MVC

Separar a aplicação em três responsabilidades:

```text
id="mvc1"
        Usuário

          ↓

     Controller

          ↓

        Model

          ↓

       Banco


          ↓

        View

          ↓

       Usuário
```

---

# 1. Model

O Model representa os **dados e regras da aplicação**.

Ele é a parte mais importante.

Exemplo:

```php
class Pedido
{
    public function cancelar()
    {
        if ($this->status == 'Enviado') {
            throw new Exception();
        }

        $this->status = 'Cancelado';
    }
}
```

O Model sabe:

- o que é um Pedido;
    
- quais estados existem;
    
- quais operações são permitidas.
    

Ele **não sabe** como mostrar na tela.

---

# 2. View

A View é a apresentação.

Ela sabe:

- HTML;
    
- CSS;
    
- componentes visuais;
    
- como exibir informações.
    

Exemplo:

```html
<h1>
Pedido #123
</h1>

<p>
Status: Cancelado
</p>
```

Ela não deveria saber:

```php
if ($pedido->valor > 10000)
```

Porque isso é regra de negócio.

---

# 3. Controller

O Controller é o intermediário.

Ele recebe a ação do usuário e coordena.

Exemplo:

Usuário clica:

```
Cancelar pedido
```

Controller:

```php
public function cancelar($id)
{
    $pedido = Pedido::find($id);

    $pedido->cancelar();

    $pedido->save();

    return view('pedido.cancelado');
}
```

O Controller:

- recebe requisição;
    
- chama o domínio;
    
- decide qual View retornar.
    

Ele não deveria ter regras complexas.

---

# O fluxo completo

Imagine acessar:

```
POST /pedido/10/cancelar
```

Fluxo:

```text
Usuário

↓

Route

↓

Controller

↓

Pedido

↓

Repository

↓

Banco


Controller

↓

View

↓

Usuário
```

---

# Um erro comum: achar que Model é só tabela

No Laravel isso acontece muito.

A pessoa pensa:

> "Model é minha classe que representa a tabela."

Isso é apenas uma parte.

Um Model rico pode ter:

```php
class Pedido extends Model
{
    public function cancelar();

    public function calcularTotal();

    public function aplicarCupom();

    public function podeSerEnviado();
}
```

Ele representa o conceito de negócio.

---

# MVC no Laravel

O Laravel segue MVC.

Exemplo:

## Model

```php
class Produto extends Model
{
}
```

---

## Controller

```php
class ProdutoController
{
    public function show($id)
    {
        $produto = Produto::find($id);

        return view(
            'produto.show',
            compact('produto')
        );
    }
}
```

---

## View

```blade
<h1>
{{ $produto->nome }}
</h1>
```

---

# Mas existe uma confusão importante

MVC não diz:

> "Toda lógica deve ficar no Model."

Esse é um erro comum.

Em sistemas grandes você geralmente tem:

```text
Controller

↓

Service Layer

↓

Domain Model

↓

Repository

↓

Banco
```

O MVC é apenas a camada de apresentação.

Ele não substitui os outros padrões.

---

# Como MVC se relaciona com o que estudamos?

Agora dá para juntar tudo:

```text
                 Usuário

                    ↓

                 Controller
                    |
                    ↓

              Service Layer
                    |
                    ↓

              Domain Model
                    |
                    ↓

              Repository
                    |
                    ↓

              Data Mapper
                    |
                    ↓

                  Banco
```

E depois:

```text
Banco

↓

Data Mapper

↓

Repository

↓

Domain Model

↓

Controller

↓

View

↓

Usuário
```

Cada padrão resolve uma coisa diferente.

---

# MVC vs Service Layer

Uma dúvida comum:

> "Então Controller e Service fazem a mesma coisa?"

Não.

Controller:

> "Recebi uma requisição HTTP."

Service:

> "Preciso executar o caso de uso."

Exemplo:

Controller:

```php
public function comprar()
{
    $this->compraService->comprar($id);
}
```

Service:

```php
public function comprar($id)
{
    // verificar estoque
    // criar pedido
    // cobrar pagamento
}
```

---

# MVC vs Facade

Também não são iguais.

MVC organiza:

```text
apresentação
```

Facade simplifica:

```text
acesso a um subsistema
```

---

# O maior benefício do MVC

Separação de responsabilidades.

Você consegue mudar:

- a tela sem mudar o negócio;
    
- o banco sem mudar a tela;
    
- a regra sem mudar o HTML.
    

---

# A frase que resume MVC

> **MVC separa uma aplicação em Model (dados e regras), View (apresentação) e Controller (coordenação da interação), permitindo que cada parte evolua independentemente.**

---

Uma observação pensando no seu contexto: pelo que você contou sobre Laravel, Zend legado e seus projetos com Blade/Tailwind, provavelmente você já usa MVC há anos. O ganho agora estudando o PoEAA é perceber que **MVC é apenas a primeira camada da organização**. Um projeto profissional normalmente combina MVC + Service Layer + Domain Model + Repository + algum padrão de persistência. O MVC sozinho não resolve arquitetura de negócio; ele resolve principalmente a separação entre interface e aplicação.