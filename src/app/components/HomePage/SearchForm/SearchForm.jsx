'use client';
import Image from 'next/image';
// import { useState } from 'react';

// export default function SearchTabs() {
//   const [activeTab, setActiveTab] = useState('flight');
//   const [tripType, setTripType] = useState('oneway');
//   const [form, setForm] = useState({
//     from: '',
//     to: '',
//     travelers: 1,
//     travelerType: 'adult',
//     airline: '',
//     departureDate: '',
//     returnDate: '',
//   });

//   const handleChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', { activeTab, tripType, ...form });
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg space-y-6">
//       {/* Tabs */}
//       <div className="flex justify-center gap-4">
//         {['flight', 'hotel', 'visa'].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-5 py-2 rounded-full font-medium capitalize transition ${
//               activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {activeTab === 'flight' && (
//           <>
//             {/* Trip Type */}
//             <div className="flex gap-6">
//               {['oneway', 'round', 'multi'].map((type) => (
//                 <label key={type} className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="tripType"
//                     value={type}
//                     checked={tripType === type}
//                     onChange={(e) => setTripType(e.target.value)}
//                   />
//                   <span className="capitalize">{type === 'oneway' ? 'One Way' : type === 'round' ? 'Round Trip' : 'Multi City'}</span>
//                 </label>
//               ))}
//             </div>

//             {/* From / To */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <select
//                 name="from"
//                 value={form.from}
//                 onChange={handleChange}
//                 className="p-3 border border-gray-300 rounded-xl"
//               >
//                 <option value="">From</option>
//                 <option value="NYC">New York</option>
//                 <option value="LAX">Los Angeles</option>
//                 <option value="LHR">London</option>
//               </select>

//               <select
//                 name="to"
//                 value={form.to}
//                 onChange={handleChange}
//                 className="p-3 border border-gray-300 rounded-xl"
//               >
//                 <option value="">To</option>
//                 <option value="DXB">Dubai</option>
//                 <option value="DEL">Delhi</option>
//                 <option value="SYD">Sydney</option>
//               </select>
//             </div>

//             {/* Dates */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Departure Date</label>
//                 <input
//                   type="date"
//                   name="departureDate"
//                   value={form.departureDate}
//                   onChange={handleChange}
//                   className="p-3 border border-gray-300 rounded-xl w-full"
//                 />
//               </div>

//               {tripType === 'round' && (
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Return Date</label>
//                   <input
//                     type="date"
//                     name="returnDate"
//                     value={form.returnDate}
//                     onChange={handleChange}
//                     className="p-3 border border-gray-300 rounded-xl w-full"
//                   />
//                 </div>
//               )}
//             </div>

//             {/* Travelers + Type */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 type="number"
//                 name="travelers"
//                 min="1"
//                 value={form.travelers}
//                 onChange={handleChange}
//                 placeholder="Number of Travelers"
//                 className="p-3 border border-gray-300 rounded-xl"
//               />

//               <select
//                 name="travelerType"
//                 value={form.travelerType}
//                 onChange={handleChange}
//                 className="p-3 border border-gray-300 rounded-xl"
//               >
//                 <option value="adult">Adult</option>
//                 <option value="child">Child</option>
//                 <option value="infant">Infant</option>
//               </select>
//             </div>

//             {/* Preferred Airline */}
//             <select
//               name="airline"
//               value={form.airline}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-xl"
//             >
//               <option value="">Preferred Airline</option>
//               <option value="emirates">Emirates</option>
//               <option value="qatar">Qatar Airways</option>
//               <option value="delta">Delta</option>
//             </select>
//           </>
//         )}

//         {activeTab === 'hotel' && (
//           <div className="text-center text-gray-500 italic">
//             Hotel search form goes here.
//           </div>
//         )}

//         {activeTab === 'visa' && (
//           <div className="text-center text-gray-500 italic">
//             Visa search form goes here.
//           </div>
//         )}

//         <div className="text-center pt-4">
//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition"
//           >
//             🔍 Search
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
import React, { useState } from 'react';

