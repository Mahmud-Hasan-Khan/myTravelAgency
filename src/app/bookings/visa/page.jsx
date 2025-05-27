// "use client";

// import useSWR from "swr"; // ✅ default import

// const fetcher = (url) => fetch(url).then((res) => res.json());

// export default function VisaApplied() {
//   const { data: visas, error, isLoading } = useSWR("/api/visas/applied", fetcher);

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Failed to load visas</p>;

//   if (!Array.isArray(visas)) return <p>No data available.</p>;

//   return (
//     <div className="space-y-4">
//       {visas.map((visa) => (
//         <div key={visa._id} className="border rounded p-4 shadow">
//           <p>Country: {visa.country}</p>
//           <p>Visa Type: {visa.visaType}</p>
//           <p>Price: {visa.price}</p>
//           <p>Applied At: {new Date(visa.appliedAt).toLocaleString()}</p>
//         </div>
//       ))}
//     </div>
//   );
// }


// "use client";

// import useSWR from "swr";
// import { FaGlobeAmericas, FaPassport, FaMoneyBill, FaCalendarAlt } from "react-icons/fa";

// const fetcher = (url) => fetch(url).then((res) => res.json());

// export default function VisaApplied() {
//   const { data: visas, error, isLoading } = useSWR("/api/visas/applied", fetcher);

//   if (isLoading)
//     return <p className="text-center text-gray-500 mt-10">Loading your visa applications...</p>;

//   if (error)
//     return <p className="text-center text-red-500 mt-10">Failed to load visas. Please try again.</p>;

//   if (!Array.isArray(visas) || visas.length === 0)
//     return <p className="text-center text-gray-600 mt-10">You haven’t applied for any visas yet.</p>;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-6">
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Your Visa Applications</h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Total Visas Applied: <span className="font-semibold">{visas.length}</span>
//         </p>
//       </div>

//       <div className="space-y-4">
//         {visas.map((visa) => (
//           <div
//             key={visa._id}
//             className="bg-white border rounded-xl p-4 shadow-md transition hover:shadow-lg"
//           >
//             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
//                   <FaGlobeAmericas className="text-blue-500" />
//                   {visa.country}
//                 </h2>
//                 <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
//                   <FaPassport className="text-green-500" />
//                   {visa.visaType}
//                 </p>
//               </div>

//               <div className="text-sm text-gray-600 text-right">
//                 <p className="flex items-center justify-end gap-1">
//                   <FaMoneyBill className="text-yellow-500" />
//                   <span className="font-medium">Price:</span> ${Number(visa.price).toFixed(2)}
//                 </p>
//                 <p className="flex items-center justify-end gap-1 mt-1">
//                   <FaCalendarAlt className="text-purple-500" />
//                   <span className="font-medium">Applied:</span>{" "}
//                   {new Date(visa.appliedAt).toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import { FaSearch, FaTrashAlt, FaGlobeAmericas, FaPassport, FaMoneyBill, FaCalendarAlt } from "react-icons/fa";
import { MdOutlineHourglassEmpty, MdPending, MdVerified } from "react-icons/md";

const fetcher = (url) => fetch(url).then((res) => res.json());

const statusColors = {
  "Payment Pending": "bg-yellow-100 text-yellow-700",
  "Document Pending": "bg-orange-100 text-orange-700",
  "Processing": "bg-blue-100 text-blue-700",
  "Approved": "bg-green-100 text-green-700",
  "Rejected": "bg-red-100 text-red-700",
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
      mutate(); // Refresh list
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
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Visa Applications</h1>
        <p className="text-sm text-gray-500 mt-1">
          Total Visas Applied: <span className="font-semibold">{filteredVisas.length}</span>
        </p>
      </div>

      {/* Filters */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by country or visa type"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none"
          />
          <FaSearch className="absolute right-3 top-2.5 text-gray-400" />
        </div>
        <select
          value={filterCountry}
          onChange={(e) => setFilterCountry(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none"
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
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none"
        />
      </div>

      {/* Visa Cards */}
      {filteredVisas.length === 0 ? (
        <p className="text-center text-gray-500">No visa applications found.</p>
      ) : (
        <div className="space-y-4">
          {filteredVisas.map((visa) => (
            <div
              key={visa._id}
              className="bg-white border rounded-xl p-4 shadow-md transition hover:shadow-lg"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                    <FaGlobeAmericas className="text-blue-500" />
                    {visa.country}
                  </h2>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                    <FaPassport className="text-green-500" />
                    {visa.visaType}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                    <FaMoneyBill className="text-yellow-500" />
                    Price: ${Number(visa.price).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                    <FaCalendarAlt className="text-purple-500" />
                    Applied: {new Date(visa.appliedAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col sm:items-end gap-2">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      statusColors[visa.visaStatus] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {visa.visaStatus}
                  </span>
                  <button
                    onClick={() => handleDelete(visa._id)}
                    className="text-red-600 text-sm hover:underline flex items-center gap-1"
                  >
                    <FaTrashAlt />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
