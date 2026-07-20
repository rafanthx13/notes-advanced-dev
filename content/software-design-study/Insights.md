
# 2026-07-19 - Strategy / State/ Polimofirsmo
+ **No Strategy, o comportamento é uma "peça" que você encaixa em um objeto. Ele não faz parte da identidade do objeto.**

# 2026-07-19 - O que eu fiz com o Exportador Excel/Pdf

- **Factory**: escolhe o processador correto para o tipo de arquivo.
- **Replace Conditional Tests with Polymorphism**: eliminou `if`/`switch` usando subclasses.
- **Builder**: encapsulou a construção do HTML do Excel.
- **Template Method**: definiu um fluxo fixo de exportação (`header → body → footer`).

O interessante é que **eles não competem entre si**. Pelo contrário, eles costumam aparecer juntos. Um sistema bem modelado raramente usa apenas um padrão; é comum uma `Factory` criar uma subclasse que implementa um `Template Method`, enquanto essa subclasse usa um `Builder` para montar a saída. É justamente essa combinação de padrões que torna o código mais organizado e extensível.
# 2026-07-19 - POEAA Desing Patterns

+ Domain Model:
	+ Por regra de negócio dentro do objeto. Em geral são regras simples que fazem parte do contexto interno do próprio objeto. (OBS: Esse é início do DDD, deixar a classe quase que agnóstica). Ver [[domain-model]]
+ Service Layer
	+ É uma acamada que serve para orquestrar objetos para **executar uma ação do usuário**. **caso de uso**
	+ Não a use para ser uma pacote genérico de algo
	+ Não deve retornar true/false se a operação deu certo ou não. Se algo interrompe seu processo lance uma Exception
	+ Deve ser curto e fácil de ser lido, veja sobre o 'refactoring to patterns' [[compose-method]]
	+ O service Layer:
		+ controla a transação;
		+ coordena chamadas ao domínio;
		+ conversa com repositórios;
		+ aciona integrações externas;
		+ define o fluxo de uma operação.
	+ **O Service deve está agregando valor e não apenas apenas repassando chamadas**.
			
+ Active Record
	+ Default do Eloquent do Laravel. Quando um objeto por si só sabe executar comandos sql. Ex: `$pedido->save();`
+ Data Mapper
	+ Default do Spring. Classe que traduz objeto em SQL e vice-versa. Usado pelo Hibernate de baixo dos panos nos Repositories
+ Repository
	+ Objeto que serve de interface para acessar o banco. Deve parecer como uma collection do Java. Seus métodos representam perguntas/ações que o negócio precisa fazer/executar.
	+ O Repository existe para **dar ao domínio a impressão de que os objetos vivem em uma coleção**, como se estivessem em memória.
+ Front Controller
	+ É o `index.php` do laravel. Todo front acessar num único ponto. Ao centralizar, facilitar autenticação, configuração, tratamento de Exception,  enfim, sem isso fica difícil aplicar algo global no sistema
+ DTO
	+ **DTO é um objeto simples usado para transportar dados entre camadas, criando um contrato explícito de comunicação sem carregar regras de negócio.**
	+ Vantagens: IDE ajuda em autocomplete e tipagem; código mais explícito; Objetos limpos
	+ No laravel use: `Spatie\LaravelData\Data` para fazer DTO
	+ Vale apena usar entre fronteiras de dados, exemplos: do JSON (Front) para o Service; Em importações/exportações, em mudanças de ambiente/contexto bem grandes
	+ Ele não substitui o `FormReequest` do Laravel
	
# 2026-07-19 - Specification

+ Se há uma regra de negócio que pode ser complexas (tipo uns 3 ifs), quase que parametrizável, então, crie um classe separada. Veja Design Pattersn [[specification]]
+ Permite: Reutilizar, centralizar e facilitar o gerenciamento dessa regra
# 2026-07-19 - Exception 

+ 1 - Não coloque try/catch em todo Controller, nem genérico e nem personalizado.
	+ A Exception deve subir pra algo global lidar com ela
+ 2 - Não use 'return false' principalmente para que o Controller tenha que lidar e mandar uma mensagem de erro, isso não é legal. 
	+ O Fluxo do controller é feito para case de sucesso
	+ O Service deve lançar Exception se algo interrompe o seu useCase e não deve retornar false. O Service não sabe como o usuário verá a mensagem. O service somente faz a ação, ele não faz e informa se deu sucesso ou não
+ 3 - A mensagem de erro que o usuário ver fica no handle de Exception, vc não faz `throw bussinesRule('msg 111)` no meio do service
+ 4 - Se você não vai recuperar o erro, deixe subir.
+ 5 - A Exception **INTEROMPE IMEDIATAMENTE O FLUXO DO CASO DE USO**. É pra isso que ela serve. Quando chega em algo que vai impossibilitar de fazer o que tem que ser feito.
+ 5 - Criar vários Exception de negócio para situações esperadas que interrompem o processo, seja regra de negócio ou regra de domínio
+ 6- Regra de Bolso
	+ **Dado inválido?** → Validator/Request.
	- **Regra do negócio violada?** → Exception específica.
		- Pode ser Domain Modle, ou seja, Exceptions dentro do objeto e não necessariamente no Serivce lyser, ver [[domain-model]]
	- **Erro inesperado?** → Exception genérica + log.
	- **Controller?** → Não trata regra, apenas coordena.
	- **Service?** → Executa caso de uso e lança exceções.
	- **Handler global?** → Decide como responder ao usuário.
- 7 - **Nem todo "não encontrado" é um erro de Exception**. A resposta depende do significado daquele caso no contexto do sistema.
	- Se a ausência do dado impede a operação normal, use Exception. Se a ausência é uma possibilidade esperada do fluxo, retorne vazio/null/Optional.
	- Como detectar então:
		- **Consulta simples:** retornar vazio geralmente é melhor.
			- Ex: se vc busca usuário e não achar, retorne vazio (sem Exception)
		- **Operação que depende daquele objeto existir:** lançar Exception de negócio.
			- Ex: Se ao editar nome do usuário não o encontra, emite Exception
		- **Erro de comunicação com API:** Exception técnica.
		- **Não deixe o Repository decidir isso**, porque ele não conhece o contexto do uso.


- O nome 'Service' é extremamente atrelado à UseCase, a funcionalidades que o usuário tem. Eu costumo usar Service como um pacote de métodos de uma entidade. Isso está errado. Deveria está no próprio objeto (Domain Model) ou criar algo separado que não é um service. Pode ser um 'Processor/handler/Layout/Engine': algo mais genérico que não seja Service
# 2026-07-15 - Design Pattern: Strategy, Factory, Template Method, Builder + Fluent API

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


