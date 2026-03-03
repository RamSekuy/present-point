"use client";

import DataTable from "@/components/dataTable";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/modalContext";
import { axiosCSR } from "@/lib/axios.csr";
import axiosToast from "@/lib/toast";
import { ColumnDef } from "@tanstack/react-table";



export default function AddressTable({ data }: { data: TAddress[] }) {
const {setContent} = useModal()

    const coloumns: ColumnDef<TAddress>[] = [
  {
    accessorKey: "name",
  },
  {
    accessorKey: "detail",
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-x-2">
        <Button>Detail</Button>
        <Button variant="destructive" onClick={()=>(setContent(<DeletePrompt id={row.original.id}/>))}>Delete</Button>
      </div>
    ),
  },
];

  return <DataTable columns={coloumns} data={data} />;
}


function DeletePrompt({id}:{id:string}){
    const onClick =()=>{
        const p = axiosCSR().delete("/address/"+id)
        axiosToast(p,()=>{})
    }

    return <div className="flex flex-col">
        <h1>Are you sure to delete this address ?</h1>
        <Button onClick={onClick}>Delete</Button>
    </div>
}