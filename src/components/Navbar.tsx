'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

export default function Navbar() {
  const { user, profile, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A962] to-[#8B4513] flex items-center justify-center">
              <span className="text-black font-bold text-lg" style={{ fontFamily: 'Playfair Display' }}>M</span>
            </div>
            <span className="text-xl font-semibold text-white" style={{ fontFamily: 'Playfair Display' }}>
              The Maze Match
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/profiles" className="text-[#A3A3A3] hover:text-[#C9A962] transition-colors gold-underline">
              Members
            </Link>
            <Link href="/events" className="text-[#A3A3A3] hover:text-[#C9A962] transition-colors gold-underline">
              Events
            </Link>
            {user?.role === 'admin' && (
              <Link href="/admin" className="text-[#A3A3A3] hover:text-[#C9A962] transition-colors gold-underline">
                Admin
              </Link>
            )}
            {user?.role === 'manager' && (
              <Link href="/manager" className="text-[#A3A3A3] hover:text-[#C9A962] transition-colors gold-underline">
                Manager
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link href="/dashboard" className="text-[#A3A3A3] hover:text-[#C9A962] transition-colors">
                  {profile?.name || 'Dashboard'}
                </Link>
                <button
                  onClick={logout}
                  className="text-sm text-[#A3A3A3] hover:text-[#C9A962] transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-[#A3A3A3] hover:text-[#C9A962] transition-colors">
                  Login
                </Link>
                <Link href="/auth/register" className="btn-primary">
                  Join Now
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5">
            <div className="flex flex-col gap-4">
              <Link href="/profiles" className="text-[#A3A3A3] hover:text-[#C9A962] transition-colors">
                Members
              </Link>
              <Link href="/events" className="text-[#A3A3A3] hover:text-[#C9A962] transition-colors">
                Events
              </Link>
              {user?.role === 'admin' && (
                <Link href="/admin" className="text-[#A3A3A3] hover:text-[#C9A962] transition-colors">
                  Admin
                </Link>
              )}
              {user?.role === 'manager' && (
                <Link href="/manager" className="text-[#A3A3A3] hover:text-[#C9A962] transition-colors">
                  Manager
                </Link>
              )}
              {user ? (
                <>
                  <Link href="/dashboard" className="text-[#A3A3A3] hover:text-[#C9A962] transition-colors">
                    {profile?.name || 'Dashboard'}
                  </Link>
                  <button onClick={logout} className="text-left text-[#A3A3A3] hover:text-[#C9A962] transition-colors">
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/auth/login" className="text-[#A3A3A3] hover:text-[#C9A962] transition-colors">
                    Login
                  </Link>
                  <Link href="/auth/register" className="btn-primary text-center">
                    Join Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}