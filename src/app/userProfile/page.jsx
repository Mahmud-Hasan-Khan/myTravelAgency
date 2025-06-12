// "use client";

// import Image from "next/image";
// import { useSession } from "next-auth/react";
// import useSWR from "swr";
// import { useState } from "react";

// const fetcher = (url) => fetch(url).then((res) => res.json());

// const UserProfilePage = () => {
//   const { data: session, status } = useSession();
//   const { data: userInfo, error, isLoading } = useSWR(
//     status === "authenticated" ? "/api/users" : null,
//     fetcher
//   );

//   const [profileImagePreview, setProfileImagePreview] = useState(null);
//   const [passportImagePreview, setPassportImagePreview] = useState(null);

//   const handleProfileImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileImagePreview(URL.createObjectURL(file));
//       // TODO: Upload to server
//     }
//   };

//   const handlePassportImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPassportImagePreview(URL.createObjectURL(file));
//       // TODO: Upload to server
//     }
//   };

//   if (status === "loading") return <p className="text-center mt-6">Loading session...</p>;
//   if (status === "unauthenticated") return <p className="text-center mt-6">Please log in to view your profile.</p>;
//   if (isLoading) return <p className="text-center mt-6">Loading user data...</p>;
//   if (error) return <p className="text-center mt-6 text-red-500">Failed to load user data.</p>;
//   if (!userInfo) return <p className="text-center mt-6">User info not available.</p>;

//   const isGoogleUser = userInfo.provider === "google";
//   console.log(userInfo);
//   return (
//     <div className="bg-[#e2e8f0] container mx-auto md:px-32 sm:px-0 md:h-full md:py-8">
//       <div className=" max-w-5xl mx-auto p-6 space-y-8">
//         <div className="bg-white p-6 rounded-2xl shadow-md">
//           <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Basic Information</h2>
//           <div className="flex items-center justify-between">
//             <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
//               <div className="flex items-center gap-4">
//                 <Image
//                   src={
//                     profileImagePreview ||
//                     (isGoogleUser
//                       ? session.user?.image
//                       : userInfo.image || "/default-avatar.png")
//                   }
//                   alt="User Avatar"
//                   width={96}
//                   height={96}
//                   className="rounded-full border shadow"
//                 />
//                 <div>
//                   <h3 className="text-xl font-bold">{userInfo.name}</h3>
//                   <p className="text-gray-600">{userInfo.email}</p>
//                   <p className="text-gray-600">Phone: {userInfo.phoneNumber || "N/A"}</p>
//                   <p>
//                     Account Created:{" "}
//                     {new Date(userInfo.createdAt).toLocaleDateString("en-GB", {
//                       day: "2-digit",
//                       month: "short",
//                       year: "numeric",
//                     }).replace(/ /g, "-")}
//                   </p>
//                 </div>
//               </div>
//               {!isGoogleUser && (
//                 <div className="flex flex-col">
//                   <label className="font-medium mb-1">Upload Profile Image</label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleProfileImageChange}
//                     className="file-input file-input-sm file-input-bordered"
//                   />
//                 </div>
//               )}
//             </div>
//             <div className="text-gray-700">
//               <p>Current Balance: {userInfo.dateOfBirth || "00000.00"} BDT</p>
//               <p>Ticket Issued: 000</p>
//               <p>Visa Applied: 000</p>
//               <p>Earned Point: 000</p>

//             </div>
//           </div>
//         </div>
//         {/* Basic Info Section */}

//         {/* Passport Info Section */}
//         <section className="bg-white p-6 rounded-2xl shadow-md">
//           <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Passport Information</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div className="space-y-3 text-gray-700">
//               <p><strong>Date of Birth:</strong> {userInfo.dateOfBirth || "N/A"}</p>
//               <p><strong>Passport Number:</strong> {userInfo.passportNumber || "N/A"}</p>
//               <p><strong>Passport Expiry:</strong> {userInfo.passportExpiry || "N/A"}</p>
//             </div>
//             <div className="space-y-2">
//               <Image
//                 src={
//                   passportImagePreview ||
//                   userInfo.passportImage ||
//                   "/default-passport.png"
//                 }
//                 alt="Passport"
//                 width={450}
//                 height={180}
//                 className="rounded-lg shadow object-cover border"
//               />
//               <div>
//                 <label className="font-medium mb-1 block">Upload Passport Image</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handlePassportImageChange}
//                   className="file-input file-input-sm file-input-bordered"
//                 />
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>

