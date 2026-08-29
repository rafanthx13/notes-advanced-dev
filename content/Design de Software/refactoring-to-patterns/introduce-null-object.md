É um objeto que implemetna uma interface com mesmos metodos que a entdade origianl, mas que. Ao executar nao faz nada.

# Quando usar?

Quando **a ausência de um objeto não é considerada um erro**.

Exemplos:

- Logger
- Cache
- Notificador opcional
- Cliente anônimo
- Usuário convidado
- Configuração opcional

# Quando NÃO usar?

Aqui está o ponto mais importante.

Imagine:

```
$customer = $repository->findById($id);
```

Se o cliente **é obrigatório** para continuar a operação...

...não faz sentido retornar:

```
NullCustomer
```

O correto é lançar uma exceção ou indicar claramente que ele não foi encontrado.

Por exemplo:

```
throw new CustomerNotFoundException();
```

ou

```
return null;
```

dependendo da regra de negócio.

Se você usar Null Object nesse caso, pode esconder um erro importante.

---

# Como saber?

Faça esta pergunta:

> **A ausência desse objeto é um comportamento esperado?**

Se sim:

✅ Null Object pode fazer sentido.

Se não:

❌ Provavelmente deve haver uma exceção ou outro tratamento explícito.

---
---
---

# GPT001 - Fale sobre Null Object

Fico feliz que esclareceu! Na minha opinião, essa distinção entre **"quem orquestra"** e **"quem executa uma tarefa específica"** é uma das ideias mais importantes de arquitetura orientada a objetos. Quando ela "encaixa", muitos padrões começam a fazer sentido.

---

## Introduce Null Object

O objetivo dessa refatoração é eliminar verificações repetidas de `null`.

A ideia é:

> **Em vez de retornar `null`, retorne um objeto que representa "não existe", mas que se comporta como o objeto esperado.**

Assim, o código cliente não precisa ficar perguntando o tempo todo:

```php
if ($user !== null) {
    $user->sendEmail();
}
```

---

### Antes

Imagine um sistema de usuários.

```php
$user = $repository->findById($id);

if ($user !== null) {
    echo $user->name;
}
```

Ou pior:

```php
$user = $repository->findById($id);

if ($user !== null) {
    $user->sendEmail();
}

if ($user !== null) {
    $user->logAccess();
}

if ($user !== null) {
    $user->generateReport();
}
```

O código fica cheio de verificações.

---

### Depois

Criamos uma implementação especial.

```php
interface User
{
    public function getName();

    public function sendEmail();
}
```

Usuário normal:

```php
class RealUser implements User
{
    ...
}
```

Usuário nulo:

```php
class NullUser implements User
{
    public function getName()
    {
        return "";
    }

    public function sendEmail()
    {
        // não faz nada
    }
}
```

Agora o repositório faz:

```php
public function findById($id): User
{
    ...

    if (!$found) {
        return new NullUser();
    }

    return $user;
}
```

---

### O cliente

Agora fica assim:

```php
$user = $repository->findById($id);

$user->sendEmail();
```

Sem nenhum `if`.

---

## Outro exemplo

Imagine um sistema bancário.

Antes:

```php
$manager = $account->getManager();

if ($manager !== null) {
    $manager->approveLoan();
}
```

Depois:

```php
$manager = $account->getManager();

$manager->approveLoan();
```

Se não existir gerente, retorna:

```php
NullManager
```

que simplesmente faz:

```php
public function approveLoan()
{
    // nenhuma ação
}
```

---

## Por que isso é útil?

Porque elimina código repetitivo.

Ao invés de:

```php
if ($obj != null)
```

espalhado por 30 arquivos...

...o comportamento fica centralizado em uma classe.

---

## Um exemplo famoso

Imagine um Logger.

Sem Null Object:

```php
if ($logger != null) {
    $logger->log($msg);
}
```

Com Null Logger:

```php
$logger->log($msg);
```

Se ninguém configurou logger, você usa:

```php
NullLogger
```

que implementa

```php
log()
```

mas não faz nada.

Esse é um exemplo clássico e muito usado.

---

## Quando usar?

Quando **a ausência de um objeto não é considerada um erro**.

Exemplos:

* Logger
* Cache
* Notificador opcional
* Cliente anônimo
* Usuário convidado
* Configuração opcional

---

## Quando NÃO usar?

Aqui está o ponto mais importante.

Imagine:

```php
$customer = $repository->findById($id);
```

Se o cliente **é obrigatório** para continuar a operação...

...não faz sentido retornar:

```php
NullCustomer
```

O correto é lançar uma exceção ou indicar claramente que ele não foi encontrado.

Por exemplo:

```php
throw new CustomerNotFoundException();
```

ou

```php
return null;
```

dependendo da regra de negócio.

Se você usar Null Object nesse caso, pode esconder um erro importante.

---

## Como saber?

Faça esta pergunta:

> **A ausência desse objeto é um comportamento esperado?**

Se sim:

✅ Null Object pode fazer sentido.

Se não:

❌ Provavelmente deve haver uma exceção ou outro tratamento explícito.

---

## No seu contexto

Lembra que conversamos sobre:

> "Se chamar uma API para buscar um usuário e ele não existir, lanço exceção ou retorno vazio?"

Esse é exatamente um caso em que **eu não usaria Null Object**.

Por quê?

Porque "usuário não encontrado" muda completamente o resultado do caso de uso. Não é apenas "não fazer nada"; é uma informação relevante para a aplicação.

Já em algo como um **logger**, um **cache** ou um **serviço de métricas**, a ausência do componente não impede o fluxo principal. Aí um `NullLogger`, `NullCache` ou `NullMetrics` faz muito sentido, porque o restante do código continua funcionando sem precisar de vários `if ($logger !== null)`.

---

## Uma observação sobre PHP moderno

Hoje, em PHP 8+, existe o operador de navegação nula:

```php
$user?->sendEmail();
```

Ele reduz bastante a necessidade de escrever:

```php
if ($user !== null) {
    $user->sendEmail();
}
```

Mas ele **não substitui o padrão Null Object**.

O `?->` apenas evita um erro quando o objeto é `null`. Já o **Null Object encapsula um comportamento**. Por exemplo, um `NullLogger` pode contar quantas mensagens foram ignoradas, um `NullCache` pode sempre retornar "cache miss", ou um `GuestUser` pode responder `"Visitante"` ao nome e negar permissões. Ou seja, ele não é apenas "não ser nulo"; ele representa uma ausência com um comportamento bem definido.

Essa é a principal diferença entre um recurso da linguagem e o padrão de projeto.

