"use client";

import React from "react";

type InvoiceProps = {
  invoiceNo?: string;
  date?: string;
  customerName?: string;
  phone?: string;
  packageName?: string;
  checkIn?: string;
  checkOut?: string;
  nights?: number;
  amount?: number;
  tax?: number;
  status?: "Paid" | "Pending" | "Cancelled";
};

export default function InvoicePage({
  invoiceNo = "INV-2026-001",
  date = "09 Jan 2026",
  customerName = "Rahul Kumar",
  phone = "9876543210",
  packageName = "Premium Heritage Day Package",
  checkIn = "10 Jan 2026",
  checkOut = "11 Jan 2026",
  nights = 1,
  amount = 3500,
  tax = 350,
  status = "Paid",
}: InvoiceProps) {
  const total = amount + tax;

  const statusColor = {
    Paid: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Cancelled: "bg-red-100 text-red-700",
  }[status];

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black invoice-page" id="invoice-print">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-lg print:shadow-none">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold">Invoice</h1>
            <p className="text-sm text-gray-500">#{invoiceNo}</p>
          </div>

          <span
            className={`rounded-full px-4 py-1 text-sm font-semibold ${statusColor}`}
          >
            {status}
          </span>
        </div>

        {/* Company Info */}
        <div className="mt-6 flex justify-between">
          <div>
            <h2 className="font-semibold text-gray-700">
              Sanskrit Convention Centre
            </h2>
            <p className="text-sm text-gray-500">
              Pazhayannur, Kerala
            </p>
            <p className="text-sm text-gray-500">
              Phone: 98765 43210
            </p>
          </div>

          <div className="text-right text-sm text-gray-500">
            <p>Date: {date}</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mt-8 grid grid-cols-2 gap-6">
          <div>
            <h3 className="mb-2 font-semibold text-gray-700">
              Billed To
            </h3>
            <p className="text-sm">{customerName}</p>
            <p className="text-sm text-gray-500">
              Phone: {phone}
            </p>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left text-sm text-gray-600">
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Check-in</th>
                <th className="border px-4 py-2">Check-out</th>
                <th className="border px-4 py-2 text-center">Nights</th>
                <th className="border px-4 py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-sm">
                <td className="border px-4 py-3">
                  {packageName}
                </td>
                <td className="border px-4 py-3">{checkIn}</td>
                <td className="border px-4 py-3">{checkOut}</td>
                <td className="border px-4 py-3 text-center">
                  {nights}
                </td>
                <td className="border px-4 py-3 text-right">
                  ₹{amount.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="mt-6 flex justify-end">
          <div className="w-72 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t pt-2 font-semibold text-lg">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex justify-end gap-4 print:hidden">
          <button
  onClick={() => window.print()}
  className="print:hidden rounded-lg border px-5 py-2 text-sm font-semibold"
>
  Print Invoice
</button>

        </div>

        {/* Footer */}
        <div className="mt-12 border-t pt-4 text-center text-xs text-gray-500">
          Thank you for choosing Sanskrit Convention Centre
        </div>
      </div>
    </div>
  );
}
