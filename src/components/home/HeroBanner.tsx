
"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const imagens = [
  {
    src: "/images/banda.png",
    alt: "Integrantes da Banda Municipal José Ângelo Vaz",
  },
  {
    src: "/images/banda1.png",
    alt: "Registro da Banda Municipal José Ângelo Vaz",
  },
  {
    src: "/images/banda2.png",
    alt: "Apresentação da Banda Municipal José Ângelo Vaz",
  },
  {
    src: "/images/banda3.png",
    alt: "Lugar Banda Municipal José Ângelo Vaz",
  },
];

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function HeroBanner() {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [interagindo, setInteragindo] = useState(false);
  const reduzirMovimento = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  // Controle da troca automática.
  const autoplayAtivo =
    !pausado && !interagindo && !reduzirMovimento;

  useEffect(() => {
    if (!autoplayAtivo) return;

    const intervalo = setInterval(() => {
      setAtual((valor) => (valor + 1) % imagens.length);
    }, 5000);

    return () => clearInterval(intervalo);
  }, [autoplayAtivo]);

  function anterior() {
    setAtual((valor) => (valor - 1 + imagens.length) % imagens.length);
  }

  function proxima() {
    setAtual((valor) => (valor + 1) % imagens.length);
  }

  return (
    <section
      aria-label="Apresentação da Banda Municipal"
      aria-roledescription="carrossel"
      onMouseEnter={() => setInteragindo(true)}
      onMouseLeave={() => setInteragindo(false)}
      onFocus={() => setInteragindo(true)}
      onBlur={() => setInteragindo(false)}
      className="hero-institutional relative flex min-h-[600px] items-center overflow-hidden bg-[#101820] md:min-h-[680px] lg:min-h-[720px]"
    >

      {/* FOTOGRAFIAS EM TELA CHEIA */}
      {imagens.map((imagem, indice) => (
        <Image
          key={imagem.src}
          src={imagem.src}
          alt={imagem.alt}
          fill
          priority={indice === 0}
          sizes="100vw"
          className={`absolute inset-0 object-cover object-center transition-opacity duration-1000 ${indice === atual ? "opacity-100" : "opacity-0"}`}
          aria-hidden={indice !== atual}
        />
      ))}

      {/* DESFOQUE LOCALIZADO ATRÁS DOS TEXTOS */}
      <div
        aria-hidden="true"
        className="hero-text-focus pointer-events-none absolute inset-y-0 left-0 z-[1] w-[85%]"
      />

      {/* ESCURECIMENTO GERAL */}
      <div
        aria-hidden="true"
        className="hero-overlay pointer-events-none absolute inset-0 z-[2] bg-black/20"
      />

      {/* CONTEÚDO SOBRE A FOTOGRAFIA */}
      <div className="relative z-10 w-full max-w-none px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="max-w-4xl py-24 text-left sm:py-28 lg:py-32">



          {/* IDENTIFICAÇÃO */}
          <div className="mb-6 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="text-4xl text-[#E0B040]"
            >
              𝄞
            </span>

            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E0B040]">
              Tradição · Cultura · História
            </span>
          </div>

          {/* TÍTULO PRINCIPAL */}
          <h1 className="max-w-4xl font-heading text-4xl font-bold leading-[1.1] text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            Banda Municipal
            <br />
            José Ângelo Vaz
          </h1>

          {/* DESCRIÇÃO */}
          <p className="mt-7 max-w-2xl text-base font-medium leading-relaxed text-white drop-shadow-md sm:text-lg md:text-xl">
            Uma história que se conta através da música.
            Tradição e cultura de Divisa Nova – MG.
          </p>

          {/* IDENTIDADE INSTITUCIONAL */}
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#E0B040] sm:text-sm">
            Divisa Nova · Minas Gerais · Desde 1982
          </p>

          {/* BOTÕES */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">

            <Button
              href="/historia"
              size="lg"
              variant="secondary"
            >
              Conheça nossa história
            </Button>

            <Button
              href="/agenda"
              size="lg"
              variant="ghost"
            >
              Próximas apresentações
            </Button>

          </div>
        </div>
      </div>

      {/* CONTROLES INFERIORES */}
      <div className="absolute bottom-5 left-0 right-0 z-20">
        <Container>
          <div className="flex items-center justify-between gap-4">

            {/* IDENTIFICAÇÃO */}
            <p className="hidden text-xs font-medium uppercase tracking-[0.18em] text-white sm:block">
              Banda Municipal José Ângelo Vaz
            </p>

            {/* NAVEGAÇÃO */}
            <div className="ml-auto flex items-center gap-2">

              <button
                type="button"
                onClick={anterior}
                aria-label="Fotografia anterior"
                className="touch-target flex items-center justify-center rounded-full border border-white/70 px-3 text-white transition hover:bg-white hover:text-[#14284B]"
              >
                ←
              </button>

              {/* INDICADORES */}
              <div
                role="group"
                aria-label="Selecionar fotografia"
                className="flex items-center gap-1"
              >
                {imagens.map((imagem, indice) => (
                  <button
                    key={imagem.src}
                    type="button"
                    onClick={() => setAtual(indice)}
                    aria-label={`Mostrar fotografia ${indice + 1} de ${imagens.length}`}
                    aria-current={atual === indice ? "true" : undefined}
                    className="touch-target flex items-center justify-center"
                  >
                    <span
                      className={`block h-2.5 rounded-full transition-all duration-300 ${atual === indice ? "w-7 bg-[#E0B040]" : "w-2.5 bg-white/70"}`}
                    />
                  </button>
                ))}
              </div>

              {/* PAUSAR / RETOMAR */}
              <button
                type="button"
                onClick={() => setPausado((p) => !p)}
                aria-label={pausado ? "Retomar carrossel" : "Pausar carrossel"}
                className="touch-target flex items-center justify-center rounded-full border border-white/70 px-3 text-white transition hover:bg-white hover:text-[#14284B]"
              >
                {pausado ? "▶" : "Ⅱ"}
              </button>

              <button
                type="button"
                onClick={proxima}
                aria-label="Próxima fotografia"
                className="touch-target flex items-center justify-center rounded-full border border-white/70 px-3 text-white transition hover:bg-white hover:text-[#14284B]"
              >
                →
              </button>

            </div>
          </div>
        </Container>
      </div>

    </section>
  );
}
