# Chapter 3. Patterns

## What Is a Pattern?

Definiçâo de Christopher Alexander,

"""

> Cada padrão é uma regra de três partes, que expressa uma relação entre um determinado contexto, um problema e uma solução.

Como um elemento no mundo, cada padrão é uma relação entre um determinado contexto, um determinado sistema de forças que ocorre repetidamente nesse contexto e uma certa configuração espacial que permite que essas forças se resolvam.

Como um elemento da linguagem, um padrão é uma instrução que mostra como essa configuração espacial pode ser usada repetidamente para resolver o sistema de forças dado, onde quer que o contexto o torne relevante.

O padrão é, em resumo, ao mesmo tempo uma coisa que acontece no mundo e a regra que nos diz como criar essa coisa e quando devemos criá-la. É tanto um processo quanto uma coisa; tanto uma descrição de uma coisa que está viva quanto uma descrição do processo que irá gerar essa coisa. [Alexander, TWB, 247]

"""

Our industry's view of patterns has mostly been influenced by catalogs of individual patterns, such as those found in Design Patterns [DP] and Martin Fowler's Patterns of Enterprise Application Architectures [Fowler, PEAA]. Such catalogs don't actually contain stand-alone patterns because authors typically discuss which alternative patterns to consider if a pattern doesn't provide a good fit. In recent years, we've also seen the emergence of literature that resembles Alexander's pattern languages. Such works include Extreme Programming Explained [Beck, XP], Domain-Driven Design [Evans], and Checks: A Pattern Language of Information Integrity [Cunningham].

## Patterns Happy

A ânsia e alegria em querer usar os DesignPattersn o tempo todo pode resultar em uma soluçâo super-etensivel e MUITO TRABHLO quando nâo se precisa.