const SearchForm = () => {

  const [activeTab, setActiveTab] = useState("tab1")
  const [tripType, setTripType] = useState('round');
  const [form, setForm] = useState({
    from: '',
    to: '',
    travelers: 1,
    travelerType: 'adult',
    airline: '',
    departureDate: '',
    returnDate: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { activeTab, tripType, ...form });
  };

  const tabs = [
    { id: "tab1", icon: "/airplane.ico", label: "Flight" },
    { id: "tab2", icon: "/love-hotel.ico", label: "Hotel" },
    { id: "tab3", icon: "/visa.ico", label: "Visa" },
    { id: "tab4", icon: "/kaaba.ico", label: "Umrah" },
  ];

  const tabContent = {
    tab1: (
      <div>
        <form>
          <>
            {/* Trip Type */}
            <div className="flex gap-2 py-4">
              {['oneway', 'round', 'multi'].map((type) => (
                <label key={type} className={`flex items-center gap-1 cursor-pointer border-[1px] px-2 py-1 rounded-md transition-colors duration-200 ${tripType === type ? 'bg-[#1882ff] text-white border-blue-500' : ' bg-gray-200'}`}>
                  <input
                    type="radio"
                    name="tripType"
                    value={type}
                    checked={tripType === type}
                    onChange={(e) => setTripType(e.target.value)}
                  />
                  <span className="capitalize">{type === 'oneway' ? 'One Way' : type === 'round' ? 'Round Trip' : 'Multi City'}</span>
                </label>
              ))}
            </div>

            {/* From / To */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                name="from"
                value={form.from}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-xl"
              >
                <option value="">From</option>
                <option value="NYC">New York</option>
                <option value="LAX">Los Angeles</option>
                <option value="LHR">London</option>
              </select>

              <select
                name="to"
                value={form.to}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-xl"
              >
                <option value="">To</option>
                <option value="DXB">Dubai</option>
                <option value="DEL">Delhi</option>
                <option value="SYD">Sydney</option>
              </select>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Departure Date</label>
                <input
                  type="date"
                  name="departureDate"
                  value={form.departureDate}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-xl w-full"
                />
              </div>

              {tripType === 'round' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Return Date</label>
                  <input
                    type="date"
                    name="returnDate"
                    value={form.returnDate}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-xl w-full"
                  />
                </div>
              )}
            </div>
            {/* Travelers + Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                name="travelers"
                min="1"
                value={form.travelers}
                onChange={handleChange}
                placeholder="Number of Travelers"
                className="p-3 border border-gray-300 rounded-xl"
              />

              <select
                name="travelerType"
                value={form.travelerType}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-xl"
              >
                <option value="adult">Adult</option>
                <option value="child">Child</option>
                <option value="infant">Infant</option>
              </select>
            </div>

            {/* Preferred Airline */}
            <select
              name="airline"
              value={form.airline}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl"
            >
              <option value="">Preferred Airline</option>
              <option value="emirates">Emirates</option>
              <option value="qatar">Qatar Airways</option>
              <option value="delta">Delta</option>
            </select>
          </>

        </form>


      </div >
    ),
    tab2: (
      <div>
        <h2>Tab content 2 </h2>
      </div>
    ),
    tab3: (
      <div>
        <h2>Tab content 3 </h2>
      </div>
    ),
    tab4: (
      <div>
        <h2>Tab content 4 </h2>
      </div>
    ),
  }


  return (
    <div className=' mx-auto mt-10 bg-white p-6 shadow-lg space-y-2 border-[1px] rounded-md' >

      {/* For Tab  */}
      <div className='flex justify-evenly flex-wrap border-b'>
        {tabs.map((tab) => (
          <button key={tab.id}
            className={`px-8 py-2 font-semibold flex  gap-2 rounded-lg ${activeTab === tab.id ? "border-b-2 border-[#1882ff] text-[#1882ff] transition-colors duration-200" : "text-gray-500 hover:text-[#1882ff]"
              }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <Image src={tab.icon} alt={tab.label} width={20} height={0} />
            {tab.label}
          </button>))}
      </div>

      {/* For Tab Content  */}
      <div> {tabContent[activeTab]}

      </div>
    </div>
  );
};

export default SearchForm;