<!-- BEGIN:nextjs-agent-rules -->

# Projeto: Site da Banda Municipal José Ângelo Vaz

Landing page institucional (Divisa Nova - MG), projeto acadêmico feito por 4 pessoas.
Público principal: celular, pessoas com baixo letramento digital. Acessibilidade é requisito central.

## Stack
Next.js (App Router) + React + JavaScript (NÃO usar TypeScript) + Tailwind CSS + Prismic. Deploy na Vercel.

## Regras gerais
- Idioma da interface e dos textos: pt-BR. Nomes de código (variáveis, componentes, arquivos) em inglês.
- Mobile-first: estilize primeiro para celular e use breakpoints (`md:`, `lg:`) para telas maiores.
- Não instalar dependências novas sem avisar. Preferir soluções simples.
- Não alterar arquivos fora da tarefa pedida, principalmente `layout.js`, `globals.css` e os componentes de `components/ui/` e `components/layout/` (são compartilhados).

## Estrutura
- Páginas em `src/app/<rota>/page.js`.
- Componentes de cada seção em `src/components/<secao>/` (home, historia, agenda, galeria, faca-parte, contato).
- Componentes reutilizáveis em `src/components/ui/`; estrutura global em `src/components/layout/`.
- Dados mockados em `src/lib/mock/`. Os componentes recebem dados por props e nunca chamam o Prismic diretamente: use as funções de `src/lib/` (ex.: `getEvents()`).

## Estilo
- Um componente por arquivo, nome em PascalCase.
- Usar SOMENTE os tokens do design system (variáveis em `globals.css`). Nunca cores hexadecimais fixas nos componentes.
- Unidades em `rem`, para o controle de tamanho de fonte funcionar.
- Componentes são Server Components por padrão; usar `"use client"` só quando houver estado ou eventos.

## Acessibilidade (obrigatório em todo componente)
- HTML semântico (`header`, `nav`, `main`, `section`, `footer`, hierarquia correta de `h1`–`h6`).
- Toda imagem com `alt` descritivo (use `alt=""` apenas em imagens decorativas).
- Tudo que é clicável deve funcionar por teclado e ter foco visível.
- Alvos de toque com no mínimo 44px.
- Testar no tema de alto contraste e com a fonte ampliada.

## Git
- Uma branch por funcionalidade (`feat/agenda`, `fix/menu-mobile`). Nunca commitar direto na `main`.
- Commits curtos em português ou inglês, mas padronizados (ex.: `feat: adiciona calendário da agenda`).

## Antes de finalizar qualquer tarefa
Rodar `npm run lint` e `npm run build` e corrigir os erros.
<!-- END:nextjs-agent-rules -->
