import { Button } from "@/components/ui/button";
import CutyTable from "./_components/cutyTable";
import Link from "next/link";

export default function Page() {
  return (
    <section className="p-4">
      <Link href="/cuty/create">
        <Button>Create Cuty Request</Button>
      </Link>
      <CutyTable />
    </section>
  );
}
