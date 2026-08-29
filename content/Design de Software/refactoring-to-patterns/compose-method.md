

---
---
---

# GPT001 - Explique Compose Method

O **Compose Method** é provavelmente a refatoração mais importante do livro _Refactoring to Patterns_. Ela é simples, mas muda completamente a legibilidade do código.

A ideia é:

> **Um método deve contar uma história, não mostrar todos os detalhes de como ela acontece.**

Ou seja, em vez de um método enorme cheio de detalhes de implementação, você o divide em pequenos métodos com nomes que explicam a intenção.

## Antes

Imagine um método assim:

```php
public function register(User $user)
{
    if (empty($user->name)) {
        throw new Exception("Nome obrigatório");
    }

    if (!filter_var($user->email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Email inválido");
    }

    $user->password = password_hash($user->password, PASSWORD_DEFAULT);

    $this->repository->save($user);

    $this->mailer->sendWelcomeEmail($user);

    $this->logger->info("Usuário criado");
}
```

Não é um código ruim, mas o leitor precisa entender cada linha para descobrir o que o método faz.

---

## Depois

```php
public function register(User $user)
{
    $this->validate($user);
    $this->encryptPassword($user);
    $this->saveUser($user);
    $this->sendWelcomeEmail($user);
    $this->logCreation($user);
}
```

Agora você consegue entender o método em poucos segundos.

Os detalhes ficam escondidos:

```php
private function validate(User $user)
{
    ...
}

private function encryptPassword(User $user)
{
    ...
}
```

---

## Por que isso melhora o código?

O método principal fica parecido com um roteiro:

```text
Registrar usuário

↓
Validar

↓
Criptografar senha

↓
Salvar

↓
Enviar e-mail

↓
Registrar log
```

Você entende **o que acontece** sem precisar saber **como acontece**.

---

## O princípio por trás

Kent Beck dizia algo parecido com:

> Se você precisa ler os detalhes para entender um método, ele provavelmente está fazendo coisas demais.

O Compose Method combate exatamente isso.

---

## Benefícios

- Métodos pequenos.
    
- Código mais legível.
    
- Fácil de testar.
    
- Fácil de alterar.
    
- Reutilização de partes.
    
- Menos comentários (os nomes dos métodos explicam a intenção).
    

---

## Cuidado

Compose Method **não** significa criar um método para cada linha.

Ruim:

```php
public function process()
{
    $this->getUser();
    $this->setName();
    $this->setEmail();
    $this->setPassword();
}
```

Esses métodos não representam uma ideia completa; apenas escondem linhas de código.

Bom:

```php
public function process()
{
    $this->loadUser();
    $this->validateUser();
    $this->persistChanges();
}
```

Cada método representa uma etapa significativa do processo.

---

## Quando aplicar?

Sempre que você perceber um método que:

- tem mais de 20–30 linhas (não é uma regra rígida);
    
- mistura várias responsabilidades;
    
- exige muitos comentários para explicar o que faz;
    
- tem blocos de código separados por linhas em branco;
    
- possui nomes como `process()`, `execute()` ou `run()` e concentra muita lógica.
    

Esses são fortes indícios de que ele pode ser decomposto.

---

## Relação com outros padrões

O Compose Method costuma ser o **primeiro passo** antes de aplicar padrões mais sofisticados. Depois de extrair métodos menores, fica muito mais fácil perceber oportunidades para:

- **Template Method**: quando existe um fluxo fixo com etapas bem definidas.
    
- **Strategy**: quando uma das etapas varia conforme o contexto.
    
- **Command**: quando uma etapa representa uma ação independente que pode virar um comando.
    
- **Factory Method**: quando uma etapa de criação de objetos começa a ficar complexa.
    

Em outras palavras, **Compose Method organiza o código para que os padrões apareçam naturalmente**, em vez de serem forçados.

---

## No seu contexto

Essa é provavelmente a refatoração que você mais vai aplicar.

