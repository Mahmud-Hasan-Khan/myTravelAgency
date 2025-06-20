"use client";

import { getSession, useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";
import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const fetcher = (url) => fetch(url).then((res) => res.json());

const EditProfilePage = () => {
  const { data: session, status } = useSession();
  const { data: userInfo, error, isLoading } = useSWR(
    status === "authenticated" ? "/api/users" : null,
    fetcher
  );

  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [givenName, setGivenName] = useState("");
  const [surName, setSurName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [passportExpiry, setPassportExpiry] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [passportImage, setPassportImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [passportImagePreview, setPassportImagePreview] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (userInfo) {
      setPhoneNumber(userInfo.phoneNumber || "");
      setWhatsappNumber(userInfo.whatsappNumber || "");
      setGivenName(userInfo.givenName || "");
      setSurName(userInfo.surName || "");
      setDateOfBirth(userInfo.dateOfBirth || "");
      setPassportNumber(userInfo.passportNumber || "");
      setPassportExpiry(userInfo.passportExpiry || "");
      setProfileImagePreview(userInfo.image || "/Icon/default-avatar.png");
      setPassportImagePreview(userInfo.passportImage || "/Icon/default-passport.png");
    }
  }, [userInfo]);

  const isGoogleUser = userInfo?.provider === "google";

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePassportImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPassportImage(file);
      setPassportImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async () => {
    if (!phoneNumber) {
      return toast.error("Please input your mobile number!");
    }

    setIsUpdating(true);
    const toastId = toast.loading("Updating profile...");

    const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    const uploadImageToImgbb = async (imageFile) => {
      const formData = new FormData();
      formData.append("image", imageFile);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error("Image upload failed.");
      }

      return data.data.url;
    };

    try {
      let profileImageUrl = userInfo.image;
      let passportImageUrl = userInfo.passportImage;

      if (profileImage) profileImageUrl = await uploadImageToImgbb(profileImage);
      if (passportImage) passportImageUrl = await uploadImageToImgbb(passportImage);

      const res = await fetch("/api/users/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userInfo.email,
          phoneNumber,
          whatsappNumber,
          givenName,
          surName,
          dateOfBirth,
          passportNumber,
          passportExpiry,
          image: profileImageUrl,
          passportImage: passportImageUrl,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // ✅ refresh session from server
        await fetch("/api/auth/session?update", { method: "POST" });
        await getSession();

        toast.update(toastId, {
          render: "Profile updated!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        mutate("/api/users");
        router.push("/userProfile");
      } else {
        toast.update(toastId, {
          render: data.error || "Update failed.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.update(toastId, {
        render: "Something went wrong.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (status === "loading" || isLoading) return <p className="text-center mt-6">Loading...</p>;
  if (status === "unauthenticated") return <p className="text-center mt-6">Please login.</p>;
  if (error) return <p className="text-red-500 text-center mt-6">Failed to load user info.</p>;

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-8 lg:px-32">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-center">Edit Profile</h1>

        {!isGoogleUser && (
          <div className="mt-6 text-center">
            <label className="block font-semibold mb-2">Profile Image</label>
            <Image
              src={profileImagePreview || "/Icon/default-avatar.png"}
              alt="Profile"
              width={120}
              height={120}
              className="rounded-full border shadow mb-3 object-cover w-28 h-28 mx-auto"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="file-input file-input-bordered w-full max-w-sm mx-auto"
            />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="label mb-1">
              <span className="inputLabel">Given Name (As per Passport)</span>
            </label>
            <input
              type="text"
              value={givenName}
              onChange={(e) => setGivenName(e.target.value)}
              placeholder="Enter given name"
              className="w-full px-4 py-3 rounded-md bg-base-200 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="label mb-1">
              <span className="inputLabel">Surname (As per Passport)</span>
            </label>
            <input
              type="text"
              value={surName}
              onChange={(e) => setSurName(e.target.value)}
              placeholder="Enter surname"
              className="w-full px-4 py-3 rounded-md bg-base-200 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="label">
              <span className="inputLabel">Phone Number<span className="text-red-600">*</span></span>
            </label>
            <PhoneInput
              country={'bd'}
              value={phoneNumber}
              onChange={(value) => {
                setPhoneNumber(value.startsWith("+") ? value : "+" + value);
              }}
              inputClass="w-full px-3 py-[24px] !rounded-md !bg-base-200 !border !border-gray-300"
              containerClass="!w-full focus-within:!outline-[#4081ec] focus-within:!border-[#4081ec] focus-within:!ring-1 focus-within:!ring-[#4081ec] !rounded-md"
              inputStyle={{ width: '100%' }}
              enableSearch={true}
              placeholder="Your mobile number"
              inputProps={{
                name: "phone",
                required: true,
              }}
            />
          </div>

          <div>
            <label className="label">
              <span className="inputLabel">WhatsApp Number<span className="text-red-600">*</span> </span>
            </label>
            <PhoneInput
              country={'bd'}
              enableSearch={true}
              value={whatsappNumber}
              onChange={(value) => {
                setWhatsappNumber(value.startsWith("+") ? value : "+" + value);
              }}
              inputClass="w-full px-3 py-[24px] !rounded-md !bg-base-200 !border !border-gray-300"
              containerClass="!w-full focus-within:!outline-[#4081ec] focus-within:!border-[#4081ec] focus-within:!ring-1 focus-within:!ring-[#4081ec] !rounded-md"
              inputStyle={{ width: '100%' }}
              placeholder="Your WhatsApp number"
              inputProps={{
                name: "whatsapp",
                required: true,
              }}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Date of Birth</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-base-200 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Passport Number</label>
            <input
              type="text"
              value={passportNumber}
              onChange={(e) => setPassportNumber(e.target.value)}
              placeholder="AB1234567"
              className="w-full px-4 py-3 rounded-md bg-base-200 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Passport Expiry Date</label>
            <input
              type="date"
              value={passportExpiry}
              onChange={(e) => setPassportExpiry(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-base-200 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-10 text-center">
          <label className="block font-semibold mb-2">Passport Bio Page Image</label>
          <Image
            src={passportImagePreview || "/Icon/logoDesktop.png"}
            alt="Passport"
            width={300}
            height={160}
            className="rounded-lg border shadow mb-3 object-cover w-full max-w-sm mx-auto"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handlePassportImageChange}
            className="file-input file-input-bordered w-full max-w-sm mx-auto"
          />
        </div>

        <div className="mt-8 text-center mx-auto flex justify-center">
          <button
            onClick={handleUpdateProfile}
            disabled={isUpdating}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold text-white transition
              ${isUpdating ? "bg-blue-500 cursor-not-allowed" : "bg-primary hover:bg-primary-focus"}
            `}
          >
            {isUpdating && (
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            )}
            {isUpdating ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
