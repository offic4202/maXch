'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { ROLE_LABELS } from '@/lib/types';

export default function RegisterSuccessPage() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          router.push('/dashboard');
          return prev;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [router]);

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-lg text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C9A962] to-[#8B4513] flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">Welcome to The Maze!</h1>
        <p className="text-[#A3A3A3] mb-8">Your account has been created successfully.</p>

        <div className="bg-[#1F1F1F] rounded-lg p-6 border border-white/5 text-left mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Account Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[#A3A3A3]">Email</span>
              <span className="text-white">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A3A3A3]">Role</span>
              <span className="text-[#C9A962]">{ROLE_LABELS[user.role]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A3A3A3]">Profile Name</span>
              <span className="text-white">{profile.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A3A3A3]">ID Type</span>
              <span className="text-white uppercase">{profile.idType}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#1F1F1F] rounded-lg p-6 border border-white/5 text-left mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">What Happens Next</h2>
          <ul className="space-y-3 text-[#A3A3A3]">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#C9A962]/20 text-[#C9A962] flex items-center justify-center flex-shrink-0 text-sm">1</span>
              <span>Your profile is pending verification by our team</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#C9A962]/20 text-[#C9A962] flex items-center justify-center flex-shrink-0 text-sm">2</span>
              <span>Verification usually takes 24-48 hours</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#C9A962]/20 text-[#C9A962] flex items-center justify-center flex-shrink-0 text-sm">3</span>
              <span>You&apos;ll receive a notification once approved</span>
            </li>
            {user.role === 'member' && (
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#C9A962]/20 text-[#C9A962] flex items-center justify-center flex-shrink-0 text-sm">4</span>
                <span>Browse profiles and connect with others</span>
              </li>
            )}
            {(user.role === 'manager' || user.role === 'studio_owner') && (
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#C9A962]/20 text-[#C9A962] flex items-center justify-center flex-shrink-0 text-sm">4</span>
                <span>Access your {user.role === 'manager' ? 'event management' : 'studio dashboard'} features</span>
              </li>
            )}
          </ul>
        </div>

        {user.role !== 'member' && (
          <div className="bg-blue-900/20 border border-blue-900 rounded-lg p-4 text-left mb-6">
            <p className="text-blue-400 text-sm">
              <strong>Note:</strong> Your {user.role === 'manager' ? 'Manager' : 'Studio Owner'} account requires additional review. 
              Our team will contact you at {profile.phone} for verification.
            </p>
          </div>
        )}

        <p className="text-[#A3A3A3] mb-6">
          Redirecting to dashboard in <span className="text-white">{countdown}</span> seconds...
        </p>

        <Link href="/dashboard" className="btn-primary inline-block px-8 py-3">
          Go to Dashboard Now
        </Link>
      </div>
    </div>
  );
}