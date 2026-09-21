"use client";

import { useState, useRef } from "react";
import { Download, Share2, Calculator as CalcIcon } from "lucide-react";
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
  const landedCostPerMtAed = totalLandedCostAed / inputs.cargoMt;

  // Revenue & Profit
  const totalRevenueAed = inputs.targetSellingPriceAed * totalBags;
  const totalRevenueInr = totalRevenueAed * inputs.aedInr;

  const netProfitInr = totalRevenueInr - totalLandedCostInr;
  const netProfitAed = netProfitInr / inputs.aedInr;
  const netProfitUsd = netProfitInr / inputs.usdInr;

  const roiPercent = (netProfitInr / totalLandedCostInr) * 100;

  const handleExportPDF = async () => {
    if (printRef.current) {
      const canvas = await html2canvas(printRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("export-quotation.pdf");
    }
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

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100" ref={printRef}>
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
