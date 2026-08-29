# Prototype

É uma forma eficiente de clonar um objeto, deixando esse método jaá dentro deele e não clonando de fora.

Sua principal utilidade é evitar custos: com inicializaça, processamento de objeto. AO invez de ter que criar um objeto custoso toda hora, você pode só clonar o  que você custou criar.

É como eu utilizo o `copy` em dataframes. Quero salvar algo e evitar de ter que criart do zero algo custoso.

Como fazr: ttenha uma interface com clone e permita que a classe concreta implemente o método com clone

## Links

https://refactoring.guru/pt-br/design-patterns/prototype
https://github.com/kamranahmedse/design-patterns-for-humans#-prototype

## Meu Resumo

**Resumo**: Para clonar um objeto, crie um interface com o método clone, e cada objeto que voce quiser que possa clonar implemente esse método internamente. Fazemos isso apra nao termos restriçao de acessar um método privdao do lugr eerrado

**Obejtivo**: O Prototype é um padrão de projeto criacional que permite copiar objetos existentes sem fazer seu código ficar dependente de suas classes.
+ Uma forma de você clonar um objeto sem que voce tenha que se preocupar com a origem

**Porque usamos**: Porque as vezes, quando voce cona um objeto e fora voce nao tem acesso a seus dados privados, e por isso nao vai conalo direito

**Aplicabilidade GUru**:
+  Utilize o padrão Prototype quando seu código não deve depender de classes concretas de objetos que você precisa copiar.
+ Utilize o padrão quando você precisa reduzir o número de subclasses que somente diferem na forma que inicializam seus respectivos objetos. Alguém pode ter criado essas subclasses para ser capaz de criar objetos com uma configuração específica.

## GitHub - kamranahmedse

https://github.com/kamranahmedse/design-patterns-for-humans#-prototype

## Refactoring Guru

**Soluçâo GUru**:

O padrão Prototype delega o processo de clonagem para o próprio objeto que está sendo clonado. O padrão declara um interface comum para todos os objetos que suportam clonagem. Essa interface permite que você clone um objeto sem acoplar seu código à classe daquele objeto. Geralmente, tal interface contém apenas um único método clonar.

A implementação do método clonar é muito parecida em todas as classes. O método cria um objeto da classe atual e carrega todos os valores de campo para do antigo objeto para o novo. Você pode até mesmo copiar campos privados porque a maioria das linguagens de programação permite objetos acessar campos privados de outros objetos que pertençam a mesma classe.

Um objeto que suporta clonagem é chamado de um protótipo. Quando seus objetos têm dúzias de campos e centenas de possíveis configurações, cloná-los pode servir como uma alternativa à subclasses.

**COmo implementar**

Crie uma interface protótipo e declare o método clonar nela. Ou apenas adicione o método para todas as classes de uma hierarquia de classes existente, se você tiver uma.

Uma classe protótipo deve definir o construtor alternativo que aceita um objeto daquela classe como um argumento. O construtor deve copiar os valores de todos os campos definidos na classe do objeto passado para a nova instância recém criada. Se você está mudando uma subclasse, você deve chamar o construtor da classe pai para permitir que a superclasse lide com a clonagem de seus campos privados.

Se a sua linguagem de programação não suporta sobrecarregamento de métodos, você pode definir um método especial para copiar os dados do objeto. O construtor é um local mais conveniente para se fazer isso porque ele entrega o objeto resultante logo depois que você chamar o operador new.

O método de clonagem geralmente consiste em apenas uma linha: executando um operador new com a versão protótipo do construtor. Observe que toda classe deve explicitamente sobrescrever o método de clonagem and usar sua própria classe junto com o operador new. Do contrário, o método de clonagem pode produzir um objeto da classe superior.

Opcionalmente, crie um registro protótipo centralizado para armazenar um catálogo de protótipos usados com frequência.

**Implementaçao em java**

INTERCA QUE TEM O CLONE

````java
package refactoring_guru.prototype.example.shapes;

import java.util.Objects;

public abstract class Shape {

    public int x;
    public int y;
    public String color;

    public Shape() {
    }

    public Shape(Shape target) {
        if (target != null) {
            this.x = target.x;
            this.y = target.y;
            this.color = target.color;
        }
    }

    public abstract Shape clone();

    @Override
    public boolean equals(Object object2) {
        if (!(object2 instanceof Shape)) return false;
        Shape shape2 = (Shape) object2;
        return shape2.x == x && shape2.y == y && Objects.equals(shape2.color, color);
    }
}
````

Classe que o implementa e pode usar o clone

````java
package refactoring_guru.prototype.example.shapes;

public class Circle extends Shape {
    public int radius;

    public Circle() {
    }

    public Circle(Circle target) {
        super(target);
        if (target != null) {
            this.radius = target.radius;
        }
    }

    @Override
    public Shape clone() {
        return new Circle(this);
    }

    @Override
    public boolean equals(Object object2) {
        if (!(object2 instanceof Circle) || !super.equals(object2)) return false;
        Circle shape2 = (Circle) object2;
        return shape2.radius == radius;
    }
}
````

Prodemineto de utilizadno o clone 

````java
// é apenas um trecho
public static void main(String[] args) {
        List<Shape> shapes = new ArrayList<>();
        List<Shape> shapesCopy = new ArrayList<>();

        Circle circle = new Circle();
        circle.x = 10;
        circle.y = 20;
        circle.radius = 15;
        circle.color = "red";
        shapes.add(circle);

        Circle anotherCircle = (Circle) circle.clone();
        shapes.add(anotherCircle);
````
