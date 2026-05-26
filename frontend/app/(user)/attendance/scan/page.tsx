import { axiosSSR } from "@/lib/axios.ssr";
import { TAddress } from "@/models/address.model";
import Link from "next/link";
import { MapPin, ArrowRight, ScanLine, Radar } from "lucide-react";

async function getAddresses() {
  try {
    const { data } = await axiosSSR().get("/address");
    return data.data as TAddress[];
  } catch (error) {
    console.error("Failed to fetch addresses:", error);
    return [];
  }
}

export default async function ScanPage() {
  const addresses = await getAddresses();

  return (
    <div className="min-h-screen w-full bg-neutral-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* HEADER */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-sm mb-4">
            <ScanLine size={16} />
            Attendance Scanner
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Pilih Lokasi Scan
          </h1>

          <p className="text-neutral-500 mt-2">
            Pilih lokasi untuk memulai proses attendance
          </p>
        </div>

        {/* EMPTY */}
        {addresses.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-3xl p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-neutral-500" />
            </div>

            <h2 className="text-xl font-semibold mb-2">Tidak ada lokasi</h2>

            <p className="text-neutral-500">
              Belum ada lokasi yang tersedia untuk scan
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[...addresses, ...addresses, ...addresses].map((address) => (
              <Link
                key={address.id}
                href={`/attendance/scan/${address.id}`}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-neutral-200
                  bg-white
                  p-5
                  transition-all
                  hover:-translate-y-1
                  hover:border-black
                  hover:shadow-2xl
                "
              >
                {/* TOP */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-start gap-3">
                    <div
                      className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-black
                        text-white
                        flex
                        items-center
                        justify-center
                        shrink-0
                      "
                    >
                      <MapPin size={20} />
                    </div>

                    <div>
                      <h2 className="font-bold text-lg leading-tight">
                        {address.name}
                      </h2>

                      <p className="text-sm text-neutral-500 mt-1 line-clamp-2">
                        {address.detail}
                      </p>
                    </div>
                  </div>
                </div>

                {/* INFO */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">Latitude</span>

                    <span className="font-medium">
                      {address.latitude.toFixed(4)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">Longitude</span>

                    <span className="font-medium">
                      {address.longitude.toFixed(4)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">Radius</span>

                    <div className="flex items-center gap-1 font-medium">
                      <Radar size={14} />
                      {address.radius}m
                    </div>
                  </div>
                </div>

                {/* BUTTON */}
                <div
                  className="
                    mt-6
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    bg-neutral-100
                    px-4
                    py-3
                    transition-all
                    group-hover:bg-black
                    group-hover:text-white
                  "
                >
                  <span className="font-medium">Mulai Scan</span>

                  <ArrowRight
                    size={18}
                    className="
                      transition-transform
                      group-hover:translate-x-1
                    "
                  />
                </div>

                {/* HOVER EFFECT */}
                <div
                  className="
                    absolute
                    inset-0
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    pointer-events-none
                    bg-linear-to-br
                    from-transparent
                    via-transparent
                    to-black/5
                  "
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