//     </div>
//   );
// };

// export default UserProfilePage;

"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaCalendarAlt,
  FaWallet,
  FaPlaneDeparture,
  FaPassport,
  FaMedal,
} from "react-icons/fa";

const fetcher = (url) => fetch(url).then((res) => res.json());

const UserProfilePage = () => {
  const { data: session, status } = useSession();
  const { data: userInfo, error, isLoading } = useSWR(
    status === "authenticated" ? "/api/users" : null,
    fetcher
  );

  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [passportImagePreview, setPassportImagePreview] = useState(null);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImagePreview(URL.createObjectURL(file));
      // TODO: Upload to server
    }
  };

  const handlePassportImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPassportImagePreview(URL.createObjectURL(file));
      // TODO: Upload to server
    }
  };

  if (status === "loading") return <p className="text-center mt-6">Loading session...</p>;
  if (status === "unauthenticated") return <p className="text-center mt-6">Please log in to view your profile.</p>;
  if (isLoading) return <p className="text-center mt-6">Loading user data...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">Failed to load user data.</p>;
  if (!userInfo) return <p className="text-center mt-6">User info not available.</p>;

  const isGoogleUser = userInfo.provider === "google";

  return (
    <div className="bg-[#e2e8f0] min-h-screen px-4 sm:px-6 lg:px-32 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Basic Info Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Basic Information</h2>
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="flex flex-col lg:flex-row justify-between gap-6 items-center">
              <div>
                <Image
                  src={
                    profileImagePreview ||
                    (isGoogleUser ? session.user?.image : userInfo.image || "/default-avatar.png")
                  }
                  alt="User Avatar"
                  width={96}
                  height={96}
                  className="rounded-full border shadow"
                />
              </div>
              <div className="text-gray-700 space-y-1 flex-col items-center">
                <h3 className="text-xl font-bold">{userInfo.name}</h3>
                <p className="flex items-center gap-2 text-sm">
                  <FaEnvelope className="text-blue-500" />{userInfo.email}
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <FaPhoneAlt className="text-green-500" />{userInfo.phoneNumber || "N/A"}
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <FaCalendarAlt className="text-orange-500" />Created : {" "}
                  {new Date(userInfo.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).replace(/ /g, "-")}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start  gap-2 lg:items-end text-gray-700 text-sm">
              <p className="flex items-center gap-2">
                <FaWallet className="text-green-600" /> Balance:{" "}
                {userInfo.balance?.toFixed(2) || "0.00"} BDT
              </p>
              <p className="flex items-center gap-2">
                <FaPlaneDeparture className="text-blue-600" /> Ticket Issued: 000
              </p>
              <p className="flex items-center gap-2">
                <FaPassport className="text-indigo-600" /> Visa Applied: 000
              </p>
              <p className="flex items-center gap-2">
                <FaMedal className="text-yellow-600" /> Earned Points: 000
              </p>
            </div>
          </div>

          {!isGoogleUser && (
            <div className="mt-4">
              <label className="font-medium mb-1 block">Upload Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="file-input file-input-sm file-input-bordered w-full max-w-sm"
              />
            </div>
          )}
        </div>

        {/* Passport Info Section */}
        <section className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Passport Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 text-gray-700 text-sm">
              <p><strong>Date of Birth:</strong> {userInfo.dateOfBirth || "N/A"}</p>
              <p><strong>Passport Number:</strong> {userInfo.passportNumber || "N/A"}</p>
              <p><strong>Passport Expiry:</strong> {userInfo.passportExpiry || "N/A"}</p>
            </div>
            <div className="space-y-2">
              <Image
                src={passportImagePreview || userInfo.passportImage || "/default-passport.png"}
                alt="Passport"
                width={450}
                height={180}
                className="rounded-lg shadow object-cover border w-full max-w-md"
              />
              <div>
                <label className="font-medium mb-1 block">Upload Passport Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePassportImageChange}
                  className="file-input file-input-sm file-input-bordered w-full max-w-sm"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserProfilePage;
