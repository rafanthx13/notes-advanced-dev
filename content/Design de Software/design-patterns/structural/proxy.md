# Proxy

É criar uma classe que intercepta mensagens e lida melhor com ela, deixando a classe principal mais folgada (algo como lazy programming).

## Links

+ https://refactoring.guru/pt-br/design-patterns/proxy
+ https://github.com/kamranahmedse/design-patterns-for-humans#-proxy
+ https://www.youtube.com/watch?v=EsxPyICeBPs&ab_channel=Ot%C3%A1vioMiranda
+ https://www.devmedia.com.br/conheca-o-pattern-proxy-gof-gang-of-four/4066

## Meu Resumo

AO invez de acessar um objeto direto,acessar um proxy que tem esse objeto dentro de si e implementa a mesma intreface. Aasim, voce tem controle do acessoa ao objeto e pode fazre coisas antes e depois da sua chamada sem mudar o objeto original.

Algo como um middleware é util para: caching, logging, acl, lazy evaluation. TUDO ISSO SEM MEXER NO OBJETO REAL (Garante OCP s SRI)



## Otávio Miranda


Youtube video = Teoria
+ https://www.youtube.com/watch?v=EsxPyICeBPs&ab_channel=Ot%C3%A1vioMiranda

Descriçâoda aulas
+ https://github.com/luizomf/design-patterns-typescript/blob/master/src/structural/proxy/README.md

IMG Estrutura
![](https://raw.githubusercontent.com/luizomf/design-patterns-typescript/master/src/structural/proxy/diagramas/Proxy.png)

**

**Intençâo do proxy**:  Proxy é um padrão de projeto que tem a intenção de fornecer  um substituo ou marcador de localização para outro objeto para controlar o acesso a esse objeto

Basicamente o proxy fica algo entre a cahamd de um objeto e um objeto em si.

Muito semelhante ao composite e decorator mas com intençâo diferente: Usa composição

**Como fazer**:
1. Você tem um objeto real, funcional.
2. VOcê quer controlar o acesso a esse objeto (ex: fazer logging)
3. VOcê entã cria uma intraface que tem os mesmso métodos desse RealObject, INterfaceREalObject
4. O seu realObject extende essa interface VOcê cria a classe Proxy que extende ese objeto.
5. A sacada é: O proxy possui dentro de si esse RealObject. Ao executar uma açâo no proxy, você vai executar o méotdo que está dentro dele.
6. O proxy acontece entre: A chamada da funçâo até o momento finalem que acessar o seu objeto intero. Nesse intervalo é possivel fazer valizdaçao e umonte de coisa, é aí que se torna entâo um proxy, ou seja, algo entre a chamada e o objeto real (podendo fazer ACL,validaçao, Verificaçoes, loggind e etc())

**O proxy é um substitutos do objeto real, que faz a mesma coisa que o objeto real, mas, pondedno faer fazer coisa antes e depois da chamada do objeto original**

**Quando é utilizado**:
+ ACL
+ Logging
+ Lazy instatiaion e lazy evalution
+ distriuiçao de serviços (Se, por exemplo, ao executar um metodo, voce tem que disparar para outros objetos)
+ Quando se quer contorlar o que será passado para o objeto real (o que pssar e se vai passar ou nao).
+ Cacinhg: Se chama, por exemplo getUsaurios, pelo proxy voce pode verificar se na classe proxy tem CacheingUusarios, e asism voltar esse chae ao invez de executar direto
+ Controlar o objeto real: contolar o antes e depois do acesos ao objeto real

**variaçôes de proxy**

A dependen do objetiov que utilziar um proxy, ele pode ter uma nomeclatura diferente

+ proxy virtaul: controla acesso a recuros, que pdoem ser caros para criaçao ou utilizaçâo

+ proxy remoto: controla acesso a recuross que estao em servodiroe remtoos (poede ser na mesma maquina ou em outra)

+ proxy de proteção: ACL, autenticaçao, chave de acesso

+ proxy intelgiente: além de acl, ao objeto real, tambem executa tarefas adicionais apra saber quando e como usa ro objeto real

**Estrutura OO**

Lmebrando: SUbject (EN) = Objetto (BR)

+ Interface Subject (tem atributos e metodos)
+ RealSubject (implementa Subject)
+ Proxy (implementa SUbject)
  - Possui como attr um RealSubject

Como vai funcionar: você vai ser orientado a interface Subject, cria r um objeto prox *e dentro dele o objeto real*)

