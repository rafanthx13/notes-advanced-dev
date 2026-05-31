# M.Folwer Refactoring - 03 - Bad Smell no Código

Bad Smell: Situaçôes onde claramente se sabe que tem que altera/melhorar o código.

## Intro

Decidir quando começar a refatorar – e quando parar – é tão importante para a refatoração quanto saber como lidar com o seu modo de funcionamento.

É fácil explicar como remover uma variável de instância ou criar uma hierarquia. São questões simples. Tentar explicar quando você deve fazer isso não é tão simples assim.

Ao fazer isso, aprendemos a procurar determinadas estruturas no código que sugerem – às vezes, clamam – a possibilidade de refatoração.

Uma informação que não tentaremos dar a você são os critérios exatos paradecidir quando uma refatoração já deveria ter sido feita. De acordo com nossa experiência, nenhum conjunto de métricas é páreo para a intuição humana bem fundamentada. **O que faremos é apresentar indícios a você de que há um problema que pode ser resolvido com uma refatoração**. Você terá de desenvolver o próprio senso para saber quantas variáveis de instância ou quantas linhas de código em um método são demais.

## Casos de Bad Smell (gerados pelo ChatGPT)

### 1. MYSTERIOUS NAME:

Description: Using ambiguous or unclear names for variables, functions, or classes can make the code difficult to understand and maintain.

Code Example:
```javascript
// Bad Example
const x = 10; // What does 'x' represent?

// Good Example
const numberOfItems = 10;
```
**Como corrigir**:
   - Use nomes descritivos e claros para variáveis, funções e classes.
   - Evite abreviações ou siglas que possam ser confusas.
   - Use convenções de nomenclatura consistentes.

### 2. DUPLICATED CODE:

Description: Having identical or very similar code in multiple places can lead to code duplication, making it harder to maintain and introduce inconsistencies.

Code Example:
```javascript
// Bad Example
function calculateSquareArea(sideLength) {
  return sideLength * sideLength;
}

function calculateRectangleArea(width, height) {
  return width * height;
}

// Good Example
function calculateArea(length, width) {
  return length * width;
}
```


**Como corrigir**:
   - Extraia o código duplicado para funções ou métodos reutilizáveis.
   - Utilize herança, composição ou padrões de projeto para compartilhar código comum.
   - Utilize bibliotecas ou frameworks que ofereçam funcionalidades reutilizáveis.


### 3. LONG FUNCTION:

Description: Functions that are excessively long and contain a lot of logic can be difficult to understand, test, and maintain.

Code Example:

```javascript
// Bad Example
function processOrder(order) {
  // Long and complex logic here...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
  // ...
}

// Good Example
function processOrder(order) {
  validateOrder(order);
  calculateTotal(order);
  applyDiscounts(order);
  saveOrder(order);
}
```


**Como corrigir**:
   - Divida a função em funções menores e mais específicas.
   - Separe a lógica em partes coesas e independentes.
   - Identifique padrões ou repetições que possam ser abstraídos para funções separadas.

### 4. LONG PARAMETER LIST:

Description: Functions with a large number of parameters can be hard to use and understand. It can indicate a need to refactor the code into smaller, more focused functions.

Code Example:

```javascript
// Bad Example
function createUser(name, age, address, email, phone, country, isAdmin, isActive) {
  // ...
}

// Good Example
function createUser(userDetails) {
  // ...
}
```


**Como corrigir**:
   - Reduza o número de parâmetros passados para uma função.
   - Agrupe parâmetros relacionados em objetos ou estruturas de dados.
   - Utilize técnicas de currying ou builders para reduzir a complexidade dos parâmetros.

### 5. GLOBAL DATA:

Description: Using global variables or shared state throughout the codebase can lead to tight coupling and make it harder to understand and reason about the code.

Code Example:
```javascript
// Bad Example
let currentUser = null;

function setCurrentUser(user) {
  currentUser = user;
}

function doSomething() {
  if (currentUser) {
    // ...
  }
}

// Good Example
function doSomething(user) {
  // ...
}
```

