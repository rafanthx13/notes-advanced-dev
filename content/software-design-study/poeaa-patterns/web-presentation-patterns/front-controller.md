**Resumo**: É o ``index.php`` do laravel. Toda requisição tem um ponto central, dessa forma, coisas como autenticação, sessão podem ficar centralizada em um lugar. É só pensar que no php puro você tem que repetir ``session_start`` em todo o arquivo.

## Notas de Estudo

- **O que é:** 
- **Como funciona:** 
- **Quando usar:** 
- **Exemplos/Anotações:** 

---
---
---

# GPT - Me fale sobre o Fonrt **Controller**

Ótimo. O **Front Controller** é um padrão muito importante porque ele está diretamente relacionado ao funcionamento de praticamente todos os frameworks web modernos (Laravel, Symfony, Spring MVC, ASP.NET, etc.).

Ele aparece no capítulo de **Web Presentation Patterns** do _Patterns of Enterprise Application Architecture_.

A ideia é simples:

> **Em vez de cada página ou endpoint ter seu próprio ponto de entrada, toda requisição passa por um único controlador central.**

---

# O problema que o Front Controller resolve

Imagine uma aplicação antiga sem Front Controller.

Você poderia ter:

```
/usuarios/listar.php
/usuarios/criar.php
/pedidos/detalhe.php
/relatorios/exportar.php
```

Cada arquivo é um ponto de entrada.

Então cada um precisa repetir coisas como:

```php
session_start();

verificar_usuario_logado();

validar_permissao();

configurar_banco();

carregar_classes();

tratar_erros();
```

O problema:

- código duplicado;
    
- autenticação espalhada;
    
- tratamento de erro espalhado;
    
- configuração repetida;
    
- difícil aplicar regras globais.
    

---

# A ideia do Front Controller

Criar **um único ponto de entrada**.

Exemplo:

```
public/index.php
```

Todas as requisições passam por ele.

```
Usuário

   ↓

index.php

   ↓

Router

   ↓

Controller específico

   ↓

Service

   ↓

Domínio

   ↓

Banco
```

---

# Exemplo simples

Sem Front Controller:

```
usuario.php
pedido.php
produto.php
```

Cada um controla sua própria entrada.

---

Com Front Controller:

```
index.php
```

recebe:

```
GET /usuarios/10
```

Ele decide:

```
Controller:
UsuarioController

Método:
show()
```

---

# Exemplo simplificado

`index.php`

```php
$request = $_SERVER['REQUEST_URI'];

$router->dispatch($request);
```

Router:

```php
if ($request == '/usuarios') {

    $controller = new UsuarioController();

    $controller->index();

}
```

---

# Mas ele não é o Controller?

Essa é uma confusão comum.

Não.

São coisas diferentes.

## Front Controller

É o **ponto único de entrada da aplicação**.

Exemplo:

```
public/index.php
```

Ele recebe tudo.

---

## Controller

É quem executa uma ação específica.

Exemplo:

```
UsuarioController
PedidoController
ProdutoController
```

---

Fluxo:

```
Front Controller

        ↓

Router

        ↓

Controller
```

---

# No Laravel

Você usa Front Controller todos os dias.

O arquivo:

```
public/index.php
```

é o Front Controller.

Todas as requisições chegam nele.

Depois:

```
public/index.php

↓

Kernel Laravel

↓

Middleware

↓

Router

↓

Controller
```

---

# O que normalmente fica no Front Controller?

Coisas globais:

- inicializar aplicação;
    
- carregar dependências;
    
- configurar ambiente;
    
- iniciar framework;
    
- aplicar middleware.
    

Exemplo:

```text
Front Controller

- iniciar Laravel
- carregar Composer
- criar container
- iniciar request
```

---

# O que NÃO fica nele?

Não deve ter:

```php
if ($usuarioExiste) {
   ...
}
```

ou:

```php
criarPedido();
```

Ele não conhece negócio.

---

# Relacionando com o que conversamos antes

Olha como ele encaixa:

```
                 Front Controller
                       |
                       ↓
                  Middleware
                       |
          +------------+------------+
          |                         |
     Autenticação              Autorização
          |
          ↓
       Controller
          |
          ↓
       Service
          |
          ↓
    Domain Model
          |
          ↓
      Repository
          |
          ↓
       Banco
```

---

# Por que ele é útil?

## 1. Autenticação centralizada

Sem Front Controller:

```
UsuarioController
    verifica login

PedidoController
    verifica login

RelatorioController
    verifica login
```

Com:

```
Front Controller

↓

Middleware Auth
```

Uma vez só.

---

## 2. Tratamento global de erros

Isso conecta com nossa conversa anterior.

Com Front Controller:

```
Exception

↓

Handler global

↓

Resposta HTTP
```

Você não precisa colocar try/catch em cada lugar.

---

## 3. Logs e auditoria

Você pode registrar:

- tempo da requisição;
    
- usuário;
    
- IP;
    
- endpoint;
    
- erros.
    

Tudo em um lugar.

---

## 4. Controle de versão da API

Exemplo:

```
/api/v1/clientes

/api/v2/clientes
```

Passam pelo mesmo ponto de entrada.

---

# Front Controller vs Dispatcher

Eles também são confundidos.

O Front Controller recebe.

O Dispatcher encaminha.

Exemplo:

```
Request

 ↓

Front Controller

 ↓

Dispatcher

 ↓

UsuarioController@store
```

---

# Comparando com uma empresa

Imagine uma empresa grande.

Sem Front Controller:

```
Cliente liga diretamente para qualquer funcionário.
```

Cada funcionário precisa:

- se identificar;
    
- verificar contrato;
    
- saber regras.
    

---

Com Front Controller:

```
Cliente

↓

Recepção central

↓

Departamento correto
```

A recepção faz:

- identificação;
    
- registro;
    
- encaminhamento.
    

Mas não resolve o problema do cliente.

---

# A frase que resume

> **Front Controller centraliza o processamento inicial de todas as requisições em um único ponto, permitindo aplicar regras comuns como autenticação, autorização, logging e tratamento de erros antes de encaminhar para o Controller responsável.**

---

E uma observação interessante para conectar com sua experiência: quando você trabalha com Laravel, você já está usando uma arquitetura que combina vários padrões do PoEAA automaticamente:

```
Front Controller
        +
Middleware
        +
MVC
        +
Service Layer
        +
Repository (quando aplicado)
        +
Active Record (Eloquent)
```

O estudo desses padrões é justamente para entender **o que o framework está fazendo por você** e quando você deve sair do caminho "padrão" dele.
