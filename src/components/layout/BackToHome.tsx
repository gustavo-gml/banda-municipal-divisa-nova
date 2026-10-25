import Link from "next/link";

export default function BackToHome() {
  return (
    <Link
      href="/"
      className="mb-8 inline-flex min-h-[2.75rem] items-center rounded-md text-primary underline underline-offset-4 hover:text-foreground"
    >
      ← Voltar ao início
    </Link>
  );
}