(Note: The example demonstrates avoiding unnecessary global state.)


**Como corrigir**:
   - Limite o uso de variáveis globais, dando preferência a variáveis locais.
   - Utilize técnicas de encapsulamento para proteger os dados e controlar o acesso a eles.
   - Considere utilizar padrões de projeto como Injeção de Dependência para passar dados de forma controlada.


### 6. MUTABLE DATA:

Description: Mutating data directly, especially shared data, can introduce bugs and make it harder to track and understand the changes.

Code Example:

```javascript
// Bad Example
let counter = 0;

function incrementCounter() {
  counter++;
}

// Good Example
function incrementCounter(counter) {
  return counter + 1;
}
```

**Como corrigir**:
   - Dê preferência ao uso de dados imutáveis sempre que possível.
   - Evite alterar o estado de objetos compartilhados.
   - Utilize técnicas de programação funcional para evitar efeitos colaterais indesejados.

### 7. DIVERGENT CHANGE:

Description: Divergent change occurs when a change in one part of the code requires multiple unrelated changes in other parts, indicating a lack of cohesion.

Code Example:

```javascript
// Bad Example
function calculateTotal(items) {
  // ...
}

function displayTotal(total) {
  // ...
}

function updateTotalDisplay(items) {
  const total = calculateTotal(items);
  displayTotal(total);
}

// Good Example
function calculateTotal(items) {
  // ...
}

function displayTotal(total) {
  // ...
}

function updateTotalDisplay(items) {
  const total = calculateTotal(items);
  displayTotal(total);
}

function updateCart(items) {
  // ...
}
```

(Note: In the bad example, a change in the calculation logic or display would require modifications in multiple functions.)

**Como Corrigir:**

   - Identifique partes do código que estão mudando com frequência e agrupe-as.

   - Separe responsabilidades claras entre diferentes componentes do sistema.

   - Utilize princípios de design como o Princípio da Responsabilidade Única (SRP) para evitar mudanças excessivas.

### 8. SHOTGUN SURGERY:

Description: Shotgun surgery refers to the situation where a single change requires modifying multiple unrelated parts of the codebase.

Code Example:

```javascript
// Bad Example
function update

CustomerInfo(customer) {
  // Code to update customer's name
  // Code to update customer's address
  // Code to update customer's contact information
  // ...
}

// Good Example
function updateCustomerName(customer, newName) {
  // ...
}

function updateCustomerAddress(customer, newAddress) {
  // ...
}

function updateCustomerContact(customer, newContact) {
  // ...
}
```

**Como corrigir**:

   - Identifique trechos de código que estão espalhados por várias partes do sistema.

   - Centralize as alterações relacionadas em um único local.

   - Utilize técnicas de refatoração para consolidar o código em um local específico.


### 9. FEATURE ENVY:

Description: Feature envy occurs when a method or function excessively relies on the data or behavior of another class, indicating a potential design issue.

Code Example:

```javascript
// Bad Example
class Order {
  constructor(customer) {
    this.customer = customer;
  }

  calculateTotal() {
    return this.customer.calculateTotal();
  }
}

// Good Example
class Order {
  constructor(customer) {
    this.customer = customer;
  }

  calculateTotal() {
    // ...
  }
}
```

**Como corrigir**:

   - Identifique classes ou objetos que estão acessando excessivamente os dados ou métodos de outras classes.

   - Movimente o comportamento para as classes que realmente possuem os dados relevantes.

   - Utilize padrões de projeto como Visitor ou Decorator para separar as responsabilidades de forma mais clara.

### 10. DATA CLUMPS:

Description: Data clumps refer to the occurrence of multiple data elements being consistently grouped together, indicating the need to encapsulate them into a separate class or object.

Code Example:

```javascript
// Bad Example
function processOrder(name, address, email) {
  // ...
}

// Good Example
class Customer {
  constructor(name, address, email) {
    // ...
  }

  processOrder() {
    // ...
  }
}
```

(Note: The example demonstrates encapsulating related data into a separate class.)

