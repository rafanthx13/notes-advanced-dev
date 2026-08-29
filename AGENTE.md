# Guia para agentes — notes-advanced-dev

## Propósito do repositório

Este é um *digital garden* de anotações de desenvolvimento. O [Quartz 5](https://quartz.jzhao.xyz/) transforma os arquivos Markdown de `content/` em um site estático, publicado em GitHub Pages em:

`https://rafanthx13.github.io/notes-advanced-dev`

O objetivo usual de um agente aqui é ajudar a criar, continuar, revisar e organizar anotações do Obsidian sem perder a estrutura de links entre elas.

## Onde editar

- `content/` é a fonte do site. Toda nota publicável deve ficar aqui.
- `content/index.md` é a página inicial.
- As anotações de estudo atuais estão sobretudo em `content/software-design-study/`, organizadas por assunto. Preserve essa organização ao continuar um tópico existente.
- Imagens e outros anexos devem ficar próximos da nota ou em uma subpasta descritiva, e devem ser referenciados por caminhos relativos em Markdown.
- `books-hidden/`, `private/`, `templates/` e `.obsidian/` não são conteúdo publicado. Não mova arquivos desses locais para `content/` sem pedido explícito.

## Como escrever notas

- Escreva em Markdown compatível com Obsidian e Quartz. Wikilinks como `[[Nome da Nota]]`, callouts, Mermaid, LaTeX, tags e checkboxes são aceitos pela configuração atual.
- Ao criar uma nota, use um nome de arquivo descritivo, em minúsculas e com hífens. Use o caminho e o idioma já empregados na seção correspondente.
- Inclua *frontmatter* quando ele trouxer valor. Modelo recomendado:

  ```md
  ---
  title: Título da nota
  description: Resumo curto para busca e compartilhamento
  tags:
    - arquitetura
  aliases:
    - Outro nome da nota
  draft: false
  ---
  ```

- `draft: true` impede a publicação; remova-o ou use `false` para publicar. A ausência do campo também publica a nota.
- Prefira links internos (`[[...]]`) a URLs externas quando houver uma nota relacionada. Preserve links, títulos e referências existentes ao editar.
- Para conteúdo técnico, priorize explicação clara, exemplos pequenos e seções que se encaixem na nota pai. Não faça reescritas extensas de anotações pessoais sem que o pedido seja explícito.

## Configuração e aparência

- `quartz.config.yaml` controla título, URL base, plugins e layout. A URL base atual é `rafanthx13.github.io/notes-advanced-dev`; não a altere sem solicitação explícita.
- O site usa plugins para Markdown Obsidian, índice/busca, grafo, backlinks, sitemap, RSS, imagens OG, páginas de pasta e suporte a Canvas/Bases.
- Para ajustes visuais, use `quartz/styles/custom.scss`. Só altere `quartz/` ou a configuração quando a solicitação envolver comportamento, layout ou visual do site — não para uma tarefa de escrita comum.

## Preview, validação e publicação

- Preview local: `npx quartz build --serve` (servido em `http://localhost:8080`).
- Build único: `npx quartz build`.
- `public/` é saída gerada e está no `.gitignore`: nunca edite nem versione arquivos nele.
- O workflow `.github/workflows/deploy.yaml` roda em cada push para `main`, gera o site e o publica no GitHub Pages. Assim, para publicar mudanças já revisadas: faça commit e push para `main` (ou use `npx quartz sync`, que sincroniza Git).
- Antes de publicar mudanças relevantes em Markdown/configuração, faça ao menos um build local quando o ambiente estiver disponível.

## Cuidados operacionais

- Preserve as alterações não relacionadas que já estejam no diretório de trabalho.
- Não exponha conteúdo privado ou rascunhos apenas para torná-los publicáveis.
- Não atualize o Quartz, dependências, plugins ou workflows de deploy sem pedido explícito: isso é uma mudança de manutenção separada da autoria de notas.
