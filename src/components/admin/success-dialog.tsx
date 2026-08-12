"use client";

import { useEffect } from "react";
import { CheckCircle } from "@phosphor-icons/react";

type SuccessToastProps = {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
};

export function SuccessDialog({
  isOpen,
  message,
  onClose,
  duration = 2000,
}: SuccessToastProps) {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div className="toast-notification-backdrop">
      <div className="toast-notification-card animate-toast-slide">
        <CheckCircle size={26} weight="fill" className="toast-icon-green" />
        <span className="toast-message-text">{message}</span>
      </div>
    </div>
  );
}
