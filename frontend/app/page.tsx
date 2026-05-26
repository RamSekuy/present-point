import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen min-w-screen bg-slate-950 text-slate-50">
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center">
        <div className="max-w-3xl rounded-3xl border border-slate-800/80 bg-slate-900/90 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-sm">
          <h1 className="text-4xl font-semibold sm:text-5xl">Present Point</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            A simple attendance platform to manage check-ins and keep track of
            every visit. Mulai sekarang untuk masuk ke akun Anda dan mulai
            menggunakan fitur absensi dengan mudah.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/auth"
              className="inline-flex rounded-full bg-cyan-500 px-8 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Start
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