Pelas conversas que tivemos sobre seu código em PHP/Zend, é comum encontrar métodos grandes que fazem várias coisas: validam dados, consultam o banco, tratam exceções, montam mensagens, atualizam entidades e retornam resultados. Antes de pensar em Strategy, Command ou qualquer outro padrão, a primeira melhoria quase sempre é aplicar **Compose Method**, deixando o método principal descrever o fluxo em alto nível e movendo os detalhes para métodos privados com nomes claros. Isso torna o código muito mais fácil de entender e prepara o terreno para outras refatorações mais avançadas.


# GPT002 - Compose Method em Service (!important)

> Mina mensagem: Um service cuja funçao esteja mais ou menos dessa forma como colocou, pequeno, e extremamente legíviel é o ideal?

Sim. Na verdade, esse é um dos sinais de um **bom Service**.

Um Service normalmente deve **orquestrar** uma regra de negócio, não conter todos os detalhes dela.

Por exemplo:

```php
public function register(RegisterUserDto $dto): User
{
    $this->validate($dto);

    $user = $this->createUser($dto);

    $this->save($user);

    $this->sendWelcomeEmail($user);

    $this->publishUserCreatedEvent($user);

    return $user;
}
```

Esse método é agradável de ler porque, em poucos segundos, você entende todo o fluxo. Os detalhes ficam escondidos em métodos privados ou em outras classes.

## Mas cuidado com um detalhe importante

Existe uma diferença entre um Service que **orquestra** e um Service que apenas **delegaa tudo**.

### Bom

```php
public function approveLoan(Loan $loan)
{
    $this->validateLoan($loan);

    $this->calculateInterest($loan);

    $this->reserveFunds($loan);

    $this->loanRepository->save($loan);

    $this->notifyCustomer($loan);
}
```

Aqui existe um fluxo de negócio claro.

---

### Nem tão bom

```php
public function approveLoan(Loan $loan)
{
    $this->validator->validate($loan);
    $this->calculator->calculate($loan);
    $this->repository->save($loan);
    $this->notifier->send($loan);
}
```

Esse código pode até parecer limpo, mas surge a pergunta:

> **Por que esse Service existe?**

Se ele apenas encaminha chamadas para outras classes, sem adicionar coordenação ou regra de negócio, ele pode estar sendo apenas um "pass-through". Nesse caso, talvez a abstração não esteja agregando valor.

## Martin Fowler fala justamente disso

Fowler descreve a **Service Layer** como a camada que **coordena uma operação do sistema**. Ela:

- controla a transação;
    
- coordena chamadas ao domínio;
    
- conversa com repositórios;
    
- aciona integrações externas;
    
- define o fluxo de uma operação.
    

Ela não precisa conter toda a lógica de negócio, mas deve representar um **caso de uso**.

## No seu contexto

Pelas conversas que tivemos sobre o sistema legado em PHP/Zend, eu buscaria Services que pareçam quase uma receita:

```text
Criar Pedido

↓
Validar

↓
Calcular valores

↓
Persistir

↓
Enviar eventos

↓
Retornar resultado
```

Você consegue ler esse fluxo em menos de 15 segundos e entender o que acontece. Isso é um excelente sinal.

Já os cálculos complexos, regras específicas, validações elaboradas e algoritmos normalmente pertencem a outras classes (entidades, policies, strategies, specifications etc.), deixando o Service como o maestro que coordena a execução.

Essa ideia conversa muito bem com o **Compose Method**: o método principal do Service conta a história da operação, enquanto os detalhes ficam encapsulados em métodos ou objetos com responsabilidades bem definidas.

# GPT003 - Duvida sobre service só delegar

> Estou em duvida agora. Eu entendo que o código a seguir e bom: Porem, o Sevice como tem que exceutar o useCase eçe precisa do validro, repository e notifier interno para fazer isso. Tipo, dentro dele ele cria esse objetos em algum lugar e os chamadas, já que como service ele sozinho nao pode fazer todas essasc osia ao mesmo tempo. Há classe especifica para tratar esse cassos. Esse caso 'nem tao bom' me parece ser um caso que eu faria. No contrutor Ingetaria as classe e as usaurias internamente, entao porque está ruim?

Essa é uma dúvida muito boa. E a resposta é: **o segundo exemplo não está necessariamente ruim**. Na verdade, eu simplifiquei demais e isso pode ter passado a impressão errada.

