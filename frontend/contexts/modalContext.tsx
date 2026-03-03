"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { createContext, useContext, useState, ReactNode } from "react";

type TModalContext = {
  content?: ReactNode;
  setContent: (c?: ReactNode) => void;
};

const ModalContext = createContext<TModalContext | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ReactNode | undefined>();
  return (
    <ModalContext.Provider value={{ content, setContent }}>
      <Dialog>
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
        modal.setContent(content);
      }}
    >
      {children}
    </DialogTrigger>
  );
}
