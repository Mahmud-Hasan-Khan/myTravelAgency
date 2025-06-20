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
  FaUserEdit,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

const UserProfilePage = () => {
  const { data: session, status } = useSession();
  const { data: userInfo, error, isLoading } = useSWR(
    status === "authenticated" ? "/api/users" : null,
    fetcher
  );

  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [passportImagePreview, setPassportImagePreview] = useState(null);

  if (status === "loading") return <p className="text-center mt-6">Loading session...</p>;
  if (status === "unauthenticated") return <p className="text-center mt-6">Please log in to view your profile.</p>;
  if (isLoading) return <p className="text-center mt-6">Loading user data...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">Failed to load user data.</p>;
  if (!userInfo) return <p className="text-center mt-6">User info not available.</p>;

  const isGoogleUser = userInfo.provider === "google";

  return (
    <div className="bg-[#e2e8f0] min-h-screen px-4 sm:px-6 lg:px-32 py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Basic Info Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Basic Information</h2>
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div>
                <Image
                  src={
                    profileImagePreview ||
                    (isGoogleUser ? session.user?.image : userInfo.image || "/default-avatar.png")
                  }
                  alt="User Avatar"
                  width={120}
                  height={120}
                  className="rounded-full border shadow mb-3 object-cover w-28 h-28 mx-auto my-auto"
                />
              </div>
              <div className="text-gray-700 space-y-1 flex-col items-center md:justify-items-start justify-items-center font-medium">
                <h3 className="text-xl font-bold">{userInfo.name}</h3>
                <p className="flex items-center gap-2 text-sm ">
                  <FaEnvelope className="text-blue-500" /><strong>E-mail :</strong> {userInfo.email}
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <FaPhoneAlt className="text-green-500" /><strong>Phone: </strong>{userInfo.phoneNumber || "N/A"}
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <FaWhatsapp className="text-green-500 text-base" /><strong>Whatsapp: </strong>{userInfo.whatsappNumber || "N/A"}
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <FaCalendarAlt className="text-orange-500" /><strong>Created at :</strong> {" "}
                  {new Date(userInfo.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).replace(/ /g, "-")}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start  gap-2 lg:items-end text-gray-700 text-sm font-medium">
              <p className="flex items-center gap-2">
                <FaWallet className="text-green-600" /> <strong>Balance :</strong>{" "}
                {userInfo.balance?.toFixed(2) || "0.00"} BDT
              </p>
              <p className="flex items-center gap-2">
                <FaPlaneDeparture className="text-blue-600" /><strong>Ticket Issued : </strong> 000
              </p>
              <p className="flex items-center gap-2">
                <FaPassport className="text-indigo-600" /><strong>Visa Applied :</strong>  000
              </p>
              <p className="flex items-center gap-2">
                <FaMedal className="text-yellow-600" /><strong>Earned Points :</strong>  000
              </p>
            </div>
          </div>
        </div>

        {/* Passport Info Section */}
        <section className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Passport Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 text-gray-700 text-sm font-medium">
              <p><strong>Given Name:</strong> {userInfo.givenName || "N/A"}</p>
              <p><strong>Surname:</strong> {userInfo.surName || "N/A"}</p>
              <p><strong>Date of Birth: </strong> 
                 {new Date(userInfo.dateOfBirth).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).replace(/ /g, "-") || "N/A"}</p>
              <p><strong>Passport Number:</strong> {userInfo.passportNumber || "N/A"}</p>
              <p><strong>Passport Expiry: </strong>
                {new Date(userInfo.passportExpiry).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).replace(/ /g, "-") || "N/A"}</p>
            </div>
            <div className="space-y-2">
              <Image
                src={passportImagePreview || userInfo.passportImage || "/default-passport.png"}
                alt="Passport"
                width={450}
                height={180}
                className="rounded-lg shadow object-cover border w-full max-w-md"
              />
            </div>
          </div>
          <div className="flex items-center justify-center my-4 ">
            <Link href="/update-user-profile" className="flex items-center gap-2 border p-2 rounded-md bg-orange-600 text-white hover:bg-orange-700 hover:shadow-md">
              <FaUserEdit className="text-white" />
              Edit Profile</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserProfilePage;
