'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login')
    }
  });

  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', current: pathname === '/dashboard' },
    { name: 'New Scan', href: '/scan/upload', current: pathname === '/scan/upload' },
    { name: 'Women health', href: '/women', current: pathname === '/women' },
    { name: 'History', href: '/dashboard/history', current: pathname === '/dashboard/history' },
    { name: 'Profile', href: '/dashboard/profile', current: pathname === '/dashboard/profile' },
  ];

  // If not authenticated, return null (redirect will handle it)
  if (status !== 'authenticated') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-indigo-600 pb-32">
        <nav className="bg-indigo-600">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="border-b border-indigo-500">
              <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link href="/" className="text-white font-bold text-xl">
                      Adermis
                    </Link>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`${
                            item.current
                              ? 'bg-indigo-700 text-white'
                              : 'text-white hover:bg-indigo-500'
                          } px-3 py-2 rounded-md text-sm font-medium`}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="p-1 rounded-full text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      {/* SVG content */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}