**Como corrigir**:

    - Identifique grupos de parâmetros que são frequentemente usados juntos.

    - Crie objetos ou estruturas de dados que encapsulem esses grupos de parâmetros.

    - Utilize técnicas de refatoração para substituir os grupos de parâmetros por objetos compostos.


### 11. PRIMITIVE OBSESSION:

Description: Primitive obsession occurs when primitives (such as strings or numbers) are overused instead of creating custom domain-specific classes or objects, leading to less maintainable and less expressive code.

Code Example:

```javascript
// Bad Example
function calculateTotalPrice(quantity, price) {
  // ...
}

// Good Example
class Product {
  constructor(quantity, price) {
    // ...
  }

  calculateTotalPrice() {
    // ...
  }
}
```


**Como corrigir**:
    - Identifique o uso excessivo de tipos primitivos (strings, números) para representar conceitos complexos.

    - Crie classes ou objetos que representem esses conceitos complexos de forma mais adequada.

    - Utilize técnicas de encapsulamento e abstração para lidar com as funcionalidades relacionadas.

### 12. REPEATED SWITCHES:

Description: Repeated switches occur when the same switch statement or similar logic is repeated in multiple places, indicating a need for abstraction or refactoring.

Code Example:

```javascript
// Bad Example
function processPayment(paymentType) {
  switch (paymentType) {
    case 'credit':
      // ...
      break;
    case 'debit':
      // ...
      break;
    case 'paypal':
      // ...
      break;
    // ...
  }
}

// Good Example
function processCreditPayment() {
  // ...
}

function processDebitPayment() {
  // ...
}

function processPaypalPayment() {
  // ...
}
```

**Como corrigir**:

    - Identifique trechos de código com múltiplas declarações "switch" que se repetem.

    - Utilize polimorfismo para substituir as declarações "switch" por classes e métodos específicos.

    - Utilize padrões de projeto como Strategy ou State para encapsular o comportamento variável.

### 13. LOOPS:

Description: Loops that are excessively long, nested, or complex can be hard to understand, debug, and maintain. It is often beneficial to break them down into smaller functions or simplify the logic.

Code Example:

```javascript
// Bad Example
for (let i = 0; i < items.length; i++) {
  for (let j = 0; j < items[i].length; j++) {
    // ...
  }
}

// Good Example
function processItem(item) {
  // ...
}

function processItems(items) {
  for (const item of items) {
    processItem(item);
  }
}
```
**Como corrigir**:

    - Identifique trechos de código com loops complexos ou longos.

    - Utilize técnicas de refatoração para extrair partes do loop em funções ou métodos separados.

    - Considere utilizar funções de ordem superior ou bibliotecas que ofereçam abstrações de loop mais simples.

### 14. LAZY ELEMENT:

Description: Lazy element occurs when an element or variable is initialized or computed lazily only when needed, rather than upfront, to improve performance or resource utilization.

Code Example:

```javascript
// Bad Example
function getTotal(items) {
  let total = 0;

  for (const item of items) {
    total += item.price;
  }

  return total;
}

// Good Example
function getTotal(items) {
  return items

.reduce((total, item) => total + item.price, 0);
}
```

**Como corrigir**:

    - Identifique elementos ou objetos que estão sendo carregados ou instanciados desnecessariamente.

    - Adie a criação ou o carregamento desses elementos até o momento em que forem realmente necessários.

    - Utilize técnicas como lazy loading ou lazy initialization para otimizar o desempenho e a eficiência.


### 15. SPECULATIVE GENERALITY:

Description: Speculative generality refers to adding complex or generic functionality to the codebase in anticipation of future requirements that may never materialize, resulting in unnecessary complexity and maintainability issues.

Code Example:

```javascript
// Bad Example
class PaymentProcessor {
  processPayment(payment) {
    // Complex payment processing logic
    // that caters to potential future payment types
    // ...
  }
}

// Good Example
class PaymentProcessor {
  processCreditCardPayment(payment) {
    // ...
  }

  processPaypalPayment(payment) {
    // ...
  }
}
```

