import { TCuty } from "@/models/cuty.model.ts";
import CutyTable from "../_components/cutyTable";
import { axiosSSR } from "@/lib/axios.ssr";

async function getCutyData(): Promise<TCuty[]> {
  try {
    const { data } = await axiosSSR().get("/cuty");
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
      <h1>Request Cuty List</h1>
      <CutyTable cutyData={cutyDataPromise} />
    </section>
  );
}
