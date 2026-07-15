
## 2026-07-15

+ https://chatgpt.com/share/6a570d43-7a10-83e9-b967-1acaaeb76b79
+ Como aplicar design pattern:
	+ > primeiro você identifica um problema recorrente na arquitetura, depois vê se algum padrão conhecido resolve aquele problema de forma elegante.
+ Martin Fowler comenta em _Refactoring_: 
	+ > **duplicação é um dos principais "cheiros" de código (code smells)**
+ Vantagens de boa arquitetura (design patterns + SOLID + componente segmentados e bem projetados)
	+ Diminuir o custo das mudanças futuras.
	+ Se tudo estiver centralizado, a mudança acontece em um único método.
	+ Quando cada responsabilidade tem um lugar bem definido, você passa menos tempo "caçando" código. Você consegue responder as perguntas tipo as a seguir de forma mais rápido
		+ Onde esse dado é validado?
		- Onde esse log é gravado?
		- Onde essa consulta SQL é montada?
- Tempalte Method vs Strategy
	- No Strategy você troca o algoritmo. No Template você troca alguns passos.
	- Como identificar Template Method. 3 Sinais
		-  1- Sempre existe a mesma sequência
		- 2 - Só muda um pedaço (da sequncia que nao muda)
	- Uma dica prática: **O que realmente varia aqui?**
- A melhor arquitetura não é necessariamente a que tem menos linhas. Ela precisa ser **fácil de entender pela equipe**.