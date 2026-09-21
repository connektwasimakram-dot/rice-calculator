"use client";

import { useState, useRef } from "react";
import { Download, Share2, Calculator as CalcIcon, TrendingUp } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Calculator() {
  const printRef = useRef<HTMLDivElement>(null);

  const [inputs, setInputs] = useState({
    usdInr: 95.90,
    aedInr: 26.09,
    cargoMt: 24,
    bagSizeKg: 50,
    exMillPrice: 33,
    exMillCurrency: 'INR',
    packaging: 18,
    packagingCurrency: 'INR',
    inlandLogistics: 68500,
    inlandLogisticsCurrency: 'INR',
    oceanFreight: 500,
    oceanFreightCurrency: 'USD',
    uaePort: 3246,
    uaePortCurrency: 'AED',
    targetSellingPrice: 106,
    targetSellingCurrency: 'AED',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'number') {
      setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setInputs((prev) => ({ ...prev, [name]: value }));
    }
  };

  const convertToInr = (amount: number, currency: string) => {
    switch (currency) {
      case 'USD': return amount * inputs.usdInr;
      case 'AED': return amount * inputs.aedInr;
      case 'INR': default: return amount;
    }
  };

  // Calculations
  const totalBags = (inputs.cargoMt * 1000) / inputs.bagSizeKg;

  const exMillInr = convertToInr(inputs.exMillPrice, inputs.exMillCurrency);
  const totalExMillInr = exMillInr * inputs.cargoMt * 1000;

  const packagingInr = convertToInr(inputs.packaging, inputs.packagingCurrency);
  const totalPackagingInr = packagingInr * totalBags;

  const inlandLogisticsInr = convertToInr(inputs.inlandLogistics, inputs.inlandLogisticsCurrency);
  const fobCostInr = totalExMillInr + totalPackagingInr + inlandLogisticsInr;

  const oceanFreightInr = convertToInr(inputs.oceanFreight, inputs.oceanFreightCurrency);
  const cifCostInr = fobCostInr + oceanFreightInr;
  const cifCostUsd = cifCostInr / inputs.usdInr;
  const cifCostPerMtUsd = cifCostUsd / inputs.cargoMt;

  const uaePortInr = convertToInr(inputs.uaePort, inputs.uaePortCurrency);

  const totalLandedCostInr = cifCostInr + uaePortInr;
  const totalLandedCostAed = totalLandedCostInr / inputs.aedInr;
  const landedCostPerBagAed = totalLandedCostAed / totalBags;

  const targetSellingPriceInr = convertToInr(inputs.targetSellingPrice, inputs.targetSellingCurrency);
  const targetSellingPriceAed = targetSellingPriceInr / inputs.aedInr;
  const totalRevenueAed = targetSellingPriceAed * totalBags;
  const totalRevenueInr = totalRevenueAed * inputs.aedInr;

  const netProfitInr = totalRevenueInr - totalLandedCostInr;
  const netProfitAed = netProfitInr / inputs.aedInr;
  const netProfitUsd = netProfitInr / inputs.usdInr;
  const roiPercent = (netProfitInr / totalLandedCostInr) * 100;

  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(16, 185, 129); // Emerald 500
    doc.text('ROYAL MERCHANT LLC', 20, 20);

    doc.setFontSize(14);
    doc.setTextColor(51, 65, 85); // Slate 700
    doc.text('Export P&L Quotation (India to UAE)', 20, 30);

    doc.setLineWidth(0.5);
    doc.setDrawColor(203, 213, 225); // Slate 300
    doc.line(20, 35, 190, 35);

    // Cargo Details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Cargo Specifications', 20, 45);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Cargo: ${inputs.cargoMt} MT`, 20, 55);
    doc.text(`Bag Size: ${inputs.bagSizeKg} kg`, 20, 65);

    // Cost Breakdown
    doc.setFont('helvetica', 'bold');
    doc.text('Cost Breakdown', 120, 45);
    doc.setFont('helvetica', 'normal');
    doc.text(`Ex-Mill Price: ${inputs.exMillPrice} ${inputs.exMillCurrency}/kg`, 120, 55);
    doc.text(`Packaging: ${inputs.packaging} ${inputs.packagingCurrency}/bag`, 120, 65);
    doc.text(`Inland Logistics: ${inputs.inlandLogistics} ${inputs.inlandLogisticsCurrency}`, 120, 75);
    doc.text(`Ocean Freight: ${inputs.oceanFreight} ${inputs.oceanFreightCurrency}`, 120, 85);
    doc.text(`UAE Port/Clearance: ${inputs.uaePort} ${inputs.uaePortCurrency}`, 120, 95);

    doc.line(20, 105, 190, 105);

    // Summary
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('P&L Summary', 20, 115);
    doc.setFontSize(12);

    doc.setFont('helvetica', 'normal');
    doc.text('CIF Port Price / MT:', 20, 125);
    doc.setFont('helvetica', 'bold');
    doc.text(`$${cifCostPerMtUsd.toFixed(2)}`, 80, 125);

    doc.setFont('helvetica', 'normal');
    doc.text('Total Landed Cost:', 20, 135);
    doc.setFont('helvetica', 'bold');
    doc.text(`${totalLandedCostAed.toFixed(0)} AED`, 80, 135);

    doc.setFont('helvetica', 'normal');
    doc.text('Landed Cost / Bag:', 20, 145);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(16, 185, 129); // Emerald 500
    doc.text(`${landedCostPerBagAed.toFixed(2)} AED`, 80, 145);

    doc.setTextColor(51, 65, 85); // Slate 700
    doc.setFont('helvetica', 'normal');
    doc.text('Target Selling Price:', 20, 155);
    doc.setFont('helvetica', 'bold');
    doc.text(`${inputs.targetSellingPrice} ${inputs.targetSellingCurrency} / bag`, 80, 155);

    doc.setFont('helvetica', 'normal');
    doc.text('ROI:', 20, 165);
    doc.setFont('helvetica', 'bold');
    if (roiPercent >= 0) {
      doc.setTextColor(16, 185, 129);
    } else {
      doc.setTextColor(239, 68, 68);
    }
    doc.text(`${roiPercent.toFixed(2)}%`, 80, 165);

    // Final Profit
    doc.setFillColor(241, 245, 249); // Slate 100
    doc.rect(20, 175, 170, 30, 'F');
    doc.setTextColor(15, 23, 42); // Slate 900
    doc.setFontSize(16);
    doc.text('Net Profit / Container', 30, 185);
    doc.setFontSize(20);
    doc.setTextColor(16, 185, 129); // Emerald 500
    doc.text(`${netProfitAed.toFixed(0)} AED`, 30, 197);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // Slate 500
    doc.setFont('helvetica', 'normal');
    doc.text(`Exchange Rates: 1 USD = ${inputs.usdInr} INR | 1 AED = ${inputs.aedInr} INR`, 20, 220);
    doc.text('Generated via Royal Merchant LLC Calculator.', 20, 230);

    doc.save("export-quotation.pdf");
  };

  const handleShareWhatsApp = () => {
    const text = `*Export P&L Summary (India to UAE)*\n\nCargo: ${inputs.cargoMt} MT\nLanded Cost/Bag: ${landedCostPerBagAed.toFixed(2)} AED\nTarget Price/Bag: ${inputs.targetSellingPrice} ${inputs.targetSellingCurrency}\n\n*Estimated Profit: ${netProfitAed.toFixed(2)} AED*\nROI: ${roiPercent.toFixed(2)}%\n\nGenerated via Royal Merchant LLC.`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="calculator" className="py-24 bg-slate-50 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-2xl mb-6">
            <CalcIcon className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Export P&L Calculator</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">Model your landed costs and estimate margins instantly with our financial dashboard.</p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100" ref={printRef}>
          <div className="p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

              {/* Inputs */}
              <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-bold text-slate-900">Variables & Costs</h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Live Updating</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Currency Rates */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                    <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Currency Rates</h4>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1">USD/INR</label>
                      <input type="number" name="usdInr" value={inputs.usdInr} onChange={handleInputChange} className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-3 transition-colors bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1">AED/INR</label>
                      <input type="number" name="aedInr" value={inputs.aedInr} onChange={handleInputChange} className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-3 transition-colors bg-white" />
                    </div>
                  </div>

                  {/* Cargo Details */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                    <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Cargo Specs</h4>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1">Total Cargo (MT)</label>
                      <input type="number" name="cargoMt" value={inputs.cargoMt} onChange={handleInputChange} className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-3 transition-colors bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1 flex justify-between">
                        Ex-Mill Price (/kg)
                        <select name="exMillCurrency" value={inputs.exMillCurrency} onChange={handleInputChange} className="text-xs bg-transparent border-none text-emerald-600 font-bold p-0 focus:ring-0">
                          <option value="INR">INR</option>
                          <option value="USD">USD</option>
                          <option value="AED">AED</option>
                        </select>
                      </label>
                      <input type="number" name="exMillPrice" value={inputs.exMillPrice} onChange={handleInputChange} className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-3 transition-colors bg-white" />
                    </div>
                  </div>

                  {/* Logistics */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-4 sm:col-span-2 grid sm:grid-cols-2 gap-4">
                    <div className="col-span-2"><h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-1">Logistics & Packaging</h4></div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1 flex justify-between">
                        Packaging (/bag)
                        <select name="packagingCurrency" value={inputs.packagingCurrency} onChange={handleInputChange} className="text-xs bg-transparent border-none text-emerald-600 font-bold p-0 focus:ring-0">
                          <option value="INR">INR</option>
                          <option value="USD">USD</option>
                          <option value="AED">AED</option>
                        </select>
                      </label>
                      <input type="number" name="packaging" value={inputs.packaging} onChange={handleInputChange} className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-3 transition-colors bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1 flex justify-between">
                        Inland Logistics
                        <select name="inlandLogisticsCurrency" value={inputs.inlandLogisticsCurrency} onChange={handleInputChange} className="text-xs bg-transparent border-none text-emerald-600 font-bold p-0 focus:ring-0">
                          <option value="INR">INR</option>
                          <option value="USD">USD</option>
                          <option value="AED">AED</option>
                        </select>
                      </label>
                      <input type="number" name="inlandLogistics" value={inputs.inlandLogistics} onChange={handleInputChange} className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-3 transition-colors bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1 flex justify-between">
                        Ocean Freight
                        <select name="oceanFreightCurrency" value={inputs.oceanFreightCurrency} onChange={handleInputChange} className="text-xs bg-transparent border-none text-emerald-600 font-bold p-0 focus:ring-0">
                          <option value="USD">USD</option>
                          <option value="INR">INR</option>
                          <option value="AED">AED</option>
                        </select>
                      </label>
                      <input type="number" name="oceanFreight" value={inputs.oceanFreight} onChange={handleInputChange} className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-3 transition-colors bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1 flex justify-between">
                        UAE Port/Clearance
                        <select name="uaePortCurrency" value={inputs.uaePortCurrency} onChange={handleInputChange} className="text-xs bg-transparent border-none text-emerald-600 font-bold p-0 focus:ring-0">
                          <option value="AED">AED</option>
                          <option value="USD">USD</option>
                          <option value="INR">INR</option>
                        </select>
                      </label>
                      <input type="number" name="uaePort" value={inputs.uaePort} onChange={handleInputChange} className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-3 transition-colors bg-white" />
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-emerald-50/50 border-2 border-emerald-100">
                  <label className="block text-sm font-bold text-emerald-800 uppercase tracking-wide mb-2 flex justify-between items-center">
                    Target Selling Price (/ 50kg bag)
                    <select name="targetSellingCurrency" value={inputs.targetSellingCurrency} onChange={handleInputChange} className="text-sm bg-transparent border-none text-emerald-700 font-bold p-0 focus:ring-0 uppercase">
                      <option value="AED">AED</option>
                      <option value="USD">USD</option>
                      <option value="INR">INR</option>
                    </select>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 font-bold">{inputs.targetSellingCurrency}</span>
                    <input type="number" name="targetSellingPrice" value={inputs.targetSellingPrice} onChange={handleInputChange} className="block w-full rounded-xl border-emerald-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-xl p-4 pl-16 font-bold bg-white text-emerald-900 transition-colors" />
                  </div>
                </div>
              </div>

              {/* Outputs */}
              <div className="lg:col-span-5 flex flex-col h-full">
                <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl flex-grow flex flex-col justify-between relative overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-8">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-xl font-bold text-white">P&L Summary</h3>
                    </div>

                    <div className="space-y-5">
                      <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
                        <span className="text-slate-400 font-medium">CIF Port Price / MT</span>
                        <span className="font-bold text-white text-lg">${cifCostPerMtUsd.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
                        <span className="text-slate-400 font-medium">Total Landed Cost</span>
                        <span className="font-bold text-white text-lg">{totalLandedCostAed.toFixed(0)} <span className="text-xs text-slate-500 font-normal">AED</span></span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
                        <span className="text-slate-400 font-medium">Landed Cost / Bag</span>
                        <span className="font-bold text-emerald-400 text-xl">{landedCostPerBagAed.toFixed(2)} <span className="text-xs text-emerald-600/80 font-normal">AED</span></span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
                        <span className="text-slate-400 font-medium">ROI</span>
                        <span className={`font-bold text-xl ${roiPercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{roiPercent.toFixed(2)}%</span>
                      </div>
                    </div>

                    <div className="mt-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl p-6 shadow-lg shadow-emerald-500/20 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                      <div className="relative z-10">
                        <span className="block text-xs text-emerald-100 uppercase tracking-widest font-bold mb-2 opacity-90">Net Profit / Container</span>
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="block text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{netProfitAed.toFixed(0)}</span>
                          <span className="text-xl font-medium text-emerald-100">AED</span>
                        </div>

                        <div className="flex gap-4 text-xs font-semibold bg-black/20 p-3 rounded-xl inline-flex backdrop-blur-sm">
                          <span className="text-white">{netProfitInr.toFixed(0)} INR</span>
                          <span className="text-emerald-300">|</span>
                          <span className="text-white">${netProfitUsd.toFixed(0)} USD</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <button onClick={handleExportPDF} className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 px-4 py-4 rounded-xl font-bold transition-all shadow-sm">
                    <Download className="w-5 h-5" />
                    Export PDF
                  </button>
                  <button onClick={handleShareWhatsApp} className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-4 rounded-xl font-bold transition-all shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30">
                    <Share2 className="w-5 h-5" />
                    WhatsApp
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
