import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { AutoRedirect } from "../_components/AutoRedirect";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { axiosCSR } from "@/lib/axios.csr";
import { Card, CardContent } from "@/components/ui/card";

export default async function VerifyEmailPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const token = (await params).token;
  await new Promise((resolve) => {
    try {
      const decode = jwtDecode(token);
      resolve(decode);
    } catch (error) {
      redirect("/auth");
    }
  });

  await axiosCSR().post(`/auth/v1/${token}`);

  return (
    <AutoRedirect>
      <Card className="p-8">
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-bold sm:text-3xl">PresentPoint</h2>
            <p className="text-lg sm:text-xl">
              Successed Verifying your account
            </p>

            <Button asChild>
              <Link href="/auth">Redirect Login</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </AutoRedirect>
  );
}