O exemplo a seguir é de um HelloWorld A programmer named Jason Tiscioni, writing on SlashDot (see http://developers.slashdot.org/comments.pl? sid=33602&cid=3636102), perfectly caricatured patterns-happy code with the following version of Hello World. 

````java
interface MessageStrategy {
	public void sendMessage();
}

abstract class AbstractStrategyFactory {
	public abstract MessageStrategycreateStrategy(MessageBody mb);
}

class MessageBody {

	Object payload;

	public Object getPayload() {
		return payload;
	}

	public void configure(Object obj) {
		payload = obj;
	}
	public void send(MessageStrategy ms) {
		ms.sendMessage();
	}
}

class DefaultFactory extends AbstractStrategyFactory {

	private DefaultFactory() {
	}
static DefaultFactory instance;
public static AbstractStrategyFactory
getInstance() {
if (instance == null)
instance = new DefaultFactory();
return instance;
}
public MessageStrategy createStrategy(final
MessageBody mb) {
return new MessageStrategy() {
MessageBody body = mb;
public void sendMessage() {
Object obj = body.getPayload();
System.out.println(obj);
}
};}
}
public class HelloWorld {
public static void main(String[] args) {
MessageBody mb = new MessageBody();
mb.configure("Hello World!");
AbstractStrategyFactory asf =
DefaultFactory.getInstance();
MessageStrategy strategy =
asf.createStrategy(mb);
mb.send(strategy);
}
}
````

 Talvez seja impossível evitar a felicidade dos padrões no caminho para aprender padrões. Na verdade, a maioria de nós aprende cometendo erros. Já fui padrão feliz em mais de uma ocasião. A verdadeira alegria dos padrões vem de usá-los com sabedoria. A refatoração nos ajuda a fazer isso concentrando nossa atenção na remoção. 

de duplicações, simplificando o código e fazendo com que o código comunique sua intenção. Quando os padrões evoluem para um sistema por meio de refatoração, há menos chance de superengenharia com padrões. Quanto melhor você conseguir refatorar, mais chances terá de encontrar a alegria dos padrões.

## There Are Many Ways to Implement a Pattern

JUMP : vamos ver formass e estruturas UML difeernte do GOF sobre os padroes neste livro

## Refactoring to, towards, and away from Patterns

JUMP: Mostra uma tabela dos proceçoes de refatoraçao

## Do Patterns Make Code More Complex?

Chat GPT: 

O trecho descreve uma situação em que Bobby, um programador experiente em padrões de projeto, fez uma refatoração em um código. John, um programador menos experiente e pouco familiarizado com padrões, achou que a refatoração tornou o código mais complexo. O autor, que estava trabalhando com John, percebeu que a falta de conhecimento de John sobre o padrão Composite era a causa de sua insatisfação. O autor ofereceu-se para ensinar a John o padrão Composite, e depois de aprender sobre ele, John reconheceu que o código não era tão complexo quanto ele pensava, embora não tenha considerado melhor do que o código anterior. O autor, por sua vez, considerou a refatoração de Bobby uma melhoria significativa, removendo código duplicado, simplificando a lógica e tornando a descoberta de regras de validação mais simples. O trecho enfatiza a importância da familiaridade com padrões de projeto na percepção das refatorações baseadas em padrões e destaca a necessidade de equipes aprenderem padrões para aproveitá-los adequadamente.

## Pattern Knowledge

O trecho destaca a importância do conhecimento de padrões de projeto na evolução de bons designs de software. Os padrões capturam sabedoria e reutilizar essa sabedoria é extremamente útil. Assim como Mozart combinava formas de música existentes para produzir resultados impressionantes, os padrões são como novas formas de música que podem ser usadas e combinadas para criar excelentes designs de software. O conhecimento do padrão Builder foi crucial na evolução de um sistema e sem ele, o design teria sido comprometido. O framework de testes JUnit é rico em padrões, e seus autores evoluíram o framework reutilizando a sabedoria dos padrões. Estudar padrões é fundamental para ter acesso a ideias de design importantes e belas. A formação de grupos de estudo para estudar um padrão por semana é uma abordagem recomendada. Os membros desses grupos têm paixão por se tornarem melhores designers de software, e as reuniões semanais para discutir ideias de design são uma excelente forma de alcançar esse objetivo. Por fim, o autor destaca que, diante da quantidade de livros de padrões disponíveis, é importante seguir o conselho de Jerry Weinberg e ler apenas os melhores livros.

## Up-Front Design with Patterns

Chat GPT: 

Em 1996, uma empresa de música e televisão procurou criar uma versão em Java do seu site. Eles não tinham a expertise necessária para construir o site e começaram a buscar um parceiro de desenvolvimento. A Industrial Logic foi contatada e conduziu uma reunião para discutir o design da interface do usuário e os requisitos do site. Eles decidiram utilizar padrões de design, em particular o padrão Command e o padrão Interpreter, para controlar o comportamento do site.

Após várias semanas de considerações e discussões, eles criaram um design detalhado do site e apresentaram para a empresa de música e televisão. Depois de algumas reuniões adicionais, eles ganharam o contrato para desenvolver o site.

Durante os meses seguintes, eles programaram o site seguindo o design estabelecido. Durante o processo, eles identificaram oportunidades de melhoria e aplicaram os padrões Composite, Iterator e Null Object por meio de refatoração.

Embora o design antecipado (BDUF) seja frequentemente problemático, neste caso específico ele foi essencial para o sucesso do projeto, pois permitiu que a empresa ganhasse o contrato. O design inicial com os padrões Command e Interpreter foi crucial. No entanto, o projeto enfrentou atrasos de um mês devido a problemas com navegadores de internet e a necessidade de fazer modificações para lidar com defeitos específicos dos navegadores.

Após essa experiência, o autor passou a adotar uma abordagem de evolução do sistema e refatoração de padrões em projetos futuros, com exceção do padrão Command, que continuou sendo usado no início do design. O autor reconhece que o design antecipado com padrões tem seu lugar, mas deve ser utilizado com moderação. 



