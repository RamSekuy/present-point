import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-dvh max-h-dvh min-w-dvw max-w-dvw flex justify-center items-center bg-linear-to-br from-indigo-600 via-blue-700 to-slate-900">
      {children}
    </main>
  );
}
