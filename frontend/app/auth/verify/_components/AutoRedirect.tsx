"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export const AutoRedirect = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [count, setCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((state) => state - 1)
    }, 1000);
    const timout = setTimeout(() => {
      router.push("/auth");
    }, 3500);

    return () => {
      clearInterval(interval)
      clearTimeout(timout);
    };
  }, []);

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-4">
      {children}
      <p className="underline underline-offset-2 text-sm tabular-nums">Redirect on: {count}</p>
    </div>
  );
};
