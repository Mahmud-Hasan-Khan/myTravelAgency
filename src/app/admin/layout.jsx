// "use client"
// import Link from 'next/link';
// import React from 'react';
// import { useState } from 'react';
// import { HiOutlineMenu, HiX } from "react-icons/hi";

// const AdminLayout = ({ children }) => {

//     const [open, setOpen] = useState(false);


//     return (
//         <div className="flex min-h-screen">
//             {/* Mobile Menu Button */}
//             <div className="lg:hidden fixed top-4 left-4 z-50">
//                 <button onClick={() => setOpen(!open)} className="p-2 bg-gray-800 text-white rounded">
//                     {open ? <HiX className="h-6 w-6" /> : <HiOutlineMenu className="h-6 w-6" />}
//                 </button>
//             </div>

//             {/* Sidebar */}
//             <aside
//                 className={`bg-gray-100 p-6 border-r fixed lg:static top-0 left-0 z-40 h-full w-64 transition-transform transform 
//         ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
//             >
//                 <h2 className="text-xl font-bold mb-6">Admin Menu</h2>
//                 <ul className="space-y-4">
//                     <li>
//                         <Link href="/admin" onClick={() => setOpen(false)} className="text-blue-600 hover:underline">
//                             Dashboard
//                         </Link>
//                     </li>
//                     <li>
//                         <Link href="/admin/user-management" onClick={() => setOpen(false)} className="text-blue-600 hover:underline">
//                             User Management
//                         </Link>
//                     </li>
//                     <li>
//                         <Link href="/admin/visa-services" onClick={() => setOpen(false)} className="text-blue-600 hover:underline">
//                             Visa Services
//                         </Link>
//                     </li>
//                     <li>
//                         <Link href="/admin/air-ticket" onClick={() => setOpen(false)} className="text-blue-600 hover:underline">
//                             Air Ticket
//                         </Link>
//                     </li>
//                 </ul>
//             </aside>

//             {/* Main content area */}
//             <main className="flex-1 p-8 lg:ml-64 w-full">{children}</main>
//         </div>
//     );
// };

// export default AdminLayout;

// 'use client';

// import { useState } from 'react';
// import { FiMenu, FiX } from 'react-icons/fi'; // Using Feather Icons from react-icons
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// const adminMenu = [
//   { label: 'Dashboard', href: '/admin' },
//   { label: 'User Management', href: '/admin/usersManagement' },
//   { label: 'Visa Services', href: '/admin/visas' },
//   { label: 'Air Ticket', href: '/admin/tickets' },
//   { label: 'Reports', href: '/admin/reports' },
// ];

// export default function AdminLayout({ children }) {
//   const pathname = usePathname();
//   const [open, setOpen] = useState(false);

//   const isActive = (href) => pathname === href;

//   return (
//     <div className="flex min-h-screen bg-gray-100 relative">
//       {/* Sidebar */}
//       <aside className={`bg-white border-r w-56 p-4 fixed top-0 left-0 h-full z-40 transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}>
//         <div className="flex justify-between items-center mb-6 sm:hidden">
//           <h2 className="text-lg font-bold">Admin Menu</h2>
//           <button onClick={() => setOpen(false)} className="text-gray-700">
//             <FiX size={24} />
//           </button>
//         </div>
//         <nav className="flex flex-col gap-2 mt-10 absolute top-20 sm:mt-0">
//           {adminMenu.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`px-4 py-2 rounded-md text-sm font-medium ${
//                 isActive(item.href)
//                   ? 'bg-blue-100 text-blue-700'
//                   : 'text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>
//       </aside>

//       {/* Mobile toggle button */}
//       <button
//         onClick={() => setOpen(true)}
//         className="sm:hidden fixed top-4 left-4 z-50 text-gray-700"
//       >
//         <FiMenu size={24} />
//       </button>

//       {/* Main Content */}
//       <main className="flex-1 ml-0 sm:ml-64 p-4 sm:p-8">{children}</main>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const adminMenu = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'User Management', href: '/admin/users' },
  { label: 'Visa Services', href: '/admin/visa' },
  { label: 'Air Ticket', href: '/admin/tickets' },
  { label: 'Reports', href: '/admin/reports' },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) => {
    if (href === '/admin') {
      return pathname === '/admin'; // Exact match only
    }
    return pathname.startsWith(href); // Match subpaths
  };

  return (
    <div className="flex min-h-screen bg-gray-100 ">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r w-64 p-4 fixed  h-full transform transition-transform duration-300 ease-in-out 
        ${open ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
      >
        {/* Header with close button (mobile only) */}
        <div className="flex justify-between items-center mb-6 sm:hidden">
          <h2 className="text-lg font-bold">Admin Menu</h2>
          <button onClick={() => setOpen(false)} aria-label="Close sidebar" className="text-gray-700">
            <FiX size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-2 mt-10 sm:mt-0">
          {/* Desktop Logo */}
            <Link href="/">
              <img src="/Icon/logoMobile.png" alt="Logo" width={230} />
            </Link>
          {adminMenu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)} // Auto-close on mobile
              className={`px-4 py-2 rounded-md text-sm font-medium ${isActive(item.href)
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-200'
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
        aria-expanded={open}
        className="sm:hidden fixed top-4 left-4 z-50 text-gray-700"
      >
        <FiMenu size={24} />
      </button>

      {/* Main Content */}
      <main className="flex-1 ml-0 sm:ml-64 p-8 sm:p-8 mx-auto">{children}</main>
    </div>
  );
}
