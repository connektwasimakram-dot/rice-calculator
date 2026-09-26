"use client";

import { useState } from "react";
import { Download, Share2, Calculator as CalcIcon, DollarSign, Package, Truck, Ship, Target } from "lucide-react";
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
  const totalBags = (inputs.cargoMt * 1000) / (inputs.bagSizeKg || 1);

  // Costs in INR
  const totalExMillInr = inputs.exMillPrice * inputs.cargoMt * 1000;
  const totalPackagingInr = inputs.packaging * totalBags;
  const fobCostInr = totalExMillInr + totalPackagingInr + inputs.inlandLogistics;

  // Ocean Freight to INR
  const oceanFreightInr = inputs.oceanFreightUsd * inputs.usdInr;

  // CIF Cost
  const cifCostInr = fobCostInr + oceanFreightInr;
  const cifCostUsd = inputs.usdInr > 0 ? cifCostInr / inputs.usdInr : 0;
  const cifCostPerMtUsd = inputs.cargoMt > 0 ? cifCostUsd / inputs.cargoMt : 0;

  // Landed Cost UAE
  const uaePortInr = inputs.uaePortAed * inputs.aedInr;
  const totalLandedCostInr = cifCostInr + uaePortInr;
  const totalLandedCostAed = inputs.aedInr > 0 ? totalLandedCostInr / inputs.aedInr : 0;

  const landedCostPerBagAed = totalBags > 0 ? totalLandedCostAed / totalBags : 0;
  const landedCostPerKgAed = inputs.cargoMt > 0 ? totalLandedCostAed / (inputs.cargoMt * 1000) : 0;
  const landedCost18KgAed = landedCostPerKgAed * 18;
  const landedCostPerMtAed = inputs.cargoMt > 0 ? totalLandedCostAed / inputs.cargoMt : 0;

  // Revenue & Profit
  const totalRevenueAed = inputs.targetSellingPriceAed * totalBags;
  const totalRevenueInr = totalRevenueAed * inputs.aedInr;

  const netProfitInr = totalRevenueInr - totalLandedCostInr;
  const netProfitAed = inputs.aedInr > 0 ? netProfitInr / inputs.aedInr : 0;
  const netProfitUsd = inputs.usdInr > 0 ? netProfitInr / inputs.usdInr : 0;

  const roiPercent = totalLandedCostInr > 0 ? (netProfitInr / totalLandedCostInr) * 100 : 0;

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

    // Deep slate header bar
    pdf.setFillColor(15, 23, 42); // slate-900
    pdf.rect(0, 0, pageWidth, 84, "F");

    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text("ROYAL MERCHANT LLC", margin, 34);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(148, 163, 184); // slate-400
    pdf.text("Agricultural Commodities & Trade Corridor Desk · India - UAE", margin, 52);
    pdf.text(new Date().toLocaleDateString("en-GB"), pageWidth - margin, 34, { align: "right" });

    // Document title
    pdf.setTextColor(15, 23, 42);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(15);
    pdf.text("Commercial Rice Export Landed Cost Quotation", margin, 120);

    pdf.setTextColor(100, 116, 139);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.5);
    pdf.text("Indicative shipment economics modeled via Royal Merchant Trade Desk.", margin, 136);

    // KPI Cards
    const cards = [
      ["NET PROFIT / FCL", `${netProfitAed.toFixed(2)} AED`],
      ["ESTIMATED ROI", `${roiPercent.toFixed(1)}%`],
      ["LANDED COST / KG", `${landedCostPerKgAed.toFixed(2)} AED`],
      ["18 KG BAG LANDING", `${landedCost18KgAed.toFixed(2)} AED`],
    ];
    const cardGap = 8;
    const cardWidth = (pageWidth - margin * 2 - cardGap * 3) / 4;

    cards.forEach(([label, value], index) => {
      const x = margin + index * (cardWidth + cardGap);
      pdf.setFillColor(248, 250, 252); // slate-50
      pdf.roundedRect(x, 154, cardWidth, 52, 4, 4, "F");

      pdf.setTextColor(100, 116, 139);
      pdf.setFontSize(6.5);
      pdf.setFont("helvetica", "normal");
      pdf.text(label, x + 8, 171);

      pdf.setTextColor(15, 23, 42);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.text(value, x + 8, 192);
    });

    // Table data
    const rows = [
      ["Cargo Quantity", `${inputs.cargoMt} Metric Tonnes (MT)`],
      ["Bag Configuration", `${inputs.bagSizeKg} kg standard bags (${totalBags.toFixed(0)} bags)`],
      ["Ex-Mill Procurement Rate", `${inputs.exMillPrice} INR / kg`],
      ["Packaging & Bagging", `${inputs.packaging} INR / bag`],
      ["Inland Transport & Terminal", `${inputs.inlandLogistics.toLocaleString("en-IN")} INR`],
      ["Ocean Container Freight", `${inputs.oceanFreightUsd} USD`],
      ["UAE Port, Handling & Customs", `${inputs.uaePortAed} AED`],
      ["Target Wholesale Price", `${inputs.targetSellingPriceAed} AED / bag`],
      ["CIF Port Cost / MT", `$${cifCostPerMtUsd.toFixed(2)} USD`],
      ["Total Landed Cost (UAE)", `${totalLandedCostAed.toFixed(2)} AED`],
      ["Landed Cost / 50kg Bag", `${landedCostPerBagAed.toFixed(2)} AED`],
      ["Landed Cost / Kilogram", `${landedCostPerKgAed.toFixed(2)} AED`],
      ["Landed Cost / 18kg Bag", `${landedCost18KgAed.toFixed(2)} AED`],
      ["Total Commercial Revenue", `${totalRevenueAed.toFixed(2)} AED`],
    ];

    pdf.setFillColor(15, 23, 42);
    pdf.rect(margin, 226, pageWidth - margin * 2, 22, "F");

    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    pdf.text("PARAMETER & METRIC", margin + 8, 240);
    pdf.text("VALUE & BREAKDOWN", pageWidth - margin - 8, 240, { align: "right" });

    rows.forEach(([label, value], index) => {
      const y = 264 + index * 21;
      pdf.setDrawColor(226, 232, 240);
      pdf.setLineWidth(0.5);
      pdf.line(margin, y + 6, pageWidth - margin, y + 6);

      pdf.setTextColor(51, 65, 85);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      pdf.text(safe(label), margin + 8, y);

      pdf.setTextColor(15, 23, 42);
      pdf.setFont("helvetica", "bold");
      pdf.text(safe(value), pageWidth - margin - 8, y, { align: "right" });
    });

    // Highlighted net profit row
    pdf.setFillColor(241, 245, 249);
    pdf.rect(margin, 566, pageWidth - margin * 2, 26, "F");

    pdf.setTextColor(5, 150, 105); // emerald-600
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text("Net Profit / Container (AED)", margin + 8, 582);
    pdf.text(`${netProfitAed.toFixed(2)} AED`, pageWidth - margin - 8, 582, { align: "right" });

    pdf.setTextColor(100, 116, 139);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7.5);
    pdf.text("Royal Merchant LLC · India-UAE Agricultural Corridor · Commercial estimate only. Subject to daily FX & freight market spot shifts.", margin, 795);

    const blob = pdf.output("blob");
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "Royal_Merchant_Quotation.pdf";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  const handleShareWhatsApp = () => {
    const text = `*Royal Merchant LLC · Export P&L Quotation*\n\n` +
      `Cargo: ${inputs.cargoMt} MT (${totalBags.toFixed(0)} bags @ ${inputs.bagSizeKg}kg)\n` +
      `Ex-Mill: ${inputs.exMillPrice} INR/kg | Ocean: $${inputs.oceanFreightUsd} USD\n` +
      `-------------------------\n` +
      `Total Landed Cost: ${totalLandedCostAed.toFixed(2)} AED\n` +
      `Landed Cost / Bag: ${landedCostPerBagAed.toFixed(2)} AED\n` +
      `Landed Cost / kg: ${landedCostPerKgAed.toFixed(2)} AED\n` +
      `18kg Bag Benchmark: ${landedCost18KgAed.toFixed(2)} AED\n` +
      `Target Selling Price: ${inputs.targetSellingPriceAed} AED/bag\n` +
      `-------------------------\n` +
      `*Net Profit / Container: ${netProfitAed.toFixed(2)} AED*\n` +
      `Projected ROI: ${roiPercent.toFixed(2)}%\n\n` +
      `Generated via Royal Merchant Trade Desk.`;

    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="calculator" className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
          <div className="p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

              {/* Input Variables: 7 Columns */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <CalcIcon className="w-5 h-5 text-emerald-600" />
                    Shipment Variables & Costs
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Adjust origin mill parameters, transit fees, and target selling price.
                  </p>
                </div>

                {/* Section 1: FX Rates */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                    1. Foreign Exchange Reference
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-lg border border-slate-200 p-3 bg-slate-50/50">
                      <label className="block text-xs font-medium text-slate-600">USD / INR Exchange Rate</label>
                      <input
                        type="number"
                        step="0.01"
                        name="usdInr"
                        value={inputs.usdInr}
                        onChange={handleInputChange}
                        className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 shadow-2xs focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                    </div>
                    <div className="rounded-lg border border-slate-200 p-3 bg-slate-50/50">
                      <label className="block text-xs font-medium text-slate-600">AED / INR Exchange Rate</label>
                      <input
                        type="number"
                        step="0.01"
                        name="aedInr"
                        value={inputs.aedInr}
                        onChange={handleInputChange}
                        className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 shadow-2xs focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Cargo & Mill Sourcing */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-slate-400" />
                    2. Cargo & Mill Origination (India)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-lg border border-slate-200 p-3 bg-slate-50/50">
                      <label className="block text-xs font-medium text-slate-600">Container Cargo (MT)</label>
                      <input
                        type="number"
                        name="cargoMt"
                        value={inputs.cargoMt}
                        onChange={handleInputChange}
                        className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 shadow-2xs focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                      <span className="mt-1 block text-[10px] text-slate-400 font-mono tabular-nums">{totalBags.toFixed(0)} bags</span>
                    </div>
                    <div className="rounded-lg border border-slate-200 p-3 bg-slate-50/50">
                      <label className="block text-xs font-medium text-slate-600">Bag Unit Weight (kg)</label>
                      <input
                        type="number"
                        name="bagSizeKg"
                        value={inputs.bagSizeKg}
                        onChange={handleInputChange}
                        className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 shadow-2xs focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                      <span className="mt-1 block text-[10px] text-slate-400 font-mono">Typically 50kg / 25kg</span>
                    </div>
                    <div className="rounded-lg border border-slate-200 p-3 bg-slate-50/50">
                      <label className="block text-xs font-medium text-slate-600">Ex-Mill Rate (INR / kg)</label>
                      <input
                        type="number"
                        name="exMillPrice"
                        value={inputs.exMillPrice}
                        onChange={handleInputChange}
                        className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 shadow-2xs focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                      <span className="mt-1 block text-[10px] text-slate-400 font-mono">Clean milled basis</span>
                    </div>
                  </div>
                </div>

                {/* Section 3: Packaging & Inland Freight */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-slate-400" />
                    3. Packaging & Origin Logistics
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-lg border border-slate-200 p-3 bg-slate-50/50">
                      <label className="block text-xs font-medium text-slate-600">Bagging & Packaging (INR / bag)</label>
                      <input
                        type="number"
                        name="packaging"
                        value={inputs.packaging}
                        onChange={handleInputChange}
                        className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 shadow-2xs focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                    </div>
                    <div className="rounded-lg border border-slate-200 p-3 bg-slate-50/50">
                      <label className="block text-xs font-medium text-slate-600">Inland Freight & CFS Terminal (INR)</label>
                      <input
                        type="number"
                        name="inlandLogistics"
                        value={inputs.inlandLogistics}
                        onChange={handleInputChange}
                        className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 shadow-2xs focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: Maritime & Destination Port */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Ship className="w-3.5 h-3.5 text-slate-400" />
                    4. Maritime Freight & UAE Port Clearance
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-lg border border-slate-200 p-3 bg-slate-50/50">
                      <label className="block text-xs font-medium text-slate-600">Ocean Freight (USD / Container)</label>
                      <input
                        type="number"
                        name="oceanFreightUsd"
                        value={inputs.oceanFreightUsd}
                        onChange={handleInputChange}
                        className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 shadow-2xs focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                    </div>
                    <div className="rounded-lg border border-slate-200 p-3 bg-slate-50/50">
                      <label className="block text-xs font-medium text-slate-600">UAE Port Clearance & Handling (AED)</label>
                      <input
                        type="number"
                        name="uaePortAed"
                        value={inputs.uaePortAed}
                        onChange={handleInputChange}
                        className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 shadow-2xs focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 5: Target Wholesale Selling Price */}
                <div className="rounded-xl border border-emerald-300/80 bg-emerald-50/30 p-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-emerald-600" />
                      5. Target Wholesale Selling Price
                    </label>
                    <span className="text-[11px] font-medium text-emerald-700">AED per 50kg bag</span>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <input
                      type="number"
                      name="targetSellingPriceAed"
                      value={inputs.targetSellingPriceAed}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border border-emerald-400 bg-white px-3 py-2.5 text-base font-semibold font-mono text-slate-900 shadow-2xs focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    />
                    <span className="text-sm font-semibold text-slate-700 font-mono whitespace-nowrap">AED / bag</span>
                  </div>
                </div>
              </div>

              {/* Financial Summary & KPIs: 5 Columns */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/60 p-6">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                      Commercial P&L Breakdown
                    </h3>
                    <span className="text-[11px] font-mono text-slate-500">Live Estimates</span>
                  </div>

                  {/* Primary Metric Card */}
                  <div className="mt-5 rounded-xl bg-slate-900 p-6 text-white shadow-xs">
                    <span className="block text-xs font-medium uppercase tracking-wider text-slate-400">
                      Estimated Net Profit / Container
                    </span>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-semibold tracking-tight font-mono tabular-nums text-white">
                        {netProfitAed.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <span className="text-sm font-medium text-emerald-400">AED</span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-300 pt-3 border-t border-slate-800 font-mono tabular-nums">
                      <span>{netProfitInr.toLocaleString("en-IN", { maximumFractionDigits: 0 })} INR</span>
                      <span className="text-slate-600">·</span>
                      <span>${netProfitUsd.toLocaleString("en-US", { maximumFractionDigits: 0 })} USD</span>
                      <span className="text-slate-600">·</span>
                      <span className={`font-semibold ${roiPercent >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                        {roiPercent.toFixed(1)}% ROI
                      </span>
                    </div>
                  </div>

                  {/* Detailed Unit Cost Table */}
                  <div className="mt-6 space-y-2.5 text-xs">
                    <div className="flex justify-between items-center py-1.5 border-b border-slate-200/80">
                      <span className="text-slate-600">CIF Port Cost / MT</span>
                      <span className="font-semibold text-slate-900 font-mono tabular-nums">
                        ${cifCostPerMtUsd.toFixed(2)} USD
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-slate-200/80">
                      <span className="text-slate-600">Total Landed Shipment Cost</span>
                      <span className="font-semibold text-slate-900 font-mono tabular-nums">
                        {totalLandedCostAed.toFixed(2)} AED
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-slate-200/80">
                      <span className="text-slate-600">Landed Cost / 50kg Bag</span>
                      <span className="font-semibold text-slate-900 font-mono tabular-nums">
                        {landedCostPerBagAed.toFixed(2)} AED
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-slate-200/80">
                      <span className="text-slate-600">Landed Cost / Kilogram</span>
                      <span className="font-semibold text-slate-900 font-mono tabular-nums">
                        {landedCostPerKgAed.toFixed(2)} AED
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-slate-200/80 bg-white/70 px-2 rounded-sm">
                      <span className="text-slate-700 font-medium">18kg Wholesale Benchmark</span>
                      <span className="font-semibold text-emerald-800 font-mono tabular-nums">
                        {landedCost18KgAed.toFixed(2)} AED
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-slate-200/80">
                      <span className="text-slate-600">Landed Cost / Metric Tonne</span>
                      <span className="font-semibold text-slate-900 font-mono tabular-nums">
                        {landedCostPerMtAed.toFixed(2)} AED
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-slate-200/80">
                      <span className="text-slate-600">Total Shipment Revenue</span>
                      <span className="font-semibold text-slate-900 font-mono tabular-nums">
                        {totalRevenueAed.toFixed(2)} AED
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span className="text-slate-600">Projected Margin / ROI</span>
                      <span className={`font-semibold font-mono tabular-nums ${roiPercent >= 0 ? "text-emerald-700" : "text-rose-600"}`}>
                        {roiPercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 space-y-3 pt-4 border-t border-slate-200">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleExportPDF}
                      className="inline-flex items-center justify-center gap-1.5 rounded-md bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-slate-800 active:scale-[0.99]"
                    >
                      <Download className="w-4 h-4" />
                      Export PDF
                    </button>
                    <button
                      onClick={handleShareWhatsApp}
                      className="inline-flex items-center justify-center gap-1.5 rounded-md bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-emerald-500 active:scale-[0.99]"
                    >
                      <Share2 className="w-4 h-4" />
                      WhatsApp
                    </button>
                  </div>
                  <p className="text-[11px] text-center text-slate-500">
                    Instant quotation export for commercial dispatch to buyers.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
