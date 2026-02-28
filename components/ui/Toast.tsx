"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  open: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, open, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (!open || !message) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [open, message, duration, onClose]);

  if (!open || !message) return null;

  return (
    <div
      role="alert"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] px-4 py-3 bg-gray-900 text-white text-sm font-medium rounded-xl shadow-lg transition-opacity duration-200"
      style={{ direction: "rtl" }}
    >
      {message}
    </div>
  );
}
