'use client';
import Image from 'next/image';
import React, { useState } from 'react';

const SearchForm = () => {

  const [activeTab, setActiveTab] = useState("tab1")
  const [tripType, setTripType] = useState('round');
  const [selectedClass, setSelectedClass] = useState('Economy');
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);


  // Traveler Selector
  const [isOpen, setIsOpen] = useState(false);
  const [travelers, setTravelers] = useState({
    Adults: 1,
    Children: 0,
    Infants: 0,
  });

  const travelerCategories = [
    { key: 'Adults', label: 'Adults', description: '12 years & above' },
    { key: 'Children', label: 'Children', description: 'From 2 to under 12' },
    // { key: 'Kids', label: 'Kids', description: 'From 2 to under 5' },
    { key: 'Infants', label: 'Infants', description: 'Under 2 years' },
  ];

  const handleCountChangeForTraveler = (key, delta) => {
    setTravelers((prev) => {
      const updated = { ...prev };

      const newValue = updated[key] + delta;
      const currentTotal = Object.values(prev).reduce((sum, val) => sum + val, 0);

      // Prevent decreasing Adults below 1
      if (key === 'Adults' && newValue < 1)
        return prev;
      // Prevent total travelers > 9
      if (delta > 0 && currentTotal >= 9)
        return prev;
      // Prevent any category going negative
      if (newValue < 0) return prev;

      updated[key] = newValue;

      return updated;
    });
  };

  const totalTravelers = Object.values(travelers).reduce((sum, val) => sum + val, 0)


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
            <div className='flex items-center justify-between md:w-[800px]'>
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
              <div className='flex gap-6 items-center'>

                {/* Travel Class Dropdown */}
                <div className='relative inline-block text-left'>
                  <button
                    type='button'
                    onClick={() => setClassDropdownOpen(!classDropdownOpen)}
                    className='px-3 py-1 border-[#dbeafe] text-[#3b82f7] font-semibold rounded-md bg-[#dbeafe] flex items-center space-x-1'
                  >
                    <span>{selectedClass}</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {classDropdownOpen && (
                    <div className="absolute mt-1 w-52 bg-white border rounded-lg shadow-lg z-50">
                      {['Economy', 'Premium Economy', 'Business'].map((cls) => (
                        <label
                          key={cls}
                          className={`flex items-center px-4 py-2 cursor-pointer hover:bg-blue-100 ${selectedClass === cls ? 'bg-blue-100 text-blue-600' : ''}`}
                        >
                          <input
                            type="radio"
                            name="travelClass"
                            value={cls}
                            checked={selectedClass === cls}
                            onChange={(e) => {
                              setSelectedClass(e.target.value);
                              setClassDropdownOpen(false);
                            }}
                            className="mr-2"
                          />
                          {cls}
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Traveler add-remove Dropdown */}
                <div className='relative inline-block text-left'>
                  <button type='button'
                    onClick={() => setIsOpen(!isOpen)}
                    className='px-3 py-1 border-[#dbeafe] text-[#3b82f7] font-semibold rounded-md bg-[#dbeafe] flex items-center space-x-1'
                  >
                    <span>
                      {totalTravelers} {`Traveler${totalTravelers > 1 ? 's' : ''}`}</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="absolute mt-1 w-72 bg-white border rounded-lg shadow-lg z-50 p-4">
                      {travelerCategories.map(({ key, label, description }) => (
                        <div key={key} className="flex justify-between items-center py-2">
                          <div>
                            <p className="font-medium">{label}</p>
                            <p className="text-sm text-gray-500">{description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button type='button'
                              onClick={() => handleCountChangeForTraveler(key, -1)}
                              className="w-8 h-8 rounded-full border text-blue-600 border-blue-600 flex items-center justify-center"
                            >
                              −
                            </button>
                            <span className="w-4 text-center">{travelers[key]}</span>
                            <button type='button'
                              onClick={() => handleCountChangeForTraveler(key, 1)}
                              className="w-8 h-8 rounded-full border text-blue-600 border-blue-600 flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                      <button type='button'
                        onClick={() => setIsOpen(false)}
                        className="w-full mt-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                      >
                        Done
                      </button>
                    </div>
                  )}

                </div>

              </div>
            </div>
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