**Como corrigir:**

    - Evite criar abstrações complexas ou genéricas sem uma necessidade real no momento.

    - Prefira a simplicidade e clareza do código em vez de tentar prever futuras necessidades.

    - Utilize técnicas de refatoração para remover ou simplificar abstrações desnecessárias.

### 16. TEMPORARY FIELD:

Description: Temporary field occurs when a class or object temporarily stores or holds data that is not consistently used throughout its lifetime, indicating a potential design issue.

Code Example:

```javascript
// Bad Example
class Order {
  constructor(items) {
    this.items = items;
    this.total = null;
  }

  calculateTotal() {
    // Calculate the total and store it in 'this.total'
    // ...
  }
}

// Good Example
class Order {
  constructor(items) {
    this.items = items;
  }

  calculateTotal() {
    // Calculate the total and return it
    // ...
  }
}
```

**Como corrigir**:

    - Identifique campos ou propriedades de uma classe que são usados apenas temporariamente.

    - Mova esses campos temporários para dentro dos métodos ou funções onde são usados.

    - Evite poluir a classe com campos desnecessários que não têm uma função clara.


### 17. MESSAGE CHAINS:

Description: Message chains occur when a sequence of method calls is made on a single object, leading to tight coupling and reduced code readability. It is often beneficial to break down the chain or introduce intermediate objects.

Code Example:

```javascript
// Bad Example
const totalPrice = order.customer.getAddress().getCountry().calculateShippingCost();

// Good Example
const shippingCost = order.calculateShippingCost();
```

**Como corrigir:**

    - Identifique cadeias de chamadas de métodos longas e complexas em um único objeto.

    - Utilize técnicas de refatoração para reduzir a dependência de cadeias de chamadas.

    - Considere criar métodos intermediários ou utilizar padrões de projeto como Facade ou Mediator para simplificar a interação entre objetos.

### 18. MIDDLE MAN:

Description: Middle man occurs when a class or object acts as a middleman or intermediary, forwarding calls to another object without adding significant value or logic.

Code Example:
```javascript
// Bad Example
class ShoppingCart {
  constructor() {
    this.customer = new Customer();
  }

  calculateTotal() {
    return this.customer.calculateTotal();
  }
}

// Good Example
class ShoppingCart {
  constructor(customer) {
    this.customer = customer;
  }

  calculateTotal() {
    return this.customer.calculateTotal();
  }
}
```

**Como corrigir**:

    - Identifique classes que apenas delegam chamadas de métodos para outros objetos, sem adicionar funcionalidade relevante.

    - Elimine essas classes intermediárias e chame diretamente os objetos relevantes.

    - Utilize padrões de projeto como Proxy ou Adapter somente quando houver uma necessidade real de intermediação.

### 19. INSIDER TRADING:

Description: Insider trading occurs when classes or objects access or modify internal details or data of other classes or objects directly, instead of using proper encapsulation and abstraction.

Code Example:

```javascript
// Bad Example
class Customer {
  constructor() {
    this.shoppingCart = new ShoppingCart();
  }

  calculateTotal() {
    return this.shoppingCart.total;
  }
}

// Good Example
class Customer {
  constructor() {
    this.shoppingCart = new ShoppingCart();
  }

  calculateTotal() {
    return this.shoppingCart.calculateTotal();
  }
}
```

**Como corrigir**:
    - Identifique classes que acessam diretamente dados ou comportamentos de outras classes sem respeitar a encapsulação.

    - Refatore o código para que o acesso aos dados seja feito através de métodos apropriados.

    - Mantenha a coesão e o encapsulamento das classes, evitando o acesso direto a dados internos.

### 20. LARGE CLASS:

Description: Large class occurs when a class becomes too large, containing excessive responsibilities and functionality. It is often beneficial to refactor into smaller, more focused classes.

Code Example:

```javascript
// Bad Example
class Order {
  // ...
  // Lots of code and functionality here
  // ...
}

// Good Example
class Order {
  constructor(customer, items) {
    this.customer = customer;
    this.items = items;
  }

  calculateTotal() {
    // ...
  }

  processPayment() {
    // ...
  }

  // ...
}
```


