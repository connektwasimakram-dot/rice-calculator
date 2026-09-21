"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Sprout } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-[#003366] text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="bg-[#28A745] p-2 rounded-lg">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight block leading-tight">ROYAL MERCHANT LLC</span>
              <span className="text-[10px] text-gray-300 font-medium tracking-wider uppercase">Agricultural Trade & Exports</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <div className="relative">
                <button
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                  className="hover:text-[#28A745] px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1"
                >
                  Services
                  <ChevronDown className="w-4 h-4" />
                </button>
                {dropdownOpen && (
                  <div
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  >
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <Link href="#services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Global Rice Sourcing</Link>
                      <button onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Export P&L Calculator</button>
                      <Link href="#services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Customs Clearance & UAE Logistics</Link>
                      <Link href="#services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Private Label Packaging</Link>
                    </div>
                  </div>
                )}
              </div>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#28A745] hover:bg-[#218838] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
              >
                Contact on WhatsApp
              </a>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-[#002244] focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#002244]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="#services" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Global Rice Sourcing</Link>
            <button onClick={() => { document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); }} className="text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Export P&L Calculator</button>
            <Link href="#services" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Customs & Logistics</Link>
            <Link href="#services" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Private Label</Link>
            <a href="https://wa.me/1234567890" className="bg-[#28A745] text-white block px-3 py-2 rounded-md text-base font-medium mt-4 text-center">Contact on WhatsApp</a>
          </div>
        </div>
      )}
    </nav>
  );
}
