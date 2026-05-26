import { axiosSSR } from "@/lib/axios.ssr";
import { TPageProps } from "@/models/pageProps.model";
import { TUser } from "@/models/user.model";
import UserListTable from "../_components/userListTable";
import { TAddress } from "@/models/address.model";
import AddressUpdateForm from "@/components/form/addressUpdateForm";
import UsersSelectTable from "../_components/usersSelectTable";
// import dynamic from "next/dynamic";

export default async function Page({ params }: TPageProps) {
  const id = (await params).slug;
  const res = await axiosSSR().get(`/address/${id}`);
  const address: TAddress & { userAddressAllow: { user: TUser }[] } =
    res.data.data;
  const { data } = await axiosSSR().get(`/user?notAddressId=${id}`);

  return (
    <div className="p-6">
      <AddressUpdateForm address={address} />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Users Allowed at This Location
        </h2>
        <UserListTable users={address.userAddressAllow.map((ua) => ua.user)}>
          <UsersSelectTable addressId={id} data={data.data} />
        </UserListTable>
      </div>
    </div>
  );
}
