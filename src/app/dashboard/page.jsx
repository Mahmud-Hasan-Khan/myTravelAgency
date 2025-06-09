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

  return <div className="container md:px-32 sm:px-0 bg-[#e2e8f0]">Dashboard Content</div>

}