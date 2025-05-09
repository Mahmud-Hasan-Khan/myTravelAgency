'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Select from 'react-select';

const VisaCountryPage = () => {
  const { country } = useParams(); // e.g. "uae"
  const router = useRouter();

  const [visaData, setVisaData] = useState([]);
  const [visaInfo, setVisaInfo] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(false); // <-- 🔹 Loading state

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

  return (
    <div className='bg-[#e2e8f0] mx-auto md:px-52 sm:px-0 mt-0 py-8 container'>

      <div className="grid md:grid-cols-3 gap-6  p-4">
        {/* Left large div (div 1) */}
        <div className="col-span-2 flex min-h-96">
          <div className='flex-col w-full'>
            <div className='bg-white w-full rounded-t-md px-3 py-2'>
              <h2 className="text-xl text-[#9ca3af] font-bold">{visaInfo?.country}</h2>
              <h2 className="text-lg font-bold">Tourist Visa Only</h2>
            </div>
            <div className='bg-[#f3f4f6] p-3 rounded-b-md flex space-x-2'>
              <div className='rounded-full px-2 py-1 bg-[#e5e7eb] flex justify-center items-center space-x-1'>
                <svg width="16" height="16" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="path-1-inside-1_5996_13793" fill="white">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.99998 6.76364C5.55352 6.76364 6.00226 6.31491 6.00226 5.76137C6.00226 5.20783 5.55352 4.75909 4.99998 4.75909C4.44644 4.75909 3.99771 5.20783 3.99771 5.76137C3.99771 6.31491 4.44644 6.76364 4.99998 6.76364ZM4.99998 7.43182C5.92255 7.43182 6.67044 6.68393 6.67044 5.76137C6.67044 4.8388 5.92255 4.09091 4.99998 4.09091C4.07742 4.09091 3.32953 4.8388 3.32953 5.76137C3.32953 6.68393 4.07742 7.43182 4.99998 7.43182Z"></path>
                  </mask>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.99998 6.76364C5.55352 6.76364 6.00226 6.31491 6.00226 5.76137C6.00226 5.20783 5.55352 4.75909 4.99998 4.75909C4.44644 4.75909 3.99771 5.20783 3.99771 5.76137C3.99771 6.31491 4.44644 6.76364 4.99998 6.76364ZM4.99998 7.43182C5.92255 7.43182 6.67044 6.68393 6.67044 5.76137C6.67044 4.8388 5.92255 4.09091 4.99998 4.09091C4.07742 4.09091 3.32953 4.8388 3.32953 5.76137C3.32953 6.68393 4.07742 7.43182 4.99998 7.43182Z" fill="#9BA6B2"></path>
                  <path d="M4.00226 5.76137C4.00226 5.21034 4.44895 4.76364 4.99998 4.76364V8.76364C6.65809 8.76364 8.00226 7.41948 8.00226 5.76137H4.00226ZM4.99998 6.75909C4.44895 6.75909 4.00226 6.3124 4.00226 5.76137H8.00226C8.00226 4.10326 6.65809 2.75909 4.99998 2.75909V6.75909ZM5.99771 5.76137C5.99771 6.3124 5.55101 6.75909 4.99998 6.75909V2.75909C3.34187 2.75909 1.99771 4.10326 1.99771 5.76137H5.99771ZM4.99998 4.76364C5.55101 4.76364 5.99771 5.21034 5.99771 5.76137H1.99771C1.99771 7.41948 3.34187 8.76364 4.99998 8.76364V4.76364ZM4.67044 5.76137C4.67044 5.57936 4.81798 5.43182 4.99998 5.43182V9.43182C7.02712 9.43182 8.67044 7.7885 8.67044 5.76137H4.67044ZM4.99998 6.09091C4.81798 6.09091 4.67044 5.94337 4.67044 5.76137H8.67044C8.67044 3.73423 7.02712 2.09091 4.99998 2.09091V6.09091ZM5.32953 5.76137C5.32953 5.94337 5.18199 6.09091 4.99998 6.09091V2.09091C2.97285 2.09091 1.32953 3.73423 1.32953 5.76137H5.32953ZM4.99998 5.43182C5.18199 5.43182 5.32953 5.57936 5.32953 5.76137H1.32953C1.32953 7.7885 2.97285 9.43182 4.99998 9.43182V5.43182Z" fill="#9BA6B2" mask="url(#path-1-inside-1_5996_13793)"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2.85223 8.72044C2.85223 8.53593 2.97032 8.38635 3.11599 8.38635H6.88393C7.0296 8.38635 7.14769 8.53593 7.14769 8.72044C7.14769 8.90496 7.0296 9.05453 6.88393 9.05453H3.11599C2.97032 9.05453 2.85223 8.90496 2.85223 8.72044Z" fill="#1A2B3D"></path>
                  <path d="M3.05223 8.72044C3.05223 8.66975 3.06864 8.63071 3.08646 8.60813C3.10386 8.5861 3.11565 8.58635 3.11598 8.58635L3.11599 8.58635H6.88393L6.88394 8.58635C6.88427 8.58635 6.89606 8.5861 6.91346 8.60813C6.93128 8.63071 6.94769 8.66975 6.94769 8.72044C6.94769 8.77114 6.93128 8.81018 6.91346 8.83275C6.89606 8.85479 6.88427 8.85454 6.88394 8.85453L6.88393 8.85453H3.11599L3.11598 8.85453C3.11565 8.85454 3.10386 8.85479 3.08646 8.83275C3.06864 8.81018 3.05223 8.77113 3.05223 8.72044Z" stroke="#9BA6B2" stroke-width="0.4" stroke-linecap="round"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.943176 2.01562C0.943176 1.31664 1.50137 0.75 2.18995 0.75H8.73357C8.91209 0.75 9.05681 0.896907 9.05681 1.07812C9.05681 1.25934 8.91209 1.40625 8.73357 1.40625H8.40639H2.18995C1.85841 1.40625 1.58965 1.67908 1.58965 2.01562V2.18182V2.83807V9.98437C1.58965 10.3209 1.85841 10.5937 2.18995 10.5937H7.81004C8.14158 10.5937 8.41034 10.3209 8.41034 9.98437V2.83807H1.58965H1.35721C1.17869 2.83807 1.03397 2.69116 1.03397 2.50994C1.03397 2.32872 1.17869 2.18182 1.35721 2.18182H1.58965H8.45428H9.05681V9.98437C9.05681 10.6834 8.49862 11.25 7.81004 11.25H2.18995C1.50137 11.25 0.943176 10.6834 0.943176 9.98437V2.01562Z" fill="#9BA6B2"></path>
                  <path d="M1.58965 2.83807V2.18182H1.35721C1.17869 2.18182 1.03397 2.32872 1.03397 2.50994C1.03397 2.69116 1.17869 2.83807 1.35721 2.83807H1.58965Z" fill="#9BA6B2"></path>
                  <path d="M1.58965 2.83807V2.18182M1.58965 2.83807H1.35721C1.17869 2.83807 1.03397 2.69116 1.03397 2.50994C1.03397 2.32872 1.17869 2.18182 1.35721 2.18182H1.58965M1.58965 2.83807H8.41034V9.98437C8.41034 10.3209 8.14158 10.5937 7.81004 10.5937H2.18995C1.85841 10.5937 1.58965 10.3209 1.58965 9.98437V2.83807ZM1.58965 2.18182V2.01562C1.58965 1.67908 1.85841 1.40625 2.18995 1.40625H8.40639H8.73358C8.91209 1.40625 9.05681 1.25934 9.05681 1.07812C9.05681 0.896907 8.91209 0.75 8.73358 0.75H2.18995C1.50137 0.75 0.943176 1.31664 0.943176 2.01562V9.98437C0.943176 10.6834 1.50137 11.25 2.18995 11.25H7.81004C8.49862 11.25 9.05681 10.6834 9.05681 9.98437V2.18182H8.45428H1.58965Z" stroke="#9BA6B2" stroke-width="0.3" stroke-linecap="round"></path>
                </svg>
                <h2 className="text-sm font-medium">Type <span className='font-bold'>{visaInfo?.visaType}</span> </h2>
              </div>
              <div className='rounded-full px-2 py-1 bg-[#e5e7eb] flex justify-center items-center space-x-1'>
                <svg width="16" height="16" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="path-1-inside-1_5996_13793" fill="white">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.99998 6.76364C5.55352 6.76364 6.00226 6.31491 6.00226 5.76137C6.00226 5.20783 5.55352 4.75909 4.99998 4.75909C4.44644 4.75909 3.99771 5.20783 3.99771 5.76137C3.99771 6.31491 4.44644 6.76364 4.99998 6.76364ZM4.99998 7.43182C5.92255 7.43182 6.67044 6.68393 6.67044 5.76137C6.67044 4.8388 5.92255 4.09091 4.99998 4.09091C4.07742 4.09091 3.32953 4.8388 3.32953 5.76137C3.32953 6.68393 4.07742 7.43182 4.99998 7.43182Z"></path>
                  </mask>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.99998 6.76364C5.55352 6.76364 6.00226 6.31491 6.00226 5.76137C6.00226 5.20783 5.55352 4.75909 4.99998 4.75909C4.44644 4.75909 3.99771 5.20783 3.99771 5.76137C3.99771 6.31491 4.44644 6.76364 4.99998 6.76364ZM4.99998 7.43182C5.92255 7.43182 6.67044 6.68393 6.67044 5.76137C6.67044 4.8388 5.92255 4.09091 4.99998 4.09091C4.07742 4.09091 3.32953 4.8388 3.32953 5.76137C3.32953 6.68393 4.07742 7.43182 4.99998 7.43182Z" fill="#9BA6B2"></path>
                  <path d="M4.00226 5.76137C4.00226 5.21034 4.44895 4.76364 4.99998 4.76364V8.76364C6.65809 8.76364 8.00226 7.41948 8.00226 5.76137H4.00226ZM4.99998 6.75909C4.44895 6.75909 4.00226 6.3124 4.00226 5.76137H8.00226C8.00226 4.10326 6.65809 2.75909 4.99998 2.75909V6.75909ZM5.99771 5.76137C5.99771 6.3124 5.55101 6.75909 4.99998 6.75909V2.75909C3.34187 2.75909 1.99771 4.10326 1.99771 5.76137H5.99771ZM4.99998 4.76364C5.55101 4.76364 5.99771 5.21034 5.99771 5.76137H1.99771C1.99771 7.41948 3.34187 8.76364 4.99998 8.76364V4.76364ZM4.67044 5.76137C4.67044 5.57936 4.81798 5.43182 4.99998 5.43182V9.43182C7.02712 9.43182 8.67044 7.7885 8.67044 5.76137H4.67044ZM4.99998 6.09091C4.81798 6.09091 4.67044 5.94337 4.67044 5.76137H8.67044C8.67044 3.73423 7.02712 2.09091 4.99998 2.09091V6.09091ZM5.32953 5.76137C5.32953 5.94337 5.18199 6.09091 4.99998 6.09091V2.09091C2.97285 2.09091 1.32953 3.73423 1.32953 5.76137H5.32953ZM4.99998 5.43182C5.18199 5.43182 5.32953 5.57936 5.32953 5.76137H1.32953C1.32953 7.7885 2.97285 9.43182 4.99998 9.43182V5.43182Z" fill="#9BA6B2" mask="url(#path-1-inside-1_5996_13793)"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2.85223 8.72044C2.85223 8.53593 2.97032 8.38635 3.11599 8.38635H6.88393C7.0296 8.38635 7.14769 8.53593 7.14769 8.72044C7.14769 8.90496 7.0296 9.05453 6.88393 9.05453H3.11599C2.97032 9.05453 2.85223 8.90496 2.85223 8.72044Z" fill="#1A2B3D"></path>
                  <path d="M3.05223 8.72044C3.05223 8.66975 3.06864 8.63071 3.08646 8.60813C3.10386 8.5861 3.11565 8.58635 3.11598 8.58635L3.11599 8.58635H6.88393L6.88394 8.58635C6.88427 8.58635 6.89606 8.5861 6.91346 8.60813C6.93128 8.63071 6.94769 8.66975 6.94769 8.72044C6.94769 8.77114 6.93128 8.81018 6.91346 8.83275C6.89606 8.85479 6.88427 8.85454 6.88394 8.85453L6.88393 8.85453H3.11599L3.11598 8.85453C3.11565 8.85454 3.10386 8.85479 3.08646 8.83275C3.06864 8.81018 3.05223 8.77113 3.05223 8.72044Z" stroke="#9BA6B2" stroke-width="0.4" stroke-linecap="round"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.943176 2.01562C0.943176 1.31664 1.50137 0.75 2.18995 0.75H8.73357C8.91209 0.75 9.05681 0.896907 9.05681 1.07812C9.05681 1.25934 8.91209 1.40625 8.73357 1.40625H8.40639H2.18995C1.85841 1.40625 1.58965 1.67908 1.58965 2.01562V2.18182V2.83807V9.98437C1.58965 10.3209 1.85841 10.5937 2.18995 10.5937H7.81004C8.14158 10.5937 8.41034 10.3209 8.41034 9.98437V2.83807H1.58965H1.35721C1.17869 2.83807 1.03397 2.69116 1.03397 2.50994C1.03397 2.32872 1.17869 2.18182 1.35721 2.18182H1.58965H8.45428H9.05681V9.98437C9.05681 10.6834 8.49862 11.25 7.81004 11.25H2.18995C1.50137 11.25 0.943176 10.6834 0.943176 9.98437V2.01562Z" fill="#9BA6B2"></path>
                  <path d="M1.58965 2.83807V2.18182H1.35721C1.17869 2.18182 1.03397 2.32872 1.03397 2.50994C1.03397 2.69116 1.17869 2.83807 1.35721 2.83807H1.58965Z" fill="#9BA6B2"></path>
                  <path d="M1.58965 2.83807V2.18182M1.58965 2.83807H1.35721C1.17869 2.83807 1.03397 2.69116 1.03397 2.50994C1.03397 2.32872 1.17869 2.18182 1.35721 2.18182H1.58965M1.58965 2.83807H8.41034V9.98437C8.41034 10.3209 8.14158 10.5937 7.81004 10.5937H2.18995C1.85841 10.5937 1.58965 10.3209 1.58965 9.98437V2.83807ZM1.58965 2.18182V2.01562C1.58965 1.67908 1.85841 1.40625 2.18995 1.40625H8.40639H8.73358C8.91209 1.40625 9.05681 1.25934 9.05681 1.07812C9.05681 0.896907 8.91209 0.75 8.73358 0.75H2.18995C1.50137 0.75 0.943176 1.31664 0.943176 2.01562V9.98437C0.943176 10.6834 1.50137 11.25 2.18995 11.25H7.81004C8.49862 11.25 9.05681 10.6834 9.05681 9.98437V2.18182H8.45428H1.58965Z" stroke="#9BA6B2" stroke-width="0.3" stroke-linecap="round"></path>
                </svg>
                <h2 className="text-sm font-medium">Processing Time <span className='font-bold'>{visaInfo?.ProcessingTime}</span> </h2>
              </div>
            </div>
            <div className='bg-white h-full mt-4 p-3 rounded-md'>
              <h5 className="text-sm font-bold text-[#333333]">Required Documents for E visa</h5>
            </div>

          </div>
        </div>

        {/* Right column (div 2 and div 3 stacked) */}
        <div className="grid grid-cols-1 md:col-span-1 col-span-2 content-start gap-4">
          <div className="flex items-center justify-center border border-black min-h-[150px] bg-orange-200">
            div 2
          </div>
          <div className="flex items-center justify-center border border-black min-h-[150px] bg-amber-200">
           <h6>{visaInfo?.price} </h6>
          </div>
        </div>
      </div>


      <div className='mx-auto md:px-32 sm:px-0 mt-0 py-8 container'>
        <div className="mx-auto mt-10 p-6 bg-white shadow rounded">
          <h1 className="text-2xl font-bold mb-4">Visa Information</h1>

          {/* Country dropdown */}
          <div className="mb-6 w-96">
            <label className=" text-gray-700 font-medium mb-2">Select Country:</label>
            <Select
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

          {/* Spinner during loading */}
          {loading && (
            <div className="flex justify-center items-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 border-solid"></div>
              <span className="ml-3 text-blue-500 font-medium">Loading visa details...</span>
            </div>
          )}

          {/* Visa info display */}
          {!loading && visaInfo ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{visaInfo.country} Visa Details</h2>
              <img
                src={visaInfo.image}
                alt={visaInfo.country}
                className="w-full max-w-md rounded"
              />
              <p>{visaInfo.description}</p>
              <div>
                <h3 className="font-semibold">Required Documents:</h3>
                <ul className="list-disc list-inside">
                  {visaInfo.documents.map((doc, i) => (
                    <li key={i}>{doc}</li>
                  ))}
                </ul>
              </div>
              <p className="font-semibold">
                Price: <span className="text-green-600">{visaInfo.price}</span>
              </p>
            </div>
          ) : (
            !loading && (
              <div className="text-red-500 font-medium mt-4">
                Visa information not found for this country.
              </div>
            )
          )}
        </div>
      </div>



    </div>
  );
};

export default VisaCountryPage;
