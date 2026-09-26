import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Scale, Anchor, FileSpreadsheet, Building2, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-32">
        {/* Subtle architectural gradient mesh background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Unboxed metadata indicator */}
            <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-slate-400">
              <span className="text-emerald-400">Agricultural Trade Desk</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>India–UAE Maritime Corridor</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>CEPA Compliant</span>
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-6xl text-balance">
              Reliable rice supply for institutional buyers and traders.
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-300 max-w-2xl">
              Royal Merchant coordinates direct-from-mill agricultural sourcing in India with structured landed CIF and warehousing logistics in Dubai and the Northern Emirates.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 active:scale-[0.99]"
              >
                Open Landed Cost Calculator
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#corridor"
                className="inline-flex items-center justify-center rounded-md border border-slate-700 bg-slate-900/60 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 hover:text-white"
              >
                Corridor Specifications
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
              <div>
                <span className="block text-2xl font-semibold text-white font-mono tabular-nums">24–26 MT</span>
                <span className="mt-1 block text-xs text-slate-400">Payload per 20ft container</span>
              </div>
              <div>
                <span className="block text-2xl font-semibold text-emerald-400 font-mono tabular-nums">INR / AED</span>
                <span className="mt-1 block text-xs text-slate-400">Direct FX cost parity</span>
              </div>
              <div>
                <span className="block text-2xl font-semibold text-white font-mono tabular-nums">18 & 50 kg</span>
                <span className="mt-1 block text-xs text-slate-400">GCC packaging standards</span>
              </div>
              <div>
                <span className="block text-2xl font-semibold text-white font-mono tabular-nums">Jebel Ali</span>
                <span className="mt-1 block text-xs text-slate-400">Primary discharge hub</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
              Commercial Operations
            </span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl text-balance">
              End-to-end commercial solutions along the trade corridor.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              We eliminate quotation opacity by modeling ex-mill procurement, ocean transport, port clearances, and warehouse landing costs.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="group rounded-xl border border-slate-200 bg-slate-50/50 p-8 transition hover:border-slate-300 hover:bg-white hover:shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-900 text-white">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
              </div>
              <span className="mt-6 block text-xs font-mono text-slate-500 uppercase tracking-wider">
                01. Sourcing
              </span>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">Direct Mill Origination</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Direct procurement contracts with verified processing mills in West Bengal, Haryana, and Punjab. Continuous moisture, grain length, and broken percentage inspections.
              </p>
            </div>

            <div className="group rounded-xl border border-slate-200 bg-slate-50/50 p-8 transition hover:border-slate-300 hover:bg-white hover:shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-900 text-white">
                <Scale className="h-5 w-5 text-emerald-400" />
              </div>
              <span className="mt-6 block text-xs font-mono text-slate-500 uppercase tracking-wider">
                02. Modeling
              </span>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">Multi-Currency Financial Modeling</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Real-time conversion of INR ex-mill rates into CFR Jebel Ali and delivered UAE warehouse figures. Understand exact per-kilogram and 18kg wholesale pricing before signing contracts.
              </p>
            </div>

            <div className="group rounded-xl border border-slate-200 bg-slate-50/50 p-8 transition hover:border-slate-300 hover:bg-white hover:shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-900 text-white">
                <Anchor className="h-5 w-5 text-emerald-400" />
              </div>
              <span className="mt-6 block text-xs font-mono text-slate-500 uppercase tracking-wider">
                03. Logistics
              </span>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">Maritime Freight & Clearance</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Dedicated container slots on feeder lines from Kolkata and Mundra ports to Jebel Ali. Full handling of UAE phytosanitary approvals, municipal clearance, and bill of lading transfers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Corridor Specifications */}
      <section id="corridor" className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                Corridor Architecture
              </span>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl text-balance">
                Optimized for the India–UAE Comprehensive Economic Partnership.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                The trade corridor between Indian agricultural belts and UAE consumption centers relies on disciplined timeline management, container payload optimization, and transparent FX buffers.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">CEPA Preferential Rules of Origin</h4>
                    <p className="text-xs leading-relaxed text-slate-600">Eligible certificates of origin reduce or eliminate tariff friction under bilateral bilateral treaties.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">Standardized Packaging Configurations</h4>
                    <p className="text-xs leading-relaxed text-slate-600">PP, BOPP, and non-woven bags tailored for GCC retail supermarkets and institutional bulk caterers.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">Guaranteed Container Slot Allocations</h4>
                    <p className="text-xs leading-relaxed text-slate-600">Fixed shipping schedules minimizing transit delays and port demurrage risks.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xs">
              <h3 className="text-base font-semibold text-slate-900 border-b border-slate-100 pb-4">
                Operational Reference Benchmarks
              </h3>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Origin Gateways</span>
                  <span className="font-medium text-slate-900">Kolkata (SMP Port) / Mundra</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Destination Hub</span>
                  <span className="font-medium text-slate-900">Jebel Ali Port (Dubai)</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Transit Time</span>
                  <span className="font-medium text-slate-900 font-mono tabular-nums">7–14 Days (Vessel dependent)</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Container Size</span>
                  <span className="font-medium text-slate-900 font-mono tabular-nums">20ft Heavy Tested (24 MT standard)</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Standard Packaging</span>
                  <span className="font-medium text-slate-900 font-mono tabular-nums">50 kg master / 18 kg wholesale</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-500">Payment Modalities</span>
                  <span className="font-medium text-slate-900">LC at sight / CAD / Advance</span>
                </div>
              </div>

              <div className="mt-8 rounded-lg bg-slate-50 p-4 border border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-medium text-slate-500">Quotation Format</span>
                    <span className="text-sm font-semibold text-slate-900">Client-Ready PDF Export</span>
                  </div>
                  <Link
                    href="/calculator"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    Open tool →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated calculator banner */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-slate-900 p-8 sm:p-12 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-8 border border-slate-800">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Quotation Workspace
              </span>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl text-balance">
                Know the exact landed economics before issuing a commercial quote.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Simulate exchange rates, ocean freight fluctuation, inland transport, and landed margins per bag and metric tonne with our commercial calculator.
              </p>
            </div>
            <Link
              href="/calculator"
              className="shrink-0 inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 active:scale-[0.99] whitespace-nowrap"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Launch Export Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2.5 text-white">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600/20 text-emerald-400 font-semibold text-xs border border-emerald-500/30">
                  RM
                </span>
                <span className="text-base font-semibold tracking-tight text-white">
                  Royal Merchant LLC
                </span>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-slate-400 max-w-sm">
                Agricultural commodities trading house specializing in institutional rice supply and freight corridors between India and the United Arab Emirates.
              </p>
              <div className="mt-6 text-xs text-slate-400 space-y-1">
                <p>Commercial Inquiries: <span className="text-slate-200">contact@royalmerchant.com</span></p>
                <p>Trade Desk Phone: <span className="text-slate-200">+971 50 000 0000</span></p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-emerald-400" />
                Regional Operations
              </h4>
              <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <strong className="block text-slate-300 font-medium">India Office</strong>
                  <address className="not-italic text-slate-500 mt-1 space-y-0.5">
                    <p>Commercial Hub</p>
                    <p>Kolkata, West Bengal</p>
                    <p>Republic of India</p>
                  </address>
                </div>
                <div>
                  <strong className="block text-slate-300 font-medium">UAE Office</strong>
                  <address className="not-italic text-slate-500 mt-1 space-y-0.5">
                    <p>Free Trade Zone</p>
                    <p>Ajman / Dubai</p>
                    <p>United Arab Emirates</p>
                  </address>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Desk Navigation
              </h4>
              <div className="mt-4 flex flex-col space-y-2 text-xs">
                <Link href="/calculator" className="hover:text-white transition">
                  Export P&L Calculator
                </Link>
                <a href="#services" className="hover:text-white transition">
                  Commercial Services
                </a>
                <a href="#corridor" className="hover:text-white transition">
                  Corridor Specifications
                </a>
                <a href="https://wa.me/?text=Inquiry%20regarding%20Royal%20Merchant%20rice%20export%20corridor" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition">
                  Connect on WhatsApp Desk ↗
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-900 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>&copy; {new Date().getFullYear()} Royal Merchant LLC. All commercial rights reserved.</p>
            <p className="text-slate-400">
              Corridor: SMP / Mundra Port to Jebel Ali Port (AEJEA)
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
