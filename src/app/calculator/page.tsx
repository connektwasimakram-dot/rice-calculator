import Link from "next/link";
import Calculator from "@/components/Calculator";

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-[#f4f6f9]">
      <div className="bg-[#00213f] px-4 py-2 text-center text-xs text-white/70">
        India → UAE agricultural trade corridor · INR · AED · USD quotation desk
      </div>
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 text-[#003366]">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#003366] text-xl text-white">
              🌾
            </span>
            <span>
              <strong className="block text-sm tracking-[0.08em]">ROYAL MERCHANT LLC</strong>
              <small className="mt-1 block text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500">
                Export quotation desk
              </small>
            </span>
          </Link>
          <Link href="/" className="text-sm font-bold text-[#003366] hover:text-[#28A745]">
            ← Back to home
          </Link>
        </div>
      </header>
      <section className="bg-[#003366] px-4 py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl">
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#a4ddb0]">
            <span className="h-0.5 w-6 bg-[#28A745]" />
            Commercial tool
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">
            Build your rice export quotation in seconds.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Model the complete India–UAE shipment economics, compare target pricing and download
            a client-ready report from one dedicated calculator.
          </p>
        </div>
      </section>
      <Calculator />
    </main>
  );
}