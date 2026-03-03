"use client";
import UserUpdateForm from "@/components/form/userUpdateForm";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/contexts/user.context";
import { imgURL } from "@/lib/imgURL";
import Image from "next/image";

export default function Page() {
  const { user } = useUser();
  if (!user) return <></>;
  return (
    <>
      <section>
        <div className="relative my-10 w-64 mx-auto aspect-square rounded-full overflow-hidden">
          <Image
            src={imgURL(user.imageId)}
            alt="avatar"
            fill
            objectFit="fill"
            unoptimized
          />
        </div>
      </section>
      <section className="px-4">
        <Card>
          <CardContent>
            <UserUpdateForm />
          </CardContent>
        </Card>
      </section>
    </>
  );
}
