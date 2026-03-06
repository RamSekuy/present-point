"use client";
import Loading from "@/components/loading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useUser } from "@/contexts/user.context";
import { imgURL } from "@/lib/imgURL";
import Image from "next/image";

export default function Page() {
  const { user } = useUser();
  if (!user) return <Loading />;
  return (
    <>
      <section className="p-4">
        <Card className="w-max mx-auto">
          <CardHeader className="font-bold text-center border-b-2 border-black pb-4">
            ID CARD
          </CardHeader>
          <CardContent className="flex justify-center items-center gap-2">
            <div className="relative my-4 md:my-10 w-24 mx-auto aspect-square rounded-full overflow-hidden">
              <Image
                src={imgURL(user.imageId)}
                alt="avatar"
                fill
                objectFit="fill"
                unoptimized
              />
            </div>
            <div className="flex flex-col">
              <div className="py-2">
                <h1>Name: {user.name}</h1>
              </div>
              <div className="py-2">
                <div className="mx-auto relative w-20 aspect-square border-2 border-black">
                  <Image
                    src={"/profile/qr"}
                    alt="QR"
                    fill
                    objectFit="content"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
