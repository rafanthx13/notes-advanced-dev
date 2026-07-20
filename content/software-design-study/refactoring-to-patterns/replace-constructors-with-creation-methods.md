
Creation method: Muitas vezes usser new  passar uma érie de pramoetros pode ficar feio e dificil de reocnhecer o que exatamente cad boolean faz. (Par aobjeos complexos). Pomdeo simplifacr tendo methodos com bons nomes para simpplificaressa criaçao.

# GPT001 

Esse é um refactoring muito útil e, na prática, um dos mais aplicáveis em sistemas corporativos.

A ideia é:

> **Quando um construtor começa a ficar confuso ou expressa mal a intenção, substitua-o por métodos de criação com nomes significativos.**

O objetivo **não é eliminar construtores**, mas tornar a criação dos objetos mais clara.

---

## O problema

Imagine uma classe:

```php
class User
{
    public function __construct(
        string $name,
        string $email,
        bool $admin,
        bool $active
    ) {}
}
```

Agora veja quem usa:

```php
$user = new User(
    "Rafael",
    "rafael@email.com",
    true,
    false
);
```

Pergunta:

> O que significa `true, false`?

É administrador?

Está ativo?

Está bloqueado?

Você precisa abrir o construtor para descobrir.

---

## Depois

Criamos métodos de criação.

```php
class User
{
    private function __construct(...)
    {
        ...
    }

    public static function createAdmin(...)
    {
        return new self(..., true, true);
    }

    public static function createCustomer(...)
    {
        return new self(..., false, true);
    }
}
```

Agora fica assim:

```php
$admin = User::createAdmin(
    "Rafael",
    "rafael@email.com"
);
```

Muito mais legível.

---

## Outro exemplo

Imagine dinheiro.

Antes:

```php
new Money(100, "BRL");
```

Depois:

```php
Money::fromReais(100);
```

ou

```php
Money::fromDollars(20);
```

A intenção ficou explícita.

---

## Outro exemplo

Datas.

Ao invés de

```php
new DateTime();
```

podemos ter

```php
Date::today();

Date::tomorrow();

Date::fromString(...);
```

Perceba como o nome explica a intenção.

---

## Não é Factory Method?

Parece.

Mas existe uma diferença.

### Creation Method

É qualquer método que cria um objeto.

```php
User::create(...)
```

```php
User::fromArray(...)
```

```php
User::anonymous()
```

Todos são Creation Methods.

---

### Factory Method

É um padrão GoF.

Normalmente envolve herança.

Por exemplo:

```php
abstract class Dialog
{
    abstract protected function createButton();
}
```

A subclasse decide qual botão criar.

---

Então:

```text
Factory Method

↓

é um caso específico de

↓

Creation Method
```

Nem todo Creation Method é Factory Method.

---

## Métodos comuns

Você provavelmente já viu vários.

```php
User::create(...);

User::fromArray(...);

User::fromJson(...);

User::fromDatabase(...);

User::anonymous();

User::guest();

User::admin();
```

Todos eles tornam a API muito mais expressiva.

---

## Outro benefício

Imagine isso:

```php
new File(
    "/tmp/a.txt",
    true,
    false,
    null
);
```

Agora compare:

```php
File::temporary("/tmp/a.txt");
```

Qual é mais fácil de entender?

---

## No DDD

Esse tipo de método aparece muito.

Exemplo:

```php
Order::create(...);

Invoice::issue(...);

Account::open(...);
```

Em vez de:

```php
new Order(...);

new Invoice(...);

new Account(...);
```

O nome do método representa um conceito do domínio.

---

## Outra vantagem

Você pode mudar a implementação sem mudar quem usa.

Hoje:

```php
return new User(...);
```

Amanhã:

```php
return new PremiumUser(...);
```

Quem chamou:

```php
User::create(...)
```

nem percebe.

---

## Quando aplicar?

Quando o construtor:

* possui muitos parâmetros;
* usa muitos `bool`;
* possui parâmetros opcionais;
* precisa de comentários para explicar;
* possui várias formas diferentes de criar o objeto.

---

## No seu contexto

Vou dar um exemplo usando algo que conversamos bastante: os importadores.

Hoje você poderia fazer:

```php
new MensalidadePlano1Processor(
    $repository,
    $validator,
    $layout,
    $config
);
```

Mas imagine que existam várias formas de criar esse processador.

Você poderia ter:

```php
MensalidadePlano1Processor::forProduction();

MensalidadePlano1Processor::forTests();

MensalidadePlano1Processor::fromLayout($layout);

MensalidadePlano1Processor::fromConfiguration($config);
```

Quem lê o código entende imediatamente **qual é a intenção da criação**, sem precisar conhecer a ordem ou o significado dos parâmetros do construtor.

---

## Uma observação importante

Muita gente acha que esse refactoring serve apenas para "esconder o `new`". Eu acho que esse é um benefício secundário.

O verdadeiro ganho é **dar um nome para a criação**.

Compare:

```php
new User(...)
```

com

```php
User::register(...)
```

Os dois criam um objeto.

Mas o segundo comunica uma intenção do domínio.

E isso conversa muito com algo que você tem buscado nas últimas conversas: **código que conta uma história**. Assim como o **Compose Method** faz um método principal parecer um roteiro, os **Creation Methods** fazem a criação dos objetos parecer parte da linguagem do negócio, em vez de apenas uma chamada técnica ao construtor.
