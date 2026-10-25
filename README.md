# Banda Municipal José Ângelo Vaz — Site Institucional

> Projeto acadêmico — Landing page institucional para a Banda Municipal José Ângelo Vaz de Divisa Nova – MG.
> Desenvolvido por Agabo Monteiro, Gustavo Martins, José Gabriel e Tiago Lemes como prática de extensão do curso de Sistemas de Informação do IFSULDEMINAS - Machado.

---

## Como rodar localmente

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd banda-municipal-divisa-nova

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

```bash
# Verificar erros de lint
npm run lint

# Gerar build de produção (apenas para validar)
npm run build
```

---

## Stack tecnológica

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| Next.js | 16.x | Framework React (App Router) |
| React | 19.x | Interface |
| TypeScript | 6.x | Tipagem estática e contratos de dados |
| Tailwind CSS | 4.x | Estilização (tokens via `@theme inline`) |
| next-themes | latest | Alternância de tema claro/escuro |
| Prismic | _a instalar_ | CMS (não configurado ainda) |
| Vercel | — | Deploy |

---

## Estrutura de pastas

```
src/
  app/
    layout.tsx              # Layout raiz: fontes, ThemeProvider, Header, Footer
    page.tsx                # Home (compõe as seções)
    globals.css             # Tailwind + design system (CSS variables + @theme inline)
    historia/page.tsx
    agenda/page.tsx
    galeria/page.tsx
    faca-parte/page.tsx
    contato/page.tsx
  components/
    layout/                 # Header, Footer, Nav, AccessibilityBar, SkipLink
    ui/                     # Button, Card, SectionTitle, Container, Modal (reutilizáveis)
    home/                   # HeroBanner, Highlights, HistoryTeaser, AgendaTeaser,
    │                       # GalleryTeaser, JoinTeaser, LocationMap
    historia/               # Timeline
    agenda/                 # EventCalendar, EventList
    galeria/                # GalleryGrid
    faca-parte/             # Requirements, JoinForm
    contato/                # ContactInfo, ContactMap
  context/
    AccessibilityContext.tsx # Alto contraste + escala de fonte
  hooks/
    useAccessibility.ts     # Hook de conveniência para o contexto
  lib/
    data.ts                 # getEvents(), getHighlights(), getGalleryItems(), getHistory()
    mock/                   # events.ts, highlights.ts, gallery.ts, history.ts
  types/                    # Contratos TypeScript dos dados da aplicação
public/
  images/                   # Imagens do projeto (placeholder: .gitkeep)
```

---

## Sistema de temas e design tokens

O projeto usa **três estados visuais independentes**, todos controlados por CSS variables:

### 1. Tema claro / escuro (next-themes)

O ThemeProvider usa `attribute="data-theme"` no `<html>`. **Não usar a classe `dark:` do Tailwind** — use apenas os tokens.

```css
/* Tema claro */
[data-theme="light"] {
  --background: #FBF8F1;
  --surface: #FFFFFF;
  --foreground: #0F1B2D;
  --primary: #14284B;
  --accent: #D4A017;
  /* ... */
}

/* Tema escuro */
[data-theme="dark"] {
  --background: #0B1220;
  --primary: #E0B040;
  /* ... */
}
```

### 2. Alto contraste (AccessibilityContext)

Controlado pelo `AccessibilityProvider`. Adiciona `data-contrast="high"` no `<html>`, sobrepondo qualquer tema:

```css
[data-contrast="high"] {
  --background: #000000 !important;
  --foreground: #FFFFFF !important;
  --primary: #FFD700 !important;
  /* ... */
}
```

### 3. Escala de fonte

Aplicada via `document.documentElement.style.fontSize` em `%`. Todo o layout usa `rem`, portanto todos os tamanhos escalam proporcionalmente.

### Como usar os tokens nos componentes

```jsx
// ✅ CORRETO — usa tokens do design system
<div className="bg-background text-foreground border-border">
<button className="bg-primary text-primary-foreground">
<p className="text-muted">

// ❌ ERRADO — cores fixas (quebram os temas)
<div className="bg-[#FBF8F1] text-[#0F1B2D]">
<div className="dark:bg-gray-800">
```

**Tokens disponíveis (classes Tailwind):**

| Token | Uso |
|-------|-----|
| `bg-background` / `text-background` | Fundo da página |
| `bg-surface` / `text-surface` | Cards, painéis, header |
| `text-foreground` | Texto principal |
| `text-muted` | Texto secundário, labels |
| `bg-primary` / `text-primary` | Ações principais, botões |
| `text-primary-foreground` | Texto sobre fundo primary |
| `bg-accent` / `text-accent` | Dourado — destaques visuais |
| `text-accent-foreground` | Texto sobre fundo accent |
| `border-border` | Bordas de cards e inputs |
| `text-focus` | Cor do outline de foco |

---

## Convenções de código

### Componentes

