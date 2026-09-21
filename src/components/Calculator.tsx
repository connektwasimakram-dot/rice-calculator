"use client";

import { useState } from "react";
import { Download, Share2, Calculator as CalcIcon } from "lucide-react";
import jsPDF from "jspdf";

export default function Calculator() {
  const [inputs, setInputs] = useState({
    usdInr: 95.90,
    aedInr: 26.09,
    cargoMt: 24,
    bagSizeKg: 50,
    exMillPrice: 33,
    packaging: 18,
    inlandLogistics: 68500,
    oceanFreightUsd: 500,
    uaePortAed: 3246,
    targetSellingPriceAed: 106,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  // Calculations
  const totalBags = (inputs.cargoMt * 1000) / inputs.bagSizeKg;

  // Costs in INR
  const totalExMillInr = inputs.exMillPrice * inputs.cargoMt * 1000;
  const totalPackagingInr = inputs.packaging * totalBags;
  const fobCostInr = totalExMillInr + totalPackagingInr + inputs.inlandLogistics;

  // Convert Ocean Freight to INR
  const oceanFreightInr = inputs.oceanFreightUsd * inputs.usdInr;

  // CIF Cost
  const cifCostInr = fobCostInr + oceanFreightInr;
  const cifCostUsd = cifCostInr / inputs.usdInr;
  const cifCostPerMtUsd = cifCostUsd / inputs.cargoMt;

  // Landed Cost UAE
  const uaePortInr = inputs.uaePortAed * inputs.aedInr;
  const totalLandedCostInr = cifCostInr + uaePortInr;
  const totalLandedCostAed = totalLandedCostInr / inputs.aedInr;

  const landedCostPerBagAed = totalLandedCostAed / totalBags;
  const landedCostPerKgAed = totalLandedCostAed / (inputs.cargoMt * 1000);
  const landedCost18KgAed = landedCostPerKgAed * 18;
  const landedCostPerMtAed = totalLandedCostAed / inputs.cargoMt;

  // Revenue & Profit
  const totalRevenueAed = inputs.targetSellingPriceAed * totalBags;
  const totalRevenueInr = totalRevenueAed * inputs.aedInr;

  const netProfitInr = totalRevenueInr - totalLandedCostInr;
  const netProfitAed = netProfitInr / inputs.aedInr;
  const netProfitUsd = netProfitInr / inputs.usdInr;

  const roiPercent = (netProfitInr / totalLandedCostInr) * 100;

  const handleExportPDF = () => {
    const pdf = new jsPDF({ unit: "pt", format: "a4", compress: true });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 40;
    const safe = (value: string | number) =>
      String(value)
        .replace(/₹/g, "INR ")
        .replace(/[^\x20-\x7E]/g, "-")
        .replace(/\\/g, "\\\\")
        .replace(/\(/g, "\\(")
        .replace(/\)/g, "\\)");

    pdf.setFillColor(0, 51, 102);
    pdf.rect(0, 0, pageWidth, 86, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(17);
    pdf.text("ROYAL MERCHANT LLC", margin, 34);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.text("India-UAE rice export desk", margin, 51);
    pdf.text(new Date().toLocaleDateString("en-GB"), pageWidth - margin, 34, { align: "right" });

    pdf.setTextColor(0, 51, 102);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text("Rice Export Quotation & Financial Breakdown", margin, 122);
    pdf.setTextColor(96, 113, 132);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.text("Indicative shipment economics generated from the live calculator.", margin, 139);

    const cards = [
      ["NET PROFIT / CONTAINER", `${netProfitAed.toFixed(2)} AED`],
      ["ROI", `${roiPercent.toFixed(1)}%`],
      ["LANDED COST / KG", `${landedCostPerKgAed.toFixed(2)} AED`],
      ["18 KG BAG LANDING", `${landedCost18KgAed.toFixed(2)} AED`],
    ];
    const cardGap = 9;
    const cardWidth = (pageWidth - margin * 2 - cardGap * 3) / 4;
    cards.forEach(([label, value], index) => {
      const x = margin + index * (cardWidth + cardGap);
      pdf.setFillColor(243, 247, 250);
      pdf.roundedRect(x, 157, cardWidth, 52, 6, 6, "F");
      pdf.setTextColor(96, 113, 132);
      pdf.setFontSize(6.5);
      pdf.text(label, x + 8, 173);
      pdf.setTextColor(0, 51, 102);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9.5);
      pdf.text(value, x + 8, 193);
    });

    const rows = [
      ["Quantity", `${inputs.cargoMt} MT`],
      ["Bag weight", `${inputs.bagSizeKg} kg`],
      ["Ex-mill price", `${inputs.exMillPrice} INR / kg`],
      ["Packaging", `${inputs.packaging} INR / bag`],
      ["Inland logistics", `${inputs.inlandLogistics.toLocaleString("en-IN")} INR`],
      ["Ocean freight", `${inputs.oceanFreightUsd} USD`],
      ["UAE port / clearance", `${inputs.uaePortAed} AED`],
      ["Target selling price", `${inputs.targetSellingPriceAed} AED / bag`],
      ["Landed cost / kg", `${landedCostPerKgAed.toFixed(2)} AED`],
      ["18 kg bag landing price", `${landedCost18KgAed.toFixed(2)} AED`],
      ["Landed cost / MT", `${landedCostPerMtAed.toFixed(2)} AED`],
      ["Total shipment cost", `${totalLandedCostAed.toFixed(2)} AED`],
      ["Total shipment value", `${totalRevenueAed.toFixed(2)} AED`],
    ];
    pdf.setFillColor(0, 51, 102);
    pdf.rect(margin, 232, pageWidth - margin * 2, 22, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    pdf.text("QUOTATION INPUT", margin + 8, 247);
    pdf.text("VALUE", pageWidth - margin - 43, 247);
    rows.forEach(([label, value], index) => {
      const y = 269 + index * 22;
      pdf.setDrawColor(220, 229, 237);
      pdf.setLineWidth(0.5);
      pdf.line(margin, y + 7, pageWidth - margin, y + 7);
      pdf.setTextColor(38, 55, 70);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      pdf.text(safe(label), margin + 8, y);
      pdf.setTextColor(0, 51, 102);
      pdf.setFont("helvetica", "bold");
      pdf.text(safe(value), pageWidth - margin - 8, y, { align: "right" });
    });
    pdf.setTextColor(40, 167, 69);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text("Net profit / container", margin, 550);
    pdf.text(`${netProfitAed.toFixed(2)} AED`, pageWidth - margin, 550, { align: "right" });
    pdf.setTextColor(96, 113, 132);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7.5);
    pdf.text("Royal Merchant LLC - India-UAE agricultural trade corridor - Commercial estimate, not a final invoice.", margin, 805);

    const blob = pdf.output("blob");
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "Royal_Merchant_Rice_Export_Quotation.pdf";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  const handleShareWhatsApp = () => {
    const text = `*Export P&L Summary (India to UAE)*\n\nCargo: ${inputs.cargoMt} MT\nLanded Cost/Bag: ${landedCostPerBagAed.toFixed(2)} AED\nTarget Price/Bag: ${inputs.targetSellingPriceAed} AED\n\n*Estimated Profit: ${netProfitAed.toFixed(2)} AED*\nROI: ${roiPercent.toFixed(2)}%\n\nGenerated via Royal Merchant LLC.`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="calculator" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#003366] flex items-center justify-center gap-2">
            <CalcIcon className="w-8 h-8 text-[#28A745]" />
            Export P&L Calculator
          </h2>
          <p className="mt-4 text-lg text-gray-600">Model your landed costs and estimate margins instantly.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              {/* Inputs */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Variables & Costs</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">USD/INR Rate</label>
                    <input type="number" name="usdInr" value={inputs.usdInr} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm p-2 border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">AED/INR Rate</label>
                    <input type="number" name="aedInr" value={inputs.aedInr} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm p-2 border" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cargo (MT)</label>
                    <input type="number" name="cargoMt" value={inputs.cargoMt} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm p-2 border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ex-Mill Price (INR/kg)</label>
                    <input type="number" name="exMillPrice" value={inputs.exMillPrice} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm p-2 border" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Packaging (INR/bag)</label>
                    <input type="number" name="packaging" value={inputs.packaging} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm p-2 border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Inland Logistics (INR)</label>
                    <input type="number" name="inlandLogistics" value={inputs.inlandLogistics} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm p-2 border" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ocean Freight (USD)</label>
                    <input type="number" name="oceanFreightUsd" value={inputs.oceanFreightUsd} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm p-2 border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">UAE Port/Clearance (AED)</label>
                    <input type="number" name="uaePortAed" value={inputs.uaePortAed} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm p-2 border" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#003366]">Target Selling Price (AED/bag)</label>
                  <input type="number" name="targetSellingPriceAed" value={inputs.targetSellingPriceAed} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-[#28A745] border-2 shadow-sm focus:border-[#28A745] focus:ring-[#28A745] sm:text-lg p-3 font-semibold bg-[#f8fff9]" />
                </div>
              </div>

              {/* Outputs */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-6">P&L Summary</h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 border-dashed">
                      <span className="text-gray-600">CIF Port Price / MT</span>
                      <span className="font-semibold text-gray-900">${cifCostPerMtUsd.toFixed(2)} USD</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 border-dashed">
                      <span className="text-gray-600">Total Landed Cost</span>
                      <span className="font-semibold text-gray-900">{totalLandedCostAed.toFixed(2)} AED</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 border-dashed">
                      <span className="text-gray-600">Landed Cost / Bag (50kg)</span>
                      <span className="font-bold text-gray-900">{landedCostPerBagAed.toFixed(2)} AED</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 border-dashed">
                      <span className="text-gray-600">Landed Cost / kg</span>
                      <span className="font-bold text-gray-900">{landedCostPerKgAed.toFixed(2)} AED</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 border-dashed">
                      <span className="text-gray-600">18kg Bag Landing Price</span>
                      <span className="font-bold text-gray-900">{landedCost18KgAed.toFixed(2)} AED</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 border-dashed">
                      <span className="text-gray-600">Landed Cost / MT</span>
                      <span className="font-bold text-gray-900">{landedCostPerMtAed.toFixed(2)} AED</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 border-dashed">
                      <span className="text-gray-600">ROI %</span>
                      <span className={`font-bold ${roiPercent >= 0 ? 'text-[#28A745]' : 'text-red-600'}`}>{roiPercent.toFixed(2)}%</span>
                    </div>
                  </div>

                  <div className="mt-8 bg-[#003366] text-white rounded-xl p-6 shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-5"></div>
                    <span className="block text-sm text-blue-200 uppercase tracking-wider font-semibold mb-1">Net Profit / Container</span>
                    <span className="block text-4xl font-bold mb-3">{netProfitAed.toFixed(2)} <span className="text-2xl font-medium opacity-80">AED</span></span>

                    <div className="flex gap-4 text-sm bg-black/20 p-2 rounded-lg inline-flex">
                      <span className="font-medium text-blue-100">{netProfitInr.toFixed(0)} INR</span>
                      <span className="text-blue-300">|</span>
                      <span className="font-medium text-blue-100">${netProfitUsd.toFixed(0)} USD</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <button onClick={handleExportPDF} className="flex items-center justify-center gap-2 bg-white border-2 border-[#003366] text-[#003366] hover:bg-gray-50 px-4 py-3 rounded-lg font-semibold transition-colors">
                    <Download className="w-5 h-5" />
                    Export PDF
                  </button>
                  <button onClick={handleShareWhatsApp} className="flex items-center justify-center gap-2 bg-[#28A745] hover:bg-[#218838] text-white px-4 py-3 rounded-lg font-semibold transition-colors shadow-md">
                    <Share2 className="w-5 h-5" />
                    Share WhatsApp
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