**Como corrigir**:

    - Identifique classes que possuem muitos campos, métodos e responsabilidades.

    - Separe a funcionalidade em classes menores e mais especializadas.

    - Utilize padrões de projeto como Composite, Decorator ou Strategy para organizar as responsabilidades de forma mais modular.

### 21. ALTERNATIVE CLASSES WITH DIFFERENT INTERFACES:

Description: Alternative classes with different interfaces occur when multiple classes provide similar functionality but have different method names or interfaces, leading to confusion and inconsistency.

Code Example:

```javascript
//

 Bad Example
class EmailSender {
  send(to, subject, message) {
    // ...
  }
}

class MessageSender {
  sendMessage(recipient, title, content) {
    // ...
  }
}

// Good Example
class EmailSender {
  sendEmail(to, subject, message) {
    // ...
  }
}

class MessageSender {
  sendMessage(to, subject, message) {
    // ...
  }
}
```


**Como corrigir**:

    - Identifique classes que possuem interfaces diferentes, mas que desempenham funções semelhantes.

    - Refatore o código para que essas classes compartilhem uma interface comum ou herdem de uma mesma classe base.

    - Utilize polimorfismo e abstração para simplificar a interação com essas classes.


### 22. DATA CLASS:

Description: Data class occurs when a class primarily holds data without containing significant behavior or methods. It is often beneficial to refactor data classes into plain data structures or objects.

Code Example:

```javascript
// Bad Example
class Customer {
  constructor(name, email, address) {
    this.name = name;
    this.email = email;
    this.address = address;
  }

  getName() {
    return this.name;
  }

  // ...
}

// Good Example
class Customer {
  constructor(name, email, address) {
    this.name = name;
    this.email = email;
    this.address = address;
  }
}
```

**Como corrigir**:
    - Identifique classes que possuem apenas campos de dados, sem comportamento relevante.

    - Transforme essas classes em estruturas de dados ou utilize tipos primitivos, caso não seja necessário manter um estado interno complexo.

    - Evite a criação de classes desnecessárias que não adicionam funcionalidade significativa.

### 23. REFUSED BEQUEST:

Description: Refused bequest occurs when a subclass inherits from a superclass but only uses a small portion of its inherited methods or properties. It indicates a potential design issue and may require refactoring.

Code Example:

```javascript
// Bad Example
class Animal {
  move() {
    // ...
  }

  eat() {
    // ...
  }
}

class Dog extends Animal {
  move() {
    // Dog-specific move logic
    // ...
  }
}

// Good Example
class Dog {
  move() {
    // Dog-specific move logic
    // ...
  }
}
```


**Como corrigir**:
    - Identifique classes que herdam de uma superclasse, mas não utilizam ou sobrescrevem seus métodos.

    - Refatore o código para eliminar a herança desnecessária ou reestruture a hierarquia de classes.

    - Utilize composição ou interfaces para fornecer a funcionalidade necessária sem a necessidade de herança.

### 24. COMMENT:

Description: Comments can be useful for explaining complex logic or providing additional context, but excessive or outdated comments can clutter the codebase and make it harder to read and maintain.

Code Example:

```javascript
// Bad Example
function calculateTotal(items) {
  let total = 0;

  for (const item of items) {
    total += item.price; // Calculate the total
  }

  return total; // Return the total
}

// Good Example
function calculateTotal(items) {
  let total = 0;

  for (const item of items) {
    total += item.price;
  }

  return total;
}
```

(Note: In the good example, the comments that state the obvious are removed.)

**Como Corrigir:**

    - Evite comentários excessivos explicando código óbvio ou redundante.

    - Escreva código autoexplicativo e utilize nomes descritivos para funções, variáveis e classes.

    - Remova comentários obsoletos ou desnecessários, mantendo apenas comentários úteis que forneçam informações relevantes.

**OBS**:

+ **Quando sentir necessidade de escrever um comentário, experimente refatorar o código antes, de modo que qualquer comentário se torne supérfluo.**



