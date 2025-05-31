"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import {
  FaSearch,
  FaTrashAlt,
  FaGlobeAmericas,
  FaPassport,
  FaMoneyBill,
  FaCalendarAlt,
} from "react-icons/fa";

const fetcher = (url) => fetch(url).then((res) => res.json());

const statusColors = {
  "Entry": "bg-yellow-100 text-yellow-800 ring-yellow-200",
  "Document Pending": "bg-orange-100 text-orange-800 ring-orange-200",
  "Processing": "bg-blue-100 text-blue-800 ring-blue-200",
  "Approved": "bg-green-100 text-green-800 ring-green-200",
  "Rejected": "bg-red-100 text-red-800 ring-red-200",
};

export default function VisaApplied() {
  const { data: visas, error, isLoading, mutate } = useSWR("/api/visas/applied", fetcher);
  const [search, setSearch] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this visa application?")) return;
    try {
      const res = await fetch(`/api/visas/delete/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      mutate();
    } catch (err) {
      alert("Error deleting visa application.");
    }
  };

  const filteredVisas = useMemo(() => {
    if (!Array.isArray(visas)) return [];
    return visas.filter((visa) => {
      const matchesSearch =
        visa.country.toLowerCase().includes(search.toLowerCase()) ||
        visa.visaType.toLowerCase().includes(search.toLowerCase());
      const matchesCountry = filterCountry
        ? visa.country.toLowerCase() === filterCountry.toLowerCase()
        : true;
      const matchesDate = filterDate
        ? new Date(visa.appliedAt).toISOString().split("T")[0] === filterDate
        : true;
      return matchesSearch && matchesCountry && matchesDate;
    });
  }, [visas, search, filterCountry, filterDate]);

  if (isLoading)
    return <p className="text-center text-gray-500 mt-10">Loading visa applications...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-10">Failed to load visas. Please try again.</p>;

  return (
    <div className=" bg-[#e2e8f0] container mx-auto md:px-32 sm:px-0 md:h-full md:py-16">
      <div className="md:bg-white md:rounded-md mx-auto px-4 md:py-6 py-2">
        <div className="md:mb-8 mb-4">
          <h1 className="text-xl md:text-3xl font-bold text-gray-800">Your Visa Applications</h1>
          <p className="text-sm text-gray-500 mt-1">
            Total Visas Applied:{" "}
            <span className="font-semibold text-gray-700">{filteredVisas.length}</span>
          </p>
        </div>

        {/* Filters */}
        <div className="grid sm:grid-cols-3 gap-4 mb-5 md:mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by country or visa type"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute right-3 top-2.5 text-gray-400" />
          </div>
          <select
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Countries</option>
            {[...new Set((visas || []).map((v) => v.country))].map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto rounded-lg border shadow-sm">
          {filteredVisas.length === 0 ? (
            <p className="text-center text-gray-500 py-6">No visa applications found.</p>
          ) : (
            <table className="min-w-full">
              <thead className="bg-gray-300 text-gray-800 uppercase text-xs">
                <tr className="text-center">
                  <th className="px-5 py-3">Order ID<br />Order Date </th>
                  <th className="px-5 py-3">Country <br />Visa Service Details</th>
                  <th className="px-5 py-3">Traveler <br />Information</th>
                  <th className="px-5 py-3">Order <br />Status </th>
                  <th className="px-5 py-3">Invoice Price <br />Payment Status</th>
                  <th className="px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-gray-200">
                {filteredVisas.map((visa, idx) => (
                  <tr
                    key={visa._id}
                    className="hover:bg-gray-100 transition duration-200 ease-in-out text-center"
                  >
                    <td className="px-5 py-3 text-gray-600">{visa.orderId} <br />{new Intl.DateTimeFormat('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    }).format(new Date(visa.appliedAt)).replace(/(\w{3}) (\d{4})$/, '$1, $2')}<br />
                      {new Intl.DateTimeFormat('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      }).format(new Date(visa.appliedAt)).toLowerCase()}</td>
                    <td className="px-5 py-3 font-medium text-gray-800">{visa.country} <br /><span className="font-normal">{visa.visaType} <br />({visa.validity} Days validity, {visa.maxStay} Days maximum stay) </span></td>
                    <td className="px-5 py-3 text-gray-600">
                      {visa.name}
                      <br />
                      <span className="font-medium text-gray-800">{visa.passportNumber}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`px-3 py-1 rounded-full ring-1 ${statusColors[visa.visaStatus] || "bg-gray-100 text-gray-700 ring-gray-200"}`}
                      >
                        {visa.visaStatus}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      BDT {visa.price}
                      <br />
                      <span className="text-sm font-medium text-[#d84315] rounded-full px-2">{visa.paymentStats}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-center">
                        {visa.visaStatus === "Verification Pending" ? (
                          <button
                            onClick={() => handlePayNow(visa._id, visa.price)}
                            className="text-blue-600 text-sm hover:underline flex items-center gap-1"
                          >
                            💳 Pay Now
                          </button>
                        ) : visa.visaStatus === "Approved" ? (
                          <button
                            onClick={() => handleDownload(visa._id)}
                            className="text-green-600 text-sm hover:underline flex items-center gap-1"
                          >
                            📄 Download
                          </button>
                        ) : visa.paymentStats === "Paid" ? (
                          <span className="text-emerald-600 text-sm font-medium">✅ Payment Done</span>
                        ) : (
                          <span className="text-gray-400 text-sm">No Action</span>
                        )}
                      </div>
                    </td>


                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {filteredVisas.length === 0 ? (
            <p className="text-center text-gray-500">No visa applications found.</p>
          ) : (
            filteredVisas.map((visa) => (
              <div
                key={visa._id}
                className="bg-white border rounded-xl p-4 shadow-sm transition hover:shadow-md space-y-2"
              >
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                  <FaGlobeAmericas className="text-blue-500" />
                  {visa.country}
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <FaPassport className="text-green-500" />
                  {visa.visaType}
                </div>
                <div className="text-sm text-gray-600 flex items-center gap-2 border-t pt-2">
                  <FaMoneyBill className="text-yellow-500" />
                  ${Number(visa.price).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <FaCalendarAlt className="text-purple-500" />
                  {new Date(visa.appliedAt).toLocaleString()}
                </div>
                <div>
                  <span
                    className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ring-1 ${statusColors[visa.visaStatus] || "bg-gray-100 text-gray-700 ring-gray-200"
                      }`}
                  >
                    {visa.visaStatus}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(visa._id)}
                  className="text-red-600 text-sm hover:underline flex items-center gap-1"
                >
                  <FaTrashAlt />
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
