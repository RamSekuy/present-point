import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { AutoRedirect } from "../_components/AutoRedirect";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { axiosCSR } from "@/lib/axios.csr";

export default async function VerifyEmailPage({
  params,
}: {
  params: { token: string };
}) {
  await new Promise((resolve) => {
    try {
      const decode = jwtDecode(params.token);
      resolve(decode);
    } catch (error) {
      redirect("/auth");
    }
  });

  await axiosCSR().get(`/users/v1/${params.token}`);

  return (
    <AutoRedirect>
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold sm:text-3xl">PresentPoint</h2>
        <p className="text-lg sm:text-xl">Successed Verifying your account</p>

        <Button asChild>
          <Link href="/auth">Redirect Login</Link>
        </Button>
      </div>
    </AutoRedirect>
  );
}
