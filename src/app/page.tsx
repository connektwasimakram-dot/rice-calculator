import Navbar from "@/components/Navbar";
import Calculator from "@/components/Calculator";
import { TrendingUp, ShieldCheck, Ship, ArrowRight, CheckCircle2, Sprout } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=2938&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-luminosity"></div>
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold tracking-wide text-xs sm:text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              INDIA TO UAE CEPA CORRIDOR
            </div>

            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Reliable rice supply for <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400">
                ambitious markets.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Royal Merchant LLC connects premium Indian rice mills with buyers across the UAE. Source with confidence, model every landed cost, and move cargo with a partner who understands the corridor.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <a href="#calculator" className="group flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-1">
                Open P&L Calculator
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#services" className="flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-1 backdrop-blur-sm">
                Explore Services
              </a>
            </div>

            <div className="mt-12 flex items-center gap-6 text-sm text-slate-400 font-medium">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Direct Mill Access</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Transparent Margins</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="text-sm font-bold text-emerald-600 tracking-wider uppercase mb-3">Our Expertise</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">End-to-End Trade Solutions</h3>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">Leverage the CEPA corridor with our integrated services designed for scale and reliability.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all hover:-translate-y-2 group">
              <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-50 group-hover:scale-110 transition-all">
                <ShieldCheck className="w-8 h-8 text-slate-700 group-hover:text-emerald-600 transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Global Sourcing</h4>
              <p className="text-slate-600 leading-relaxed">Direct relationships with top-tier Indian mills. Strict quality control and compliance for non-basmati and basmati varieties.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all hover:-translate-y-2 group">
              <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-50 group-hover:scale-110 transition-all">
                <TrendingUp className="w-8 h-8 text-slate-700 group-hover:text-emerald-600 transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Financial Modeling</h4>
              <p className="text-slate-600 leading-relaxed">Transparent cost breakdowns. Use our proprietary calculator to forecast exact landed costs in AED and optimize your margins.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all hover:-translate-y-2 group">
              <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-50 group-hover:scale-110 transition-all">
                <Ship className="w-8 h-8 text-slate-700 group-hover:text-emerald-600 transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Customs & Logistics</h4>
              <p className="text-slate-600 leading-relaxed">Seamless freight forwarding from Kolkata/Mundra to Jebel Ali. We handle all documentation and UAE customs clearance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <Calculator />

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">ROYAL MERCHANT</span>
            </div>
            <p className="max-w-md text-slate-400 leading-relaxed mb-8 text-lg">
              Your trusted partner for agricultural trade, specializing in the lucrative India-UAE corridor.
            </p>
            <div className="space-y-2 font-medium">
              <p className="hover:text-white transition-colors cursor-pointer">contact@royalmerchant.com</p>
              <p className="hover:text-white transition-colors cursor-pointer">+971 50 000 0000</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:justify-end">
            <div>
              <h5 className="text-white font-bold text-lg mb-6">India Office</h5>
              <address className="not-italic text-slate-400 space-y-2 leading-relaxed">
                <p>Commercial Hub</p>
                <p>Kolkata, West Bengal</p>
                <p>India</p>
              </address>
            </div>
            <div>
              <h5 className="text-white font-bold text-lg mb-6">UAE Office</h5>
              <address className="not-italic text-slate-400 space-y-2 leading-relaxed">
                <p>Free Trade Zone</p>
                <p>Ajman</p>
                <p>United Arab Emirates</p>
              </address>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-800 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Royal Merchant LLC. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
