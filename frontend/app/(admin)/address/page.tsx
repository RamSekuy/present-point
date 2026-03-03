import { axiosSSR } from "@/lib/axios.ssr";
import AddressTable from "./_components/addressTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  const {
    data: { data },
  } = await axiosSSR().get("/address");
  return (
    <>
      <section className="p-2 flex justify-end">
        <Link href={"/address/add"}>
          <Button>Add Address</Button>
        </Link>
      </section>
      <section className="p-2">
        <AddressTable data={data} />
      </section>
    </>
  );
}