**Use o padrão Proxy quando**
+ A aplicabildaide é enorme ...
+ VOce tem um objeto rcaro para ser criado e nâo quer permitir acesso direto a esse objeto (proxy virutal)
+ VOcê quer restrignir acesso a aprte de sua aplicaçao (proxy de proteçao)
+ Voce quer uma ligçao entre seu sistea e um sistema remoto (proxy remoto)
+ Voce quer fazer cache de chamadas já realizads (proxy inteligente)
+ Voce quer interceptar quaisquer chamadas de métodos no objeto real por qualquer motivo (por exemplo, criar logs)

**Consequencaias**

**BOM**
+ O codigo cliente nem precisa sbsae se estpa ou nao usando um proxy (quanto menos souber, melhor, lei de demeter)
+ OCP: VOce pode adcionar novos proxys sem mudar o antigo
+ O proxy funciona mesmo se o objeto real nâo estiver operacional ou pronto para uso
+ VOce pode controar o lifecycle de objetos reis dentro da sua app atravez do proxy

**Ruim**
+ INtroduz mais classes ao sisstema e isso o torna mais complexo

## Refactoring Guru

**o que é**
O Proxy é um padrão de projeto estrutural que permite que você forneça um substituto ou um espaço reservado para outro objeto. Um proxy controla o acesso ao objeto original, permitindo que você faça algo ou antes ou depois do pedido chegar ao objeto original.

**Analogia com o mundo real - Crtão de cŕedito**

Um cartão de crédito é um proxy para uma conta bancária, que é um proxy para uma porção de dinheiro. Ambos implementam a mesma interface porque não há necessidade de carregar uma porção de dinheiro por aí. Um cliente se sente bem porque não precisa ficar carregando montanhas de dinheiro por aí. Um dono de loja também fica feliz uma vez que a renda da transação é adicionada eletronicamente para sua conta sem o risco de perdê-la no depósito ou de ser roubado quando estiver indo ao banco.

## GitHub - kamranahmedse

https://github.com/kamranahmedse/design-patterns-for-humans#-proxy

🎱 Proxy
-------------------
Real world example
> Have you ever used an access card to go through a door? There are multiple options to open that door i.e. it can be opened either using access card or by pressing a button that bypasses the security. The door's main functionality is to open but there is a proxy added on top of it to add some functionality. Let me better explain it using the code example below.

In plain words
> Using the proxy pattern, a class represents the functionality of another class.

Wikipedia says
> A proxy, in its most general form, is a class functioning as an interface to something else. A proxy is a wrapper or agent object that is being called by the client to access the real serving object behind the scenes. Use of the proxy can simply be forwarding to the real object, or can provide additional logic. In the proxy extra functionality can be provided, for example caching when operations on the real object are resource intensive, or checking preconditions before operations on the real object are invoked.

**Programmatic Example**

Taking our security door example from above. Firstly we have the door interface and an implementation of door

```php
interface Door
{
    public function open();
    public function close();
}

class LabDoor implements Door
{
    public function open()
    {
        echo "Opening lab door";
    }

    public function close()
    {
        echo "Closing the lab door";
    }
}
```
Then we have a proxy to secure any doors that we want
```php
class SecuredDoor
{
    protected $door;

    public function __construct(Door $door)
    {
        $this->door = $door;
    }

    public function open($password)
    {
        if ($this->authenticate($password)) {
            $this->door->open();
        } else {
            echo "Big no! It ain't possible.";
        }
    }

    public function authenticate($password)
    {
        return $password === '$ecr@t';
    }

    public function close()
    {
        $this->door->close();
    }
}
```
And here is how it can be used
```php
$door = new SecuredDoor(new LabDoor());
$door->open('invalid'); // Big no! It ain't possible.

$door->open('$ecr@t'); // Opening lab door
$door->close(); // Closing lab door
```
Yet another example would be some sort of data-mapper implementation. For example, I recently made an ODM (Object Data Mapper) for MongoDB using this pattern where I wrote a proxy around mongo classes while utilizing the magic method `__call()`. All the method calls were proxied to the original mongo class and result retrieved was returned as it is but in case of `find` or `findOne` data was mapped to the required class objects and the object was returned instead of `Cursor`.
