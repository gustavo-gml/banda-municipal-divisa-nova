/**
 * HeroBanner.js
 *
 * Seção 1 da Home: identidade da marca.
 * Exibe a clave de sol, nome da banda, subtítulo com cidade e ano de fundação.
 *
 * TODO: Substituir o texto estático pelos dados do Prismic (configurações globais do site).
 * TODO: Adicionar imagem de fundo (foto da banda ou do palco) com overlay escuro.
 * TODO: Animar a entrada da clave de sol e do texto.
 */

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function HeroBanner() {
  return (
    <section
      aria-label="Apresentação da Banda Municipal"
      className="relative flex min-h-[60vh] items-center bg-primary py-16 md:min-h-[70vh]"
    >
      {/* TODO: adicionar <Image> de fundo com overlay quando houver foto real */}
      {/* <div className="absolute inset-0 bg-primary/80" aria-hidden="true" /> */}

      <Container className="relative z-10 text-center">
        {/* Clave de sol — decorativa */}
        <div
          aria-hidden="true"
          className="mb-4 text-6xl leading-none text-accent md:text-8xl"
        >
          𝄞
        </div>

        {/* h1 — único na página */}
        <h1 className="font-heading text-3xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
          Banda Municipal
          <br />
          <span className="text-accent">José Ângelo Vaz</span>
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base text-primary-foreground/80 md:text-lg">
          Tradição, música e cultura em{" "}
          <strong className="font-semibold">Divisa Nova – MG</strong> desde 1945.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button href="/agenda" size="lg" variant="secondary">
            Ver Agenda
          </Button>
          <Button href="/faca-parte" size="lg" variant="ghost">
            Faça Parte
          </Button>
        </div>
      </Container>
    </section>
  );
}
