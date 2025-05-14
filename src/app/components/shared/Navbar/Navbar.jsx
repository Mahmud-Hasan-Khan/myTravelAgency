// "use client"

// import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
// import Image from 'next/image';
// import Link from 'next/link';
// import React from 'react';
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"


// const Navbar = () => {

//   return (
//     <Popover className='container mx-auto flex items-center h-20  px-3 sm:px-0'>
//       <Link href="/">
//         <Image className='hidden sm:block' src="/webLogo.png" alt="Logo" width={140} height={100} />
//       </Link>
//       <div className='grow'>
//         <div className='hidden  sm:flex items-center justify-center gap-10  font-medium'>
//           <Link href="/flight">
//             <div className="flex items-center gap-1 px-2 py-2 rounded-lg border-b-2 border-base-300 shadow-sm transition-all duration-300 hover:border-blue-500 hover:text-[#1882ff] hover:scale-105 focus:border-blue-500">
//               <Image src="/airplane.ico" alt="Flight" width={20} height={20} />
//               Flight
//             </div>
//           </Link>

//           <Link href="/hotel">
//             <div className="relative flex items-center gap-1 px-2 py-2 rounded-lg border-b-2 border-base-300 shadow-sm transition-all duration-300 hover:text-[#1882ff] hover:scale-105 group overflow-hidden">
//               <Image src="/visa.ico" alt="Flight" width={16} height={16} />
//               Visa
//               {/* Animated border */}
//               <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-500 rounded-lg transition-all duration-300 group-hover:w-full"></span>
//             </div>
//           </Link>



//           <Link href="/hotel" className="group">
//             <div className="relative flex items-center gap-1 px-2 py-2 border-b-2 transition-all duration-300 hover:text-[#1882ff]">
//               <Image src="/love-hotel.ico" alt="Flight" width={20} height={20} />
//               Hotel
//               <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-500  transition-all duration-300 group-hover:w-full"></span>
//             </div>
//           </Link>

//           <Link href="/hotel">
//             <div className="relative flex items-center gap-1 px-2 py-2 rounded-lg border-b-2 border-base-300 shadow-sm transition-all duration-300 hover:text-[#1882ff] hover:scale-105 group">
//               <Image src="/visa.ico" alt="Flight" width={16} height={16} />
//               Visa
//               {/* Border transition effect */}
//               <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-lg bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
//             </div>
//           </Link>


//           {/* <Link href="/hotel">
//             <div className="flex items-center gap-1 px-2 py-2 rounded-lg border-b-2 border-base-300 shadow-sm transition-all duration-300 hover:border-blue-500 hover:text-[#1882ff] hover:scale-105 focus:border-blue-500">
//               <Image src="/visa.ico" alt="Flight" width={16} height={16} />
//               Visa
//               <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-500  transition-all duration-300 group-hover:w-full"></span>
//             </div>
//           </Link> */}
//           <Link href="/umrah" className="group">
//             <div className="relative flex items-center gap-1 px-2 py-2 transition-all duration-300 hover:text-[#1882ff]">
//               <Image src="/kaaba.ico" alt="Flight" width={16} height={16} />
//               Umrah
//               <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-500  transition-all duration-300 group-hover:w-full"></span>
//             </div>
//           </Link>
//           <Link href="/blog" className="group">
//             <div className="relative flex items-center gap-1 px-2 py-2 transition-all duration-300 hover:text-[#1882ff]">
//               <Image src="/blogger.ico" alt="Flight" width={16} height={16} />
//               Blog
//               <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-500  transition-all duration-300 group-hover:w-full"></span>
//             </div>
//           </Link>
//         </div>
//         <div>
//           <Image className='sm:hidden flex items-center justify-center pl-1'
//             src="/WebLogo2.png"
//             alt="Logo"
//             width={170}
//             height={110}
//           />
//         </div>
//       </div>
//       <div className="flex grow items-center justify-end sm:hidden">
//         <PopoverButton className="inline-flex items-center justify-center rounded-md bg-white p-1
//          text-gray-500 hover:bg-gray-100 hover:text-gray-500 focus:outline-none Focus: ring-2 focus:ring-indigo-500">
//           <span className="sr-only">Open menu</span>
//           <Bars3Icon className='h-6 w-6' aria-hidden="true" />
//         </PopoverButton>
//       </div>

