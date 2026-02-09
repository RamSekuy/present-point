import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, CheckCircle2, ShieldCheck, Clock } from "lucide-react";

export default function Page() {
  return (
    <main className="min-h-screen bg-linear-to-b from-indigo-600 via-indigo-500 to-muted/40 flex items-center justify-center px-6">
      <div className="max-w-6xl w-full space-y-16 py-16">
        {/* HERO */}
        <section className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-28 h-28 rounded-3xl bg-gray-200 flex items-center justify-center shadow-inner">
              <MapPin className="w-14 h-14 text-primary" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            PresentPoint
          </h1>

          <p className="max-w-2xl mx-auto text-lg">
            Tentukan lokasi bebas, lalu pengguna hanya bisa melakukan absensi di
            titik tersebut. Sistem presensi modern, fleksibel, dan akurat untuk
            sekolah, kantor, maupun event.
          </p>

          <div className="pt-4">
            <Link href="/auth">
              <Button size="lg" className="text-base px-8 py-6">
                Mulai Sekarang
              </Button>
            </Link>
          </div>
        </section>

        {/* FEATURES */}
        <section className="grid md:grid-cols-3 gap-6">
          <Card className="rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <MapPin className="w-8 h-8 text-primary" />
              <h3 className="font-semibold text-lg">Titik Bebas</h3>
              <p className="text-muted-foreground text-sm">
                Admin bisa menentukan lokasi absensi di mana saja tanpa batasan
                tempat tetap.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <CheckCircle2 className="w-8 h-8 text-primary" />
              <h3 className="font-semibold text-lg">Validasi Akurat</h3>
              <p className="text-muted-foreground text-sm">
                Sistem hanya menerima absensi jika pengguna berada tepat pada
                area yang ditentukan.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <ShieldCheck className="w-8 h-8 text-primary" />
              <h3 className="font-semibold text-lg">Anti Titip Absen</h3>
              <p className="text-muted-foreground text-sm">
                Lokasi real‑time memastikan presensi dilakukan langsung oleh
                pengguna.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl md:col-span-3">
            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-xl font-semibold">
                  Siap Digunakan Sekarang
                </h3>
                <p className="text-muted-foreground text-sm">
                  Buat titik absensi pertama Anda dan mulai mencatat kehadiran
                  dalam hitungan detik.
                </p>
              </div>

              <Link href="/auth">
                <Button size="lg">Masuk / Daftar</Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
