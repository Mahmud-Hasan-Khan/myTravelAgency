"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import CreatableSelect from "react-select/creatable";
import { Tab } from "@headlessui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useSWR from "swr";

const tripTypes = ["One-way", "Round-trip", "Multi-city"];
const titles = ["Mr.", "Ms.", "Mrs.", "Master", "Mistress"];
const passengerTypes = ["Adult", "Child", "Infant"];

const fetcher = (url) => fetch(url).then((res) => res.json());


export default function CreateAirTicket() {
  const { data: session } = useSession();
  if (!session || !session.user || session.user.role !== 'admin') {
    redirect('/unauthorized');
  }

  const [selectedTrip, setSelectedTrip] = useState("One-way");
  const [selectedAirline, setSelectedAirline] = useState(null);
  const [flightNumber, setFlightNumber] = useState("");

  const [segments, setSegments] = useState([
    {
      id: 1,
      from: { iata: "", name: "", city: "" },
      to: { iata: "", name: "", city: "" },
      departure: new Date(),
      arrival: new Date()
    },
  ]);

  const [passengers, setPassengers] = useState([
    {
      id: 1,
      title: "Mr.",
      type: "Adult",
      userEmail: "",
      givenName: "",
      surName: "",
      passportNumber: "",
      passportExpiry: "",
      dateOfBirth: "",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [airportOptions, setAirportOptions] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [errors, setErrors] = useState([]);

  // Auto-manage Round Trip Second segment
  useEffect(() => {
    if (selectedTrip == "Round-trip") {
      const first = segments[0];
      const second = segments[1];

      const updatedReturnSegment = {
        id: second?.id || Date.now(),
        from: first.to || "",
        to: first.from || "",
        departure: second?.departure || new Date(),
        arrival: second?.arrival || new Date(),
      };

      setSegments([first, updatedReturnSegment]);
    } else if (selectedTrip !== "Round-trip" && segments.length > 1) {
      setSegments([segments[0]]);
    }
  }, [selectedTrip, segments[0]?.from, segments[0]?.to]);

  // Load airport data from public JSON
  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const res = await fetch("/AirportData.json");
        const data = await res.json();
        const options = data.map((airport) => ({
          value: {
            iata: airport.IATA,
            name: airport.Name,
            city: airport.City,
          },
          label: `${airport.IATA} - ${airport.Name}, ${airport.City}`,
        }));
        setAirportOptions(options);
      } catch (err) {
        console.error("Failed to load airport data:", err);
      }
    };
    fetchAirports();
  }, []);

  // Load Airline Name & Logo
  const { data: airlineData, error: airlineDataError, isLoading: airlineDataLoading } = useSWR('/api/airlines-nameWithLogo', fetcher);

  const airlineOptions = airlineData?.map((airline) => ({
    value: airline,
    label: (
      <div className="flex items-center gap-2">
        <img src={airline.logo} alt={airline.name} className="w-6 h-6" />
        <span>{airline.name}</span>
      </div>
    ),
  }))
    || [];

  // User search for each passenger
  const loadUserOptions = async (inputValue) => {
    if (!inputValue || inputValue.length < 1) return [];
    const res = await fetch(`/api/users/searchByName?q=${inputValue}`);
    const data = await res.json();
    return data.map((user) => ({
      label: `Name: ${user.givenName} ${user.surName}, Passport No: ${user.passportNumber}`,
      value: user.passportNumber,
      data: user,
    }));
  };

  const handleUserSelect = (selected, index) => {
    if (!selected) return;
    const updated = [...passengers];
    updated[index] = {
      ...updated[index],
      userEmail: selected.data.email,
      givenName: selected.data.givenName,
      surName: selected.data.surName,
      passportNumber: selected.data.passportNumber,
      passportExpiry: selected.data.passportExpiry ? new Date(selected.data.passportExpiry) : "",
      dateOfBirth: selected.data.dateOfBirth ? new Date(selected.data.dateOfBirth) : "",
    };
    setPassengers(updated);
  };

  // Segment handlers
  const handleSegmentChange = (index, field, value) => {
    const newSegments = [...segments];
    newSegments[index][field] = value;
    setSegments(newSegments);
  };

  const addSegment = () => {
    setSegments([...segments, {
      id: Date.now(),
      from: "",
      to: "",
      departure: new Date(),
      arrival: new Date()
    }]);
  };

  const removeSegment = (index) => {
    if (segments.length === 1) return; // always have at least 1 segment
    setSegments(segments.filter((_, i) => i !== index));
  };

  // Passenger handlers
  const handlePassengerChange = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index][field] = value;
    setPassengers(newPassengers);
  };

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      {
        id: Date.now(),
        title: "Mr.",
        type: "Adult",
        userEmail: "",
        givenName: "",
        surName: "",
        passportNumber: "",
        passportExpiry: "",
        dateOfBirth: "",
      },
    ]);
  };

  const removePassenger = (index) => {
    if (passengers.length === 1) return; // keep at least one passenger
    setPassengers(passengers.filter((_, i) => i !== index));
  };

  // Validation
  const validate = () => {
    const errs = [];

    // Validate passengers
    passengers.forEach((p, i) => {
      if (!p.givenName.trim()) errs.push(`Passenger ${i + 1}: Given Name is required`);
      if (!p.surName.trim()) errs.push(`Passenger ${i + 1}: Surname is required`);
      if (!p.passportNumber.trim()) errs.push(`Passenger ${i + 1}: Passport Number is required`);
      if (!p.userEmail.trim()) errs.push(`Passenger ${i + 1}: Email is required`);
    });

    // Validate segments
    segments.forEach((s, i) => {
      if (!s.from) errs.push(`Segment ${i + 1}: From Airport is required`);
      if (!s.to) errs.push(`Segment ${i + 1}: To Airport is required`);
      if (!s.departure) errs.push(`Segment ${i + 1}: Departure date/time is required`);
      if (!s.arrival) errs.push(`Segment ${i + 1}: Arrival date/time is required`);
      if (s.arrival && s.departure && s.arrival <= s.departure) {
        errs.push(`Segment ${i + 1}: Arrival date must be after departure`)
      }
    });

    setErrors(errs);
    return errs.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = [];
    if (!selectedAirline) errs.push("Airline is required.");
    if (!flightNumber.trim()) errs.push("Flight number is required.");
    if (segments.length === 0 || !segments[0].from || !segments[0].to)
      errs.push("Flight segment must be filled.");
    if (passengers.length === 0 || !passengers[0].givenName || !passengers[0].passportNumber)
      errs.push("At least one passenger is required.");

    setErrors(errs);
    if (errs.length > 0) {
      toast.error("Please fix the form errors.");
      return;
    }
    setShowReview(true);
  };

  const confirmSubmit = async () => {
    setLoading(true);
    const payload = {
      tripType: selectedTrip,
      airline: {
        name: selectedAirline?.name || "",
        logo: selectedAirline?.logo || "",
        flightNumber,
      },
      segments,
      passengers,
      createdBy: session?.user?.email || "",
      createdAt: new Date(),
    };
    console.log("Submitted Payload:", payload);

    // try {
    //   const res = await fetch("/api/tickets/create", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(payload),
    //   });
    //   const data = await res.json();

    //   if (res.ok) {
    //     toast.success("Ticket created successfully!");
    //     setShowReview(false);
    //     // Reset form
    //     setSelectedTrip("One-way");
    //     setSegments([{ id: 1, from: "", to: "", departure: new Date() }]);
    //     setReturnDate(new Date());
    //     setPassengers([
    //       {
    //         id: 1,
    //         title: "Mr.",
    //         type: "Adult",
    //         userEmail: "",
    //         givenName: "",
    //         surName: "",
    //         passportNumber: "",
    //         passportExpiry: "",
    //         dateOfBirth: "",
    //       },
    //     ]);
    //   } else {
    //     toast.error(data.message || "Failed to create ticket");
    //   }
    // } catch (err) {
    //   console.error(err);
    //   toast.error("Something went wrong");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold mb-6">Create Air Ticket</h2>

        {/* Trip Type Tabs */}
        <Tab.Group selectedIndex={tripTypes.indexOf(selectedTrip)} onChange={(index) => setSelectedTrip(tripTypes[index])}>
          <Tab.List className="flex space-x-2 mb-8">
            {tripTypes.map((type) => (
              <Tab
                key={type}
                className={({ selected }) =>
                  `px-4 py-2 rounded ${selected ? "bg-blue-600 text-white font-semibold" : "bg-gray-200 text-gray-700"
                  }`
                }
              >
                {type}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
      </div>


      <form onSubmit={handleSubmit}>
        {/* Flight Segments */}
        {segments.map((segment, i) => (
          <div key={segment.id} className="border rounded px-4 mb-4 bg-gray-50 relative">
            <h3 className="font-semibold mb-3 text-center border-b-2 border-x-2 rounded w-fit mx-auto px-2 py-1 bg-white">Segment : {i + 1}</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block mb-1 font-medium">From Airport</label>
                <Select
                  options={airportOptions}
                  isClearable
                  value={airportOptions.find(
                    (opt) =>
                      opt.value.iata === segment.from?.iata &&
                      opt.value.name === segment.from?.name &&
                      opt.value.city === segment.from?.city
                  ) || null}
                  onChange={(selected) =>
                    handleSegmentChange(i, "from", selected ? selected?.value : "")}
                  placeholder="Select From"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium">To Airport</label>
                <Select
                  options={airportOptions}
                  isClearable
                  value={airportOptions.find(
                    (opt) =>
                      opt.value.iata === segment.to?.iata &&
                      opt.value.name === segment.to?.name &&
                      opt.value.city === segment.to?.city
                  ) || null}
                  onChange={(selected) =>
                    handleSegmentChange(i, "to", selected ? selected?.value : "")}
                  placeholder="Select To"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-between" >
              <div className="mt-4">
                <label className="block mb-1 font-medium">Departure Date & Time</label>
                <DatePicker
                  selected={segment.departure}
                  onChange={(date) => handleSegmentChange(i, "departure", date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  dateFormat="Pp"
                  className="input input-bordered w-full"
                  placeholderText="Select departure date & time"
                />
              </div>
              <div className="mt-4">
                <label className="block mb-1 font-medium">Arrival Date & Time</label>
                <DatePicker
                  selected={segment.arrival}
                  onChange={(date) => handleSegmentChange(i, "arrival", date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  dateFormat="Pp"
                  className="input input-bordered w-full"
                  placeholderText="Select arrival date & time"
                  minDate={segment.departure || new Date()}
                />
              </div>
            </div>
            {/* Remove segment button only for multicity and more than 1 segment */}
            {selectedTrip === "Multi-city" && segments.length > 1 && (
              <button
                type="button"
                onClick={() => removeSegment(i)}
                className="btn btn-outline btn-sm mt-3"
              >
                Remove Segment
              </button>
            )}
          </div>
        ))}

        {/* Add segment button only for multicity */}
        {selectedTrip === "Multi-city" && (
          <button
            type="button"
            onClick={addSegment}
            className="btn btn-primary mb-6"
          >
            Add Segment
          </button>
        )}

        {/* select airline Flight number */}
        <div className="flex flex-col md:flex-row gap-4 items-center bg-gray-50 border rounded p-4 mb-4">
          <div className="w-full">
            <label className="block mb-1 w-full font-medium">Select Airline</label>
            <CreatableSelect
              isClearable
              options={airlineData?.map((airline) => ({
                value: airline.name,
                label: airline.name,
                airline,
              })) || []
              }
              value={
                selectedAirline
                  ? {
                    value: selectedAirline.name,
                    label: selectedAirline.name,
                    airline: selectedAirline,
                  }
                  : null
              }
              onChange={(selected) => {
                if (!selected) {
                  setSelectedAirline(null);
                } else if (selected.airline) {
                  setSelectedAirline(selected.airline); // Existing airline
                } else {
                  setSelectedAirline({
                    name: selected.value,
                    logo: "", // User can upload if desired
                    _id: null,
                  });
                }
              }}
              getOptionLabel={(e) =>
                e.airline ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={e.airline.logo || "/default-logo.png"}
                      alt={e.airline.name}
                      className="w-5 h-5 object-contain"
                      onError={(e) => (e.currentTarget.src = "/default-logo.png")}
                    />
                    <span>{e.airline.name}</span>
                  </div>
                ) : (
                  e.label
                )
              }
              placeholder="Type or select airline"
            />
          </div>

          <div className="w-full">
            <label className="block font-medium">Flight Number</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              placeholder="Enter flight number (e.g., BS101)"
              required
            />
          </div>
        </div>




        {/* Passengers */}
        <h3 className="text-xl font-semibold mb-4">Passengers</h3>
        {passengers.map((passenger, i) => (
          <div
            key={passenger.id}
            className="border rounded p-4 mb-4 bg-gray-50 relative"
          >
            <label className="block mb-1 font-medium">Search User by Name</label>
            <AsyncSelect
              cacheOptions
              loadOptions={loadUserOptions}
              onChange={(selected) => handleUserSelect(selected, i)}
              placeholder="Type name to search user"
              isClearable
              className="mb-4"
            />

            <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
              <Select
                options={titles.map((t) => ({ value: t, label: t }))}
                value={{ value: passenger.title, label: passenger.title }}
                onChange={(selected) =>
                  handlePassengerChange(i, "title", selected.value)
                }
                className="flex-1"
              />
              <Select
                options={passengerTypes.map((t) => ({ value: t, label: t }))}
                value={{ value: passenger.type, label: passenger.type }}
                onChange={(selected) =>
                  handlePassengerChange(i, "type", selected.value)
                }
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => removePassenger(i)}
                className="btn btn-outline btn-sm ml-auto"
                disabled={passengers.length === 1}
                title="Remove Passenger"
              >
                Remove
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                name="userEmail"
                value={passenger.userEmail}
                onChange={(e) =>
                  handlePassengerChange(i, "userEmail", e.target.value)
                }
                placeholder="User Email"
                className="input input-bordered flex-1"
                required
              />
              <input
                name="givenName"
                value={passenger.givenName}
                onChange={(e) =>
                  handlePassengerChange(i, "givenName", e.target.value)
                }
                placeholder="Given Name"
                className="input input-bordered flex-1"
                required
              />
              <input
                name="surName"
                value={passenger.surName}
                onChange={(e) =>
                  handlePassengerChange(i, "surName", e.target.value)
                }
                placeholder="Surname"
                className="input input-bordered flex-1"
                required
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <input
                name="passportNumber"
                value={passenger.passportNumber}
                onChange={(e) =>
                  handlePassengerChange(i, "passportNumber", e.target.value)
                }
                placeholder="Passport Number"
                className="input input-bordered flex-1"
                required
              />
              <div className="flex-1">
                <label className="block mb-1 font-medium">Passport Expiry</label>
                <DatePicker
                  selected={passenger.passportExpiry ? new Date(passenger.passportExpiry) : null}
                  onChange={(date) => handlePassengerChange(i, "passportExpiry", date)}
                  className="input input-bordered w-full"
                  placeholderText="Select passport expiry"
                  dateFormat="yyyy-MM-dd"
                  minDate={new Date()}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium">Date of Birth</label>
                <DatePicker
                  selected={passenger.dateOfBirth ? new Date(passenger.dateOfBirth) : null}
                  onChange={(date) => handlePassengerChange(i, "dateOfBirth", date)}
                  className="input input-bordered w-full"
                  placeholderText="Select date of birth"
                  dateFormat="yyyy-MM-dd"
                  maxDate={new Date()}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addPassenger}
          className="btn btn-primary mb-6"
        >
          Add Passenger
        </button>

        {/* Validation errors */}
        {errors.length > 0 && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 rounded">
            <ul className="list-disc list-inside text-red-700">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {!showReview && (
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? "Validating..." : "Review Ticket"}
          </button>
        )}
      </form>

      {/* Review modal / section */}
      {showReview && (
        <div className="mt-8 p-6 border rounded bg-gray-100 shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Review Ticket Details</h3>

          <div className="mb-4">
            <h4 className="font-semibold mb-2">Trip Type:</h4>
            <p>{selectedTrip}</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold mb-2">Segments:</h4>
            {segments.map((seg, i) => (
              <div key={seg.id} className="mb-2">
                <p>
                  Segment {i + 1}: From <strong>{`${seg.from.iata} - ${seg.from.name}, ${seg.from.city}`}</strong> to{" "}
                  <strong>{`${seg.to.iata} - ${seg.to.name}, ${seg.to.city}`}</strong><br />
                  Arrival: <strong>{seg.arrival.toLocaleString()}</strong>
                </p>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h4 className="font-semibold mb-2">Airline:</h4>
            <div className="flex items-center gap-3">
              {selectedAirline?.logo && (
                <img
                  src={selectedAirline.logo}
                  alt={selectedAirline.name}
                  className="w-8 h-8 object-contain"
                  onError={(e) => (e.currentTarget.src = "/default-logo.png")}
                />
              )}
              <p>{selectedAirline?.name || "N/A"}</p>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold mb-2">Flight Number:</h4>
            <p>{flightNumber}</p>
          </div>


          <div className="mb-4">
            <h4 className="font-semibold mb-2">Passengers:</h4>
            {passengers.map((p, i) => (
              <div key={p.id} className="mb-2 border p-2 rounded bg-white">
                <p>
                  {p.title} {p.givenName} {p.surName} ({p.type})
                </p>
                <p>Email: {p.userEmail}</p>
                <p>Passport: {p.passportNumber}</p>
                <p>
                  Passport Expiry:{" "}
                  {p.passportExpiry ? new Date(p.passportExpiry).toLocaleDateString() : "N/A"}
                </p>
                <p>
                  Date of Birth:{" "}
                  {p.dateOfBirth ? new Date(p.dateOfBirth).toLocaleDateString() : "N/A"}
                </p>
              </div>
            ))}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setShowReview(false)}
              className="btn btn-outline flex-1"
              disabled={loading}
            >
              Back to Edit
            </button>
            <button
              onClick={confirmSubmit}
              className="btn btn-primary flex-1"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Confirm & Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
