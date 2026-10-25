/**
 * JoinForm.js — Componente da página /faca-parte
 *
 * Formulário de inscrição: nome, e-mail e telefone.
 * Validação básica no cliente + sanitização de entrada.
 *
 * "use client" necessário por useState e eventos de formulário.
 *
 * TODO: implementar envio real (API Route em /api/join, ou serviço de e-mail como Resend).
 * TODO: adicionar honeypot ou reCAPTCHA para evitar spam.
 * TODO: adicionar campo de instrumento de interesse.
 * TODO: implementar feedback de envio (estado: idle | loading | success | error).
 */

"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

/** Remove caracteres perigosos de uma string (sanitização básica) */
function sanitize(str) {
  return str.replace(/[<>"'`]/g, "").trim();
}

/** Valida e-mail básico */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Formata telefone para exibição */
function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

const INITIAL_FORM = { name: "", email: "", phone: "" };
const INITIAL_ERRORS = { name: "", email: "", phone: "" };

export default function JoinForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  function handleChange(e) {
    const { name, value } = e.target;
    const sanitized = name === "phone" ? formatPhone(value) : sanitize(value);
    setForm((prev) => ({ ...prev, [name]: sanitized }));
    // Limpar erro ao digitar
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const newErrors = { name: "", email: "", phone: "" };
    let valid = true;

    if (!form.name || form.name.length < 3) {
      newErrors.name = "Informe seu nome completo (mínimo 3 caracteres).";
      valid = false;
    }
    if (!isValidEmail(form.email)) {
      newErrors.email = "Informe um e-mail válido.";
      valid = false;
    }
    if (form.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Informe um telefone com DDD (ex.: (35) 99999-9999).";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      // TODO: substituir por chamada real à API Route /api/join
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulação
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-xl border border-border bg-surface p-8 text-center"
        role="alert"
        aria-live="polite"
      >
        <div className="text-5xl" aria-hidden="true">🎉</div>
        <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
          Inscrição Enviada!
        </h3>
        <p className="mt-2 text-muted">
          Obrigado pelo interesse! Entraremos em contato em breve pelo e-mail informado.
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Nova inscrição
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Formulário de inscrição para ingressar na banda"
      className="rounded-xl border border-border bg-surface p-6 space-y-5"
    >
      <h2 className="font-heading text-xl font-bold text-foreground">
        Quero me inscrever
      </h2>

      {/* ---- Campo: Nome ---- */}
      <div>
        <label
          htmlFor="join-name"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Nome completo <span className="text-accent" aria-hidden="true">*</span>
          <span className="sr-only">(obrigatório)</span>
        </label>
        <input
          id="join-name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
          autoComplete="name"
          aria-required="true"
          aria-describedby={errors.name ? "join-name-error" : undefined}
          aria-invalid={!!errors.name}
          placeholder="Seu nome completo"
          className={[
            "w-full rounded-lg border bg-background px-4 py-3 text-base text-foreground",
            "placeholder:text-muted transition-colors",
            "focus:border-primary focus:outline-none focus:ring-2 focus:ring-focus/30",
            errors.name ? "border-red-500" : "border-border",
          ].join(" ")}
        />
        {errors.name && (
          <p id="join-name-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      {/* ---- Campo: E-mail ---- */}
      <div>
        <label
          htmlFor="join-email"
          className="block text-sm font-medium text-foreground mb-1"
        >
          E-mail <span className="text-accent" aria-hidden="true">*</span>
          <span className="sr-only">(obrigatório)</span>
        </label>
        <input
          id="join-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
          aria-required="true"
          aria-describedby={errors.email ? "join-email-error" : undefined}
          aria-invalid={!!errors.email}
          placeholder="seu@email.com"
          className={[
            "w-full rounded-lg border bg-background px-4 py-3 text-base text-foreground",
            "placeholder:text-muted transition-colors",
            "focus:border-primary focus:outline-none focus:ring-2 focus:ring-focus/30",
            errors.email ? "border-red-500" : "border-border",
          ].join(" ")}
        />
        {errors.email && (
          <p id="join-email-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      {/* ---- Campo: Telefone ---- */}
      <div>
        <label
          htmlFor="join-phone"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Telefone <span className="text-accent" aria-hidden="true">*</span>
          <span className="sr-only">(obrigatório)</span>
        </label>
        <input
          id="join-phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          required
          autoComplete="tel"
          aria-required="true"
          aria-describedby={errors.phone ? "join-phone-error" : undefined}
          aria-invalid={!!errors.phone}
          placeholder="(35) 99999-9999"
          inputMode="numeric"
          className={[
            "w-full rounded-lg border bg-background px-4 py-3 text-base text-foreground",
            "placeholder:text-muted transition-colors",
            "focus:border-primary focus:outline-none focus:ring-2 focus:ring-focus/30",
            errors.phone ? "border-red-500" : "border-border",
          ].join(" ")}
        />
        {errors.phone && (
          <p id="join-phone-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.phone}
          </p>
        )}
      </div>

      {/* ---- Aviso de campos obrigatórios ---- */}
      <p className="text-xs text-muted">
        <span className="text-accent" aria-hidden="true">*</span> Campos obrigatórios.
      </p>

      {/* ---- Erro global de envio ---- */}
      {status === "error" && (
        <p role="alert" className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          Ocorreu um erro ao enviar sua inscrição. Tente novamente ou entre em contato por telefone.
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={status === "loading"}
        aria-disabled={status === "loading"}
      >
        {status === "loading" ? "Enviando…" : "Enviar Inscrição"}
      </Button>
    </form>
  );
}
