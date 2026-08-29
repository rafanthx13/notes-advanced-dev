**Resumo:** Regra de negócio que pertence ao objeto fica dentro do objeto (e não fora e nem em service). Combina bem com Active Record (Eloquent / Model do laravel). Isso vale para comportamentos pequenos específicos da classe. Representa uma entidade do domínio

![[Pasted image 20260719191426.png]]


## Notas de Estudo

- **O que é:** 
	- Um Domain Model é um modelo onde os objetos não apenas armazenam dados, mas também encapsulam o comportamento e as regras de negócio relacionadas a esses dados.
- **Como funciona:** 
	- Colocar regra de negócio dentro da classe (quando a classe representa uma entidade)
- **Quando usar:** 
	- Pense um seguinte. Se algo for pequeno e especifico para um objeto, deixe dentro do objeto ao invés de criar um service só pra lidar com aquilo.
	- **Isso funciona bem no esquema do Model do Laravel: O objeto é: Pacote de dados + Acesso ao banco + Possui regras de negócio interna**

# Anotações

Consiste em por a regra de negócio dentro do objeto.

Muitas vezes tratamos os objetos como Anêmicos, ou seja, é apenas uma classe com atributos.

A ideia do Domain Model é por regra de negócio dentro do objeto.

O objeto X deveria saber apenas coisas do domínio.

Exemplo Anêmico

````
class Cliente { public $nome; public $cpf; public $idade; }
````
Exemplo do DomainModel

````
class Cliente
{
    private $idade;

    public function podeDirigir()
    {
        return $this->idade >= 18;
    }

    public function fazerAniversario()
    {
        $this->idade++;
    }
}
````



# Relação entre Domain Model e Active Record

Exatamente. Você entendeu a essência.

Mas existe uma diferença importante entre **ter um Model** e **ter um Domain Model**.

## O Model do Laravel (Eloquent)

Por padrão, um Model do Eloquent é principalmente um **Active Record**.

Ele representa uma linha da tabela e sabe se persistir.

```php
class Pedido extends Model
{
    protected $table = 'pedidos';
}
```

Ele já sabe fazer:

```php
$pedido = Pedido::find(1);

$pedido->status = 'Pago';

$pedido->save();
```

Isso é o padrão **Active Record**.

---

## Quando ele vira um Domain Model?

Quando você começa a colocar nele comportamentos que pertencem ao negócio.

Por exemplo:

```php
class Pedido extends Model
{
    public function cancelar()
    {
        if ($this->status == 'Enviado') {
            throw new Exception('Pedido enviado não pode ser cancelado.');
        }

        $this->status = 'Cancelado';
    }

    public function pagar()
    {
        if ($this->status != 'Aguardando Pagamento') {
            throw new Exception('Pedido já foi pago.');
        }

        $this->status = 'Pago';
    }

    public function podeSerCancelado()
    {
        return $this->status != 'Enviado';
    }
}
```

Agora o objeto **não é apenas um espelho da tabela**.

Ele conhece parte das regras do negócio.

Isso já é uma aplicação do Domain Model.

---

## O que NÃO seria Domain Model?

Imagine um controller assim:

```php
public function cancelar($id)
{
    $pedido = Pedido::find($id);

    if ($pedido->status == 'Enviado') {
        throw new Exception(...);
    }

    $pedido->status = 'Cancelado';

    $pedido->save();
}
```

Depois outro controller faz a mesma coisa.

Depois um Job.

Depois uma API.

A regra ficou espalhada.

O ideal seria:

```php
$pedido->cancelar();

$pedido->save();
```

Agora existe apenas um lugar que conhece a regra.

---

## Mas existe um limite

Você disse uma coisa importante:

> "regras de negócios curtas"

Na maioria dos projetos Laravel, sim.

O Model costuma conter regras como:

- pode cancelar?
    
- calcular desconto
    
- calcular total
    
- alterar status
    
- validar transição de estado
    
- aplicar cupom
    
- verificar disponibilidade
    

Essas são responsabilidades naturais da entidade.

---

Já coisas como:

```php
public function cancelar()
{
    // chama API

    // envia e-mail

    // publica Kafka

    // gera PDF

    // faz PIX

    // grava log

    // envia SMS
}
```

provavelmente **não pertencem** ao Model.

Aí entra o **Service Layer**, outro padrão do livro.

---

## No seu caso

Pelo que conheço do seu trabalho em PHP legado, imagino que hoje você tenha muito código parecido com isto:

```php
public function aprovar($id)
{
    $proposta = $this->model->buscar($id);

    if ($proposta->status != 'PENDENTE') {
        throw new Exception(...);
    }

    if ($proposta->valor > 10000) {
        ...
    }

    if ($proposta->clienteBloqueado()) {
        ...
    }

    $proposta->status = 'APROVADA';

    $this->model->salvar($proposta);
}
```

Um código orientado ao Domain Model tenderia a ficar assim:

```php
$proposta->aprovar();

$this->repository->save($proposta);
```

E dentro de `aprovar()` estaria toda a lógica para decidir se a aprovação é válida.

## Uma observação importante

É justamente aqui que muita gente confunde **Active Record** com **Domain Model**.

Eles **não são concorrentes**.

Na verdade, eles respondem perguntas diferentes:

- **Active Record** responde: _"Como esse objeto é salvo no banco?"_
    
- **Domain Model** responde: _"Onde devem ficar as regras de negócio desse objeto?"_
    

O Eloquent já implementa **Active Record**. Cabe a você decidir se vai usá-lo apenas como um "container de dados" ou enriquecê-lo com comportamentos de negócio, aproximando-o de um **Domain Model**.

Por isso, um Model do Laravel pode ser:

- apenas um **Active Record** (o caso mais comum em CRUDs simples); ou
    
- um **Active Record + Domain Model** (quando também encapsula regras de negócio).
    

Essa combinação é bastante comum e funciona muito bem em sistemas de complexidade moderada. Em domínios muito complexos, algumas equipes preferem separar completamente o domínio da persistência usando **Data Mapper** (como no Hibernate), mas isso já é outro padrão do livro.