# Singleton

Criar um objeto único, centralizador e garantir que só exista uma únca instância durante a execução

## Links

https://refactoring.guru/pt-br/design-patterns/singleton
https://github.com/kamranahmedse/design-patterns-for-humans#-singleton

## Meu Resumo

**O que é**
O Singleton é um padrão de projeto criacional que permite a você garantir que uma classe tenha apenas uma instância, enquanto provê um ponto de acesso global para essa instância.

**O que resolve**
+ Garantir que uma classe tenha apenas uma única instância. 
  - Ou seja, se voce dar um `new SIngelton` nao deve retornar um novo objeto, deve retornar um já existente
+ Fornece um ponto de acesso global para aquela instância

**Quando usar**
+  Utilize o padrão Singleton quando uma classe em seu programa deve ter apenas uma instância disponível para todos seus clientes; por exemplo, um objeto de base de dados único compartilhado por diferentes partes do programa.
+ Utilize o padrão Singleton quando você precisa de um controle mais estrito sobre as variáveis globais.

**COmo fazer**
+ A classe Singleton declara o **método estático getInstance** que retorna a mesma instância de sua própria classe.
+ O construtor da singleton deve ser escondido do código cliente (construtor privado). 
+ **Chamando o método getInstance deve ser o único modo de obter o objeto singleton.**


## Refactoring Guru

````
// A classe Database define o método `getInstance` que permite
// clientes acessar a mesma instância de uma conexão a base de
// dados através do programa.
class Database is
    // O campo para armazenar a instância singleton deve ser
    // declarado como estático.
    private static field instance: Database

    // O construtor do singleton devem sempre ser privado para
    // prevenir chamadas diretas de construção com o operador
    // `new`.
    private constructor Database() is
        // Algum código de inicialização, tal como uma conexão
        // com um servidor de base de dados.
        // ...

    // O método estático que controla acesso à instância do
    // singleton
    public static method getInstance() is
        if (Database.instance == null) then
            acquireThreadLock() and then
                // Certifique que a instância ainda não foi
                // inicializada por outra thread enquanto está
                // estiver esperando pela liberação do `lock`.
                if (Database.instance == null) then
                    Database.instance = new Database()
        return Database.instance

    // Finalmente, qualquer singleton deve definir alguma lógica
    // de negócio que deve ser executada em sua instância.
    public method query(sql) is
        // Por exemplo, todas as solicitações à base de dados de
        // uma aplicação passam por esse método. Portanto, você
        // pode colocar a lógica de throttling ou cache aqui.
        // ...

class Application is
    method main() is
        Database foo = Database.getInstance()
        foo.query("SELECT ...")
        // ...
        Database bar = Database.getInstance()
        bar.query("SELECT ...")
        // A variável `bar` vai conter o mesmo objeto que a
        // variável `foo`.
````

## GitHub - kamranahmedse

https://github.com/kamranahmedse/design-patterns-for-humans#-singleton


In plain words
> Ensures that only one object of a particular class is ever created.

Wikipedia says
> In software engineering, the singleton pattern is a software design pattern that restricts the instantiation of a class to one object. This is useful when exactly one object is needed to coordinate actions across the system.

Singleton pattern is actually considered an anti-pattern and overuse of it should be avoided. It is not necessarily bad and could have some valid use-cases but should be used with caution because it introduces a global state in your application and change to it in one place could affect in the other areas and it could become pretty difficult to debug. The other bad thing about them is it makes your code tightly coupled plus mocking the singleton could be difficult.

**Programmatic Example**

To create a singleton, make the constructor private, disable cloning, disable extension and create a static variable to house the instance
```php
final class President
{
    private static $instance;

    private function __construct()
    {
        // Hide the constructor
    }

    public static function getInstance(): President
    {
        if (!self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function __clone()
    {
        // Disable cloning
    }

    private function __wakeup()
    {
        // Disable unserialize
    }
}
```
Then in order to use
```php
$president1 = President::getInstance();
$president2 = President::getInstance();

var_dump($president1 === $president2); // true
```
