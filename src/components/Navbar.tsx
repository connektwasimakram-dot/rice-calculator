"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <Link href="/" className="flex items-center gap-2.5 text-white transition hover:opacity-90">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-600/20 text-emerald-400 font-semibold text-sm border border-emerald-500/30">
            RM
          </span>
          <span className="text-base font-semibold tracking-tight text-white">
            Royal Merchant
          </span>
        </Link>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="/#services" className="transition hover:text-white">
            Services
          </Link>
          <Link href="/calculator" className="text-emerald-400 transition hover:text-emerald-300">
            Quotation Desk
          </Link>
          <Link href="/#corridor" className="transition hover:text-white">
            Corridor Specifications
          </Link>
          <Link href="/#contact" className="transition hover:text-white">
            Offices & Contact
          </Link>
        </nav>

        {/* Zone 3: Primary action */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/calculator"
            className="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-emerald-500 active:scale-[0.99] whitespace-nowrap"
          >
            Launch Calculator
            <ArrowUpRight className="h-3.5 w-3.5 opacity-80" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-900 hover:text-white focus:outline-none"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {isOpen && (
        <div className="border-b border-slate-800 bg-slate-900 px-4 py-4 md:hidden">
          <div className="flex flex-col space-y-3">
            <Link
              href="/#services"
              onClick={() => setIsOpen(false)}
              className="px-2 py-1.5 text-sm font-medium text-slate-300 hover:text-white"
            >
              Services
            </Link>
            <Link
              href="/calculator"
              onClick={() => setIsOpen(false)}
              className="px-2 py-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300"
            >
              Quotation Desk
            </Link>
            <Link
              href="/#corridor"
              onClick={() => setIsOpen(false)}
              className="px-2 py-1.5 text-sm font-medium text-slate-300 hover:text-white"
            >
              Corridor Specifications
            </Link>
            <Link
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="px-2 py-1.5 text-sm font-medium text-slate-300 hover:text-white"
            >
              Offices & Contact
            </Link>
            <div className="pt-2">
              <Link
                href="/calculator"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500"
              >
                Launch Calculator
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