- **Um componente por arquivo**, nome em **PascalCase** (ex.: `HeroBanner.tsx`).
- Pasta do componente segue a seção: `components/home/`, `components/ui/`, etc.
- **Server Component por padrão** — adicionar `"use client"` apenas quando houver `useState`, `useEffect` ou handlers de eventos.
- **Somente tokens** de design system nas classes Tailwind. Nunca cores hexadecimais fixas.
- Unidades em **`rem`** (nunca `px` para texto ou espaçamentos relativos a fonte).
- **`alt` obrigatório** em toda `<Image>` ou `<img>`. Use `alt=""` apenas em imagens puramente decorativas.

### Dados

- As **page.tsx** buscam os dados via funções de `src/lib/data.ts` (Server Components).
- Os **componentes** recebem dados por **props** — nunca importam mocks diretamente.
- Para troca futura com Prismic: altere apenas `src/lib/data.ts`.

### Nomenclatura de arquivos

| Tipo | Exemplo |
|------|---------|
| Componente | `HeroBanner.tsx` |
| Página | `page.tsx` (padrão App Router) |
| Mock | `events.ts` (minúsculo) |
| Hook | `useAccessibility.ts` |
| Context | `AccessibilityContext.tsx` |

## Tipos

Os contratos de dados ficam em `src/types/`, separados por seção:

| Arquivo | Contrato | Campos principais |
|---------|----------|------------------|
| `event.ts` | `Event` | `id`, `title`, `date`, `time`, `location`, `description?`, `category` |
| `highlight.ts` | `Highlight` | `id`, `title`, `subtitle`, `imageUrl`, `imageAlt`, `ctaLabel`, `ctaHref` |
| `gallery.ts` | `GalleryItem` | `id`, `type`, `src`, `thumbnailSrc`, `alt`, `caption?`, `year` |
| `history.ts` | `HistoryEntry` | `id`, `decade`, `title`, `description`, `imageUrl`, `imageAlt` |

Os tipos refletem os campos existentes nos mocks para preservar os dados e o comportamento da aplicação durante a migração.

---

## Fluxo de trabalho Git

### Branches

```bash
# Criar branch para nova funcionalidade
git checkout -b feat/nome-da-funcionalidade

# Exemplos de nomes de branch
feat/agenda-calendario
feat/galeria-lightbox
fix/menu-mobile-foco
fix/contraste-alto-botoes
```

**Nunca commitar diretamente na `main`.**

### Commits

Use prefixos semânticos em português ou inglês (padronize com o grupo):

```
feat: adiciona calendário mensal na agenda
fix: corrige foco do menu hambúrguer no mobile
style: ajusta espaçamento do HeroBanner
refactor: extrai lógica de formatação de data
docs: atualiza README com instruções de Prismic
```

### Pull Request

1. Abra um PR da sua branch para `main`
2. Descreva o que foi feito e como testar
3. Aguarde revisão de pelo menos 1 integrante antes de fazer merge

---

## Checklist de acessibilidade

Antes de abrir um PR, verifique:

- [ ] HTML semântico usado (`header`, `nav`, `main`, `section`, `footer`, `article`, `ul/ol/li`)
- [ ] Hierarquia de headings correta (`h1` único na página → `h2` por seção → `h3` por subitem)
- [ ] Toda `<Image>` ou `<img>` tem `alt` descritivo (ou `alt=""` se decorativa)
- [ ] Todos os botões e links funcionam por teclado (Tab, Enter, Esc)
- [ ] Foco visível em todos os elementos interativos (outline amarelo/azul visível)
- [ ] Alvos de toque ≥ 44px (`min-h-[2.75rem]` + `min-w-[2.75rem]`)
- [ ] Ícones decorativos têm `aria-hidden="true"`
- [ ] Botões de ação têm `aria-label` quando o texto visível é insuficiente
- [ ] Regiões de conteúdo têm `aria-label` descritivo
- [ ] Formulários: `label` associado a cada `input` via `htmlFor`/`id`
- [ ] Erros de formulário anunciados com `role="alert"` e `aria-describedby`
- [ ] Testado com alto contraste ativado (sem texto ilegível)
- [ ] Testado com fonte ampliada em 150% (sem quebra de layout)
- [ ] `npm run lint` passa sem erros

---

## TODO global (próximas tarefas)

- [ ] Integrar Prismic CMS (substituir funções em `src/lib/data.ts`)
- [ ] Adicionar fotos reais (substituir placeholders em `components/`)
- [ ] Instalar e integrar `embla-carousel-react` no `Highlights.tsx`
- [ ] Implementar lightbox na galeria (`Modal.tsx` já preparado)
- [ ] Criar API Route `/api/join` para o formulário de inscrição
- [ ] Adicionar imagem Open Graph (`/og-image.jpg`)
- [ ] Configurar deploy na Vercel com variáveis de ambiente do Prismic
