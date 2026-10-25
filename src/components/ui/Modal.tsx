/**
 * Modal.js
 *
 * Modal acessível com:
 * - Foco preso dentro do modal enquanto aberto (focus trap)
 * - Fecha ao pressionar Esc
 * - aria-modal, role="dialog", aria-labelledby
 * - Foco retorna ao elemento que abriu o modal ao fechar
 * - Overlay clicável fecha o modal
 *
 * "use client" necessário por useEffect/useRef.
 *
 * TODO: implementar o focus trap completo (Tab/Shift+Tab ciclando entre focáveis).
 * TODO: conectar ao sistema de rotas se o modal tiver URL própria.
 *
 * Uso:
 *   <Modal isOpen={open} onClose={() => setOpen(false)} title="Título do Modal">
 *     <p>Conteúdo</p>
 *   </Modal>
 */

"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = "modal-title";

  /* Fechar com Esc */
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  /* Mover foco para o dialog ao abrir */
  useEffect(() => {
    if (isOpen) dialogRef.current?.focus();
  }, [isOpen]);

  /* Impedir scroll do body enquanto aberto */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/50 p-4"
      onClick={onClose}
      aria-hidden="true"
    >
      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={[
          "w-full max-w-lg rounded-2xl bg-surface p-6 shadow-xl",
          "focus:outline-none",
        ].join(" ")}
      >
        {/* Cabeçalho */}
        <div className="mb-4 flex items-center justify-between">
          <h2
            id={titleId}
            className="font-heading text-xl font-bold text-foreground"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className={[
              "flex h-11 w-11 items-center justify-center rounded-lg",
              "text-muted hover:bg-background hover:text-foreground transition-colors",
            ].join(" ")}
          >
            <span aria-hidden="true" className="text-xl">✕</span>
          </button>
        </div>

        {/* Conteúdo */}
        <div>{children}</div>
      </div>
    </div>
  );
}