O ponto não é **"chamar outras classes é ruim"**. Pelo contrário: um Service normalmente **deve** fazer isso.

A questão é **se o Service está agregando valor ou apenas repassando chamadas**.

## Um bom Service normalmente faz exatamente isso

Por exemplo:

```php
class ApproveLoanService
{
    public function __construct(
        private LoanValidator $validator,
        private InterestCalculator $calculator,
        private LoanRepository $repository,
        private Notifier $notifier,
    ) {}

    public function approve(Loan $loan)
    {
        $this->validator->validate($loan);

        $this->calculator->calculate($loan);

        $loan->approve();

        $this->repository->save($loan);

        $this->notifier->send($loan);
    }
}
```

Eu acho esse código **bom**.

Por quê?

Porque o Service está coordenando um **caso de uso**.

Ele decide:

1. validar;
    
2. calcular;
    
3. aprovar;
    
4. salvar;
    
5. notificar.
    

Isso é exatamente o papel de um Application Service.

---

## Quando ele começa a ficar ruim?

Imagine isto:

```php
class UserService
{
    public function create(User $user)
    {
        return $this->repository->create($user);
    }

    public function update(User $user)
    {
        return $this->repository->update($user);
    }

    public function delete(int $id)
    {
        return $this->repository->delete($id);
    }

    public function find(int $id)
    {
        return $this->repository->find($id);
    }
}
```

Aqui o Service **não faz absolutamente nada**.

É apenas um intermediário.

Ele poderia nem existir.

É isso que Martin Fowler costuma criticar: Services que viram apenas uma camada a mais sem responsabilidade própria.

---

## Outro exemplo

Imagine:

```php
public function create(UserDto $dto)
{
    return $this->userCreator->create($dto);
}
```

Se a única função do método é chamar outro método...

...por que não chamar `UserCreator` diretamente?

---

## O que diferencia um bom Service?

Ele **coordena**.

Ou seja, ele possui uma sequência de passos que representam um caso de uso.

Por exemplo:

```php
public function transfer(TransferDto $dto)
{
    $this->validator->validate($dto);

    $source = $this->accounts->find($dto->source);

    $target = $this->accounts->find($dto->target);

    $this->transferPolicy->check($source, $target, $dto);

    $source->withdraw($dto->amount);

    $target->deposit($dto->amount);

    $this->accounts->save($source);

    $this->accounts->save($target);

    $this->eventBus->publish(...);
}
```

Isso é um excelente Service.

Ele está usando:

- Validator
    
- Repository
    
- Policy
    
- EventBus
    

Mas quem decide a ordem de tudo é ele.

---

## Acho que aqui está a confusão

Você pensou:

> "Mas o Service não tem que chamar Validator, Repository, Notifier?"

**Sim! Tem.**

Na verdade, quase todos os Application Services bem escritos fazem isso.

O que ele **não** deve virar é um simples "proxy".

---

## Uma regra que gosto de usar

Quando olho para um Service, pergunto:

> **Se eu apagar essa classe, perco alguma lógica?**

Se a resposta for:

> "Não, porque ela só chama outra classe."

Então provavelmente ela não agrega muito valor.

Mas se a resposta for:

> "Sim, porque ela define toda a sequência do caso de uso."

Então ela está cumprindo muito bem seu papel.

---

Eu diria que, pelas nossas conversas sobre **Service Layer**, **Facade**, **Command**, **Strategy** e agora **Compose Method**, você está chegando a uma distinção muito importante:

- **As outras classes** (Validator, Repository, Policy, Strategy, Specification...) sabem **como fazer uma tarefa específica**.
    
- **O Service** sabe **quando chamar cada uma delas e em que ordem** para realizar um caso de uso.
    

Essa é uma das ideias centrais da Service Layer de Martin Fowler: o Service não precisa conter toda a inteligência do sistema, mas ele é o **orquestrador do caso de uso**. Ele conta a história da operação, enquanto as classes especializadas executam cada etapa dessa história. É exatamente por isso que um Service pequeno, legível e que injeta várias dependências pode ser um ótimo design.