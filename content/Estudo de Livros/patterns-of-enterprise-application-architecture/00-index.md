# Index do livro: Patterns of Enterprise Application Architecture (PoEAA) Martin Folwer

Chapter 1: Layering  - 17
Chapter 2: Organizing Domain Logic - 25
Chapter 3: Mapping to Relational Databases - 33
Chapter 4: Web Presentation -- 55
Chapter 5: Concurrency - 63
Chapter 6: Session State - 81
Chapter 7: Distribution Strategies - 87
Chapter 8: Putting It All Together - 95
Chapter 9: Domain Logic Patterns - 19
Chapter 10: Data Source Architectural Patterns - 143
Chapter 11: Object-Relational Behavioral Patterns - 183
Chapter 12: Object-Relational Structural Patterns - 215
Chapter 13: Object-Relational Metadata Mapping Patterns - 305
Chapter 14: Web Presentation Patterns - 329
Chapter 15: Distribution Patterns - 387
Chapter 16: Offline Concurrency Patterns - 415
Chapter 17: Session State Patterns - 455
Chapter 18: Base Patterns - 465
Rerefences 511

| Capítulo                                                | Página inicial | Páginas | % do livro (510 pág.) |
| ------------------------------------------------------- | -------------: | ------: | --------------------: |
| Chapter 1: Layering                                     |             17 |   **8** |             **1,57%** |
| Chapter 2: Organizing Domain Logic                      |             25 |   **8** |             **1,57%** |
| Chapter 3: Mapping to Relational Databases              |             33 |  **22** |             **4,31%** |
| Chapter 4: Web Presentation                             |             55 |   **8** |             **1,57%** |
| Chapter 5: Concurrency                                  |             63 |  **18** |             **3,53%** |
| Chapter 6: Session State                                |             81 |   **6** |             **1,18%** |
| Chapter 7: Distribution Strategies                      |             87 |   **8** |             **1,57%** |
| Chapter 8: Putting It All Together                      |             95 |  **14** |             **2,75%** |
| Chapter 9: Domain Logic Patterns                        |            109 |  **34** |             **6,67%** |
| Chapter 10: Data Source Architectural Patterns          |            143 |  **40** |             **7,84%** |
| Chapter 11: Object-Relational Behavioral Patterns       |            183 |  **32** |             **6,27%** |
| Chapter 12: Object-Relational Structural Patterns       |            215 |  **90** |            **17,65%** |
| Chapter 13: Object-Relational Metadata Mapping Patterns |            305 |  **24** |             **4,71%** |
| Chapter 14: Web Presentation Patterns                   |            329 |  **58** |            **11,37%** |
| Chapter 15: Distribution Patterns                       |            387 |  **28** |             **5,49%** |
| Chapter 16: Offline Concurrency Patterns                |            415 |  **40** |             **7,84%** |
| Chapter 17: Session State Patterns                      |            455 |  **10** |             **1,96%** |
| Chapter 18: Base Patterns                               |            465 |  **46** |             **9,02%** |
| **References**                                          |        **511** |       — |                     — |
### Resumo

- **Maior capítulo:** Chapter 12 – _Object-Relational Structural Patterns_ (**90 páginas**, **17,65%** do livro).
- **Segundo maior:** Chapter 14 – _Web Presentation Patterns_ (**58 páginas**, **11,37%**).
- **Terceiro maior:** Chapter 18 – _Base Patterns_ (**46 páginas**, **9,02%**).
- Os **8 primeiros capítulos** (introdução e visão geral) somam apenas **92 páginas** (≈ **18%** do livro).
- O **catálogo de padrões** (Capítulos 9–18) ocupa **402 páginas**, cerca de **79%** do livro. Isso deixa claro que o foco principal do livro é descrever os padrões em profundidade, enquanto a primeira parte serve como fundamentação teórica.

---
# Por onde começar

Como desenvolvedor de software web (principalmente considerando que você trabalha com PHP/Laravel e sistemas corporativos), eu priorizaria os capítulos de forma bem diferente da ordem do livro. Alguns são extremamente úteis no dia a dia; outros são mais históricos e voltados para quem implementa frameworks ou trabalha com sistemas distribuídos complexos.

