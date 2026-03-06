import { axiosSSR } from "@/lib/axios.ssr";
import { TPageProps } from "@/models/pageProps.model";
import { TUser } from "@/models/user.model";
import UserListTable from "../_components/userListTable";
import { TAddress } from "@/models/address.model";

export default async function Page({ params }: TPageProps) {
  const id = (await params).slug;
  const res = await axiosSSR().get("/address/" + id);
  const address: TAddress & { userAddressAllow: { user: TUser }[] } =
    res.data.data;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Detail Address</h1>
      <div className="mb-6 p-4 border rounded bg-gray-50">
        <div>
          <span className="font-semibold">Nama:</span> {address.name}
        </div>
        <div>
          <span className="font-semibold">Detail:</span> {address.detail}
        </div>
        <div>
          <span className="font-semibold">Latitude:</span> {address.latitude}
        </div>
        <div>
          <span className="font-semibold">Longitude:</span> {address.longitude}
        </div>
        <div>
          <span className="font-semibold">Radius:</span> {address.radius} m
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-2">Daftar User yang Diizinkan</h2>

      <UserListTable users={address.userAddressAllow.map((ua) => ua.user)} />
    </div>
  );
}
