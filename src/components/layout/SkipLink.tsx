/**
 * SkipLink.js
 *
 * Link "Pular para o conteúdo" — acessibilidade WCAG 2.4.1 (Bypass Blocks).
 * Visualmente oculto até receber foco, depois aparece no topo da tela.
 *
 * Deve ser o PRIMEIRO elemento dentro do <body>.
 * O <main> da página deve ter id="main-content".
 */

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className={[
        /* Posicionamento: sai do fluxo, mas fica acessível */
        "absolute left-4 top-4 z-[9999]",
        /* Estilo oculto — aparece com foco */
        "-translate-y-20 focus:translate-y-0",
        /* Visual quando visível */
        "rounded bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground",
        "transition-transform duration-150",
        /* Foco visível garantido pelo globals.css */
      ].join(" ")}
    >
      Pular para o conteúdo
    </a>
  );
}
