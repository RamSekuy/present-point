import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Username } from "@/contexts/user.context";
import { CalendarMinus, History, IdCard, Scan, User } from "lucide-react";
import Link from "next/link";

const menus = [
  {
    icon: Scan,
    label: "Absen",
    url: "/attendance/scan",
    className: "bg-pink-600",
  },
  {
    icon: CalendarMinus,
    label: "Cuti",
    url: "/cuti",
    className: "bg-blue-600",
  },
  {
    icon: History,
    label: "Histori",
    url: "/attendance/history",
    className: "bg-green-600",
  },
  {
    icon: IdCard,
    label: "ID Card",
    url: "/profile/id-card",
    className: "bg-gray-600",
  },
  {
    icon: User,
    label: "Profile",
    url: "/profile/",
    className: "bg-yellow-500",
  },
];

export default function Page() {
  return (
    <>
      <section className="bg-green-500 px-2 -translate-y-12 mb-12">
        <Card className="translate-y-16">
          <CardContent>
            <p>Welcome</p>
            <h1 className="font-bold">
              <Username />
            </h1>
          </CardContent>
          <CardFooter className="flex *:*:flex *:*:flex-col *:*:h-20 *:*:aspect-square text-center justify-evenly px-4">
            {menus.map((e, i) => (
              <Link href={e.url} key={i} className="group">
                <Button className={e.className}>
                  <e.icon className="group-hover:sacle-105 transition-all" />
                  {e.label}
                </Button>
              </Link>
            ))}
          </CardFooter>
        </Card>
      </section>
      <section className="flex gap-x-4 font-bold px-4 text-2xl *:text-white justify-center *:w-full">
        <Card className="bg-green-600">
          <CardHeader className="text-md">Absen Masuk</CardHeader>
          <CardContent>Belum</CardContent>
        </Card>
        <Card className="bg-gray-500">
          <CardContent className="text-md">Absen Pulang</CardContent>
          <CardContent>Belum</CardContent>
        </Card>
      </section>
    </>
  );
}
