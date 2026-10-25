/**
 * ContactInfo.js — Componente da página /contato
 *
 * Informações de contato: endereço, telefone, e-mail e redes sociais.
 *
 * TODO: substituir todos os dados placeholder pelos dados reais.
 * TODO: adicionar horário de funcionamento/ensaios.
 */

const SOCIAL_LINKS = [
  { label: "Facebook", icon: "f", href: "#" }, // TODO: URL real
  { label: "Instagram", icon: "ig", href: "#" }, // TODO: URL real
  { label: "YouTube", icon: "▶", href: "#" }, // TODO: URL real
];

export default function ContactInfo() {
  return (
    <section aria-label="Informações de contato" className="space-y-8">
      <h2 className="font-heading text-2xl font-bold text-foreground">
        Fale Conosco
      </h2>

      <address className="not-italic space-y-4 text-base text-muted">
        <div className="flex items-start gap-3">
          <span className="text-xl text-accent" aria-hidden="true">📍</span>
          <div>
            <p className="font-medium text-foreground">Endereço</p>
            {/* TODO: substituir pelo endereço real */}
            <p>Praça Central, s/n</p>
            <p>Divisa Nova – MG, CEP 00000-000</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-xl text-accent" aria-hidden="true">📞</span>
          <div>
            <p className="font-medium text-foreground">Telefone</p>
            <a
              href="tel:+553500000000"
              className="hover:text-primary transition-colors"
              aria-label="Ligar para (35) 0000-0000"
            >
              {/* TODO: número real */}
              (35) 0000-0000
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-xl text-accent" aria-hidden="true">✉️</span>
          <div>
            <p className="font-medium text-foreground">E-mail</p>
            <a
              href="mailto:banda@divisanova.mg.gov.br"
              className="hover:text-primary transition-colors break-all"
              aria-label="Enviar e-mail para banda@divisanova.mg.gov.br"
            >
              {/* TODO: e-mail real */}
              banda@divisanova.mg.gov.br
            </a>
          </div>
        </div>
      </address>

      {/* ---- Redes sociais ---- */}
      <div>
        <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
          Redes Sociais
        </h3>
        <ul className="flex gap-3" role="list">
          {SOCIAL_LINKS.map(({ label, icon, href }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={`${label} da Banda Municipal (abre em nova aba)`}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "flex h-11 w-11 items-center justify-center rounded-full",
                  "border border-border bg-surface text-sm font-bold text-foreground",
                  "hover:border-primary hover:text-primary transition-colors",
                ].join(" ")}
              >
                <span aria-hidden="true">{icon}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
