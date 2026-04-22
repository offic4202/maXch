'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProfileById, sendConnection, getCurrentUser } from '@/lib/store';
import { useAuth } from '@/lib/auth-context';
import { Profile } from '@/lib/types';

export default function ProfileDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [showFullBio, setShowFullBio] = useState(false);
  const [connectionSent, setConnectionSent] = useState(false);

  useEffect(() => {
    const id = params.id as string;
    const p = getProfileById(id);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProfile(p);
  }, [params.id]);

  const handleConnect = () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    
    if (profile && user.profileId && user.id !== profile.userId) {
      sendConnection(user.id, profile.userId);
      setConnectionSent(true);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#A3A3A3]">Loading profile...</p>
        </div>
      </div>
    );
  }

  const isOwnProfile = user?.profileId === profile.id;

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/profiles" className="inline-flex items-center gap-2 text-[#A3A3A3] hover:text-white mb-8 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Members
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="relative">
            <div className="aspect-[3/4] rounded-lg overflow-hidden image-frame">
              <img
                src={profile.photos[0]}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            {profile.isVerified && (
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#0D0D0D]/80 px-3 py-2 rounded-full">
                <svg className="w-5 h-5 text-[#C9A962]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white text-sm">Verified Member</span>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{profile.name}</h1>
                  <p className="text-xl text-[#A3A3A3]">{profile.dateOfBirth ? new Date().getFullYear() - new Date(profile.dateOfBirth).getFullYear() : '--'} years • {profile.location}, {profile.state}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1F1F1F] p-4 rounded-lg">
                <p className="text-[#A3A3A3] text-sm mb-1">Occupation</p>
                <p className="text-white font-medium">{profile.occupation}</p>
              </div>
              <div className="bg-[#1F1F1F] p-4 rounded-lg">
                <p className="text-[#A3A3A3] text-sm mb-1">Education</p>
                <p className="text-white font-medium">{profile.education}</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">About</h2>
              <p className="text-[#A3A3A3] leading-relaxed">
                {showFullBio || profile.bio.length <= 300 
                  ? profile.bio 
                  : `${profile.bio.slice(0, 300)}...`
                }
                {profile.bio.length > 300 && (
                  <button 
                    onClick={() => setShowFullBio(!showFullBio)}
                    className="text-[#C9A962] ml-2"
                  >
                    {showFullBio ? 'Show less' : 'Read more'}
                  </button>
                )}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <span key={interest} className="px-4 py-2 bg-[#1F1F1F] rounded-full text-white">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Looking For</h2>
              <span className={`inline-block px-4 py-2 rounded-full ${
                profile.lookingFor === 'marriage' 
                  ? 'bg-[#C9A962]/20 text-[#C9A962]' 
                  : profile.lookingFor === 'dating'
                  ? 'bg-pink-900/20 text-pink-400'
                  : 'bg-blue-900/20 text-blue-400'
              }`}>
                {profile.lookingFor === 'marriage' 
                  ? 'Marriage' 
                  : profile.lookingFor === 'dating'
                  ? 'Dating'
                  : 'Networking'
                }
              </span>
            </div>

            {!isOwnProfile && (
              <button
                onClick={handleConnect}
                disabled={connectionSent}
                className={`w-full py-4 rounded-lg font-semibold transition-all ${
                  connectionSent
                    ? 'bg-green-900/30 text-green-400 border border-green-900'
                    : 'btn-primary'
                }`}
              >
                {connectionSent ? 'Request Sent' : 'Connect'}
              </button>
            )}

            {isOwnProfile && (
              <Link href="/dashboard" className="block w-full py-4 text-center btn-secondary rounded-lg">
                Edit Profile
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}