import { Loader2 } from "lucide-react";

export default function Loading({ label }: { label?: string }) {
  return (
    <div className="w-full h-full flex justify-center items-center gap-2">
      {label && <p>{label}</p>}
      <Loader2 className="animate-spin" />
    </div>
  );
}
