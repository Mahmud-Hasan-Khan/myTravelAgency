"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && !session?.user?.profileComplete) {
      router.replace("/update-user-profile");
    }
  }, [status, session, router]);

  if (status === "loading") return <p>Loading...</p>;

  return <div className="container md:px-32 sm:px-0 bg-[#e2e8f0]">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-1 bg-white shadow-md rounded-2xl p-6">
        <div className="flex items-center space-x-4">
          <img src="/avatar.jpg" className="w-16 h-16 rounded-full" alt="Profile" />
          <div>
            <h2 className="text-xl font-bold">John Doe</h2>
            <p className="text-sm text-gray-500">johndoe@email.com</p>
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Edit Profile
        </button>
      </div>
    </div>
    Dashboard Content
  </div>

}