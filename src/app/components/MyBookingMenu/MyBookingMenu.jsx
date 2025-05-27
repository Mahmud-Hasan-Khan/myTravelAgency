"use client";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const MyBookingMenu = ({ close }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // NavLink logic inside same file
  const NavLink = ({ href, icon, label }) => {
    const isActive = pathname === href;

    return (
      <Link href={href} onClick={() => close?.()} className="group w-full">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-b transition-all duration-300
            ${isActive
              ? "bg-gradient-to-r from-blue-900 to-purple-200 text-blue-800"
              : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-blue-300 hover:to-purple-300"}
          `}
        >
          {icon && <img src={icon} alt={label} width={20} />}
          {label}
        </div>
      </Link>
    );
  };

  return (
    <div className="w-full">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-2 text-gray-800 bg-gradient-to-r from-blue-100 to-purple-100 border-b rounded-lg hover:from-blue-200 hover:to-purple-200"
      >
        <div className="flex items-center gap-2">
          <img src="/booking-icon.png" alt="My Booking" width={20} />
          <span>My Booking</span>
        </div>
        {open ? <FiChevronUp className="text-xl" /> : <FiChevronDown className="text-xl" />}
      </button>

      {/* Animated Submenu */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="submenu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="ml-4 mt-1 overflow-hidden space-y-1"
          >
            <NavLink href="/bookings/visa" label="Visa Applied" icon="/visa.ico" />
            <NavLink href="/bookings/flight" label="Booked Flights" icon="/airplane.ico" />
            <NavLink href="/bookings/hotel" label="Booked Hotels" icon="/love-hotel.ico" />
            <NavLink href="/bookings/umrah" label="Umrah Packages" icon="/kaaba.ico" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyBookingMenu;
