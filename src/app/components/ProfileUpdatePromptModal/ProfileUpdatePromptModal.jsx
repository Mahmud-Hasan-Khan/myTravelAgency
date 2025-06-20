"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function ProfileUpdatePromptModal() {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);
  const hasShownRef = useRef(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const phone = session?.user?.phoneNumber;
    const isOnUpdatePage = pathname === "/update-user-profile";
    const isAuthenticated = status === "authenticated";
    const shouldShow = isAuthenticated && !phone && !isOnUpdatePage;

    if (shouldShow && !hasShownRef.current) {
      setShowModal(true);
      document.body.style.overflow = "hidden";
      hasShownRef.current = true;
    }

    if (!shouldShow) {
      setShowModal(false);
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [status, session?.user?.phoneNumber, pathname]);

  const handleConfirm = () => {
    setShowModal(false);
    document.body.style.overflow = "";
    router.replace("/update-user-profile");
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center w-screen h-screen">
      <div className="bg-white rounded-2xl p-6 mx-4 w-full max-w-[320px] sm:max-w-sm md:max-w-md shadow-lg text-center space-y-4 animate-fadeIn">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">Please Complete Your Profile</h2>
        <p className="text-sm md:text-base text-gray-600">
          To plan your trip smoothly, please provide your contact details.
        </p>
        <button
          onClick={handleConfirm}
          className="p-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Update Now
        </button>
      </div>
    </div>
  );
}
