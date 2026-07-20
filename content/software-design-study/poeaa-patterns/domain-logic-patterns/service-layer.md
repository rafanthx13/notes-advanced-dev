**Resumo:** Orquestra ações em um único caso de uso chamando vários objetos. A classe 'Service' deve ter as operações (verbo) que o usuário pode chamar. Nao a use para ser um pacote de métodos . Ela lembra Facade (simplificar) e Mediator (evitar acomplaemento entre objetos), mas tem filosofia e proposito diferente

![[Pasted image 20260719193656.png]]
## Notas de Estudo

- **O que é:** 
	- O Service Layer define as operações que a aplicação oferece (casos de uso) e coordena a interação entre objetos do domínio, repositórios e serviços externos, sem concentrar as regras de negócio das entidades.
- **Como funciona:** 
	- O que normalmente fica dentro da service Layer
		- ✔ Abrir transação
		- ✔ Buscar objetos
		- ✔ Chamar métodos do domínio
		- ✔ Salvar
		- ✔ Chamar APIs
		- ✔ Enviar eventos
		- ✔ Enviar e-mails
		- ✔ Coordenar vários objetos


# Relaçao com Facde

Facade:
+ Esconder a complexidade de um subsistema.
Service Layer:
+ "Esta aplicação oferece os seguintes casos de uso.

A difenreça entre eles é filosófica. Pois na pratica fica parecido


Facde Pergunta:

> Como esconder a complexidade de um conjunto de classes?

Service Layer Pergunta:

> Quais operações minha aplicação oferece?


**Um detalhe interessante:** Martin Fowler comenta que, em muitas aplicações, o Service Layer **é implementado como um conjunto de Facades**.

**Resumindo**

|Facade|Service Layer|
|---|---|
|Padrão GoF|Padrão PoEAA|
|Esconde a complexidade de um subsistema|Expõe os casos de uso da aplicação|
|Simplifica chamadas|Orquestra uma operação de negócio|
|Pode não ter regra nenhuma|Coordena o fluxo da aplicação|
|Pode ser usado em qualquer lugar|Normalmente fica entre Controller e Domínio|
Então eu diria que **todo Service Layer se comporta como uma fachada para quem o chama**, mas **nem toda Facade é um Service Layer**. O Service Layer tem um papel arquitetural maior: representar as operações da aplicação e coordenar a execução delas.

# Mediator e Servce Layer

**Facade**

"Vou facilitar o acesso."

**Mediator**

"Vou organizar a comunicação."

**Service Layer**

"Vou coordenar um caso de uso."

Se eu resumisse em uma frase:
- **Facade** → simplifica um subsistema.
- **Mediator** → organiza a comunicação entre objetos que, de outra forma, ficariam fortemente acoplados entre si.
- **Service Layer** → representa um caso de uso da aplicação e coordena sua execução.