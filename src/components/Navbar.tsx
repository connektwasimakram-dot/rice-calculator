"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Sprout } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg py-2' : 'bg-slate-900 py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-500/20">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight block leading-none text-white">ROYAL MERCHANT</span>
              <span className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase mt-1 block">Trade & Exports</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <div
                className="relative group"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  className="text-slate-300 group-hover:text-emerald-400 px-3 py-2 text-sm font-semibold transition-colors flex items-center gap-1"
                >
                  Services
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </button>
                {dropdownOpen && (
                  <div
                    className="absolute left-0 mt-2 w-64 rounded-xl shadow-2xl bg-white ring-1 ring-slate-200 overflow-hidden transform opacity-100 scale-100 transition-all origin-top-left"
                  >
                    <div className="py-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <Link href="#services" className="block px-5 py-3 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors" role="menuitem">Global Rice Sourcing</Link>
                      <button onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })} className="block w-full text-left px-5 py-3 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors" role="menuitem">Export P&L Calculator</button>
                      <Link href="#services" className="block px-5 py-3 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors" role="menuitem">Customs Clearance & Logistics</Link>
                      <Link href="#services" className="block px-5 py-3 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors" role="menuitem">Private Label Packaging</Link>
                    </div>
                  </div>
                )}
              </div>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:-translate-y-0.5"
              >
                Contact on WhatsApp
              </a>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2 bg-slate-900 border-t border-slate-800 shadow-xl">
          <Link href="#services" onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-emerald-400 block px-3 py-3 rounded-md text-base font-medium">Global Rice Sourcing</Link>
          <button onClick={() => { document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); }} className="text-slate-300 hover:text-emerald-400 block w-full text-left px-3 py-3 rounded-md text-base font-medium">Export P&L Calculator</button>
          <Link href="#services" onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-emerald-400 block px-3 py-3 rounded-md text-base font-medium">Customs & Logistics</Link>
          <a href="https://wa.me/1234567890" className="bg-emerald-600 hover:bg-emerald-500 text-white block px-3 py-3 rounded-lg text-base font-medium mt-4 text-center shadow-lg">Contact on WhatsApp</a>
        </div>
      </div>
    </nav>
  );
}
