/**
 * HistoryTeaser.js
 *
 * Seção 3 da Home: prévia da história da banda.
 * Texto curto + CTA para a página /historia.
 *
 * TODO: substituir o texto estático pelo trecho do Prismic (campo "resumo" do documento de história).
 *
 * Props:
 *   - history: array de marcos históricos (usado apenas para o resumo — pega o primeiro item)
 */

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

/**
 * @param {{ history: Array }} props
 */
export default function HistoryTeaser({ history = [] }) {
  // Exibe o primeiro marco histórico como prévia
  const firstEntry = history[0];

  return (
    <section
      id="historia"
      aria-label="História da Banda"
      className="home-section bg-surface py-12"
    >
      <Container>
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          {/* ---- Texto ---- */}
          <div>
            <SectionTitle>Nossa História</SectionTitle>
            <p className="text-base leading-relaxed text-muted">
              {firstEntry?.description ??
                "A Banda Municipal José Ângelo Vaz é uma instituição cultural que há décadas enriquece a vida dos moradores de Divisa Nova – MG com apresentações, desfiles e formação musical."}
            </p>
            <div className="mt-6">
              <Button href="/historia" variant="primary">
                Conheça nossa História
              </Button>
            </div>
          </div>

          {/* ---- Imagem / Placeholder ---- */}
          <div
            className="flex h-56 items-center justify-center rounded-xl border border-border bg-background md:h-72"
            aria-hidden="true"
          >
            {/* TODO: substituir por <Image> com foto histórica real */}
            <div className="text-center">
              <div className="text-5xl text-accent">𝄞</div>
              <p className="mt-2 text-xs text-muted">Foto histórica da banda</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