## Prioridade máxima (leitura obrigatória)

|Capítulo|Vale a pena?|Motivo|
|---|---|---|
|**9. Domain Logic Patterns**|⭐⭐⭐⭐⭐|O coração do livro. Explica Transaction Script, Domain Model, Table Module, Service Layer, etc. Você vai reconhecer esses padrões em Laravel, Spring e outros frameworks.|
|**10. Data Source Architectural Patterns**|⭐⭐⭐⭐⭐|Active Record, Data Mapper, Row Data Gateway, Table Data Gateway... Essencial para entender ORMs como Eloquent e Hibernate.|
|**18. Base Patterns**|⭐⭐⭐⭐⭐|Pequenos padrões reutilizados por todo o livro. Muito prático e aplicável.|

---

## Muito importantes

|Capítulo|Vale a pena?|Motivo|
|---|---|---|
|**11. Object-Relational Behavioral Patterns**|⭐⭐⭐⭐☆|Lazy Load, Identity Map, Unit of Work... Explica como um ORM realmente funciona.|
|**12. Object-Relational Structural Patterns**|⭐⭐⭐⭐☆|Association Table Mapping, Inheritance Mapping, Embedded Value... Útil para modelagem de banco e ORMs.|
|**13. Object-Relational Metadata Mapping Patterns**|⭐⭐⭐⭐☆|Mostra como frameworks fazem o mapeamento entre objetos e tabelas (annotations, XML, etc.).|

---

## Interessantes dependendo do contexto

|Capítulo|Vale a pena?|Motivo|
|---|---|---|
|**14. Web Presentation Patterns**|⭐⭐⭐⭐☆|MVC, Page Controller, Front Controller, Template View... Muito útil para entender a arquitetura de frameworks web.|
|**16. Offline Concurrency Patterns**|⭐⭐⭐⭐☆|Optimistic Lock, Pessimistic Lock, Coarse/Fine-Grained Lock. Importante para sistemas bancários, ERPs e alta concorrência.|

---

## Leitura rápida

|Capítulo|Vale a pena?|Motivo|
|---|---|---|
|**1–8**|⭐⭐⭐☆☆|Servem como introdução e contexto. São relativamente curtos. Vale ler uma vez para entender a visão geral do autor.|
|**17. Session State Patterns**|⭐⭐⭐☆☆|Útil, mas hoje boa parte disso é resolvida pelos frameworks.|

---

## Menor prioridade

|Capítulo|Vale a pena?|Motivo|
|---|---|---|
|**15. Distribution Patterns**|⭐⭐☆☆☆|Bastante focado em tecnologias da época (EJB, Remote Facade, DTO). Os conceitos ainda existem, mas a implementação moderna mudou bastante com REST, gRPC e microsserviços.|

---

# Se eu tivesse apenas 200 páginas para ler

Eu escolheria nesta ordem:

1. **Capítulo 9** – Domain Logic Patterns (34 pág.)
2. **Capítulo 10** – Data Source Architectural Patterns (40 pág.)
3. **Capítulo 18** – Base Patterns (46 pág.)
4. **Capítulo 11** – Object-Relational Behavioral Patterns (32 pág.)
5. **Capítulo 16** – Offline Concurrency Patterns (40 pág.)

**Total: 192 páginas.**

Na minha opinião, essas são as páginas que entregam o maior retorno para um desenvolvedor web moderno

1. **9. Domain Logic Patterns**
2. **10. Data Source Architectural Patterns**
3. **11. Object-Relational Behavioral Patterns**
4. **18. Base Patterns**
5. **12. Object-Relational Structural Patterns**
6. **14. Web Presentation Patterns**
7. **16. Offline Concurrency Patterns**
8. **13. Object-Relational Metadata Mapping Patterns**
9. **1–8** (quando quiser consolidar a visão geral)
10. **15** e **17** por último.

Essa sequência vai do que é mais útil no desenvolvimento diário para os conceitos mais especializados, aproveitando melhor o conteúdo do livro.