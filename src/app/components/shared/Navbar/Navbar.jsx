"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const NavLink = ({ href, icon, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="group">
      <div
        className={`flex items-center gap-1 px-2 py-2 rounded-lg border-b-2 shadow-sm transition-all duration-300
          ${isActive ? "border-blue-500 text-[#1882ff] scale-105" : "border-base-300"}
          hover:border-blue-500 hover:text-[#1882ff] hover:scale-105 focus:border-blue-500`}
      >
        {icon?.trim() && (
          <Image src={icon} alt={label} width={20} height={20} />
        )}
        {label}
      </div>
    </Link>
  );
};

const navLinks = [
  { href: "/flight", icon: "/airplane.ico", label: "Flight" },
  { href: "/visa", icon: "/visa.ico", label: "Visa" },
  { href: "/hotel", icon: "/love-hotel.ico", label: "Hotel" },
  { href: "/umrah", icon: "/kaaba.ico", label: "Umrah" },
  { href: "/blog", icon: "/blogger.ico", label: "Blog" },
];

const Navbar = () => {
  return (
    <Popover className="sticky top-0 z-50 bg-white border-b w-full h-16 shadow-sm px-4 sm:px-10 md:px-32 flex items-center">
      {/* Desktop Logo */}
      <Link href="/" className="hidden sm:block">
        <Image src="/webLogo.png" alt="Logo" width={140} height={100} />
      </Link>

      <div className="flex-1 flex items-center justify-between sm:justify-center">
        {/* Desktop Nav Links */}
        <div className="hidden sm:flex gap-10 font-medium">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </div>

        {/* Mobile Logo */}
        <Link href="/" className="sm:hidden">
          <Image src="/WebLogo2.png" alt="Logo" width={170} height={110} />
        </Link>
      </div>

      {/* Desktop Login */}
      <div className="hidden sm:block">
        <Link href="/login">
          <div className="bg-[#1882ff] hover:bg-[#126fde] text-white font-medium px-4 py-2 rounded-3xl transition duration-300">
            Login
          </div>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="sm:hidden">
        <PopoverButton className="p-1 text-gray-500 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <Bars3Icon className="h-6 w-6" />
        </PopoverButton>
      </div>

      {/* Mobile Menu */}
      <PopoverPanel focus className="absolute inset-x-2 top-1 origin-top-right transform p-3 transition sm:hidden">
        <div className="bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
          <div className="flex items-center justify-between px-3 pt-2">
            <Image src="/WebLogo2.png" alt="Logo" width={160} height={110} />
            <PopoverButton className="p-1 text-gray-500 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <XMarkIcon className="h-6 w-6" />
            </PopoverButton>
          </div>
          <div className="py-4 px-5">
            <nav className="flex flex-col gap-3 items-center">
              {navLinks.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
              <Link href="/login" className="w-full">
                <div className="w-full text-center bg-[#1882ff] hover:bg-[#126fde] text-white font-medium px-4 py-2 rounded-3xl transition duration-300">
                  Login
                </div>
              </Link>
            </nav>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
};

export default Navbar;
