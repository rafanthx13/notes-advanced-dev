# Adapter

É você adaptar uma classe, ou seja, usar interface de *A e fazer com que *B execute algo igual a um A real.*

## Meu Resumo

Para que serve: Como o nome diz, é a pra que uma classe passe a ter o mesmo comportamento do que outra.

Como fazer: Primeiro, todas as classe devem ter 'implemnts interface'. COm isso voce cria uma classeAdpater que recebe a Classe $A no contrutor e implementa a classe $B. Assim, no metodo implmentado de $B usa o método intreno da classe $A que recebeu.

Exemplo de classe adapter:

````
// Aqui, $B é Lion (Uma interface que tem o método 'roar') e $A é WildDog. Usamos o dapater pois $A nâo tem o método 'roar' mas queremos que execute o seu 'bark' como se fosse o 'roar

class WildDogAdapter implements Lion
{
    protected $dog;

    public function __construct(WildDog $dog)
    {
        $this->dog = $dog;
    }

    public function roar()
    {
        $this->dog->bark();
    }
}
````

## Otávio Miranda

**INtenção** Converter a interface de uma classe em outra interface esperada pelos clientes. O Adapter permite que certas classes trabalhem em conjunto, pois de outra forma seria impossível por causa de suas interfaces incompatíveis.

**Estrutura**
 Pode ser feito por: Composição ou Herança multipla, mas , como nem todas as linguagen permite heranla multipla , vamos ver com adapter

 **Como fzer**
 + AO invez de depender de alguma cosia direta, eu crieo uma interface, e vou buscar executar algo na interfac (Target)
 + Depois crio o adaptare, uma classe concreta que implmenta Trget. Dentro de Adpater vai ter, por composiçâo o Adaptee, que é a classe concreta.
 + O Adapter executa os metodos de target chamando o Adaptee
+ POde parecer que é apenas uma delagaçâo, um proxy, mas a proposta é pensar no futuro.
+ Se o 'Adaptee' for um código de terceiro, se lele pará, masta entâo criar outro Adpter e passar por composiçâo.
+ **É PARA CRIAR ESSA FACILITADE ENTRE TROCAR UM OBJETO DE COMPOSIÇÂO POR OUTRO QUE É A RAZÃO DE SER DO ADAPTER**
 Parece um proxy mas nâo. 

**Aplicabildiade**
 Use o padrão Adapter quando:

+ você não quiser que seu código dependa diretamente de código de terceiros ou legado
+ você quiser usar um classe existente mas sua interface for incompatível com a interface que seu código ou domínio precisam
+ você quiser reutilizar várias subclasses que não possuam determinada funcionalidade mas for impraticável estender o código de cada uma apenas para adicionar a funcionalidade desejada

**COnsequencaias**

Bom:

+ Desacopla o código da aplicação de códigos de terceiros
+ Aplica o SRP ao separar a conversão de interfaces da lógica da aplicação
+ Aplica o OCP ao permitir introduzir novos Adapters para código existente
Ruim:

+ Aumenta a complexidade da aplicação (Por outro lado, qual outra solução deveria ser aplicada?)





## GitHub - kamranahmedse

https://github.com/kamranahmedse/design-patterns-for-humans#-adapter

🔌 Adapter

-------
Real world example
> Consider that you have some pictures in your memory card and you need to transfer them to your computer. In order to transfer them you need some kind of adapter that is compatible with your computer ports so that you can attach memory card to your computer. In this case card reader is an adapter.
> Another example would be the famous power adapter; a three legged plug can't be connected to a two pronged outlet, it needs to use a power adapter that makes it compatible with the two pronged outlet.
> Yet another example would be a translator translating words spoken by one person to another

In plain words
> Adapter pattern lets you wrap an otherwise incompatible object in an adapter to make it compatible with another class.

Wikipedia says
> In software engineering, the adapter pattern is a software design pattern that allows the interface of an existing class to be used as another interface. It is often used to make existing classes work with others without modifying their source code.

**Programmatic Example**

Consider a game where there is a hunter and he hunts lions.

First we have an interface `Lion` that all types of lions have to implement

```php
interface Lion
{
    public function roar();
}

class AfricanLion implements Lion
{
    public function roar()
    {
    }
}

class AsianLion implements Lion
{
    public function roar()
    {
    }
}
```
And hunter expects any implementation of `Lion` interface to hunt.
```php
class Hunter
{
    public function hunt(Lion $lion)
    {
        $lion->roar();
    }
}
```

Now let's say we have to add a `WildDog` in our game so that hunter can hunt that also. But we can't do that directly because dog has a different interface. To make it compatible for our hunter, we will have to create an adapter that is compatible

```php
// This needs to be added to the game
class WildDog
{
    public function bark()
    {
    }
}

// Adapter around wild dog to make it compatible with our game
class WildDogAdapter implements Lion
{
    protected $dog;

    public function __construct(WildDog $dog)
    {
        $this->dog = $dog;
    }

    public function roar()
    {
        $this->dog->bark();
    }
}
```
And now the `WildDog` can be used in our game using `WildDogAdapter`.

```php
$wildDog = new WildDog();
$wildDogAdapter = new WildDogAdapter($wildDog);

$hunter = new Hunter();
$hunter->hunt($wildDogAdapter);
