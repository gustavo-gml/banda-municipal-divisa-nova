/**
 * JoinTeaser.js
 *
 * Seção 6 da Home: chamada para novos músicos ingressarem na banda.
 * Bloco de destaque com texto motivacional + CTA para /faca-parte.
 *
 * TODO: adicionar uma foto real de ensaio/músico como fundo ou imagem lateral.
 * TODO: substituir o texto pelo conteúdo do Prismic (campo "chamada de recrutamento").
 */

import Container from "@/components/ui/Container";
import Link from "next/link";
export default function JoinTeaser() {
  return (
    <section
      id="faca-parte"
      aria-label="Participe da Banda Municipal"
      className="home-section bg-[#0B1220] py-16 [[data-contrast=high]_&]:bg-black"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          {/* Ícone decorativo */}
          <div aria-hidden="true" className="mb-4 text-5xl text-accent">🎺</div>

          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Faça Parte da Nossa Banda!
          </h2>

          <p className="mt-4 text-base text-white">
            Quer fazer parte da Banda Municipal José Ângelo Vaz? Conheça os requisitos para participar e saiba como entrar em contato com o maestro.
          </p>

          {/* Destaques rápidos */}
          <ul
            className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-3 text-sm text-white sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              { icon: "🎓", text: "Ensino gratuito" },
              { icon: "👥", text: "Comunidade acolhedora" },
              { icon: "🎼", text: "Repertório diversificado" },
            ].map(({ icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-2 rounded-lg border border-white/40 px-3 py-2"
              >
                <span aria-hidden="true">{icon}</span>
                {text}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Link
              href="/faca-parte"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white bg-white px-8 py-4 text-lg font-semibold text-[#14284b] transition-colors hover:bg-transparent hover:text-white focus-visible:outline-white"
            >
              Saiba Como Participar
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
