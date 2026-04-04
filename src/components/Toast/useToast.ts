import * as React from "react";

export type ToastVariant = "default" | "success" | "destructive";

export interface ToastData {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  duration?: number;
  action?: React.ReactElement;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export type ToastInput = Omit<ToastData, "id" | "open" | "onOpenChange">;

let count = 0;

function genId() {
  return String(++count);
}

type Listener = (toasts: ToastData[]) => void;

let memoryToasts: ToastData[] = [];
const listeners = new Set<Listener>();

function dispatch(next: ToastData[]) {
  memoryToasts = next;
  listeners.forEach((l) => l(memoryToasts));
}

function toast(input: ToastInput) {
  const id = genId();

  const dismiss = () =>
    dispatch(
      memoryToasts.map((t) => (t.id === id ? { ...t, open: false } : t)),
    );

  dispatch([
    ...memoryToasts,
    {
      ...input,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  ]);

  return { id, dismiss };
}

function dismiss(toastId?: string) {
  if (toastId) {
    dispatch(
      memoryToasts.map((t) => (t.id === toastId ? { ...t, open: false } : t)),
    );
  } else {
    dispatch(memoryToasts.map((t) => ({ ...t, open: false })));
  }
}

function useToast() {
  const [toasts, setToasts] = React.useState<ToastData[]>(memoryToasts);

  React.useEffect(() => {
    listeners.add(setToasts);
    return () => {
      listeners.delete(setToasts);
    };
  }, []);

  return { toasts, toast, dismiss };
}

export { dismiss, toast, useToast };
