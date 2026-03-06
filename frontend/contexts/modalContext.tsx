"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { createContext, useContext, useState, ReactNode } from "react";

type TModalContext = {
  open: (content: ReactNode) => void;
  close: () => void;
};

const ModalContext = createContext<TModalContext | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ReactNode>();
  const [open, setOpen] = useState(false);

  function handleOpen(content: ReactNode) {
    setContent(content);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setContent(undefined);
  }

  return (
    <ModalContext.Provider value={{ open: handleOpen, close: handleClose }}>
      <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
        {children}
        {content && (
          <DialogContent className="max-h-[90dvh] overflow-auto">
            {content}
          </DialogContent>
        )}
      </Dialog>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
}

export function ModalTrigger({
  content,
  children,
}: {
  content: ReactNode;
  children: ReactNode;
}) {
  const modal = useModal();
  return (
    <DialogTrigger
      asChild
      onClick={() => {
        modal.open(content);
      }}
    >
      {children}
    </DialogTrigger>
  );
}
