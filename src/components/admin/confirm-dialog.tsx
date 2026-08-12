"use client";

import { Warning, Trash, SignOut, X } from "@phosphor-icons/react";

type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "logout";
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = "Ya, Lanjutkan",
  cancelText = "Batal",
  variant = "danger",
  isLoading = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const renderIcon = () => {
    if (variant === "logout") {
      return <SignOut size={36} weight="duotone" className="confirm-icon logout" />;
    }
    if (variant === "warning") {
      return <Warning size={36} weight="duotone" className="confirm-icon warning" />;
    }
    return <Trash size={36} weight="duotone" className="confirm-icon danger" />;
  };

  return (
    <div className="confirm-dialog-backdrop">
      <div className="confirm-dialog-box animate-pop-in" role="alertdialog" aria-modal="true" aria-labelledby="confirm-dialog-title" aria-describedby="confirm-dialog-message">
        <button
          type="button"
          onClick={onClose}
          className="confirm-dialog-close"
          disabled={isLoading}
          aria-label="Tutup dialog konfirmasi"
        >
          <X size={18} weight="bold" />
        </button>

        <div className="confirm-dialog-header">
          <div className={`confirm-icon-wrapper ${variant}`}>{renderIcon()}</div>
          <h3 id="confirm-dialog-title">{title}</h3>
          <p id="confirm-dialog-message">{message}</p>
        </div>

        <div className="confirm-dialog-actions">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="admin-btn-secondary"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`admin-btn-confirm ${variant}`}
          >
            {isLoading ? "Memproses..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
