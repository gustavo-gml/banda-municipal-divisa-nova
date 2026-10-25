/**
 * Footer.js
 *
 * Rodapé global da aplicação.
 * Contém: logo/nome, contatos, redes sociais (placeholders) e localização resumida.
 *
 * Server Component (sem estado ou eventos de cliente).
 *
 * TODO: Substituir os dados de contato e redes sociais pelos dados reais.
 * TODO: Adicionar links reais para redes sociais quando disponíveis.
 */

import Link from "next/link";

type SocialLink = {
  label: string;
  icon: string;
  href: string;
};

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Facebook da Banda Municipal",
    icon: "f",
    href: "#", // TODO: substituir pela URL real do Facebook
  },
  {
    label: "Instagram da Banda Municipal",
    icon: "ig",
    href: "#", // TODO: substituir pela URL real do Instagram
  },
  {
    label: "YouTube da Banda Municipal",
    icon: "▶",
    href: "#", // TODO: substituir pela URL real do YouTube
  },
];

/* TODO: atualizar o ano manualmente a cada virada de ano,
   ou migrar para um Client Component mínimo se preferir dinâmico. */
const CURRENT_YEAR = 2025;

export default function Footer() {
  const currentYear = CURRENT_YEAR;

  return (
    <footer className="border-t border-border bg-surface" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {/* ---- Coluna 1: Identidade ---- */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 rounded-md"
              aria-label="Banda Municipal José Ângelo Vaz — página inicial"
            >
              <span aria-hidden="true" className="text-2xl text-accent">𝄞</span>
              <span className="font-heading text-base font-bold text-foreground">
                Banda Municipal
                <br />
                <span className="text-sm font-normal text-muted">José Ângelo Vaz</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted">
              Tradição musical que encanta Divisa Nova – MG desde 1945.
            </p>
          </div>

          {/* ---- Coluna 2: Contato ---- */}
          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">
              Contato
            </h2>
            <address className="mt-3 space-y-2 text-sm not-italic text-muted">
              {/* TODO: substituir pelos dados reais */}
              <p>
                <span aria-hidden="true">📍 </span>
                Praça Central, s/n — Divisa Nova, MG
              </p>
              <p>
                <a
                  href="tel:+553500000000"
                  className="hover:text-primary transition-colors"
                  aria-label="Telefone: 35 0000-0000"
                >
                  <span aria-hidden="true">📞 </span>
                  (35) 0000-0000
                  {/* TODO: substituir pelo número real */}
                </a>
              </p>
              <p>
                <a
                  href="mailto:banda@divisanova.mg.gov.br"
                  className="hover:text-primary transition-colors"
                  aria-label="E-mail: banda@divisanova.mg.gov.br"
                >
                  <span aria-hidden="true">✉️ </span>
                  banda@divisanova.mg.gov.br
                  {/* TODO: substituir pelo e-mail real */}
                </a>
              </p>
            </address>
          </div>

          {/* ---- Coluna 3: Redes Sociais ---- */}
          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">
              Redes Sociais
            </h2>
            <ul className="mt-3 flex gap-3" role="list">
              {SOCIAL_LINKS.map(({ label, icon, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={[
                      "flex h-11 w-11 items-center justify-center rounded-full",
                      "border border-border bg-background text-sm font-bold text-foreground",
                      "hover:border-primary hover:text-primary transition-colors duration-150",
                    ].join(" ")}
                  >
                    <span aria-hidden="true">{icon}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---- Copyright ---- */}
        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted">
          <p>
            © {currentYear} Banda Municipal José Ângelo Vaz — Divisa Nova, MG.
            Todos os direitos reservados.
          </p>
          <p className="mt-1">
            Projeto acadêmico desenvolvido pelo curso de{" "}
            {/* TODO: adicionar o nome do curso */}
            <abbr title="Tecnologia em Análise e Desenvolvimento de Sistemas">TADS</abbr>.
          </p>
        </div>
      </div>
    </footer>
  );
}
