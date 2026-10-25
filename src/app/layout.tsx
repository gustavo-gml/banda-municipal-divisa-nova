import { Inter, Playfair_Display } from "next/font/google";
import type { Metadata } from "next";
import { PrismicPreview } from "@prismicio/next";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { repositoryName } from "@/prismicio";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import SkipLink from "@/components/layout/SkipLink";
import Header from "@/components/layout/Header";
import AccessibilityBar from "@/components/layout/AccessibilityBar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

/* ------------------------------------------------------------------
   Fontes via next/font (otimizadas — sem CLS, sem requisições extras)
   ------------------------------------------------------------------ */

/** Fonte serifa para títulos — identidade cultural da banda */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

/** Fonte sem serifa legível para corpo de texto */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/* ------------------------------------------------------------------
   Metadata — SEO e PWA
   ------------------------------------------------------------------ */
export const metadata: Metadata = {
  title: {
    default: "Banda Municipal José Ângelo Vaz | Divisa Nova – MG",
    template: "%s | Banda Municipal José Ângelo Vaz",
  },
  description:
    "Site oficial da Banda Municipal José Ângelo Vaz de Divisa Nova – MG. Conheça nossa história, confira a agenda de eventos, acesse a galeria e saiba como fazer parte.",
  keywords: ["banda municipal", "Divisa Nova", "MG", "José Ângelo Vaz", "música", "cultura"],
  authors: [{ name: "Banda Municipal José Ângelo Vaz" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Banda Municipal José Ângelo Vaz",
    title: "Banda Municipal José Ângelo Vaz | Divisa Nova – MG",
    description:
      "Site oficial da Banda Municipal José Ângelo Vaz de Divisa Nova – MG.",
    // TODO: adicionar imagem OG real: images: [{ url: "/og-image.jpg", width: 1200, height: 630 }]
  },
};

/* ------------------------------------------------------------------
   Layout raiz
   ------------------------------------------------------------------ */
type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    /*
     * suppressHydrationWarning: necessário porque next-themes muda o atributo
     * data-theme no <html> no lado do cliente (seria mismatch SSR/cliente sem isso).
     */
    <html
      lang="pt-BR"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <AccessibilityProvider>
            {/* Link de pular conteúdo — WCAG 2.4.1 */}
            <SkipLink />

            {/* Cabeçalho fixo */}
            <Header />

            {/* Barra de acessibilidade */}
            <AccessibilityBar />

            {/* Conteúdo principal da página */}
            <main id="main-content" className="flex-1" tabIndex={-1}>
              {children}
            </main>

            {/* Rodapé */}
            <Footer />

            <PrismicPreview repositoryName={repositoryName} />
          </AccessibilityProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
