import { Button } from "@/components/ui/button";
import CutyTable from "./_components/cutyTable";
import Link from "next/link";
import { axiosSSR } from "@/lib/axios.ssr";
import { TCuty } from "@/models/cuty.model.ts";

async function getCutyData(): Promise<TCuty[]> {
  try {
    const { data } = await axiosSSR().get(`/cuty/me`);
    return data.data;
  } catch (error) {
    console.error("Failed to fetch cuty data:", error);
    return [];
  }
}

export default async function Page() {
  const cutyDataPromise = getCutyData();

  return (
    <section className="p-4">
      <Link href="/cuty/create">
        <Button>Create Cuty Request</Button>
      </Link>
      <CutyTable cutyData={cutyDataPromise} />
    </section>
  );
}