//       {/*Popover Panel*/}
//       <PopoverPanel focus className="absolute inset-x-2 top-1 origin-top-right transform p-3 transition md:hidden">
//         <div className='rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50'>
//           <div className='text-right'>
//             <div className='flex items-center justify-between'>
//               <div>
//                 <Image className='sm:hidden flex items-center justify-center'
//                   src="/WebLogo2.png"
//                   alt="Logo"
//                   width={160}
//                   height={110}
//                 />
//               </div>
//               <div className='-mr-2'>
//                 <PopoverButton className="inline-flex items-center justify-center rounded-md bg-white p-1
//          text-gray-500 hover:bg-gray-100 hover:text-gray-500 focus:outline-none Focus: ring-2 focus:ring-indigo-500">
//                   <span className="sr-only">Close menu</span>
//                   <XMarkIcon className='h-6 w-6' aria-hidden="true" />
//                 </PopoverButton>
//               </div>
//             </div>
//             <div className='mt-5'>
//               <nav className='grid gap-y-4 pb-4'>
//                 <Link className='focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-4' href=""> Flight</Link>
//                 <Link className='focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-4' href="">Hotel</Link>
//                 <Link className='focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-4' href="home3">Visa</Link>
//                 <Link className='focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-4' href="home3">Umrah</Link>
//                 <Link className='focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-4' href="home3">Blog</Link>
//               </nav>
//             </div>

//           </div>
//         </div>
//       </PopoverPanel>

//       <div className='hidden sm:block'> {/* Comment */}
//         <button href="/" className='bg-[#1882ff] hover:bg-[#126fde] text-white font-medium px-4 py-2 rounded-3xl transition-colors duration-300 ease-linear'>Login</button>
//       </div>
//     </Popover>
//   );
// };

// export default Navbar;


// "use client";

// import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

// const NavLink = ({ href, icon, label }) => {
//   const router = useRouter();
//   const isActive = router.pathname === href; // Check if current route is active

//   return (
//     <Link href={href} className="group">
//       <div
//         className={`flex items-center gap-1 px-2 py-2 rounded-lg border-b-2 shadow-sm transition-all duration-300
//         ${isActive ? "border-blue-500 text-[#1882ff] scale-105" : "border-base-300"}
//         hover:border-blue-500 hover:text-[#1882ff] hover:scale-105 focus:border-blue-500`}
//       >
//         <Image src={icon} alt={label} width={20} height={20} />
//         {label}
//       </div>

//     </Link>
//   );
// };

// const Navbar = () => {
//   return (
//     <Popover className="container mx-auto flex items-center h-20 px-3 sm:px-0">
//       {/* Logo */}
//       <Link href="/">
//         <Image className="hidden sm:block" src="/webLogo.png" alt="Logo" width={140} height={100} />
//       </Link>

//       <div className="grow">
//         {/* Desktop Menu */}
//         <div className="hidden sm:flex items-center justify-center gap-10 font-medium">
//           <NavLink href="/flight" icon="/airplane.ico" label="Flight" />
//           <NavLink href="/visa" icon="/visa.ico" label="Visa" />
//           <NavLink href="/hotel" icon="/love-hotel.ico" label="Hotel" />
//           <NavLink href="/umrah" icon="/kaaba.ico" label="Umrah" />
//           <NavLink href="/blog" icon="/blogger.ico" label="Blog" />
//         </div>

//         {/* Mobile Logo */}
//         <div>
//           <Image className="sm:hidden flex items-center justify-center pl-1" src="/WebLogo2.png" alt="Logo" width={170} height={110} />
//         </div>
//       </div>

//       {/* Mobile Menu Button */}
//       <div className="flex grow items-center justify-end sm:hidden">
//         <PopoverButton className="inline-flex items-center justify-center rounded-md bg-white p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
//           <span className="sr-only">Open menu</span>
//           <Bars3Icon className="h-6 w-6" aria-hidden="true" />
//         </PopoverButton>
//       </div>

//       {/* Mobile Menu */}
//       <PopoverPanel focus className="absolute inset-x-2 top-1 origin-top-right transform p-3 transition md:hidden">
//         <div className="rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50">
//           <div className="text-right">
//             <div className="flex items-center justify-between">
//               {/* Mobile Logo */}
//               <Image className="sm:hidden flex items-center justify-center" src="/WebLogo2.png" alt="Logo" width={160} height={110} />
//               {/* Close Button */}
//               <PopoverButton className="inline-flex items-center justify-center rounded-md bg-white p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
//                 <span className="sr-only">Close menu</span>
//                 <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//               </PopoverButton>
//             </div>

