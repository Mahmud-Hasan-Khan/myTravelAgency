"use client";

import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { toast } from "react-toastify";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { href: "/", icon: "/Icon/home.png", label: "Home" },
    { href: "/visa", icon: "/Icon/visa.png", label: "Visa" },
    { href: "/hotel", icon: "/Icon/love-hotel.ico", label: "Hotel" },
    { href: "/umrah", icon: "/Icon/kaaba.png", label: "Umrah" },
    { href: "/blog", icon: "/Icon/blogger.ico", label: "Blog" },
  ];

  // ✅ NavLink with separate styles for desktop & mobile
  const NavLink = ({ href, icon, label, close }) => {
    const isActive = pathname === href;

    const baseClasses = "flex items-center gap-2 px-4 py-2 transition-all duration-300";

    const mobileClasses = isActive
      ? "bg-gradient-to-r from-blue-200 to-purple-200 text-blue-800"
      : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-blue-300 hover:to-purple-300 rounded-lg border-b";

    const desktopClasses = isActive
      ? "border-b-2 border-blue-500 text-blue-700 font-semibold bg-blue-50"
      : "text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-300";

    const classes = `${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`;

    return (
      <Link href={href} onClick={() => close?.()} className="group w-full">
        <div className={classes}>
          {icon && <img src={icon} alt={label} width={20} />}
          {label}
        </div>
      </Link>
    );
  };

  return (
    <Popover className="sticky top-0 z-50">
      {({ open, close }) => (
        <>
          {/* Mobile overlay */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-40 sm:hidden"
                onClick={() => close()}
              />
            )}
          </AnimatePresence>

          {/* Navbar Top */}
          <div className="bg-white border-b w-full h-16 shadow-sm px-4 sm:px-10 md:px-32 flex items-center justify-between">
            {/* Desktop Logo */}
            <Link href="/" className="hidden sm:block">
              <img src="/Icon/logoDesktop.png" alt="Logo" width={130} />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex gap-8">
              {navLinks.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
            </div>

            {/* Desktop Right Side */}
            <div className="hidden sm:flex items-center gap-6">
              {status === "authenticated" && session?.user ? (
                <>
                  {session.user.role === "admin" ? (
                    <Link href="/admin" className="text-sm font-medium text-blue-600 hover:underline">
                      Admin Panel
                    </Link>
                  ) : (
                    // Desktop MyBookingMenu (inline)
                    <div className="relative group">
                      <button className="text-sm font-medium text-blue-600 hover:underline">
                        My Bookings ▾
                      </button>
                      <div className="absolute left-0 top-full mt-2 bg-white border rounded-md shadow-md w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <Link href="/userProfile" onClick={() => close?.()} className="block px-4 py-2 hover:bg-gray-100 text-sm">
                          My Profile
                        </Link>
                        <Link href="/bookings/visa" onClick={() => close?.()} className="block px-4 py-2 hover:bg-gray-100 text-sm">
                          Visa Applied
                        </Link>
                        <Link href="/bookings/ticket" onClick={() => close?.()} className="block px-4 py-2 hover:bg-gray-100 text-sm">
                          Booked Flights
                        </Link>
                        <Link href="/bookings/hotel" onClick={() => close?.()} className="block px-4 py-2 hover:bg-gray-100 text-sm">
                          Booked Hotels
                        </Link>
                        <Link href="/bookings/umrah" onClick={() => close?.()} className="block px-4 py-2 hover:bg-gray-100 text-sm">
                          Umrah Packages
                        </Link>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-3xl transition">
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Hamburger */}
            <PopoverButton className="sm:hidden p-1 text-gray-600 hover:bg-gray-100 rounded-md">
              {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </PopoverButton>

            {/* Mobile Logo */}
            <Link href="/" className="sm:hidden mx-auto">
              <img src="/Icon/logoMobile.png" alt="Logo" width={150} />
            </Link>
          </div>

          {/* Mobile Panel */}
          <PopoverPanel focus className="absolute z-50 sm:hidden">
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.3 }}
                  className="fixed top-16 left-0 w-[220px] h-full bg-white shadow-lg overflow-y-scroll"
                >
                  {/* Mobile User Info */}
                  {status === "authenticated" && session?.user && (
                    <div className="py-1 flex flex-col items-center gap-2 border-b shadow-sm">
                      <div className="flex items-center justify-between gap-x-1 text-sm font-semibold">
                        <Image
                          src={session.user.image || "/Icon/default-avatar.png"}
                          alt="User"
                          width={35}
                          height={30}
                          className="rounded-full border"
                        />
                        <div>
                          <p className="text-blue-500">{session.user.name}</p>
                          <p className="">Balance: 10,000 BDT</p>
                        </div>
                      </div>
                      <div className="text-sm text-center">
                        <p className="text-gray-500 text-xs">{session.user.email}</p>
                      </div>
                    </div>
                  )}

                  {/* Mobile Navigation List */}
                  <nav className="flex flex-col gap-1 py-2">
                    {status === "authenticated" && session?.user && (
                      <>
                        {session.user.role === "admin" && (
                          <NavLink href="/admin" label="Admin Panel" icon="/admin-icon.png" close={close} />
                        )}
                        {session.user.role === "user" && (
                          <>
                            <NavLink href="/userProfile" label="My Profile" icon="/Icon/userProfile.png" close={close} />

                            {/* Mobile MyBookingMenu */}
                            <button
                              onClick={() => setBookingOpen(!bookingOpen)}
                              className="flex items-center justify-between w-full px-4 bg-gray-200 rounded-lg py-2 text-gray-800 hover:from-blue-200 hover:to-purple-200"
                            >
                              <div className="flex items-center gap-2">
                                <img src="/Icon/booking.png" alt="My Booking" width={20} />
                                <span>My Booking</span>
                              </div>
                              {bookingOpen ? <FiChevronUp className="text-xl" /> : <FiChevronDown className="text-xl" />}
                            </button>

                            <AnimatePresence initial={false}>
                              {bookingOpen && (
                                <motion.div
                                  key="submenu"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  className="ml-4 my-1 overflow-hidden flex flex-col gap-y-1 "
                                >
                                  <NavLink href="/bookings/visa" label="Visa Applied" icon="/Icon/visa.png" close={close} />
                                  <NavLink href="/bookings/ticket" label="Booked Flights" icon="/Icon/airplane.ico" close={close} />
                                  <NavLink href="/bookings/hotel" label="Booked Hotels" icon="/Icon/love-hotel.ico" close={close} />
                                  <NavLink href="/bookings/umrah" label="Umrah Packages" icon="/Icon/kaaba.png" close={close} />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        )}
                      </>
                    )}

                    {/* General NavLinks (mobile) */}
                    {navLinks.map((link) => (
                      <NavLink key={link.href} {...link} close={close} />
                    ))}

                    {/* Mobile Login / Logout */}
                    <div className="text-center flex items-center mx-auto">
                      {status === "authenticated" ? (
                        <button
                          onClick={() => {
                            signOut({ callbackUrl: "/" });
                            close();
                          }}
                        >
                          <img src="/Icon/logout.png" width={64} alt="logout" />
                        </button>
                      ) : (
                        <Link href="/login" onClick={close}>
                          <img src="/Icon/login.png" width={64} alt="login" />
                        </Link>
                      )}
                    </div>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}
