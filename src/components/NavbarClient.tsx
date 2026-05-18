'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';

interface NavbarClientProps {
  isLoggedIn: boolean;
  logoutAction: () => void;
}

export default function NavbarClient({ isLoggedIn, logoutAction }: NavbarClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center relative z-10">
            <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo1.png" alt="ConvertAja Logo" className="h-16 w-auto scale-[2] origin-left object-contain mix-blend-multiply" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">Beranda</Link>
            <Link href="/tools/merge-pdf" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">Tools</Link>
            <Link href="/tentang" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">Tentang</Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">Kontak</Link>
          </div>

          {/* Desktop Right Button */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Link href="/profile" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium flex items-center transition-colors">
                  <User size={18} className="mr-1" /> Profil
                </Link>
                <form action={logoutAction}>
                  <button type="submit" className="text-gray-600 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors">
                    Keluar
                  </button>
                </form>
              </div>
            ) : (
              <Link href="/login" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
                Log In
              </Link>
            )}
            
            <Link href={isLoggedIn ? "/tools/merge-pdf" : "/login"} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 px-5 py-2 rounded-lg text-sm font-semibold shadow-md shadow-blue-500/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              {isLoggedIn ? "Mulai Convert" : "Get Started"}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-primary p-2 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-900 hover:bg-blue-50 hover:text-primary transition-colors"
            >
              Beranda
            </Link>
            <Link 
              href="/tools/merge-pdf" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-900 hover:bg-blue-50 hover:text-primary transition-colors"
            >
              Tools
            </Link>
            <Link 
              href="/tentang" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-900 hover:bg-blue-50 hover:text-primary transition-colors"
            >
              Tentang
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-900 hover:bg-blue-50 hover:text-primary transition-colors"
            >
              Kontak
            </Link>
            
            <div className="border-t border-gray-100 my-2 pt-2"></div>
            
            {isLoggedIn ? (
              <>
                <Link 
                  href="/profile" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-medium text-gray-900 hover:bg-blue-50 hover:text-primary transition-colors flex items-center"
                >
                  <User size={18} className="mr-2" /> Profil Saya
                </Link>
                <form action={logoutAction} onSubmit={() => setIsMobileMenuOpen(false)}>
                  <button type="submit" className="w-full text-left px-3 py-3 rounded-md text-base font-medium text-red-600 hover:bg-red-50 transition-colors">
                    Keluar Akun
                  </button>
                </form>
              </>
            ) : (
              <Link 
                href="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium text-gray-900 hover:bg-blue-50 hover:text-primary transition-colors"
              >
                Log In
              </Link>
            )}
            
            <div className="pt-4">
              <Link 
                href={isLoggedIn ? "/tools/merge-pdf" : "/login"} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-lg text-base font-bold shadow-md"
              >
                {isLoggedIn ? "Mulai Convert" : "Get Started"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
