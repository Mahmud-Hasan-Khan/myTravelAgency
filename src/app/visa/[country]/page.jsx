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
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Visa Information</h1>

      {/* Country dropdown */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Select Country:</label>
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
  );
};

export default VisaCountryPage;
