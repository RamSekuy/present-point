import QrScanner from "@/components/qrScanner";

export default function Page() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <QrScanner width={500} />
    </div>
  );
}