//             {/* Mobile Nav Links */}
//             <div className="mt-5">
//               <nav className="grid gap-y-4 pb-4">
//                 <NavLink href="/flight" icon="/airplane.ico" label="Flight" />
//                 <NavLink href="/visa" icon="/visa.ico" label="Visa" />
//                 <NavLink href="/hotel" icon="/love-hotel.ico" label="Hotel" />
//                 <NavLink href="/umrah" icon="/kaaba.ico" label="Umrah" />
//                 <NavLink href="/blog" icon="/blogger.ico" label="Blog" />
//               </nav>
//             </div>
//           </div>
//         </div>
//       </PopoverPanel>

//       {/* Login Button (Desktop) */}
//       <div className="hidden sm:block">
//         <button className="bg-[#1882ff] hover:bg-[#126fde] text-white font-medium px-4 py-2 rounded-3xl transition-colors duration-300 ease-linear">
//           Login
//         </button>
//       </div>
//     </Popover>
//   );
// };

// export default Navbar;


"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Fix: usePathname instead of useRouter
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const NavLink = ({ href, icon, label }) => {
  const pathname = usePathname(); // Get the current route
  const isActive = pathname === href; // Check if the link is active

  return (
    <Link href={href} className="group">
      <div
        className={`flex items-center gap-1 px-2 py-2 rounded-lg border-b-2 shadow-sm transition-all duration-300
        ${isActive ? "border-blue-500 text-[#1882ff] scale-105" : "border-base-300"}
        hover:border-blue-500 hover:text-[#1882ff] hover:scale-105 focus:border-blue-500`}
      >
        <Image src={icon} alt={label} width={20} height={20} />
        {label}
      </div>
    </Link>
  );
};

const Navbar = () => {
  return (
    <Popover className="container sticky top-0 z-50 bg-white border-b-[1px] mx-auto flex items-center h-16 md:px-32 sm:px-0">
      {/* Logo */}
      <Link href="/">
        <Image className="hidden sm:block" src="/webLogo.png" alt="Logo" width={140} height={100} />
      </Link>

      <div className="grow">
        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center justify-center gap-10 font-medium">
          <NavLink href="/flight" icon="/airplane.ico" label="Flight" />
          <NavLink href="/visa" icon="/visa.ico" label="Visa" />
          <NavLink href="/hotel" icon="/love-hotel.ico" label="Hotel" />
          <NavLink href="/umrah" icon="/kaaba.ico" label="Umrah" />
          <NavLink href="/blog" icon="/blogger.ico" label="Blog" />
        </div>

        {/* Mobile Logo */}
        <div>
          <Link href={'/'}>
          <Image className="sm:hidden flex items-center justify-center pl-1" src="/WebLogo2.png" alt="Logo" width={170} height={110} />
          </Link>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex grow items-center justify-end sm:hidden">
        <PopoverButton className="inline-flex items-center justify-center rounded-md bg-white p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <span className="sr-only">Open menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </PopoverButton>
      </div>

      {/* Mobile Menu */}
      <PopoverPanel focus className="absolute inset-x-2 top-1 origin-top-right transform p-3 transition md:hidden">
        <div className="rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50">
          <div className="text-right">
            <div className="flex items-center justify-between">
              {/* Mobile Logo */}
              <Image className="sm:hidden flex items-center justify-center" src="/WebLogo2.png" alt="Logo" width={160} height={110} />
              {/* Close Button */}
              <PopoverButton className="inline-flex items-center justify-center rounded-md bg-white p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </PopoverButton>
            </div>

            {/* Mobile Nav Links */}
            <div className="mt-1">
              <nav className="grid gap-y-2 justify-center items-center py-2">
                <NavLink href="/flight" icon="/airplane.ico" label="Flight" />
                <NavLink href="/visa" icon="/visa.ico" label="Visa" />
                <NavLink href="/hotel" icon="/love-hotel.ico" label="Hotel" />
                <NavLink href="/umrah" icon="/kaaba.ico" label="Umrah" />
                <NavLink href="/blog" icon="/blogger.ico" label="Blog" />
                <button className="bg-[#1882ff] hover:bg-[#126fde] text-white font-medium px-4 py-2 rounded-3xl transition-colors duration-300 ease-linear">
          Login
        </button>
              </nav>
            </div>
          </div>
        </div>
      </PopoverPanel>

      {/* Login Button (Desktop) */}
      <div className="hidden sm:block">
        <NavLink href="/login" className="bg-[#1882ff] hover:bg-[#126fde] text-white font-medium px-4 py-2 rounded-3xl transition-colors duration-300 ease-linear">
          Login
        </NavLink>
      </div>
    </Popover>
  );
};

export default Navbar;
