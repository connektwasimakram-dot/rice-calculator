import Navbar from "@/components/Navbar";
import Calculator from "@/components/Calculator";
import { TrendingUp, ShieldCheck, Ship } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-[#003366] text-white py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=2938&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[#28A745] font-bold tracking-wider uppercase text-sm flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-[#28A745]"></span>
              India to UAE, Intelligently Traded
            </span>
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
              Reliable rice supply for <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#28A745] to-[#73df8d]">ambitious markets.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
              Royal Merchant LLC connects premium Indian rice mills with buyers across the UAE. Source with confidence, model every landed cost, and move cargo with a partner who understands the corridor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#calculator" className="bg-[#28A745] hover:bg-[#218838] text-white px-8 py-4 rounded-lg font-bold text-lg text-center transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Open P&L Calculator
              </a>
              <a href="#services" className="bg-transparent border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-lg font-bold text-lg text-center transition-all">
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#003366]">End-to-End Trade Solutions</h2>
            <p className="mt-4 text-lg text-gray-600">Leverage the CEPA corridor with our integrated services.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-[#003366]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Global Sourcing</h3>
              <p className="text-gray-600 leading-relaxed">Direct relationships with top-tier Indian mills. Strict quality control and compliance for non-basmati and basmati varieties.</p>
            </div>

            <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-[#28A745]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Financial Modeling</h3>
              <p className="text-gray-600 leading-relaxed">Transparent cost breakdowns. Use our proprietary calculator to forecast exact landed costs in AED and optimize your margins.</p>
            </div>

            <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Ship className="w-8 h-8 text-[#003366]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customs & Logistics</h3>
              <p className="text-gray-600 leading-relaxed">Seamless freight forwarding from Kolkata/Mundra to Jebel Ali. We handle all documentation and UAE customs clearance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <Calculator />

      {/* Footer */}
      <footer className="bg-[#0a192f] text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
          <div>
            <h4 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
              ROYAL MERCHANT LLC
            </h4>
            <p className="max-w-xs text-sm leading-relaxed mb-6">
              Your trusted partner for agricultural trade, specializing in the India-UAE corridor.
            </p>
            <div className="text-sm">
              <p>Email: contact@royalmerchant.com</p>
              <p>Phone: +971 50 000 0000</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h5 className="text-white font-bold mb-4">India Office</h5>
              <address className="not-italic text-sm text-gray-400 space-y-1">
                <p>Commercial Hub</p>
                <p>Kolkata, West Bengal</p>
                <p>India</p>
              </address>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">UAE Office</h5>
              <address className="not-italic text-sm text-gray-400 space-y-1">
                <p>Free Trade Zone</p>
                <p>Ajman</p>
                <p>United Arab Emirates</p>
              </address>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/10 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Royal Merchant LLC. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
