import Link from "next/link";
import Calculator from "@/components/Calculator";
import { ArrowLeft } from "lucide-react";

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top micro banner */}
      <div className="bg-slate-950 px-4 py-2 text-center text-xs font-medium tracking-wide text-slate-400 border-b border-slate-800">
        <span className="text-emerald-400 font-semibold">India → UAE Trade Corridor</span>
        <span className="mx-2 text-slate-600">·</span>
        <span>INR / AED / USD Quotation & Margin Desk</span>
      </div>

      {/* Main navigation header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5 text-slate-900 transition hover:opacity-90">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-600/10 text-emerald-700 font-semibold text-sm border border-emerald-500/20">
              RM
            </span>
            <div>
              <strong className="block text-sm font-semibold tracking-tight text-slate-900">
                ROYAL MERCHANT
              </strong>
              <span className="block text-[11px] font-medium text-slate-500">
                Commercial Export Desk
              </span>
            </div>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Overview
          </Link>
        </div>
      </header>

      {/* Header section */}
      <section className="relative overflow-hidden bg-slate-900 px-4 py-12 text-white sm:py-16 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.06),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Commercial Financial Tool
          </div>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-5xl text-balance">
            Export quotation and landed cost calculator.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
            Simulate complete shipment economics from Indian ex-mill rates to delivered UAE wholesale figures. Calculate exact margins, per-kilogram landed costs, and download an official client-ready PDF quotation.
          </p>
        </div>
      </section>

      {/* Calculator Body */}
      <Calculator />
    </main>
  );
}
