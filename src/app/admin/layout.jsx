'use client';

import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
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
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`z-50 bg-white border-r w-64 p-4 fixed h-full transform transition-transform duration-300 ease-in-out 
        ${open ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/">
            <Image
              src="/Icon/logoMobile.png"
              alt="Logo"
              width={160}
              height={40}
              priority
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav role="navigation" className="flex flex-col gap-2">
          {adminMenu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                isActive(item.href)
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay for Mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Toggle Button (Open/Close) */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close sidebar' : 'Open sidebar'}
        aria-expanded={open}
        className="sm:hidden fixed top-4 left-4 z-50 text-gray-700"
      >
        {open ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Main Content */}
      <main className="flex-1 ml-0 sm:ml-64 p-8">{children}</main>
    </div>
  );
}
