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
import Button from "@/components/ui/Button";

export default function JoinTeaser() {
  return (
    <section
      aria-label="Participe da Banda Municipal"
      className="bg-primary py-16"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          {/* Ícone decorativo */}
          <div aria-hidden="true" className="mb-4 text-5xl text-accent">🎺</div>

          <h2 className="font-heading text-3xl font-bold text-primary-foreground md:text-4xl">
            Faça Parte da Nossa Banda!
          </h2>

          <p className="mt-4 text-base text-primary-foreground/80">
            A Banda Municipal José Ângelo Vaz está com inscrições abertas para novos
            músicos. Não é necessário experiência prévia — oferecemos formação completa
            e gratuita a moradores de Divisa Nova.
          </p>

          {/* Destaques rápidos */}
          <ul
            className="mx-auto mt-6 grid max-w-sm grid-cols-1 gap-3 text-sm text-primary-foreground/90 sm:grid-cols-3"
            role="list"
          >
            {[
              { icon: "🎓", text: "Ensino gratuito" },
              { icon: "👥", text: "Comunidade acolhedora" },
              { icon: "🎼", text: "Repertório diversificado" },
            ].map(({ icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-2 rounded-lg border border-primary-foreground/20 px-3 py-2"
              >
                <span aria-hidden="true">{icon}</span>
                {text}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button href="/faca-parte" variant="secondary" size="lg">
              Saiba Como Ingressar
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
