'use client';
import Spinner from '@/app/components/shared/Spinner/Spinner';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { ImSpinner3 } from 'react-icons/im';
import Select from 'react-select';
import { toast } from 'react-toastify';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const VisaCountryPage = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const { country } = useParams(); // e.g. "uae"
  const [visaData, setVisaData] = useState([]);
  const [visaInfo, setVisaInfo] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [activeTravelerOccupation, setActiveTravelerOccupation] = useState(null);
  const [selectedVisaType, setSelectedVisaType] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicantName, setApplicantName] = useState("")
  const [applicantMobileNumber, setApplicantMobileNumber] = useState('');
  const [applicantPassportNumber, setApplicantPassportNumber] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  // Set default name from session when available
  useEffect(() => {
    if (session?.user?.name) {
      setApplicantName(session.user.name);
      setIsEditable(false);
    }
  }, [session]);

  const handleApplyForOthers = () => {
    setIsEditable(true);

    // 🔹 Focus the input after it's editable
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0); // next tick to ensure DOM updates
  };


  // Loading state
  const [loading, setLoading] = useState(false); // <-- 🔹 

  // Label Style for Country Name Select dropdown menu 
  const floatingLabelClass = "absolute -top-3 left-3 bg-white px-1 text-[#585c63] font-semibold z-10";

  // Fetch visa data and set matched country
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // <-- 🔹 Start loading

      try {
        const res = await fetch('/visaData.json');
        const data = await res.json();
        setVisaData(data);

        const matched = data.find(
          (item) =>
            item.country.toLowerCase().replace(/\s+/g, '-') ===
            country.toLowerCase()
        );

        if (matched) {
          setVisaInfo(matched);
          setSelectedCountry({ label: matched.country, value: matched.country });
          const travelerOccupation = Object.keys(matched.documents || {});
          if (travelerOccupation.length > 0) setActiveTravelerOccupation(travelerOccupation[0]);
        } else {
          setVisaInfo(null);
          setSelectedCountry(null);
        }
      } catch (err) {
        console.error('Failed to load visa data:', err);
      }

      setLoading(false); // <-- 🔹 End loading
    };

    fetchData();
  }, [country]);

  // Change country via dropdown
  const handleCountryChange = (option) => {
    if (!option) return;
    const slug = option.value.toLowerCase().replace(/\s+/g, '-');
    router.push(`/visa/${slug}`);
  };

  // Apply Visa handler 
  const handleApplyVisa = async () => {
    // 🔹 Check login status first
    if (!session?.user) {
      signIn(undefined, { callbackUrl: pathname });
      return;
    }

    // 🔹 Check visa type
    if (!selectedVisaType) {
      toast.error('Please select visa type');
      return;
    }

    // 🔹 Check applicant name
    if (!applicantName.trim()) {
      setError("Applicant name is required.");
      return;
    } else {
      setError("");
    }

    const visaDetails = visaInfo?.visaTypes[selectedVisaType];
    if (!visaDetails) {
      toast.error('Invalid visa details');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/apply-visa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          country: visaInfo.country,
          visaType: selectedVisaType,
          applicantName: applicantName.trim(),
          mobileNumber: Number(applicantMobileNumber),
          passportNumber: applicantPassportNumber,
          price: visaDetails.price,
          validity: visaDetails.validity,
          maxStay: visaDetails.maxStay,
          email: session.user.email,
          visaStatus: "Entry",
          paymentStats:"Unpaid",
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success('Visa application submitted!');
      router.push('/bookings/visa');
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {
        loading ? (
          <div className="flex justify-center items-center h-full" >
            <Spinner />
          </div >
        ) : (

          <div className='bg-[#e2e8f0] mx-auto md:px-52 sm:px-0 mt-0 py-1 md:py-8 container'>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-2 md:p-4">
              {/* Left large div  */}
              <div className="col-span-2 flex">
                <div className='flex-col w-full'>
                  {/* heading start */}
                  <div className='bg-white w-full rounded-t-md px-3 py-2 flex flex-col md:flex-row justify-between items-center space-x-1 space-y-4 md:space-y-0'>
                    <div>
                      <h2 className="text-xl text-center md:text-left text-brandBlue font-bold">{visaInfo?.country}</h2>
                      <h2 className="md:text-lg font-bold">Tourist Visa Only</h2>
                    </div>
                    {/* Country selection dropdown */}
                    <div className="relative w-44 md:w-52">
                      <label className={floatingLabelClass}>Select Country</label>
                      <Select
                        instanceId="select-country"
                        options={visaData.map((d) => ({
                          label: d.country,
                          value: d.country,
                        }))}
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        placeholder="Choose a country"
                        isClearable
                      />
                    </div>
                  </div>  {/* heading end */}

                  {/* Price Details */}
                  <div className="bg-[#f3f4f6] rounded-b-md px-0 py-4">
                    {visaInfo?.visaTypes && (
                      <div className="overflow-x-auto border-2 rounded-lg w-full max-w-full mx-auto">
                        <table className="table table-zebra w-fit md:w-full">
                          {/* Table Head */}
                          <thead>
                            <tr className='text-base font-semibold bg-blue-100 text-brandBlue'>
                              <th>Visa Type</th>
                              <th>Delivery Time</th>
                              <th>Price</th>
                            </tr>
                          </thead>

                          {/* Table Body */}
                          <tbody className='bg-white'>
                            {Object.entries(visaInfo.visaTypes).map(([type, details]) => (
                              <tr key={type} className="font-semibold hover:bg-orange-200">
                                <td >{type}</td>
                                <td>{details.processingTime} Days</td>
                                <td>{details.price} BDT</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* Required documents */}
                  <div className='bg-white h-fit mt-4 p-3 rounded-md'>
                    {/* name of each tab group should be unique */}
                    {visaInfo?.documents && (
                      <div className="w-full mt-4">
                        <h5 className="text-sm font-bold text-[#333333] mb-2">Required Documents for E visa</h5>

                        <TabGroup selectedIndex={Object.keys(visaInfo.documents).indexOf(activeTravelerOccupation)} onChange={(index) => {
                          const newOccupation = Object.keys(visaInfo.documents)[index];
                          setActiveTravelerOccupation(newOccupation);
                        }}>
                          {/* Tabs */}
                          <TabList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-2">
                            {Object.keys(visaInfo.documents).map((occupation) => (
                              <Tab
                                key={occupation}
                                className={({ selected }) =>
                                  classNames(
                                    'text-sm font-medium md:px-1 py-1 border-x-2  transition duration-200',
                                    selected
                                      ? 'bg-white border-t-4 border-brandBlue text-brandBlue rounded-t-lg shadow-sm'
                                      : 'bg-gray-100 border-x-gray-400 border-y border-y-gray-400 text-gray-700 rounded-t-lg hover:bg-white hover:border-gray-300'
                                  )
                                }
                              >
                                {occupation}
                              </Tab>
                            ))}
                          </TabList>

                          {/* Tab panels */}
                          <TabPanels className="mt-4">
                            {Object.values(visaInfo.documents).map((docs, idx) => (
                              <TabPanel key={idx} className="bg-white rounded-xl p-3 mt-2 border border-gray-200 shadow-sm">
                                <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                                  {docs.map((doc, i) => (
                                    <li key={i}>{doc}</li>
                                  ))}
                                </ul>
                              </TabPanel>
                            ))}
                          </TabPanels>
                        </TabGroup>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right column (div 2 -- Looking for Expert Visa Guidance and div 3--- Select offer stacked) */}
              <div className="grid md:content-start grid-cols-1 md:col-span-1 col-span-2 gap-4 ">

                {/* div 2 -- Looking for Expert Visa Guidance */}
                <div className="rounded-md flex-row text-center justify-center place-content-center h-fit bg-[#ffe1c2] space-y-1 p-4 items-start">
                  <p className='text-lg font-bold text-[#333333] mt-2'>Looking for Expert Visa
                    Guidance?</p>
                  <p className='text-sm font-semibold text-[#333333] py-2'>Don't know where to begin? Share your details, and our experienced visa consultants will assist you on every step.</p>
                  <div className=''>
                    <Link className='flex items-center justify-center text-[#f27d00] hover:text-[#b43403]' href="tel:+8801913509561">
                      <span>
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.5158 14.4925L13.3491 12.6591C13.459 12.5484 13.5982 12.4713 13.7504 12.4368C13.9025 12.4022 14.0613 12.4117 14.2083 12.4641C15.1661 12.7801 16.1689 12.9385 17.1775 12.9333C17.2855 12.9306 17.393 12.95 17.4933 12.9903C17.5936 13.0306 17.6846 13.0908 17.7608 13.1675C17.8382 13.2432 17.8994 13.3339 17.9405 13.434C17.9816 13.5342 18.0019 13.6417 18 13.75V16.68C18.0026 16.788 17.9832 16.8955 17.943 16.9958C17.9027 17.0961 17.8424 17.1871 17.7658 17.2633C17.6896 17.3399 17.5986 17.4002 17.4983 17.4405C17.398 17.4808 17.2905 17.5001 17.1825 17.4975C14.981 17.4618 12.8132 16.951 10.8275 16C9.63329 15.4366 10.3175 13.8675 11.5158 14.4925Z" fill="#F27D00"></path>
                          <path d="M6.0075 8.98415C6.6325 10.1825 5.22083 11.085 4.4475 9.56748C3.51005 7.61726 3.01573 5.48377 3 3.31998C2.99733 3.21194 3.01672 3.10449 3.05698 3.00419C3.09724 2.9039 3.15753 2.81286 3.23417 2.73665C3.31037 2.66002 3.40141 2.59973 3.50171 2.55947C3.602 2.51921 3.70946 2.49982 3.8175 2.50249H6.75C6.85804 2.49982 6.96549 2.51921 7.06579 2.55947C7.16609 2.59973 7.25712 2.66002 7.33333 2.73665C7.40996 2.81286 7.47025 2.9039 7.51052 3.00419C7.55078 3.10449 7.57017 3.21194 7.5675 3.31998C7.56231 4.32856 7.72076 5.33131 8.03666 6.28915C8.08908 6.4361 8.09858 6.59493 8.06405 6.74708C8.02952 6.89923 7.95238 7.0384 7.84167 7.14832L6.0075 8.98415Z" fill="#F27D00"></path>
                          <path opacity="0.88" d="M6.00756 8.98416C6.61553 10.1577 7.39993 11.231 8.33339 12.1667C9.26941 13.0996 10.343 13.8834 11.5167 14.4908C12.0076 14.7742 11.2667 16.2025 10.8284 15.9975C9.46578 15.3228 8.22629 14.4239 7.16172 13.3383C6.05842 12.2362 5.14198 10.9617 4.44839 9.56499C4.08339 8.85499 5.71256 8.41666 6.00756 8.98416Z" fill="#F27D00"></path>
                        </svg>
                      </span><p className='text-lg font-semibold'>+8801913509561</p></Link>
                  </div>
                </div>

                {/* div 3--- Apply now section */}
                <div className="bg-white rounded-md space-y-3 pb-3">
                  <h4 className='rounded-t-md bg-[#f3f4f6] text-sm font-bold text-[#333333] w-full text-center py-2'>{visaInfo?.visaType} ({visaInfo?.country}) </h4>
                  <div className='rounded-md px-1 md:px-4 py-2 m-4 bg-[#f3f4f6] '>
                    <Select
                      instanceId="select-visa-type"
                      options={
                        visaInfo?.visaTypes
                          ? Object.entries(visaInfo.visaTypes).map(([type, details]) => ({
                            label: type,
                            value: type,
                          }))
                          : []
                      }
                      value={
                        selectedVisaType
                          ? { label: selectedVisaType, value: selectedVisaType } : null
                      }
                      onChange={(option) => setSelectedVisaType(option?.value || null)}
                      placeholder="Please select visa type"
                      isClearable
                    ></Select>
                  </div>

                  {/* name input field */}
                  <div className="relative mt-6 px-1 py-2 md:px-4 bg-[#f3f4f6] mx-4 rounded-md">
                    <input
                      ref={inputRef}
                      type="text"
                      id="applicantName"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      readOnly={!isEditable}
                      className={`peer w-full border rounded px-2 pt-3 pb-1 placeholder-transparent focus:outline-none ${error ? "border-red-500 focus:border-red-500" : "focus:border-blue-500"} ${!isEditable ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                      placeholder="Enter applicant name"
                      required
                    />
                    <label
                      htmlFor="applicantName"
                      className={`absolute left-6 top-0 text-[#333333] text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#333333] peer-focus:-top-1 peer-focus:bg-white peer-focus:text-sm peer-focus:text-blue-500`}
                    >
                      Enter applicant name
                    </label>
                    {session?.user?.name && !isEditable && (
                      <div className='flex items-center justify-end'>
                        <button
                          type="button"
                          onClick={() => handleApplyForOthers(true)}
                          className="mt-0.5 text-sm text-blue-600  hover:underline"
                        >
                          Apply for others
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Passport input field */}
                  <div className="relative mt-6 px-1 py-2 md:px-4 bg-[#f3f4f6] mx-4 rounded-md">
                    <input
                      ref={inputRef}
                      type="tel"
                      id="applicantPassportNumber"
                      value={applicantPassportNumber}
                      onChange={(e) => setApplicantPassportNumber(e.target.value)}
                      className={`peer w-full border rounded px-2 pt-3 uppercase pb-1 placeholder-transparent focus:outline-none ${error ? "border-red-500 focus:border-red-500" : "focus:border-blue-500"}`}
                      placeholder="Enter your Passport number"
                      required
                    />
                    <label
                      htmlFor="applicantPassportNumber"
                      className={`absolute left-6 top-0 text-[#333333] text-sm transition-all peer-placeholder-shown:top-[15px] peer-placeholder-shown:text-base peer-placeholder-shown:text-[#333333] peer-focus:-top-1 peer-focus:bg-white peer-focus:text-sm peer-focus:text-blue-500`}
                    >
                      Enter your Passport number
                    </label>
                  </div>
                  {/* Mobile number input field */}
                  <div className="relative mt-6 px-1 py-2 md:px-4 bg-[#f3f4f6] mx-4 rounded-md">
                    <input
                      ref={inputRef}
                      type="tel"
                      id="applicantMobileNumber"
                      value={applicantMobileNumber}
                      onChange={(e) => setApplicantMobileNumber(e.target.value)}
                      className={`peer w-full border rounded px-2 pt-3 pb-1 placeholder-transparent focus:outline-none ${error ? "border-red-500 focus:border-red-500" : "focus:border-blue-500"}`}
                      placeholder="Enter your mobile number"
                      required
                    />
                    <label
                      htmlFor="applicantMobileNumber"
                      className={`absolute left-6 top-0 text-[#333333] text-sm transition-all peer-placeholder-shown:top-[15px] peer-placeholder-shown:text-base peer-placeholder-shown:text-[#333333] peer-focus:-top-1 peer-focus:bg-white peer-focus:text-sm peer-focus:text-blue-500`}
                    >
                      Enter your Mobile number
                    </label>
                  </div>

                  {/* Validity */}
                  <div className='rounded-md px-1 md:px-4 py-2 m-4 bg-[#f3f4f6] flex justify-between items-center space-x-1'>
                    <div className='flex space-x-1 items-center'>
                      <svg width="16" height="16" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="path-1-inside-1_5996_13793" fill="white">
                          <path fillRule="evenodd" clipRule="evenodd" d="M4.99998 6.76364C5.55352 6.76364 6.00226 6.31491 6.00226 5.76137C6.00226 5.20783 5.55352 4.75909 4.99998 4.75909C4.44644 4.75909 3.99771 5.20783 3.99771 5.76137C3.99771 6.31491 4.44644 6.76364 4.99998 6.76364ZM4.99998 7.43182C5.92255 7.43182 6.67044 6.68393 6.67044 5.76137C6.67044 4.8388 5.92255 4.09091 4.99998 4.09091C4.07742 4.09091 3.32953 4.8388 3.32953 5.76137C3.32953 6.68393 4.07742 7.43182 4.99998 7.43182Z"></path>
                        </mask>
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.99998 6.76364C5.55352 6.76364 6.00226 6.31491 6.00226 5.76137C6.00226 5.20783 5.55352 4.75909 4.99998 4.75909C4.44644 4.75909 3.99771 5.20783 3.99771 5.76137C3.99771 6.31491 4.44644 6.76364 4.99998 6.76364ZM4.99998 7.43182C5.92255 7.43182 6.67044 6.68393 6.67044 5.76137C6.67044 4.8388 5.92255 4.09091 4.99998 4.09091C4.07742 4.09091 3.32953 4.8388 3.32953 5.76137C3.32953 6.68393 4.07742 7.43182 4.99998 7.43182Z" fill="#9BA6B2"></path>
                        <path d="M4.00226 5.76137C4.00226 5.21034 4.44895 4.76364 4.99998 4.76364V8.76364C6.65809 8.76364 8.00226 7.41948 8.00226 5.76137H4.00226ZM4.99998 6.75909C4.44895 6.75909 4.00226 6.3124 4.00226 5.76137H8.00226C8.00226 4.10326 6.65809 2.75909 4.99998 2.75909V6.75909ZM5.99771 5.76137C5.99771 6.3124 5.55101 6.75909 4.99998 6.75909V2.75909C3.34187 2.75909 1.99771 4.10326 1.99771 5.76137H5.99771ZM4.99998 4.76364C5.55101 4.76364 5.99771 5.21034 5.99771 5.76137H1.99771C1.99771 7.41948 3.34187 8.76364 4.99998 8.76364V4.76364ZM4.67044 5.76137C4.67044 5.57936 4.81798 5.43182 4.99998 5.43182V9.43182C7.02712 9.43182 8.67044 7.7885 8.67044 5.76137H4.67044ZM4.99998 6.09091C4.81798 6.09091 4.67044 5.94337 4.67044 5.76137H8.67044C8.67044 3.73423 7.02712 2.09091 4.99998 2.09091V6.09091ZM5.32953 5.76137C5.32953 5.94337 5.18199 6.09091 4.99998 6.09091V2.09091C2.97285 2.09091 1.32953 3.73423 1.32953 5.76137H5.32953ZM4.99998 5.43182C5.18199 5.43182 5.32953 5.57936 5.32953 5.76137H1.32953C1.32953 7.7885 2.97285 9.43182 4.99998 9.43182V5.43182Z" fill="#9BA6B2" mask="url(#path-1-inside-1_5996_13793)"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.85223 8.72044C2.85223 8.53593 2.97032 8.38635 3.11599 8.38635H6.88393C7.0296 8.38635 7.14769 8.53593 7.14769 8.72044C7.14769 8.90496 7.0296 9.05453 6.88393 9.05453H3.11599C2.97032 9.05453 2.85223 8.90496 2.85223 8.72044Z" fill="#1A2B3D"></path>
                        <path d="M3.05223 8.72044C3.05223 8.66975 3.06864 8.63071 3.08646 8.60813C3.10386 8.5861 3.11565 8.58635 3.11598 8.58635L3.11599 8.58635H6.88393L6.88394 8.58635C6.88427 8.58635 6.89606 8.5861 6.91346 8.60813C6.93128 8.63071 6.94769 8.66975 6.94769 8.72044C6.94769 8.77114 6.93128 8.81018 6.91346 8.83275C6.89606 8.85479 6.88427 8.85454 6.88394 8.85453L6.88393 8.85453H3.11599L3.11598 8.85453C3.11565 8.85454 3.10386 8.85479 3.08646 8.83275C3.06864 8.81018 3.05223 8.77113 3.05223 8.72044Z" stroke="#9BA6B2" strokeWidth="0.4" strokeLinecap="round"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.943176 2.01562C0.943176 1.31664 1.50137 0.75 2.18995 0.75H8.73357C8.91209 0.75 9.05681 0.896907 9.05681 1.07812C9.05681 1.25934 8.91209 1.40625 8.73357 1.40625H8.40639H2.18995C1.85841 1.40625 1.58965 1.67908 1.58965 2.01562V2.18182V2.83807V9.98437C1.58965 10.3209 1.85841 10.5937 2.18995 10.5937H7.81004C8.14158 10.5937 8.41034 10.3209 8.41034 9.98437V2.83807H1.58965H1.35721C1.17869 2.83807 1.03397 2.69116 1.03397 2.50994C1.03397 2.32872 1.17869 2.18182 1.35721 2.18182H1.58965H8.45428H9.05681V9.98437C9.05681 10.6834 8.49862 11.25 7.81004 11.25H2.18995C1.50137 11.25 0.943176 10.6834 0.943176 9.98437V2.01562Z" fill="#9BA6B2"></path>
                        <path d="M1.58965 2.83807V2.18182H1.35721C1.17869 2.18182 1.03397 2.32872 1.03397 2.50994C1.03397 2.69116 1.17869 2.83807 1.35721 2.83807H1.58965Z" fill="#9BA6B2"></path>
                        <path d="M1.58965 2.83807V2.18182M1.58965 2.83807H1.35721C1.17869 2.83807 1.03397 2.69116 1.03397 2.50994C1.03397 2.32872 1.17869 2.18182 1.35721 2.18182H1.58965M1.58965 2.83807H8.41034V9.98437C8.41034 10.3209 8.14158 10.5937 7.81004 10.5937H2.18995C1.85841 10.5937 1.58965 10.3209 1.58965 9.98437V2.83807ZM1.58965 2.18182V2.01562C1.58965 1.67908 1.85841 1.40625 2.18995 1.40625H8.40639H8.73358C8.91209 1.40625 9.05681 1.25934 9.05681 1.07812C9.05681 0.896907 8.91209 0.75 8.73358 0.75H2.18995C1.50137 0.75 0.943176 1.31664 0.943176 2.01562V9.98437C0.943176 10.6834 1.50137 11.25 2.18995 11.25H7.81004C8.49862 11.25 9.05681 10.6834 9.05681 9.98437V2.18182H8.45428H1.58965Z" stroke="#9BA6B2" strokeWidth="0.3" strokeLinecap="round"></path>
                      </svg>
                      <h2 className="text-sm font-medium">Validity</h2>
                    </div>
                    <div>
                      <p className='font-bold'>{selectedVisaType ? visaInfo?.visaTypes[selectedVisaType]?.validity : 'N/A'} Days</p>
                    </div>
                  </div>

                  {/* Max Stay */}
                  <div className='rounded-md px-1 md:px-4 py-2 m-4 bg-[#f3f4f6] flex justify-between items-center space-x-1'>
                    <div className='flex space-x-1 items-center'>
                      <svg width="16" height="16" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="path-1-inside-1_5996_13793" fill="white">
                          <path fillRule="evenodd" clipRule="evenodd" d="M4.99998 6.76364C5.55352 6.76364 6.00226 6.31491 6.00226 5.76137C6.00226 5.20783 5.55352 4.75909 4.99998 4.75909C4.44644 4.75909 3.99771 5.20783 3.99771 5.76137C3.99771 6.31491 4.44644 6.76364 4.99998 6.76364ZM4.99998 7.43182C5.92255 7.43182 6.67044 6.68393 6.67044 5.76137C6.67044 4.8388 5.92255 4.09091 4.99998 4.09091C4.07742 4.09091 3.32953 4.8388 3.32953 5.76137C3.32953 6.68393 4.07742 7.43182 4.99998 7.43182Z"></path>
                        </mask>
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.99998 6.76364C5.55352 6.76364 6.00226 6.31491 6.00226 5.76137C6.00226 5.20783 5.55352 4.75909 4.99998 4.75909C4.44644 4.75909 3.99771 5.20783 3.99771 5.76137C3.99771 6.31491 4.44644 6.76364 4.99998 6.76364ZM4.99998 7.43182C5.92255 7.43182 6.67044 6.68393 6.67044 5.76137C6.67044 4.8388 5.92255 4.09091 4.99998 4.09091C4.07742 4.09091 3.32953 4.8388 3.32953 5.76137C3.32953 6.68393 4.07742 7.43182 4.99998 7.43182Z" fill="#9BA6B2"></path>
                        <path d="M4.00226 5.76137C4.00226 5.21034 4.44895 4.76364 4.99998 4.76364V8.76364C6.65809 8.76364 8.00226 7.41948 8.00226 5.76137H4.00226ZM4.99998 6.75909C4.44895 6.75909 4.00226 6.3124 4.00226 5.76137H8.00226C8.00226 4.10326 6.65809 2.75909 4.99998 2.75909V6.75909ZM5.99771 5.76137C5.99771 6.3124 5.55101 6.75909 4.99998 6.75909V2.75909C3.34187 2.75909 1.99771 4.10326 1.99771 5.76137H5.99771ZM4.99998 4.76364C5.55101 4.76364 5.99771 5.21034 5.99771 5.76137H1.99771C1.99771 7.41948 3.34187 8.76364 4.99998 8.76364V4.76364ZM4.67044 5.76137C4.67044 5.57936 4.81798 5.43182 4.99998 5.43182V9.43182C7.02712 9.43182 8.67044 7.7885 8.67044 5.76137H4.67044ZM4.99998 6.09091C4.81798 6.09091 4.67044 5.94337 4.67044 5.76137H8.67044C8.67044 3.73423 7.02712 2.09091 4.99998 2.09091V6.09091ZM5.32953 5.76137C5.32953 5.94337 5.18199 6.09091 4.99998 6.09091V2.09091C2.97285 2.09091 1.32953 3.73423 1.32953 5.76137H5.32953ZM4.99998 5.43182C5.18199 5.43182 5.32953 5.57936 5.32953 5.76137H1.32953C1.32953 7.7885 2.97285 9.43182 4.99998 9.43182V5.43182Z" fill="#9BA6B2" mask="url(#path-1-inside-1_5996_13793)"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.85223 8.72044C2.85223 8.53593 2.97032 8.38635 3.11599 8.38635H6.88393C7.0296 8.38635 7.14769 8.53593 7.14769 8.72044C7.14769 8.90496 7.0296 9.05453 6.88393 9.05453H3.11599C2.97032 9.05453 2.85223 8.90496 2.85223 8.72044Z" fill="#1A2B3D"></path>
                        <path d="M3.05223 8.72044C3.05223 8.66975 3.06864 8.63071 3.08646 8.60813C3.10386 8.5861 3.11565 8.58635 3.11598 8.58635L3.11599 8.58635H6.88393L6.88394 8.58635C6.88427 8.58635 6.89606 8.5861 6.91346 8.60813C6.93128 8.63071 6.94769 8.66975 6.94769 8.72044C6.94769 8.77114 6.93128 8.81018 6.91346 8.83275C6.89606 8.85479 6.88427 8.85454 6.88394 8.85453L6.88393 8.85453H3.11599L3.11598 8.85453C3.11565 8.85454 3.10386 8.85479 3.08646 8.83275C3.06864 8.81018 3.05223 8.77113 3.05223 8.72044Z" stroke="#9BA6B2" strokeWidth="0.4" strokeLinecap="round"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.943176 2.01562C0.943176 1.31664 1.50137 0.75 2.18995 0.75H8.73357C8.91209 0.75 9.05681 0.896907 9.05681 1.07812C9.05681 1.25934 8.91209 1.40625 8.73357 1.40625H8.40639H2.18995C1.85841 1.40625 1.58965 1.67908 1.58965 2.01562V2.18182V2.83807V9.98437C1.58965 10.3209 1.85841 10.5937 2.18995 10.5937H7.81004C8.14158 10.5937 8.41034 10.3209 8.41034 9.98437V2.83807H1.58965H1.35721C1.17869 2.83807 1.03397 2.69116 1.03397 2.50994C1.03397 2.32872 1.17869 2.18182 1.35721 2.18182H1.58965H8.45428H9.05681V9.98437C9.05681 10.6834 8.49862 11.25 7.81004 11.25H2.18995C1.50137 11.25 0.943176 10.6834 0.943176 9.98437V2.01562Z" fill="#9BA6B2"></path>
                        <path d="M1.58965 2.83807V2.18182H1.35721C1.17869 2.18182 1.03397 2.32872 1.03397 2.50994C1.03397 2.69116 1.17869 2.83807 1.35721 2.83807H1.58965Z" fill="#9BA6B2"></path>
                        <path d="M1.58965 2.83807V2.18182M1.58965 2.83807H1.35721C1.17869 2.83807 1.03397 2.69116 1.03397 2.50994C1.03397 2.32872 1.17869 2.18182 1.35721 2.18182H1.58965M1.58965 2.83807H8.41034V9.98437C8.41034 10.3209 8.14158 10.5937 7.81004 10.5937H2.18995C1.85841 10.5937 1.58965 10.3209 1.58965 9.98437V2.83807ZM1.58965 2.18182V2.01562C1.58965 1.67908 1.85841 1.40625 2.18995 1.40625H8.40639H8.73358C8.91209 1.40625 9.05681 1.25934 9.05681 1.07812C9.05681 0.896907 8.91209 0.75 8.73358 0.75H2.18995C1.50137 0.75 0.943176 1.31664 0.943176 2.01562V9.98437C0.943176 10.6834 1.50137 11.25 2.18995 11.25H7.81004C8.49862 11.25 9.05681 10.6834 9.05681 9.98437V2.18182H8.45428H1.58965Z" stroke="#9BA6B2" strokeWidth="0.3" strokeLinecap="round"></path>
                      </svg>
                      <h2 className="text-sm font-medium">Max Stay</h2>
                    </div>
                    <div>
                      <p className='font-bold'>{selectedVisaType ? visaInfo?.visaTypes[selectedVisaType]?.maxStay : 'N/A'} Days</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className='rounded-md px-1 md:px-4 py-2 m-4 bg-[#f3f4f6] flex justify-between items-center space-x-1'>
                    <div className='flex space-x-1 items-center'>
                      <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.00002 12.8333C10.2217 12.8333 12.8334 10.2217 12.8334 6.99999C12.8334 3.77833 10.2217 1.16666 7.00002 1.16666C3.77836 1.16666 1.16669 3.77833 1.16669 6.99999C1.16669 10.2217 3.77836 12.8333 7.00002 12.8333ZM7.00002 11.6667C9.57735 11.6667 11.6667 9.57732 11.6667 6.99999C11.6667 4.42266 9.57735 2.33332 7.00002 2.33332C4.42269 2.33332 2.33335 4.42266 2.33335 6.99999C2.33335 9.57732 4.42269 11.6667 7.00002 11.6667Z" fill="#9BA6B2"></path>
                        <path d="M7.63888 9.36077H6.59445C5.85556 9.36077 5.25 8.73855 5.25 7.97188C5.25 7.7441 5.43889 7.55521 5.66667 7.55521C5.89444 7.55521 6.08333 7.7441 6.08333 7.97188C6.08333 8.27744 6.31112 8.52744 6.59445 8.52744H7.63888C7.85555 8.52744 8.02778 8.33299 8.02778 8.0941C8.02778 7.7941 7.94445 7.74966 7.75556 7.68299L6.08333 7.09966C5.72778 6.97188 5.25 6.71633 5.25 5.89966C5.25 5.20522 5.80001 4.633 6.47223 4.633H7.51666C8.25555 4.633 8.86111 5.25522 8.86111 6.02188C8.86111 6.24966 8.67222 6.43855 8.44444 6.43855C8.21667 6.43855 8.02778 6.24966 8.02778 6.02188C8.02778 5.71633 7.79999 5.46633 7.51666 5.46633H6.47223C6.25556 5.46633 6.08333 5.66077 6.08333 5.89966C6.08333 6.19966 6.16666 6.2441 6.35555 6.31077L8.02778 6.8941C8.38333 7.02188 8.86111 7.27744 8.86111 8.0941C8.86111 8.7941 8.3111 9.36077 7.63888 9.36077Z" fill="#9BA6B2"></path>
                        <path d="M7.05558 9.91631C6.8278 9.91631 6.63892 9.72742 6.63892 9.49964V4.49964C6.63892 4.27187 6.8278 4.08298 7.05558 4.08298C7.28336 4.08298 7.47225 4.27187 7.47225 4.49964V9.49964C7.47225 9.72742 7.28336 9.91631 7.05558 9.91631Z" fill="#9BA6B2"></path>
                      </svg>
                      <h2 className="text-sm font-medium">Total Price</h2>
                    </div>
                    <div>
                      <p className='font-bold'>{selectedVisaType ? visaInfo?.visaTypes[selectedVisaType]?.price : 'N/A'} BDT</p>
                    </div>
                  </div>

                  {/* Apply now button */}
                  <button
                    onClick={handleApplyVisa}
                    disabled={isSubmitting}
                    className={`mx-auto flex items-center justify-center gap-2 border rounded-md px-8 py-2 text-white ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        <ImSpinner3 className="animate-spin text-white text-lg" />
                        Submitting...
                      </>
                    ) : (
                      'Apply now'
                    )}
                  </button>

                </div>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default VisaCountryPage;

