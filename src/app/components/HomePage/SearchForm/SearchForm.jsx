'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Select = dynamic(() => import('react-select'), { ssr: false });

const SearchForm = () => {

  const [activeTab, setActiveTab] = useState("tab1")
  const [tripType, setTripType] = useState('round');
  const [selectedClass, setSelectedClass] = useState('Economy');
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);
  const getFormattedDate = (date) => {
    return date.toISOString().split('T')[0];
  };
  const [departureDate, setDepartureDate] = useState(getFormattedDate(new Date()));
  const [returnDate, setReturnDate] = useState(() => {
    const twoDaysLater = new Date();
    twoDaysLater.setDate(twoDaysLater.getDate() + 2);
    return getFormattedDate(twoDaysLater);
  });

  const [form, setForm] = useState({
    from: '',
    to: '',
  });

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

  // Handle Departure Date Change
  const handleDepartureChange = (e) => {
    const newDeparture = e.target.value;
    setDepartureDate(newDeparture);

    // Auto-correct return date if it becomes earlier than departure
    if (new Date(returnDate) < new Date(newDeparture)) {
      const newReturn = new Date(newDeparture);
      newReturn.setDate(newReturn.getDate() + 2);
      setReturnDate(getFormattedDate(newReturn));
    }
  };

  // Handle Return Date Change
  const handleReturnChange = (e) => {
    const newReturn = e.target.value;
    if (new Date(newReturn) >= new Date(departureDate)) {
      setReturnDate(newReturn);
    }
  };

  // const handleChange = (e) => {
  //   setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Form submitted:', { activeTab, tripType, ...form });
  // };


  // State to hold airport options
  const [airportOptions, setAirportOptions] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [loadingAirports, setLoadingAirports] = useState(true);
  const [errorLoadingAirports, setErrorLoadingAirports] = useState(null);
  // Load JSON data from public folder
  // useEffect(() => {
  //   if (!airportOptions.length) {
  //     fetch('/data/AirportData.json')
  //       .then(res => res.json())
  //       .then(data => {
  //         console.log('Loaded airport data:', data);
  //         const formatted = data.map((airport) => ({
  //           label: `(${airport.IATA}) ${airport.Name} - ${airport.City}, ${airport.Country}`,
  //           value: airport.IATA,
  //         }));
  //         setAirportOptions(formatted);
  //       });
  //   }
  // }, [airportOptions.length]);

  useEffect(() => {
    const fetchAirportData = async () => {
      try {
        if (typeof window !== 'undefined' && airportOptions.length === 0) {
          const response = await fetch('AirportData.json');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          const formatted = data.map((airport) => ({
            label: `(${airport.IATA}) ${airport.Name} - ${airport.City}, ${airport.Country}`,
            value: airport.IATA,
          }));
          setAirportOptions(formatted);
        }
      } catch (error) {
        console.error("Failed to load airport data:", error);
        setErrorLoadingAirports(error.message || "Unknown error");
      } finally {
        setLoadingAirports(false);
      }
    };
  
    fetchAirportData();
  }, []);

  // Label Style for Airport Name Select 
  const floatingLabelClass = "absolute -top-3 left-3 bg-white px-1 text-blue-500 text-base z-10";

  // Config for all From and To fields across One Way, Round Trip, and Multi City Style
  const selectClassNamesStyle = {
    control: ({ isFocused }) =>
      `w-60 rounded-md border px-2 py-1 text-base ${isFocused ? 'border-blue-500 ring-1 ring-blue-300' : 'border-gray-300'
      }`,
    menu: () => 'mt-1 border border-gray-200 rounded-md shadow-lg bg-white',
    option: ({ isFocused, isSelected }) =>
      `px-4 py-2 text-sm cursor-pointer ${isSelected
        ? 'bg-blue-500 text-white'
        : isFocused
          ? 'bg-blue-100'
          : 'text-gray-700'
      }`,
    singleValue: () => 'text-sm text-blue-500',
    placeholder: () => 'text-base text-blue-200',
    input: () => 'text-sm text-gray-800',
  };

  // Journey & Return Date style 
  const JourneyDateStyle = "w-full border border-gray-300 rounded-md px-2 py-[9px]  focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-500"

  const tabs = [
    { id: "tab1", icon: "/airplane.ico", label: "Flight" },
    { id: "tab2", icon: "/love-hotel.ico", label: "Hotel" },
    { id: "tab3", icon: "/visa.ico", label: "Visa" },
    { id: "tab4", icon: "/kaaba.ico", label: "Umrah" },
  ];

  const tabContent = {
    tab1: (
      <form>
        <div className='w-full px-0 sm:px-2 md:px-10 lg:px-10 xl:px-10 max-w-screen-xl mx-auto'>
          {/* Trip Type Selection */}
          <div className="lg:flex justify-between items-center">
            <div className="lg:flex gap-2 space-y-2 lg:space-y-0 py-4">
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
            {/* (Traveler class & traveler dropdown code stays as-is here) */}
            <div className='flex justify-between items-center gap-1 md:gap-3'>
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
                  <div className="absolute mt-1 w-72 bg-white border rounded-lg shadow-lg z-50 p-4 -left-full">
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

          {/* Input Fields Based on Trip Type */}
          {tripType === 'oneway' && (
            <div className="flex flex-col gap-4 md:flex-row lg:items-end my-4 lg:my-0">
              <div className='relative w-full'>
                <label className={floatingLabelClass}>From
                </label>
                <Select
                  options={airportOptions}
                  value={selectedFrom}
                  onChange={setSelectedFrom}
                  placeholder="Select airport"
                  isClearable
                  classNames={selectClassNamesStyle}
                  menuPortalTarget={typeof window !== 'undefined' ? document.body : null}  // Important for Next.js SSR
                  menuPosition="fixed"
                  styles={{
                    menuPortal: (base) => ({
                      ...base,
                      zIndex: 9999,  // Make sure dropdown is always on top
                    }),
                  }}
                />
              </div>
              <div className='relative w-full'>
                <label className={floatingLabelClass}>To
                </label>
                <Select
                  options={airportOptions}
                  value={selectedTo}
                  onChange={setSelectedTo}
                  placeholder="Select airport"
                  isClearable
                  classNames={selectClassNamesStyle}
                  menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                  menuPosition="fixed"
                  styles={{
                    menuPortal: (base) => ({
                      ...base,
                      zIndex: 9999,
                    }),
                  }}
                />
              </div>

              <div className='relative'>
                <label className={floatingLabelClass}>Journey Date
                </label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={handleDepartureChange}
                  className={JourneyDateStyle}
                />
              </div>
              <button className='w-full flex items-center justify-center gap-2 border rounded-md p-[10px] text-white border-orange-500 bg-orange-500 hover:bg-orange-600'><svg xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="white"
                className="w-5 h-5">
                <path strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
              </svg>Search
              </button>
            </div>
          )}

          {tripType === 'round' && (
            <div className="flex flex-col gap-4 md:flex-row lg:items-end my-4 lg:my-0">
              {/* Style for Airport Name Select From */}
              <div className='relative w-full'>
                <label className={floatingLabelClass}>From
                </label>
                <Select
                  options={airportOptions}
                  value={selectedFrom}
                  onChange={setSelectedFrom}
                  placeholder="Select airport"
                  isClearable
                  classNames={selectClassNamesStyle}
                  menuPortalTarget={typeof window !== 'undefined' ? document.body : null}  // Important for Next.js SSR
                  menuPosition="fixed"
                  styles={{
                    menuPortal: (base) => ({
                      ...base,
                      zIndex: 9999,  // Make sure dropdown is always on top
                    }),
                  }}
                />
              </div>
              {/* Style for Airport Name Select To */}
              <div className='relative w-full'>
                <label className={floatingLabelClass}>To
                </label>
                <Select
                  options={airportOptions}
                  value={selectedTo}
                  onChange={setSelectedTo}
                  placeholder="Select airport"
                  isClearable
                  classNames={selectClassNamesStyle}
                  menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                  menuPosition="fixed"
                  styles={{
                    menuPortal: (base) => ({
                      ...base,
                      zIndex: 9999,
                    }),
                  }}
                />
              </div>
              <div className='relative w-full'>
                <label className={floatingLabelClass}>Journey Date
                </label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={handleDepartureChange}
                  className={JourneyDateStyle}
                />
              </div>
              <div className='relative w-full'>
                <label className={floatingLabelClass}>Return Date
                </label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={handleReturnChange}
                  min={departureDate}
                  className={JourneyDateStyle}
                />
              </div>
              <button className='w-full flex items-center justify-center gap-2 border rounded-md p-[10px] text-white border-orange-500 bg-orange-500 hover:bg-orange-600'><svg xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="white"
                className="w-5 h-5">
                <path strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
              </svg>Search
              </button>
            </div>
          )}

          {tripType === 'multi' && (
            <div className="flex flex-col gap-2  space-y-1">
              {[1, 2].map((i) => (
                <div key={i} className="flex flex-col gap-4 md:flex-row lg:items-end my-4 lg:my-0">
                  <div className='relative'>
                    <label className={floatingLabelClass}>From
                    </label>
                    <Select
                      options={airportOptions}
                      value={selectedFrom}
                      onChange={setSelectedFrom}
                      placeholder="Select airport"
                      isClearable
                      classNames={selectClassNamesStyle}
                      menuPortalTarget={typeof window !== 'undefined' ? document.body : null}  // Important for Next.js SSR
                      menuPosition="fixed"
                      styles={{
                        menuPortal: (base) => ({
                          ...base,
                          zIndex: 9999,  // Make sure dropdown is always on top
                        }),
                      }}
                    />
                  </div>
                  <div className='relative'>
                    <label className={floatingLabelClass}>To
                    </label>
                    <Select
                      options={airportOptions}
                      value={selectedTo}
                      onChange={setSelectedTo}
                      placeholder="Select airport"
                      isClearable
                      classNames={selectClassNamesStyle}
                      menuPortalTarget={typeof window !== 'undefined' ? document.body : null}  // Important for Next.js SSR
                      menuPosition="fixed"
                      styles={{
                        menuPortal: (base) => ({
                          ...base,
                          zIndex: 9999,  // Make sure dropdown is always on top
                        }),
                      }}
                    />
                  </div>
                  <div className='relative'>
                    <label className={floatingLabelClass}>Journey Date
                    </label>
                    <input type="date"
                      value={departureDate}
                      onChange={handleDepartureChange} placeholder={`Date ${i}`} className={JourneyDateStyle} />
                  </div>

                </div>
              ))}
              <button type="button" className="text-blue-600 hover:underline text-sm">+ Add another city</button>
              <div className='flex justify-center border rounded-md px-8 text-white border-gray-300 bg-orange-500 hover:bg-orange-600'>
                <button className='flex items-center justify-center gap-2 '><svg xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="white"
                  className="w-5 h-10">
                  <path strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                </svg>Search
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
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
    <div className='mx-auto my-6 md:my-10 bg-white p-6 shadow-lg space-y-2 border-[1px] rounded-md' >

      {/* For Tab  */}
      <div className='flex justify-around flex-wrap border-b'>
        {tabs.map((tab) => (
          <button key={tab.id}
            className={`px-3 py-2 font-semibold flex  gap-2 rounded-lg ${activeTab === tab.id ? "border-b-2 border-[#1882ff] text-[#1882ff] transition-colors duration-200" : "text-gray-500 hover:text-[#1882ff]"
              }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <Image src={tab.icon} alt={tab.label} width={20} height={0} />
            {tab.label}
          </button>))}
      </div>

      {/* For Tab Content  */}
      <div>
        {tabContent[activeTab]}
      </div>
    </div>
  );
};

export default SearchForm;




